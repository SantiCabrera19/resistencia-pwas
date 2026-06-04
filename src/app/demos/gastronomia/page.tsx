"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChefHat, Flame, ArrowLeft, MapPin, Clock, ArrowRight
} from "lucide-react";
import { MOCK_MENU, Plato } from "@/data/mock-gastronomia-admin";
import { MapWidget } from "@/components/ui/MapWidget";
import { PwaInstallBanner } from "@/components/ui/PwaInstallBanner";

export default function GastronomiaLandingPage() {
  const [menu, setMenu] = useState<Plato[]>(MOCK_MENU);

  // Sync menu from localStorage if admin modified it
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("gastronomia_menu");
      if (stored) {
        setMenu(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Error reading local menu", e);
    }
  }, []);

  // Show only 4 gourmet specialties on the landing page
  const especialidades = menu.filter(p => p.disponible).slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-stone-900 pb-20">
      
      {/* HEADER DE LA ROTISERÍA */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-900 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 bg-stone-900 hover:bg-stone-850 rounded-lg text-stone-400 hover:text-stone-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                <Flame className="h-6 w-6 text-amber-500 fill-amber-500/10" />
                El Campeón
              </h1>
              <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">Rotisería & Minutas Chaqueñas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/demos/gastronomia/menu" 
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
            >
              📖 Ver Carta
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE COMIDAS */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950 border-b border-stone-900 px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 border border-stone-800 text-amber-500 rounded-full text-xs font-black uppercase tracking-wider">
            <ChefHat className="h-4 w-4" /> ¡El verdadero sabor chaqueño!
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
            La rotisería con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">el sabor de los fuegos</span>
          </h2>
          <p className="text-sm md:text-lg text-stone-400 max-w-xl mx-auto font-medium leading-relaxed">
            Minutas gigantes, el mejor asado criollo y platos regionales chaqueños hechos a la leña. Paseá por nuestra carta digital interactiva y tentate.
          </p>

          <div className="pt-6">
            <Link 
              href="/demos/gastronomia/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black rounded-2xl uppercase tracking-wider text-sm transition-all active:scale-95 shadow-xl shadow-amber-500/15"
            >
              📖 Abrir Carta Digital <ArrowRight className="h-4 w-4 stroke-[3]" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-400 text-xs md:text-sm pt-6 border-t border-stone-900 max-w-lg mx-auto">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-amber-500" /> Lun a Dom · 11:30 a 14:30 / 19:30 a 23:30</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-amber-500" /> Pellegrini 280 · Resistencia</span>
          </div>
        </div>
        
        {/* Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 rounded-full blur-[100px]" />
      </section>

      {/* BODY DEL MENÚ - ESPECIALIDADES */}
      <main className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Tentate con lo nuestro</span>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase mt-1">Especialidades de la Casa</h3>
          <p className="text-xs text-stone-400 mt-2">Una pequeña muestra de los sabores clásicos de nuestro bodegón.</p>
        </div>

        {/* LISTA DE PLATOS (SIN PRECIOS NI BOTONES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {especialidades.map(plato => (
            <div 
              key={plato.id} 
              className="bg-stone-900/40 border border-stone-900 rounded-2xl p-5 flex gap-4 transition-all"
            >
              <div className="text-4xl md:text-5xl p-4 bg-stone-950 border border-stone-850 rounded-xl flex items-center justify-center shrink-0 h-16 w-16 select-none">
                {plato.imagen}
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-black text-white text-base leading-tight">{plato.nombre}</h5>
                    <span className="px-2 py-0.5 bg-stone-800 text-stone-400 text-[9px] font-bold uppercase rounded">{plato.categoria}</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed mt-1">{plato.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <Link 
            href="/demos/gastronomia/menu"
            className="text-amber-500 hover:text-amber-400 font-bold text-xs uppercase tracking-wider hover:underline transition-all"
          >
            Ver todos los platos y precios en la Carta Completa →
          </Link>
        </div>
      </main>

      {/* MAPA Y UBICACIÓN */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-stone-900">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Encontranos en Resistencia</span>
          <h3 className="text-2xl font-black text-white uppercase mt-1">Ubicación de Fuegos</h3>
          <p className="text-xs text-stone-400 mt-2">Pellegrini 280 (Entre Salta y Tucumán) · H3500 Resistencia, Chaco</p>
        </div>
        <MapWidget 
          address="Pellegrini 280, Resistencia, Chaco" 
          lat={-27.4514}
          lon={-58.9866}
          googleMapsUrl="https://maps.google.com/?q=Pellegrini+280,+Resistencia,+Chaco" 
          theme="amber" 
        />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-900 bg-stone-950 px-5 py-12 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto space-y-4">
          <p>© {new Date().getFullYear()} Rotisería El Campeón — Sabores Chaqueños a la Leña.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="font-bold text-amber-500 hover:text-amber-400 transition-colors">
              ← Volver a Santi Soluciones
            </Link>
          </div>
        </div>
      </footer>

      <PwaInstallBanner />
    </div>
  );
}
