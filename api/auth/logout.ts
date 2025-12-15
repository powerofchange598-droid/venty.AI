import { clearSessionCookie } from '../_utils';

export default async function handler(_req: any, res: any) {
  clearSessionCookie(res);
  return res.json({ ok: true });
}
