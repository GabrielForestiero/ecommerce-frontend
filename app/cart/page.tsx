"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { createOrder } from "../services/orders";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mpReady, setMpReady] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  async function createPreference(items: unknown[], orderId: string) {
    const res = await fetch(`${API_URL}/api/mercadopago/preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, orderId }),
    });

    if (!res.ok) throw new Error("Error creando preference");
    return res.json();
  }

  function handleShowPaymentMethods() {
    setShowPaymentMethods(true);
  }

  async function handleFinalizeOrder() {
    if (!selectedMethod) {
      setError("Por favor seleccioná un método de pago");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { orderId } = await createOrder(items);
      
      console.log("🧾 Orden creada:", orderId);

      if (selectedMethod === "mercadopago") {
        if (!mpReady) {
          setError("Cargando Mercado Pago, intentá nuevamente.");
          return;
        }

        const { preferenceId } = await createPreference(items, orderId);

        // @ts-expect-error SDK global
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
          { locale: "es-AR" }
        );

        setToastMessage(`¡Orden ${orderId} creada exitosamente!`);
        setShowToast(true);

        mp.checkout({
          preference: { id: preferenceId },
          autoOpen: true,
        });

        // NO limpiamos el carrito en Mercado Pago por si el usuario cancela

      } else if (selectedMethod === "transferencia") {
        // Guardar el total antes de limpiar
        const totalAmount = totalPrice;
        
        // Limpiar el carrito solo para transferencia
        clearCart();
        
        // Redirigir a página de confirmación
        router.push(`/order-confirmation?orderId=${orderId}&amount=${totalAmount.toFixed(2)}`);
      }

    } catch (err) {
      console.error(err);
      setError("Error al procesar la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!hasHydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Cargando carrito...</div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
          <Link href="/" className="text-blue-600 underline hover:text-blue-700">
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="afterInteractive"
        onLoad={() => setMpReady(true)}
      />

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[350px]">
            <div className="text-3xl">✅</div>
            <div className="flex-1">
              <p className="font-bold text-lg">¡Orden creada exitosamente!</p>
              <p className="text-green-100 text-sm mt-1">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-white hover:text-green-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex gap-8 items-center hover:shadow-md transition-shadow"
              >
                <div className="w-36 h-36 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-gray-900 font-bold text-xl mb-3">{item.name}</h2>
                  <p className="text-gray-600 text-lg mb-3">
                    ${item.price} c/u
                  </p>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-600 font-medium">Cantidad:</span>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors font-bold text-gray-700"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors font-bold text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-900 font-semibold text-lg">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 font-semibold px-5 py-3 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* Resumen y Métodos de Pago */}
          <div className="space-y-6">
            {/* Resumen */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen del pedido</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm border border-red-200">
                  {error}
                </div>
              )}

              {!showPaymentMethods && (
                <button
                  onClick={handleShowPaymentMethods}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                >
                  Continuar con el pago
                </button>
              )}
            </div>

            {/* MÉTODOS DE PAGO */}
            {showPaymentMethods && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Elegí tu método de pago
                </h3>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setSelectedMethod("mercadopago")}
                    className={`w-full p-5 rounded-xl border-2 transition-all ${
                      selectedMethod === "mercadopago"
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center p-3 shadow-sm">
                        <img 
                          src="/mp.svg"
                          alt="Mercado Pago"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-gray-900 font-bold text-lg">Mercado Pago</p>
                        <p className="text-gray-600 text-sm mt-1">
                          Tarjetas, efectivo o saldo
                        </p>
                      </div>
                      {selectedMethod === "mercadopago" && (
                        <div className="text-blue-600 text-2xl">✓</div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod("transferencia")}
                    className={`w-full p-5 rounded-xl border-2 transition-all ${
                      selectedMethod === "transferencia"
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                        💳
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-gray-900 font-bold text-lg">Transferencia Bancaria</p>
                        <p className="text-gray-600 text-sm mt-1">
                          CVU/CBU + comprobante
                        </p>
                      </div>
                      {selectedMethod === "transferencia" && (
                        <div className="text-purple-600 text-2xl">✓</div>
                      )}
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleFinalizeOrder}
                  disabled={loading || !selectedMethod}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    loading || !selectedMethod
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? "Procesando..." : "Finalizar compra"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}