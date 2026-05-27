import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "resis-pwa-crm",
    short_name: "resis-crm",
    description:
      "PWAs + Mini-CRMs para negocios locales de Resistencia, Chaco.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
