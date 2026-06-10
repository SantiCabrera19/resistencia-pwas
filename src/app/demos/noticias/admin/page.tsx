"use client";

import React, { useState, useEffect } from "react";
import { getArticles, getAuthors, createArticle, deleteArticle, deleteComment, Article, Author } from "@/data/noticiasData";
import { Plus, Trash, BarChart2, Eye, MessageSquare, BookOpen, Check, AlertCircle } from "lucide-react";

export default function NoticiasAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  // Form inputs
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Economía");
  const [tag, setTag] = useState("Comercio Local");
  const [authorId, setAuthorId] = useState("santi-cabrera");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("4 min");

  // Notifications
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    const allArticles = await getArticles();
    const allAuthors = await getAuthors();
    setArticles(allArticles);
    setAuthors(allAuthors);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim() || !content.trim()) {
      setErrorMsg("Por favor, completa los campos requeridos.");
      return;
    }

    const defaultImg = image.trim() || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";

    try {
      await createArticle({
        title: title.trim(),
        subtitle: subtitle.trim(),
        category,
        tag: tag.trim(),
        authorId,
        image: defaultImg,
        content: content.trim(),
        readTime
      });

      setSuccessMsg("¡Artículo publicado correctamente en la portada del diario!");
      setErrorMsg("");
      
      // Reset form
      setTitle("");
      setSubtitle("");
      setImage("");
      setContent("");
      
      // Reload lists
      await loadData();

      // Clear success message after 4s
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg("Ocurrió un error al crear la publicación.");
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    if (confirm("¿Seguro que querés eliminar esta noticia de la portada?")) {
      const ok = await deleteArticle(slug);
      if (ok) {
        setSuccessMsg("Artículo eliminado.");
        setTimeout(() => setSuccessMsg(""), 3000);
        await loadData();
      }
    }
  };

  const handleDeleteComment = async (slug: string, commentId: string) => {
    if (confirm("¿Seguro que querés moderar y eliminar este comentario?")) {
      const ok = await deleteComment(slug, commentId);
      if (ok) {
        setSuccessMsg("Comentario eliminado.");
        setTimeout(() => setSuccessMsg(""), 3000);
        await loadData();
      }
    }
  };

  const getAuthorName = (id: string) => {
    return authors.find((a) => a.id === id)?.name || "Redacción";
  };

  // Stats calculation
  const totalArticles = articles.length;
  const totalViews = articles.reduce((acc, curr) => acc + curr.views, 0);
  const totalComments = articles.reduce((acc, curr) => acc + (curr.comments?.length || 0), 0);

  // Flat list of all comments for moderation
  const allCommentsFlat = articles.flatMap((art) => 
    (art.comments || []).map((c) => ({
      ...c,
      articleTitle: art.title,
      articleSlug: art.slug
    }))
  );

  const imagePresets = [
    { name: "Negocios/Oficina", url: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80" },
    { name: "Cultura/Arte", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" },
    { name: "Prensa/Escritura", url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80" },
    { name: "Deportes/Estadio", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80" }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-zinc-900 dark:border-white"></div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 font-serif italic">Abriendo panel de redacción...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* HEADER SECTION */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-2xl md:text-3xl font-serif font-black text-zinc-900 dark:text-white uppercase tracking-tight">
          Panel de Redacción & CMS
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Herramienta interna para periodistas. Publicá noticias en tiempo real, monitoreá lecturas y moderá la opinión de la audiencia.
        </p>
      </div>

      {/* 1. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-400">Total Artículos</p>
            <h3 className="text-3xl font-serif font-black text-zinc-900 dark:text-white mt-1">{totalArticles}</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-full text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-400">Lecturas Totales</p>
            <h3 className="text-3xl font-serif font-black text-zinc-900 dark:text-white mt-1">{totalViews}</h3>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/40 rounded-full text-green-600">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-400">Comentarios Totales</p>
            <h3 className="text-3xl font-serif font-black text-zinc-900 dark:text-white mt-1">{totalComments}</h3>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/40 rounded-full text-yellow-600">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      {successMsg && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-4 rounded flex items-center gap-2 text-sm">
          <Check className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded flex items-center gap-2 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. CMS CONTENT MANAGEMENT WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM COLUMN (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded shadow-xs">
            <h3 className="font-serif font-black text-lg text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <span>Publicar Nueva Nota</span>
            </h3>

            <form onSubmit={handleCreateArticle} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Título del Artículo *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Nuevas medidas de fomento comercial en el centro de Resistencia"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Copete / Bajada (Subtítulo) *</label>
                  <textarea
                    required
                    rows={2}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Resumen corto que aparece en la grilla y debajo del título."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Categoría *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  >
                    <option value="Economía">Economía</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Deportes">Deportes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Etiqueta / Tag</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Ej: Bienal 2026, Emprendedores"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Autor de la nota *</label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  >
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Tiempo estimado de lectura</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Ej: 4 min"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Imagen de la nota (URL)</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Pega una URL de imagen o selecciona un preset abajo"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[10px] font-bold text-zinc-400 self-center mr-1">Presets libres:</span>
                    {imagePresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className="text-[9px] font-bold bg-zinc-150 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Cuerpo del Artículo (Contenido principal) *</label>
                  <textarea
                    required
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribí el texto completo de la noticia..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:dark:border-blue-400 font-serif leading-relaxed"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold py-2.5 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                Publicar en Portada
              </button>
            </form>
          </div>
        </div>

        {/* SIDEBAR: ARTICLE LIST & MODERATION (1/3 width) */}
        <div className="space-y-6">
          
          {/* ARTICLE LIST */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded shadow-xs">
            <h3 className="font-serif font-black text-sm uppercase tracking-widest text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
              Noticias Publicadas
            </h3>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-850 max-h-96 overflow-y-auto pr-1">
              {articles.map((art) => (
                <div key={art.slug} className="py-3 flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{art.category}</p>
                    <p className="text-xs font-bold text-zinc-850 dark:text-zinc-150 line-clamp-2 mt-0.5">{art.title}</p>
                    <p className="text-[10px] text-zinc-400 mt-1">{art.views} vistas • {art.comments.length} comentarios</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArticle(art.slug)}
                    className="p-1 rounded text-zinc-400 hover:text-red-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                    title="Eliminar artículo"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* COMMENTS MODERATION */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded shadow-xs">
            <h3 className="font-serif font-black text-sm uppercase tracking-widest text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
              Moderar Comentarios
            </h3>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-850 max-h-96 overflow-y-auto pr-1">
              {allCommentsFlat.length === 0 ? (
                <p className="text-xs text-zinc-400 italic py-4">No hay comentarios para moderar.</p>
              ) : (
                allCommentsFlat.map((comm) => (
                  <div key={comm.id} className="py-3 space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span className="font-bold text-zinc-700 dark:text-zinc-300">{comm.authorName}</span>
                      <button
                        onClick={() => handleDeleteComment(comm.articleSlug, comm.id)}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                        title="Borrar comentario"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-650 dark:text-zinc-350 line-clamp-2 italic leading-relaxed">
                      "{comm.content}"
                    </p>
                    <p className="text-[9px] text-zinc-400">En: <span className="underline">{comm.articleTitle}</span></p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
