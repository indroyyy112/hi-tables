// api/moka/items.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let authHeader = req.headers?.authorization || req.headers?.Authorization;
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.query?.access_token) {
      token = req.query.access_token.trim();
    } else if (req.body?.access_token) {
      token = req.body.access_token.trim();
    }

    const outletId = (req.query?.outlet_id || req.body?.outlet_id || '').toString().trim();

    if (!token) {
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Missing access_token'
      });
    }

    if (!outletId) {
      return res.status(400).json({
        error: 'bad_request',
        error_description: 'Missing outlet_id parameter'
      });
    }

    // 1. Fetch categories
    let categoriesMap = {};
    try {
      const catRes = await fetch(`https://api.mokapos.com/v1/outlets/${outletId}/categories`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (catRes.ok) {
        const catJson = await catRes.json();
        const cats = Array.isArray(catJson.data) ? catJson.data : (catJson.data?.categories || []);
        cats.forEach(c => {
          if (c && c.id) categoriesMap[c.id] = c.name;
        });
      }
    } catch(e) {
      console.warn('Failed to fetch categories:', e);
    }

    // 2. Fetch items (support pagination up to 250 per page)
    const itemsRes = await fetch(`https://api.mokapos.com/v1/outlets/${outletId}/items?per_page=250`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    const itemsJson = await itemsRes.json();
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

    // Format items into clean Hi-Tables representation
    const formatted = [];
    rawItems.forEach(item => {
      if (!item) return;
      const categoryName = item.category_name || categoriesMap[item.category_id] || 'Menu';
      const variants = item.item_variants || [];

      if (variants.length > 1) {
        variants.forEach(v => {
          const varName = v.name && v.name !== 'Default' ? ` (${v.name})` : '';
          formatted.push({
            id: `mk_${item.id}_${v.id}`,
            moka_item_id: item.id,
            moka_variant_id: v.id,
            category: categoryName,
            name: `${item.name}${varName}`,
            price: Number(v.price) || 0,
            description: item.description || '',
            tags: `Moka POS • ${v.name || 'Varian'}`,
            is_available: true
          });
        });
      } else {
        const v = variants[0] || {};
        formatted.push({
          id: `mk_${item.id}`,
          moka_item_id: item.id,
          moka_variant_id: v.id || null,
          category: categoryName,
          name: item.name,
          price: Number(v.price) || Number(item.price) || 0,
          description: item.description || '',
          tags: 'Moka POS',
          is_available: true
        });
      }
    });

    return res.status(200).json({
      items: formatted,
      raw_count: rawItems.length,
      formatted_count: formatted.length,
      categories: Object.values(categoriesMap)
    });
  } catch(err) {
    console.error('Error fetching Moka items:', err);
    return res.status(500).json({ error: 'internal_server_error', message: err.message });
  }
}
