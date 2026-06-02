"use client";

import { FERRETERIA_DATA } from "@/data/ferreteria";

export function Categories() {
  const { categorias } = FERRETERIA_DATA;

  return (
    <section className="bg-slate-900 py-12 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="mb-8 text-xl font-bold text-white uppercase tracking-wider">
          Explorar por rubro
        </h2>
        
        {/* Horizontal scrollable carousel */}
        <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {categorias.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="flex min-w-[140px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-sm bg-slate-800 p-6 hover:bg-slate-700 cursor-pointer border border-slate-700 hover:border-orange-500 transition-colors"
                onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Icon className="h-8 w-8 text-orange-500" />
                <span className="text-center text-sm font-semibold text-slate-200">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
