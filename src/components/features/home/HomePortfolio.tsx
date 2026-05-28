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
      icon: <Activity className="h-16 w-16 text-emerald-500 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-40" />,
    },
    {
      id: "ferreteria-admin",
      title: "Gestor de Stock y Pedidos",
      niche: "Software Interno",
      description: "Panel para control de inventario en tiempo real, alertas de falta de stock y gestión rápida de remitos para mayoristas.",
      adminLink: "/demos/ferreteria/admin",
      icon: <Database className="h-16 w-16 text-emerald-500 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-40" />,
    },
    {
      id: "gimnasio-admin",
      title: "Gestor de Rutinas y Flujo",
      niche: "Software Interno",
      description: "Panel diario del coach para organizar entrenamientos en caliente y balancear la congestión en sala a través de variaciones inteligentes.",
      adminLink: "/demos/gimnasio/admin",
      icon: <Dumbbell className="h-16 w-16 text-emerald-500 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-40" />,
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden" id="portfolio">
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
        {/* Dark Emerald Overlay to ensure readability */}
        <div className="absolute inset-0 bg-emerald-950/90"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-4">
            Catálogo de Soluciones
          </h2>
          <p className="max-w-3xl text-lg text-emerald-100/80">
            Nuestro trabajo se divide en dos grandes áreas: tu "vidriera pública" para atraer clientes, y tus "sistemas de gestión internos" para que tu negocio funcione como un reloj.
          </p>
        </div>

        {/* --- Sección 1: Landings --- */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm">1</span>
            Vidrieras Web (Para atraer clientes)
          </h3>
          <div className="grid gap-8 sm:grid-cols-2">
            {landings.map((demo) => (
              <div 
                key={demo.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-emerald-800/50 shadow-sm ring-1 ring-emerald-700 transition-all hover:shadow-md hover:ring-orange-500/50 backdrop-blur-sm"
              >
                <div className="h-56 w-full relative bg-emerald-950 overflow-hidden">
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
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      {demo.niche}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">
                    {demo.title}
                  </h4>
                  <p className="text-emerald-100/80 mb-8 flex-1 leading-relaxed">
                    {demo.description}
                  </p>
                  
                  <Link
                    href={demo.publicLink}
                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-500"
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
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm">2</span>
            Sistemas a Medida (Control Interno)
          </h3>
          <div className="grid gap-8 sm:grid-cols-2">
            {sistemas.map((sistema) => (
              <div 
                key={sistema.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-emerald-950 shadow-sm ring-1 ring-emerald-800 transition-all hover:shadow-md hover:ring-emerald-500"
              >
                {/* Decoration background icon instead of image */}
                <div className="absolute -right-6 -top-6">
                  {sistema.icon}
                </div>
                
                <div className="flex flex-1 flex-col p-6 sm:p-8 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {sistema.niche}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">
                    {sistema.title}
                  </h4>
                  <p className="text-emerald-100/70 mb-8 flex-1 leading-relaxed">
                    {sistema.description}
                  </p>
                  
                  <Link
                    href={sistema.adminLink}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3.5 text-sm font-bold text-emerald-50 ring-1 ring-emerald-700 transition-colors hover:bg-emerald-700"
                  >
                    <Settings className="h-4 w-4" />
                    Probar el Sistema
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
