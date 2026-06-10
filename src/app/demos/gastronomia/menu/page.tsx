"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Search, Flame, Sparkles, ChefHat, Smartphone, Clock, MapPin, X
} from "lucide-react";
import { MOCK_MENU, Plato } from "@/data/mock-gastronomia-admin";
import { PwaInstallBanner } from "@/components/ui/PwaInstallBanner";
import { normalizeString } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

export default function GastronomiaMenuPage() {
  const [menu, setMenu] = useState<Plato[]>(MOCK_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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

  // Filter categories to only include those present in the active menu
  const categories = ["Todos", "Minutas", "Parrilla", "Regional", "Bebidas"];

  // Filter menu items by active category, search query, and display ONLY available dishes
  const filteredDishes = menu.filter(plato => {
    const matchesCategory = selectedCategory === "Todos" || plato.categoria === selectedCategory;
    const matchesSearch = normalizeString(plato.nombre).includes(normalizeString(debouncedSearchQuery)) || 
                          normalizeString(plato.descripcion).includes(normalizeString(debouncedSearchQuery));
    return plato.disponible && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased pb-28 selection:bg-amber-500 selection:text-stone-950">
      
      {/* HEADER DE LA CARTA (Tema Claro Premium) */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/demos/gastronomia" className="p-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-500 hover:text-stone-800 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-tight text-stone-900 flex items-center gap-1.5 uppercase">
                <Flame className="h-5 w-5 text-orange-600 fill-orange-500/10" />
                El Campeón
              </h1>
              <p className="text-[9px] md:text-xs text-stone-500 uppercase tracking-widest font-black">Carta de Salón</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-black uppercase rounded-lg">
              <ChefHat className="h-3.5 w-3.5" /> Sabores de leña
            </span>
          </div>
        </div>
      </header>

      {/* CARTA HERO DE SALÓN */}
      <section className="bg-stone-100/50 border-b border-stone-200/60 px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 text-[10px] font-black text-orange-600 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" /> Tradición familiar chaqueña
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-stone-900 uppercase leading-none">
              Nuestra Carta Digital
            </h2>
            <p className="text-xs md:text-sm text-stone-500 max-w-xl font-medium">
              Mirá las especialidades, elegí tu plato preferido y compartilo directamente con el camarero. ¡Sin apuro, cocinado al momento!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-600 text-xs shrink-0 font-bold">
            <span className="flex items-center gap-1 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/50">
              <Clock className="h-3.5 w-3.5 text-orange-600" /> Lun a Dom
            </span>
            <span className="flex items-center gap-1 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/50">
              <MapPin className="h-3.5 w-3.5 text-orange-600" /> Pellegrini 280
            </span>
          </div>
        </div>
      </section>

      {/* FILTROS Y BUSQUEDA */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* BUSCADOR */}
        <div className="flex items-center bg-white border border-stone-200 rounded-2xl px-4 py-3 shadow-sm max-w-md mx-auto focus-within:ring-2 focus-within:ring-orange-600/20 focus-within:border-orange-600 transition-all">
          <Search className="h-4 w-4 text-stone-400 shrink-0" />
          <input 
            type="text" 
            placeholder="¿Qué tenés ganas de comer hoy?"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs md:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-0 ml-2"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-stone-400 hover:text-stone-700 transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* CATEGORÍAS (Scrollable Horizontal) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? "bg-stone-900 text-white shadow-md shadow-stone-900/10"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {cat === "Todos" ? "🍽️ Todos" : cat === "Minutas" ? "🍔 Minutas" : cat === "Parrilla" ? "🍖 Parrilla" : cat === "Regional" ? "🥟 Regional" : "🥤 Bebidas"}
            </button>
          ))}
        </div>

        {/* PLATOS LIST (Diseño Exquisito UX-First) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDishes.length === 0 ? (
            <div className="col-span-full bg-white border border-stone-200 rounded-3xl py-20 text-center space-y-3 shadow-sm">
              <div className="text-5xl animate-bounce">🥣</div>
              <h5 className="font-black text-stone-800 text-base uppercase">¡No encontramos ese plato!</h5>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">Probá buscando otra delicia chaqueña o cambiá la categoría seleccionada.</p>
            </div>
          ) : (
            filteredDishes.map(plato => (
              <div 
                key={plato.id} 
                className="bg-white border border-stone-200/80 hover:border-stone-300 rounded-3xl p-5 flex gap-4 transition-all hover:shadow-lg hover:shadow-stone-200/40 relative overflow-hidden group"
              >
                {/* Plato del Día Sparkle Accent */}
                {plato.menuDelDia && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-amber-500 text-white text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="h-2 w-2 fill-current" /> Recomendado
                  </div>
                )}

                {/* Imagen del plato */}
                <div className="text-4xl md:text-5xl p-4 bg-stone-50 border border-stone-200/60 rounded-2xl flex items-center justify-center shrink-0 h-16 w-16 md:h-20 md:w-20 select-none group-hover:scale-105 transition-transform duration-300">
                  {plato.imagen}
                </div>

                {/* Detalles y precio */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-3 pr-14">
                      <h4 className="font-black text-stone-900 text-base leading-snug group-hover:text-orange-600 transition-colors">
                        {plato.nombre}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed font-medium">
                      {plato.descripcion}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                    <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-[9px] font-black uppercase rounded-lg border border-stone-200/40">
                      {plato.categoria}
                    </span>
                    <span className="text-lg font-black text-stone-900 tracking-tight bg-orange-50 text-orange-950 px-3 py-1 rounded-xl border border-orange-100">
                      {plato.precio}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* BARRA FIJA INFERIOR - LLAMAR AL MOZO (UX-FIRST) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] flex justify-center">
        <div className="max-w-2xl w-full bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white rounded-2xl p-3.5 flex items-center justify-between gap-4 shadow-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-stone-950 shrink-0 shadow-lg shadow-amber-500/10">
              <Smartphone className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[11px] md:text-xs font-black uppercase tracking-wide text-white">¿Elegiste qué vas a pedir?</p>
              <p className="text-[9px] md:text-[10px] text-stone-400 font-bold leading-none mt-0.5">Llamá al mozo y mostrale tu pantalla con los platos seleccionados.</p>
            </div>
          </div>

          <div className="hidden sm:block shrink-0 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-amber-500">
            ¡Fricción Cero!
          </div>
        </div>
      </div>

      <PwaInstallBanner />
    </div>
  );
}
