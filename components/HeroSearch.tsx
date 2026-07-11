'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TIPOS } from '@/data/properties';

const selectStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: '15px',
  fontWeight: 500,
  color: '#fff',
  border: 'none',
  borderBottom: '1.5px solid rgba(255,255,255,.5)',
  background: 'transparent',
  padding: '4px 22px 6px 0',
  appearance: 'none',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23ffffff' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 2px center',
  minWidth: '130px',
  cursor: 'pointer',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,.55)',
};

export default function HeroSearch() {
  const router = useRouter();
  const [operacion, setOperacion] = useState('Venta');
  const [tipo, setTipo] = useState('');
  const [q, setQ] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ operacion });
    if (tipo) params.set('tipo', tipo);
    if (q) params.set('q', q);
    router.push(`/listado?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Buscar propiedades"
      className="buscador-form w-full items-center"
      style={{
        background: 'rgba(20,18,19,.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,.18)',
        borderRadius: '10px',
        padding: '16px 20px',
        boxShadow: '0 12px 36px rgba(0,0,0,.35)',
      }}
    >
      {/* Operación */}
      <div className="flex flex-col gap-1">
        <label htmlFor="op" style={labelStyle}>Operación</label>
        <select
          id="op"
          value={operacion}
          onChange={e => setOperacion(e.target.value)}
          style={selectStyle}
        >
          <option value="Venta" style={{ color: '#262525' }}>Venta</option>
          <option value="Alquiler" style={{ color: '#262525' }}>Alquiler</option>
        </select>
      </div>

      {/* Tipo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="tipo" style={labelStyle}>Tipo</label>
        <select
          id="tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          style={selectStyle}
        >
          <option value="" style={{ color: '#262525' }}>Tipo de propiedad</option>
          {TIPOS.map(t => (
            <option key={t} value={t} style={{ color: '#262525' }}>{t}</option>
          ))}
        </select>
      </div>

      {/* Ubicación */}
      <div className="flex flex-col gap-1 buscador-ubicacion">
        <label htmlFor="q" style={labelStyle}>Ubicación</label>
        <input
          id="q"
          type="text"
          placeholder="Buscar por ubicación, dirección o calle"
          value={q}
          onChange={e => setQ(e.target.value)}
          autoComplete="off"
          style={{
            fontFamily: 'inherit',
            fontSize: '16px',
            color: '#fff',
            background: 'transparent',
            border: 'none',
            borderBottom: '1.5px solid rgba(255,255,255,.5)',
            padding: '4px 0 6px',
            width: '100%',
            outline: 'none',
          }}
        />
      </div>

      {/* Buscar */}
      <button
        type="submit"
        className="buscador-btn"
        style={{
          fontFamily: 'inherit',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '.03em',
          background: '#fff',
          color: '#262525',
          border: 'none',
          borderRadius: '6px',
          padding: '14px 30px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'background .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#f0edea')}
        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
      >
        Buscar
      </button>
    </form>
  );
}
