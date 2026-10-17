import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logoutUser, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Ensure user document exists in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            await setDoc(userDocRef, {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Soul Seeker',
              photoURL: currentUser.photoURL || '',
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('Error syncing user profile to Firestore:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Error during sign-out:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
