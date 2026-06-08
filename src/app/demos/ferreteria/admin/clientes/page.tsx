"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Users, Search, Plus, Mail, Phone, ExternalLink, AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { normalizeString } from "@/lib/utils";

const MOCK_CLIENTES = [
  { id: "C-001", nombre: "Constructora NEA S.A.", tipo: "Empresa", telefono: "3624-123456", email: "compras@neasa.com.ar", saldo: 450000, limite: 1000000, estado: "Al Día" },
  { id: "C-002", nombre: "Juan Pérez", tipo: "Consumidor Final", telefono: "3624-987654", email: "juanp@gmail.com", saldo: 15000, limite: 50000, estado: "Deuda" },
  { id: "C-003", nombre: "Ferretería El Sol", tipo: "Mayorista", telefono: "3624-456789", email: "info@ferreteriaelsol.com", saldo: 0, limite: 500000, estado: "Al Día" },
  { id: "C-004", nombre: "Arq. Carlos Silva", tipo: "Profesional", telefono: "3624-555111", email: "arq.silva@estudio.com", saldo: 85000, limite: 200000, estado: "Al Día" },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClientes = MOCK_CLIENTES.filter(c => 
    normalizeString(c.nombre).includes(normalizeString(searchTerm)) || 
    normalizeString(c.id).includes(normalizeString(searchTerm))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader 
        title="Directorio de Clientes" 
        description="Gestión de Cuentas Corrientes, saldos y límites de crédito."
        action={
          <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-sm active:scale-95 text-sm">
            <Plus className="h-4.5 w-4.5" />
            Nuevo Cliente
          </button>
        }
      />

      {/* Resumen CRM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Clientes</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">1,245</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Cuentas en Mora</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">12</p>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Nombre, DNI o CUIT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-l-lg">ID</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Contacto</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right">Saldo Deudor</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Estado</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right rounded-r-lg">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClientes.map((cliente, idx) => (
                <motion.tr 
                  key={cliente.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-4 font-mono font-bold text-slate-400 text-xs">{cliente.id}</td>
                  <td className="px-4 py-4">
                    <p className="font-extrabold text-slate-800">{cliente.nombre}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{cliente.tipo}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-600"><Phone className="h-3 w-3" /> {cliente.telefono}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-600"><Mail className="h-3 w-3" /> {cliente.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className="font-black text-slate-900">${cliente.saldo.toLocaleString("es-AR")}</p>
                    <p className="text-[10px] font-semibold text-slate-400">Límite: ${cliente.limite.toLocaleString("es-AR")}</p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      cliente.estado === "Al Día" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {cliente.estado}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                      <ExternalLink className="h-4.5 w-4.5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
