"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, Trash2, Plus, Minus, Check, X, Phone, 
  MapPin, Clock, Sparkles, ChefHat, Flame, ArrowLeft 
} from "lucide-react";
import { MOCK_MENU, Plato } from "@/data/mock-gastronomia-admin";
import { MapWidget } from "@/components/ui/MapWidget";
import { PwaInstallBanner } from "@/components/ui/PwaInstallBanner";

interface CartItem {
  plato: Plato;
  cantidad: number;
}

export default function GastronomiaLandingPage() {
  const [menu, setMenu] = useState<Plato[]>(MOCK_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Formulario de Pedido
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<"Mostrador" | "Delivery">("Mostrador");
  const [direccion, setDireccion] = useState("");

  // Sync menu from localStorage if admin modified it
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("gastronomia_menu");
      if (stored) {
        setMenu(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Error reading local menu", e);
    }
  }, []);

  const categories = ["Todos", "Minutas", "Parrilla", "Regional", "Bebidas"];
  const platoDelDia = menu.find(p => p.menuDelDia && p.disponible);
  
  const filteredMenu = menu.filter(p => {
    if (!p.disponible) return false;
    if (selectedCategory === "Todos") return true;
    return p.categoria === selectedCategory;
  });

  const addToCart = (plato: Plato) => {
    const existing = cart.find(item => item.plato.id === plato.id);
    if (existing) {
      setCart(cart.map(item => 
        item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCart([...cart, { plato, cantidad: 1 }]);
    }
    
    setShowNotification(`¡Añadido: ${plato.nombre}!`);
    setTimeout(() => setShowNotification(null), 2000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.plato.id === id) {
        const nextQty = item.cantidad + delta;
        return nextQty > 0 ? { ...item, cantidad: nextQty } : item;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.plato.id !== id));
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => {
      const precio = parseFloat(item.plato.precio.replace("$", "").replace(".", ""));
      return acc + (precio * item.cantidad);
    }, 0);
  };

  const formatCurrency = (val: number) => {
    return "$" + val.toLocaleString("es-AR");
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) {
      alert("Por favor, completá tu nombre y teléfono.");
      return;
    }
    if (tipoEntrega === "Delivery" && !direccion.trim()) {
      alert("Por favor, ingresá tu dirección para el delivery.");
      return;
    }

    const subtotal = getSubtotal();
    
    // Generar mensaje
    let message = `*¡Hola El Campeón! Quisiera hacer un pedido:*\n\n`;
    message += `*📋 Detalle del pedido:*\n`;
    cart.forEach(item => {
      message += `- *${item.cantidad}x* ${item.plato.nombre} (${item.plato.precio} c/u)\n`;
    });
    
    message += `\n*💰 Total:* ${formatCurrency(subtotal)}\n\n`;
    message += `*👤 Cliente:* ${nombre}\n`;
    message += `*📞 Teléfono:* ${telefono}\n`;
    message += `*🛵 Entrega:* ${tipoEntrega === "Delivery" ? "Delivery a Domicilio" : "Retiro por Mostrador"}\n`;
    if (tipoEntrega === "Delivery") {
      message += `*📍 Dirección:* ${direccion}\n`;
    }
    
    message += `\n_Enviado desde la PWA de El Campeón_`;
    
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5493624000000?text=${encoded}`; // Número ficticio del Chaco
    
    // Registrar pedido en localStorage de forma simulada para que aparezca en el Admin
    try {
      const storedPedidos = window.localStorage.getItem("gastronomia_orders");
      const currentPedidos = storedPedidos ? JSON.parse(storedPedidos) : [];
      
      const newOrder = {
        id: "G-" + (2000 + currentPedidos.length + 1).toString(),
        cliente: nombre,
        items: cart.map(item => ({
          platoId: item.plato.id,
          nombre: item.plato.nombre,
          cantidad: item.cantidad,
          precioUnitario: item.plato.precio
        })),
        montoTotal: formatCurrency(subtotal),
        estado: "Pendiente",
        tipo: tipoEntrega,
        direccion: tipoEntrega === "Delivery" ? direccion : undefined,
        telefono: telefono,
        fecha: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) + " hs"
      };

      window.localStorage.setItem("gastronomia_orders", JSON.stringify([newOrder, ...currentPedidos]));
    } catch (e) {
      console.error("Error saving simulated customer order", e);
    }

    // Resetear carrito y formulario
    setCart([]);
    setNombre("");
    setTelefono("");
    setDireccion("");
    setIsCartOpen(false);

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-stone-900 pb-20">
      
      {/* HEADER DE LA ROTISERÍA */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-4 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 bg-stone-900 hover:bg-stone-850 rounded-lg text-stone-400 hover:text-stone-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                <Flame className="h-6 w-6 text-amber-500 fill-amber-500/10" />
                El Campeón
              </h1>
              <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">Rotisería & Minutas Chaqueñas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/demos/gastronomia/admin" 
              className="hidden sm:inline-flex items-center text-xs font-bold text-stone-400 hover:text-amber-500 transition-colors border border-stone-800 hover:border-amber-500/30 px-3 py-1.5 rounded-lg"
            >
              🔐 Admin Panel
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-stone-950 shadow-md">
                  {cart.reduce((sum, item) => sum + item.cantidad, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE COMIDAS */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950 border-b border-stone-900 px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 border border-stone-800 text-amber-500 rounded-full text-xs font-black uppercase tracking-wider">
            <ChefHat className="h-4 w-4" /> ¡El verdadero sabor chaqueño!
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
            La rotisería que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">factura en el centro</span>
          </h2>
          <p className="text-sm md:text-lg text-stone-400 max-w-xl mx-auto font-medium">
            Minutas gigantes, el mejor asado criollo y platos regionales cocinados con fuegos de verdad. Pedí directo a WhatsApp y disfrutá en tu mesa.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-400 text-xs md:text-sm pt-4 border-t border-stone-900 max-w-lg mx-auto">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-amber-500" /> Lun a Dom · 11:30 a 14:30 / 19:30 a 23:30</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-amber-500" /> Pellegrini 280 · Resistencia</span>
          </div>
        </div>
        
        {/* Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 rounded-full blur-[100px]" />
      </section>

      {/* BODY DEL MENÚ */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        
        {/* PLATO DEL DÍA */}
        {platoDelDia && (
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-amber-500/5">
            <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider px-5 py-2.5 rounded-bl-3xl flex items-center gap-1 shadow-md">
              <Sparkles className="h-3.5 w-3.5 fill-current animate-pulse" /> Plato del Día
            </div>
            
            <div className="text-6xl md:text-8xl p-5 bg-stone-950 border border-stone-850 rounded-2xl shrink-0 shadow-inner">
              {platoDelDia.imagen}
            </div>

            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Recomendación del Chef</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">{platoDelDia.nombre}</h3>
                <p className="text-sm text-stone-400 mt-2 max-w-xl">{platoDelDia.descripcion}</p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-3xl font-black text-white tracking-tight">{platoDelDia.precio}</span>
                <span className="text-xs line-through text-stone-500">$6.900</span>
              </div>

              <button 
                onClick={() => addToCart(platoDelDia)}
                className="w-full md:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl uppercase tracking-wider text-xs transition-all active:scale-95 shadow-lg shadow-amber-500/10"
              >
                🍳 ¡Pedir Menú del Día!
              </button>
            </div>
          </div>
        )}

        {/* SELECTOR DE CATEGORÍAS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-900 pb-4">
            <h4 className="text-lg font-black text-white uppercase tracking-wider">Nuestra Carta Completa</h4>
            <span className="text-xs text-stone-500">{filteredMenu.length} Platos Disponibles</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap uppercase tracking-wider border ${
                  selectedCategory === cat 
                    ? "bg-amber-500 border-amber-500 text-stone-950 shadow-md shadow-amber-500/5" 
                    : "bg-stone-900 border-stone-850 text-stone-400 hover:text-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* LISTA DE PLATOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMenu.map(plato => (
            <div 
              key={plato.id} 
              className="bg-stone-900/60 border border-stone-850 hover:border-stone-800 rounded-2xl p-5 flex gap-4 transition-all hover:translate-y-[-2px] group relative"
            >
              <div className="text-4xl md:text-5xl p-4 bg-stone-950 border border-stone-850 rounded-xl flex items-center justify-center shrink-0 h-16 w-16">
                {plato.imagen}
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-black text-white text-base group-hover:text-amber-400 transition-colors leading-tight">{plato.nombre}</h5>
                    {plato.menuDelDia && (
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-black uppercase rounded">Día</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed mt-1">{plato.descripcion}</p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="text-lg font-black text-white tracking-tight">{plato.precio}</span>
                  <button 
                    onClick={() => addToCart(plato)}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 font-bold rounded-lg text-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MAPA Y UBICACIÓN */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-stone-900">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Encontranos en Resistencia</span>
          <h3 className="text-2xl font-black text-white uppercase mt-1">Ubicación de Fuegos</h3>
          <p className="text-xs text-stone-400 mt-2">Pellegrini 280 (Entre Salta y Tucumán) · H3500 Resistencia, Chaco</p>
        </div>
        <MapWidget 
          address="Pellegrini 280, Resistencia, Chaco" 
          lat={-27.4514}
          lon={-58.9866}
          googleMapsUrl="https://maps.google.com/?q=Pellegrini+280,+Resistencia,+Chaco" 
          theme="amber" 
        />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-900 bg-stone-950 px-5 py-12 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto space-y-4">
          <p>© {new Date().getFullYear()} Rotisería El Campeón — Sabores Chaqueños a la Leña.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="font-bold text-amber-500 hover:text-amber-400 transition-colors">
              ← Volver a Santi Soluciones
            </Link>
            <span className="text-stone-850">|</span>
            <Link href="/demos/gastronomia/admin" className="font-bold text-stone-400 hover:text-white transition-colors">
              🔐 Panel Interno
            </Link>
          </div>
        </div>
      </footer>

      {/* NOTIFICACIÓN FLOTANTE */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        {showNotification && (
          <div className="bg-amber-500 text-stone-950 px-5 py-3 rounded-full text-xs font-black shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <Check className="h-4 w-4 stroke-[3]" /> {showNotification}
          </div>
        )}
      </div>

      {/* CARRITO - DRAWER SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-850 h-full flex flex-col z-10 shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-stone-850 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-500" />
                <h3 className="font-black text-white text-lg uppercase tracking-wider">Tu Pedido</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-stone-400 hover:text-white hover:bg-stone-850 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-6xl p-5 bg-stone-950 rounded-full border border-stone-850">🍗</div>
                  <div>
                    <h5 className="font-black text-white text-sm uppercase">El carrito está vacío</h5>
                    <p className="text-xs text-stone-500 mt-1">Elegí lo mejor de nuestra carta para empezar.</p>
                  </div>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.plato.id} className="flex gap-3 bg-stone-950/60 border border-stone-850 rounded-xl p-3.5 relative group">
                    <div className="text-3xl p-2 bg-stone-900 border border-stone-850 rounded-lg flex items-center justify-center shrink-0">
                      {item.plato.imagen}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div>
                        <h6 className="font-black text-white text-xs leading-tight">{item.plato.nombre}</h6>
                        <span className="text-[10px] text-stone-400">{item.plato.precio} c/u</span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center border border-stone-800 rounded-lg bg-stone-900 overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.plato.id, -1)}
                            className="p-1.5 text-stone-400 hover:text-white transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-black text-white text-center min-w-[24px]">
                            {item.cantidad}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.plato.id, 1)}
                            className="p-1.5 text-stone-400 hover:text-white transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.plato.id)}
                          className="p-1 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Form & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-stone-850 p-5 bg-stone-950 space-y-4">
                
                {/* Total */}
                <div className="flex items-center justify-between text-stone-200">
                  <span className="text-xs uppercase font-bold text-stone-500">Monto Total</span>
                  <span className="text-2xl font-black text-amber-500 tracking-tight">{formatCurrency(getSubtotal())}</span>
                </div>

                <form onSubmit={handleSendOrder} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-2 border-b border-stone-900 pb-3">
                    <button
                      type="button"
                      onClick={() => setTipoEntrega("Mostrador")}
                      className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        tipoEntrega === "Mostrador" 
                          ? "bg-amber-500 border-amber-500 text-stone-950" 
                          : "bg-stone-900 border-stone-850 text-stone-400"
                      }`}
                    >
                      🏃 Retiro Mostrador
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoEntrega("Delivery")}
                      className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        tipoEntrega === "Delivery" 
                          ? "bg-amber-500 border-amber-500 text-stone-950" 
                          : "bg-stone-900 border-stone-850 text-stone-400"
                      }`}
                    >
                      🛵 Delivery
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">Teléfono Móvil (WhatsApp)</label>
                      <input 
                        type="tel" 
                        required
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        placeholder="Ej. 3624123456"
                        className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors"
                      />
                    </div>

                    {tipoEntrega === "Delivery" && (
                      <div className="animate-in slide-in-from-top-2 duration-200">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">Dirección de Envío</label>
                        <input 
                          type="text" 
                          required={tipoEntrega === "Delivery"}
                          value={direccion}
                          onChange={e => setDireccion(e.target.value)}
                          placeholder="Ej. Av. Alberdi 420, Dpto 2"
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl uppercase tracking-wider text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-green-600/10 mt-4"
                  >
                    <Phone className="h-4 w-4 fill-white" /> Enviar Pedido vía WhatsApp
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    <PwaInstallBanner />
    </div>
  );
}
