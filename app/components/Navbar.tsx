"use client";

import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export function Navbar() {
  const totalItems = useCartStore(
    (state) => state.totalItems()
  );
  const hasHydrated = useCartStore(
    (state) => state.hasHydrated
  );

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          ⚡ EnergyStore
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative text-white hover:text-emerald-400 transition"
        >
          🛒 Carrito

          {/* 👇 SOLO renderiza el badge cuando está hidratado */}
          {hasHydrated && totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-emerald-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
