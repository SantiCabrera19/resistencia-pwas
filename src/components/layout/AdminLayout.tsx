"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, Search, User, LogOut, Settings as SettingsIcon, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

interface AdminLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  brandName: string;
  brandLink: string;
  theme?: "slate" | "indigo" | "emerald"; // Allows some simple niche theming
  user?: {
    name: string;
    role: string;
    avatar: string;
  };
  initialNotifications?: {
    id: number;
    type: "cancel" | "new" | "system";
    title: string;
    text: string;
    time: string;
    unread: boolean;
  }[];
}

export function AdminLayout({ 
  children, 
  navItems, 
  brandName, 
  brandLink, 
  theme = "slate",
  user = {
    name: "Dr. Carlos Smile",
    role: "Odontólogo General",
    avatar: "/images/portrait.png"
  },
  initialNotifications = [
    { id: 1, type: "cancel", title: "Turno Cancelado", text: "Lucía Fernández canceló por WhatsApp", time: "hace 10 min", unread: true },
    { id: 2, type: "new", title: "Nuevo Turno", text: "Martín López agendó Limpieza", time: "hace 1 hora", unread: true },
    { id: 3, type: "system", title: "Alerta del Sistema", text: "Jornada laboral del 25 de Mayo bloqueada", time: "hace 2 horas", unread: false },
  ]
}: AdminLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Registrar reactivamente la última ruta de administración visitada para la PWA
  useEffect(() => {
    if (pathname && pathname.startsWith("/demos/")) {
      localStorage.setItem("last_visited_demo", pathname);
    }
  }, [pathname]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  // Simple theme mapper for the sidebar active states
  const themeClasses = {
    slate: "bg-slate-900 text-slate-100",
    indigo: "bg-indigo-900 text-indigo-100",
    emerald: "bg-emerald-900 text-emerald-100",
  };

  const activeClasses = {
    slate: "bg-slate-800 text-white border-l-4 border-slate-400",
    indigo: "bg-indigo-800 text-white border-l-4 border-indigo-400",
    emerald: "bg-emerald-800 text-white border-l-4 border-emerald-400",
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform lg:static lg:translate-x-0",
          themeClasses[theme],
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          <Link href={brandLink} className="text-xl font-bold tracking-tight text-white">
            {brandName}
          </Link>
          <button className="lg:hidden text-white/70" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                  isActive ? activeClasses[theme] : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-white/50")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/10">
          <div className="space-y-1">
            <Link
              href={brandLink}
              className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              ← Ver sitio público
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              ⌂ Volver al Hub
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="hidden sm:flex relative max-w-md w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar pacientes, turnos..."
                className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-slate-300 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className="relative p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-80 rounded-xl border border-slate-200 bg-white shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                      <span className="font-bold text-slate-900 text-sm">Notificaciones</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllRead}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 active:scale-95"
                        >
                          Marcar leídas
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                      {notifications.map((n) => (
                        <div key={n.id} className={cn("p-4 text-left transition-colors hover:bg-slate-50", n.unread && "bg-slate-50/50")}>
                          <div className="flex items-start justify-between gap-2">
                            <span className={cn("text-xs font-bold uppercase tracking-wide", 
                              n.type === "cancel" ? "text-red-500" : n.type === "new" ? "text-emerald-600" : "text-slate-500"
                            )}>
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600 font-medium leading-relaxed">{n.text}</p>
                          {n.unread && <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-red-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-2 rounded-full hover:bg-slate-50 p-1 transition-all border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-95"
              >
                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    fill 
                    sizes="32px"
                    className="object-cover object-top"
                  />
                </div>
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-60 rounded-xl border border-slate-200 bg-white shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 text-left">
                      <p className="text-sm font-bold text-slate-900 leading-tight">{user.name}</p>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{user.role}</p>
                    </div>
                    <div className="py-1">
                      <Link 
                        href={`${brandLink}/admin/configuracion`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-left"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 text-slate-400" />
                        Mi Perfil
                      </Link>
                      <Link 
                        href={`${brandLink}/admin/configuracion`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-left"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <SettingsIcon className="h-4 w-4 text-slate-400" />
                        {theme === "emerald" ? "Configurar Consultorio" : "Configurar Empresa"}
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 py-1">
                      <Link 
                        href={brandLink}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold text-left"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión (Demo)
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
