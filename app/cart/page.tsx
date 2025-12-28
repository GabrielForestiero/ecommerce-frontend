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
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-black flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-cyan-500/20 animate-pulse">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-zinc-300 text-lg font-medium">Cargando carrito...</p>
        </div>
      </main>
    );
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-black flex items-center justify-center px-6 pt-20">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-900 border border-cyan-500/20">
            <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Tu carrito está vacío</h2>
            <p className="text-zinc-400">Agrega productos para comenzar tu compra</p>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  // Carrito con productos
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-black pt-20">
      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header integrado */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-900">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
              Carrito
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </p>
          </div>
          
          <Link 
            href="/"
            className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors text-sm font-medium group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Seguir comprando
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex gap-6 items-center">
                  {/* Imagen */}
                  <div className="flex-shrink-0 w-24 h-24 bg-zinc-900 rounded-lg p-3 flex items-center justify-center border border-zinc-800 group-hover:border-cyan-500/20 transition-colors">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-white text-lg mb-3 truncate">
                      {item.name}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <span>Precio:</span>
                        <span className="text-white font-semibold">${item.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span>Cantidad:</span>
                        <span className="text-cyan-400 font-semibold">{item.quantity}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span>Subtotal:</span>
                        <span className="text-white font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex-shrink-0 p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
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
            <div className="sticky top-28 space-y-4">
              {/* Card de resumen */}
              <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-6 space-y-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                  Resumen
                </h3>

                <div className="space-y-3 py-4 border-y border-zinc-800/50">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Envío</span>
                    <span className="text-emerald-400 font-medium">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
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
                  className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25"
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
                      Finalizar compra
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Info adicional */}
              <div className="bg-zinc-900/30 rounded-lg border border-zinc-800/30 p-4 space-y-2.5 text-sm text-zinc-500">
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