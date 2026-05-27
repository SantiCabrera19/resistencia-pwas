"use client";

import { motion } from "framer-motion";
import { FERRETERIA_DATA } from "@/data/ferreteria";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const { title, description, primaryCTA, secondaryCTA } = FERRETERIA_DATA.hero;

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center px-5 py-20 overflow-hidden">
      {/* Background Image with heavy industrial overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ferreteria_store.png"
          alt="Fondo de ferretería industrial"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <span className="mb-6 inline-block border border-orange-500 bg-orange-500/20 px-4 py-1.5 text-sm font-bold tracking-widest text-orange-400 uppercase rounded-sm">
          Venta Mayorista y Minorista
        </span>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl uppercase leading-[1.1]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
          {description}
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#catalogo"
            className="flex w-full items-center justify-center rounded-sm bg-orange-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-500 sm:w-auto"
          >
            {primaryCTA}
          </Link>
          <a
            href={`https://wa.me/${FERRETERIA_DATA.contacto.whatsapp.replace(/\s+/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center rounded-sm border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-slate-900 sm:w-auto"
          >
            {secondaryCTA}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
