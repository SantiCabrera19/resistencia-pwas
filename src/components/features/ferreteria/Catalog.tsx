"use client";

import { motion } from "framer-motion";
import { FERRETERIA_DATA } from "@/data/ferreteria";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export function Catalog() {
  const { destacados } = FERRETERIA_DATA;

  return (
    <section className="bg-slate-50 px-5 py-16 sm:py-24" id="catalogo">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight">
                Ofertas Destacadas
              </h2>
              <p className="mt-2 text-slate-600 font-medium">
                Los productos más buscados por los profesionales.
              </p>
            </div>
          </div>
          
          <div className="flex items-center bg-white border-2 border-slate-200 p-2 rounded-sm w-full max-w-2xl focus-within:border-orange-600 transition-colors">
            <input 
              type="text" 
              placeholder="Buscar herramientas, materiales..." 
              className="flex-1 bg-transparent border-none px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            <button className="bg-slate-900 text-white px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-wider hover:bg-orange-600 transition-colors">
              Buscar
            </button>
          </div>
        </div>

        {/* E-commerce Style Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((item, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden bg-white border-2 border-slate-100 hover:border-slate-300 transition-colors rounded-sm"
            >
              {item.tag && (
                <div className="absolute left-0 top-0 z-10 bg-orange-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                  {item.tag}
                </div>
              )}
              
              <div className="relative aspect-square w-full overflow-hidden bg-white p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain"
                    priority={i < 4}
                  />
                </div>
              </div>
              
              <div className="flex flex-1 flex-col p-5 border-t border-slate-100 bg-slate-50">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  {item.brand}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug flex-1">
                  {item.title}
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  <span className="text-xl font-black text-slate-900">
                    {item.price}
                  </span>
                  <a 
                    href={`https://wa.me/5493621234567?text=Hola,%20quiero%20pedir%20el%20producto:%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-slate-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-600"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Pedir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
