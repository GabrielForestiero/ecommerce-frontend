/* eslint-disable @typescript-eslint/no-explicit-any */

export const dynamic = 'force-dynamic';

export default async function Page() {
  const API = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const response = await fetch(`${API}/products`, {
    cache: 'no-store',
  });

  const products = await response.json();

  return (
    <div>
      <h1>Products</h1>

      {Array.isArray(products) &&
        products.map((product: any) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.imageURL} alt={product.name} width={200} />
            <h3>${product.price}</h3>
            <p>{product.description}</p>
          </div>
        ))}
    </div>
  );
}
