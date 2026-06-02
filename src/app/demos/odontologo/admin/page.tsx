"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Plus, Check, X, Clock, AlertTriangle, 
  Calendar as CalendarIcon, Search, Trash2, Loader2,
  Sparkles, CheckCircle2, AlertCircle, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Turno, MOCK_TURNOS_HOY } from "@/data/mock-odontologo-admin";

export default function OdontologoDashboard() {
  // --- Estados Principales ---
  const [appointments, setAppointments, isAppointmentsLoaded] = useLocalStorage<Turno[]>("odontologo_appointments", MOCK_TURNOS_HOY);
  
  const handleResetDemo = () => {
    if (window.confirm("¿Seguro que querés restablecer los datos de esta demo a la configuración inicial? Esto borrará tus turnos programados hoy.")) {
      localStorage.removeItem("odontologo_appointments");
      window.location.reload();
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<number>(26); // Día actual simulado

  // Estados de carga simulados
  const [isProcessingStatus, setIsProcessingStatus] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isReprogramming, setIsReprogramming] = useState(false);
  const [isCancellingDay, setIsCancellingDay] = useState(false);
  
  // Modales
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isReprogramModalOpen, setIsReprogramModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelDayModalOpen, setIsCancelDayModalOpen] = useState(false);
  
  // Selección para Modales
  const [selectedAppt, setSelectedAppt] = useState<Turno | null>(null);
  
  // Campos del Formulario de Nuevo Turno
  const [newPatient, setNewPatient] = useState("");
  const [newTime, setNewTime] = useState("12:00");
  const [newTreatment, setNewTreatment] = useState("Consulta General");
  const [newStatus, setNewStatus] = useState<Turno["estado"]>("Confirmado");

  // Campos de Reprogramación
  const [reprogramTime, setReprogramTime] = useState("12:00");

  // Notificaciones flotantes (Toasts)
  const [toasts, setToasts] = useState<{ id: string; text: string; type: "success" | "error" | "info" }[]>([]);

  // --- Funciones de Notificación ---
  const addToast = (text: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- Cálculos de Métricas en Tiempo Real ---
  const filteredAppts = appointments.filter((appt) => 
    appt.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appt.tratamiento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const turnosTotales = appointments.length;
  const porConfirmarCount = appointments.filter((a) => a.estado === "Pendiente").length;
  
  // Calcular ingresos proyectados: Cada tratamiento tiene un precio estimado, los cancelados suman $0
  const getTreatmentPrice = (treatment: string) => {
    switch (treatment.toLowerCase()) {
      case "limpieza": return 8000;
      case "ortodoncia control": return 12000;
      case "extracción": return 15000;
      case "consulta inicial": return 5000;
      case "blanqueamiento": return 20000;
      default: return 9000;
    }
  };

  const ingresosProyectadosVal = appointments.reduce((sum, appt) => {
    if (appt.estado === "Cancelado") return sum;
    return sum + getTreatmentPrice(appt.tratamiento);
  }, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(val);
  };

  // --- Acciones de Turnos ---
  const handleMarkInSala = (id: string, name: string) => {
    setIsProcessingStatus(true);
    setTimeout(() => {
      setAppointments(appointments.map(appt => 
        appt.id === id ? { ...appt, estado: "En Sala" as const } : appt
      ));
      addToast(`Paciente ${name} marcado "En Sala".`, "success");
      setIsProcessingStatus(false);
    }, 800);
  };

  const openReprogramModal = (appt: Turno) => {
    setSelectedAppt(appt);
    setReprogramTime(appt.hora);
    setIsReprogramModalOpen(true);
  };

  const handleReprogram = () => {
    if (!selectedAppt) return;
    setIsReprogramming(true);
    setTimeout(() => {
      setAppointments(appointments.map(appt => 
        appt.id === selectedAppt.id ? { ...appt, hora: reprogramTime, estado: "Confirmado" as const } : appt
      ));
      addToast(`Turno de ${selectedAppt.paciente} reprogramado a las ${reprogramTime} hs.`, "success");
      setIsReprogramModalOpen(false);
      setSelectedAppt(null);
      setIsReprogramming(false);
    }, 1200);
  };

  const openCancelModal = (appt: Turno) => {
    setSelectedAppt(appt);
    setIsCancelModalOpen(true);
  };

  const handleCancelAppt = () => {
    if (!selectedAppt) return;
    setIsProcessingStatus(true);
    setTimeout(() => {
      setAppointments(appointments.map(appt => 
        appt.id === selectedAppt.id ? { ...appt, estado: "Cancelado" as const } : appt
      ));
      addToast(`Turno de ${selectedAppt.paciente} cancelado.`, "error");
      setIsCancelModalOpen(false);
      setSelectedAppt(null);
      setIsProcessingStatus(false);
    }, 1000);
  };

  const handleAddNewAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.trim()) {
      addToast("Por favor, ingresá el nombre del paciente.", "error");
      return;
    }

    setIsScheduling(true);

    setTimeout(() => {
      const newAppt: Turno = {
        id: Date.now().toString(),
        paciente: newPatient,
        hora: newTime,
        tratamiento: newTreatment,
        estado: newStatus
      };

      // Ordenar turnos por hora después de agregar
      const updated = [...appointments, newAppt].sort((a, b) => a.hora.localeCompare(b.hora));
      setAppointments(updated);
      addToast(`Turno agendado para ${newPatient} a las ${newTime} hs.`, "success");
      
      // Resetear formulario
      setNewPatient("");
      setNewTime("12:00");
      setNewTreatment("Consulta General");
      setNewStatus("Confirmado");
      setIsNewModalOpen(false);
      setIsScheduling(false);
    }, 1500);
  };

  const handleCancelEntireDay = () => {
    const activeAppts = appointments.filter(a => a.estado !== "Cancelado");
    if (activeAppts.length === 0) {
      addToast("No hay turnos activos para cancelar hoy.", "info");
      setIsCancelDayModalOpen(false);
      return;
    }

    setIsCancellingDay(true);
    setTimeout(() => {
      setAppointments(appointments.map(appt => ({ ...appt, estado: "Cancelado" as const })));
      addToast("Jornada laboral cancelada. Todos los turnos pasaron a 'Cancelado'.", "error");
      setIsCancelDayModalOpen(false);
      setIsCancellingDay(false);
    }, 2000);
  };

  if (!isAppointmentsLoaded) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>;
  }

  // --- Badge de Estado Helper ---
  const getStatusBadge = (estado: Turno["estado"]) => {
    switch (estado) {
      case "Confirmado": return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">Confirmado</span>;
      case "En Sala": return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 animate-pulse">En Sala</span>;
      case "Pendiente": return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Pendiente</span>;
      case "Completado": return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10">Completado</span>;
      case "Cancelado": return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10">Cancelado</span>;
    }
  };

  // --- Renderizado de Días del Calendario (Mayo 2026) ---
  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Helper para asignar puntos de estado en el calendario
  const getDayDots = (day: number) => {
    if (day === 26) {
      // Hoy
      return (
        <div className="flex gap-0.5 justify-center mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        </div>
      );
    }
    if (day === 27) {
      return (
        <div className="flex gap-0.5 justify-center mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        </div>
      );
    }
    if (day === 25) {
      return (
        <div className="flex gap-0.5 justify-center mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        </div>
      );
    }
    if (day === 28) {
      return (
        <div className="flex gap-0.5 justify-center mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white border text-sm font-semibold ${
                t.type === "success" ? "bg-emerald-600 border-emerald-500" :
                t.type === "error" ? "bg-red-600 border-red-500" :
                "bg-slate-800 border-slate-700"
              }`}
            >
              {t.type === "success" && <CheckCircle2 className="h-5 w-5 shrink-0" />}
              {t.type === "error" && <AlertCircle className="h-5 w-5 shrink-0" />}
              <span>{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <PageHeader 
        title="Agenda del Día" 
        description={`Tenés ${turnosTotales} turnos programados para hoy. ${porConfirmarCount} pendientes de confirmación.`}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDemo}
              className="flex items-center gap-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 px-4 py-2.5 rounded-lg font-bold transition-all text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              Restablecer Demo
            </button>
            <button 
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-all hover:shadow-md active:scale-95 text-sm"
            >
              <Plus className="h-4.5 w-4.5" />
              Nuevo Turno
            </button>
          </div>
        }
      />

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Turnos Totales</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-slate-900">{turnosTotales}</p>
            <span className="text-xs font-bold text-slate-500">en agenda</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Por Confirmar</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-yellow-600">{porConfirmarCount}</p>
            <span className="text-xs font-bold text-slate-500">pendientes</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ingresos Proyectados</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-emerald-600">{formatCurrency(ingresosProyectadosVal)}</p>
            <span className="text-xs font-bold text-slate-500">del día</span>
          </div>
        </div>
      </div>

      {/* 2/3 and 1/3 Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2/3 COLUMN: Interactive Agenda Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            
            {/* Header y Filtro local */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Listado de Pacientes</h2>
              
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filtrar por paciente o tratamiento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Agenda Table */}
            <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Hora</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Paciente</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Tratamiento</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Estado</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-slate-400 font-bold">
                          No hay turnos registrados con ese filtro.
                        </td>
                      </tr>
                    ) : (
                      filteredAppts.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-4 align-middle">
                            <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              {appt.hora}
                            </span>
                          </td>
                          <td className="px-4 py-4 align-middle">
                            <span className="font-bold text-slate-800">{appt.paciente}</span>
                          </td>
                          <td className="px-4 py-4 align-middle">
                            <span className="text-xs font-semibold text-slate-500">{appt.tratamiento}</span>
                          </td>
                          <td className="px-4 py-4 align-middle text-center">
                            {getStatusBadge(appt.estado)}
                          </td>
                          <td className="px-4 py-4 align-middle text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {appt.estado !== "Completado" && appt.estado !== "En Sala" && appt.estado !== "Cancelado" && (
                                <button 
                                  onClick={() => handleMarkInSala(appt.id, appt.paciente)}
                                  disabled={isProcessingStatus}
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors disabled:opacity-50" 
                                  title="Marcar en sala"
                                >
                                  <Check className="h-4.5 w-4.5" />
                                </button>
                              )}
                              {appt.estado !== "Cancelado" && appt.estado !== "Completado" && (
                                <button 
                                  onClick={() => openReprogramModal(appt)}
                                  disabled={isProcessingStatus}
                                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors disabled:opacity-50" 
                                  title="Reprogramar"
                                >
                                  <Clock className="h-4.5 w-4.5" />
                                </button>
                              )}
                              {appt.estado !== "Cancelado" && (
                                <button 
                                  onClick={() => openCancelModal(appt)}
                                  disabled={isProcessingStatus}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50" 
                                  title="Cancelar turno"
                                >
                                  <X className="h-4.5 w-4.5" />
                                </button>
                              )}
                              {appt.estado === "Cancelado" && (
                                <span className="text-xs text-red-400 font-bold px-2 py-1">Cancelado</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT 1/3 COLUMN: Sidebar Control Panel with interactive Calendar */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Cabecera del Panel */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <CalendarIcon className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 uppercase tracking-tight text-sm">Calendario & Control</h3>
            </div>

            {/* Calendario de Referencia */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Mayo 2026</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">Simulado</span>
              </div>

              {/* Grid de días de la semana */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase">
                <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sá</span><span>Do</span>
              </div>

              {/* Grid de días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {/* Rellenos vacíos para empezar el mes en Viernes (Mayo 2026 arranca Viernes) */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8" />
                ))}
                
                {days.map((day) => {
                  const isToday = day === 26;
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDay(day);
                        if (!isToday) {
                          addToast(`Vista de turnos para el ${day} de Mayo (Simulación).`, "info");
                        } else {
                          addToast("Volviste a la agenda del día actual.", "info");
                        }
                      }}
                      className={`h-9 flex flex-col items-center justify-center rounded-lg text-xs font-bold transition-all relative ${
                        isToday ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30" :
                        isSelected ? "bg-slate-800 text-white" :
                        "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{day}</span>
                      {getDayDots(day)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Leyenda de Estados */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Leyenda de Estados</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>🟢 Completado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <span>🔵 Confirmado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                  <span>🟡 Pendiente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  <span>🔴 Cancelado</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400 shrink-0" />
                  <span>⚪ Feriado / No laborable</span>
                </div>
              </div>
            </div>

            {/* Botón Crítico: Cancelar Día Completo */}
            <div className="border-t border-slate-100 pt-4">
              <button 
                onClick={() => setIsCancelDayModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 border-2 border-red-200 bg-red-50/50 hover:bg-red-50 hover:border-red-500 text-red-700 py-3 rounded-xl text-xs font-bold tracking-wide uppercase transition-all active:scale-95"
              >
                <AlertTriangle className="h-4.5 w-4.5" />
                Bloquear / Cancelar Día
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ================= MODALES DE UX INTERACTIVOS ================= */}
      
      {/* 1. Modal: Nuevo Turno */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-base uppercase tracking-wider">Agendar Nuevo Turno</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="hover:bg-emerald-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddNewAppt} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre del Paciente</label>
                <input 
                  type="text" 
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  placeholder="Ej: Juan Carlos Pérez" 
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hora</label>
                  <select 
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-800"
                  >
                    <option value="08:00">08:00 hs</option>
                    <option value="08:30">08:30 hs</option>
                    <option value="09:00">09:00 hs</option>
                    <option value="09:30">09:30 hs</option>
                    <option value="10:00">10:00 hs</option>
                    <option value="10:30">10:30 hs</option>
                    <option value="11:00">11:00 hs</option>
                    <option value="11:30">11:30 hs</option>
                    <option value="12:00">12:00 hs</option>
                    <option value="12:30">12:30 hs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estado Inicial</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Turno["estado"])}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-800"
                  >
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tratamiento</label>
                <select 
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-800"
                >
                  <option value="Limpieza">Limpieza de Sarro</option>
                  <option value="Consulta Inicial">Consulta Inicial / Diagnóstico</option>
                  <option value="Ortodoncia Control">Ortodoncia Control</option>
                  <option value="Extracción">Extracción Simple</option>
                  <option value="Blanqueamiento">Blanqueamiento Láser</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isScheduling}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isScheduling ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar Turno"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Modal: Reprogramar Turno */}
      {isReprogramModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Reprogramar Turno</h3>
              <button onClick={() => setIsReprogramModalOpen(false)} className="hover:bg-slate-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-left">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Paciente</p>
                <p className="text-sm font-bold text-slate-800 mt-1">{selectedAppt.paciente}</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nueva Hora de Atención</label>
                <select 
                  value={reprogramTime}
                  onChange={(e) => setReprogramTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-800"
                >
                  <option value="08:00">08:00 hs</option>
                  <option value="08:30">08:30 hs</option>
                  <option value="09:00">09:00 hs</option>
                  <option value="09:30">09:30 hs</option>
                  <option value="10:00">10:00 hs</option>
                  <option value="10:30">10:30 hs</option>
                  <option value="11:00">11:00 hs</option>
                  <option value="11:30">11:30 hs</option>
                  <option value="12:00">12:00 hs</option>
                  <option value="12:30">12:30 hs</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  onClick={() => setIsReprogramModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button 
                  onClick={handleReprogram}
                  disabled={isReprogramming}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isReprogramming ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar Cambio"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 3. Modal: Cancelar Turno Individual */}
      {isCancelModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">¿Cancelar Turno?</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Estás a punto de cancelar el turno de <span className="text-slate-800 font-bold">{selectedAppt.paciente}</span> a las <span className="text-slate-800 font-bold">{selectedAppt.hora} hs</span>. Esta acción liberará la hora en la agenda del consultorio.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2">
                <button 
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button 
                  onClick={handleCancelAppt}
                  disabled={isProcessingStatus}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isProcessingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sí, Cancelar Turno"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 4. Modal: Cancelar Jornada Completa */}
      {isCancelDayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">¿Confirmar Bloqueo de Jornada?</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                  Esta acción es drástica. Al cancelar el día de trabajo:
                </p>
                <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs font-bold text-slate-600">
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    Todos los turnos de hoy pasarán a estado <span className="text-red-700">"Cancelado"</span>.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    Se descontarán los ingresos proyectados del día actual.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    Se simula el envío automático de notificaciones de WhatsApp a los pacientes para coordinar reprogramaciones.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3 border-t border-slate-100">
                <button 
                  onClick={() => setIsCancelDayModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Volver Atrás
                </button>
                <button 
                  onClick={handleCancelEntireDay}
                  disabled={isCancellingDay}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isCancellingDay ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sí, Cancelar Jornada"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
