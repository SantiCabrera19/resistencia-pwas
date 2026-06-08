"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Banknote, TrendingUp, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Search, Plus, CheckCircle2, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { normalizeString } from "@/lib/utils";

const MOCK_INVOICES = [
  { id: "F-1001", patient: "María González", treatment: "Ortodoncia (Cuota 2/12)", amount: 45000, status: "Pagado", date: "27 May 2026" },
  { id: "F-1002", patient: "Carlos Perez", treatment: "Implante Titanio Inferior", amount: 280000, status: "Pendiente", date: "25 May 2026" },
  { id: "F-1003", patient: "Laura Martínez", treatment: "Blanqueamiento Láser", amount: 35000, status: "Pagado", date: "24 May 2026" },
  { id: "F-1004", patient: "Juan Domínguez", treatment: "Limpieza y Flúor", amount: 15000, status: "Pendiente", date: "22 May 2026" },
];

export default function FacturacionPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = MOCK_INVOICES.filter(inv => 
    normalizeString(inv.patient).includes(normalizeString(searchTerm)) || 
    normalizeString(inv.id).includes(normalizeString(searchTerm))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader 
        title="Facturación y Pagos" 
        description="Gestión de cobros, presupuestos y resúmenes financieros del consultorio."
        action={
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95 text-sm">
            <Plus className="h-4.5 w-4.5" />
            Nuevo Presupuesto
          </button>
        }
      />

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Banknote className="h-6 w-6" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-md">
              <ArrowUpRight className="h-3 w-3" /> +12%
            </span>
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Ingresos Mensuales</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">$ 1.250.000</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Por Cobrar (Pendiente)</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">$ 450.000</h3>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-md flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <TrendingUp className="h-32 w-32" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Ticket Promedio</p>
            <h3 className="text-3xl font-black text-white mt-1">$ 85.000</h3>
          </div>
        </div>
      </div>

      {/* Tabla de Facturación */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Últimos Movimientos</h3>
          <div className="relative max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por N° o Paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-l-lg">ID</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Fecha</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Paciente</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Tratamiento</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right rounded-r-lg">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv, idx) => (
                <motion.tr 
                  key={inv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-4 py-4 font-mono font-bold text-slate-400 text-xs">{inv.id}</td>
                  <td className="px-4 py-4 text-slate-500 font-semibold text-xs">{inv.date}</td>
                  <td className="px-4 py-4 font-extrabold text-slate-800">{inv.patient}</td>
                  <td className="px-4 py-4 text-slate-600 font-medium">{inv.treatment}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                      inv.status === "Pagado" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                    }`}>
                      {inv.status === "Pagado" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-black text-slate-900">
                    ${inv.amount.toLocaleString("es-AR")}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-bold text-sm">
              No se encontraron registros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
