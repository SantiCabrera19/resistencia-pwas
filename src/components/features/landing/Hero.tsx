"use client";

import { motion } from "framer-motion";
import { ODONTOLOGO_DATA } from "@/data/odontologo";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const { title, description, primaryCTA } = ODONTOLOGO_DATA.hero;

  return (
    <section className="bg-emerald-50 px-5 py-12 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-left"
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
            Consultorio Odontológico · Resistencia
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {description}
          </p>
          <div className="mt-8">
            <Link
              href="#contacto"
              className="flex w-full items-center justify-center rounded-xl bg-sky-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-sky-600 active:scale-95 sm:w-auto sm:inline-flex"
            >
              {primaryCTA}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-3xl shadow-lg"
        >
          <Image
            src="/images/clinic.png"
            alt="Interior del consultorio moderno"
            fill
            sizes="(max-width: 1024px) 100vw, 512px"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
