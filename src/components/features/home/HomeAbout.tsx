"use client";

import { Handshake, Zap, ShieldCheck } from "lucide-react";

export function HomeAbout() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-24 sm:py-32 transition-colors duration-200" id="nosotros">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-8">
          Sobre Nosotros
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium text-left mt-12">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-3">📍 De acá, de Resistencia</h3>
            <p className="text-lg">Caminamos las mismas calles y sabemos lo que cuesta levantar la persiana. Queremos tecnología de primera para la ciudad, sin vueltas.</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <h3 className="text-orange-600 dark:text-orange-500 font-bold mb-3">🤝 Trato directo</h3>
            <p className="text-lg">Nos sentamos a tomar unos mates, escuchamos tu problema y te armamos una solución rápida y al alcance del bolsillo.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-3">⚡ Velocidad y utilidad</h3>
            <p className="text-lg">Herramientas para vender más y organizarte mejor. Si algo pasa, no hablás con un bot: <strong className="text-slate-900 dark:text-white font-bold">nos mandás un WhatsApp</strong>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
