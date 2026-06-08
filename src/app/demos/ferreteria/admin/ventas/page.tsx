"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  ShoppingCart, Search, Plus, Minus, X, CreditCard, Banknote, Tag, ScanLine
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { normalizeString } from "@/lib/utils";

// Datos de prueba para el POS
const MOCK_PRODUCTS = [
  { id: "1", sku: "TAL-750W", nombre: "Taladro Percutor 750W", precio: 45000, stock: 12 },
  { id: "2", sku: "DIS-115", nombre: "Disco Corte 115mm", precio: 2500, stock: 150 },
  { id: "3", sku: "TOR-MAD-45", nombre: "Tornillo Madera 4x50 (x100)", precio: 1200, stock: 45 },
  { id: "4", sku: "CINT-AIS", nombre: "Cinta Aisladora 3M", precio: 1800, stock: 80 },
  { id: "5", sku: "PINT-INT-20", nombre: "Látex Interior 20L Blanco", precio: 38000, stock: 8 },
  { id: "6", sku: "CEM-LOM", nombre: "Cemento Loma Negra 50kg", precio: 8500, stock: 200 },
];

interface CartItem {
  id: string;
  producto: typeof MOCK_PRODUCTS[0];
  cantidad: number;
}

export default function VentasMostradorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ticketState, setTicketState] = useState<"abierto" | "cobrando" | "pagado">("abierto");

  // Filtrado de productos en catálogo rápido
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    normalizeString(p.nombre).includes(normalizeString(searchTerm)) || 
    normalizeString(p.sku).includes(normalizeString(searchTerm))
  );

  // Funciones del carrito
  const addToCart = (product: typeof MOCK_PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.producto.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.producto.id === product.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      return [...prev, { id: Date.now().toString(), producto: product, cantidad: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.cantidad + delta;
        return newQ > 0 ? { ...item, cantidad: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Cálculos
  const subtotal = cart.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  const iva = subtotal * 0.21; // 21% IVA
  const total = subtotal + iva;

  // Simulación de cobro
  const handleCobrar = () => {
    if (cart.length === 0) return;
    setTicketState("pagado");
    setTimeout(() => {
      setCart([]);
      setTicketState("abierto");
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader 
        title="Ventas / Mostrador (POS)" 
        description="Facturación rápida, escáner de códigos de barra y arqueo en vivo."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
        
        {/* Columna Izquierda: Buscador y Catálogo */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Buscador / Escáner */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
              <ScanLine className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                autoFocus
                placeholder="Escanear código o buscar producto (F2)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>

          {/* Catálogo Rápido de Productos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-y-auto">
            <h3 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-wider">Catálogo Rápido</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredProducts.map(p => (
                <div 
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 p-3 rounded-xl cursor-pointer transition-all active:scale-95 flex flex-col justify-between min-h-[100px]"
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-400 block mb-1">{p.sku}</span>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{p.nombre}</h4>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] font-semibold text-slate-500">Stock: {p.stock}</span>
                    <span className="text-sm font-black text-slate-900">${p.precio.toLocaleString("es-AR")}</span>
                  </div>
                </div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-400 font-bold text-sm">
                  No se encontraron productos.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha: El Ticket / Carrito */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 rounded-2xl shadow-xl overflow-hidden relative">
          
          {/* Header Ticket */}
          <div className="p-5 bg-slate-950 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              <h2 className="font-extrabold uppercase tracking-wide text-sm">Ticket Actual</h2>
            </div>
            <span className="text-xs font-bold bg-slate-800 text-slate-300 px-2 py-1 rounded-md">
              Caja 01 - Santiago
            </span>
          </div>

          {/* Lista de Items */}
          <div className="flex-1 overflow-y-auto p-2">
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3"
                >
                  <Tag className="h-10 w-10 opacity-20" />
                  <p className="font-bold text-sm">El ticket está vacío</p>
                </motion.div>
              ) : (
                cart.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-slate-800 p-3 rounded-xl mb-2 flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white truncate max-w-[180px]">{item.producto.nombre}</h4>
                      <p className="text-xs font-semibold text-slate-400">${item.producto.precio.toLocaleString("es-AR")} c/u</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Controles Cantidad */}
                      <div className="flex items-center bg-slate-950 rounded-lg border border-slate-700">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-slate-400 hover:text-white">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-white">{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-slate-400 hover:text-white">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      
                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-black text-orange-400">
                          ${(item.producto.precio * item.cantidad).toLocaleString("es-AR")}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Totales y Cobro */}
          <div className="bg-slate-950 p-5 space-y-4">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <div className="flex justify-between text-slate-400 text-xs font-bold">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-xs font-bold">
                <span>IVA (21%)</span>
                <span>${iva.toLocaleString("es-AR")}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <span className="text-sm font-black text-slate-300 uppercase tracking-wider">Total a Cobrar</span>
              <span className="text-3xl font-black text-white tracking-tight">${total.toLocaleString("es-AR")}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={handleCobrar}
                disabled={cart.length === 0 || ticketState === "pagado"}
                className="flex flex-col items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95"
              >
                <Banknote className="h-6 w-6 text-emerald-400" />
                <span className="text-xs uppercase tracking-wide">Efectivo</span>
              </button>
              <button 
                onClick={handleCobrar}
                disabled={cart.length === 0 || ticketState === "pagado"}
                className="flex flex-col items-center justify-center gap-1 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95"
              >
                <CreditCard className="h-6 w-6 text-white" />
                <span className="text-xs uppercase tracking-wide">Tarjeta / QR</span>
              </button>
            </div>
          </div>

          {/* Overlay Pagado Exitoso */}
          <AnimatePresence>
            {ticketState === "pagado" && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-emerald-600/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white"
              >
                <motion.div 
                  initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                  className="h-20 w-20 bg-white rounded-full flex items-center justify-center mb-4"
                >
                  <ShoppingCart className="h-10 w-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Cobro Exitoso</h3>
                <p className="text-sm font-bold opacity-80 mt-1">Imprimiendo ticket fiscal...</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
