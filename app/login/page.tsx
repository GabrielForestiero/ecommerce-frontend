"use client";

import { useState } from "react";
import { login as loginApi, getMe } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const result = await loginApi(email, password);

    if ("error" in result) {
      if (result.error === "INVALID_CREDENTIALS") {
        setError("Email o contraseña incorrectos");
      } else {
        setError("Ocurrió un error. Intentá nuevamente.");
      }
      return;
    }

    const { token } = result;

    const user = await getMe(token);
    setAuth(token, user);
    router.push("/");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-white">
          Iniciar sesión
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
