import { getProductById } from "../../services/products";
import { AddToCartButton } from "./AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="text-white p-10">
        Producto no encontrado
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src={product.imageURL}
          alt={product.name}
          className="max-h-[400px] object-contain mx-auto"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white">
            {product.name}
          </h1>

          <p className="text-zinc-400">
            {product.description}
          </p>

          <span className="text-3xl font-bold text-emerald-400">
            ${product.price}
          </span>

          {/* 👇 BOTÓN CLIENTE */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
