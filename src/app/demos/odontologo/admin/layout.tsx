"use client";

import { AdminLayout, NavItem } from "@/components/layout/AdminLayout";
import { Calendar, Users, FileText, Settings, CreditCard } from "lucide-react";

const navItems: NavItem[] = [
  { label: "Agenda (Hoy)", href: "/demos/odontologo/admin", icon: Calendar },
  { label: "Pacientes", href: "/demos/odontologo/admin/pacientes", icon: Users },
  { label: "Historias Clínicas", href: "/demos/odontologo/admin/historias", icon: FileText },
  { label: "Facturación", href: "/demos/odontologo/admin/facturacion", icon: CreditCard },
  { label: "Configuración", href: "/demos/odontologo/admin/configuracion", icon: Settings },
];

export default function OdontologoAdminLayout({ children }: { children: React.ReactNode }) {
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
