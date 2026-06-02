"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Plus, Check, X, Clock, AlertTriangle, Search, Trash2, Loader2,
  TrendingUp, ShoppingBag, DollarSign, ChefHat, Sparkles, Flame,
  Edit2, Power, ArrowLeft, RefreshCw, QrCode
} from "lucide-react";
import { Plato, PedidoGastro, MOCK_MENU, MOCK_PEDIDOS_GASTRO } from "@/data/mock-gastronomia-admin";

const PIN_KEY = "gastronomia_admin_pin_verified";
const ADMIN_PIN = "1234";

export default function GastronomiaAdminPage() {
  // --- Estados de Acceso ---
  const [isUnlocked, setIsUnlocked] = useState(false);

  // --- Estados Principales Inmortales ---
  const [orders, setOrders, isOrdersLoaded] = useLocalStorage<PedidoGastro[]>("gastronomia_orders", MOCK_PEDIDOS_GASTRO);
  const [menu, setMenu, isMenuLoaded] = useLocalStorage<Plato[]>("gastronomia_menu", MOCK_MENU);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrUrl(`${window.location.origin}/demos/gastronomia`);
    }
  }, []);

  const handleResetDemo = () => {
    if (window.confirm("¿Seguro que querés restablecer los datos de esta demo a la configuración inicial? Esto borrará tus pedidos y menú personalizados.")) {
      localStorage.removeItem("gastronomia_orders");
      localStorage.removeItem("gastronomia_menu");
      window.location.reload();
    }
  };

  // Check PIN on mount
  useEffect(() => {
    const verified = sessionStorage.getItem(PIN_KEY);
    if (verified === "true") {
      setIsUnlocked(true);
    }
  }, []);

  // Estados de control de la UI
  const [activeTab, setActiveTab] = useState<"pedidos" | "menu" | "kpis">("pedidos");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modales
  const [selectedOrder, setSelectedOrder] = useState<PedidoGastro | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingPlato, setEditingPlato] = useState<Plato | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  // Estados de Carga Simulados
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isProcessingMenu, setIsProcessingMenu] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<{ id: string; text: string; type: "success" | "error" | "info" }[]>([]);

  const addToast = (text: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts([...toasts, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // --- KPIs del Negocio ---
  const getKpis = () => {
    const totalRecaudado = orders
      .filter(o => o.estado === "Entregado")
      .reduce((sum, o) => sum + parseFloat(o.montoTotal.replace("$", "").replace(".", "")), 0);

    const pedidosActivos = orders.filter(o => o.estado !== "Entregado" && o.estado !== "Cancelado").length;
    const pedidosCompletados = orders.filter(o => o.estado === "Entregado").length;

    return {
      recaudado: "$" + totalRecaudado.toLocaleString("es-AR"),
      activos: pedidosActivos,
      completados: pedidosCompletados,
      platoEstrella: "Mbaipy Chaqueño"
    };
  };

  const kpis = getKpis();

  // --- Handlers de Pedidos ---
  const handleUpdateOrderStatus = (id: string, nextEstado: PedidoGastro["estado"]) => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setOrders(orders.map(o => 
        o.id === id ? { ...o, estado: nextEstado } : o
      ));
      addToast(`Pedido ${id} pasó a "${nextEstado}".`, "success");
      setIsOrderModalOpen(false);
      setSelectedOrder(null);
      setIsProcessingOrder(false);
    }, 1200);
  };

  const handleCancelOrder = (id: string) => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setOrders(orders.map(o => 
        o.id === id ? { ...o, estado: "Cancelado" as const } : o
      ));
      addToast(`Pedido ${id} fue cancelado.`, "error");
      setIsOrderModalOpen(false);
      setSelectedOrder(null);
      setIsProcessingOrder(false);
    }, 1000);
  };

  const handleDeleteOrder = (id: string) => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setOrders(orders.filter(o => o.id !== id));
      addToast(`Pedido ${id} eliminado del historial.`, "info");
      setIsProcessingOrder(false);
    }, 800);
  };

  // --- Handlers de Menú ---
  const handleTogglePlatoAvailable = (id: string, current: boolean) => {
    setIsProcessingMenu(true);
    setTimeout(() => {
      setMenu(menu.map(p => 
        p.id === id ? { ...p, disponible: !current } : p
      ));
      addToast(`Plato marcado como ${!current ? "Disponible" : "Sin Stock"}.`, "info");
      setIsProcessingMenu(false);
    }, 800);
  };

  const handleSetMenuDelDia = (id: string) => {
    setIsProcessingMenu(true);
    setTimeout(() => {
      setMenu(menu.map(p => ({
        ...p,
        menuDelDia: p.id === id
      })));
      const plato = menu.find(p => p.id === id);
      addToast(`"${plato?.nombre}" establecido como Plato del Día.`, "success");
      setIsProcessingMenu(false);
    }, 1000);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlato || !newPrice.trim()) return;

    setIsProcessingMenu(true);
    setTimeout(() => {
      // Validar formato de precio
      const cleanPrice = newPrice.startsWith("$") ? newPrice : "$" + newPrice;
      setMenu(menu.map(p => 
        p.id === editingPlato.id ? { ...p, precio: cleanPrice } : p
      ));
      addToast(`Precio de "${editingPlato.nombre}" actualizado a ${cleanPrice}.`, "success");
      setIsMenuModalOpen(false);
      setEditingPlato(null);
      setNewPrice("");
      setIsProcessingMenu(false);
    }, 1200);
  };

  // Filtrado de pedidos
  const filteredOrders = orders.filter(o => 
    o.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrado de menú
  const filteredMenu = menu.filter(p => 
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOrdersLoaded || !isMenuLoaded) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!isUnlocked) {
    return <PinGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-12">
      
      {/* HEADER */}
      <div className="border-b border-stone-900 bg-stone-900/60 backdrop-blur px-5 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/demos/gastronomia" className="p-2 bg-stone-950 hover:bg-stone-850 rounded-lg text-stone-400 hover:text-stone-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500 fill-amber-500/10" />
                <h1 className="text-xl font-black text-white tracking-tight uppercase">El Campeón — Control</h1>
              </div>
              <p className="text-xs text-stone-400">Rotisería & Minutas en Resistencia Chaco</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="px-3 py-2 rounded-lg text-xs font-black transition-all uppercase bg-stone-950 border border-stone-850 hover:border-amber-500/30 text-amber-500 flex items-center gap-1.5 shadow"
              title="Mostrar QR Stand de Mesa"
            >
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Mesa</span>
            </button>
            
            <button
              onClick={handleResetDemo}
              className="px-3 py-2 rounded-lg text-xs font-black transition-all uppercase bg-stone-950 border border-red-950 text-red-500 flex items-center gap-1.5 hover:bg-red-950/20"
              title="Restablecer Demo"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <div className="h-6 w-px bg-stone-800 hidden sm:block mx-1" />

            <button 
              onClick={() => setActiveTab("pedidos")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase ${
                activeTab === "pedidos" ? "bg-amber-500 text-stone-950" : "bg-stone-950 text-stone-400 hover:text-white"
              }`}
            >
              📋 Pedidos ({orders.filter(o => o.estado !== "Entregado" && o.estado !== "Cancelado").length})
            </button>
            <button 
              onClick={() => setActiveTab("menu")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase ${
                activeTab === "menu" ? "bg-amber-500 text-stone-950" : "bg-stone-950 text-stone-400 hover:text-white"
              }`}
            >
              🍳 Carta / Menú
            </button>
            <button 
              onClick={() => setActiveTab("kpis")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase ${
                activeTab === "kpis" ? "bg-amber-500 text-stone-950" : "bg-stone-950 text-stone-400 hover:text-white"
              }`}
            >
              📈 Finanzas
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8 space-y-8">
        
        {/* BUSCADOR RAPIDO */}
        <div className="flex items-center bg-stone-900 border border-stone-850 rounded-xl px-4 py-2.5 max-w-md">
          <Search className="h-4 w-4 text-stone-500 shrink-0" />
          <input 
            type="text" 
            placeholder={activeTab === "pedidos" ? "Buscar pedido por ID o cliente..." : "Buscar plato por nombre..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs text-white placeholder-stone-600 focus:outline-none focus:ring-0 ml-2"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-stone-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* TAB PEDIDOS */}
        {activeTab === "pedidos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white uppercase tracking-wider">Cola de Pedidos Activos</h2>
              <span className="text-[10px] bg-stone-900 border border-stone-850 px-2.5 py-1 text-stone-400 rounded font-bold uppercase">
                Offline Auto-Sync
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.length === 0 ? (
                <div className="border border-dashed border-stone-850 rounded-2xl py-16 text-center space-y-2">
                  <div className="text-5xl">🍗</div>
                  <h5 className="font-bold text-white text-sm">No se encontraron pedidos</h5>
                  <p className="text-xs text-stone-500">¿Probaste ingresar pedidos desde la landing del cliente?</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div 
                    key={order.id} 
                    className={`bg-stone-900/60 border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                      order.estado === "Pendiente" 
                        ? "border-amber-500/30 bg-amber-500/[0.01]" 
                        : "border-stone-850"
                    }`}
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-black text-white text-sm">{order.id}</span>
                        <span className="text-xs font-bold text-stone-400">{order.cliente}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                          order.estado === "Pendiente" 
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                            : order.estado === "En Cocina"
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            : order.estado === "En Camino"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : order.estado === "Entregado"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {order.estado}
                        </span>
                        <span className="text-[10px] text-stone-500">{order.fecha} · {order.tipo}</span>
                      </div>

                      {/* Items */}
                      <div className="bg-stone-950 border border-stone-850/80 rounded-xl p-3.5 space-y-1.5 max-w-2xl">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-stone-300 font-medium">
                              <strong className="text-amber-500">{item.cantidad}x</strong> {item.nombre}
                            </span>
                            <span className="text-stone-500">{item.precioUnitario} c/u</span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address */}
                      {order.tipo === "Delivery" && order.direccion && (
                        <p className="text-[10px] text-stone-400 flex items-center gap-1.5 bg-stone-900 border border-stone-850 w-fit px-2.5 py-1 rounded">
                          📍 {order.direccion}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0 md:self-center">
                      <span className="text-xl font-black text-white pr-4 border-r border-stone-800 md:h-8 flex items-center">{order.montoTotal}</span>
                      
                      {order.estado === "Pendiente" && (
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, "En Cocina")}
                          disabled={isProcessingOrder}
                          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5"
                        >
                          🍳 Cocinar
                        </button>
                      )}
                      {order.estado === "En Cocina" && (
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, "En Camino")}
                          disabled={isProcessingOrder}
                          className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-stone-950 font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5"
                        >
                          🛵 Despachar
                        </button>
                      )}
                      {order.estado === "En Camino" && (
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, "Entregado")}
                          disabled={isProcessingOrder}
                          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5"
                        >
                          ✓ Entregar
                        </button>
                      )}
                      
                      {order.estado !== "Entregado" && order.estado !== "Cancelado" && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={isProcessingOrder}
                          className="p-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg transition-colors"
                          title="Cancelar Pedido"
                        >
                          <X className="h-4.5 w-4.5" />
                        </button>
                      )}

                      {(order.estado === "Entregado" || order.estado === "Cancelado") && (
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          disabled={isProcessingOrder}
                          className="p-2.5 bg-stone-950 hover:bg-stone-850 text-stone-500 hover:text-white rounded-lg transition-colors border border-stone-850"
                          title="Eliminar de historial"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB MENU */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-900">
              <h2 className="text-lg font-black text-white uppercase tracking-wider">Gestión del Menú & Carta</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMenu.map(plato => (
                <div key={plato.id} className="bg-stone-900/60 border border-stone-850 rounded-2xl p-5 flex gap-4 justify-between items-start">
                  <div className="flex gap-4">
                    <div className="text-4xl p-4 bg-stone-950 border border-stone-850 rounded-xl flex items-center justify-center shrink-0 h-16 w-16">
                      {plato.imagen}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h4 className="font-black text-white text-base leading-tight flex items-center gap-2">
                          {plato.nombre}
                          {plato.menuDelDia && (
                            <span className="bg-amber-500 text-stone-950 text-[8px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Sparkles className="h-2 w-2 fill-current" /> DÍA
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-stone-500 leading-normal mt-1">{plato.descripcion}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-white">{plato.precio}</span>
                        <button 
                          onClick={() => {
                            setEditingPlato(plato);
                            setNewPrice(plato.precio.replace("$", "").replace(".", ""));
                            setIsMenuModalOpen(true);
                          }}
                          disabled={isProcessingMenu}
                          className="p-1.5 text-stone-400 hover:text-white bg-stone-950 hover:bg-stone-850 rounded border border-stone-850/80 transition-colors"
                          title="Cambiar Precio"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleTogglePlatoAvailable(plato.id, plato.disponible)}
                      disabled={isProcessingMenu}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                        plato.disponible 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20" 
                          : "bg-stone-950 border-stone-850 text-stone-500 hover:text-white"
                      }`}
                    >
                      {plato.disponible ? "Disponible" : "Pausado"}
                    </button>

                    {!plato.menuDelDia && plato.disponible && (
                      <button
                        onClick={() => handleSetMenuDelDia(plato.id)}
                        disabled={isProcessingMenu}
                        className="px-3 py-1.5 bg-stone-950 border border-stone-850 hover:border-amber-500/30 text-stone-400 hover:text-amber-500 text-[10px] font-bold uppercase rounded-lg transition-colors"
                      >
                        🍳 Plato del Día
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB KPIS (FINANZAS) */}
        {activeTab === "kpis" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Reporte Financiero Diario</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Facturacion */}
              <div className="bg-stone-900 border border-stone-850 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-black uppercase">Recaudación (Caja)</span>
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">{kpis.recaudado}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">✓ Facturación al día</p>
                </div>
              </div>

              {/* Pedidos Entregados */}
              <div className="bg-stone-900 border border-stone-850 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-black uppercase">Ventas Entregadas</span>
                  <Check className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">{kpis.completados}</h3>
                  <p className="text-[10px] text-stone-400 font-bold mt-1">Pedidos entregados hoy</p>
                </div>
              </div>

              {/* Pedidos Activos */}
              <div className="bg-stone-900 border border-stone-850 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-black uppercase">Pedidos en Cola</span>
                  <Clock className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">{kpis.activos}</h3>
                  <p className="text-[10px] text-indigo-400 font-bold mt-1">Activos en cocina / delivery</p>
                </div>
              </div>

              {/* Plato Estrella */}
              <div className="bg-stone-900 border border-stone-850 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-black uppercase">Plato Estrella</span>
                  <ChefHat className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight leading-tight">{kpis.platoEstrella}</h3>
                  <p className="text-[10px] text-stone-400 font-bold mt-1">El plato chaqueño más vendido</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* TOASTS CONTROLLER */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`px-4 py-3 rounded-lg text-xs font-bold text-stone-950 flex items-center justify-between gap-3 shadow-xl border animate-in slide-in-from-bottom-2 ${
              t.type === "success" 
                ? "bg-amber-500 border-amber-600" 
                : t.type === "error"
                ? "bg-red-500 border-red-600 text-white"
                : "bg-stone-900 border-stone-850 text-white"
            }`}
          >
            <span>{t.text}</span>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>
              <X className="h-3.5 w-3.5 text-stone-900" />
            </button>
          </div>
        ))}
      </div>

      {/* MODAL EDITAR PRECIO DE PLATOS */}
      {isMenuModalOpen && editingPlato && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={() => { setIsMenuModalOpen(false); setEditingPlato(null); }} />

          <div className="relative bg-stone-900 border border-stone-850 w-full max-w-md rounded-2xl p-6 space-y-6 z-10 shadow-2xl animate-in scale-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-850 pb-4">
              <h3 className="font-black text-white text-base uppercase">Cambiar Precio</h3>
              <button onClick={() => { setIsMenuModalOpen(false); setEditingPlato(null); }} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4">
              <div>
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-wider block mb-1">Producto</span>
                <p className="font-bold text-white text-sm">{editingPlato.nombre}</p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1">Nuevo Precio ($)</label>
                <input 
                  type="text" 
                  required
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  placeholder="Ej. 7500"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white placeholder-stone-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button 
                  type="button" 
                  onClick={() => { setIsMenuModalOpen(false); setEditingPlato(null); }}
                  className="px-4 py-2 border border-stone-800 text-stone-400 hover:text-white text-xs font-bold uppercase rounded-lg"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessingMenu}
                  className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 text-xs font-bold uppercase rounded-lg shadow-md transition-colors"
                >
                  {isProcessingMenu ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL QR DE MESA */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md" onClick={() => setIsQrModalOpen(false)} />

          <div className="relative w-full max-w-sm rounded-3xl p-6 z-10 animate-in fade-in zoom-in duration-300 flex flex-col items-center">
            {/* Acrylic/Wooden Stand Wrapper */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-[280px] flex flex-col items-center text-center">
              
              {/* Stand Top Reflection */}
              <div className="absolute inset-x-4 top-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              {/* Brand Header */}
              <div className="flex items-center gap-1.5 mb-1 text-amber-500">
                <Flame className="h-4.5 w-4.5 fill-amber-500/10" />
                <span className="text-[10px] font-black uppercase tracking-wider">El Campeón</span>
              </div>
              
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-widest leading-none">Mesa 4</h4>
              
              {/* Divider */}
              <div className="w-10 h-0.5 bg-amber-500/40 my-3" />
              
              {/* Prompt Text */}
              <p className="text-[11px] font-black text-white leading-tight uppercase tracking-wider">
                ⚡ ¡Escaneá el Menú!
              </p>
              <p className="text-[8px] text-stone-400 font-semibold mt-1 mb-4 leading-normal">
                Pedí en un segundo desde tu teléfono,<br />sin descargar nada y sin demoras.
              </p>

              {/* QR Container */}
              <div className="bg-white p-3.5 rounded-xl shadow-inner border border-white/5 relative group">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`} 
                  alt="Código QR del Menú" 
                  className="h-40 w-40 rounded-lg select-none"
                />
                
                {/* Scanline Animation */}
                <div className="absolute inset-x-3.5 top-3.5 bottom-3.5 pointer-events-none overflow-hidden rounded-lg">
                  <div className="w-full h-0.5 bg-amber-500/60 shadow-lg shadow-amber-500 absolute top-0 animate-[bounce_3s_infinite]" />
                </div>
              </div>

              {/* Footer stand notes */}
              <p className="text-[7px] text-stone-500 font-black uppercase tracking-widest mt-4">
                PWA Menú Digital Auto-Gestionado
              </p>
            </div>

            {/* Wooden Base Mockup */}
            <div className="w-72 h-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-t-lg rounded-b-md shadow-2xl border-t border-amber-700 flex items-center justify-center relative">
              <div className="absolute -top-1 w-64 h-1 bg-stone-950/85 rounded" />
              {/* Wooden grain accents */}
              <div className="w-full h-px bg-amber-950/20 absolute top-2" />
            </div>
            
            {/* Scan instructions & Close */}
            <div className="mt-6 text-center space-y-4 w-full">
              <p className="text-xs text-stone-400 font-medium">
                Escaneá la pantalla para probar la experiencia real del cliente.
              </p>
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="px-6 py-2 bg-stone-900 border border-stone-850 hover:border-amber-500/20 text-stone-300 hover:text-white text-xs font-black uppercase rounded-xl transition-all shadow-md active:scale-95"
              >
                Cerrar Cartel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* LOADER PANTALLA COMPLETA SIMULADO PARA ACCIONES DE PEDIDO */}
      {isProcessingOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-stone-900 border border-stone-850 p-6 rounded-2xl flex items-center gap-3 shadow-2xl">
            <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Procesando en cocina...</span>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── PIN GATE COMPONENT ──────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(PIN_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6 antialiased selection:bg-amber-500 selection:text-stone-900">
      <div className={`w-full max-w-xs space-y-6 ${shake ? "animate-bounce" : ""}`}>
        {/* Lock Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Flame className="h-7 w-7 text-stone-950 fill-stone-950/10 animate-pulse" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-black text-white tracking-tight uppercase">
              Control de Cocina
            </h1>
            <p className="text-xs font-semibold text-stone-400 mt-1">
              Ingresá el PIN de comandas para acceder.
            </p>
          </div>
        </div>

        {/* PIN Input */}
        <div className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleKeyDown}
            placeholder="• • • •"
            className={`w-full text-center text-2xl font-black tracking-[0.5em] py-4 px-4 rounded-xl border-2 bg-stone-900 outline-none transition-all ${
              error
                ? "border-red-500 text-red-500"
                : "border-stone-800 text-white focus:border-amber-500"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-xs font-bold text-red-500 text-center animate-pulse">
              PIN incorrecto. Intentá de nuevo.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={pin.length < 4}
          className="w-full py-4 bg-amber-500 text-stone-950 font-black text-sm uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 shadow-sm"
        >
          Ingresar
        </button>

        {/* Back link */}
        <Link
          href="/demos/gastronomia"
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a la carta digital
        </Link>

        {/* Demo hint */}
        <p className="text-[9px] font-bold text-stone-600 text-center uppercase tracking-wider">
          Demo PIN: 1234
        </p>
      </div>
    </div>
  );
}
