"use client";

import { motion } from "framer-motion";
import { FERRETERIA_DATA } from "@/data/ferreteria";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const { title, description, primaryCTA, secondaryCTA } = FERRETERIA_DATA.hero;

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center px-5 py-20 overflow-hidden">
      {/* Background Image with clean industrial overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ferreteria_store.png"
          alt="Fondo de ferretería industrial"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-block bg-orange-600 px-4 py-1.5 text-xs font-black tracking-widest text-white uppercase rounded-sm">
          Venta Mayorista y Minorista
        </span>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl uppercase leading-[1.1] mb-6">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-400 font-medium sm:text-xl mb-10">
          {description}
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#catalogo"
            className="flex w-full items-center justify-center bg-orange-600 px-8 py-4 text-base font-black text-white hover:bg-orange-700 transition-colors sm:w-auto rounded-sm uppercase tracking-wider"
          >
            {primaryCTA}
          </Link>
          <a
            href={`https://wa.me/${FERRETERIA_DATA.contacto.whatsapp.replace(/\s+/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center bg-white px-8 py-4 text-base font-black text-slate-900 hover:bg-slate-100 transition-colors sm:w-auto rounded-sm uppercase tracking-wider"
          >
            {secondaryCTA}
          </a>
        </div>
      </div>
    </section>
  );
}
