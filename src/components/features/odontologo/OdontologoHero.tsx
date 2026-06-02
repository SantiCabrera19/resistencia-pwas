"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import Image from "next/image";

export function OdontologoHero() {
  return (
    <section className="relative overflow-hidden bg-emerald-50/50 pt-16 sm:pt-24 lg:pt-32 pb-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Atención inmediata en Resistencia
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              Tu salud dental <br/>en manos de la <span className="text-emerald-600">Dra. Ana López.</span>
            </h1>
            
            <p className="text-lg text-slate-600 font-medium mb-8 max-w-md leading-relaxed">
              Tratamientos integrales con tecnología de última generación en Resistencia (Av. Sarmiento 123). Devolvé la confianza a tu sonrisa sin dolor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-600/20"
              >
                Contactanos
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-emerald-100 pt-8 w-full">
              <div className="flex flex-col gap-1">
                <ShieldCheck className="h-6 w-6 text-emerald-600 mb-1" />
                <span className="text-sm font-bold text-slate-900">Seguridad</span>
                <span className="text-xs text-slate-500 font-medium">Protocolos 100% seguros</span>
              </div>
              <div className="flex flex-col gap-1">
                <Clock className="h-6 w-6 text-emerald-600 mb-1" />
                <span className="text-sm font-bold text-slate-900">Puntualidad</span>
                <span className="text-xs text-slate-500 font-medium">Sin demoras en sala</span>
              </div>
              <div className="flex flex-col gap-1">
                <Award className="h-6 w-6 text-emerald-600 mb-1" />
                <span className="text-sm font-bold text-slate-900">Especialistas</span>
                <span className="text-xs text-slate-500 font-medium">Postgrados certificados</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-slate-100">
            <Image 
              src="/images/clinic.png" 
              alt="Consultorio Odontológico Dra. Ana López" 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
