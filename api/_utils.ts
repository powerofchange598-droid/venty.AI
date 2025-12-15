import fs from 'node:fs';
import path from 'node:path';
import * as jose from 'jose';

type Identity = { provider: string; providerId: string; email?: string; name?: string; picture?: string };
type User = { userId: string; email?: string; name?: string; picture?: string; providers: { provider: string; providerUserId: string }[]; passwordHash?: string; createdAt: string };

const USERS_FILE = path.join(process.cwd(), 'server', 'data', 'users.json');

const readBody = async (req: any) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
};

const getEnv = (k: string) => process.env[k] || '';

const loadUsers = (): User[] => {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
};

const saveUsers = (users: User[]) => {
  try {
    fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch {}
};

const upsertUserFromIdentity = (identity: Identity): User => {
  const users = loadUsers();
  let user = users.find(u => (identity.email && u.email === identity.email) || u.providers.some(p => p.provider === identity.provider && p.providerUserId === identity.providerId));
  if (!user) {
    const id = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    user = { userId: id, email: identity.email, name: identity.name, picture: identity.picture, providers: [{ provider: identity.provider, providerUserId: identity.providerId }], createdAt: new Date().toISOString() };
    users.push(user);
  } else {
    if (!user.providers.some(p => p.provider === identity.provider && p.providerUserId === identity.providerId)) {
      user.providers.push({ provider: identity.provider, providerUserId: identity.providerId });
    }
    if (identity.email && !user.email) user.email = identity.email;
    if (identity.name && !user.name) user.name = identity.name;
    if (identity.picture && !user.picture) user.picture = identity.picture;
  }
  saveUsers(users);
  return user;
};

const signSession = async (payload: Record<string, any>) => {
  const secret = getEnv('JWT_SECRET');
  if (!secret) throw new Error('jwt_secret_missing');
  const key = new TextEncoder().encode(secret);
  const token = await new jose.SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(key);
  return token;
};

const verifySession = async (token: string) => {
  const secret = getEnv('JWT_SECRET');
  if (!secret) throw new Error('jwt_secret_missing');
  const key = new TextEncoder().encode(secret);
  const { payload } = await jose.jwtVerify(token, key);
  return payload;
};

const isSecure = (req: any) => {
  const proto = (req.headers['x-forwarded-proto'] || '').toString();
  return proto === 'https' || !!process.env.VERCEL || !!process.env.VERCEL_ENV;
};

const setSessionCookie = (res: any, token: string) => {
  const parts = ['venty_session=' + token, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=' + (7 * 24 * 60 * 60)];
  if (isSecure((res as any).req || {})) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
};

const clearSessionCookie = (res: any) => {
  const parts = ['venty_session=', 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (isSecure((res as any).req || {})) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
};

export { readBody, getEnv, loadUsers, saveUsers, upsertUserFromIdentity, signSession, verifySession, setSessionCookie, clearSessionCookie };
