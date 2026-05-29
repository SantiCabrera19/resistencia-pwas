"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HomeHero() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-32 pb-20 sm:pt-40 sm:pb-24 text-center overflow-hidden">
      {/* Background Image of Resistencia */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Resistencia.jpg"
          alt="Ciudad de Resistencia, Chaco"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
          quality={85}
        />
        {/* White / Slate clean overlay inspired by medios.io */}
        <div className="absolute inset-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        <div className="inline-flex flex-wrap justify-center items-center gap-2 rounded-2xl sm:rounded-full bg-slate-200/80 dark:bg-slate-900/65 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-slate-750 dark:text-slate-200 ring-1 ring-inset ring-slate-300/40 dark:ring-slate-800/40 backdrop-blur-md max-w-full text-center">
          <span>Agencia de Desarrollo de Software</span>
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
          <span>Resistencia, Chaco</span>
        </div>

        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl">
          Digitalizamos tu negocio con <span className="text-orange-600 dark:text-orange-550">soluciones reales.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
          Diseñamos plataformas rápidas, fáciles de usar y pensadas para hacerte la vida más fácil. Ni más ni menos de lo que necesitás para vender, gestionar y crecer.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
          <button 
            onClick={scrollToPortfolio}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-orange-500 hover:shadow-orange-500/25 active:scale-95"
          >
            Ver Demos & Plantillas
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <button 
        onClick={scrollToPortfolio}
        className="absolute bottom-10 z-10 animate-bounce text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-450 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
