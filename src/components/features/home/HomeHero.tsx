"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, CheckCircle2, Zap, ShieldAlert, Sparkles } from "lucide-react";

export function HomeHero() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[95vh] flex-col items-center justify-center px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 text-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Background Image: Casa de Gobierno del Chaco */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/casadegobierno.jpg"
          alt="Casa de Gobierno del Chaco"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 dark:opacity-50 transition-transform duration-700 hover:scale-[1.02]"
          priority
        />
        {/* Overlays for high contrast with text in both modes */}
        <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/80 transition-colors duration-200"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 flex flex-col items-center">
        
        {/* Hero Title */}
        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl max-w-4xl leading-[1.08] select-none pt-4">
          Digitalizamos tu negocio con <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-rose-500 to-orange-500 dark:from-orange-400 dark:via-rose-300 dark:to-orange-300">soluciones que vuelan.</span>
        </h1>

        {/* Description Paragraph */}
        <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
          Diseñamos sitios ultrarrápidos, catálogos interactivos y sistemas a medida para comercios de la zona. Vos proponés la idea que te encanta, y nosotros nos encargamos de hacerla realidad y darte soporte presencial.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4 w-full max-w-md">
          <button 
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-4 text-base font-black text-white shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 transition-all hover:bg-orange-500 active:scale-95 duration-200 cursor-pointer"
          >
            Ver Demos & Plantillas
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Floating Showcase Cards - A Radical and Human Touch! */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 w-full max-w-4xl text-left select-none">
          {/* Card 1 */}
          <div className="group bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cercanía Real</span>
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Soporte en Persona</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Somos de acá, de Resistencia. Nos sentamos a tomar unos mates, charlamos en tu local y resolvemos lo que necesites cara a cara. Jamás te dejamos en banda ni esperando días un soporte frío.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Co-Creación</span>
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Vos Proponés la Estética</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Traenos las ideas, fotos o páginas que te inspiran de internet. Nosotros nos ocupamos de darles vida y armarlas a tu medida. Libertad visual absoluta para tu marca.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tranquilidad</span>
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Nos Ocupamos de Todo</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Nosotros nos hacemos cargo de que todo funcione rápido y seguro en internet. Tu plataforma estará siempre disponible y lista para vender, sin que muevas un dedo.
            </p>
          </div>
        </div>

      </div>

      <button 
        onClick={scrollToPortfolio}
        className="absolute bottom-6 sm:bottom-10 z-10 animate-bounce text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-450 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
