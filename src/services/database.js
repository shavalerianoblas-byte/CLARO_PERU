import { db } from "./fisebase"; // Importación según tu estructura real
import { 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc, 
  serverTimestamp, 
  increment 
} from "firebase/firestore";

/**
 * --- COMENTARIOS Y RESPUESTAS ---
 * Gestión de la comunidad y feedback en el portal
 */

// Enviar un nuevo comentario o responder a uno existente
export const sendComment = async (text, user, parentId = null) => {
  try {
    await addDoc(collection(db, "comments"), {
      text,
      userName: user.displayName || user.email,
      userPhoto: user.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.uid}`,
      userId: user.uid,
      parentId: parentId, // Si es null, es un comentario principal; si tiene ID, es respuesta
      createdAt: serverTimestamp(),
      isEdited: false
    });
    return { success: true };
  } catch (e) {
    console.error("Error al enviar comentario:", e);
    return { success: false, error: e.message };
  }
};

// Editar el texto de un comentario existente (solo autores)
export const editComment = async (commentId, newText) => {
  try {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, {
      text: newText,
      isEdited: true,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (e) {
    console.error("Error al editar comentario:", e);
    return { success: false };
  }
};

// Eliminar un comentario de la base de datos
export const removeComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    return { success: true };
  } catch (e) {
    console.error("Error al eliminar comentario:", e);
    return { success: false };
  }
};

/**
 * --- DENUNCIAS (Línea Ética) ---
 * Registro de reportes de forma anónima o identificada
 */
export const createDenuncia = async (denunciaData, userId = null) => {
  try {
    const docRef = await addDoc(collection(db, "denuncias"), {
      ...denunciaData,
      user_id: userId, // Puede ser null si la denuncia es anónima
      status: "pending",
      created_at: serverTimestamp()
    });
    return { id: docRef.id, success: true };
  } catch (e) {
    console.error("Error al crear denuncia:", e);
    return { success: false, error: e.message };
  }
};

/**
 * --- JUEGOS (Zona Gamer) ---
 * Guardado de progreso y actualización de puntos en tiempo real
 */
export const saveScore = async (userId, gameType, score, displayName = "Usuario") => {
  try {
    // 1. Registramos la actividad en el historial de puntajes
    await addDoc(collection(db, "game_scores"), {
      user_id: userId,
      display_name: displayName,
      game_type: gameType,
      score: score,
      created_at: serverTimestamp()
    });

    // 2. ACTUALIZACIÓN CRÍTICA: Sumamos los puntos al perfil del usuario
    // Esto disparará la animación en el Navbar gracias al componente AnimatedCounter
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      points: increment(score), // Firestore suma el valor automáticamente
      lastActivity: serverTimestamp()
    });

    return { success: true };
  } catch (e) {
    console.error("Error al guardar puntaje y actualizar perfil:", e);
    return { success: false };
  }
};