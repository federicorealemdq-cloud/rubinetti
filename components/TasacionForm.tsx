'use client';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { TIPOS } from '@/data/properties';

export default function TasacionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
        <CheckCircle size={48} className="text-[#8a4f70]" />
        <h3 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
          ¡Solicitud recibida!
        </h3>
        <p className="text-sm text-[#6f6a6d]">
          Te contactamos dentro de las próximas 24 horas hábiles para coordinar la visita.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8a4f70] text-[#262525]';
  const borderStyle = { borderColor: 'rgba(38,37,37,.2)' };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[#6f6a6d] mb-1">Nombre *</label>
          <input required type="text" name="nombre" className={inputClass} style={borderStyle} />
        </div>
        <div>
          <label className="block text-xs text-[#6f6a6d] mb-1">Teléfono</label>
          <input type="tel" name="telefono" className={inputClass} style={borderStyle} />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#6f6a6d] mb-1">Email *</label>
        <input required type="email" name="email" className={inputClass} style={borderStyle} />
      </div>

      <div>
        <label className="block text-xs text-[#6f6a6d] mb-1">Dirección de la propiedad *</label>
        <input required type="text" name="direccion" className={inputClass} style={borderStyle} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[#6f6a6d] mb-1">Barrio</label>
          <input type="text" name="barrio" className={inputClass} style={borderStyle} />
        </div>
        <div>
          <label className="block text-xs text-[#6f6a6d] mb-1">Tipo de propiedad</label>
          <select name="tipo" className={inputClass} style={borderStyle}>
            <option value="">Seleccioná</option>
            {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#6f6a6d] mb-1">Comentarios adicionales</label>
        <textarea
          name="comentarios"
          rows={3}
          className={`${inputClass} resize-none`}
          style={borderStyle}
          placeholder="Estado de la propiedad, reformas realizadas, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white text-sm font-medium transition-colors"
        style={{ backgroundColor: '#8a4f70' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#6d3d58')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#8a4f70')}
      >
        Solicitar tasación gratuita
      </button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" style={{ borderColor: 'rgba(38,37,37,.1)' }} />
        </div>
        <div className="relative flex justify-center text-xs text-[#6f6a6d] bg-white px-2">o si preferís</div>
      </div>

      <a
        href="https://wa.me/542235456335?text=Hola%2C%20quiero%20pedir%20una%20tasaci%C3%B3n%20sin%20cargo%20para%20mi%20propiedad."
        target="_blank"
        rel="noreferrer"
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white text-sm font-medium"
        style={{ backgroundColor: '#25d366' }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Escribirnos por WhatsApp
      </a>
    </form>
  );
}
