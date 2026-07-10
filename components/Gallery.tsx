'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Camera, Play, X } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
  videoId: string | null;
}

export default function Gallery({ images, title, videoId }: Props) {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (images.length === 0) {
    return (
      <div className="aspect-video rounded-xl bg-[#f0ece8] flex flex-col items-center justify-center text-[#6f6a6d] gap-2">
        <Camera size={48} strokeWidth={1} />
        <span className="text-sm">Sin fotos disponibles</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#f0ece8]">
        <Image
          src={images[active]}
          alt={`${title} - foto ${active + 1}`}
          fill
          className="object-cover"
          unoptimized
          priority
        />

        {videoId && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
          >
            <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
              <Play size={28} className="text-[#8a4f70] fill-[#8a4f70] ml-1" />
            </div>
          </button>
        )}

        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Camera size={12} />
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-lg overflow-hidden ring-offset-1 transition-all ${
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
