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
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight">
              Ofertas Destacadas
            </h2>
            <p className="mt-2 text-slate-600 font-medium">
              Los productos más buscados por los profesionales.
            </p>
          </div>
          <button className="text-sm font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider">
            Ver todo el catálogo →
          </button>
        </div>

        {/* E-commerce Style Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-md bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              {item.tag && (
                <div className="absolute left-0 top-4 z-10 bg-orange-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
                  {item.tag}
                </div>
              )}
              
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={i < 4}
                />
              </div>
              
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {item.brand}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight flex-1">
                  {item.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black text-slate-900">
                    {item.price}
                  </span>
                  <button className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-100 text-slate-600 transition-colors hover:bg-orange-600 hover:text-white">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
