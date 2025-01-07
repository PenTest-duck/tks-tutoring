import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  signOut as _signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export interface AuthUser {
  uid: string;
  email: string;
}

const formatAuthUser = (user: User) =>
  ({
    uid: user.uid,
    email: user.email,
  } as AuthUser);

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const onAuthStateChanged = (cb: NextOrObserver<User>) => {
    return _onAuthStateChanged(auth, cb);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: string, password: string) =>
    _signInWithEmailAndPassword(auth, email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    _createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => _signOut(auth).then(clear);

  const sendPasswordResetEmail = (email: string) =>
    _sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    setPersistence(auth, browserSessionPersistence).catch((error) => {
      console.error("Auth persistence error:", error);
    });
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
  };
}
