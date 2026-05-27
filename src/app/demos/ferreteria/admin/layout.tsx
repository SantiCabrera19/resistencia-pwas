"use client";

import { AdminLayout, NavItem } from "@/components/layout/AdminLayout";
import { Package, ShoppingCart, Truck, Users, BarChart3 } from "lucide-react";

const navItems: NavItem[] = [
  { label: "Panel de Control", href: "/demos/ferreteria/admin", icon: BarChart3 },
  { label: "Ventas / Mostrador", href: "/demos/ferreteria/admin/ventas", icon: ShoppingCart },
  { label: "Inventario", href: "/demos/ferreteria/admin/inventario", icon: Package },
  { label: "Envíos", href: "/demos/ferreteria/admin/envios", icon: Truck },
  { label: "Clientes Cta. Cte.", href: "/demos/ferreteria/admin/clientes", icon: Users },
];

export default function FerreteriaAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout 
      navItems={navItems} 
      brandName="FerreMax ERP" 
      brandLink="/demos/ferreteria"
      theme="slate"
      user={{
        name: "Hugo Ferretería",
        role: "Gerente General",
        avatar: "/images/gerente.png"
      }}
      initialNotifications={[
        { id: 1, type: "cancel", title: "Quiebre de Stock", text: "Cemento Loma Negra se quedó sin existencias", time: "hace 5 min", unread: true },
        { id: 2, type: "new", title: "Pedido de WhatsApp", text: "Constructora NEA solicitó presupuesto de chapas", time: "hace 30 min", unread: true },
        { id: 3, type: "system", title: "Flete Programado", text: "Flete a Av. Sarmiento 1200 sale a las 14:00 hs", time: "hace 1 hora", unread: false },
      ]}
    >
      {children}
    </AdminLayout>
  );
}
