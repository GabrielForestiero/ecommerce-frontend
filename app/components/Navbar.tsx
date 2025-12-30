"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

// 🔐 Auth solo en cliente (CLAVE)
const AuthNav = dynamic(() => import("./AuthNav"), {
  ssr: false,
});

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 🛒 Cart (NO TOCADO)
  const totalItems = useCartStore((state) => state.totalItems());
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 lg:h-24 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img
              src="/products/logosvg.svg"
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl lg:text-2xl font-black text-white">
                RAYNIX ENERGY
              </span>
              <span className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase">
                Premium Drinks
              </span>
            </div>
          </Link>

          {/* RIGHT - DESKTOP */}
          <div className="hidden lg:flex items-center gap-6">
            {/* LINKS */}
            <Link
              href="/"
              className="text-zinc-400 hover:text-cyan-400 font-bold transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className="text-zinc-400 hover:text-cyan-400 font-bold transition-colors"
            >
              Nosotros
            </Link>

            {/* 🔐 AUTH */}
            <AuthNav />

            {/* 🛒 CART */}
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

          {/* RIGHT - MOBILE (Cart + Hamburger) */}
          <div className="flex lg:hidden items-center gap-3">
            {/* 🛒 CART MOBILE */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white hover:text-cyan-400 transition"
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

            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                // X Icon
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
              ) : (
                // Hamburger Icon
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-16 md:top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-zinc-800/50 lg:hidden transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          {/* LINKS */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-zinc-300 hover:text-cyan-400 font-bold py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all"
          >
            Productos
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsMenuOpen(false)}
            className="block text-zinc-300 hover:text-cyan-400 font-bold py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all"
          >
            Nosotros
          </Link>

          {/* AUTH BUTTONS MOBILE */}
          <div className="pt-4 border-t border-zinc-800">
            <AuthNav />
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: "4rem" }}
        />
      )}
    </>
  );
}