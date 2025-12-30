"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const BANK_DATA = {
    cvu: "0000003100012345678901",
    alias: "RAYNIX.ENERGY.MP",
    titular: "Raynix Energy S.A.",
    email: "pagos@raynixenergy.com"
  };

  useEffect(() => {
    // Si no hay orderId, redirigir al carrito
    if (!orderId) {
      router.push("/cart");
    }
  }, [orderId, router]);

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!orderId) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header de Confirmación */}
        <div className="text-center mb-8">
        
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            ¡Orden Creada Exitosamente!
          </h1>
          <p className="text-gray-600 text-lg">
            Tu número de orden es: <span className="font-bold text-purple-600">#{orderId}</span>
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
            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">CVU</p>
                <p className="text-gray-900 font-mono text-lg font-bold">
                  {BANK_DATA.cvu}
                </p>
              </div>
              <button
                onClick={() => handleCopy(BANK_DATA.cvu, "cvu")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  copied === "cvu"
                    ? "bg-green-500 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {copied === "cvu" ? "✓ Copiado" : "Copiar"}
              </button>
            </div>

            {/* Alias */}
            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Alias</p>
                <p className="text-gray-900 font-mono text-xl font-bold">
                  {BANK_DATA.alias}
                </p>
              </div>
              <button
                onClick={() => handleCopy(BANK_DATA.alias, "alias")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
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
              <p className="text-gray-600 text-sm font-medium mb-1">Titular de la cuenta</p>
              <p className="text-gray-900 text-lg font-semibold">
                {BANK_DATA.titular}
              </p>
            </div>

            {/* Monto */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
              <p className="text-gray-700 text-sm font-medium mb-2">Monto a transferir</p>
              <p className="text-purple-600 text-4xl font-bold">
                ${amount}
              </p>
            </div>
          </div>
        </div>

        {/* Instrucciones para enviar comprobante */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">📧</span>
            <div className="flex-1">
              <h3 className="text-yellow-900 font-bold text-2xl mb-2">
                Siguiente paso: Enviá el comprobante
              </h3>
              <p className="text-yellow-800 mb-4">
                Una vez realizada la transferencia, envianos el comprobante de pago por email
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Para:</p>
                <p className="text-gray-900 font-semibold">{BANK_DATA.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Asunto:</p>
                <p className="text-gray-900 font-semibold">Comprobante Orden #{orderId}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm mb-3">
                <strong>Recordá incluir:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Captura o foto del comprobante de transferencia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Número de orden: #{orderId}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Monto transferido: ${amount}</span>
                </li>
              </ul>
            </div>

            <a
              href={`mailto:${BANK_DATA.email}?subject=Comprobante Orden ${orderId}&body=Hola,%0D%0A%0D%0AAdjunto el comprobante de pago para la orden ${orderId}%0D%0A%0D%0AMonto: $${amount}%0D%0A%0D%0ASaludos`}
              className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-6 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              📧 Abrir cliente de email
            </a>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h4 className="text-blue-900 font-bold text-lg mb-2">
                ¿Qué pasa después?
              </h4>
              <ul className="text-blue-800 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>Recibimos y verificamos tu comprobante de pago</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>Confirmamos tu orden por email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>Procesamos y enviamos tu pedido</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl text-center"
          >
            Volver a la tienda
          </Link>
          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all text-center"
          >
            🖨️ Imprimir confirmación
          </button>
        </div>
      </div>
    </main>
  );
}