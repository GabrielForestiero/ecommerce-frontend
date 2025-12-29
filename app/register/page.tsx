"use client";

import { useState } from "react";
import { register as registerApi } from "../services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await registerApi(email, password, name);
      router.push("/login");
    } catch {
      setError("No se pudo crear la cuenta");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form className="bg-zinc-900 p-8 rounded-xl w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>

        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        {error && <p className="text-red-400">{error}</p>}

        <button className="w-full py-3 bg-emerald-600 rounded text-white">
          Registrarse
        </button>
      </form>
    </main>
  );
}
