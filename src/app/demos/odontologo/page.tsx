import type { Metadata } from "next";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { OdontologoHeader } from "@/components/features/odontologo/OdontologoHeader";
import { OdontologoHero } from "@/components/features/odontologo/OdontologoHero";
import { OdontologoServices } from "@/components/features/odontologo/OdontologoServices";
import { OdontologoContact } from "@/components/features/odontologo/OdontologoContact";
import Link from "next/link";
import { PwaInstallBanner } from "@/components/ui/PwaInstallBanner";

export const metadata: Metadata = {
  title: "Consultorio Odontológico Dra. Ana López",
  description: "Cuidamos tu sonrisa en Resistencia. Tratmientos integrales y seguros.",
};

export default function OdontologoDemoPage() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
        <OdontologoHeader />

        <main className="flex-1">
          <OdontologoHero />
          <OdontologoServices />
          <OdontologoContact />
        </main>
        
        {/* Footer profesional */}
        <footer className="border-t border-slate-100 bg-white px-5 py-10">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p className="text-center sm:text-left">© {new Date().getFullYear()} Consultorio Dra. Ana López — Av. Sarmiento 123, Resistencia, Chaco.</p>
            <div className="flex items-center gap-4">
              <span>Lun a Vie · 09 a 18 hs</span>
              <span className="text-slate-300">|</span>
              <Link href="/" className="font-medium text-emerald-600 hover:underline">
                ← Volver a SECdigital
              </Link>
            </div>
          </div>
        </footer>

        <PwaInstallBanner />
      </div>
    </SmoothScroll>
  );
}
