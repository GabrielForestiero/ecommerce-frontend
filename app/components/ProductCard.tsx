"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "../types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative h-full flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full">
        <div className="relative flex items-center justify-center py-8 overflow-visible min-h-[400px]">
          <div className="absolute bottom-8 w-40 h-6 bg-gray-900/5 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-500"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-pink-400/10 blur-3xl"></div>
          </div>

          <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3">
            <img
              src={product.imageURL}
              alt={product.name}
              className="h-80 w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-2">
        <h3 className="text-gray-900 font-bold text-xl text-center line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300 min-h-[3rem] leading-tight uppercase tracking-wide">
          {product.name}
        </h3>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"></div>
    </Link>
  );
}
