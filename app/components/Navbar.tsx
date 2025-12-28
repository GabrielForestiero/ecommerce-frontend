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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-cyan-500/10">
      {/* Resplandor superior */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <div className="relative">
            {/* Efecto de resplandor animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
            
            {/* Círculo de fondo */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 text-transparent bg-clip-text transition-all duration-300">
              EnergyStore
            </span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-wider">
              PREMIUM DRINKS
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Links con efecto hover mejorado */}
          <Link
            href="/"
            className="hidden md:block relative text-zinc-400 hover:text-cyan-400 text-sm font-semibold transition-colors duration-300 group/link"
          >
            <span className="relative z-10">Productos</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover/link:w-full transition-all duration-300 rounded-full" />
          </Link>
          
          <Link
            href="/ofertas"
            className="hidden md:block relative group/link"
          >
            <span className="relative z-10 text-zinc-400 hover:text-purple-400 text-sm font-semibold transition-colors duration-300">
              Ofertas
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:w-full transition-all duration-300 rounded-full" />
            
            {/* Badge "Hot" */}
            <span className="absolute -top-2 -right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.6)]">
              HOT
            </span>
          </Link>

          {/* Cart Button Premium */}
          <Link
            href="/cart"
            className="group/cart relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 hover:from-cyan-600 hover:to-purple-600 border border-zinc-700/50 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-xl"
          >
            {/* Resplandor interno */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover/cart:from-cyan-500/20 group-hover/cart:via-purple-500/20 group-hover/cart:to-pink-500/20 rounded-xl transition-all duration-300" />
            
            {/* Icono del carrito */}
            <div className="relative z-10">
              <svg 
                className="w-5 h-5 text-zinc-300 group-hover/cart:text-white transition-all duration-300 group-hover/cart:scale-110" 
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

              {/* Badge de cantidad mejorado */}
              {hasHydrated && totalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white text-[10px] font-black rounded-full min-w-[1.35rem] h-[1.35rem] flex items-center justify-center px-1 shadow-[0_0_15px_rgba(168,85,247,0.8)] ring-2 ring-black">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Texto */}
            <span className="relative z-10 text-zinc-300 group-hover/cart:text-white text-sm font-bold hidden sm:inline transition-colors duration-300">
              Carrito
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}