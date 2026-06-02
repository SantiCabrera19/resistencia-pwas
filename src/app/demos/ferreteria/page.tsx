import type { Metadata } from "next";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { FerreteriaHeader } from "@/components/features/ferreteria/FerreteriaHeader";
import { Hero } from "@/components/features/ferreteria/Hero";
import { Categories } from "@/components/features/ferreteria/Categories";
import { Catalog } from "@/components/features/ferreteria/Catalog";
import { Benefits } from "@/components/features/ferreteria/Benefits";
import { Contact } from "@/components/features/ferreteria/Contact";
import Link from "next/link";
import { PwaInstallBanner } from "@/components/ui/PwaInstallBanner";

export const metadata: Metadata = {
  title: "FerreMax Industrial",
  description: "Materiales y herramientas para verdaderos constructores en Resistencia.",
};

export default function FerreteriaDemoPage() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
        <FerreteriaHeader />

        <main className="flex-1">
          <Hero />
          <Categories />
          <Catalog />
          <Benefits />
          <Contact />
        </main>
        
        <footer className="bg-slate-950 px-5 py-10">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} FerreMax — Resistencia, Chaco. Stock asegurado.</p>
            <div className="flex items-center gap-4">
              <span>Lun a Sáb · 07:30 a 17 hs</span>
              <span className="text-slate-700">|</span>
              <Link href="/" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
                ← Volver a Santi Soluciones
              </Link>
            </div>
          </div>
        </footer>

        <PwaInstallBanner />
      </div>
    </SmoothScroll>
  );
}
