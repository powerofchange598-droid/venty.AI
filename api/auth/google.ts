import { readBody, getEnv, upsertUserFromIdentity, signSession, setSessionCookie } from '../_utils';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const url = new URL((req as any).url || '', `http://${req.headers.host}`);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state') || '';
      const clientId = getEnv('GOOGLE_CLIENT_ID');
      const clientSecret = getEnv('GOOGLE_CLIENT_SECRET');
      const baseUrl = getEnv('BASE_URL');
      const redirectUri = `${baseUrl}/api/auth/google`;

      if (!code) {
        if (!clientId || !redirectUri) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: 'google_oauth_not_configured' }));
          return;
        }
        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        authUrl.searchParams.set('client_id', clientId);
        authUrl.searchParams.set('redirect_uri', redirectUri);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', 'openid email profile');
        authUrl.searchParams.set('prompt', 'select_account');
        if (state) authUrl.searchParams.set('state', state);
        res.statusCode = 302;
        res.setHeader('Location', authUrl.toString());
        res.end();
        return;
      }

      if (!clientId || !clientSecret) {
        res.statusCode = 500;
        res.end(JSON.stringify({ ok: false, error: 'google_env_missing' }));
        return;
      }
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.id_token) {
        res.statusCode = 401;
        res.end(JSON.stringify({ ok: false, error: 'code_exchange_failed', data: tokenData }));
        return;
      }
      const tokeninfo = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(tokenData.id_token)}`);
      const info = await tokeninfo.json();
      if (!tokeninfo.ok || info.aud !== clientId) {
        res.statusCode = 401;
        res.end(JSON.stringify({ ok: false, error: 'invalid_token' }));
        return;
      }
      const identity = { provider: 'google', providerId: info.sub, email: info.email, name: info.name, picture: info.picture };
      const user = upsertUserFromIdentity(identity);
      const jwt = await signSession({ userId: user.userId });
      setSessionCookie(res, jwt);
      const returnTo = state && /^\/[a-zA-Z0-9_\-\/?=&.]*$/.test(state) ? state : '/';
      res.statusCode = 302;
      res.setHeader('Location', `${baseUrl}${returnTo}`);
      res.end();
      return;
    }

    if (req.method === 'POST') {
      const { idToken } = await readBody(req);
      if (!idToken) return res.status(400).json({ ok: false, error: 'missing_id_token' });
      const tokeninfo = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
      const info = await tokeninfo.json();
      if (!tokeninfo.ok) return res.status(401).json({ ok: false, error: 'invalid_token' });
      const clientId = getEnv('GOOGLE_CLIENT_ID');
      if (clientId && info.aud !== clientId) return res.status(401).json({ ok: false, error: 'aud_mismatch' });
      const identity = { provider: 'google', providerId: info.sub, email: info.email, name: info.name, picture: info.picture };
      const user = upsertUserFromIdentity(identity);
      const jwt = await signSession({ userId: user.userId });
      setSessionCookie(res, jwt);
      return res.json({ ok: true, user });
    }

    res.status(405).json({ ok: false, error: 'method_not_allowed' });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'server_error' });
  }
}
