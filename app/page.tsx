import { ProductCard } from "./components/ProductCard";
import { getProducts } from "./services/products";
import { Product } from "./types/product";

export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">
        Productos
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
