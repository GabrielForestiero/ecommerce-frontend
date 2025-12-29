"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";
import { createOrder } from "../services/orders";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mpReady, setMpReady] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const BANK_DATA = {
    cvu: "0000003100012345678901",
    alias: "TIENDA.ONLINE.MP",
    titular: "Tu Nombre o Razón Social",
    email: "pagos@tutienda.com"
  };

  async function createPreference(items: unknown[], orderId: string) {
    const res = await fetch("http://localhost:3000/api/mercadopago/preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, orderId }),
    });

    if (!res.ok) throw new Error("Error creando preference");
    return res.json();
  }

  async function handleInitiateCheckout() {
    try {
      setLoading(true);
      setError(null);

      const { orderId } = await createOrder(items);
      setOrderId(orderId);
      setShowPaymentMethods(true);
      
      console.log("🧾 Orden creada:", orderId);
    } catch (err) {
      console.error(err);
      setError("Error al crear la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePaymentMethod(method: string) {
    setSelectedMethod(method);

    if (method === "mercadopago") {
      try {
        setLoading(true);
        
        if (!mpReady) {
          setError("Cargando Mercado Pago, intentá nuevamente.");
          return;
        }

        const { preferenceId } = await createPreference(items, orderId!);

        // @ts-expect-error SDK global
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
          { locale: "es-AR" }
        );

        mp.checkout({
          preference: { id: preferenceId },
          autoOpen: true,
        });

      } catch (err) {
        console.error(err);
        setError("No se pudo iniciar el pago. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
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
                  
                  {/* Control de cantidad */}
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
                  onClick={handleInitiateCheckout}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    loading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? "Procesando..." : "Continuar con el pago"}
                </button>
              )}
            </div>

            {/* MÉTODOS DE PAGO */}
            {showPaymentMethods && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Elegí tu método de pago
                </h3>

                <div className="space-y-4">
                  {/* Mercado Pago */}
                  <button
                    onClick={() => handlePaymentMethod("mercadopago")}
                    disabled={loading}
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

                  {/* Transferencia */}
                  <button
                    onClick={() => handlePaymentMethod("transferencia")}
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

                {/* DATOS DE TRANSFERENCIA */}
                {selectedMethod === "transferencia" && (
                  <div className="mt-6 p-5 bg-purple-50 border-2 border-purple-200 rounded-xl space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">📋</div>
                      <div>
                        <h4 className="text-gray-900 font-bold text-lg mb-1">
                          Datos para transferir
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Realizá la transferencia y envianos el comprobante
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-white p-5 rounded-xl border border-purple-200">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">CVU:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-mono text-sm">
                            {BANK_DATA.cvu}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(BANK_DATA.cvu);
                              alert("✅ CVU copiado");
                            }}
                            className="text-blue-600 hover:text-blue-700 px-2 py-1 hover:bg-blue-50 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Alias:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-mono font-semibold">
                            {BANK_DATA.alias}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(BANK_DATA.alias);
                              alert("✅ Alias copiado");
                            }}
                            className="text-blue-600 hover:text-blue-700 px-2 py-1 hover:bg-blue-50 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pb-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Titular:</span>
                        <span className="text-gray-900 font-semibold">{BANK_DATA.titular}</span>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-900 font-bold text-lg">Monto a transferir:</span>
                        <span className="text-purple-600 font-bold text-2xl">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-300 p-5 rounded-xl space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📧</span>
                        <div className="flex-1">
                          <p className="text-yellow-900 font-bold mb-2">
                            Enviá el comprobante por email
                          </p>
                          <a 
                            href={`mailto:${BANK_DATA.email}?subject=Comprobante Orden ${orderId}&body=Adjunto comprobante de pago para la orden ${orderId}%0D%0A%0D%0AMonto: ${totalPrice.toFixed(2)}`}
                            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-4 py-2 rounded-lg transition-colors"
                          >
                            {BANK_DATA.email}
                          </a>
                          <p className="text-yellow-800 text-xs mt-3">
                            <strong>Asunto:</strong> Comprobante Orden {orderId}
                          </p>
                          <p className="text-yellow-800 text-xs mt-1">
                            Adjuntá una foto o captura del comprobante
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <p className="text-gray-600 text-sm">
                        Tu orden será procesada una vez confirmemos el pago
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}