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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-zinc-700/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-all duration-300"
        >
          <div className="relative">
            {/* Efecto de resplandor */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Icono con gradiente */}
            <span className="relative text-2xl group-hover:scale-110 transition-transform duration-300 inline-block">
              ⚡
            </span>
          </div>
          
          <span className="text-xl font-black bg-gradient-to-r from-white to-zinc-400 group-hover:from-cyan-400 group-hover:to-purple-400 text-transparent bg-clip-text transition-all duration-300">
            EnergyStore
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Links opcionales - puedes agregar más */}
          <Link
            href="/"
            className="hidden md:block text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Productos
          </Link>
          
          <Link
            href="/ofertas"
            className="hidden md:block text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Ofertas
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-cyan-600 hover:to-purple-600 border border-zinc-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            {/* Icono del carrito */}
            <div className="relative">
              <svg 
                className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" 
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

              {/* Badge de cantidad */}
              {hasHydrated && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-black rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Texto */}
            <span className="text-white text-sm font-semibold hidden sm:inline">
              Carrito
            </span>
          </Link>
        </div>
      </div>

      {/* Barra de gradiente decorativa */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </nav>
  );
}