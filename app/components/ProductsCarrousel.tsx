'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

interface ProductsCarouselProps {
  products: Product[];
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
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
    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="productos" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/50 to-black -z-10" />

      {/* Header */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                TODOS LOS
              </span>{" "}
              <span className="text-white">PRODUCTOS</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              {products.length} bebidas energéticas premium
            </p>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-12 h-12 rounded-full bg-white/5 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-cyan-500/30 disabled:hover:shadow-none"
            >
              <svg className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-12 h-12 rounded-full bg-white/5 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-purple-500/30 disabled:hover:shadow-none"
            >
              <svg className="w-6 h-6 text-zinc-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Container con max-width */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto relative">
        {/* Flechas indicadoras de scroll - Mobile/Tablet */}
        {canScrollPrev && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
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
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Carrusel con Embla */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex" style={{ gap: '1.5rem' }}>
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

      {/* Efectos de luz lateral */}
      <div className="absolute top-1/2 left-0 w-32 h-64 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-32 h-64 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
    </section>
  );
}