import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Maximize2, BedDouble, Bath, Home, ChevronLeft, Phone } from 'lucide-react';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import PropertyCard from '@/components/PropertyCard';
import CtaFichaMovil from '@/components/CtaFichaMovil';
import {
  properties,
  getPropertyImages,
  getPropertyDetail,
  getSimilarProperties,
  formatPrice,
} from '@/data/properties';

export function generateStaticParams() {
  return properties.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find(p => p.id === Number(id));
  if (!property) return {};
  return {
    title: `${property.tipo} en ${property.dir} — Rubinetti Propiedades`,
  };
}

export default async function PropiedadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find(p => p.id === Number(id));
  if (!property) notFound();

  const images = getPropertyImages(property);
  const detail = getPropertyDetail(property);
  const similares = getSimilarProperties(property);
  const price = formatPrice(property);

  const waMessage = encodeURIComponent(
    `Hola, me interesa la propiedad en ${property.dir} (Ref. ${detail.ref}). ¿Podría darme más información?`
  );

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6f6a6d] mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-[#8a4f70]">Inicio</Link>
        <span>›</span>
        <Link href={`/listado?operacion=${property.op}`} className="hover:text-[#8a4f70]">{property.op}</Link>
        <span>›</span>
        <span>{property.barrio}</span>
        <span>›</span>
        <span className="text-[#262525] truncate">{property.dir}</span>
      </nav>

      {/* Back button */}
      <Link
        href={`/listado?operacion=${property.op}`}
        className="inline-flex items-center gap-1.5 text-sm text-[#6f6a6d] hover:text-[#8a4f70] mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Volver al listado
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & price */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded text-white flex-shrink-0"
                style={{ backgroundColor: '#8a4f70' }}
              >
                {property.op}
              </span>
              <h1 className="text-2xl font-medium leading-tight" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
                {property.tipo} en {property.barrio}
              </h1>
            </div>
            <p className="flex items-center gap-1 text-[#6f6a6d] text-sm mb-4">
              <MapPin size={14} />
              {property.dir}
            </p>
            <p className="text-2xl font-semibold text-[#8a4f70]">{price}</p>
            <p className="text-xs text-[#6f6a6d] mt-1">Ref. {detail.ref}</p>
          </div>

          {/* Gallery */}
          <Gallery images={images} title={property.dir} videoId={detail.videoId} />

          {/* Quick data */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.ambientes && (
              <QuickStat icon={Home} label="Ambientes" value={String(property.ambientes)} />
            )}
            {detail.dormitorios && (
              <QuickStat icon={BedDouble} label="Dormitorios" value={String(detail.dormitorios)} />
            )}
            <QuickStat icon={Bath} label="Baños" value={String(detail.banos)} />
            <QuickStat icon={Maximize2} label="Superficie" value={`${property.m2} m²`} />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-medium mb-3" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
              Descripción
            </h2>
            <p className="text-[#6f6a6d] leading-relaxed">
              {property.id <= 2
                ? `Excelente ${property.tipo.toLowerCase()} ubicado en el barrio ${property.barrio}, a pasos de todos los servicios. Luminoso y bien mantenido. Ideal para vivir o invertir.`
                : `${property.tipo} en ${property.op.toLowerCase()} en el barrio ${property.barrio}. Cuenta con ${property.m2} m² totales, estado ${property.estado?.toLowerCase() ?? 'a consultar'}, y una excelente ubicación en la ciudad de Mar del Plata.`
              }
            </p>
          </div>

          {/* Info básica */}
          <div>
            <h2 className="text-xl font-medium mb-4" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
              Información básica
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                ['Tipo', property.tipo],
                ['Barrio', property.barrio],
                ['Superficie cubierta', `${detail.m2Cubierta} m²`],
                ['Superficie semicubierta', `${detail.m2Semicubierta} m²`],
                ['Superficie total', `${property.m2} m²`],
                property.estado ? ['Estado', property.estado] : null,
                ['Disposición', detail.disposicion],
                ['Apto crédito', detail.aptoCredito ? 'Sí' : 'No'],
              ].filter((item): item is [string, string] => item !== null).map(([key, val]) => (
                <div key={key as string} className="flex justify-between py-2 border-b" style={{ borderColor: 'rgba(38,37,37,.1)' }}>
                  <dt className="text-sm text-[#6f6a6d]">{key}</dt>
                  <dd className="text-sm font-medium text-[#262525]">{val}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Características */}
          {property.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-medium mb-4" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
                Características
              </h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map(a => (
                  <span
                    key={a}
                    className="px-3 py-1.5 rounded-full text-sm border font-medium"
                    style={{ borderColor: '#aa6d8f', color: '#8a4f70', backgroundColor: '#f6eef1' }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Contact sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'rgba(38,37,37,.14)' }}>
              <h3 className="font-semibold text-[#262525] mb-4">¿Te interesa esta propiedad?</h3>

              <a
                href={`https://wa.me/542235456335?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white text-sm font-medium mb-4 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#25d366' }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: 'rgba(38,37,37,.1)' }} />
                </div>
                <div className="relative flex justify-center text-xs text-[#6f6a6d] bg-white px-2">o enviá un mensaje</div>
              </div>

              <ContactForm subject={`Consulta por ${property.dir} (Ref. ${detail.ref})`} />

              <div className="mt-5 pt-4 border-t text-xs text-[#6f6a6d] space-y-1" style={{ borderColor: 'rgba(38,37,37,.1)' }}>
                <div className="flex items-center gap-1.5">
                  <Phone size={12} />
                  +54 223 545-6335
                </div>
                <p>Av. Rivadavia 3850 · Lun a vie 9-18 h</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Similares */}
      {similares.length > 0 && (
        <section className="mt-16 pt-10 border-t" style={{ borderColor: 'rgba(38,37,37,.1)' }}>
          <h2 className="text-2xl font-medium mb-8" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
            Puede interesarte
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similares.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>
      )}

      {/* CTA fija mobile: reemplaza al botón flotante de WhatsApp en pantallas chicas */}
      <CtaFichaMovil
        price={price}
        isAlquiler={property.op === 'Alquiler'}
        waLink={`https://wa.me/542235456335?text=${waMessage}`}
      />
    </div>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border text-center" style={{ borderColor: 'rgba(38,37,37,.14)', backgroundColor: '#faf9f8' }}>
      <Icon size={20} className="text-[#8a4f70] mb-1" />
      <p className="text-lg font-semibold text-[#262525]">{value}</p>
      <p className="text-xs text-[#6f6a6d]">{label}</p>
    </div>
  );
}
