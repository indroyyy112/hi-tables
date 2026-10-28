// api/moka/outlets.js
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

    if (!token) {
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Missing access_token in Authorization header or query parameter'
      });
    }

    const mokaRes = await fetch('https://api.mokapos.com/v1/outlets', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    const json = await mokaRes.json();
    if (!mokaRes.ok) {
      return res.status(mokaRes.status).json({
        error: 'fetch_outlets_failed',
        error_description: json.message || 'Failed to fetch outlets from Moka POS',
        details: json
      });
    }

    let outlets = [];
    if (json.data && Array.isArray(json.data.outlets)) {
      outlets = json.data.outlets;
    } else if (Array.isArray(json.data)) {
      outlets = json.data;
    } else if (json.data) {
      outlets = [json.data];
    }

    return res.status(200).json({ outlets, meta: json.meta });
  } catch (err) {
    console.error('Error fetching Moka outlets:', err);
    return res.status(500).json({ error: 'internal_server_error', message: err.message });
  }
}
