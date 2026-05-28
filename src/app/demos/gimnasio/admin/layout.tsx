"use client";

import { AdminLayout, NavItem } from "@/components/layout/AdminLayout";
import { Dumbbell, Calendar, Layout, Settings } from "lucide-react";

const navItems: NavItem[] = [
  { label: "Pizarrón y Aforo (Hoy)", href: "/demos/gimnasio/admin", icon: Layout },
];

export default function GimnasioAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout 
      navItems={navItems} 
      brandName="SantiGym Admin" 
      brandLink="/demos/gimnasio"
      theme="slate"
      user={{
        name: "Coach Mateo",
        role: "Entrenador Principal",
        avatar: "/images/portrait.png" // Reutilizamos el retrato premium
      }}
      initialNotifications={[
        { id: 1, type: "cancel", title: "Saturación Crítica", text: "Sección Piernas al 95% de capacidad. Se sugiere derivar a Variación 2.", time: "hace 5 min", unread: true },
        { id: 2, type: "new", title: "Rutina Sincronizada", text: "Rutina B de Pecho actualizada con éxito para el turno tarde.", time: "hace 1 hora", unread: true },
        { id: 3, type: "system", title: "Aviso de Mantenimiento", text: "Prensa de piernas 45° agendada para service técnico mañana a las 08:00hs.", time: "hace 3 horas", unread: false },
      ]}
    >
      {children}
    </AdminLayout>
  );
}
