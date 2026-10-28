// api/moka/sync.js
const SUPABASE_URL = process.env.SUPABASE_URL || "https://yneyidzigakknmbegxuf.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_mnULuXg3y5MDOUYfhGsFGQ_GfZCgsM8";
const DEFAULT_CLIENT_ID = "3e42c5dcc49daa84e5d6f8a765974dea0961ecd6e130a04d7477d5dfcb6f6e10";
const DEFAULT_CLIENT_SECRET = "e433a12ab974f1a662ade0efa7053b21827c1d1c3d86db1c1f911d69524fcf56";
const DEFAULT_REDIRECT_URI = "https://hi-tables.vercel.app/";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }

    let token = '';
    let authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (body.access_token) {
      token = body.access_token.trim();
    } else if (req.query?.access_token) {
      token = req.query.access_token.trim();
    }

    let outletId = (body.outlet_id || req.query?.outlet_id || '').toString().trim();
    let outletName = (body.outlet_name || '').trim();

    // 1. If authorization code is provided, exchange it first
    const code = (body.code || req.query?.code || '').trim();
    if (!token && code) {
      let cleanCode = code;
      if (cleanCode.includes('code=')) {
        const match = cleanCode.match(/[?&]code=([^&]+)/) || cleanCode.match(/code=([^&]+)/);
        if (match && match[1]) cleanCode = match[1];
      }

      const clientId = (body.client_id || process.env.MOKA_CLIENT_ID || DEFAULT_CLIENT_ID).trim();
      const clientSecret = (body.client_secret || process.env.MOKA_CLIENT_SECRET || DEFAULT_CLIENT_SECRET).trim();
      const redirectUri = (body.redirect_uri || process.env.MOKA_REDIRECT_URI || DEFAULT_REDIRECT_URI).trim();

      // Possible redirect URI candidates in case of slight domain mismatch in Moka portal
      const candidateUris = Array.from(new Set([
        redirectUri,
        "https://www.hitables.com/",
        "https://www.hitables.com",
        "https://hitables.com/",
        "https://hitables.com",
        "https://hitables.co/callback",
        "http://hitables.com/",
        "https://hi-tables.vercel.app/",
        "https://hi-tables.vercel.app"
      ]));

      let tokenJson = null;
      let lastStatus = 400;

      for (const uri of candidateUris) {
        try {
          const res = await fetch('https://api.mokapos.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              grant_type: 'authorization_code',
              code: cleanCode,
              redirect_uri: uri
            })
          });

          lastStatus = res.status;
          const text = await res.text();
          const parsed = text ? JSON.parse(text) : {};

          if (res.ok && parsed.access_token) {
            tokenJson = parsed;
            break;
          } else {
            tokenJson = parsed;
          }
        } catch(e) {
          console.warn('Token attempt error for uri ' + uri, e);
        }
      }

      if (!tokenJson || !tokenJson.access_token) {
        return res.status(lastStatus).json({
          error: tokenJson?.error || 'token_exchange_failed',
          error_description: tokenJson?.error_description || 'Moka authorization code exchange failed',
          details: tokenJson
        });
      }

      token = tokenJson.access_token;
    }

    if (!token) {
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Missing access token or authorization code to sync from Moka POS'
      });
    }

    // 2. Fetch outlets if outletId is not specified
    if (!outletId) {
      const outRes = await fetch('https://api.mokapos.com/v1/outlets', {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      let outJson = {};
      try {
        const outText = await outRes.text();
        outJson = outText ? JSON.parse(outText) : {};
      } catch(e) {}

      if (outRes.ok) {
        let outlets = [];
        if (outJson.data && Array.isArray(outJson.data.outlets)) outlets = outJson.data.outlets;
        else if (Array.isArray(outJson.data)) outlets = outJson.data;

        if (outlets.length > 0) {
          outletId = outlets[0].id.toString();
          outletName = outlets[0].name || '';
        }
      }
    }

    if (!outletId) {
      return res.status(400).json({
        error: 'outlet_not_found',
        error_description: 'Could not determine outlet ID from Moka POS account'
      });
    }

    // 3. Fetch categories
    let categoriesMap = {};
    try {
      const catRes = await fetch(`https://api.mokapos.com/v1/outlets/${outletId}/categories`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (catRes.ok) {
        let catJson = {};
        try {
          const catText = await catRes.text();
          catJson = catText ? JSON.parse(catText) : {};
        } catch(e) {}
        const cats = Array.isArray(catJson.data) ? catJson.data : (catJson.data?.categories || []);
        cats.forEach(c => {
          if (c && c.id) categoriesMap[c.id] = c.name;
        });
      }
    } catch(e) {
      console.warn('Sync categories notice:', e);
    }

    // 4. Fetch items from Moka POS
    const itemsRes = await fetch(`https://api.mokapos.com/v1/outlets/${outletId}/items?per_page=250`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    let itemsJson = {};
    try {
      const itemsText = await itemsRes.text();
      itemsJson = itemsText ? JSON.parse(itemsText) : {};
    } catch(e) {}

    if (!itemsRes.ok) {
      return res.status(itemsRes.status).json({
        error: 'fetch_items_failed',
        error_description: itemsJson.message || 'Failed to fetch items from Moka POS',
        details: itemsJson
      });
    }

    let rawItems = [];
    if (Array.isArray(itemsJson.data)) {
      rawItems = itemsJson.data;
    } else if (itemsJson.data?.items && Array.isArray(itemsJson.data.items)) {
      rawItems = itemsJson.data.items;
    }

    // 5. Transform items into Hi-Tables structure
    const formatted = [];
    const menuLines = [];

    rawItems.forEach(item => {
      if (!item) return;
      const categoryName = item.category_name || categoriesMap[item.category_id] || 'Menu';
      const variants = item.item_variants || [];

      if (variants.length > 1) {
        variants.forEach(v => {
          const varName = v.name && v.name !== 'Default' ? ` (${v.name})` : '';
          const name = `${item.name}${varName}`;
          const price = Number(v.price) || 0;
          const priceStr = 'Rp ' + Number(price).toLocaleString('id-ID');
          const desc = (item.description || '').replace(/[\r\n|]/g, ' ').trim();
          const tag = `Moka POS • ${v.name || 'Varian'}`;

          formatted.push({
            id: `mk_${item.id}_${v.id}`,
            moka_item_id: item.id,
            moka_variant_id: v.id,
            category: categoryName,
            name: name,
            price: price,
            description: desc,
            tags: tag,
            is_available: true
          });

          menuLines.push(`${categoryName}|${name}|${priceStr}|${desc}|${tag}`);
        });
      } else {
        const v = variants[0] || {};
        const name = item.name;
        const price = Number(v.price) || Number(item.price) || 0;
        const priceStr = 'Rp ' + Number(price).toLocaleString('id-ID');
        const desc = (item.description || '').replace(/[\r\n|]/g, ' ').trim();
        const tag = 'Moka POS';

        formatted.push({
          id: `mk_${item.id}`,
          moka_item_id: item.id,
          moka_variant_id: v.id || null,
          category: categoryName,
          name: name,
          price: price,
          description: desc,
          tags: tag,
          is_available: true
        });

        menuLines.push(`${categoryName}|${name}|${priceStr}|${desc}|${tag}`);
      }
    });

    const newMenuText = menuLines.join('\n');

    // 6. Update Supabase store_config
    let supabaseSuccess = false;
    let supabaseError = null;

    try {
      const sbPatch = await fetch(`${SUPABASE_URL}/rest/v1/store_config?id=eq.default`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          menu_text: newMenuText,
          updated_at: new Date().toISOString()
        })
      });

      if (sbPatch.ok) {
        supabaseSuccess = true;
      } else {
        supabaseError = await sbPatch.text();
      }
    } catch(err) {
      supabaseError = err.message;
    }

    return res.status(200).json({
      success: true,
      outlet_id: outletId,
      outlet_name: outletName,
      access_token: token,
      item_count: formatted.length,
      category_count: Object.keys(categoriesMap).length || new Set(formatted.map(i => i.category)).size,
      items: formatted,
      menu_text: newMenuText,
      supabase_synced: supabaseSuccess,
      supabase_error: supabaseError
    });
  } catch(err) {
    console.error('Error during Moka sync:', err);
    return res.status(500).json({ error: 'internal_server_error', message: err.message });
  }
}
