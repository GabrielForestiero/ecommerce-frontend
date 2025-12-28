"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../services/orders";

export default function CartPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    try {
      setLoading(true);
      setError(null);

      const order = await createOrder(items);

      clearCart();

      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (err) {
      setError("No se pudo crear la orden. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  // Estado de carga
  if (!hasHydrated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-white text-lg font-medium">Cargando carrito...</p>
        </div>
      </main>
    );
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800">
            <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Tu carrito está vacío</h2>
            <p className="text-zinc-500">Agrega productos para comenzar tu compra</p>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  // Carrito con productos
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Header */}
      <div className="border-b border-zinc-800/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Mi Carrito</h1>
              <p className="text-zinc-500 text-sm">
                {items.length} {items.length === 1 ? "producto" : "productos"}
              </p>
            </div>
            
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-2xl border border-zinc-800 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex gap-6 items-center">
                  {/* Imagen */}
                  <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-zinc-800/30 rounded-xl p-3 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-white text-lg mb-2 truncate group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Precio:</span>
                        <span className="text-cyan-400 font-bold">${item.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Cantidad:</span>
                        <span className="text-white font-semibold">{item.quantity}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Subtotal:</span>
                        <span className="text-white font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex-shrink-0 p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group/btn"
                    title="Eliminar del carrito"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Card de resumen */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-2xl border border-zinc-800 p-6 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Resumen de compra
                </h3>

                <div className="space-y-3 py-4 border-y border-zinc-800">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Envío</span>
                    <span className="font-semibold text-emerald-400">Gratis</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Descuento</span>
                    <span className="font-semibold">-$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Botón de checkout */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-zinc-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Finalizar compra
                    </>
                  )}
                </button>
              </div>

              {/* Info adicional */}
              <div className="bg-zinc-900/30 rounded-xl border border-zinc-800 p-4 space-y-2 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Garantía de devolución</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}