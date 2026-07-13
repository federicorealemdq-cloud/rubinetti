'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Camera, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

type MediaItem = { type: 'photo'; src: string } | { type: 'video'; videoId: string };

interface Props {
  images: string[];
  title: string;
  videoId: string | null;
}

export default function Gallery({ images, title, videoId }: Props) {
  const items: MediaItem[] = [
    ...images.map(src => ({ type: 'photo' as const, src })),
    ...(videoId ? [{ type: 'video' as const, videoId }] : []),
  ];

  const [active, setActive] = useState(() => videoId ? images.length : 0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const lbTouchStartX = useRef<number>(0);

  const lbPrev = useCallback(() =>
    setLightbox(i => i !== null ? (i - 1 + items.length) % items.length : null),
    [items.length]);

  const lbNext = useCallback(() =>
    setLightbox(i => i !== null ? (i + 1) % items.length : null),
    [items.length]);

  const closeLightbox = () => setLightbox(null);

  // Keep thumbnail strip in sync when navigating inside lightbox
  useEffect(() => {
    if (lightbox !== null) setActive(lightbox);
  }, [lightbox]);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbPrev();
      if (e.key === 'ArrowRight') lbNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, lbPrev, lbNext]);

  if (items.length === 0) {
    return (
      <div className="aspect-video rounded-xl bg-[#f0ece8] flex flex-col items-center justify-center text-[#6f6a6d] gap-2">
        <Camera size={48} strokeWidth={1} />
        <span className="text-sm">Sin fotos disponibles</span>
      </div>
    );
  }

  const prev = () => setActive(i => (i - 1 + items.length) % items.length);
  const next = () => setActive(i => (i + 1) % items.length);
  const current = items[active];
  const lbCurrent = lightbox !== null ? items[lightbox] : null;

  return (
    <>
      <div className="space-y-3">
        {/* Main viewer */}
        <div
          className="relative aspect-video rounded-xl overflow-hidden bg-[#f0ece8] select-none"
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const delta = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
          }}
        >
          {current.type === 'photo' ? (
            <button
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              onClick={() => setLightbox(active)}
              aria-label="Ver foto ampliada"
            >
              <Image
                src={current.src}
                alt={`${title} - foto ${active + 1}`}
                fill
                className="object-cover"
                unoptimized
                priority={active === 0}
              />
            </button>
          ) : (
            <iframe
              key={current.videoId}
              src={`https://www.youtube.com/embed/${current.videoId}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Arrows — desktop only */}
          {items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                aria-label="Anterior"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                aria-label="Siguiente"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Counter — photos only */}
          {current.type === 'photo' && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
              <Camera size={12} />
              {active + 1} / {items.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {items.length > 1 && (
          <div className="flex overflow-x-auto snap-x snap-proximity gap-2 pb-1 sm:grid sm:grid-cols-8 sm:overflow-visible">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-[76px] aspect-[4/3] snap-start sm:w-auto sm:aspect-square rounded-lg overflow-hidden ring-offset-1 transition-all ${
                  i === active ? 'ring-2 ring-[#8a4f70]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {item.type === 'photo' ? (
                  <Image src={item.src} alt={`Miniatura ${i + 1}`} fill className="object-cover" unoptimized />
                ) : (
                  <>
                    <Image
                      src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`}
                      alt="Video"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="bg-white/90 rounded-full p-1.5">
                        <Play size={12} className="fill-[#8a4f70] text-[#8a4f70]" />
                      </div>
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && lbCurrent && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={e => { lbTouchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const delta = lbTouchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 40) delta > 0 ? lbNext() : lbPrev();
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-5 z-10 text-white/60 text-sm tabular-nums">
            {lightbox + 1} / {items.length}
          </span>

          {/* Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); lbPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); lbNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* Content */}
          <div
            className="relative w-full max-w-5xl mx-16"
            onClick={e => e.stopPropagation()}
          >
            {lbCurrent.type === 'photo' ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={lbCurrent.src}
                  alt={`${title} - foto ${lightbox + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-full aspect-video">
                <iframe
                  key={`lb-${lbCurrent.videoId}`}
                  src={`https://www.youtube.com/embed/${lbCurrent.videoId}?autoplay=1`}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
