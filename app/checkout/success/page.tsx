"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";


type SearchParams = {
  payment_id?: string;
  status?: string;
  preference_id?: string;
};

export default function CheckoutSuccess({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { payment_id, status, preference_id } = searchParams;

  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);

  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function confirmOrder() {
      // ❌ Pago no aprobado
      if (status !== "approved") {
        setError("El pago no fue aprobado.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/orders/from-mp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: payment_id,
            preferenceId: preference_id,
            items,
          }),
        });

        if (!res.ok) {
          throw new Error("No se pudo crear la orden");
        }

        const order = await res.json();
        setOrderId(order.id);
        clearCart();

      } catch (err) {
        console.error(err);
        setError("Error confirmando la orden.");
      } finally {
        setLoading(false);
      }
    }

    confirmOrder();
  }, [status, payment_id, preference_id, items, clearCart]);

  // ⏳ Cargando
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-zinc-300">
        Procesando tu compra...
      </main>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center px-6 py-10">
      <div className="max-w-2xl w-full">
        {/* Animación */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mb-6">
            ✔
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-center space-y-6">
          <h1 className="text-4xl font-black text-white">
            ¡Compra Exitosa!
          </h1>

          {orderId && (
            <div className="bg-zinc-800/30 rounded-xl p-4">
              <p className="text-zinc-400 text-sm">Número de orden</p>
              <p className="font-mono text-2xl text-white break-all">
                {orderId}
              </p>
            </div>
          )}

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}
