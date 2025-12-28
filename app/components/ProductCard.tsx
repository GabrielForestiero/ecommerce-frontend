import Link from "next/link";
import { Product } from "../types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-zinc-900 p-4 rounded-xl hover:scale-[1.02] transition cursor-pointer">
        <img
          src={product.imageURL}
          alt={product.name}
          className="h-48 w-full object-contain"
        />

        <h2 className="text-white font-semibold mt-3">
          {product.name}
        </h2>

        <p className="text-emerald-400 font-bold mt-1">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
