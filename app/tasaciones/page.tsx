import TasacionForm from '@/components/TasacionForm';

const pasos = [
  {
    n: 1,
    titulo: 'Nos contás sobre tu propiedad',
    desc: 'Completás el formulario o nos escribís por WhatsApp con la dirección y algunos datos básicos.',
  },
  {
    n: 2,
    titulo: 'Coordinamos una visita',
    desc: 'Vamos a conocer la propiedad en persona, en el horario que te quede cómodo.',
  },
  {
    n: 3,
    titulo: 'Analizamos comparables reales',
    desc: 'Revisamos ventas y publicaciones actuales de tu barrio para fundamentar el valor, no un número al azar.',
  },
  {
    n: 4,
    titulo: 'Te enviamos el valor de publicación',
    desc: 'Dentro de 24 a 48 horas hábiles, con el detalle de en qué nos basamos. Sin compromiso de venta.',
  },
];

const faqs = [
  {
    q: '¿La tasación tiene algún costo?',
    a: 'No, es un servicio sin cargo y sin compromiso. Solo te pedimos los datos de contacto y de la propiedad para poder coordinar la visita.',
  },
  {
    q: '¿Tengo que vender o alquilar sí o sí?',
    a: 'No. Podés usar la tasación simplemente para saber cuánto vale tu propiedad hoy, sin ninguna obligación de publicarla con nosotros.',
  },
  {
    q: '¿Qué necesito tener a mano para la visita?',
    a: 'Con que estés vos o alguien que conozca la propiedad alcanza. Si tenés escritura o plano, ayuda, pero no es excluyente para hacer la tasación.',
  },
  {
    q: '¿Tasan propiedades fuera de Mar del Plata?',
    a: 'Trabajamos principalmente en Mar del Plata y alrededores. Contanos la ubicación en el formulario y te confirmamos si podemos cubrir la zona.',
  },
];

export default function TasacionesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#aa6d8f', color: '#fff', padding: '64px 0 56px' }}>
        <div className="max-w-[1140px] mx-auto px-6">
          <p style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)', marginBottom: '14px' }}>
            Tasaciones
          </p>
          <h1
            className="leading-[1.12]"
            style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 'clamp(28px, 4vw, 42px)', maxWidth: '18ch' }}
          >
            Tasamos tu propiedad sin cargo
          </h1>
          <p style={{ marginTop: '16px', maxWidth: '52ch', fontSize: '16px', color: 'rgba(255,255,255,.9)' }}>
            La visitamos, la comparamos con operaciones reales de tu zona y te damos un valor de publicación con fundamento. Sin compromiso de venta.
          </p>

          <div className="flex flex-wrap gap-7 mt-8">
            {[
              {
                label: 'Tasación 100% sin cargo',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] flex-shrink-0">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                ),
              },
              {
                label: 'Respuesta en 24-48 h hábiles',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] flex-shrink-0">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                ),
              },
              {
                label: 'Corredores públicos matriculados',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] flex-shrink-0">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-medium">
                {icon}
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section style={{ backgroundColor: '#faf9f8', paddingTop: '56px', paddingBottom: '72px' }}>
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">

            {/* Izquierda: Proceso + FAQ */}
            <div>
              <h2
                style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '21px', marginBottom: '6px' }}
              >
                Cómo funciona
              </h2>
              <p style={{ color: '#6f6a6d', fontSize: '14.5px', marginBottom: '32px', maxWidth: '50ch' }}>
                Cuatro pasos, sin vueltas ni letra chica.
              </p>

              <div className="flex flex-col">
                {pasos.map(({ n, titulo, desc }, i) => (
                  <div
                    key={n}
                    className="flex gap-5"
                    style={{
                      padding: i === 0 ? '0 0 22px' : '22px 0',
                      borderBottom: i < pasos.length - 1 ? '1px solid rgba(38,37,37,.14)' : 'none',
                    }}
                  >
                    <span
                      style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '26px', fontWeight: 500, color: '#aa6d8f', flexShrink: 0, width: '40px' }}
                    >
                      {n}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontSize: '15.5px', fontWeight: 600, marginBottom: '5px' }}>
                        {titulo}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6f6a6d', maxWidth: '48ch' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="mt-11">
                {faqs.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group"
                    style={{ borderBottom: '1px solid rgba(38,37,37,.14)' }}
                  >
                    <summary
                      className="flex items-center justify-between cursor-pointer list-none"
                      style={{ padding: '16px 0', fontSize: '15px', fontWeight: 500 }}
                    >
                      {q}
                      <span
                        className="transition-transform group-open:rotate-45 flex-shrink-0 leading-none"
                        style={{ fontSize: '20px', color: '#aa6d8f', fontWeight: 400, marginLeft: '12px' }}
                      >
                        +
                      </span>
                    </summary>
                    <p style={{ padding: '0 0 18px', fontSize: '14px', color: '#6f6a6d', maxWidth: '54ch' }}>
                      {a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Derecha: Formulario sticky */}
            <div className="lg:sticky lg:top-[78px]">
              <div
                className="bg-white rounded-xl"
                style={{ border: '1px solid rgba(38,37,37,.14)', padding: '28px' }}
              >
                <h2
                  style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '19px', marginBottom: '4px' }}
                >
                  Pedí tu tasación
                </h2>
                <p style={{ fontSize: '13.5px', color: '#6f6a6d', marginBottom: '20px' }}>
                  Te contactamos para coordinar la visita.
                </p>
                <TasacionForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
