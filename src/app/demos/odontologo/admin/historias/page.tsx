"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  FileText, Activity, Clock, Plus, Search, CheckCircle2, AlertTriangle, Paperclip
} from "lucide-react";
import { motion } from "framer-motion";

const MOCK_PATIENTS = [
  { id: "1", name: "María González", age: 34, lastVisit: "15 May 2026", status: "Tratamiento Activo" },
  { id: "2", name: "Carlos Perez", age: 45, lastVisit: "10 Mar 2026", status: "Alta Médica" },
  { id: "3", name: "Laura Martínez", age: 28, lastVisit: "01 Feb 2026", status: "Observación" },
];

const MOCK_EVOLUTION = [
  { id: "e1", date: "15 May 2026", doctor: "Dr. Carlos Ruiz", title: "Control de Caries y Limpieza", notes: "Se realiza profilaxis completa. Caries en pieza 46 tratada con composite. Paciente refiere sensibilidad al frío que disminuyó desde última sesión." },
  { id: "e2", date: "20 Abr 2026", doctor: "Dr. Carlos Ruiz", title: "Evaluación Inicial", notes: "Paciente acude por dolor en zona inferior derecha. Se indican radiografías y se agenda tratamiento de caries." }
];

export default function HistoriasClinicasPage() {
  const [activeTab, setActiveTab] = useState<"evolucion" | "antecedentes" | "archivos">("evolucion");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("1");

  const selectedPatient = MOCK_PATIENTS.find(p => p.id === selectedPatientId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader 
        title="Historias Clínicas" 
        description="Expediente médico estructurado y seguimiento de evolución."
        action={
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95 text-sm">
            <Plus className="h-4.5 w-4.5" />
            Nueva Consulta
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar: Buscador y Lista de Pacientes */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar paciente (DNI o Apellido)..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              {MOCK_PATIENTS.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedPatientId === p.id 
                      ? "border-emerald-500 bg-emerald-50/50 shadow-sm" 
                      : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`text-sm font-bold ${selectedPatientId === p.id ? "text-emerald-900" : "text-slate-800"}`}>
                        {p.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Última visita: {p.lastVisit}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      p.status === "Tratamiento Activo" ? "bg-emerald-100 text-emerald-700" : 
                      p.status === "Alta Médica" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {p.status === "Tratamiento Activo" ? "Activo" : p.status === "Alta Médica" ? "Alta" : "Obs"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido Principal: Ficha del Paciente */}
        <div className="lg:col-span-8 space-y-6">
          {selectedPatient ? (
            <motion.div 
              key={selectedPatient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Encabezado Ficha */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xl shrink-0">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">{selectedPatient.name}</h2>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Sin alergias registradas</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedPatient.age} años</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex px-6 border-b border-slate-100 font-bold text-xs uppercase tracking-wide">
                <button 
                  onClick={() => setActiveTab("evolucion")}
                  className={`px-4 py-4 border-b-2 transition-colors ${activeTab === "evolucion" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                >
                  Línea de Evolución
                </button>
                <button 
                  onClick={() => setActiveTab("antecedentes")}
                  className={`px-4 py-4 border-b-2 transition-colors ${activeTab === "antecedentes" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                >
                  Antecedentes Médicos
                </button>
                <button 
                  onClick={() => setActiveTab("archivos")}
                  className={`px-4 py-4 border-b-2 transition-colors ${activeTab === "archivos" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                >
                  Radiografías & Archivos
                </button>
              </div>

              {/* Contenido de Tabs */}
              <div className="p-6">
                {activeTab === "evolucion" && (
                  <div className="space-y-6">
                    <div className="relative border-l-2 border-emerald-100 ml-3 space-y-8 pb-4">
                      {MOCK_EVOLUTION.map((evo) => (
                        <div key={evo.id} className="relative pl-6">
                          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">{evo.date}</span>
                                <h4 className="text-sm font-bold text-slate-800">{evo.title}</h4>
                              </div>
                              <span className="text-xs font-semibold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                                {evo.doctor}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                              {evo.notes}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "antecedentes" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400">Enfermedades Sistémicas</label>
                        <p className="text-sm font-bold text-slate-700 mt-1">Ninguna reportada</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400">Alergias a medicamentos</label>
                        <p className="text-sm font-bold text-slate-700 mt-1">Penicilina (Duda, no confirmada)</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400">Presión Arterial Promedio</label>
                        <p className="text-sm font-bold text-slate-700 mt-1">120/80 mmHg</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400">Observaciones Generales</label>
                        <p className="text-sm font-medium text-slate-600 mt-1">Paciente con tendencia a bruxismo nocturno. Uso de placa recomendada.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "archivos" && (
                  <div className="space-y-4">
                    <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all flex flex-col items-center justify-center gap-2">
                      <Paperclip className="h-6 w-6" />
                      <span className="text-sm font-bold">Subir nueva radiografía o estudio</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                        <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">Panoramica_15May2026.jpg</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Hace 2 meses · 1.2 MB</p>
                        </div>
                        <button className="text-emerald-600 text-[10px] font-bold uppercase hover:underline">Ver</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-400">
              <Activity className="h-8 w-8 mb-2 opacity-50" />
              <p className="font-bold text-sm">Seleccioná un paciente para ver su historia clínica.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
