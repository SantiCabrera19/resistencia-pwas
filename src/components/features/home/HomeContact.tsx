"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

type Rubro = "gimnasio" | "salud" | "comercio" | "otro";
type Solucion = "completo" | "vidriera" | "gestion";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function HomeContact() {
  const [rubro, setRubro] = useState<Rubro>("gimnasio");
  const [solucion, setSolucion] = useState<Solucion>("completo");

  // Dynamic configuration helper for the simulation card
  const getRecommendation = () => {
    const data = {
      gimnasio: {
        title: "Pack Fitness Integral",
        rubroText: "Gimnasio o Centro de Entrenamiento",
        benefits: {
          completo: [
            "Pizarrón interactivo de rutinas para el celular del alumno.",
            "Consola móvil de Coach para control de rutinas y fichas.",
            "Acceso súper veloz sin logins molestos en la sala."
          ],
          vidriera: [
            "Vidriera pública premium para captar clientes en Instagram.",
            "Galería de fotos de tus instalaciones y horarios.",
            "Contacto directo a WhatsApp con 1 solo clic."
          ],
          gestion: [
            "Panel exclusivo para entrenadores y profesores.",
            "Base de datos de alumnos activos e historial de rutinas.",
            "Control de accesos y aforo súper intuitivo."
          ]
        }
      },
      salud: {
        title: "Pack Turnero y Confianza",
        rubroText: "Consultorio de Salud o Estética",
        benefits: {
          completo: [
            "Sitio web premium que transmite máxima higiene visual.",
            "Turnero digital simplificado para reservar citas rápidas.",
            "Fichas médicas e historial de visitas súper confidencial."
          ],
          vidriera: [
            "Vidriera médica minimalista de alto impacto estético.",
            "Presentación de especialidades, tratamientos y staff.",
            "Botón ágil para agendar primer turno por WhatsApp."
          ],
          gestion: [
            "Agenda médica y calendario interactivo de respuesta rápida.",
            "Control de turnos confirmados y cancelaciones diarias.",
            "Base de fichas y notas de pacientes optimizada."
          ]
        }
      },
      comercio: {
        title: "Pack Catálogo y Distribución",
        rubroText: "Ferretería, Corralón o Comercio Local",
        benefits: {
          completo: [
            "Catálogo inmersivo de productos con stock en vivo.",
            "Gestor interno para remitos de entrega y mercadería.",
            "Alertas automáticas de stock mínimo crítico."
          ],
          vidriera: [
            "Catálogo interactivo online organizado por rubro.",
            "Visualización rápida de precios mayoristas y ofertas.",
            "Buscador predictivo instantáneo sin demoras."
          ],
          gestion: [
            "Panel central de facturación, remitos y despacho.",
            "Control manual de stock con alertas de faltantes.",
            "Base de clientes comerciales y cuentas corrientes."
          ]
        }
      },
      otro: {
        title: "Solución Exclusiva a Medida",
        rubroText: "Servicios y Proyectos Especiales",
        benefits: {
          completo: [
            "Diseño 100% libre basado en las referencias que nos pases.",
            "Desarrollo e interfaz adaptada a tu circuito de trabajo.",
            "Soporte presencial y permanente de nuestra parte."
          ],
          vidriera: [
            "Landing page premium con altísimo impacto de marca.",
            "Secciones interactivas para mostrar tu servicio único.",
            "Enlace directo y estratégico para cerrar ventas."
          ],
          gestion: [
            "Panel de control privado diseñado para tu flujo de tareas.",
            "Hosting y mantenimiento optimizado de punta a punta.",
            "Paz mental total sin lidiar con temas técnicos."
          ]
        }
      }
    };

    const currentRubro = data[rubro];
    return {
      title: currentRubro.title,
      rubroText: currentRubro.rubroText,
      benefits: currentRubro.benefits[solucion]
    };
  };

  const recommendation = getRecommendation();

  // Generate dynamic WhatsApp link based on user selection
  const getWhatsAppLink = () => {
    const base = "https://wa.me/5493624237121"; // El número real de Santi
    const rubrosNombres = {
      gimnasio: "un Gimnasio",
      salud: "un Consultorio / Clínica",
      comercio: "un Comercio / Ferretería",
      otro: "un Proyecto a medida"
    };
    const solucionesNombres = {
      completo: "el Combo Completo (Vidriera + Sistema de Gestión)",
      vidriera: "la Vidriera Web pública (para captar clientes)",
      gestion: "el Sistema de Gestión interno (para control privado)"
    };
    const mensaje = `¡Hola SECdigital! Estuve chusmeando en la web y me interesa armar una plantilla para ${rubrosNombres[rubro]} enfocado en ${solucionesNombres[solucion]}. ¿Nos juntamos a tomar unos mates y charlamos del diseño?`;
    return `${base}?text=${encodeURIComponent(mensaje)}`;
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 px-6 py-24 sm:py-32 transition-colors duration-200" id="contacto">
      <div className="mx-auto max-w-6xl space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto select-none">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 dark:bg-orange-500/5 px-3.5 py-1.5 rounded-full border border-orange-500/20 text-[9px] font-black text-orange-655 dark:text-orange-400 uppercase tracking-widest">
            <Sparkles className="h-3 w-3" />
            <span>Simulador de Idea</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl leading-none">
            ¿Tenés un local y querés vender más?
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            No necesitás lidiar con paneles complejos. Diseñá tu idea en 3 clics y charlémosla en persona con unos mates de por medio.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: The Configuration Panel with pristine dark mode support */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/50 p-6 sm:p-8 rounded-3xl shadow-sm space-y-8 select-none transition-colors duration-200">
            
            {/* Step 1: Rubro */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-655 dark:text-orange-450 tracking-wider">
                ¿A qué se dedica tu negocio?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRubro("gimnasio")}
                  className={`flex items-center justify-center p-4 rounded-xl border text-xs font-black text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    rubro === "gimnasio"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Gimnasio o Deporte</span>
                </button>

                <button
                  onClick={() => setRubro("salud")}
                  className={`flex items-center justify-center p-4 rounded-xl border text-xs font-black text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    rubro === "salud"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Salud o Consultorio</span>
                </button>

                <button
                  onClick={() => setRubro("comercio")}
                  className={`flex items-center justify-center p-4 rounded-xl border text-xs font-black text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    rubro === "comercio"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Comercio o Corralón</span>
                </button>

                <button
                  onClick={() => setRubro("otro")}
                  className={`flex items-center justify-center p-4 rounded-xl border text-xs font-black text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    rubro === "otro"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Otro Rubro o Idea</span>
                </button>
              </div>
            </div>

            {/* Step 2: Soluciones */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-655 dark:text-orange-450 tracking-wider">
                ¿Qué soluciones te gustaría incorporar?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setSolucion("vidriera")}
                  className={`p-4 rounded-xl border text-xs font-black text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    solucion === "vidriera"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Vidriera Web</span>
                  <span className="text-[8px] font-semibold text-slate-400 dark:text-slate-500 uppercase leading-none mt-1">Para Captar Clientes</span>
                </button>

                <button
                  onClick={() => setSolucion("gestion")}
                  className={`p-4 rounded-xl border text-xs font-black text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    solucion === "gestion"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Consola Interna</span>
                  <span className="text-[8px] font-semibold text-slate-400 dark:text-slate-500 uppercase leading-none mt-1">Para Control Privado</span>
                </button>

                <button
                  onClick={() => setSolucion("completo")}
                  className={`p-4 rounded-xl border text-xs font-black text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    solucion === "completo"
                      ? "bg-orange-50/70 dark:bg-orange-900/40 border-orange-600 dark:border-orange-500 text-orange-655 dark:text-orange-400 shadow-sm dark:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>Combo Completo</span>
                  <span className="text-[8px] font-semibold text-slate-400 dark:text-slate-500 uppercase leading-none mt-1">Todo Conectado</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Simulation Ficha */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* The Simulation Ficha Card */}
            <div className="bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between h-full group transition-colors duration-200">
              
              {/* Decorative peach glow orb */}
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-orange-500/10 dark:bg-orange-500/20 blur-2xl opacity-80 dark:opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/35 px-3 py-1 rounded-md text-[8px] font-black uppercase text-orange-600 dark:text-orange-400 tracking-wider">
                    Solución Sugerida
                  </span>
                </div>

                <div className="space-y-1 select-none">
                  <span className="text-[9px] font-black uppercase text-slate-500 dark:text-slate-450 tracking-wider">
                    {recommendation.rubroText}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {recommendation.title}
                  </h3>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3.5 pt-2">
                  {recommendation.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action and social triggers */}
              <div className="pt-8 space-y-4 relative z-10 w-full">
                {/* Dynamic WhatsApp Link */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20b958] px-6 py-4 text-xs font-black text-white shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200 select-none cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span>Charlemos por WhatsApp</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </a>

                {/* Instagram secondary trigger */}
                <a
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 px-6 py-4 text-xs font-black text-slate-800 dark:text-white active:scale-95 transition-all duration-200 select-none cursor-pointer"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400" />
                  <span>Seguinos en Instagram</span>
                </a>
              </div>
            </div>

            {/* Micro details */}
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center select-none">
              Respuesta en minutos • Sin formularios eternos • Trato de amigo
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
