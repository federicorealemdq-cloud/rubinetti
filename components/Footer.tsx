import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      id="pie"
      style={{ background: '#aa6d8f', color: 'rgba(255,255,255,.9)', padding: '56px 0 30px', fontSize: '14px', scrollSnapAlign: 'end' }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '40px',
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(255,255,255,.25)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(250,249,248,.95)',
              borderRadius: '10px',
              padding: '10px 16px',
            }}
          >
            <Image
              src="/logo-rubinetti-horizontal.png"
              alt="Rubinetti Propiedades"
              width={140}
              height={38}
              className="h-[38px] w-auto"
            />
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Rubinetti Propiedades
            </h4>
            <p style={{ color: 'rgba(255,255,255,.85)' }}>
              Av. Rivadavia 3850<br />Mar del Plata, Argentina<br />Lunes a viernes de 9 a 18 h
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '14px' }}>
              La inmobiliaria
            </h4>
            <Link href="/#sobre-nosotros" className="block py-1 text-white/85 hover:text-white hover:underline">Sobre Nosotros</Link>
            <Link href="/#contacto" className="block py-1 text-white/85 hover:text-white hover:underline">Contacto</Link>
            <Link href="/tasaciones" className="block py-1 text-white/85 hover:text-white hover:underline">Tasaciones</Link>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Propiedades
            </h4>
            <Link href="/listado?operacion=Venta" className="block py-1 text-white/85 hover:text-white hover:underline">En venta</Link>
            <Link href="/listado?operacion=Alquiler" className="block py-1 text-white/85 hover:text-white hover:underline">En alquiler</Link>
            <Link href="/listado?operacion=Venta&tipo=Departamento" className="block py-1 text-white/85 hover:text-white hover:underline">Departamentos</Link>
            <Link href="/listado?operacion=Venta&tipo=Casa" className="block py-1 text-white/85 hover:text-white hover:underline">Casas</Link>
            <Link href="/listado?operacion=Venta&tipo=PH" className="block py-1 text-white/85 hover:text-white hover:underline">PH</Link>
            <Link href="/listado?operacion=Venta&tipo=Lote" className="block py-1 text-white/85 hover:text-white hover:underline">Lotes</Link>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Contacto directo
            </h4>
            <a href="https://wa.me/5492235456335" target="_blank" rel="noopener" className="block py-1 text-white/85 hover:text-white hover:underline">WhatsApp</a>
            <a href="https://instagram.com" className="block py-1 text-white/85 hover:text-white hover:underline">Instagram</a>
            <a href="tel:+542235456335" className="block py-1 text-white/85 hover:text-white hover:underline">+54 223 545-6335</a>
            <a href="mailto:info@rubinettipropiedades.com.ar" className="block py-1 text-white/85 hover:text-white hover:underline">Email</a>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: '11.5px',
            color: 'rgba(255,255,255,.6)',
            marginTop: '28px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255,255,255,.25)',
            maxWidth: '90ch',
            lineHeight: 1.6,
          }}
        >
          Las medidas, superficies y demás datos enunciados son meramente orientativos; las medidas exactas serán las que consten en el respectivo título de propiedad de cada inmueble. Todas las fotos e imágenes son ilustrativas y no contractuales. Los precios enunciados no son vinculantes y están sujetos a confirmación.
        </p>

        {/* Legal */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255,255,255,.25)',
            fontSize: '12px',
            color: 'rgba(255,255,255,.65)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span>© 2026 Rubinetti Propiedades · Corredores públicos Mat. XXXX</span>
          <span>Mar del Plata, Argentina</span>
        </div>
      </div>
    </footer>
  );
}
