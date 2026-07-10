import { CheckCircle, Clock, FileText, Home } from 'lucide-react';
import TasacionForm from '@/components/TasacionForm';

const pasos = [
  {
    n: 1,
    icon: FileText,
    titulo: 'Pedido',
    desc: 'Completás el formulario con los datos de tu propiedad. Lo recibimos al instante.',
  },
  {
    n: 2,
    icon: Home,
    titulo: 'Visita',
    desc: 'Coordinamos una visita para conocer la propiedad en persona y tomar todos los datos necesarios.',
  },
  {
    n: 3,
    icon: CheckCircle,
    titulo: 'Análisis',
    desc: 'Cruzamos datos de mercado, comparables y el estado del inmueble para llegar a un valor real.',
  },
  {
    n: 4,
    icon: Clock,
    titulo: 'Tasación',
    desc: 'Recibís el informe de tasación por escrito en 24 a 48 horas hábiles.',
  },
];

const faqs = [
  {
    q: '¿Tiene algún costo?',
    a: 'No. La tasación es completamente gratuita y sin compromiso de venta.',
  },
  {
    q: '¿Cuánto tiempo demora?',
    a: 'Entre 24 y 48 horas hábiles desde la visita a la propiedad.',
  },
  {
    q: '¿Qué información necesito proporcionar?',
    a: 'Dirección completa, tipo de propiedad, superficie aproximada y algún detalle sobre el estado del inmueble.',
  },
  {
    q: '¿Puedo pedir una tasación aunque no quiera vender?',
    a: 'Sí. Muchos propietarios solicitan una tasación para conocer el valor de mercado actual de su propiedad, sin intención inmediata de vender.',
  },
];

export default function TasacionesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16" style={{ backgroundColor: '#8a4f70' }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-[#f6eef1] uppercase tracking-widest mb-3">Servicio gratuito</p>
          <h1 className="text-4xl sm:text-5xl font-medium text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
            Tasación de tu propiedad,<br />sin cargo
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-10">
            Conocé el valor real de tu propiedad con la opinión de nuestros corredores públicos inmobiliarios.
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { label: '100% sin cargo', desc: 'Sin costo ni obligación' },
              { label: '24-48 h respuesta', desc: 'Informe rápido y completo' },
              { label: 'Corredores públicos', desc: 'Matrícula habilitada' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-white/10 rounded-xl p-4 text-white border border-white/20">
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-white/70 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16" style={{ backgroundColor: '#faf9f8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Proceso + FAQ */}
            <div>
              <h2 className="text-2xl font-medium mb-8" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
                ¿Cómo funciona?
              </h2>

              <ol className="space-y-6 mb-12">
                {pasos.map(({ n, icon: Icon, titulo, desc }) => (
                  <li key={n} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8a4f70] text-white flex items-center justify-center text-sm font-semibold">
                      {n}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#262525] mb-1">{titulo}</h3>
                      <p className="text-sm text-[#6f6a6d] leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* FAQ */}
              <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
                Preguntas frecuentes
              </h2>

              <div className="space-y-3">
                {faqs.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group border rounded-xl overflow-hidden"
                    style={{ borderColor: 'rgba(38,37,37,.14)' }}
                  >
                    <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium cursor-pointer list-none text-[#262525] hover:text-[#8a4f70]">
                      {q}
                      <span className="ml-4 transition-transform group-open:rotate-45 flex-shrink-0 text-[#8a4f70] text-lg leading-none">+</span>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-[#6f6a6d] leading-relaxed">
                      {a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl p-8 border shadow-sm" style={{ borderColor: 'rgba(38,37,37,.14)' }}>
                  <h2 className="text-xl font-semibold text-[#262525] mb-2">
                    Pedí tu tasación gratuita
                  </h2>
                  <p className="text-sm text-[#6f6a6d] mb-6">
                    Completá el formulario y te contactamos a la brevedad.
                  </p>
                  <TasacionForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
