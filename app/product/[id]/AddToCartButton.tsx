"use client";

import { useState } from "react";
import { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);

    // vuelve al estado normal después de 1.5s
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`mt-6 px-6 py-3 rounded-xl font-semibold transition ${
        added
          ? "bg-emerald-700 text-white cursor-default"
          : "bg-emerald-500 hover:bg-emerald-600 text-black"
      }`}
    >
      {added ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
