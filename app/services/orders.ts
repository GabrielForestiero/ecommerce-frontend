import { CartItem } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:3000";

export async function createOrder(items: CartItem[]) {
  // 👇 TOMAMOS EL TOKEN ACTUAL
  const { token } = useAuthStore.getState();

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
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

export async function getMyOrders(token: string) {
  const res = await fetch(`${API_URL}/orders/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("NOT_AUTHENTICATED");
  }

  return res.json();
}
