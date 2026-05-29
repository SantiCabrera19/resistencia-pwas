"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function HomeHeader() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-6 py-2 shadow-sm transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-14 sm:h-16">
        <div className="flex items-center gap-2 cursor-pointer h-12 w-24 relative select-none" onClick={() => scrollTo("top")}>
          {/* Logo absolute más grande (hanging logo) sin agrandar la altura vertical del header */}
          <div className="absolute left-0 -top-4.5 h-22 w-22 sm:h-26 sm:w-26 transition-all duration-300 hover:scale-110">
            <Image 
              src="/icons/android-chrome-192x192.png" 
              alt="Logo Santi" 
              fill 
              sizes="(max-width: 640px) 88px, 104px"
              className="object-contain drop-shadow-md filter dark:drop-shadow-[0_0_8px_rgba(249,115,22,0.15)]"
              priority
            />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-650 dark:text-slate-350">
          <ThemeToggle />
          <button onClick={() => scrollTo("nosotros")} className="hover:text-orange-600 dark:hover:text-orange-450 transition-colors">Beneficios</button>
          <button onClick={() => scrollTo("portfolio")} className="hover:text-orange-600 dark:hover:text-orange-450 transition-colors">Demos & Plantillas</button>
          <button onClick={() => scrollTo("contacto")} className="rounded-full bg-orange-600 px-4 py-2 text-white hover:bg-orange-500 transition-colors">Hablemos</button>
        </div>
      </div>
    </header>
  );
}
