import Link from "next/link";
import { getProductById } from "../../services/products";
import { AddToCartButton } from "./AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border border-gray-200 mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
          <p className="text-gray-500">El producto que buscas no existe o fue eliminado.</p>
          <Link 
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-cyan-600 transition-colors">
              Inicio
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/#productos" className="text-gray-500 hover:text-cyan-600 transition-colors">
              Productos
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Columna izquierda - Imagen sin card */}
          <div className="relative">
            {/* Badge flotante */}
            <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold shadow-xl">
              ⚡ Nuevo
            </div>

            {/* Imagen de la lata sin contenedor */}
            <div className="relative flex items-center justify-center py-12 min-h-[500px]">
              {/* Resplandor de fondo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-pink-400/10 blur-3xl"></div>
              </div>
              
              {/* Sombra debajo de la lata */}
              <div className="absolute bottom-12 w-64 h-12 bg-gray-900/5 rounded-full blur-2xl"></div>
              
              {/* Lata */}
              <img
                src={product.imageURL}
                alt={product.name}
                className="relative w-full h-auto max-h-[500px] object-contain mx-auto drop-shadow-2xl z-10"
              />
            </div>

            {/* Features rápidos */}
           
          </div>

          {/* Columna derecha - Información */}
          <div className="flex flex-col gap-6 lg:pt-8">
            {/* Título y badge de categoría */}
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-semibold">
                Bebida Energética
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.longDescription}
            </p>

            {/* Separador */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Precio */}
            <div className="space-y-2">
              <span className="text-gray-500 text-sm block font-medium">Precio</span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                  ${product.price}
                </span>
                <span className="text-gray-400 text-lg line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                En stock - Envío inmediato
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3 pt-4">
              <AddToCartButton product={product} />
              
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favoritos
                </button>
                <button className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}