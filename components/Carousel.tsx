'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import type { Property } from '@/data/properties';

const btnBase =
  'absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white border transition-all disabled:opacity-30 hover:border-[#aa6d8f] hover:scale-105 disabled:hover:scale-100';
const btnStyle = { borderColor: 'rgba(38,37,37,.14)', boxShadow: '0 4px 14px rgba(38,37,37,.12)' };

export default function Carousel({ items }: { items: Property[] }) {
  const [slide, setSlide] = useState(0);
  const [perSlide, setPerSlide] = useState(3);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerSlide(1);
      else if (window.innerWidth < 1024) setPerSlide(2);
      else setPerSlide(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalSlides = Math.ceil(items.length / perSlide);
  const visible = items.slice(slide * perSlide, slide * perSlide + perSlide);

  const goTo = (index: number) => {
    setDirection(index > slide ? 'next' : 'prev');
    setAnimKey(k => k + 1);
    setSlide(index);
  };

  return (
    <div className="relative">
      {totalSlides > 1 && (
        <>
          <button
            onClick={() => goTo(Math.max(0, slide - 1))}
            disabled={slide === 0}
            aria-label="Propiedades anteriores"
            className={`${btnBase} carrusel-flecha-izq`}
            style={btnStyle}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(Math.min(totalSlides - 1, slide + 1))}
            disabled={slide === totalSlides - 1}
            aria-label="Propiedades siguientes"
            className={`${btnBase} carrusel-flecha-der`}
            style={btnStyle}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <div
        key={animKey}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px] ${
          direction === 'next' ? 'carousel-slide-next' : 'carousel-slide-prev'
        }`}
      >
        {visible.map(p => <PropertyCard key={p.id} property={p} />)}
      </div>

      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al grupo ${i + 1} de propiedades`}
              style={{
                width: i === slide ? '22px' : '8px',
                height: '8px',
                borderRadius: i === slide ? '4px' : '50%',
                background: i === slide ? '#aa6d8f' : 'rgba(38,37,37,.14)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background .15s, width .15s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
