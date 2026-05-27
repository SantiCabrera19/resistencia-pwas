import type { Metadata } from "next";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Hero } from "@/components/features/landing/Hero";
import { Services } from "@/components/features/landing/Services";
import { Testimonials } from "@/components/features/landing/Testimonials";
import { Contact } from "@/components/features/landing/Contact";
import { OdontologoHeader } from "@/components/features/landing/OdontologoHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consultorio Odontológico Dr. Smile",
  description: "Cuidamos tu sonrisa en Resistencia. Sacá tu turno online.",
};

export default function OdontologoDemoPage() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
        <OdontologoHeader />

        <main className="flex-1">
          <Hero />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        
        {/* Footer profesional */}
        <footer className="border-t border-slate-100 bg-white px-5 py-10">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Consultorio Dr. Smile — Resistencia, Chaco.</p>
            <div className="flex items-center gap-4">
              <span>Lun a Vie · 09 a 18 hs</span>
              <span className="text-slate-300">|</span>
              <Link href="/" className="font-medium text-emerald-600 hover:underline">
                ← Volver a Santi Soluciones
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
