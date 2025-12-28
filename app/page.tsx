import { ProductCard } from "./components/ProductCard";
import { HeroScene } from "./components/HeroScene";
import { getProducts } from "./services/products";
import { Product } from "./types/product";

export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - Split Screen */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px] pt-20">
        {/* Fondo con gradiente dinámico */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-cyan-950/40" />

        {/* Efectos de luz radial - ajustados para mobile */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 md:left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/30 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 md:right-1/3 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-purple-600/25 rounded-full blur-[120px] md:blur-[180px] animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-pink-500/20 rounded-full blur-[100px] md:blur-[120px] animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Efectos de relámpagos */}
        <div className="absolute inset-0 opacity-50">
          {/* Relámpago 1 - superior izquierdo */}
          <svg
            className="absolute top-10 left-1/4 w-32 h-64"
            viewBox="0 0 100 200"
          >
            <path
              d="M50 0 L45 60 L55 60 L40 120 L50 120 L35 200"
              fill="none"
              stroke="url(#lightning-gradient-1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            <defs>
              <linearGradient
                id="lightning-gradient-1"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Relámpago 2 - centro derecha */}
          <svg
            className="absolute top-32 right-1/4 w-40 h-72"
            viewBox="0 0 100 200"
          >
            <path
              d="M50 0 L60 50 L45 50 L55 100 L40 100 L50 150 L35 200"
              fill="none"
              stroke="url(#lightning-gradient-2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow2)"
            />
            <defs>
              <linearGradient
                id="lightning-gradient-2"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Relámpago 3 - inferior centro */}
          <svg
            className="absolute bottom-20 left-1/3 w-36 h-56"
            viewBox="0 0 100 200"
          >
            <path
              d="M50 0 L40 70 L55 70 L45 130 L58 130 L40 200"
              fill="none"
              stroke="url(#lightning-gradient-3)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow3)"
            />
            <defs>
              <linearGradient
                id="lightning-gradient-3"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow3">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Relámpago 4 - pequeño superior derecho */}
          <svg
            className="absolute top-20 right-1/3 w-24 h-48"
            viewBox="0 0 100 200"
          >
            <path
              d="M50 0 L45 80 L58 80 L40 160 L50 160 L38 200"
              fill="none"
              stroke="url(#lightning-gradient-4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow4)"
            />
            <defs>
              <linearGradient
                id="lightning-gradient-4"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow4">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Resplandor de energía de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s", animationDelay: "1.5s" }}
          />
        </div>

        {/* Partículas flotantes - reducidas en mobile */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          <div
            className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute top-40 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-40"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping opacity-50"
            style={{ animationDuration: "5s", animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-60"
            style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
          />
        </div>

        <div className="relative px-4 md:px-6 py-8 md:py-16 lg:py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[500px] md:min-h-[600px]">
            {/* Columna Izquierda - Contenido */}
            <div className="space-y-8 z-10">
              {/* Badge superior con efecto neón */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-400/40 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </span>
                <span className="text-cyan-300 text-xs font-bold tracking-wider uppercase">
                  Nueva Colección 2025
                </span>
              </div>

              {/* Título con efectos */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  <span
                    className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse"
                    style={{ animationDuration: "3s" }}
                  >
                    POTENCIA
                  </span>
                  <span className="block text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    TU DÍA
                  </span>
                </h1>

                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-purple-400 to-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </div>
              </div>

              {/* Descripción mejorada */}
              <div className="space-y-2">
                <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed">
                  Descubre nuestra línea completa de bebidas energéticas
                  premium.
                  <span className="block mt-2 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-semibold">
                    Diseñadas para impulsar tu día al máximo.
                  </span>
                </p>
              </div>

              {/* Stats con efecto glassmorphism */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
                  <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-cyan-300 text-transparent bg-clip-text">
                    +1000
                  </div>
                  <div className="text-zinc-400 text-xs font-medium mt-0.5">
                    Clientes
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
                  <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-purple-300 text-transparent bg-clip-text">
                    24/7
                  </div>
                  <div className="text-zinc-400 text-xs font-medium mt-0.5">
                    Disponible
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-300">
                  <div className="text-2xl font-black bg-gradient-to-r from-pink-400 to-pink-300 text-transparent bg-clip-text">
                    100%
                  </div>
                  <div className="text-zinc-400 text-xs font-medium mt-0.5">
                    Premium
                  </div>
                </div>
              </div>

              {/* CTAs mejorados */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#productos"
                  className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-base font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    Ver Colección Completa
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>

                <button className="px-6 py-3 rounded-xl border-2 border-zinc-700 text-white text-base font-bold hover:bg-white/10 hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 backdrop-blur-xl">
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Columna Derecha - 3D limpio */}
            {/* Columna Derecha - 3D limpio */}
            <div className="relative h-[450px] md:h-[650px] lg:h-[750px]">
              {/* Resplandor sutil detrás */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl" />

              <HeroScene />
            </div>
          </div>
        </div>

        {/* Fade out al final */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </section>

      {/* Productos con fondo mejorado */}
      <section
        id="productos"
        className="relative px-4 md:px-6 py-12 md:py-16 max-w-7xl mx-auto"
      >
        {/* Fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/50 to-black -z-10" />

        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
              Nuestros Productos
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm">
              {products.length} bebidas disponibles
            </p>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
