"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCartStore } from "../store/cartStore";

// 🔐 Auth solo en cliente (CLAVE)
const AuthNav = dynamic(() => import("./AuthNav"), {
  ssr: false,
});

export function Navbar() {
  // 🛒 Cart (NO TOCADO)
  const totalItems = useCartStore((state) => state.totalItems());
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/products/logosvg.svg"
            alt="Logo"
            className="w-30 h-30 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white">
              RAYNIX ENERGY
            </span>
            <span className="text-xs text-zinc-500 font-bold uppercase">
              Premium Drinks
            </span>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* LINKS */}
          <Link
            href="/"
            className="hidden md:block text-zinc-400 hover:text-cyan-400 font-bold"
          >
            Productos
          </Link>
          <Link
            href="/nosotros"
            className="hidden md:block text-zinc-400 hover:text-cyan-400 font-bold"
          >
            Nosotros
          </Link>

          {/* 🔐 AUTH (CLIENT ONLY, SIN SSR) */}
          <div className="hidden md:flex items-center gap-4">
            <AuthNav />
          </div>

          {/* 🛒 CART (NO TOCADO) */}
      <Link
  href="/cart"
  className="relative flex items-center justify-center"
>
  <svg
    className="w-7 h-7 text-white hover:text-cyan-400 transition"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>

  {hasHydrated && totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {totalItems}
    </span>
  )}
</Link>
        </div>
      </div>
    </nav>
  );
}