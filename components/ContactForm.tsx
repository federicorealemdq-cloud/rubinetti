'use client';
import { useState } from 'react';

const inputStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: '15px',
  color: '#262525',
  border: '1px solid rgba(38,37,37,.14)',
  borderRadius: '5px',
  padding: '11px 13px',
  background: '#fff',
  width: '100%',
  outline: 'none',
};

interface Props {
  subject?: string;
}

export default function ContactForm({ subject }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#aa6d8f';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(170,109,143,.14)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(38,37,37,.14)';
    e.currentTarget.style.boxShadow = 'none';
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <p className="text-[#8a4f70] font-semibold text-lg mb-2">¡Mensaje recibido!</p>
        <p className="text-sm text-[#6f6a6d]">
          Te contactamos a la brevedad. Gracias por comunicarte con Rubinetti Propiedades.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de contacto" className="flex flex-col gap-[18px]">
      {subject && <input type="hidden" name="subject" value={subject} />}

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="c-nombre" className="text-sm font-medium text-[#6f6a6d]">Nombre</label>
        <input
          id="c-nombre"
          name="nombre"
          type="text"
          required
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div className="grid grid-cols-2 gap-[18px]">
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="c-telefono" className="text-sm font-medium text-[#6f6a6d]">Teléfono</label>
          <input
            id="c-telefono"
            name="telefono"
            type="tel"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="c-email" className="text-sm font-medium text-[#6f6a6d]">Email</label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="c-mensaje" className="text-sm font-medium text-[#6f6a6d]">Mensaje</label>
        <textarea
          id="c-mensaje"
          name="mensaje"
          rows={4}
          required
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <button
        type="submit"
        style={{
          alignSelf: 'flex-start',
          fontFamily: 'inherit',
          fontSize: '14.5px',
          fontWeight: 600,
          background: '#8a4f70',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '13px 30px',
          cursor: 'pointer',
          transition: 'background .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#6d3d58')}
        onMouseLeave={e => (e.currentTarget.style.background = '#8a4f70')}
      >
        Enviar consulta
      </button>
    </form>
  );
}
