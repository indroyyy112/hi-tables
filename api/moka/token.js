// api/moka/token.js
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

    const code = (body.code || req.query?.code || '').trim();
    const refreshToken = (body.refresh_token || req.query?.refresh_token || '').trim();
    const clientId = (body.client_id || process.env.MOKA_CLIENT_ID || DEFAULT_CLIENT_ID).trim();
    const clientSecret = (body.client_secret || process.env.MOKA_CLIENT_SECRET || DEFAULT_CLIENT_SECRET).trim();
    const redirectUri = (body.redirect_uri || process.env.MOKA_REDIRECT_URI || DEFAULT_REDIRECT_URI).trim();

    if (!code && !refreshToken) {
      return res.status(400).json({
        error: 'missing_parameters',
        error_description: 'Please provide either authorization code or refresh_token'
      });
    }

    // Clean code if user mistakenly pasted "code=..." or a full URL
    let cleanCode = code;
    if (cleanCode.includes('code=')) {
      const match = cleanCode.match(/[?&]code=([^&]+)/) || cleanCode.match(/code=([^&]+)/);
      if (match && match[1]) cleanCode = match[1];
    }

    const payload = refreshToken ? {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    } : {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: cleanCode,
      redirect_uri: redirectUri
    };

    const mokaRes = await fetch('https://api.mokapos.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await mokaRes.json();
    if (!mokaRes.ok) {
      return res.status(mokaRes.status).json({
        error: data.error || 'token_exchange_failed',
        error_description: data.error_description || 'Moka POS token exchange failed',
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Moka token exchange error:', error);
    return res.status(500).json({ error: 'internal_server_error', message: error.message });
  }
}
