"use client";

import { Sparkles, HeartPulse, Activity } from "lucide-react";

export function OdontologoServices() {
  return (
    <section className="bg-slate-50 px-5 py-20" id="servicios">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Nuestros Tratamientos
          </h2>
          <p className="mt-2 text-slate-600 font-medium">
            Odontología integral especializada para toda la familia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Estética Dental</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Blanqueamientos láser, carillas de porcelana y diseño de sonrisa por computadora para resultados perfectos.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Implantes</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Cirugía guiada 3D. Recuperá la funcionalidad y estética de tus dientes con implantes de titanio de primera línea.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Ortodoncia</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Alineadores invisibles y brackets estéticos. Tratamientos rápidos y discretos para todas las edades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
