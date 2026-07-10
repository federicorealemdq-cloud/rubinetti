'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Camera } from 'lucide-react';
import { type Property, formatPrice } from '@/data/properties';

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const [saved, setSaved] = useState(false);
  const img = property.img;
  const price = formatPrice(property);

  return (
    <Link href={`/propiedades/${property.id}`} className="block group">
      <article className="rounded-xl overflow-hidden border bg-white transition-shadow hover:shadow-lg" style={{ borderColor: 'rgba(38,37,37,.14)' }}>
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#f0ece8]">
          {img ? (
            <Image
              src={img}
              alt={`${property.tipo} en ${property.dir}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#6f6a6d]">
              <Camera size={40} strokeWidth={1} />
            </div>
          )}

          {/* Top overlays */}
          <div className="absolute top-2.5 left-2.5 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            {property.ambientes && <span>{property.ambientes} amb</span>}
            {property.ambientes && <span>·</span>}
            <span>{property.m2} m²</span>
          </div>

          <button
            onClick={e => { e.preventDefault(); setSaved(v => !v); }}
            aria-label="Guardar"
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-colors hover:bg-white"
          >
            <Heart
              size={16}
              className={saved ? 'fill-[#8a4f70] stroke-[#8a4f70]' : 'stroke-[#6f6a6d]'}
            />
          </button>

          {/* Bottom overlays */}
          <div className="absolute bottom-2.5 left-2.5 text-xs font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: '#8a4f70', color: 'white' }}>
            {property.op}
          </div>

          {property.fotos > 0 && (
            <div className="absolute bottom-2.5 right-2.5 bg-black/50 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
              <Camera size={11} />
              {property.fotos}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-sm font-medium text-[#262525] truncate">{property.tipo} · {property.barrio}</p>
          <p className="text-xs text-[#6f6a6d] truncate mt-0.5">{property.dir}</p>
          <p className="text-base font-semibold text-[#8a4f70] mt-2">{price}</p>
          <p className="text-xs text-[#6f6a6d] mt-1">Ref. {1000 + property.id}</p>
        </div>
      </article>
    </Link>
  );
}
