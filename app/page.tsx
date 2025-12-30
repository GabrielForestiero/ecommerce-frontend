import { ProductCard } from "./components/ProductCard";
import { HeroScene } from "./components/HeroScene";
import { ProductsCarousel } from "./components/ProductsCarrousel";
import { getProducts } from "./services/products";
import { Product } from "./types/product";
import { Footer } from "./components/Footer";
import { AddToCartButton } from "./product/[id]/AddToCartButton";

export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - POTENCIA TU DÍA - Full Viewport Height */}
      <section className="relative overflow-hidden h-screen">
        {/* Fondo con gradiente dinámico */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-cyan-950/40" />

        {/* Efectos de luz radial */}
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
          {/* Rayos laterales izquierdos */}
          <svg className="absolute top-10 left-8 w-28 h-60" viewBox="0 0 100 200">
            <path
              d="M50 0 L45 60 L55 60 L40 120 L50 120 L35 200"
              fill="none"
              stroke="url(#lightning-gradient-left-1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-left-1)"
            />
            <defs>
              <linearGradient id="lightning-gradient-left-1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow-left-1">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <svg className="absolute top-1/3 left-4 w-32 h-56" viewBox="0 0 100 200">
            <path
              d="M50 0 L40 50 L55 50 L35 120 L48 120 L30 200"
              fill="none"
              stroke="url(#lightning-gradient-left-2)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-left-2)"
            />
            <defs>
              <linearGradient id="lightning-gradient-left-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
              </linearGradient>
              <filter id="glow-left-2">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <svg className="absolute bottom-24 left-12 w-30 h-52" viewBox="0 0 100 200">
            <path
              d="M50 0 L55 55 L40 55 L50 110 L35 110 L45 200"
              fill="none"
              stroke="url(#lightning-gradient-left-3)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-left-3)"
            />
            <defs>
              <linearGradient id="lightning-gradient-left-3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow-left-3">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Rayos centrales */}
          <svg className="absolute top-10 left-1/4 w-32 h-64" viewBox="0 0 100 200">
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
              <linearGradient id="lightning-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
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

          <svg className="absolute top-32 right-1/4 w-40 h-72" viewBox="0 0 100 200">
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
              <linearGradient id="lightning-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
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

          <svg className="absolute bottom-20 left-1/3 w-36 h-56" viewBox="0 0 100 200">
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
              <linearGradient id="lightning-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
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

          {/* Rayos laterales derechos */}
          <svg className="absolute top-16 right-8 w-28 h-60" viewBox="0 0 100 200">
            <path
              d="M50 0 L55 60 L45 60 L60 120 L50 120 L65 200"
              fill="none"
              stroke="url(#lightning-gradient-right-1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-right-1)"
            />
            <defs>
              <linearGradient id="lightning-gradient-right-1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow-right-1">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <svg className="absolute top-1/3 right-4 w-32 h-58" viewBox="0 0 100 200">
            <path
              d="M50 0 L60 50 L45 50 L65 120 L52 120 L70 200"
              fill="none"
              stroke="url(#lightning-gradient-right-2)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-right-2)"
            />
            <defs>
              <linearGradient id="lightning-gradient-right-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.25" />
              </linearGradient>
              <filter id="glow-right-2">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <svg className="absolute bottom-28 right-10 w-30 h-54" viewBox="0 0 100 200">
            <path
              d="M50 0 L45 55 L60 55 L50 110 L65 110 L55 200"
              fill="none"
              stroke="url(#lightning-gradient-right-3)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-right-3)"
            />
            <defs>
              <linearGradient id="lightning-gradient-right-3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow-right-3">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Partículas flotantes */}
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
        </div>

        {/* Contenido Centrado - Full Height */}
        <div className="relative h-full flex items-center justify-center px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 z-10 w-full py-8">
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
            <div className="space-y-3 md:space-y-4 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight">
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

              <div className="flex items-center justify-center gap-3">
                <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-purple-400 to-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              </div>
            </div>

            {/* Descripción mejorada */}
            <div className="space-y-2 max-w-2xl">
              <p className="text-zinc-300 text-base md:text-lg lg:text-xl font-light leading-relaxed">
                Descubre nuestra línea completa de bebidas energéticas premium.
                <span className="block mt-2 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-semibold">
                  Diseñadas para impulsar tu día al máximo.
                </span>
              </p>
            </div>

            {/* Stats con efecto glassmorphism */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2">
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-3 md:p-4 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
                <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 to-cyan-300 text-transparent bg-clip-text">
                  +1000
                </div>
                <div className="text-zinc-400 text-xs font-medium mt-0.5">
                  Clientes
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-3 md:p-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
                <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-400 to-purple-300 text-transparent bg-clip-text">
                  24/7
                </div>
                <div className="text-zinc-400 text-xs font-medium mt-0.5">
                  Disponible
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-3 md:p-4 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-300">
                <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-pink-400 to-pink-300 text-transparent bg-clip-text">
                  100%
                </div>
                <div className="text-zinc-400 text-xs font-medium mt-0.5">
                  Premium
                </div>
              </div>
            </div>

            {/* CTAs mejorados */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4">
              <a
                href="#featured-product"
                className="group relative px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-sm md:text-base font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Descubre Nuestro Destacado
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

              <a
                href="#productos"
                className="px-5 md:px-6 py-2.5 md:py-3 rounded-xl border-2 border-zinc-700 text-white text-sm md:text-base font-bold hover:bg-white/10 hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 backdrop-blur-xl"
              >
                Ver Colección Completa
              </a>
            </div>
          </div>
        </div>

        {/* Fade out al final */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </section>

      {/* Featured Product Section con HeroScene */}
      <section
        id="featured-product"
        className="relative overflow-hidden min-h-[700px] md:min-h-[800px] py-16 md:py-24"
      >
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/80 to-black" />

        {/* Efectos de luz sutiles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px]" />
        </div>

        <div className="relative px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda - HeroScene */}
            <div className="relative h-[500px] md:h-[650px] lg:h-[700px] order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl" />
              <HeroScene />
            </div>

            {/* Columna Derecha - Información del Producto */}
            <div className="space-y-6 z-10 order-1 lg:order-2">
              {/* Badge de producto destacado */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-purple-400/40 backdrop-blur-xl">
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-purple-300 text-xs font-bold tracking-wider uppercase">
                  Producto Destacado
                </span>
              </div>

              {/* Nombre del producto */}
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                    Arcane
                  </span>{" "}
                  <span className="text-white">Blast</span>
                </h2>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <span>Sabor Original</span>
                  <span>•</span>
                  <span>500ml</span>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                Nuestra bebida energética insignia, formulada con ingredientes premium para brindarte la energía que necesitas. 
                <span className="block mt-2 text-cyan-400 font-semibold">
                  Perfecta para cualquier momento del día.
                </span>
              </p>

              {/* Características destacadas
              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <div className="text-cyan-400 text-sm font-bold mb-1">Energía</div>
                  <div className="text-white text-2xl font-black">160mg</div>
                  <div className="text-zinc-500 text-xs mt-1">Cafeína</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-purple-400 text-sm font-bold mb-1">Vitaminas</div>
                  <div className="text-white text-2xl font-black">B12+</div>
                  <div className="text-zinc-500 text-xs mt-1">Complejo B</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-pink-500/20">
                  <div className="text-pink-400 text-sm font-bold mb-1">Calorías</div>
                  <div className="text-white text-2xl font-black">110</div>
                  <div className="text-zinc-500 text-xs mt-1">Por lata</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <div className="text-cyan-400 text-sm font-bold mb-1">Duración</div>
                  <div className="text-white text-2xl font-black">4-6h</div>
                  <div className="text-zinc-500 text-xs mt-1">Efecto</div>
                </div>
              </div> */}

              {/* Beneficios */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Aumento inmediato de energía y concentración</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Sin azúcar añadido, sabor natural</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Vitaminas esenciales para tu bienestar</span>
                </div>
              </div>

              {/* Precio y CTA */}
              <div className="flex items-center gap-4 pt-4">
                <div>
                  <div className="text-zinc-500 text-sm line-through">2000</div>
                  <div className="text-3xl font-black text-white">
                    $<span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">1700</span>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos completos - Carrusel con Embla */}
      <ProductsCarousel products={products} />
      <Footer></Footer>
    </main>
  );
}