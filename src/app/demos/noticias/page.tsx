"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getArticles, getAuthors, Article, Author } from "@/data/noticiasData";
import { Clock, Eye, MessageSquare, ChevronRight, Mail, Calendar, Sparkles } from "lucide-react";

function NoticiasHomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFilter = searchParams.get("cat");

  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function loadData() {
      const allArticles = await getArticles();
      const allAuthors = await getAuthors();
      setArticles(allArticles);
      setAuthors(allAuthors);
      setLoading(false);
    }
    loadData();
  }, [categoryFilter]); // reload when filter changes (e.g. new articles created)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Save lead in localStorage for CRM integration demonstration
    const existingLeads = localStorage.getItem("santi_leads")
      ? JSON.parse(localStorage.getItem("santi_leads") || "[]")
      : [];
    
    const newLead = {
      id: `lead-${Date.now()}`,
      email: email.trim(),
      source: "Santi Noticias Newsletter",
      date: new Date().toISOString(),
    };

    localStorage.setItem("santi_leads", JSON.stringify([...existingLeads, newLead]));
    setSubscribed(true);
    setEmail("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-zinc-900 dark:border-white"></div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 font-serif italic">Cargando la edición del día...</p>
      </div>
    );
  }

  // Filter articles by category if query param exists
  const filteredArticles = categoryFilter
    ? articles.filter((a) => a.category.toLowerCase() === categoryFilter.toLowerCase())
    : articles;

  // The very first/most recent article acts as the Main Hero (only when not filtering)
  const heroArticle = !categoryFilter && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const standardArticles = heroArticle ? filteredArticles.slice(1) : filteredArticles;

  // Timeline "Lo Último" - most recent 5 articles
  const latestTimeline = [...articles].slice(0, 5);

  const getAuthorName = (id: string) => {
    return authors.find((a) => a.id === id)?.name || "Redacción";
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
  };

  const getTimelineTime = (isoString: string) => {
    const diffMs = new Date().getTime() - new Date(isoString).getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 60) {
      return `Hace ${diffMin <= 0 ? 1 : diffMin} min`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours} h`;
    } else if (diffDays === 1) {
      return "Ayer";
    } else {
      return `Hace ${diffDays} días`;
    }
  };

  const getDayAndMonth = (isoString: string) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleDateString("es-AR", { month: "short" }).replace(".", "").toUpperCase();
    return { day, month };
  };

  return (
    <div className="space-y-10">
      {/* Category filter active badge */}
      {categoryFilter && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Filtrando sección:</span>
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded text-sm font-bold">
              {categoryFilter}
            </span>
          </div>
          <button
            onClick={() => router.push("/demos/noticias")}
            className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 underline cursor-pointer"
          >
            Ver Portada Completa
          </button>
        </div>
      )}

      {/* Main Grid: 2/3 Content, 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main News Feed */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* A. HERO ARTICLE */}
          {heroArticle && (
            <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden shadow-sm group">
              <Link href={`/demos/noticias/${heroArticle.slug}`}>
                <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroArticle.image}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-zinc-950/80 text-white font-sans text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded">
                    {heroArticle.category}
                  </div>
                </div>
              </Link>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs font-sans text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Por {getAuthorName(heroArticle.authorId)}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(heroArticle.date).toLocaleDateString("es-AR")}</span>
                  </div>
                  <span>•</span>
                  <span>{heroArticle.readTime} de lectura</span>
                </div>

                <Link href={`/demos/noticias/${heroArticle.slug}`}>
                  <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-zinc-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {heroArticle.title}
                  </h2>
                </Link>

                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                  {heroArticle.subtitle}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {heroArticle.views} lecturas</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {heroArticle.comments.length} comentarios</span>
                  </div>
                  <Link
                    href={`/demos/noticias/${heroArticle.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Leer nota completa</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* MOCK AD SPONSOR BANNER (CLS-Free) */}
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-250/80 dark:border-zinc-800 p-4 rounded text-center select-none">
            <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1">ESPACIO PUBLICITARIO DISPONIBLE</span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6">
              <span className="text-sm font-serif font-black text-zinc-700 dark:text-zinc-300">Ferretería El Sol</span>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Todo en herramientas y corralón. Av. Alberdi 450, Resistencia.</span>
              <span className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold py-1 px-2.5 rounded transition-colors cursor-pointer select-none">
                Consultar
              </span>
            </div>
          </div>

          {/* B. BENTO SUB-GRID (Secondary News) */}
          <div className="space-y-6">
            {heroArticle && (
              <h3 className="font-serif font-black text-lg uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                Otras Publicaciones
              </h3>
            )}

            {standardArticles.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 font-serif italic">
                No hay más artículos disponibles en esta sección por hoy.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {standardArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden shadow-xs hover:shadow-sm transition-shadow group flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/demos/noticias/${article.slug}`}>
                        <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-zinc-950/85 text-white font-sans text-[9px] font-bold tracking-widest uppercase py-0.5 px-2 rounded">
                            {article.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 space-y-3">
                        <div className="text-[10px] font-sans text-zinc-400 flex items-center gap-2">
                          <span>{formatDate(article.date)}</span>
                          <span>•</span>
                          <span>Por {getAuthorName(article.authorId)}</span>
                        </div>

                        <Link href={`/demos/noticias/${article.slug}`}>
                          <h4 className="text-lg font-serif font-bold text-zinc-950 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {article.title}
                          </h4>
                        </Link>

                        <p className="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                          {article.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto flex items-center justify-between text-[11px] text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span>{article.views} vistas</span>
                        <span>•</span>
                        <span>{article.comments.length} comentarios</span>
                      </div>
                      <Link
                        href={`/demos/noticias/${article.slug}`}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Leer más
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Timeline & Newsletter) */}
        <div className="space-y-8 lg:border-l lg:border-zinc-200 lg:dark:border-zinc-800 lg:pl-8">
          
          {/* 1. TIMELINE: LO ÚLTIMO */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-6 shadow-xs">
            <h3 className="font-serif font-black text-sm uppercase tracking-widest text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Lo Último</span>
            </h3>

            <div className="flow-root">
              <ul className="-mb-8">
                {latestTimeline.map((article, idx) => {
                  const { day, month } = getDayAndMonth(article.date);
                  return (
                    <li key={article.slug}>
                      <div className="relative pb-8">
                        {idx !== latestTimeline.length - 1 && (
                          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
                        )}
                        <div className="relative flex space-x-3 items-start">
                          <div className="flex-shrink-0">
                            <span className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/40 flex flex-col items-center justify-center ring-4 ring-white dark:ring-zinc-950 select-none">
                              <span className="text-xs font-black text-blue-600 dark:text-blue-400 leading-none">
                                {day}
                              </span>
                              <span className="text-[8px] uppercase tracking-wider font-extrabold text-blue-600/80 dark:text-blue-400/80 leading-none mt-0.5">
                                {month}
                              </span>
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5">
                            <p className="text-xs text-zinc-400 mb-0.5 font-sans font-medium">
                              {getTimelineTime(article.date)} • <span className="text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[9px] font-bold">{article.category}</span>
                            </p>
                            <Link
                              href={`/demos/noticias/${article.slug}`}
                              className="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                            >
                              {article.title}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* MOCK AD SPONSOR BANNER (Sidebar Square) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden shadow-xs select-none">
            <span className="bg-zinc-100 dark:bg-zinc-850 text-[8px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 block py-1 px-3 text-center border-b border-zinc-200 dark:border-zinc-800">
              ANUNCIO AUSPICIANTE
            </span>
            <div className="p-5 text-center space-y-2">
              <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">ODONTOLOGÍA INTEGRAL</span>
              <p className="text-sm font-serif font-black text-zinc-900 dark:text-white leading-tight">
                Clínica Dental Resistencia
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                Tu sonrisa en las mejores manos. Consultorio premium en el centro de Resistencia.
              </p>
              <button className="w-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 text-white hover:opacity-90 text-[10px] font-bold py-1.5 rounded cursor-pointer transition-all select-none">
                Reservar Cita
              </button>
            </div>
          </div>

          {/* 2. NEWSLETTER / LEAD CAPTURE */}
          <div className="bg-zinc-900 dark:bg-zinc-900 text-white rounded p-6 border border-zinc-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Mail className="w-48 h-48" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-400">FIDELIZACIÓN DE AUDIENCIA</span>
              </div>
              <h3 className="font-serif font-black text-xl leading-tight">
                Recibí el Reporte Chaqueño
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Suscribite y recibí todas las mañanas el resumen informativo de Resistencia y el interior directamente en tu casilla de correo.
              </p>

              {subscribed ? (
                <div className="bg-zinc-800 border border-zinc-700/60 p-4 rounded text-center text-xs space-y-2">
                  <p className="font-bold text-yellow-400">¡Suscripción exitosa!</p>
                  <p className="text-[10px] text-zinc-400">Te registramos correctamente en el CRM local de Santi Soluciones.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-yellow-400 placeholder-zinc-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-zinc-950 font-bold py-2 rounded text-xs hover:bg-yellow-300 transition-colors cursor-pointer"
                  >
                    Suscribirme ahora
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 3. PROPUESTA DE VALOR SANTI SOLUCIONES */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-6 shadow-xs space-y-3">
            <span className="text-[9px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">TECNOLOGÍA</span>
            <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
              ¿Por qué este portal carga instantáneamente?
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Está desarrollado sobre **Next.js 16** y configurado como una **PWA (Progressive Web App)**. Permite lectura offline, instalación directa en la pantalla del celular del lector y carga instantánea de notas al evitar la sobrecarga de código de los portales tradicionales.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-1 px-2.5 rounded">
                SEO Avanzado & Carga Inmediata
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function NoticiasHomePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-zinc-900 dark:border-white"></div>
      </div>
    }>
      <NoticiasHomeContent />
    </Suspense>
  );
}
