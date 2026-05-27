import { Wrench, Package, Truck, Zap, Droplet, PaintRoller } from "lucide-react";

export const FERRETERIA_DATA = {
  hero: {
    title: "Construimos junto a vos",
    description: "Materiales pesados, herramientas profesionales y el stock más grande de Resistencia para tu obra.",
    primaryCTA: "Ver Catálogo",
    secondaryCTA: "Cotizar por WhatsApp",
  },
  categorias: [
    { name: "Herramientas Eléctricas", icon: Zap },
    { name: "Manuales", icon: Wrench },
    { name: "Plomería", icon: Droplet },
    { name: "Pinturería", icon: PaintRoller },
    { name: "Materiales", icon: Package },
    { name: "Logística", icon: Truck },
  ],
  destacados: [
    { 
      title: "Taladro Percutor 750W", 
      brand: "DeWalt Profesional", 
      price: "Consultar Precio", 
      tag: "Oferta",
      image: "/images/taladro.png" 
    },
    { 
      title: "Pintura Látex Interior 20L", 
      brand: "Alba Premium", 
      price: "Consultar Precio", 
      tag: "Más vendido",
      image: "/images/pintura.png"
    },
    { 
      title: "Set Llaves Combinadas x12", 
      brand: "Stanley", 
      price: "Consultar Precio",
      image: "/images/llaves.png"
    },
    { 
      title: "Cemento Portland 50kg", 
      brand: "Loma Negra", 
      price: "Consultar Precio", 
      tag: "Venta por pallet",
      image: "/images/cemento.png"
    },
  ],
  contacto: {
    direccion: "Av. Alvear 800, Resistencia, Chaco",
    horarios: "Lunes a Sábados de 07:30 a 17:00 hs",
    whatsapp: "+54 9 362 411 2233",
  }
};
