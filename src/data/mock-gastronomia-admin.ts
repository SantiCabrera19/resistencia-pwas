export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string; // Formateado como "$X.XXX"
  categoria: "Minutas" | "Parrilla" | "Regional" | "Bebidas";
  disponible: boolean;
  menuDelDia: boolean;
  imagen: string; // ruta local o placeholder estilizado
}

export interface PedidoGastro {
  id: string;
  cliente: string;
  items: {
    platoId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: string;
  }[];
  montoTotal: string;
  estado: "Pendiente" | "En Cocina" | "En Camino" | "Entregado" | "Cancelado";
  tipo: "Mostrador" | "Delivery";
  direccion?: string;
  telefono: string;
  fecha: string;
}

export const MOCK_MENU: Plato[] = [
  {
    id: "g1",
    nombre: "Sándwich de Milanesa Completo",
    descripcion: "Milanesa de carne gigante, lechuga, tomate, jamón, queso y huevo frito en pan de campo casero.",
    precio: "$7.500",
    categoria: "Minutas",
    disponible: true,
    menuDelDia: false,
    imagen: "🍔"
  },
  {
    id: "g2",
    nombre: "Empanada de Charque (Docena)",
    descripcion: "Auténticas empanadas norteñas de carne deshidratada al sol, cortada a cuchillo y sazonada.",
    precio: "$15.000",
    categoria: "Regional",
    disponible: true,
    menuDelDia: false,
    imagen: "🥟"
  },
  {
    id: "g3",
    nombre: "Mbaipy Chaqueño Calentito",
    descripcion: "Harina de maíz cremosa cocida en caldo de verduras con chorizo colorado, carne vacuna y queso criollo.",
    precio: "$5.500",
    categoria: "Regional",
    disponible: true,
    menuDelDia: true, // Menú del día!
    imagen: "🥣"
  },
  {
    id: "g4",
    nombre: "Milanesa Napolitana con Fritas",
    descripcion: "Para compartir. Milanesa con salsa de tomate casera, jamón, queso muzzarella y papas fritas crujientes.",
    precio: "$8.500",
    categoria: "Minutas",
    disponible: true,
    menuDelDia: false,
    imagen: "🥩"
  },
  {
    id: "g5",
    nombre: "Asado de Tira con Ensalada Rusa",
    descripcion: "Tres costillas anchas de asado de ternera hechas a la leña, acompañadas con ensalada rusa clásica.",
    precio: "$12.000",
    categoria: "Parrilla",
    disponible: true,
    menuDelDia: false,
    imagen: "🍖"
  },
  {
    id: "g6",
    nombre: "Tortas Fritas Calentitas (Docena)",
    descripcion: "Ideal para el mate. Tortas fritas caseras bien infladas, crocantes y espolvoreadas con azúcar.",
    precio: "$3.000",
    categoria: "Minutas",
    disponible: true,
    menuDelDia: false,
    imagen: "🥖"
  },
  {
    id: "g7",
    nombre: "Gaseosa Línea Pepsi 1.5L",
    descripcion: "Bien helada para acompañar la comida.",
    precio: "$3.000",
    categoria: "Bebidas",
    disponible: true,
    menuDelDia: false,
    imagen: "🥤"
  },
  {
    id: "g8",
    nombre: "Cerveza Chaqueña Artesanal 1L",
    descripcion: "Cerveza rubia tirada local, refrescante y bien fría.",
    precio: "$4.500",
    categoria: "Bebidas",
    disponible: true,
    menuDelDia: false,
    imagen: "🍺"
  }
];

export const MOCK_PEDIDOS_GASTRO: PedidoGastro[] = [
  {
    id: "G-2001",
    cliente: "Juan Pérez",
    items: [
      { platoId: "g1", nombre: "Sándwich de Milanesa Completo", cantidad: 1, precioUnitario: "$7.500" },
      { platoId: "g7", nombre: "Gaseosa Línea Pepsi 1.5L", cantidad: 1, precioUnitario: "$3.000" }
    ],
    montoTotal: "$10.500",
    estado: "En Camino",
    tipo: "Delivery",
    direccion: "Av. Alberdi 420",
    telefono: "3624123456",
    fecha: "20:30 hs"
  },
  {
    id: "G-2002",
    cliente: "María Luz Corvalán",
    items: [
      { platoId: "g6", nombre: "Tortas Fritas Calentitas (Docena)", cantidad: 1, precioUnitario: "$3.000" }
    ],
    montoTotal: "$3.000",
    estado: "Pendiente",
    tipo: "Mostrador",
    telefono: "3624889900",
    fecha: "20:45 hs"
  },
  {
    id: "G-2003",
    cliente: "Carlos Giménez",
    items: [
      { platoId: "g3", nombre: "Mbaipy Chaqueño Calentito", cantidad: 2, precioUnitario: "$5.500" },
      { platoId: "g8", nombre: "Cerveza Chaqueña Artesanal 1L", cantidad: 1, precioUnitario: "$4.500" }
    ],
    montoTotal: "$15.500",
    estado: "Entregado",
    tipo: "Mostrador",
    telefono: "3624991122",
    fecha: "19:15 hs"
  }
];
