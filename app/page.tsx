import { ProductCard } from "./components/ProductCard";
import { getProducts } from "./services/products";
import { Product } from "./types/product";

export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Efectos de fondo dinámicos */}
        <div className="absolute inset-0">
          {/* Gradientes de colores vibrantes */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        <div className="relative px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-300 text-sm font-bold tracking-wide">NUEVA COLECCIÓN 2025</span>
            </div>

            {/* Título principal - MÁS GRANDE Y DRAMÁTICO */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                  POTENCIA
                </span>
                <span className="block text-white mt-2">
                  TU DÍA
                </span>
              </h1>
              
              {/* Línea decorativa animada */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              </div>
            </div>

            {/* Descripción con mejor jerarquía */}
            <p className="text-zinc-300 text-xl md:text-2xl max-w-3xl mx-auto font-light">
              Impulsa tu rendimiento con nuestra línea premium de bebidas energéticas.
              <span className="block mt-2 text-cyan-400 font-semibold">Máxima energía, sabor explosivo.</span>
            </p>

            {/* Stats rápidos */}
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">+1000</div>
                <div className="text-zinc-500 text-sm mt-1">Clientes felices</div>
              </div>
              <div className="h-12 w-px bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">24/7</div>
                <div className="text-zinc-500 text-sm mt-1">Energía disponible</div>
              </div>
              <div className="h-12 w-px bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent bg-clip-text">100%</div>
                <div className="text-zinc-500 text-sm mt-1">Calidad premium</div>
              </div>
            </div>

            {/* CTA Buttons - más grandes y llamativos */}
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <a 
                href="#productos" 
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-lg font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explorar Productos
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              <button className="px-8 py-4 rounded-xl border-2 border-zinc-600 text-white text-lg font-bold hover:bg-white/5 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm">
                Ver Ofertas
              </button>
            </div>
          </div>
        </div>

        {/* Efecto de fade hacia abajo */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </section>

      {/* Sección de Productos - SIN separación visual */}
      <section id="productos" className="px-6 py-8 max-w-7xl mx-auto">
        {/* Header de sección */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Nuestros Productos
            </h2>
            <p className="text-zinc-500 text-sm">
              {products.length} bebidas disponibles
            </p>
          </div>
          
          {/* Filtros (opcional - puedes implementarlos después) */}
          <div className="hidden md:flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-zinc-800/50 text-white text-sm hover:bg-zinc-700/50 transition-colors">
              Todos
            </button>
            <button className="px-4 py-2 rounded-lg text-zinc-400 text-sm hover:bg-zinc-800/50 transition-colors">
              Más Vendidos
            </button>
            <button className="px-4 py-2 rounded-lg text-zinc-400 text-sm hover:bg-zinc-800/50 transition-colors">
              Ofertas
            </button>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-zinc-500">
              Vuelve pronto para ver nuestras bebidas energéticas
            </p>
          </div>
        )}
      </section>
    </main>
  );
}