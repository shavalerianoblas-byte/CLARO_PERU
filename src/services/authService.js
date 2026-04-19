import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ROLES, ADMIN_EMAIL } from "./roles";

export const syncUserProfile = async (user) => {
  if (!user) return;

  const userRef = doc(db, "profiles", user.uid);
  const role = user.email === ADMIN_EMAIL ? ROLES.OWNER : ROLES.CLIENT;

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    display_name: user.displayName || user.email.split('@')[0],
    role: role,
    updated_at: serverTimestamp()
  }, { merge: true }); // 'merge' evita borrar datos si el perfil ya existe
};