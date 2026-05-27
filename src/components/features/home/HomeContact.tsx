"use client";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function HomeContact() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-24 sm:py-32 transition-colors duration-200" id="contacto">
      <div className="mx-auto max-w-4xl rounded-3xl bg-emerald-900 dark:bg-emerald-950 px-6 py-16 sm:p-20 text-center shadow-xl shadow-emerald-900/10 relative overflow-hidden transition-colors duration-200">
        {/* Decorator */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-emerald-800 dark:bg-emerald-900 opacity-50 blur-3xl transition-colors duration-200"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            ¿Tenés un local y no sabés por dónde empezar?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100 mb-10 leading-relaxed">
            No necesitas saber de tecnología. Contanos qué hace tu negocio, qué problemas tenés en el día a día (turnos cruzados, falta de stock, etc.) y nosotros armamos un plan a medida.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#20b958] hover:shadow-[#25D366]/25 active:scale-95">
              <WhatsAppIcon className="h-6 w-6" />
              WhatsApp
            </button>
            
            <button className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gradient-to-tr from-[#fd5949] to-[#d6249f] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-[#d6249f]/25 active:scale-95">
              <InstagramIcon className="h-6 w-6" />
              Instagram
            </button>
          </div>
          
          <p className="mt-8 text-sm text-emerald-200/60">
            Respuesta rápida. Sin formularios largos, ni compromisos, ni llamadas pesadas de venta.
          </p>
        </div>
      </div>
    </section>
  );
}
