"use client";

import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Settings, User, Bell, Shield, Calendar, CreditCard, Save
} from "lucide-react";
import { useState } from "react";

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<"perfil" | "horarios" | "notificaciones">("perfil");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader 
        title="Configuración" 
        description="Ajustes de perfil profesional, horarios de atención y notificaciones."
        action={
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95 text-sm">
            <Save className="h-4.5 w-4.5" />
            Guardar Cambios
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Menú lateral */}
        <div className="md:col-span-4 space-y-2">
          <button 
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "perfil" ? "bg-white text-emerald-700 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <User className="h-5 w-5" /> Perfil del Profesional
          </button>
          <button 
            onClick={() => setActiveTab("horarios")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "horarios" ? "bg-white text-emerald-700 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Calendar className="h-5 w-5" /> Horarios de Atención
          </button>
          <button 
            onClick={() => setActiveTab("notificaciones")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "notificaciones" ? "bg-white text-emerald-700 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Bell className="h-5 w-5" /> Alertas y Notificaciones
          </button>
        </div>

        {/* Panel principal */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
            
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Perfil Público</h3>
                  <p className="text-sm font-semibold text-slate-500">Esta información será visible en los turneros online.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Completo</label>
                    <input type="text" defaultValue="Dr. Carlos Ruiz" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Especialidad</label>
                    <input type="text" defaultValue="Odontología General e Implantes" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Matrícula (M.N. / M.P.)</label>
                    <input type="text" defaultValue="M.N. 12345" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "horarios" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Disponibilidad</h3>
                  <p className="text-sm font-semibold text-slate-500">Definí los bloques para el agendamiento de turnos.</p>
                </div>
                <div className="space-y-3">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia) => (
                    <div 
                      key={dia} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-3 border border-slate-100 rounded-xl bg-slate-50"
                    >
                      {/* Día y Toggle switch en la misma línea en móvil */}
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <span className="font-bold text-sm text-slate-700 w-20 sm:w-24">{dia}</span>
                        {/* Toggle switch visible solo en mobile */}
                        <label className="flex sm:hidden items-center cursor-pointer relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                        </label>
                      </div>

                      {/* Inputs de Horas y Toggle switch en desktop */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                          <input 
                            type="time" 
                            defaultValue="09:00" 
                            className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-[90px] text-center" 
                          />
                          <span className="text-slate-400 font-bold">-</span>
                          <input 
                            type="time" 
                            defaultValue="18:00" 
                            className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-[90px] text-center" 
                          />
                        </div>
                        {/* Toggle switch visible en desktop */}
                        <label className="hidden sm:flex items-center cursor-pointer relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notificaciones" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Alertas del Sistema</h3>
                  <p className="text-sm font-semibold text-slate-500">Preferencias de WhatsApp y Email.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl">
                    <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <div>
                      <p className="font-bold text-sm text-slate-800">Recordatorio de Turnos a Pacientes</p>
                      <p className="text-xs text-slate-500 font-medium">Enviar WhatsApp automático 24hs antes del turno.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl">
                    <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <div>
                      <p className="font-bold text-sm text-slate-800">Resumen Diario</p>
                      <p className="text-xs text-slate-500 font-medium">Recibir email al final del día con la agenda de mañana y caja de hoy.</p>
                    </div>
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
