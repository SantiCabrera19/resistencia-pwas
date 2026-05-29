"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Database, Activity, Dumbbell } from "lucide-react";

export function HomePortfolio() {
  const landings = [
    {
      id: "odontologo",
      title: "Consultorio Dr. Smile",
      niche: "Odontología / Salud",
      description: "Página web minimalista blanca y verde diseñada para transmitir paz y limpieza. Optimizada para la captación de nuevos pacientes en buscadores.",
      publicLink: "/demos/odontologo",
      image: "/images/smile.png",
    },
    {
      id: "ferreteria",
      title: "FerreMax Industrial",
      niche: "Ferretería / Corralón",
      description: "Página tipo E-commerce inmersiva para mostrar el tamaño y capacidad del negocio. Ideal para empresas que venden por volumen.",
      publicLink: "/demos/ferreteria",
      image: "/images/ferreteria_store.png",
    },
    {
      id: "gimnasio",
      title: "SantiGym Pizarrón",
      niche: "Fitness / Gimnasios",
      description: "Pizarrón digital de entrenamiento PWA responsivo e instalable. Diseñado para que los alumnos consuman su rutina del día de manera inmediata sin registros.",
      publicLink: "/demos/gimnasio",
      image: "/images/gym_blackboard.png",
    }
  ];

  const sistemas = [
    {
      id: "odontologo-admin",
      title: "CRM Médico & Turnos",
      niche: "Software Interno",
      description: "Sistema privado para gestionar historias clínicas, turnos del día y datos de pacientes. Interfaz enfocada en la velocidad de atención.",
      adminLink: "/demos/odontologo/admin",
      icon: <Activity className="h-16 w-16 text-orange-500 dark:text-orange-400 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-40" />,
    },
    {
      id: "ferreteria-admin",
      title: "Gestor de Stock y Pedidos",
      niche: "Software Interno",
      description: "Panel para control de inventario en tiempo real, alertas de falta de stock y gestión rápida de remitos para mayoristas.",
      adminLink: "/demos/ferreteria/admin",
      icon: <Database className="h-16 w-16 text-orange-500 dark:text-orange-400 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-40" />,
    },
    {
      id: "gimnasio-admin",
      title: "Gestor de Rutinas y Flujo",
      niche: "Software Interno",
      description: "Panel diario del coach para organizar entrenamientos en caliente y balancear la congestión en sala a través de variaciones inteligentes.",
      adminLink: "/demos/gimnasio/admin",
      icon: <Dumbbell className="h-16 w-16 text-orange-500 dark:text-orange-400 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-40" />,
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden transition-colors" id="portfolio">
      {/* Background Image of Universo Resistencia */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Universo-Resistencia.jpg"
          alt="Universo Resistencia"
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
        {/* Clean slate/white light overlay inspired by medios.io */}
        <div className="absolute inset-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
            Catálogo de Soluciones
          </h2>
          <p className="max-w-3xl text-sm sm:text-base font-semibold text-slate-550 dark:text-slate-400">
            Nuestro trabajo se divide en dos grandes áreas: tu "vidriera pública" para atraer clientes, y tus "sistemas de gestión internos" para que tu negocio funcione como un reloj.
          </p>
        </div>

        {/* --- Sección 1: Landings --- */}
        <div className="mb-24">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-xs font-black text-white">1</span>
            Vidrieras Web (Para atraer clientes)
          </h3>
          <div className="grid gap-8 sm:grid-cols-2">
            {landings.map((demo) => (
              <div 
                key={demo.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800/80 transition-all hover:shadow-md hover:border-orange-500/40"
              >
                <div className="h-56 w-full relative bg-slate-100 dark:bg-slate-950 overflow-hidden">
                  <Image 
                    src={demo.image} 
                    alt={`Preview de ${demo.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 576px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                </div>
                
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-655 dark:text-orange-400">
                      {demo.niche}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                    {demo.title}
                  </h4>
                  <p className="text-sm font-semibold text-slate-550 dark:text-slate-400 mb-8 flex-1 leading-relaxed">
                    {demo.description}
                  </p>
                  
                  <Link
                    href={demo.publicLink}
                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-500 active:scale-95"
                  >
                    Ver Página de Ejemplo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Sección 2: Sistemas --- */}
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-xs font-black text-white">2</span>
            Sistemas a Medida (Control Interno)
          </h3>
          <div className="grid gap-8 sm:grid-cols-2">
            {sistemas.map((sistema) => (
              <div 
                key={sistema.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800/80 transition-all hover:shadow-md hover:border-orange-500/40"
              >
                {/* Decoration background icon instead of image */}
                <div className="absolute -right-6 -top-6">
                  {sistema.icon}
                </div>
                
                <div className="flex flex-1 flex-col p-6 sm:p-8 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {sistema.niche}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                    {sistema.title}
                  </h4>
                  <p className="text-sm font-semibold text-slate-550 dark:text-slate-400 mb-8 flex-1 leading-relaxed">
                    {sistema.description}
                  </p>
                  
                  <Link
                    href={sistema.adminLink}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors hover:bg-slate-200 dark:hover:bg-slate-750 active:scale-95 animate-in"
                  >
                    <Settings className="h-4 w-4" />
                    Probar el Sistema
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
