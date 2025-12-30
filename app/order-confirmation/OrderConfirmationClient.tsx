"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const BANK_DATA = {
    cvu: "0000003100012345678901",
    alias: "RAYNIX.ENERGY.MP",
    titular: "Raynix Energy S.A.",
    email: "pagos@raynixenergy.com",
  };

  useEffect(() => {
    if (!orderId) {
      router.push("/cart");
    }
  }, [orderId, router]);

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!orderId) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            ¡Orden Creada Exitosamente!
          </h1>
          <p className="text-gray-600 text-lg">
            Tu número de orden es:{" "}
            <span className="font-bold text-purple-600">#{orderId}</span>
          </p>
        </div>

        {/* Datos de Transferencia */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">💳</span>
              Datos para realizar la transferencia
            </h2>
            <p className="text-purple-100 mt-2">
              Realizá la transferencia a la siguiente cuenta
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* CVU */}
            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">CVU</p>
                <p className="text-gray-900 font-mono text-lg font-bold">
                  {BANK_DATA.cvu}
                </p>
              </div>
              <button
                onClick={() => handleCopy(BANK_DATA.cvu, "cvu")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  copied === "cvu"
                    ? "bg-green-500 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {copied === "cvu" ? "✓ Copiado" : "Copiar"}
              </button>
            </div>

            {/* Alias */}
            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Alias</p>
                <p className="text-gray-900 font-mono text-xl font-bold">
                  {BANK_DATA.alias}
                </p>
              </div>
              <button
                onClick={() => handleCopy(BANK_DATA.alias, "alias")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  copied === "alias"
                    ? "bg-green-500 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {copied === "alias" ? "✓ Copiado" : "Copiar"}
              </button>
            </div>

            {/* Titular */}
            <div className="p-5 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Titular de la cuenta
              </p>
              <p className="text-gray-900 text-lg font-semibold">
                {BANK_DATA.titular}
              </p>
            </div>

            {/* Monto */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
              <p className="text-gray-700 text-sm font-medium mb-2">
                Monto a transferir
              </p>
              <p className="text-purple-600 text-4xl font-bold">
                ${amount}
              </p>
            </div>
          </div>
        </div>

        {/* Envío de comprobante */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8 mb-6">
          <h3 className="text-yellow-900 font-bold text-2xl mb-4">
            📧 Enviá el comprobante de pago
          </h3>

          <a
            href={`mailto:${BANK_DATA.email}?subject=Comprobante Orden ${orderId}&body=Hola,%0D%0A%0D%0AAdjunto el comprobante de pago para la orden ${orderId}%0D%0A%0D%0AMonto: $${amount}%0D%0A%0D%0ASaludos`}
            className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-6 py-4 rounded-xl"
          >
            Abrir cliente de email
          </a>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl text-center"
          >
            Volver a la tienda
          </Link>

          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl"
          >
            🖨️ Imprimir confirmación
          </button>
        </div>
      </div>
    </main>
  );
}
