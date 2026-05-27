"use client";

import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { Truck, MapPin, Package, CheckCircle2, Clock } from "lucide-react";

const MOCK_KANBAN = {
  "Preparando": [
    { id: "ENV-001", cliente: "Constructora NEA S.A.", destino: "Obra Centro (Resistencia)", items: 45, prioridad: "Alta" },
    { id: "ENV-002", cliente: "Juan Pérez", destino: "Barranqueras, Av. San Martín 1500", items: 3, prioridad: "Normal" },
  ],
  "En Reparto": [
    { id: "ENV-003", cliente: "Ferretería El Sol", destino: "Fontana", items: 120, prioridad: "Alta" },
  ],
  "Entregado": [
    { id: "ENV-004", cliente: "Arq. Carlos Silva", destino: "Obra Sarmiento", items: 15, prioridad: "Normal" },
  ]
};

export default function EnviosPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <PageHeader 
        title="Logística y Despachos" 
        description="Tablero Kanban para seguimiento de entregas a domicilio y obras."
        action={
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-95 text-sm">
            <Truck className="h-4.5 w-4.5" />
            Asignar Nuevo Reparto
          </button>
        }
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        
        {/* Columna: Preparando */}
        <div className="bg-slate-100 rounded-2xl p-4 flex flex-col h-full border border-slate-200/60">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-extrabold text-slate-800 uppercase text-sm tracking-wider flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-500" /> Preparando
            </h3>
            <span className="bg-slate-200 text-slate-600 text-xs font-black px-2 py-0.5 rounded-full">{MOCK_KANBAN["Preparando"].length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 px-1">
            {MOCK_KANBAN["Preparando"].map(envio => (
              <div key={envio.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab hover:border-orange-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{envio.id}</span>
                  {envio.prioridad === "Alta" && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <h4 className="font-bold text-sm text-slate-800 leading-tight">{envio.cliente}</h4>
                <div className="mt-3 flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500"><MapPin className="h-3 w-3" /> {envio.destino}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500"><Package className="h-3 w-3" /> {envio.items} artículos</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna: En Reparto */}
        <div className="bg-orange-50/50 rounded-2xl p-4 flex flex-col h-full border border-orange-100">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-extrabold text-orange-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <Truck className="h-4 w-4 text-orange-500" /> En Reparto
            </h3>
            <span className="bg-orange-200 text-orange-800 text-xs font-black px-2 py-0.5 rounded-full">{MOCK_KANBAN["En Reparto"].length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 px-1">
            {MOCK_KANBAN["En Reparto"].map(envio => (
              <div key={envio.id} className="bg-white p-4 rounded-xl shadow-sm border border-orange-200 cursor-grab hover:border-orange-400 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">{envio.id}</span>
                  {envio.prioridad === "Alta" && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <h4 className="font-bold text-sm text-slate-800 leading-tight">{envio.cliente}</h4>
                <div className="mt-3 flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500"><MapPin className="h-3 w-3" /> {envio.destino}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500"><Clock className="h-3 w-3" /> Sale: Chofer Mario</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna: Entregado */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 flex flex-col h-full border border-emerald-100">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-extrabold text-emerald-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Entregado
            </h3>
            <span className="bg-emerald-200 text-emerald-800 text-xs font-black px-2 py-0.5 rounded-full">{MOCK_KANBAN["Entregado"].length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 px-1">
            {MOCK_KANBAN["Entregado"].map(envio => (
              <div key={envio.id} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-200 opacity-60">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{envio.id}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 leading-tight">{envio.cliente}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-2">Firmado y completado hoy.</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
