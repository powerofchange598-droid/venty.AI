import { verifySession, loadUsers } from '../_utils';

export default async function handler(req: any, res: any) {
  try {
    const cookie = String(req.headers.cookie || '');
    const sid = cookie.split(';').map(x => x.trim()).find(x => x.startsWith('venty_session='))?.split('=')[1] || '';
    if (!sid) return res.json({ ok: false });
    const payload = await verifySession(sid).catch(() => null);
    if (!payload?.userId) return res.json({ ok: false });
    const users = loadUsers();
    const user = users.find(u => u.userId === payload.userId);
    if (!user) return res.json({ ok: false });
    return res.json({ ok: true, user });
  } catch {
    return res.json({ ok: false });
  }
}
