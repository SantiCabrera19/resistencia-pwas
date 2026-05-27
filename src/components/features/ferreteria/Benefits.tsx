"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Package, Truck, Clock, ShieldCheck } from "lucide-react";

const beneficios = [
  {
    icon: Package,
    title: "Stock propio",
    texto: "Tenemos depósito propio y mercadería lista. Lo que ves en el catálogo, lo tenemos.",
  },
  {
    icon: Truck,
    title: "Entrega en obra",
    texto: "Te llevamos los materiales directo a tu obra en Resistencia y alrededores.",
  },
  {
    icon: Clock,
    title: "Atención rápida",
    texto: "Sin esperas. Vos pedís, nosotros preparamos. Cotización al instante por WhatsApp.",
  },
  {
    icon: ShieldCheck,
    title: "Venta mayorista",
    texto: "Precios especiales para constructoras, electricistas y profesionales del rubro.",
  },
];

export function Benefits() {
  return (
    <section className="bg-slate-900 px-5 py-16 sm:py-24" id="beneficios">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Foto de atención */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/ferreteria_attention.png"
              alt="Atención personalizada en FerreMax"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-sm font-bold text-white">Atención personalizada</p>
              <p className="text-xs text-white/70">Te asesoramos en lo que necesites</p>
            </div>
          </motion.div>

          {/* Beneficios grid */}
          <div>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight mb-8">
              ¿Por qué FerreMax?
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {beneficios.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-600/20">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{b.title}</h3>
                      <p className="mt-1 text-sm text-slate-400 leading-relaxed">{b.texto}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
