export type ProductoStock = {
  id: string;
  sku: string;
  nombre: string;
  categoria: string;
  precio: string;
  stockActual: number;
  stockMinimo: number;
  estado: "Normal" | "Crítico" | "Sin Stock";
};

export type Pedido = {
  id: string;
  cliente: string;
  monto: string;
  estado: "Pendiente" | "Preparando" | "Despachado";
  origen: "WhatsApp" | "Mostrador";
};

export const MOCK_INVENTARIO: ProductoStock[] = [
  { id: "1", sku: "TAL-750W", nombre: "Taladro Percutor DeWalt", categoria: "Herramientas Eléctricas", precio: "$ 185.000", stockActual: 15, stockMinimo: 5, estado: "Normal" },
  { id: "2", sku: "PNT-L20-A", nombre: "Pintura Látex Alba 20L", categoria: "Pinturería", precio: "$ 45.000", stockActual: 2, stockMinimo: 10, estado: "Crítico" },
  { id: "3", sku: "CEM-50K-L", nombre: "Cemento Loma Negra 50kg", categoria: "Materiales Pesados", precio: "$ 8.500", stockActual: 0, stockMinimo: 20, estado: "Sin Stock" },
  { id: "4", sku: "LLV-12-S", nombre: "Set Llaves Stanley", categoria: "Herramientas Manuales", precio: "$ 32.000", stockActual: 42, stockMinimo: 10, estado: "Normal" },
  { id: "5", sku: "AMOL-115", nombre: "Amoladora Angular Bosch 115mm", categoria: "Herramientas Eléctricas", precio: "$ 120.000", stockActual: 8, stockMinimo: 5, estado: "Normal" },
  { id: "6", sku: "CAB-2.5-R", nombre: "Cable Unipolar 2.5mm Rojo (100m)", categoria: "Electricidad", precio: "$ 24.000", stockActual: 3, stockMinimo: 15, estado: "Crítico" },
  { id: "7", sku: "HIE-8-12", nombre: "Hierro Aletado 8mm x 12m", categoria: "Materiales Pesados", precio: "$ 11.200", stockActual: 150, stockMinimo: 50, estado: "Normal" },
  { id: "8", sku: "PEG-KL-30", nombre: "Pegamento Klaukol Impermeable 30kg", categoria: "Materiales Pesados", precio: "$ 14.000", stockActual: 1, stockMinimo: 20, estado: "Crítico" },
];

export const MOCK_PEDIDOS: Pedido[] = [
  { id: "P-1001", cliente: "Constructora NEA", monto: "$ 450.000", estado: "Pendiente", origen: "WhatsApp" },
  { id: "P-1002", cliente: "Juan Pérez", monto: "$ 15.400", estado: "Preparando", origen: "Mostrador" },
  { id: "P-1003", cliente: "Arquitectura Studio", monto: "$ 89.000", estado: "Despachado", origen: "WhatsApp" },
];

export const MOCK_METRICS_FERRETERIA = {
  pedidosPendientes: 12,
  alertasStock: 5,
  ventasHoy: "$ 1.250.000",
};
