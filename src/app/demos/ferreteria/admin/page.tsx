"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Plus, ArrowRight, AlertTriangle, X, Check, 
  Package, ShoppingBag, Truck, DollarSign, 
  Sparkles, CheckCircle2, AlertCircle, ShoppingCart 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Pedido, ProductoStock, MOCK_PEDIDOS, MOCK_INVENTARIO } from "@/data/mock-ferreteria-admin";

export default function FerreteriaDashboard() {
  // --- Estados Principales ---
  const [orders, setOrders] = useState<Pedido[]>(MOCK_PEDIDOS);
  const [inventory, setInventory] = useState<ProductoStock[]>(MOCK_INVENTARIO);

  // Modales
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Selecciones
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductoStock | null>(null);

  // Campos de Nuevo Presupuesto / Pedido
  const [newClient, setNewClient] = useState("");
  const [newOrigin, setNewOrigin] = useState<Pedido["origen"]>("Mostrador");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Campo de Reabastecimiento de Stock
  const [restockAmount, setRestockAmount] = useState(10);

  // Notificaciones flotantes (Toasts)
  const [toasts, setToasts] = useState<{ id: string; text: string; type: "success" | "error" | "info" }[]>([]);

  // --- Funciones de Notificación ---
  const addToast = (text: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- Cálculos de Métricas en Tiempo Real ---
  const parseCurrency = (str: string) => {
    return parseInt(str.replace(/\$/g, "").replace(/\./g, "").trim(), 10);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(val);
  };

  // 1. Pedidos Pendientes: Cuenta pedidos que no estén "Despachado"
  const pendingOrdersCount = orders.filter(o => o.estado !== "Despachado").length;

  // 2. Alertas de Stock: Productos con stock <= stockMinimo
  const stockAlertsCount = inventory.filter(p => p.stockActual <= p.stockMinimo).length;

  // 3. Ventas Hoy: Suma de montos de todos los pedidos
  const salesTodayVal = orders.reduce((sum, o) => {
    return sum + parseCurrency(o.monto);
  }, 0);

  // --- Badges Helpers ---
  const getPedidoBadge = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "Pendiente": return <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/15 animate-pulse">Pendiente</span>;
      case "Preparando": return <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Preparando</span>;
      case "Despachado": return <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Despachado</span>;
    }
  };

  const getStockBadge = (estado: ProductoStock["estado"]) => {
    switch (estado) {
      case "Normal": return <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Normal</span>;
      case "Crítico": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20"><AlertTriangle className="h-3 w-3"/> Crítico</span>;
      case "Sin Stock": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-black bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10"><AlertTriangle className="h-3 w-3"/> Agotado</span>;
    }
  };

  // --- Detalle Simulado de Items de Pedido ---
  const getOrderItems = (orderId: string) => {
    switch (orderId) {
      case "P-1001": return [
        { name: "Cemento Loma Negra 50kg", qty: 50, price: "$ 8.500", total: "$ 425.000" },
        { name: "Cable Unipolar 2.5mm Rojo (100m)", qty: 1, price: "$ 25.000", total: "$ 25.000" }
      ];
      case "P-1002": return [
        { name: "Pegamento Klaukol Impermeable 30kg", qty: 1, price: "$ 14.000", total: "$ 14.000" },
        { name: "Hierro Aletado 8mm x 12m", qty: 2, price: "$ 700", total: "$ 1.400" }
      ];
      case "P-1003": return [
        { name: "Taladro Percutor DeWalt", qty: 1, price: "$ 89.000", total: "$ 89.000" }
      ];
      default: return [
        { name: "Artículo de Ferretería General", qty: 1, price: "$ 10.000", total: "$ 10.000" }
      ];
    }
  };

  // --- Acciones de Pedidos ---
  const openOrderDetails = (order: Pedido) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleUpdateOrderStatus = (status: Pedido["estado"]) => {
    if (!selectedOrder) return;
    setOrders(orders.map(o => 
      o.id === selectedOrder.id ? { ...o, estado: status } : o
    ));
    addToast(`Pedido ${selectedOrder.id} marcado como "${status}".`, "success");
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  // --- Acciones de Presupuestos (Crear Venta) ---
  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim()) {
      addToast("Por favor, ingresá el nombre del cliente.", "error");
      return;
    }

    const prod = inventory[selectedProductIndex];
    const itemPrice = parseCurrency(prod.precio);
    const orderTotalVal = itemPrice * quantity;

    const newOrder: Pedido = {
      id: "P-" + (1000 + orders.length + 1).toString(),
      cliente: newClient,
      monto: formatCurrency(orderTotalVal),
      estado: "Pendiente",
      origen: newOrigin
    };

    // Agregar pedido y descontar stock del producto de forma simulada
    setOrders([newOrder, ...orders]);
    setInventory(inventory.map((item, idx) => 
      idx === selectedProductIndex 
        ? { 
            ...item, 
            stockActual: Math.max(0, item.stockActual - quantity),
            estado: (item.stockActual - quantity) <= 0 ? "Sin Stock" : (item.stockActual - quantity) <= item.stockMinimo ? "Crítico" : "Normal"
          }
        : item
    ));

    addToast(`Presupuesto de ${newClient} por ${formatCurrency(orderTotalVal)} confirmado.`, "success");
    
    // Reset
    setNewClient("");
    setNewOrigin("Mostrador");
    setSelectedProductIndex(0);
    setQuantity(1);
    setIsBudgetModalOpen(false);
  };

  // --- Acciones de Reabastecimiento de Stock (Comprar) ---
  const openStockModal = (product: ProductoStock) => {
    setSelectedProduct(product);
    setRestockAmount(Math.max(10, product.stockMinimo * 2));
    setIsStockModalOpen(true);
  };

  const handleRestock = () => {
    if (!selectedProduct) return;
    const newStock = selectedProduct.stockActual + restockAmount;
    
    setInventory(inventory.map(p => 
      p.id === selectedProduct.id 
        ? { 
            ...p, 
            stockActual: newStock,
            estado: newStock <= 0 ? "Sin Stock" : newStock <= p.stockMinimo ? "Crítico" : "Normal"
          }
        : p
    ));

    addToast(`Stock de ${selectedProduct.nombre} aumentado en +${restockAmount} unidades.`, "success");
    setIsStockModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white border text-sm font-semibold ${
                t.type === "success" ? "bg-orange-600 border-orange-500" :
                t.type === "error" ? "bg-red-600 border-red-500" :
                "bg-slate-800 border-slate-700"
              }`}
            >
              {t.type === "success" && <CheckCircle2 className="h-5 w-5 shrink-0" />}
              {t.type === "error" && <AlertCircle className="h-5 w-5 shrink-0" />}
              <span>{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <PageHeader 
        title="Panel de Control" 
        description="Resumen operativo de compras, pedidos del mostrador y alertas de stock de FerreMax."
        action={
          <button 
            onClick={() => setIsBudgetModalOpen(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-orange-700 transition-all hover:shadow-md active:scale-95 text-sm"
          >
            <Plus className="h-4.5 w-4.5" />
            Nuevo Presupuesto
          </button>
        }
      />

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ventas de Hoy</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-white">{formatCurrency(salesTodayVal)}</p>
            <span className="text-xs font-bold text-slate-400">caja activa</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500 transition-all hover:shadow-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pedidos Pendientes</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-slate-900">{pendingOrdersCount}</p>
            <span className="text-xs font-bold text-slate-500">en preparación</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-yellow-500 transition-all hover:shadow-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alertas de Stock</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-slate-900">{stockAlertsCount}</p>
            <span className="text-xs font-bold text-slate-500">por reponer</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: Pedidos */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Últimos Pedidos</h2>
          
          <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-2 py-3 font-bold text-[10px] uppercase tracking-wider">Pedido</th>
                    <th className="px-2 py-3 font-bold text-[10px] uppercase tracking-wider">Cliente</th>
                    <th className="px-2 py-3 font-bold text-[10px] uppercase tracking-wider">Monto</th>
                    <th className="px-2 py-3 font-bold text-[10px] uppercase tracking-wider">Origen</th>
                    <th className="px-2 py-3 font-bold text-[10px] uppercase tracking-wider text-center">Estado</th>
                    <th className="px-2 py-3 font-bold text-[10px] uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-2 py-3.5 align-middle font-mono font-bold text-slate-500 text-[10px] sm:text-xs">{o.id}</td>
                      <td className="px-2 py-3.5 align-middle">
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{o.cliente}</span>
                      </td>
                      <td className="px-2 py-3.5 align-middle font-extrabold text-slate-900 text-xs sm:text-sm">{o.monto}</td>
                      <td className="px-2 py-3.5 align-middle font-bold text-slate-400 text-[10px] sm:text-xs">{o.origen}</td>
                      <td className="px-2 py-3.5 align-middle text-center">{getPedidoBadge(o.estado)}</td>
                      <td className="px-2 py-3.5 align-middle text-right">
                        <button 
                          onClick={() => openOrderDetails(o)}
                          className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-2 py-1 rounded-lg text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 shrink-0"
                        >
                          Procesar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Alertas de Stock */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Alertas de Reposición</h2>
          
          <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Stock / Mín</th>
                    <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Estado</th>
                    <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 align-middle font-mono text-slate-500 text-xs">{item.sku}</td>
                      <td className="px-4 py-4 align-middle">
                        <span className="font-extrabold text-slate-800">{item.nombre}</span>
                      </td>
                      <td className="px-4 py-4 align-middle text-center font-mono">
                        <span className={item.stockActual <= item.stockMinimo ? "font-bold text-red-600" : "font-medium text-slate-700"}>
                          {item.stockActual}
                        </span>
                        <span className="text-slate-400"> / {item.stockMinimo}</span>
                      </td>
                      <td className="px-4 py-4 align-middle text-center">{getStockBadge(item.estado)}</td>
                      <td className="px-4 py-4 align-middle text-right">
                        {item.stockActual <= item.stockMinimo ? (
                          <button 
                            onClick={() => openStockModal(item)}
                            className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1"
                          >
                            <Package className="h-3.5 w-3.5" />
                            Comprar
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-bold pr-2">Abastecido</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MODALES INTERACTIVOS ================= */}

      {/* 1. Modal: Detalle y Procesamiento de Pedido */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-left"
          >
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-orange-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Detalle del Pedido {selectedOrder.id}</h3>
              </div>
              <button onClick={() => setIsOrderModalOpen(false)} className="hover:bg-slate-800 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cliente</p>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">{selectedOrder.cliente}</h4>
                </div>
                {getPedidoBadge(selectedOrder.estado)}
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Materiales Solicitados</span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                  {getOrderItems(selectedOrder.id).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs font-bold text-slate-700">
                      <div>
                        <span className="text-orange-600 font-extrabold mr-1.5">{item.qty}x</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-mono text-slate-900 shrink-0">{item.total}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-200/50 pt-2 mt-2 flex justify-between items-center text-sm font-black text-slate-900">
                    <span>Monto Total Cobrado</span>
                    <span className="text-orange-600 font-mono">{selectedOrder.monto}</span>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Procesar Estado del Pedido</span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedOrder.estado !== "Preparando" && selectedOrder.estado !== "Despachado" && (
                    <button 
                      onClick={() => handleUpdateOrderStatus("Preparando")}
                      className="bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 text-center block"
                    >
                      🛠️ Preparar Pedido
                    </button>
                  )}
                  {selectedOrder.estado !== "Despachado" && (
                    <button 
                      onClick={() => handleUpdateOrderStatus("Despachado")}
                      className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 text-center block col-span-2 sm:col-span-1"
                    >
                      🚚 Despachar / Entregar
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setOrders(orders.filter(o => o.id !== selectedOrder.id));
                      addToast(`Pedido ${selectedOrder.id} cancelado y borrado.`, "error");
                      setIsOrderModalOpen(false);
                      setSelectedOrder(null);
                    }}
                    className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 text-center block"
                  >
                    🗑️ Cancelar Venta
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. Modal: Nuevo Presupuesto */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-left"
          >
            <div className="bg-orange-600 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-base uppercase tracking-wider">Generar Nuevo Presupuesto</h3>
              <button onClick={() => setIsBudgetModalOpen(false)} className="hover:bg-orange-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateBudget} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cliente / Constructora</label>
                <input 
                  type="text" 
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Ej: Constructora Chaco" 
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-semibold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Canal de Venta</label>
                  <select 
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value as Pedido["origen"])}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                  >
                    <option value="Mostrador">Mostrador (Local)</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cantidad</label>
                  <input 
                    type="number" 
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Material / Producto</label>
                <select 
                  value={selectedProductIndex}
                  onChange={(e) => setSelectedProductIndex(parseInt(e.target.value, 10))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                >
                  {inventory.map((item, idx) => (
                    <option key={item.id} value={idx}>
                      {item.nombre} ({item.precio}) — Stock: {item.stockActual} u.
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500">Monto Total del Presupuesto</span>
                <span className="text-base font-black text-slate-900 font-mono text-right">
                  {formatCurrency(parseCurrency(inventory[selectedProductIndex].precio) * quantity)}
                </span>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsBudgetModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Confirmar Venta
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 3. Modal: Reabastecimiento de Stock (Comprar) */}
      {isStockModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-left"
          >
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-orange-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Ingreso de Mercadería</h3>
              </div>
              <button onClick={() => setIsStockModalOpen(false)} className="hover:bg-slate-800 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Producto</p>
                <h4 className="text-base font-black text-slate-900 mt-0.5">{selectedProduct.nombre}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">SKU: {selectedProduct.sku} · Stock Mínimo: {selectedProduct.stockMinimo} u.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Stock Actual</p>
                  <p className="text-lg font-black text-red-600 mt-1">{selectedProduct.stockActual} unidades</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cantidad a Comprar</label>
                  <input 
                    type="number" 
                    min={1}
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(Math.max(1, parseInt(e.target.value, 10)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 flex items-start gap-2.5 text-xs text-orange-800 font-semibold leading-relaxed">
                <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
                <p>Al confirmar, se simula una orden de compra automática al proveedor. El stock ingresará al inventario y se desactivarán las alertas correspondientes.</p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  onClick={() => setIsStockModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button 
                  onClick={handleRestock}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Registrar Ingreso
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
