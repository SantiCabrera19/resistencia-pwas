"use client";

import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Settings, Save, Building, FileText, Printer
} from "lucide-react";
import { useState } from "react";

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<"empresa" | "facturacion" | "tickets">("empresa");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader 
        title="Configuración" 
        description="Ajustes generales del sistema, datos fiscales e impresión."
        action={
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-95 text-sm">
            <Save className="h-4.5 w-4.5" />
            Guardar Cambios
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Menú lateral */}
        <div className="md:col-span-4 space-y-2">
          <button 
            onClick={() => setActiveTab("empresa")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "empresa" ? "bg-white text-orange-700 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Building className="h-5 w-5" /> Datos de Empresa
          </button>
          <button 
            onClick={() => setActiveTab("facturacion")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "facturacion" ? "bg-white text-orange-700 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <FileText className="h-5 w-5" /> Puntos de Venta (AFIP)
          </button>
          <button 
            onClick={() => setActiveTab("tickets")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "tickets" ? "bg-white text-orange-700 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Printer className="h-5 w-5" /> Controladoras Fiscales
          </button>
        </div>

        {/* Panel principal */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
            
            {activeTab === "empresa" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Perfil Comercial</h3>
                  <p className="text-sm font-semibold text-slate-500">Datos mostrados en remitos y tickets.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Razón Social</label>
                    <input type="text" defaultValue="FerreMax S.R.L." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:outline-none" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CUIT</label>
                    <input type="text" defaultValue="30-12345678-9" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:outline-none" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Condición IVA</label>
                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:outline-none">
                      <option>Responsable Inscripto</option>
                      <option>Monotributo</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "facturacion" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Puntos de Venta (AFIP)</h3>
                  <p className="text-sm font-semibold text-slate-500">Administrá las bocas de facturación activas.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div>
                      <p className="font-bold text-sm text-slate-800">Punto de Venta 0001</p>
                      <p className="text-xs font-medium text-slate-500">Mostrador Principal (Local 1)</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-1 rounded-md">Activo</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div>
                      <p className="font-bold text-sm text-slate-800">Punto de Venta 0002</p>
                      <p className="text-xs font-medium text-slate-500">Facturación Web / Mayorista</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-1 rounded-md">Activo</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Controladoras Fiscales</h3>
                  <p className="text-sm font-semibold text-slate-500">Configuración de impresoras térmicas locales.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl">
                    <Printer className="h-5 w-5 text-slate-400 mt-1" />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-800">EPSON TM-T900FA</p>
                      <p className="text-xs text-slate-500 font-medium">Conectada por USB (COM3)</p>
                    </div>
                    <button className="text-orange-600 text-xs font-bold hover:underline">Test de Impresión</button>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <p className="text-xs font-semibold text-orange-800">
                      Recordá que para facturación electrónica directa (sin controladora física), el sistema utilizará el WebService de AFIP configurado en el Punto de Venta.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
