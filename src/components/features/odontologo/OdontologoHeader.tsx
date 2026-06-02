"use client";

import Link from "next/link";
import { Stethoscope, Calendar } from "lucide-react";

export function OdontologoHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/demos/odontologo" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
              Dra. Ana López
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Odontología Integral
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#servicios" 
            onClick={(e) => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Tratamientos
          </a>
          <a 
            href="#contacto" 
            onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Contacto & Ubicación
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 cursor-pointer"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Contactanos</span>
        </a>
      </div>
    </header>
  );
}
