// api/moka/auth-url.js
const DEFAULT_CLIENT_ID = "3e42c5dcc49daa84e5d6f8a765974dea0961ecd6e130a04d7477d5dfcb6f6e10";
const DEFAULT_REDIRECT_URI = "https://hi-tables.vercel.app/";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const clientId = req.query?.client_id || process.env.MOKA_CLIENT_ID || DEFAULT_CLIENT_ID;
  const redirectUri = req.query?.redirect_uri || process.env.MOKA_REDIRECT_URI || DEFAULT_REDIRECT_URI;

  const authUrl = `https://api.mokapos.com/oauth/authorize?client_id=${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;

  if (req.query?.redirect === 'true') {
    return res.redirect(302, authUrl);
  }

  return res.status(200).json({
    auth_url: authUrl,
    client_id: clientId,
    redirect_uri: redirectUri
  });
}
