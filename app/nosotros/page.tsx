"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="relative pt-32 pb-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/products/logosvg.svg"
            alt="Raynix Logo"
            className="w-48 h-48 object-contain mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              SOMOS RAYNIX ENERGY
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed">
            No somos una bebida más. Somos el impulso que necesitás para
            conquistar cada día.
          </p>
        </div>
      </section>

      <section className="relative py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-10">
            Nuestros Valores
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500 transition-all group">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                <svg
                  className="w-7 h-7 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Energía Sin Límites
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Creemos en potenciar cada momento. Nuestras bebidas están
                diseñadas para darte el impulso que necesitás, cuando lo
                necesitás.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-all group">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all">
                <svg
                  className="w-7 h-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Innovación Constante
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                No nos quedamos quietos. Experimentamos con sabores únicos y
                buscamos constantemente mejorar nuestras fórmulas.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500 transition-all group">
              <div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all">
                <svg
                  className="w-7 h-7 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Comunidad Auténtica
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Raynix es más que una marca, es una tribu. Valoramos a cada
                persona que confía en nosotros para dar lo mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-center text-white mb-16">
            ¿Qué Nos Hace Diferentes?
          </h2>

          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-start gap-4 hover:border-cyan-500 transition-all">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-cyan-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sabores Únicos e Intensos
                </h3>
                <p className="text-zinc-400">
                  Nuestras fórmulas están diseñadas para impactar. Cada sabor
                  cuenta una historia y ofrece una experiencia sensorial
                  diferente.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-start gap-4 hover:border-purple-500 transition-all">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Identidad Visual Potente
                </h3>
                <p className="text-zinc-400">
                  Cada lata es una obra de arte. Nuestro diseño refleja la
                  intensidad y la actitud de nuestra marca.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-start gap-4 hover:border-pink-500 transition-all">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-pink-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  100% Argentino
                </h3>
                <p className="text-zinc-400">
                  Nacimos en Buenos Aires y estamos orgullosos de ser una marca
                  nacional que compite con las grandes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Unite a la Revolución Energética
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Probá Raynix y sentí la diferencia. Tu próximo nivel te está
            esperando.
          </p>
        </div>
      </section>
    </main>
  );
}
