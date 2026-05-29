"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Database, Activity, Dumbbell, ExternalLink } from "lucide-react";

export function HomePortfolio() {
  const landings = [
    {
      id: "gimnasio",
      title: "Gimnasios & Centros Deportivos",
      niche: "Fitness / Deporte",
      description: "Plantilla web y pizarrón interactivo de rutinas. Diseñado para que tus alumnos sigan su entrenamiento de forma dinámica desde el celular sin fricción ni demoras.",
      publicLink: "/demos/gimnasio",
      image: "/images/gym_blackboard.png",
      badge: "DISEÑO DEPORTIVO"
    },
    {
      id: "odontologo",
      title: "Consultorios & Clínicas de Salud",
      niche: "Odontología / Salud",
      description: "Vidriera profesional y turnero digital de alta estética. Transmite absoluta confianza e higiene visual, facilitando la agenda de citas rápidas.",
      publicLink: "/demos/odontologo",
      image: "/images/smile.png",
      badge: "SALUD Y ESTÉTICA"
    },
    {
      id: "ferreteria",
      title: "Ferreterías, Corralones & Distribuidores",
      niche: "Ferretería / Corralones",
      description: "Catálogo interactivo optimizado para pedidos rápidos. Interfaz estructurada para mostrar stock, categorizar herramientas y cotizar envíos al instante.",
      publicLink: "/demos/ferreteria",
      image: "/images/ferreteria_store.png",
      badge: "FUERZA INDUSTRIAL"
    }
  ];

  const sistemas = [
    {
      id: "gimnasio-admin",
      title: "Consola del Entrenador",
      niche: "Fitness Admin",
      description: "Panel táctil del entrenador. Permite gestionar alumnos activos, asignar rutinas específicas y controlar la ocupación de la sala en tiempo real.",
      adminLink: "/demos/gimnasio/admin",
      icon: <Dumbbell className="h-10 w-10 text-orange-600 dark:text-orange-400" />,
      badge: "CONEXIÓN EN VIVO"
    },
    {
      id: "odontologo-admin",
      title: "Turnos y Fichas Odontológicas",
      niche: "Salud Admin",
      description: "Gestión de agenda médica diaria, control de citas confirmadas e historial clínico de pacientes con una velocidad de respuesta instantánea.",
      adminLink: "/demos/odontologo/admin",
      icon: <Activity className="h-10 w-10 text-rose-500 dark:text-rose-400" />,
      badge: "AGENDA EN VIVO"
    },
    {
      id: "ferreteria-admin",
      title: "Gestor de Pedidos, Remitos y Stock",
      niche: "Industrial CRM",
      description: "Panel central de inventario mayorista con alertas de stock mínimo crítico e impresión instantánea de remitos de entrega de materiales.",
      adminLink: "/demos/ferreteria/admin",
      icon: <Database className="h-10 w-10 text-blue-500 dark:text-blue-400" />,
      badge: "CONTROL DE STOCK"
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors" id="portfolio">
      
      {/* Subtle Background meshes */}
      <div className="absolute inset-0 z-0 opacity-[0.25] dark:opacity-[0.1] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-24">
        
        {/* Section Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto select-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-655 dark:text-orange-400">Demostraciones</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Catálogo de Soluciones Activas
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400">
            Nuestros productos se dividen en dos áreas: la **vidriera pública** para captar clientes, y los **sistemas privados** para gestionar tu negocio como corresponde.
          </p>
        </div>

        {/* ─── LANDINGS SECTION ─── */}
        <div className="space-y-8">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-[10px] font-black text-white select-none">1</span>
            Vidrieras Web (Captar Clientes)
          </h3>
          
          <div className="grid gap-8 sm:grid-cols-3">
            {landings.map((demo) => (
              <div 
                key={demo.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-lg hover:border-orange-500/30 hover:scale-[1.01] duration-300"
              >
                {/* Image container */}
                <div className="h-48 w-full relative bg-slate-100 dark:bg-slate-950 overflow-hidden">
                  <Image 
                    src={demo.image} 
                    alt={`Preview de ${demo.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 384px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200/30 text-[8px] font-black uppercase text-slate-700 dark:text-slate-200 tracking-wider">
                    {demo.badge}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-1 flex-col p-6 space-y-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-orange-655 dark:text-orange-450 block">
                      {demo.niche}
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white mt-1">
                      {demo.title}
                    </h4>
                  </div>
                  
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex-1 leading-relaxed">
                    {demo.description}
                  </p>
                  
                  <Link
                    href={demo.publicLink}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-4 py-3 text-xs font-black text-white hover:bg-orange-500 active:scale-95 transition-all shadow-sm"
                  >
                    Ver Sitio Demo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SYSTEMS SECTION ─── */}
        <div className="space-y-8">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-200 select-none">2</span>
            Sistemas de Gestión (Control Interno)
          </h3>
          
          <div className="grid gap-8 sm:grid-cols-3">
            {sistemas.map((sistema) => (
              <div 
                key={sistema.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-lg hover:border-orange-500/30 hover:scale-[1.01] duration-300"
              >
                {/* Content */}
                <div className="flex flex-1 flex-col p-6 space-y-6">
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/60 flex items-center justify-center">
                      {sistema.icon}
                    </div>
                    <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-850 px-2 py-0.5 rounded-md text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      {sistema.badge}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-2 flex-1">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                        {sistema.niche}
                      </span>
                      <h4 className="text-base font-black text-slate-900 dark:text-white mt-1">
                        {sistema.title}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-slate-550 dark:text-slate-400 leading-relaxed">
                      {sistema.description}
                    </p>
                  </div>
                  
                  {/* CTA Link */}
                  <Link
                    href={sistema.adminLink}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-xs font-black text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-xs"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Probar Consola Admin
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
