"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); // Evita que el Link se active
    e.stopPropagation();
    
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Badge de nuevo/oferta */}
      <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Nuevo
      </div>

      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>

      {/* Contenedor de imagen con fondo - clickeable */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative bg-zinc-800/30 p-4 flex items-center justify-center h-64 overflow-hidden cursor-pointer">
          {/* Efecto de resplandor detrás de la imagen */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <img
            src={product.imageURL}
            alt={product.name}
            className="relative h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Contenido */}
      <div className="relative p-5 flex flex-col">
        {/* Nombre del producto - clickeable */}
        <Link href={`/product/${product.id}`}>
          <h2 className="text-white font-bold text-lg line-clamp-2 hover:text-cyan-400 transition-colors duration-300 min-h-[3.5rem] cursor-pointer">
            {product.name}
          </h2>
        </Link>

        {/* Descripción corta */}
        <div className="min-h-[2.5rem] mt-2">
          {product.description && (
            <p className="text-zinc-500 text-sm line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Precio */}
        <div className="mt-4 mb-4">
          <span className="text-zinc-500 text-xs block mb-1">Precio</span>
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            ${product.price}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 mt-auto">
          {/* Botón Agregar al Carrito */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-emerald-600 cursor-default"
                : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {added ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              )}
            </svg>
            <span className="hidden sm:inline">
              {added ? "Agregado" : "Agregar"}
            </span>
          </button>

          {/* Botón Ver Detalles */}
          <Link 
            href={`/product/${product.id}`}
            className="flex items-center justify-center px-4 py-2.5 rounded-lg border border-zinc-700 text-white text-sm font-semibold hover:bg-zinc-800 hover:border-cyan-500 transition-all duration-300"
            title="Ver detalles"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}