"use client";

import Link from "next/link";
import { useAuthStore } from "../store/authStore";

export default function AuthNav() {
  const { token, user, logout } = useAuthStore();

  // ❌ NO logueado
  if (!token) {
    return (
      <>
        <Link
          href="/login"
          className="text-zinc-400 hover:text-cyan-400 font-bold"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold"
        >
          Registrarse
        </Link>
      </>
    );
  }

  // ✅ LOGUEADO
  return (
    <>
      <Link
        href="/my-orders"
        className="text-zinc-400 hover:text-cyan-400 font-bold"
      >
        Mis órdenes
      </Link>

      <span className="text-zinc-400 text-sm font-bold">
        👤 {user?.name || user?.email || "Usuario"}
      </span>

      <button
        onClick={logout}
        className="text-red-400 hover:text-red-300 text-sm font-bold"
      >
        Logout
      </button>
    </>
  );
}
