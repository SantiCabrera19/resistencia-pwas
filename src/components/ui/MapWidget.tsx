"use client";

import { Navigation, MapPin } from "lucide-react";

interface MapWidgetProps {
  address: string;
  lat: number;
  lon: number;
  googleMapsUrl: string;
  theme: "emerald" | "orange" | "amber";
}

export function MapWidget({ address, lat, lon, googleMapsUrl, theme }: MapWidgetProps) {
  const themeColors = {
    emerald: {
      button: "bg-emerald-600 hover:bg-emerald-700 text-white",
      bg: "bg-slate-50 dark:bg-stone-950",
      card: "border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900"
    },
    orange: {
      button: "bg-orange-600 hover:bg-orange-700 text-white",
      bg: "bg-slate-50 dark:bg-stone-950",
      card: "border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900"
    },
    amber: {
      button: "bg-amber-500 hover:bg-amber-400 text-stone-950",
      bg: "bg-stone-950",
      card: "border-stone-800 bg-stone-900"
    }
  };

  const colors = themeColors[theme];

  // OpenStreetMap Bounding Box Calculation - Delta estático óptimo
  const delta = 0.0035;
  const minLon = lon - delta;
  const minLat = lat - delta;
  const maxLon = lon + delta;
  const maxLat = lat + delta;
  
  const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
  const iframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div className={`border rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[320px] md:h-[280px] w-full transition-all ${colors.card}`}>
      
      {/* REAL MAP DISPLAY (OPENSTREETMAP - 100% FREE & OPEN SOURCE) */}
      <div className={`relative flex-1 overflow-hidden h-[200px] md:h-full ${colors.bg}`}>
        
        <iframe
          title={`Mapa de ${address}`}
          width="100%"
          height="100%"
          className="border-none opacity-90 dark:opacity-75 transition-all"
          src={iframeUrl}
        />

        {/* Overlay to block iframe scrolling/grabbing conflict when browsing pages unless intentional */}
        <div className="absolute inset-0 pointer-events-none border border-transparent z-10" />

        {/* Resistencia tag */}
        <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black uppercase text-amber-500 tracking-widest z-20 border border-stone-800">
          🌱 OpenStreetMap
        </div>
      </div>

      {/* INFO CARD SIDE */}
      <div className="p-6 md:w-[240px] shrink-0 flex flex-col justify-between space-y-4 bg-white dark:bg-stone-900 border-t md:border-t-0 md:border-l border-slate-100 dark:border-stone-800">
        <div className="space-y-1.5">
          <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest block">Ubicación exacta</span>
          <h4 className="font-black text-sm leading-snug text-slate-900 dark:text-stone-100">{address}</h4>
          <p className="text-[10px] leading-normal text-slate-500 dark:text-stone-400">
            Punto interactivo en vivo. Podés desplazar y hacer zoom usando el mapa.
          </p>
        </div>

        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all active:scale-95 shadow-sm text-center flex items-center justify-center gap-1.5 ${colors.button}`}
        >
          <Navigation className="h-4.5 w-4.5 fill-current" /> Cómo llegar
        </a>
      </div>
    </div>
  );
}
