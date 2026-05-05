import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "./firebase";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Listens to Firebase auth state and resolves admin status from the
 * `admins/{uid}` Firestore doc (mirroring the web app's rule).
 *
 * If no one is signed in, the provider silently signs the user in
 * anonymously so the customer flow becomes the default front door.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (!currentUser.isAnonymous && db) {
          try {
            const adminDoc = await getDoc(doc(db, "admins", currentUser.uid));
            setIsAdmin(adminDoc.exists());
          } catch (e) {
            console.error("Error checking admin status", e);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
        return;
      }

      // Nobody signed in — auto sign-in as anonymous customer.
      setIsAdmin(false);
      try {
        await signInAnonymously(auth);
        // onAuthStateChanged will fire again with the new anonymous user,
        // which will resolve `loading` then.
      } catch (e) {
        console.error("Anonymous sign in failed", e);
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
