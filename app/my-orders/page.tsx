"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { getMyOrders } from "../services/orders";

type Product = {
  id: string;
  name: string;
  imageURL: string;
  price: number;
};

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: Product;
};

type Order = {
  id: string;
  total: number;
  status: "PENDING" | "PAID" | "FAILED";
  createdAt: string;
  items: OrderItem[];
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
      <main className="min-h-screen bg-white flex items-center justify-center text-zinc-600">
        Cargando tus órdenes...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center text-red-500">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 px-6 pb-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-black">
          Mis órdenes
        </h1>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-600 text-lg">
              Todavía no realizaste ninguna compra.
            </p>
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-200">
              <div>
                <p className="text-sm text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <span
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  order.status === "PAID"
                    ? "bg-emerald-100 text-emerald-700"
                    : order.status === "FAILED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status === "PAID" ? "PAGADO" : order.status === "FAILED" ? "FALLIDO" : "PENDIENTE"}
              </span>
            </div>

            {/* PRODUCTOS */}
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4"
                >
                  {/* IMAGEN */}
                  <img
                    src={item.product.imageURL}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-200"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="font-bold text-black">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      Cantidad: {item.quantity}
                    </p>
                  </div>

                  {/* PRECIO */}
                  <div className="text-right">
                    <p className="font-bold text-black">
                      ${item.price * item.quantity}
                    </p>
                    <p className="text-sm text-zinc-500">
                      ${item.price} c/u
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
              <span className="text-lg font-bold text-black">
                Total
              </span>
              <span className="text-2xl font-black text-black">
                ${order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}