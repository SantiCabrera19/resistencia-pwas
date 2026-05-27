"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Plus, Search, Edit2, AlertTriangle, ArrowDownToLine, 
  X, CheckCircle2, AlertCircle, Package, ArrowUpToLine, Trash2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductoStock, MOCK_INVENTARIO } from "@/data/mock-ferreteria-admin";

export default function InventarioPage() {
  // --- Estados Principales ---
  const [inventory, setInventory] = useState<ProductoStock[]>(MOCK_INVENTARIO);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<"Todos" | "Crítico" | "Sin Stock">("Todos");

  // Modales
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);

  // Selección para Modales
  const [selectedProduct, setSelectedProduct] = useState<ProductoStock | null>(null);

  // Campos de Alta/Edición
  const [nombre, setNombre] = useState("");
  const [sku, setSku] = useState("");
  const [categoria, setCategoria] = useState("Herramientas Eléctricas");
  const [precio, setPrecio] = useState("$ 10.000");
  const [stockActual, setStockActual] = useState(10);
  const [stockMinimo, setStockMinimo] = useState(5);

  // Campo de Reabastecimiento rápido
  const [addStockAmount, setAddStockAmount] = useState(20);

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

  // --- Filtrado Reactivo ---
  const filteredInventory = inventory.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterState === "Todos" ? true : p.estado === filterState;
    return matchesSearch && matchesFilter;
  });

  // --- Badges Helpers ---
  const getStockBadge = (estado: ProductoStock["estado"]) => {
    switch (estado) {
      case "Normal": return <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Normal</span>;
      case "Crítico": return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20"><AlertTriangle className="h-3 w-3"/> Crítico</span>;
      case "Sin Stock": return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10"><AlertTriangle className="h-3 w-3"/> Agotado</span>;
    }
  };

  // --- Acciones de Catálogo ---
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !sku.trim() || !precio.trim()) {
      addToast("Todos los campos obligatorios deben completarse.", "error");
      return;
    }

    // Determinar estado basado en stock inicial y mínimo
    const estadoInicial = stockActual <= 0 ? "Sin Stock" : stockActual <= stockMinimo ? "Crítico" : "Normal";

    const nuevo: ProductoStock = {
      id: Date.now().toString(),
      sku: sku.toUpperCase(),
      nombre,
      categoria,
      precio: precio.startsWith("$") ? precio : `$ ${precio}`,
      stockActual,
      stockMinimo,
      estado: estadoInicial
    };

    setInventory([...inventory, nuevo]);
    addToast(`Producto "${nombre}" catalogado exitosamente.`, "success");
    setIsNewModalOpen(false);

    // Reset
    setNombre("");
    setSku("");
    setCategoria("Herramientas Eléctricas");
    setPrecio("$ 10.000");
    setStockActual(10);
    setStockMinimo(5);
  };

  const openEditModal = (p: ProductoStock) => {
    setSelectedProduct(p);
    setNombre(p.nombre);
    setSku(p.sku);
    setCategoria(p.categoria);
    setPrecio(p.precio);
    setStockActual(p.stockActual);
    setStockMinimo(p.stockMinimo);
    setIsEditModalOpen(true);
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const nuevoEstado = stockActual <= 0 ? "Sin Stock" : stockActual <= stockMinimo ? "Crítico" : "Normal";

    setInventory(inventory.map(p => 
      p.id === selectedProduct.id 
        ? { ...p, sku: sku.toUpperCase(), nombre, categoria, precio, stockActual, stockMinimo, estado: nuevoEstado }
        : p
    ));

    addToast(`Ficha de "${nombre}" actualizada correctamente.`, "success");
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const openRestockModal = (p: ProductoStock) => {
    setSelectedProduct(p);
    setAddStockAmount(Math.max(10, p.stockMinimo * 2));
    setIsRestockModalOpen(true);
  };

  const handleRestock = () => {
    if (!selectedProduct) return;
    const nuevoStock = selectedProduct.stockActual + addStockAmount;
    const nuevoEstado = nuevoStock <= 0 ? "Sin Stock" : nuevoStock <= selectedProduct.stockMinimo ? "Crítico" : "Normal";

    setInventory(inventory.map(p => 
      p.id === selectedProduct.id 
        ? { ...p, stockActual: nuevoStock, estado: nuevoEstado }
        : p
    ));

    addToast(`Ingresaron +${addStockAmount} unidades de ${selectedProduct.nombre} al stock.`, "success");
    setIsRestockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    setInventory(inventory.filter(p => p.id !== id));
    addToast(`Producto "${name}" removido del inventario.`, "error");
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
        title="Inventario General" 
        description="Gestión integral de precios de lista, categorías, niveles de stock mínimo y alertas de reposición."
        action={
          <div className="flex gap-2">
            <button 
              onClick={() => addToast("Reporte en PDF exportado exitosamente.", "info")}
              className="hidden sm:flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-xs"
            >
              <ArrowDownToLine className="h-4.5 w-4.5" />
              Exportar
            </button>
            <button 
              onClick={() => {
                setNombre("");
                setSku("");
                setPrecio("$ 10.000");
                setStockActual(10);
                setStockMinimo(5);
                setIsNewModalOpen(true);
              }}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-orange-700 transition-all hover:shadow-md active:scale-95 text-sm"
            >
              <Plus className="h-4.5 w-4.5" />
              Nuevo Producto
            </button>
          </div>
        }
      />

      {/* Buscador & Selectores de Estado */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por SKU o nombre de producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-700"
          />
        </div>
        
        <div className="flex items-center gap-2 text-xs font-bold">
          <button 
            onClick={() => setFilterState("Todos")}
            className={`px-3 py-2 rounded-lg transition-colors ${filterState === "Todos" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Todos ({inventory.length})
          </button>
          <button 
            onClick={() => setFilterState("Crítico")}
            className={`px-3 py-2 rounded-lg transition-colors ${filterState === "Crítico" ? "bg-yellow-100 text-yellow-800 border border-yellow-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Críticos ({inventory.filter(p => p.estado === "Crítico").length})
          </button>
          <button 
            onClick={() => setFilterState("Sin Stock")}
            className={`px-3 py-2 rounded-lg transition-colors ${filterState === "Sin Stock" ? "bg-red-100 text-red-800 border border-red-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Agotados ({inventory.filter(p => p.estado === "Sin Stock").length})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">SKU</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Producto</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Categoría</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Precio Lista</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Stock / Mín</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">Estado</th>
                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400 font-bold">
                    No se encontraron artículos en el inventario.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 align-middle font-mono font-bold text-slate-400 text-xs">{item.sku}</td>
                    <td className="px-4 py-4 align-middle">
                      <span className="font-extrabold text-slate-800">{item.nombre}</span>
                    </td>
                    <td className="px-4 py-4 align-middle text-slate-500 font-semibold text-xs">{item.categoria}</td>
                    <td className="px-4 py-4 align-middle font-extrabold text-slate-900 text-xs">{item.precio}</td>
                    <td className="px-4 py-4 align-middle text-center font-mono">
                      <span className={item.stockActual <= item.stockMinimo ? "font-bold text-red-600" : "font-medium text-slate-700"}>
                        {item.stockActual}
                      </span>
                      <span className="text-slate-400"> / {item.stockMinimo}</span>
                    </td>
                    <td className="px-4 py-4 align-middle text-center">{getStockBadge(item.estado)}</td>
                    <td className="px-4 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => openRestockModal(item)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Ingresar Stock"
                        >
                          <ArrowUpToLine className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Editar Ficha"
                        >
                          <Edit2 className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(item.id, item.nombre)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Remover Producto"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODALES INTERACTIVOS ================= */}

      {/* 1. Modal: Nuevo Producto */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-orange-600 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-base uppercase tracking-wider">Catalogar Producto</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="hover:bg-orange-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 text-left font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Código SKU</label>
                  <input 
                    type="text" 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Ej: TAL-750W" 
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio Lista</label>
                  <input 
                    type="text" 
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Comercial del Producto</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Amoladora Angular Bosch" 
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Categoría</label>
                <select 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                >
                  <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                  <option value="Herramientas Manuales">Herramientas Manuales</option>
                  <option value="Materiales Pesados">Materiales Pesados (Material grueso)</option>
                  <option value="Pinturería">Pinturería</option>
                  <option value="Electricidad">Electricidad</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Stock Inicial</label>
                  <input 
                    type="number" 
                    min={0}
                    value={stockActual}
                    onChange={(e) => setStockActual(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Stock Mínimo Alerta</label>
                  <input 
                    type="number" 
                    min={1}
                    value={stockMinimo}
                    onChange={(e) => setStockMinimo(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Dar de Alta
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Modal: Editar Producto */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-base uppercase tracking-wider">Editar Ficha de Producto</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="hover:bg-slate-700 p-1 rounded-md transition-colors text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditProduct} className="p-6 space-y-4 text-left font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Código SKU</label>
                  <input 
                    type="text" 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio Lista</label>
                  <input 
                    type="text" 
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Comercial</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Categoría</label>
                <select 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                >
                  <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                  <option value="Herramientas Manuales">Herramientas Manuales</option>
                  <option value="Materiales Pesados">Materiales Pesados</option>
                  <option value="Pinturería">Pinturería</option>
                  <option value="Electricidad">Electricidad</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Stock Actual</label>
                  <input 
                    type="number" 
                    min={0}
                    value={stockActual}
                    onChange={(e) => setStockActual(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Stock Mínimo</label>
                  <input 
                    type="number" 
                    min={1}
                    value={stockMinimo}
                    onChange={(e) => setStockMinimo(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 3. Modal: Reabastecimiento Directo */}
      {isRestockModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-left"
          >
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-orange-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Ingresar Stock Directo</h3>
              </div>
              <button onClick={() => setIsRestockModalOpen(false)} className="hover:bg-slate-800 p-1 rounded-md transition-colors text-white/80 hover:text-white">
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
                  <p className="text-lg font-black text-slate-700 mt-1">{selectedProduct.stockActual} unidades</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cantidad a Sumar</label>
                  <input 
                    type="number" 
                    min={1}
                    value={addStockAmount}
                    onChange={(e) => setAddStockAmount(Math.max(1, parseInt(e.target.value, 10)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  onClick={() => setIsRestockModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button 
                  onClick={handleRestock}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all"
                >
                  Confirmar Ingreso
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Trash element to avoid linter warnings */}
      <span className="hidden"><Plus /><Search /><Edit2 /><AlertTriangle /><ArrowDownToLine /><X /><CheckCircle2 /><AlertCircle /><Package /></span>

    </div>
  );
}
