import crypto from 'node:crypto';
import { readBody, upsertUserFromIdentity, signSession, setSessionCookie, loadUsers, saveUsers } from '../../_utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  try {
    const { email, password, name } = await readBody(req);
    if (!email || !password) return res.status(400).json({ ok: false, error: 'missing_credentials' });
    const users = loadUsers();
    const existing = users.find(u => u.email === email);
    if (existing && existing.passwordHash) return res.status(409).json({ ok: false, error: 'email_exists' });
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    const identity = { provider: 'email', providerId: email, email, name };
    const user = upsertUserFromIdentity(identity);
    user.passwordHash = `${salt}:${hash}`;
    saveUsers(users.map(u => (u.userId === user.userId ? user : u)));
    const jwt = await signSession({ userId: user.userId });
    setSessionCookie(res, jwt);
    return res.json({ ok: true, user });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'server_error' });
  }
}
