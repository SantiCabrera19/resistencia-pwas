"use client";

import { motion } from "framer-motion";

const testimonios = [
  {
    nombre: "Luciana M.",
    texto: "Le tenía mucho miedo al dentista, pero acá me sentí cómoda desde el primer momento. El consultorio es muy limpio y el trato es súper humano.",
    detalle: "Paciente desde 2023",
  },
  {
    nombre: "Carlos R.",
    texto: "Me hice un implante y quedó perfecto. Lo mejor es que me explicaron todo paso a paso, sin apurarme. Muy profesionales.",
    detalle: "Implante dental",
  },
  {
    nombre: "María José T.",
    texto: "Llevo a mis dos hijos y siempre salen contentos. El Dr. tiene mucha paciencia con los chicos y eso para mí vale oro.",
    detalle: "Odontopediatría",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-5 py-16 sm:py-24" id="testimonios">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-left sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Historias reales de personas de Resistencia que confiaron en nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-6"
            >
              <p className="flex-1 text-base leading-relaxed text-slate-600 italic">
                &ldquo;{t.texto}&rdquo;
              </p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-900">{t.nombre}</p>
                <p className="text-sm text-slate-500">{t.detalle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
