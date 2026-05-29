"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export function HomeAbout() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-24 sm:py-32 transition-colors duration-200" id="nosotros">
      <div className="mx-auto max-w-5xl text-center space-y-20">
        
        {/* Main Header */}
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl select-none leading-tight">
            La potencia de nuestras plantillas a tu alcance
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400">
            Optimizamos tu tecnología de punta a punta para que te concentres únicamente en crecer. Sin dolores de cabeza técnicos.
          </p>
        </div>

        {/* The 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Pillar 1 */}
          <div className="group bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 duration-350">
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center text-orange-655 dark:text-orange-400 text-lg font-black mb-6 select-none shadow-sm">
              🚀
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Cero Complejidad Técnica</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Nosotros gestionamos los servidores, actualizaciones y optimizaciones. Vos tenés autonomía total para cargar tus productos, rutinas o servicios de manera súper amigable y rápida.
            </p>
          </div>
          
          {/* Pillar 2 */}
          <div className="group bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 duration-350">
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center text-orange-655 dark:text-orange-400 text-lg font-black mb-6 select-none shadow-sm">
              📍
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Presencia & Soporte Local</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Somos de Resistencia, Chaco. No lidiás con bots ni tickets automáticos en inglés. Nos juntamos a tomar unos mates, lo charlamos en tu local y lo resolvemos en el día. Jamás te dejamos en banda.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="group bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 duration-350">
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center text-orange-655 dark:text-orange-400 text-lg font-black mb-6 select-none shadow-sm">
              ⚡
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Velocidad y Carga Extrema</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Plantillas preparadas para instalarse en el celular de tus clientes en un segundo. Vuelan con cualquier conexión (incluso sin señal) y consumen el mínimo de datos.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
