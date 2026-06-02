"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare, Smartphone, Download } from "lucide-react";

export function PwaInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Detectar si ya está corriendo instalada (standalone)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches 
      || (window.navigator as any).standalone === true;

    if (isStandalone) {
      return; // Ya está instalada, no mostramos nada
    }

    // 2. Detectar si el usuario ya cerró el banner en esta sesión
    const isDismissed = sessionStorage.getItem("pwa_install_prompt_dismissed");
    if (isDismissed === "true") {
      return;
    }

    // 3. Detectar si es dispositivo iOS (Safari)
    const ua = window.navigator.userAgent;
    const iosDetected = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIos(iosDetected);

    if (iosDetected) {
      // En iOS mostramos el banner de guía de forma nativa en Safari
      setShowBanner(true);
    }

    // 4. Capturar el prompt de instalación nativo en Chrome/Android/Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Disparar prompt
    deferredPrompt.prompt();
    
    // Esperar elección
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    sessionStorage.setItem("pwa_install_prompt_dismissed", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 p-4 shadow-2xl flex items-start gap-3.5 text-stone-100">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Icon */}
        <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
          <Smartphone className="h-5 w-5" />
        </div>

        {/* Text Details */}
        <div className="flex-1 space-y-2">
          <div>
            <h5 className="text-xs font-black uppercase text-white tracking-wider">⚡ ¡Instalá esta App!</h5>
            <p className="text-[11px] text-stone-400 leading-normal mt-1">
              {isIos 
                ? "Agregala a tu pantalla de inicio: tocá el botón de Compartir y elegí 'Agregar a Inicio'." 
                : "Agregala a tu pantalla de inicio en un segundo para acceder sin conexión y en pantalla completa."}
            </p>
          </div>

          {/* Action according to OS */}
          {isIos ? (
            <div className="flex items-center gap-2 bg-stone-950/80 border border-stone-850 px-3 py-2 rounded-xl w-fit text-[10px] text-amber-400 font-bold">
              <Share className="h-3.5 w-3.5" />
              <span>Compartir</span>
              <span className="text-stone-500">➔</span>
              <PlusSquare className="h-3.5 w-3.5" />
              <span>Agregar a Inicio</span>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-lg text-[10px] uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-amber-500/15"
            >
              <Download className="h-3 w-3 stroke-[3]" /> Instalar App
            </button>
          )}
        </div>

        {/* Dismiss Button */}
        <button 
          onClick={handleDismiss}
          className="p-1 text-stone-500 hover:text-white hover:bg-stone-800 rounded-lg transition-all shrink-0"
        >
          <X className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}
