'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
  videoId: string | null;
}

export default function Gallery({ images, title, videoId }: Props) {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const touchStartX = useRef<number>(0);

  if (images.length === 0) {
    return (
      <div className="aspect-video rounded-xl bg-[#f0ece8] flex flex-col items-center justify-center text-[#6f6a6d] gap-2">
        <Camera size={48} strokeWidth={1} />
        <span className="text-sm">Sin fotos disponibles</span>
      </div>
    );
  }

  const prev = () => setActive(i => (i - 1 + images.length) % images.length);
  const next = () => setActive(i => (i + 1) % images.length);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-video rounded-xl overflow-hidden bg-[#f0ece8] select-none"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
        }}
      >
        <Image
          src={images[active]}
          alt={`${title} - foto ${active + 1}`}
          fill
          className="object-cover"
          unoptimized
          priority
        />

        {/* Arrows — desktop only */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
              aria-label="Foto siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Video button */}
        {videoId && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute bottom-10 right-3 z-10 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            aria-label="Ver video"
          >
            <Play size={13} className="fill-white" />
            Ver video
          </button>
        )}

        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Camera size={12} />
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex overflow-x-auto snap-x snap-proximity gap-2 pb-1 sm:grid sm:grid-cols-8 sm:overflow-visible">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-[76px] aspect-[4/3] snap-start sm:w-auto sm:aspect-square rounded-lg overflow-hidden ring-offset-1 transition-all ${
                i === active ? 'ring-2 ring-[#8a4f70]' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Miniatura ${i + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}

      {/* Video modal */}
      {showVideo && videoId && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end mb-2">
              <button onClick={() => setShowVideo(false)} className="text-white/80 hover:text-white">
                <X size={28} />
              </button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="w-full aspect-video rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
