import Image from "next/image";
import { HomeHeader } from "@/components/features/home/HomeHeader";
import { HomeHero } from "@/components/features/home/HomeHero";
import { HomeAbout } from "@/components/features/home/HomeAbout";
import { HomePortfolio } from "@/components/features/home/HomePortfolio";
import { HomeContact } from "@/components/features/home/HomeContact";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PWALaunchDirector } from "@/components/layout/PWALaunchDirector";

export default function HomePage() {
  return (
    <SmoothScroll>
      <PWALaunchDirector />
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-300 transition-colors duration-200" id="top">
        <HomeHeader />

        <main className="flex-1">
          <HomeHero />
          <HomeAbout />
          <HomePortfolio />
          <HomeContact />
        </main>

        <footer className="bg-emerald-950 dark:bg-slate-950 dark:border-t dark:border-slate-800 py-12 text-center text-emerald-200/60 dark:text-slate-400 transition-colors duration-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-6 w-6 relative opacity-70">
                <Image src="/icons/android-chrome-192x192.png" alt="Logo Santi Mini" fill sizes="24px" />
              </div>
              <span className="font-bold text-emerald-400">Santi</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Agencia Santi. Hecho con ❤️ en Resistencia, Chaco.
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
