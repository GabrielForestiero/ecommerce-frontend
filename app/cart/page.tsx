"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../services/orders";

export default function CartPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const totalPrice = useCartStore(
    (state) => state.totalPrice()
  );
  const hasHydrated = useCartStore(
    (state) => state.hasHydrated
  );
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

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
      setError("No se pudo crear la orden");
    } finally {
      setLoading(false);
    }
  }

  if (!hasHydrated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Cargando carrito...
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Tu carrito está vacío
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Carrito</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 items-center bg-zinc-900 p-4 rounded-xl"
          >
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-24 h-24 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-zinc-400">
                ${item.price} x {item.quantity}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-6 text-red-400">{error}</p>
      )}

      <div className="mt-10 flex justify-between items-center">
        <span className="text-xl font-bold">
          Total: ${totalPrice}
        </span>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-black transition ${
            loading
              ? "bg-zinc-500 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {loading ? "Procesando..." : "Finalizar compra"}
        </button>
      </div>
    </main>
  );
}
