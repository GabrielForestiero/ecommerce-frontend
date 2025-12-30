"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ProductCard } from "./ProductCard";
import { Product } from "../types/product";

interface ProductsCarouselProps {
  products: Product[];
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: false,
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnLastSnap: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => onSelect(emblaApi);

    handleSelect();
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="productos"
      className="relative py-16 md:py-24 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10" />

      <div className="px-4 md:px-6 max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-gray-900">RAYNIX ENERGY </span>
            <span className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-transparent bg-clip-text">
              DRINKS
            </span>
          </h2>

          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"></div>
            <div
              className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-3 border-2 border-cyan-500/50"
              style={{
                clipPath:
                  "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
              }}
            >
              <span className="text-white font-bold text-sm md:text-base uppercase tracking-widest">
                TODOS LOS PRODUCTOS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 max-w-7xl mx-auto relative">
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-sm items-center justify-center hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
          >
            <svg
              className="w-5 h-5 text-white transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
          >
            <svg
              className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {canScrollPrev && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}

        {canScrollNext && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden">
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex" style={{ gap: "1.5rem" }}>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-32 h-64 bg-cyan-400/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-32 h-64 bg-purple-400/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
