"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";

export default function CartDrawer() {
  const router = useRouter();
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItems = useCartStore((state) => state.totalItems);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeDrawer]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function handleGoToCart() {
    closeDrawer();
    router.push("/cart");
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={closeDrawer}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-125 bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-8 border-b border-zinc-800">
          <div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-white to-zinc-400 text-transparent bg-clip-text">
              Carrito
            </h2>
            <p className="text-zinc-500 text-base mt-1">
              {totalItems()} {totalItems() === 1 ? "producto" : "productos"}
            </p>
          </div>

          <button
            onClick={closeDrawer}
            className="p-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-zinc-500 text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group bg-zinc-900/50 rounded-xl border border-zinc-800 p-5 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex gap-5">
                  <div className="shrink-0 w-24 h-24 bg-zinc-900 rounded-lg p-2 flex items-center justify-center border border-zinc-800">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

               
                  <div className="flex-1 min-w-0 space-y-4">
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      {/* Control de cantidad */}
                      <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors text-lg font-bold"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-base font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors text-lg font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Eliminar"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">${item.price} c/u</span>
                      <span className="font-bold text-white text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-zinc-800 p-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-lg">Total</span>
              <span className="text-3xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                ${totalPrice().toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoToCart}
                className="w-full px-6 py-4 rounded-xl font-bold text-base bg-linear-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Ver carrito completo
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button
                onClick={closeDrawer}
                className="w-full px-6 py-4 rounded-xl font-semibold text-base bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                Seguir comprando
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Envío gratis en todas las compras
            </div>
          </div>
        )}
      </div>
    </>
  );
}
