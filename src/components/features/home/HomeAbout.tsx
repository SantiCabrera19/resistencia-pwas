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
              💰
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Monetización & Autonomía</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Integrá tus métodos de cobro, vendé planes de suscripción o colocá tus propios anuncios sin intermediarios ni comisiones abusivas. Tus ingresos y políticas son 100% tuyos.
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

        {/* CONCEPTS > CODE: High-End Comparison Table */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 sm:p-10 text-left space-y-8 shadow-sm">
          <div className="space-y-1 select-none">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-655 dark:text-orange-400">Comparativa</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">¿Por qué nuestras plantillas son diferentes?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            
            {/* Standard Column */}
            <div className="space-y-4 pb-6 md:pb-0">
              <span className="text-[10px] font-black uppercase text-red-500 tracking-wider">Sitios WordPress / Web Genérica</span>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                  <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                  Plugins pesados que se rompen con cada actualización.
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                  <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                  Carga lenta e inestable con baja señal o 4G en tránsito.
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                  <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                  Dependencia total de programadores para cambiar una nota o precio.
                </li>
              </ul>
            </div>

            {/* Resistencia PWA Column */}
            <div className="space-y-4 pt-6 md:pt-0 md:pl-8">
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">Nuestras Plantillas</span>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  Código ultra limpio y liviano sin plugins inútiles.
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  Acceso inmediato sin demoras. Mirá tus rutinas o gestioná al instante.
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  Paneles móviles súper simples para cambiar todo en 5 segundos.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
