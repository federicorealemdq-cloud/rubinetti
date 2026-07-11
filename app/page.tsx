import Link from 'next/link';
import HeroSearch from '@/components/HeroSearch';
import Carousel from '@/components/Carousel';
import ContactForm from '@/components/ContactForm';
import ScrollToHash from '@/components/ScrollToHash';
import { properties } from '@/data/properties';

const destacadas = properties.filter(p => p.destacada);

const wrap = {
  maxWidth: '1140px',
  margin: '0 auto',
  padding: '0 24px',
  width: '100%',
};

export default function HomePage() {
  return (
    <>
      <ScrollToHash />
      {/* ── Hero ── */}
      <header
        className="pantalla hero-pantalla relative"
        style={{
          background: `
            linear-gradient(180deg, rgba(38,37,37,.55) 0%, rgba(38,37,37,.15) 40%, rgba(38,37,37,.70) 100%),
            linear-gradient(160deg, #4a4448 0%, #363134 55%, #262525 100%)
          `,
          color: '#fff',
        }}
      >
        {/* Foto de fondo — solo en mobile */}
        <div
          className="md:hidden"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://commons.wikimedia.org/wiki/Special:FilePath/Vista%20de%20Mar%20del%20Plata%20desde%20la%20Torre%20Tanque.jpg?width=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pointerEvents: 'none',
          }}
        />

        {/* Video — oculto en mobile y reduced-motion */}
        <div
          className="max-md:hidden"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            poster="https://commons.wikimedia.org/wiki/Special:FilePath/Vista%20de%20Mar%20del%20Plata%20desde%20la%20Torre%20Tanque.jpg?width=1920"
          >
            <source src="/mar_del_plata.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(38,37,37,.55) 0%, rgba(38,37,37,.15) 40%, rgba(38,37,37,.70) 100%)',
          }}
        />

        {/* Buscador centrado */}
        <div
          className="relative flex flex-col items-center text-center"
          style={wrap}
        >
          <HeroSearch />
        </div>

        <span className="hero-indicador" aria-hidden="true">↓</span>
      </header>

      {/* ── Propiedades destacadas ── */}
      <section className="pantalla" style={{ padding: '72px 0', background: '#faf9f8' }}>
        <div style={wrap}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h2>Propiedades destacadas</h2>
            <Link
              href="/listado?operacion=Venta"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                background: '#aa6d8f',
                color: '#fff',
                padding: '11px 22px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                transition: 'background .15s',
                display: 'inline-block',
              }}
            >
              Ver todas las propiedades →
            </Link>
          </div>
          <Carousel items={destacadas} />
        </div>
      </section>

      {/* ── Sobre nosotros ── */}
      <section id="sobre-nosotros" className="pantalla" style={{ background: '#f6eef1' }}>
        <div style={wrap}>
          {/* Intro */}
          <div style={{ maxWidth: '62ch', marginBottom: '36px' }}>
            <h2>Sobre Nosotros</h2>
            <p style={{ marginTop: '10px', fontSize: '15px', color: '#6f6a6d' }}>
              En nuestro rincón inmobiliario, creamos un espacio donde la pasión por los bienes raíces se entrelaza con la dedicación de un equipo femenino comprometido. Somos más que una inmobiliaria; somos un reflejo de la calidez marplatense.
            </p>
            <p style={{ marginTop: '10px', fontSize: '15px', color: '#6f6a6d' }}>
              Con una visión única, nos esforzamos por construir hogares que resuenen con la esencia de cada persona. Desde el primer encuentro hasta la entrega de llaves, cada paso es guiado por la empatía y el entendimiento de tus sueños y necesidades.
            </p>
          </div>

          {/* Equipo */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 260px))',
              gap: '32px',
              justifyContent: 'center',
              marginBottom: '36px',
            }}
          >
            {[
              { nombre: 'Patricia', cargo: 'Corredora Pública' },
              { nombre: 'Fiamma', cargo: 'Corredora Pública' },
            ].map(({ nombre, cargo }) => (
              <div key={nombre} style={{ textAlign: 'left' }}>
                <div
                  style={{
                    aspectRatio: '1/1',
                    backgroundImage: 'repeating-linear-gradient(45deg, #e3ddd7 0 2px, #dbd3cb 2px 60px)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(38,37,37,.35)',
                    fontSize: '11.5px',
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    overflow: 'hidden',
                  }}
                >
                  Foto de {nombre}
                </div>
                <p style={{ fontSize: '15.5px', fontWeight: 600 }}>{nombre}</p>
                <p style={{ fontSize: '13px', color: '#aa6d8f', marginTop: '2px' }}>{cargo}</p>
              </div>
            ))}
          </div>

          {/* Datos institucionales */}
          <div
            style={{
              borderTop: '1px solid rgba(38,37,37,.14)',
              paddingTop: '18px',
              fontSize: '14.5px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 28px',
            }}
          >
            <span><strong style={{ fontWeight: 600, color: '#262525' }}>Dirección:</strong> Av. Rivadavia 3850, Mar del Plata</span>
            <span><strong style={{ fontWeight: 600, color: '#262525' }}>Horario:</strong> Lunes a viernes de 9 a 18 h</span>
            <span><strong style={{ fontWeight: 600, color: '#262525' }}>Teléfono:</strong> +54 223 545-6335</span>
          </div>
        </div>
      </section>

      {/* ── Contacto ── */}
      <section id="contacto" className="pantalla" style={{ background: '#eef1ef' }}>
        <div className="contacto-grid" style={wrap}>
          {/* Columna formulario */}
          <div>
            <h2>Contacto</h2>
            <p style={{ marginTop: '10px', marginBottom: '28px', color: '#6f6a6d', fontSize: '15px', maxWidth: '46ch' }}>
              Contanos qué estás buscando o qué necesitás y te respondemos a la brevedad.
            </p>
            <ContactForm />
          </div>

          {/* Columna datos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingTop: '4px' }}>
            {[
              { label: 'Dirección', text: 'Av. Rivadavia 3850\nMar del Plata, Argentina', href: null },
              { label: 'Horario', text: 'Lunes a viernes de 9 a 18 h', href: null },
              { label: 'Teléfono', text: '+54 223 545-6335', href: 'tel:+542235456335' },
              { label: 'Email', text: 'info@rubinettipropiedades.com.ar', href: 'mailto:info@rubinettipropiedades.com.ar' },
            ].map(({ label, text, href }, i) => (
              <div
                key={label}
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid rgba(38,37,37,.14)',
                  paddingTop: i === 0 ? 0 : '14px',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    color: '#aa6d8f',
                    marginBottom: '5px',
                  }}
                >
                  {label}
                </span>
                <p style={{ fontSize: '15px' }}>
                  {href ? (
                    <a href={href} className="hover:text-[#aa6d8f] transition-colors">{text}</a>
                  ) : (
                    text.split('\n').map((line, j) => (
                      <span key={j}>{line}{j < text.split('\n').length - 1 && <br />}</span>
                    ))
                  )}
                </p>
              </div>
            ))}

            {/* Mapa placeholder */}
            <div
              role="img"
              aria-label="Mapa de la ubicación de la oficina"
              style={{
                marginTop: '4px',
                aspectRatio: '4/3',
                backgroundImage: 'repeating-linear-gradient(45deg, #e3e0d8 0 2px, #dbd8cf 2px 60px)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'rgba(38,37,37,.4)',
              }}
            >
              Mapa · Av. Rivadavia 3850
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
