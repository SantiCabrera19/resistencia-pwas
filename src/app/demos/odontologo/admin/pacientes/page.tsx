"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Plus, Search, Edit2, FileText, Trash2, X, 
  CheckCircle2, AlertCircle, Phone, CreditCard, 
  Activity, ArrowLeft, History 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Paciente, MOCK_PACIENTES } from "@/data/mock-odontologo-admin";

export default function PacientesPage() {
  // --- Estados Principales ---
  const [pacientes, setPacientes] = useState<Paciente[]>(MOCK_PACIENTES);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modales
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Selección para Modales
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);

  // Campos de Alta/Edición
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState<Paciente["estado"]>("Activo");

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

  // --- Filtrado Reactivo ---
  const filteredPacientes = pacientes.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.dni.replace(/\./g, "").includes(searchTerm.replace(/\./g, ""))
  );

  // --- Badge de Estado Helper ---
  const getStatusBadge = (estado: Paciente["estado"]) => {
    switch (estado) {
      case "Activo": return <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Activo</span>;
      case "Inactivo": return <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10">Inactivo</span>;
      case "Deudor": return <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 animate-pulse">Deudor</span>;
    }
  };

  // --- Acciones de Pacientes ---
  const handleCreatePaciente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !dni.trim() || !telefono.trim()) {
      addToast("Todos los campos obligatorios deben completarse.", "error");
      return;
    }

    const nuevo: Paciente = {
      id: "P" + (pacientes.length + 1).toString().padStart(3, "0"),
      nombre,
      dni,
      telefono,
      ultimoTurno: "Sin turnos aún",
      estado
    };

    setPacientes([...pacientes, nuevo]);
    addToast(`Paciente ${nombre} registrado exitosamente.`, "success");
    setIsNewModalOpen(false);
    
    // Reset
    setNombre("");
    setDni("");
    setTelefono("");
    setEstado("Activo");
  };

  const openEditModal = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setNombre(paciente.nombre);
    setDni(paciente.dni);
    setTelefono(paciente.telefono);
    setEstado(paciente.estado);
    setIsEditModalOpen(true);
  };

  const handleEditPaciente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaciente) return;
    
    setPacientes(pacientes.map(p => 
      p.id === selectedPaciente.id 
        ? { ...p, nombre, dni, telefono, estado }
        : p
    ));
    
    addToast(`Perfil de ${nombre} actualizado.`, "success");
    setIsEditModalOpen(false);
    setSelectedPaciente(null);
  };

  const openHistoryModal = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setIsHistoryModalOpen(true);
  };

  const openDeleteModal = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedPaciente) return;
    
    // Soft Delete (Baja lógica: pasa a Inactivo)
    setPacientes(pacientes.map(p => 
      p.id === selectedPaciente.id ? { ...p, estado: "Inactivo" as const } : p
    ));

    addToast(`Paciente ${selectedPaciente.nombre} dado de baja (Inactivo).`, "info");
    setIsDeleteModalOpen(false);
    setSelectedPaciente(null);
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
        title="Pacientes" 
        description="Gestión del padrón de pacientes, estados de cuenta e historias clínicas del consultorio."
        action={
          <button 
            onClick={() => {
              setNombre("");
              setDni("");
              setTelefono("");
              setEstado("Activo");
              setIsNewModalOpen(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-all hover:shadow-md active:scale-95 text-sm"
          >
            <Plus className="h-4.5 w-4.5" />
            Nuevo Paciente
          </button>
        }
      />

      {/* Buscador & Métricas del Padrón */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre completo o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
          />
        </div>
        <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Activos: <strong className="text-slate-800">{pacientes.filter(p => p.estado === "Activo").length}</strong></span>
          <span>Deudores: <strong className="text-red-600">{pacientes.filter(p => p.estado === "Deudor").length}</strong></span>
          <span>Total: <strong className="text-slate-800">{filteredPacientes.length}</strong></span>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Nombre Completo</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">DNI</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Teléfono</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Último Turno</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Estado</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPacientes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400 font-bold">
                    No se encontraron pacientes con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredPacientes.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 align-middle font-extrabold text-slate-400 text-xs">{p.id}</td>
                    <td className="px-4 py-4 align-middle">
                      <span className="font-extrabold text-slate-800">{p.nombre}</span>
                    </td>
                    <td className="px-4 py-4 align-middle font-medium text-slate-600">{p.dni}</td>
                    <td className="px-4 py-4 align-middle text-slate-600 font-semibold">{p.telefono}</td>
                    <td className="px-4 py-4 align-middle text-slate-500 font-medium text-xs">{p.ultimoTurno}</td>
                    <td className="px-4 py-4 align-middle text-center">{getStatusBadge(p.estado)}</td>
                    <td className="px-4 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openHistoryModal(p)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Historia Clínica"
                        >
                          <FileText className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Editar Ficha"
                        >
                          <Edit2 className="h-4.5 w-4.5" />
                        </button>
                        {p.estado !== "Inactivo" && (
                          <button 
                            onClick={() => openDeleteModal(p)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Dar de baja"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
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

      {/* ================= MODALES INTERACTIVOS ================= */}

      {/* 1. Modal: Nuevo Paciente */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-base uppercase tracking-wider">Registrar Paciente</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="hover:bg-emerald-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePaciente} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Sofía Martínez" 
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">DNI</label>
                  <input 
                    type="text" 
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ej: 38.123.456" 
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 362-411-9876" 
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estado de Cuenta</label>
                <select 
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as Paciente["estado"])}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-800"
                >
                  <option value="Activo">Activo (Al día)</option>
                  <option value="Deudor">Deudor (Saldo pendiente)</option>
                  <option value="Inactivo">Inactivo</option>
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
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Registrar Ficha
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Modal: Editar Paciente */}
      {isEditModalOpen && selectedPaciente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-base uppercase tracking-wider">Editar Ficha Médica</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="hover:bg-slate-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditPaciente} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">DNI</label>
                  <input 
                    type="text" 
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estado de Cuenta</label>
                <select 
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as Paciente["estado"])}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-800"
                >
                  <option value="Activo">Activo (Al día)</option>
                  <option value="Deudor">Deudor (Saldo pendiente)</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Confirmar Cambios
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 3. Modal: Ver Historia Clínica (Outstanding UX) */}
      {isHistoryModalOpen && selectedPaciente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-left"
          >
            <div className="bg-emerald-800 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-300" />
                <h3 className="font-extrabold text-base uppercase tracking-wider">Historia Clínica</h3>
              </div>
              <button onClick={() => setIsHistoryModalOpen(false)} className="hover:bg-emerald-900 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Patient Basic Card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-lg font-black text-slate-900">{selectedPaciente.nombre}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">DNI: {selectedPaciente.dni} · Ficha: {selectedPaciente.id}</p>
                </div>
                {getStatusBadge(selectedPaciente.estado)}
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-slate-600 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Contacto</p>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedPaciente.telefono}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                  <History className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Último Turno</p>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedPaciente.ultimoTurno}</p>
                  </div>
                </div>
              </div>

              {/* Medical History Timeline */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Historial de Visitas y Odontograma</span>
                
                <div className="border-l-2 border-emerald-100 pl-4 space-y-4 text-xs">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-white" />
                    <p className="font-bold text-slate-900">24/05/2026 — Limpieza Bucal Completa</p>
                    <p className="text-slate-500 font-semibold mt-1">Limpieza de sarro realizada sin dolor. Paciente refiere excelente recuperación. Se sugiere control en 6 meses.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-white" />
                    <p className="font-bold text-slate-900">10/04/2026 — Diagnóstico & Caries</p>
                    <p className="text-slate-500 font-semibold mt-1">Obturación de composite en pieza 46 (molar inferior derecho). Pendiente tratamiento de conducto en pieza 12.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-slate-400 ring-4 ring-white" />
                    <p className="font-bold text-slate-900">15/01/2026 — Consulta Inicial</p>
                    <p className="text-slate-500 font-semibold mt-1">Ficha de ingreso creada. Panorámica bucal solicitada para control de terceros molares.</p>
                  </div>
                </div>
              </div>

              {/* Botón de Salida */}
              <div className="pt-4 flex items-center justify-end border-t border-slate-100">
                <button 
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 4. Modal: Confirmación de Baja */}
      {isDeleteModalOpen && selectedPaciente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">¿Dar de Baja Paciente?</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Estás a punto de dar de baja a <span className="text-slate-800 font-bold">{selectedPaciente.nombre}</span>. El estado de la ficha pasará a <span className="text-slate-800 font-bold">"Inactivo"</span>, conservando todo el historial clínico pero removiéndolo de las alertas del día.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all animate-pulse"
                >
                  Sí, Inactivar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
