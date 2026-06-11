"use client";

import Image from "next/image";
import { Sparkles, Heart, Code2 } from "lucide-react";

export function HomeManifesto() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-6 py-24 select-none" id="manifiesto">
      
      {/* Background Image: Universo-Resistencia.jpg as an immersive backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Universo-Resistencia.jpg"
          alt="Universo Resistencia"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 dark:opacity-30 transition-transform duration-700 hover:scale-[1.02]"
          priority
        />
        {/* Subtle radial and linear overlays for smooth blend in both light and dark modes */}
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-950/60 transition-colors duration-200"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent transition-colors duration-200"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl text-center space-y-12">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 dark:bg-orange-500/5 px-4 py-2 text-xs font-black text-orange-655 dark:text-orange-450 border border-orange-500/20 dark:border-orange-500/10 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>NUESTRA FILOSOFÍA</span>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Creemos en las soluciones <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-500 dark:from-orange-450 dark:to-rose-450">cercanas e impecables.</span>
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-400 leading-relaxed">
            Resistencia no es solo un nombre, es el lugar donde vivimos y trabajamos. No hacemos páginas al por mayor; creamos soluciones a medida que ayudan a crecer a los comercios de nuestra ciudad de forma real y honesta.
          </p>
        </div>

        {/* Manifesto Pillars (Bento Grid Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto pt-6">
          {/* Pillar 1 */}
          <div className="bg-white/40 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl shadow-xs transition-all hover:border-orange-500/25">
            <h3 className="font-black text-sm text-slate-800 dark:text-white">Diseño a tu Medida</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Traenos las ideas, capturas de pantalla o páginas que te inspiran de internet y nosotros nos ocupamos de darles vida con un acabado estético premium, adaptado 100% a tu marca.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/40 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl shadow-xs transition-all hover:border-orange-500/25">
            <h3 className="font-black text-sm text-slate-800 dark:text-white">Cercanía y Confianza</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Trabajamos con comercios locales. Creemos que la cercanía humana genera las mejores relaciones de trabajo. Estamos siempre disponibles, cara a cara y en persona.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/40 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl shadow-xs transition-all hover:border-orange-500/25">
            <h3 className="font-black text-sm text-slate-800 dark:text-white">Impulso Local</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Digitalizar los negocios de nuestra ciudad nos fortalece a todos. Nos comprometemos a que tu marca tenga una presencia premium única en internet que te enorgullezca mostrar.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
