"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PWALaunchDirector() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si se está ejecutando en modo standalone (PWA instalada)
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      const lastVisited = localStorage.getItem("last_visited_demo");
      // Si hay una última ruta registrada de administración, redirigir allí al instante
      if (lastVisited && lastVisited.startsWith("/")) {
        router.replace(lastVisited);
      }
    }
  }, [router]);

  return null;
}
