import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuth } from '../auth/firebase';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';

export interface AuthContextType {
  user: FirebaseUser | null;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  signInWithFacebook: () => Promise<FirebaseUser | null>;
  signInWithApple: () => Promise<FirebaseUser | null>;
  signUpWithEmail: (email: string, password: string) => Promise<FirebaseUser | null>;
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUser | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const a = getAuth();
    if (!a) return;
    return onAuthStateChanged(a, (u) => setUser(u));
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const a = getAuth();
      if (!a) return null;
      const res = await signInWithPopup(a, provider);
      return res.user;
    } catch {
      return null;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const a = getAuth();
      if (!a) return null;
      const res = await signInWithPopup(a, provider);
      return res.user;
    } catch {
      return null;
    }
  };

  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      const a = getAuth();
      if (!a) return null;
      const res = await signInWithPopup(a, provider);
      return res.user;
    } catch {
      return null;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const a = getAuth();
      if (!a) return null;
      const res = await createUserWithEmailAndPassword(a, email, password);
      return res.user;
    } catch {
      return null;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const a = getAuth();
      if (!a) return null;
      const res = await signInWithEmailAndPassword(a, email, password);
      return res.user;
    } catch {
      return null;
    }
  };

  const signOutFn = async () => {
    const a = getAuth();
    if (!a) return;
    await signOut(a);
  };

  const value = useMemo(() => ({
    user,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    signUpWithEmail,
    signInWithEmail,
    signOut: signOutFn,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
