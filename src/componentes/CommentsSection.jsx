import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Trash2, Reply, Edit2, X, Clock } from "lucide-react";
import { useAuth } from '../hook/useAuth'; // Ajusta la ruta a tu hook
import { sendComment, removeComment, editComment, db } from '../services/database';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const CommentsSection = () => {
  const { user, role, displayName } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null); // Para editar
  const [replyTo, setReplyTo] = useState(null); // Para responder
  const [loading, setLoading] = useState(false);

  const isModerator = role === 'owner' || role === 'editor';

  // Suscripción en tiempo real a Firestore
  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;
    setLoading(true);

    if (editingComment) {
      // Lógica de Edición
      await editComment(editingComment.id, newComment.trim());
      setEditingComment(null);
    } else {
      // Lógica de Envío (Nuevo o Respuesta)
      await sendComment(newComment.trim(), user, replyTo?.id || null);
    }

    setNewComment("");
    setReplyTo(null);
    setLoading(false);
  };

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.text);
    setReplyTo(null);
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "Enviando...";
    const date = timestamp.toDate();
    return date.toLocaleString('es-PE', { 
      day: '2-digit', month: '2-digit', year: '2-digit',
      hour: '2-digit', minute: '2-digit' 
    });
  };

  // Organizar comentarios (Principales vs Respuestas)
  const mainComments = comments.filter(c => !c.parentId);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="text-[#EE121A]" size={24} />
        <h3 className="font-bold text-xl text-slate-900">Comentarios</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <AnimatePresence>
            {(replyTo || editingComment) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between bg-slate-50 p-2 rounded-t-xl border-x border-t border-slate-200 text-xs"
              >
                <span className="font-medium text-slate-600">
                  {editingComment ? "Editando tu comentario" : `Respondiendo a ${replyTo.userName}`}
                </span>
                <button 
                  onClick={() => { setReplyTo(null); setEditingComment(null); setNewComment(""); }}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyTo ? "Escribe una respuesta..." : "Comparte tu opinión..."}
              className={`flex-1 p-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all ${
                (replyTo || editingComment) ? 'rounded-b-xl' : 'rounded-xl'
              }`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !newComment.trim()}
              className="bg-[#EE121A] text-white px-5 rounded-xl disabled:opacity-50 flex items-center justify-center shadow-lg shadow-red-500/20"
            >
              {editingComment ? <Edit2 size={18} /> : <Send size={18} />}
            </motion.button>
          </div>
        </form>
      ) : (
        <p className="text-slate-500 text-sm mb-6 bg-slate-50 p-4 rounded-xl text-center border border-dashed border-slate-200">
          Inicia sesión para dejar un comentario.
        </p>
      )}

      <div className="space-y-6">
        {mainComments.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8 italic">Aún no hay comentarios. Sé el primero.</p>
        ) : (
          mainComments.map((comment) => (
            <CommentItem 
              key={comment.id}
              comment={comment}
              currentUser={user}
              isModerator={isModerator}
              formatDateTime={formatDateTime}
              onReply={() => setReplyTo(comment)}
              onEdit={() => handleEditClick(comment)}
              allComments={comments} // Para pasar las respuestas
            />
          ))
        )}
      </div>
    </div>
  );
};

// Sub-componente recursivo para comentarios y respuestas
const CommentItem = ({ comment, currentUser, isModerator, formatDateTime, onReply, onEdit, allComments }) => {
  const isOwner = currentUser?.uid === comment.userId;
  const responses = allComments.filter(r => r.parentId === comment.id);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0 overflow-hidden border border-slate-200 shadow-sm">
          <img src={comment.userPhoto} alt="avatar" className="w-full h-full object-cover" />
        </div>

        {/* Burbuja de comentario */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 group">
            <div className="flex items-center justify-between mb-1 gap-2">
              <span className="text-sm font-bold text-slate-900 truncate">
                {comment.userName}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 font-medium">
                <Clock size={10} /> {formatDateTime(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed break-words">
              {comment.text}
            </p>
            {comment.isEdited && (
              <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 block">
                (editado)
              </span>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-4 mt-2 px-1">
            <button 
              onClick={onReply}
              className="text-[10px] font-black text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <Reply size={12} /> RESPONDER
            </button>

            {isOwner && (
              <button 
                onClick={onEdit}
                className="text-[10px] font-black text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors"
              >
                <Edit2 size={12} /> EDITAR
              </button>
            )}

            {(isOwner || isModerator) && (
              <button 
                onClick={() => removeComment(comment.id)} 
                className="text-[10px] font-black text-slate-500 hover:text-[#EE121A] flex items-center gap-1 transition-colors"
              >
                <Trash2 size={12} /> ELIMINAR
              </button>
            )}
          </div>

          {/* Renderizar Respuestas (Indentadas) */}
          {responses.length > 0 && (
            <div className="mt-4 space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
              {responses.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  currentUser={currentUser} 
                  isModerator={isModerator}
                  formatDateTime={formatDateTime}
                  onReply={onReply}
                  onEdit={onEdit}
                  allComments={allComments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CommentsSection;