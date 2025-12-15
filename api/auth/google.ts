import { readBody, getEnv, upsertUserFromIdentity, signSession, setSessionCookie } from '../_utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  try {
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
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'server_error' });
  }
}
