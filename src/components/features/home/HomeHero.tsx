"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HomeHero() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
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
        {/* Semi-transparent Emerald Overlay to ensure perfect text readability */}
        <div className="absolute inset-0 bg-emerald-900/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/60 px-4 py-2 text-sm font-medium text-emerald-100 ring-1 ring-inset ring-emerald-500/40 backdrop-blur-md">
          <span>Agencia de Desarrollo de Software</span>
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          <span>Resistencia, Chaco</span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-sm">
          Digitalizamos tu negocio con <span className="text-orange-500 drop-shadow-sm">soluciones que funcionan.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-emerald-50 leading-relaxed drop-shadow-sm font-medium">
          Diseñamos plataformas rápidas, fáciles de usar y pensadas para hacerte la vida más fácil. Ni más ni menos de lo que necesitás para crecer.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
          <button 
            onClick={scrollToPortfolio}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-orange-500 hover:shadow-orange-500/25 active:scale-95"
          >
            Ver Trabajos y Demos
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <button 
        onClick={scrollToPortfolio}
        className="absolute bottom-10 z-10 animate-bounce text-emerald-400 hover:text-emerald-200 transition-colors drop-shadow-sm"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
