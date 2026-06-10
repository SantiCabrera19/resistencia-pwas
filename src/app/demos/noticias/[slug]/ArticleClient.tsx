"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getArticleBySlug, getAuthorById, addComment, incrementViews, Article, Author, Comment } from "@/data/noticiasData";
import { ArrowLeft, Calendar, Clock, Eye, MessageSquare, Send, User } from "lucide-react";

interface ArticleClientProps {
  initialArticle: Article | null;
  slug: string;
}

export default function ArticleClient({ initialArticle, slug }: ArticleClientProps) {
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [author, setAuthor] = useState<Author | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadClientData() {
      // Increment views on client load
      await incrementViews(slug);

      // Fetch latest article from localStorage (which might contain comments or edits)
      const latestArticle = await getArticleBySlug(slug);
      if (latestArticle) {
        setArticle(latestArticle);
        setComments(latestArticle.comments || []);
        
        // Fetch author
        const artAuthor = await getAuthorById(latestArticle.authorId);
        setAuthor(artAuthor);
      }
      setLoading(false);
    }
    
    loadClientData();
  }, [slug]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim() || !article) return;

    setSubmitting(true);
    const newComment = await addComment(slug, name.trim(), commentText.trim());
    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      setName("");
    }
    setSubmitting(false);
  };

  const getInitials = (userName: string) => {
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-zinc-900 dark:border-white"></div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 font-serif italic">Abriendo archivo...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-serif font-black text-zinc-800 dark:text-zinc-200">Artículo no encontrado</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">La publicación solicitada no existe o fue eliminada del servidor local.</p>
        <Link href="/demos/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 underline">
          <ArrowLeft className="w-4 h-4" /> Volver a Portada
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      
      {/* 1. BACK BUTTON & BREADCRUMBS */}
      <div className="flex justify-between items-center text-xs font-sans text-zinc-400 select-none">
        <Link href="/demos/noticias" className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Portada</span>
        </Link>
        <div className="flex items-center gap-1">
          <span>Noticias</span>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 uppercase font-bold">{article.category}</span>
        </div>
      </div>

      {/* 2. HEADER BLOCK */}
      <div className="space-y-4 text-center md:text-left">
        <span className="inline-block text-xs font-bold tracking-widest uppercase bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 py-1 px-3 rounded">
          {article.tag}
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-zinc-950 dark:text-white leading-tight">
          {article.title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-sans leading-relaxed italic">
          {article.subtitle}
        </p>

        {/* AUTHOR CARD */}
        <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-y border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400 select-none">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-800 flex items-center justify-center font-bold font-sans">
              {author?.avatar || getInitials(author?.name || "Redacción")}
            </div>
            <div className="text-left">
              <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                {author?.name || "Redacción Especial"}
              </p>
              <p className="text-[10px] text-zinc-400">
                {author?.role || "Corresponsal"}
              </p>
            </div>
          </div>
          <div className="hidden sm:block text-zinc-300 dark:text-zinc-700">|</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(article.date).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime} de lectura</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views + 1} lecturas</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN ARTICLE IMAGE */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 4. ARTICLE CONTENT */}
      <div className="font-serif text-lg md:text-xl text-zinc-850 dark:text-zinc-250 leading-relaxed max-w-none space-y-6 whitespace-pre-wrap">
        {article.content}
      </div>

      {/* Tags divider */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="font-bold text-zinc-400 uppercase tracking-widest mr-2 select-none">Temas:</span>
          <span className="bg-zinc-150 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-1 px-3 rounded">#{article.category}</span>
          <span className="bg-zinc-150 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-1 px-3 rounded">#{article.tag}</span>
          <span className="bg-zinc-150 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-1 px-3 rounded">#ChacoHoy</span>
        </div>
      </div>

      {/* 5. COMMENTS SECTION */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10 space-y-8">
        <h3 className="font-serif font-black text-xl text-zinc-950 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Comentarios ({comments.length})</span>
        </h3>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-zinc-450 dark:text-zinc-400 font-serif italic py-4">No hay comentarios en este artículo. Sé el primero en opinar.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] font-sans">
                      {getInitials(comment.authorName)}
                    </div>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{comment.authorName}</span>
                  </div>
                  <span>{new Date(comment.date).toLocaleDateString("es-AR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans pl-8">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Comment Form */}
        <div className="bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded space-y-4">
          <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Dejá tu opinión</h4>
          <form onSubmit={handlePostComment} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="commenter-name" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5 select-none">Nombre o Apodo</label>
                <input
                  type="text"
                  id="commenter-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Juan de Resistencia"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                />
              </div>
              <div>
                <label htmlFor="comment-text" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5 select-none">Comentario</label>
                <textarea
                  id="comment-text"
                  required
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribí lo que opinás sobre esta publicación..."
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold py-2 px-5 rounded text-xs hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Publicando..." : "Publicar comentario"}</span>
            </button>
          </form>
        </div>

      </div>

    </article>
  );
}
