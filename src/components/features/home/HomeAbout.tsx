"use client";

import { Handshake, Zap, ShieldCheck } from "lucide-react";

export function HomeAbout() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-24 sm:py-32 transition-colors duration-200" id="nosotros">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          La potencia que tu negocio merece
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400">
          Creamos soluciones digitales de alto rendimiento con foco en tres pilares fundamentales para tu crecimiento.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 transition-colors">
            <div className="h-10 w-10 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center text-orange-655 dark:text-orange-400 font-black mb-4 select-none">
              🚀
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-lg mb-2">Cero Complejidad Técnica</h3>
            <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed font-semibold">
              Nosotros gestionamos los servidores, actualizaciones y optimizaciones. Vos tenés autonomía total para cargar tus productos, rutinas o servicios de manera súper amigable y rápida.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 transition-colors">
            <div className="h-10 w-10 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center text-orange-655 dark:text-orange-400 font-black mb-4 select-none">
              💰
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-lg mb-2">Monetización & Autonomía</h3>
            <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed font-semibold">
              Integrá tus métodos de cobro, vendé planes de suscripción o colocá tus propios anuncios sin intermediarios ni comisiones abusivas. Tus ingresos y políticas son 100% tuyos.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 transition-colors">
            <div className="h-10 w-10 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center text-orange-655 dark:text-orange-400 font-black mb-4 select-none">
              ⚡
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-lg mb-2">Velocidad PWA Extrema</h3>
            <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed font-semibold">
              Web apps instalables en el celular de tus clientes en un segundo. Vuelan con cualquier conexión (perfecto para cuando hay poca señal) y consumen el mínimo de datos móviles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
