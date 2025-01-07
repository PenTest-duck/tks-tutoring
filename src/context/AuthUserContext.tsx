"use client";

import { createContext, useContext } from "react";
import useFirebaseAuth, { AuthUser } from "@/lib/useFirebaseAuth";
import { UserCredential } from "firebase/auth";

interface AuthUserContext {
  authUser: AuthUser | null;
  loading: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
}

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
  sendPasswordResetEmail: async () => {},
} as AuthUserContext);

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
