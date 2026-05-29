"use client";

import { ArrowRight, ChevronDown, CheckCircle2, Zap, ShieldAlert, Sparkles } from "lucide-react";

export function HomeHero() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[95vh] flex-col items-center justify-center px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 text-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Mesh Grid Background inspired by premium designs */}
      <div className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.15] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Glowing Peach/Orange Ambient Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[400px] bg-gradient-to-r from-orange-400/20 via-rose-400/10 to-orange-500/10 dark:from-orange-500/10 dark:via-rose-500/5 dark:to-transparent rounded-full blur-3xl opacity-80 pointer-events-none z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 dark:bg-orange-500/5 px-4 py-2 text-xs font-black text-orange-655 dark:text-orange-400 border border-orange-500/20 dark:border-orange-500/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>ESTUDIO DE DISEÑO & SOLUCIONES INTERACTIVAS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl max-w-4xl leading-[1.08] select-none">
          Digitalizamos tu negocio con <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-rose-500 to-orange-500 dark:from-orange-550 dark:via-rose-400 dark:to-orange-450">soluciones que vuelan.</span>
        </h1>

        {/* Description Paragraph */}
        <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
          Diseñamos sitios rápidos, catálogos interactivos e interfaces a medida para comercios de la zona. Vos proponés el diseño o ideas que te encantan, y nosotros nos encargamos de maquetar, programar y darte soporte presencial.
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
          <div className="group bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cercanía Real</span>
            </div>
            <h3 className="font-black text-sm text-slate-800 dark:text-white">Soporte en Persona</h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Somos de acá, de Resistencia. Nos sentamos a tomar unos mates, charlamos en tu local y resolvemos lo que necesites cara a cara. Jamás te dejamos en banda ni esperando días un soporte frío.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Co-Creación</span>
            </div>
            <h3 className="font-black text-sm text-slate-800 dark:text-white">Vos Proponés la Estética</h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Traenos las ideas, capturas o páginas que te inspiran de internet. Nosotros nos ocupamos de maquetarlas y programar el código a medida. Libertad visual absoluta para tu marca.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tranquilidad</span>
            </div>
            <h3 className="font-black text-sm text-slate-800 dark:text-white">Hosting y Servidores</h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Nosotros nos hacemos cargo de mantener las cosas funcionando rápido y seguras, de las actualizaciones y el backup. Tu web estará en el aire siempre lista para vender.
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
