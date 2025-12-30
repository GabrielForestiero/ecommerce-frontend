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

  let product = null;
  try {
    product = await getProductById(id);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border border-gray-200 mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Producto no encontrado
          </h2>
          <p className="text-gray-500">
            El producto que buscas no existe o fue eliminado.
          </p>
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-gray-500 hover:text-cyan-600 transition-colors whitespace-nowrap"
            >
              Inicio
            </Link>
            <svg
              className="w-4 h-4 text-gray-300 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href="/#productos"
              className="text-gray-500 hover:text-cyan-600 transition-colors whitespace-nowrap"
            >
              Productos
            </Link>
            <svg
              className="w-4 h-4 text-gray-300 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative flex items-center justify-center py-6 sm:py-8 lg:py-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"></div>
              </div>

              <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 w-40 sm:w-48 lg:w-64 h-6 sm:h-8 lg:h-12 bg-gray-900/10 rounded-full blur-2xl"></div>

              <img
                src={product.imageURL}
                alt={product.name}
                className="relative w-full h-auto max-w-[280px] sm:max-w-sm lg:max-w-md max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain mx-auto drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
              <div className="text-center p-3 sm:p-4 rounded-xl bg-white border border-gray-200 hover:border-cyan-300 transition-colors">
                <div className="text-xl sm:text-2xl mb-1">⚡</div>
                <div className="text-xs font-semibold text-gray-700">
                  Energía
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-xl bg-white border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="text-xl sm:text-2xl mb-1">🎯</div>
                <div className="text-xs font-semibold text-gray-700">
                  Enfoque
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-xl bg-white border border-gray-200 hover:border-pink-300 transition-colors">
                <div className="text-xl sm:text-2xl mb-1">💪</div>
                <div className="text-xs font-semibold text-gray-700">
                  Resistencia
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 order-1 lg:order-2 lg:pl-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 text-cyan-700 text-xs font-bold">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Bebida Energética Premium
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              {product.longDescription}
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 border border-gray-200 space-y-2 sm:space-y-3">
              <span className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                Precio especial
              </span>
              <div className="flex items-end gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                  ${product.price}
                </span>
                <span className="text-gray-400 text-base sm:text-lg line-through mb-1 sm:mb-2">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
                <span className="text-cyan-600 font-bold text-xs sm:text-sm bg-cyan-50 px-2 py-1 rounded-lg mb-1 sm:mb-2">
                  -23%
                </span>
              </div>
              <div className="flex items-center gap-2 text-cyan-600 text-xs sm:text-sm font-semibold">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                En stock • Envío inmediato
              </div>
            </div>

            <div className="pt-2">
              <AddToCartButton product={product} />
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="whitespace-nowrap">Garantía de calidad</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="whitespace-nowrap">Compra segura</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 flex-shrink-0"
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
                <span className="whitespace-nowrap">Envío rápido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
