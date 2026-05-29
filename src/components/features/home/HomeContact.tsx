"use client";

import { MessageSquare, Instagram, ExternalLink, Sparkles } from "lucide-react";

export function HomeContact() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-24 sm:py-32 transition-colors duration-200" id="contacto">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 px-6 py-16 sm:p-20 text-center shadow-xl shadow-slate-100/40 dark:shadow-none relative overflow-hidden transition-colors">
        
        {/* Glow ambient inside card */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-orange-100 dark:bg-orange-950/20 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-rose-100 dark:bg-rose-950/20 blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 space-y-8 flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 dark:bg-orange-500/5 px-3.5 py-1.5 rounded-full border border-orange-500/20 text-[9px] font-black text-orange-655 dark:text-orange-400 uppercase tracking-widest select-none">
            <Sparkles className="h-3 w-3" />
            <span>¿Hablamos?</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl select-none leading-none">
              ¿Tenés un local y querés vender más?
            </h2>
            <p className="mx-auto max-w-xl text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
              No necesitás saber de programación ni lidiar con configuraciones complicadas. Contanos a qué se dedica tu negocio y nosotros nos encargamos del resto.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2 select-none">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/5493624000000" // Demo Whatsapp
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20b958] px-8 py-4 text-sm font-black text-white shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all active:scale-95 duration-200 cursor-pointer"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              Charlemos por WhatsApp
            </a>
            
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-tr from-[#fd5949] to-[#d6249f] hover:opacity-95 px-8 py-4 text-sm font-black text-white shadow-md shadow-rose-500/10 hover:shadow-rose-500/20 transition-all active:scale-95 duration-200 cursor-pointer"
            >
              <Instagram className="h-4.5 w-4.5" />
              Seguinos en Instagram
            </a>
          </div>
          
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest select-none">
            RESPUESTA INMEDIATA • SIN FORMULARIOS LARGOS • TRATO DE AMIGO
          </p>
        </div>
      </div>
    </section>
  );
}
