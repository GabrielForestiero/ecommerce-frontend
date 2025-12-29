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
      className={`mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
        isLoading
          ? "bg-emerald-500 text-black cursor-wait"
          : added
          ? "bg-emerald-600 text-white cursor-default scale-105"
          : "bg-emerald-500 hover:bg-emerald-600 text-black hover:scale-105"
      }`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Agregando...
        </span>
      ) : added ? (
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Agregado
        </span>
      ) : (
        "Agregar al carrito"
      )}
    </button>
  );
}