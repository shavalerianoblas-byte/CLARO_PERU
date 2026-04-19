import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export type AppRole = "owner" | "coowner" | "editor" | "client";

interface AuthState {
  user: User | null;
  role: AppRole | null;
  displayName: string | null;
  loading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    displayName: null,
    loading: true,
  });

  // Reemplaza a fetchUserData (Supabase RPC y Select)
  const fetchUserData = async (uid: string) => {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        role: (data.role as AppRole) || "client",
        displayName: data.display_name || null,
      };
    }
    return { role: "client" as AppRole, displayName: null };
  };

  useEffect(() => {
    // Escucha cambios de auth en Firebase
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { role, displayName } = await fetchUserData(user.uid);
        setState({ user, role, displayName, loading: false });
      } else {
        setState({ user: null, role: null, displayName: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (error: any) {
      return error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Reemplaza al Trigger de Supabase
      const role: AppRole = email === 'shavalerianoblas@crackthecode.la' ? 'owner' : 'client';
      
      await setDoc(doc(db, "profiles", user.uid), {
        email,
        display_name: displayName,
        role: role,
        created_at: serverTimestamp(),
      });
      
      return null;
    } catch (error: any) {
      return error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const isOwnerOrEditor = state.role === "owner" || state.role === "coowner" || state.role === "editor";

  return { ...state, signIn, signUp, signOut, isOwnerOrEditor };
}