"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Database, Activity, Dumbbell, ExternalLink, ChefHat, Newspaper, CheckCircle2 } from "lucide-react";

export function HomePortfolio() {
  const verticals = [
    {
      id: "gastronomia",
      title: "Gastronomía",
      subtitle: "Rotiserías, Resto-Bars & Cafeterías",
      description: "Eliminá las comisiones de plataformas externas y agilizá tus ventas. Un menú digital para que tus clientes pidan directamente en las mesas o para delivery, coordinado con un panel privado donde actualizás precios en el acto.",
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-500",
      icon: <ChefHat className="h-6 w-6 text-amber-500" />,
      landing: {
        title: "Menú Digital para Clientes",
        description: "Menú digital de carga instantánea. Los clientes escanean el QR, arman su pedido y te lo envían directamente a tu WhatsApp o al mozo, sin demoras de señal.",
        link: "/demos/gastronomia",
        image: "/images/gastronomia_store.png",
      },
      admin: {
        title: "Panel de Caja y Carta",
        description: "Consola privada para pausar platos sin stock al instante, cambiar precios en segundos y controlar la caja diaria de forma simple.",
        link: "/demos/gastronomia/admin",
      }
    },
    {
      id: "odontologo",
      title: "Salud & Clínicas",
      subtitle: "Consultorios Médicos & Odontológicos",
      description: "Reducí el ausentismo de tus pacientes y profesionalizá tu atención. Una fachada web impecable que transmite confianza, integrada con un turnero automático y fichas de historial clínico privadas.",
      color: "from-rose-500 to-pink-650",
      textColor: "text-rose-500",
      icon: <Activity className="h-6 w-6 text-rose-500" />,
      landing: {
        title: "Vidriera & Turnero Web",
        description: "Vidriera médica de alta estética visual. Facilita que tus pacientes agenden turnos libres directamente desde su celular en menos de un minuto.",
        link: "/demos/odontologo",
        image: "/images/smile.png",
      },
      admin: {
        title: "Gestor de Citas & Fichas",
        description: "Agenda diaria digital ultra veloz. Controlá turnos confirmados, cancelaciones del día e historial clínico de pacientes de forma centralizada.",
        link: "/demos/odontologo/admin",
      }
    },
    {
      id: "ferreteria",
      title: "Ferreterías & Corralones",
      subtitle: "Locales de Stock, Corralones & Distribuidores",
      description: "Evitá las ventas sin stock y automatizá tus pedidos mayoristas o minoristas. Un catálogo interactivo para cotizar materiales pesados o herramientas en segundos, conectado a tu control de remitos e inventario.",
      color: "from-blue-500 to-indigo-650",
      textColor: "text-blue-500",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      landing: {
        title: "Catálogo de Artículos Web",
        description: "Catálogo de artículos categorizado y veloz. Tus clientes pueden armar su lista de compras, cotizar y enviarte el pedido detallado para preparar.",
        link: "/demos/ferreteria",
        image: "/images/ferreteria_store.png",
      },
      admin: {
        title: "Gestor de Inventario & Pedidos",
        description: "Panel de inventario con alertas automáticas de stock mínimo crítico, control de pedidos listos para despachar y generación rápida de remitos de entrega.",
        link: "/demos/ferreteria/admin",
      }
    },
    {
      id: "gimnasio",
      title: "Gimnasios & Fitness",
      subtitle: "Centros Deportivos, Boxes & Personal Trainers",
      description: "Ahorrá tiempo en planillas de papel y controlá los pagos del mes de forma automática. Un pizarrón digital donde tus alumnos siguen sus rutinas diarias, administrado desde tu celular en un panel de control simple.",
      color: "from-orange-500 to-red-650",
      textColor: "text-orange-500",
      icon: <Dumbbell className="h-6 w-6 text-orange-500" />,
      landing: {
        title: "Pizarrón Digital de Alumnos",
        description: "Web interactiva para el salón. Tus alumnos registran su asistencia y siguen su plan de entrenamiento físico asignado desde su propio teléfono.",
        link: "/demos/gimnasio",
        image: "/images/gym_blackboard.png",
      },
      admin: {
        title: "Consola de Planificación",
        description: "Panel del profesor para asignar rutinas personalizadas al instante, registrar asistencias y monitorear cuotas activas o vencidas.",
        link: "/demos/gimnasio/admin",
      }
    },
    {
      id: "noticias",
      title: "Medios & Portales de Noticias",
      subtitle: "Radios Locales, Diarios & Portales de Prensa",
      description: "Multiplicá tus lecturas diarias y fidelizá a tus oyentes de radio. Un portal digital de noticias de carga inmediata, con streaming de radio integrado que no se corta y gestión directa de tus propios banners de publicidad.",
      color: "from-emerald-500 to-teal-650",
      textColor: "text-emerald-500",
      icon: <Newspaper className="h-6 w-6 text-emerald-500" />,
      landing: {
        title: "Portal Informativo Web",
        description: "Diario digital optimizado para cargar noticias al instante, con reproductor de radio en vivo que sigue sonando en segundo plano.",
        link: "/demos/noticias",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      },
      admin: {
        title: "Panel de Redacción & Anuncios",
        description: "Consola de publicación simple para redactores, estadísticas de lecturas en vivo y gestión directa de banners publicitarios sin complicaciones.",
        link: "/demos/noticias/admin",
      }
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors" id="portfolio">
      
      {/* Background meshes */}
      <div className="absolute inset-0 z-0 opacity-[0.25] dark:opacity-[0.1] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-20">
        
        {/* Section Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto select-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-450">Soluciones para tu Rubro</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Sistemas Listos para Trabajar
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400">
            Cada rubro cuenta con un sistema completo de dos partes: una **web atractiva** para tus clientes y un **panel privado** para que gestiones todo vos mismo.
          </p>
        </div>

        {/* ─── VERTICALS LIST ─── */}
        <div className="space-y-16">
          {verticals.map((vertical, index) => (
            <div 
              key={vertical.id}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md p-6 sm:p-10 transition-all hover:border-slate-350 dark:hover:border-slate-700/80 duration-300"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6 mb-8 select-none">
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/60 flex items-center justify-center">
                    {vertical.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      Para {vertical.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                      {vertical.subtitle}
                    </p>
                  </div>
                </div>
                <div className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none self-start sm:self-auto">
                  Solución Integral #{index + 1}
                </div>
              </div>

              {/* Main Grid: Description + Two Cards */}
              <div className="grid gap-8 lg:grid-cols-12">
                
                {/* Column 1: Rubro Overview (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6 select-none">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                    {vertical.description}
                  </p>
                  
                  <div className="hidden lg:block space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Diseño 100% personalizado
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Listo para usar en celular
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Soporte presencial local
                    </div>
                  </div>
                </div>

                {/* Column 2: Public Web (4 cols) */}
                <div className="lg:col-span-4 flex flex-col overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 shadow-sm p-4 space-y-4">
                  {/* Image Preview */}
                  <div className="h-36 w-full relative rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200/20">
                    <Image 
                      src={vertical.landing.image} 
                      alt={vertical.landing.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        {vertical.landing.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">
                        {vertical.landing.description}
                      </p>
                    </div>
                    
                    <Link
                      href={vertical.landing.link}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-4 py-3 text-xs font-black text-white hover:bg-orange-500 active:scale-95 transition-all shadow-sm shadow-orange-600/10 cursor-pointer"
                    >
                      Probar Sitio Web
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Column 3: Private Admin (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 shadow-sm p-5 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        {vertical.admin.title}
                      </h4>
                    </div>
                    
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-450 leading-relaxed">
                      {vertical.admin.description}
                    </p>
                  </div>

                  <Link
                    href={vertical.admin.link}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 px-4 py-3 text-xs font-black text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Probar Panel de Control
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
