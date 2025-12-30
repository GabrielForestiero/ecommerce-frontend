"use client";

import { useState } from "react";
import { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setIsLoading(true);

    // Simula un pequeño delay para la animación de carga
    setTimeout(() => {
      addToCart(product); // Agrega al carrito y abre el drawer
      setIsLoading(false);
      setAdded(true);

      // Vuelve al estado normal después de 1.5s
      setTimeout(() => {
        setAdded(false);
      }, 1500);
    }, 600); // 600ms de carga
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isLoading || added}
      className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
        isLoading
          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white cursor-wait"
          : added
          ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white cursor-default scale-105 shadow-lg shadow-cyan-500/50"
          : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
      }`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Agregando al carrito...
        </>
      ) : added ? (
        <>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          ¡Agregado al carrito!
        </>
      ) : (
        <>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar al carrito
        </>
      )}
    </button>
  );
}