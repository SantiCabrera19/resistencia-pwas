"use client";

export function FerreteriaHeader() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm px-5 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-black text-xl tracking-tighter text-white flex items-center gap-2"
        >
          <div className="h-8 w-8 bg-orange-600 flex items-center justify-center text-white skew-x-[-10deg]">
            <span className="skew-x-[10deg]">F</span>
          </div>
          FERREMAX
        </button>

        {/* Nav + CTA */}
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-slate-400">
            <button onClick={() => scrollTo("catalogo")} className="hover:text-white transition-colors">
              Catálogo
            </button>
            <button onClick={() => scrollTo("beneficios")} className="hover:text-white transition-colors">
              Beneficios
            </button>
            <button onClick={() => scrollTo("contacto")} className="hover:text-white transition-colors">
              Contacto
            </button>
          </nav>
          <button
            onClick={() => scrollTo("contacto")}
            className="rounded-sm bg-orange-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-95"
          >
            Cotizar
          </button>
        </div>
      </div>
    </header>
  );
}
