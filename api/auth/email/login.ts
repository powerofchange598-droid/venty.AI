import crypto from 'node:crypto';
import { readBody, loadUsers, signSession, setSessionCookie } from '../../_utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  try {
    const { email, password } = await readBody(req);
    if (!email || !password) return res.status(400).json({ ok: false, error: 'missing_credentials' });
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.passwordHash);
    if (!user) return res.status(401).json({ ok: false, error: 'invalid_login' });
    const [salt, storedHash] = String(user.passwordHash).split(':');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    if (hash !== storedHash) return res.status(401).json({ ok: false, error: 'invalid_login' });
    const jwt = await signSession({ userId: user.userId });
    setSessionCookie(res, jwt);
    return res.json({ ok: true, user });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'server_error' });
  }
}
