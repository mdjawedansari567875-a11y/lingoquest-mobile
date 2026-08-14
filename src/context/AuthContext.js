import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });
    return unsubAuth;
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const unsubProfile = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) setProfile({ uid: snap.id, ...snap.data() });
    });
    return unsubProfile;
  }, [user]);

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, profile, loadingAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
