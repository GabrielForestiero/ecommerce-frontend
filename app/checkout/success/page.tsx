import Link from "next/link";

type Props = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccess({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center px-6 py-10">
      <div className="max-w-2xl w-full">
        {/* Animación de éxito */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Card principal */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 border-b border-zinc-800 p-8 text-center">
            <h1 className="text-4xl font-black text-white mb-2">
              ¡Compra Exitosa!
            </h1>
            <p className="text-zinc-400 text-lg">
              Tu pedido ha sido confirmado y está siendo procesado
            </p>
          </div>

          {/* Contenido */}
          <div className="p-8 space-y-6">
            {/* Info de la orden */}
            {orderId && (
              <div className="bg-zinc-800/30 rounded-xl border border-zinc-700 p-6 space-y-3">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Número de orden</span>
                </div>
                <div className="font-mono text-2xl font-bold text-white tracking-wider break-all">
                  {orderId}
                </div>
                <p className="text-xs text-zinc-500">
                  Guarda este número para hacer seguimiento de tu pedido
                </p>
              </div>
            )}

            {/* Qué sigue */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ¿Qué sigue?
              </h2>
              
              <div className="space-y-3">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-800/20 border border-zinc-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Confirmación por email</h3>
                    <p className="text-zinc-400 text-sm">
                      Recibirás un correo con los detalles de tu pedido en los próximos minutos
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-800/20 border border-zinc-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Preparación del pedido</h3>
                    <p className="text-zinc-400 text-sm">
                      Nuestro equipo preparará tu orden con el mayor cuidado
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-800/20 border border-zinc-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Envío a tu domicilio</h3>
                    <p className="text-zinc-400 text-sm">
                      Recibirás tu pedido en 24-48 horas hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info adicional */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex gap-3">
              <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-cyan-200">
                <span className="font-semibold">Tip:</span> Revisa tu correo electrónico (incluyendo spam) para ver todos los detalles de tu compra y el seguimiento del envío.
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Volver a la tienda
              </Link>
            </div>
          </div>
        </div>

        {/* Footer con ayuda */}
        <div className="text-center mt-8 text-zinc-500 text-sm">
          <p>¿Necesitas ayuda? Contáctanos en <a href="mailto:soporte@energystore.com" className="text-cyan-400 hover:underline">soporte@energystore.com</a></p>
        </div>
      </div>
    </main>
  );
}