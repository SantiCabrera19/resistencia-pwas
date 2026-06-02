"use client";

import { useState, useEffect } from "react";
import { AdminLayout, NavItem } from "@/components/layout/AdminLayout";
import { Calendar, Users, FileText, Settings, CreditCard, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PIN_KEY = "odontologo_admin_pin_verified";
const ADMIN_PIN = "1234";

const navItems: NavItem[] = [
  { label: "Agenda (Hoy)", href: "/demos/odontologo/admin", icon: Calendar },
  { label: "Pacientes", href: "/demos/odontologo/admin/pacientes", icon: Users },
  { label: "Historias Clínicas", href: "/demos/odontologo/admin/historias", icon: FileText },
  { label: "Facturación", href: "/demos/odontologo/admin/facturacion", icon: CreditCard },
  { label: "Configuración", href: "/demos/odontologo/admin/configuracion", icon: Settings },
];

export default function OdontologoAdminLayout({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem(PIN_KEY);
    if (verified === "true") {
      setIsUnlocked(true);
    }
  }, []);

  if (!isUnlocked) {
    return <PinGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <AdminLayout 
      navItems={navItems} 
      brandName="Dr. Smile Admin" 
      brandLink="/demos/odontologo"
      theme="emerald"
      user={{
        name: "Dr. Carlos Smile",
        role: "Odontólogo General",
        avatar: "/images/portrait.png"
      }}
      initialNotifications={[
        { id: 1, type: "cancel", title: "Turno Cancelado", text: "Lucía Fernández canceló por WhatsApp", time: "hace 10 min", unread: true },
        { id: 2, type: "new", title: "Nuevo Turno", text: "Martín López agendó Limpieza", time: "hace 1 hora", unread: true },
        { id: 3, type: "system", title: "Alerta de Ficha", text: "Carlos Ruiz requiere actualizar su DNI", time: "hace 3 horas", unread: false },
      ]}
    >
      {children}
    </AdminLayout>
  );
}

// ─── PIN GATE COMPONENT ──────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(PIN_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 antialiased selection:bg-emerald-555 selection:text-slate-900">
      <div className={`w-full max-w-xs space-y-6 ${shake ? "animate-bounce" : ""}`}>
        {/* Lock Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/10">
            <Lock className="h-7 w-7 text-white animate-pulse" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-black text-white tracking-tight uppercase">
              Agenda Médica
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Ingresá el PIN del consultorio para acceder.
            </p>
          </div>
        </div>

        {/* PIN Input */}
        <div className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleKeyDown}
            placeholder="• • • •"
            className={`w-full text-center text-2xl font-black tracking-[0.5em] py-4 px-4 rounded-xl border-2 bg-slate-900 outline-none transition-all ${
              error
                ? "border-red-500 text-red-500"
                : "border-slate-800 text-white focus:border-emerald-600"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-xs font-bold text-red-500 text-center animate-pulse">
              PIN incorrecto. Intentá de nuevo.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={pin.length < 4}
          className="w-full py-4 bg-emerald-600 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-500 shadow-sm"
        >
          Ingresar
        </button>

        {/* Back link */}
        <Link
          href="/demos/odontologo"
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-350 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al sitio público
        </Link>

        {/* Demo hint */}
        <p className="text-[9px] font-bold text-slate-655 text-center uppercase tracking-wider">
          Demo PIN: 1234
        </p>
      </div>
    </div>
  );
}
