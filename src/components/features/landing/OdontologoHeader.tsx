"use client";

export function OdontologoHeader() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm px-5 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Logo / Nombre */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-extrabold tracking-tight text-slate-900"
        >
          🦷 Dr. Smile
        </button>

        {/* Nav + CTA */}
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-slate-600">
            <button onClick={() => scrollTo("servicios")} className="hover:text-emerald-600 transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollTo("testimonios")} className="hover:text-emerald-600 transition-colors">
              Pacientes
            </button>
            <button onClick={() => scrollTo("contacto")} className="hover:text-emerald-600 transition-colors">
              Contacto
            </button>
          </nav>
          <button
            onClick={() => scrollTo("contacto")}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-600 active:scale-95"
          >
            Agendar turno
          </button>
        </div>
      </div>
    </header>
  );
}
