"use client";

import { CheckCircle2, XCircle, Zap, ShieldCheck, MapPin } from "lucide-react";

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
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center text-orange-655 dark:text-orange-400 mb-6 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Cero Complejidad Técnica</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Nosotros gestionamos el mantenimiento y las actualizaciones. Vos tenés autonomía total para cargar tus productos o servicios de manera súper amigable.
            </p>
          </div>
          
          {/* Pillar 2 */}
          <div className="group bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 duration-350">
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center text-orange-655 dark:text-orange-400 mb-6 shadow-sm">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Presencia & Soporte Local</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Somos de Resistencia. No lidiás con bots ni tickets en inglés. Nos juntamos a tomar unos mates en tu local y resolvemos todo en el día.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="group bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 duration-350">
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center text-orange-655 dark:text-orange-400 mb-6 shadow-sm">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3">Carga Ultrarrápida</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Sistemas preparados para funcionar al instante en el celular de tus clientes, incluso con mala señal, garantizando que nunca pierdas una venta.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
