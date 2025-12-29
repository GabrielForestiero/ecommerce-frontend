"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { getMyOrders } from "../services/orders";

type Order = {
  id: string;
  total: number;
  status: "PENDING" | "PAID" | "FAILED";
  createdAt: string;
};

export default function MyOrdersPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    getMyOrders(token)
      .then(setOrders)
      .catch(() => setError("No se pudieron cargar tus órdenes"))
      .finally(() => setLoading(false));
  }, [token, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-zinc-400">
        Cargando tus órdenes...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-28 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-white">
          Mis órdenes
        </h1>

        {orders.length === 0 && (
          <p className="text-zinc-400">
            Todavía no realizaste ninguna compra.
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-sm text-zinc-400">
                #{order.id}
              </span>

              <span
                className={`text-sm font-bold ${
                  order.status === "PAID"
                    ? "text-emerald-400"
                    : order.status === "FAILED"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between text-zinc-300">
              <span>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="font-bold">
                ${order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
