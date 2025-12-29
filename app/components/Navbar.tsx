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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800/50">
      {/* Resplandor superior */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 md:gap-4 transition-all duration-300"
        >
          {/* Logo con Glow */}
          <div className="relative flex items-center justify-center w-16 h-16 md:w-45 md:h-45">
  <div className="absolute inset-0  blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-150" />

  <img
    src="/products/logosvg.svg"
    alt="EnergyStore Logo"
    className="w-[85%] h-[85%] object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
  />
</div>

          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 text-transparent bg-clip-text transition-all duration-300">
              EnergyStore
            </span>
            <span className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">
              Premium Drinks
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Links con efecto hover mejorado */}
          <Link
            href="/"
            className="hidden md:flex relative text-zinc-400 hover:text-cyan-400 text-base font-bold transition-colors duration-300 group/link items-center gap-2"
          >
            <span className="relative z-10">Productos</span>
            <span className="absolute -bottom-1.5 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 group-hover/link:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          </Link>
          
          <Link
            href="/about"
            className="hidden lg:flex relative text-zinc-400 hover:text-purple-400 text-base font-bold transition-colors duration-300 group/link items-center gap-2"
          >
            <span className="relative z-10">Nosotros</span>
            <span className="absolute -bottom-1.5 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          </Link>

          {/* Cart Button Premium - Más grande */}
          <Link
            href="/cart"
            className="group/cart relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 hover:from-cyan-600 hover:to-purple-600 border-2 border-zinc-700/50 hover:border-cyan-400/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] backdrop-blur-xl hover:scale-105"
          >
            {/* Resplandor interno */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover/cart:from-cyan-500/30 group-hover/cart:via-purple-500/30 group-hover/cart:to-pink-500/30 rounded-2xl transition-all duration-300" />
            
            {/* Icono del carrito - Más grande */}
            <svg 
              className="w-6 h-6 md:w-7 md:h-7 text-zinc-300 group-hover/cart:text-white transition-all duration-300 group-hover/cart:scale-110 relative z-10" 
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

            {/* Badge de cantidad - Más grande y visible */}
            {hasHydrated && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white text-xs md:text-sm font-black rounded-full min-w-[1.5rem] md:min-w-[1.75rem] h-6 md:h-7 flex items-center justify-center px-1.5 shadow-[0_0_20px_rgba(168,85,247,0.9)] ring-2 ring-black animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Línea de gradiente inferior */}
     
    </nav>
  );
}