const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401) {
    return { error: "INVALID_CREDENTIALS" };
  }

  if (!res.ok) {
    return { error: "SERVER_ERROR" };
  }

  const data = await res.json();
  return { token: data.token };
}


export async function register(
  email: string,
  password: string,
  name?: string
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }

  return res.json();
}
 
export async function getMe(token: string) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json(); // { id, email, name }
}
