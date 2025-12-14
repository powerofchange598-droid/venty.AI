import { initializeApp } from 'firebase/app';
import { getAuth as getAuthOrig, setPersistence, browserLocalPersistence } from 'firebase/auth';

let authInstance: ReturnType<typeof getAuthOrig> | null = null;

export const getAuth = () => {
  if (authInstance) return authInstance;
  const cfg = {
    apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY,
    authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID,
    appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID,
  } as any;
  try {
    if (!cfg.apiKey || !cfg.authDomain || !cfg.projectId || !cfg.appId) {
      return null;
    }
    const app = initializeApp(cfg);
    authInstance = getAuthOrig(app);
    setPersistence(authInstance, browserLocalPersistence).catch(() => {});
    return authInstance;
  } catch {
    return null;
  }
};
