"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function HomeHeader() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-900/10 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-6 py-3 shadow-sm transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => scrollTo("top")}>
          {/* Logo aumentado significativamente de tamaño */}
          <div className="h-28 w-28 sm:h-32 sm:w-32 relative -my-4">
            <Image 
              src="/icons/android-chrome-192x192.png" 
              alt="Logo Santi" 
              fill 
              sizes="(max-width: 640px) 112px, 128px"
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-900 dark:text-white transition-colors">Santi</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <ThemeToggle />
          <button onClick={() => scrollTo("nosotros")} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Nosotros</button>
          <button onClick={() => scrollTo("portfolio")} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Trabajos</button>
          <button onClick={() => scrollTo("contacto")} className="rounded-full bg-orange-600 px-4 py-2 text-white hover:bg-orange-500 transition-colors">Hablemos</button>
        </div>
      </div>
    </header>
  );
}
