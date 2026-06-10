"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Newspaper, CloudSun, MapPin } from "lucide-react";

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setMounted(true);
    // Format date in Spanish Rioplatense style
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    const formatted = today.toLocaleDateString("es-AR", options);
    // Capitalize first letter
    setFormattedDate(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  const navItems = [
    { name: "Portada", href: "/demos/noticias" },
    { name: "Economía", href: "/demos/noticias?cat=Economía" },
    { name: "Cultura", href: "/demos/noticias?cat=Cultura" },
    { name: "Tecnología", href: "/demos/noticias?cat=Tecnología" },
    { name: "Deportes", href: "/demos/noticias?cat=Deportes" },
    { name: "Panel Editor", href: "/demos/noticias/admin" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* 1. TOP BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs py-2 px-4 md:px-8 flex justify-between items-center select-none">
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Resistencia, Chaco</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <CloudSun className="w-3.5 h-3.5 text-blue-500" />
            <span>24°C • Humedad: 82%</span>
          </div>
        </div>
        <div className="text-zinc-500 dark:text-zinc-400 font-medium">
          {formattedDate || "Cargando fecha..."}
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
              aria-label="Alternar modo oscuro"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <Link
            href="/"
            className="text-[10px] font-bold tracking-wider uppercase bg-zinc-900 text-white dark:bg-white dark:text-black py-1 px-2.5 rounded hover:opacity-95"
          >
            Volver al Portfolio
          </Link>
        </div>
      </div>

      {/* 2. MAIN HEADER (EDITORIAL SERIF LOGO) */}
      <header className="bg-white dark:bg-zinc-900 px-4 py-4 md:py-5 border-b border-zinc-200 dark:border-zinc-800 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/* Left Editorial Info */}
          <div className="hidden md:flex flex-col text-left text-[10px] font-sans text-zinc-400 dark:text-zinc-500 border-r border-zinc-200 dark:border-zinc-850 pr-6 min-w-[140px]">
            <span className="font-bold tracking-wider text-zinc-500 dark:text-zinc-400">EDICIÓN DIGITAL</span>
            <span>FUNDADO EN 2026</span>
          </div>

          {/* Center Brand Logo */}
          <Link href="/demos/noticias" className="group text-center flex-1">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Newspaper className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-550">
                PORTAL DIGITAL INDEPENDIENTE
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
              Santi Noticias
            </h1>
          </Link>

          {/* Right Editorial Info */}
          <div className="hidden md:flex flex-col text-right text-[10px] font-sans text-zinc-400 dark:text-zinc-500 border-l border-zinc-200 dark:border-zinc-850 pl-6 min-w-[140px]">
            <span className="font-bold tracking-wider text-zinc-500 dark:text-zinc-400">TECNOLOGÍA & SEO</span>
            <span>SANTI SOLUCIONES</span>
          </div>

        </div>
      </header>

      {/* 3. CATEGORIES NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-12">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center h-full text-sm font-medium tracking-wide">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.name !== "Portada" && pathname + `?cat=${item.name}` === item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors h-full flex items-center border-b-2 ${
                    isActive
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center py-2">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">SECCIONES</span>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
            aria-label="Menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* 4. MAIN CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {children}
      </main>

      {/* 5. EDITORIAL FOOTER */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-12 px-4 md:px-8 mt-12 text-zinc-600 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Newspaper className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
              <span className="font-serif font-black tracking-tight text-lg text-zinc-900 dark:text-white uppercase">
                Santi Noticias
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Portal informativo de demostración desarrollado por **Santi Soluciones**. Diseñado para probar velocidad, SEO semántico y experiencia de lectura premium en medios digitales locales.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
              Categorías
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/demos/noticias?cat=Economía" className="hover:text-blue-600 dark:hover:text-blue-400">Economía</Link>
              <Link href="/demos/noticias?cat=Cultura" className="hover:text-blue-600 dark:hover:text-blue-400">Cultura</Link>
              <Link href="/demos/noticias?cat=Tecnología" className="hover:text-blue-600 dark:hover:text-blue-400">Tecnología</Link>
              <Link href="/demos/noticias?cat=Deportes" className="hover:text-blue-600 dark:hover:text-blue-400">Deportes</Link>
              <Link href="/demos/noticias/admin" className="hover:text-blue-600 dark:hover:text-blue-400">Panel Editor</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
              Santi Soluciones
            </h4>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 mb-2">
              Desarrollamos aplicaciones web progresivas (PWAs), landing pages y sistemas de gestión local en Resistencia, Chaco.
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} Santi Soluciones. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
