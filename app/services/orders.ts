import { CartItem } from "../store/cartStore";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:3000";

export async function createOrder(items: CartItem[]) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  return res.json();
}
