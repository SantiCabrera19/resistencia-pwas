"use client";

import { motion } from "framer-motion";
import { ODONTOLOGO_DATA } from "@/data/odontologo";
import Image from "next/image";

export function Services() {
  const { servicios } = ODONTOLOGO_DATA;

  return (
    <section className="bg-white px-5 py-16 sm:py-24" id="servicios">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-left sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nuestras Especialidades
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tecnología y calidez humana para cuidar tu salud bucal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio, i) => {
            const Icon = servicio.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-emerald-200"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {servicio.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {servicio.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Galería con contexto */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative h-64 w-full overflow-hidden rounded-3xl sm:h-80"
          >
            <Image
              src="/images/smile.png"
              alt="Paciente sonriendo con dientes perfectos"
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
            {/* Pie de foto */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
              <p className="text-sm font-bold text-white">Pacientes felices</p>
              <p className="text-xs text-white/70">Resultados que hablan por sí solos</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative h-64 w-full overflow-hidden rounded-3xl sm:h-80"
          >
            <Image
              src="/images/portrait.png"
              alt="Profesional odontólogo sonriendo en el consultorio"
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
              priority
            />
            {/* Pie de foto */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
              <p className="text-sm font-bold text-white">Nuestro equipo</p>
              <p className="text-xs text-white/70">Profesionales con vocación y experiencia</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
