'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import PropertyCard from './PropertyCard';
import {
  properties,
  TIPOS,
  AMBIENTES_OPCIONES,
  AMENITIES_LIST,
  ESTADOS,
  type Operacion,
} from '@/data/properties';

const POR_PAGINA = 8;

export default function ListadoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [operacion, setOperacion] = useState<Operacion>(
    (searchParams.get('operacion') as Operacion) || 'Venta'
  );
  const [q] = useState(searchParams.get('q') || '');
  const [filtrosTipo, setFiltrosTipo] = useState<Set<string>>(
    searchParams.get('tipo') ? new Set([searchParams.get('tipo')!]) : new Set()
  );
  const [filtrosAmbientes, setFiltrosAmbientes] = useState<Set<number>>(new Set());
  const [filtrosAmenities, setFiltrosAmenities] = useState<Set<string>>(new Set());
  const [filtroBarrio, setFiltroBarrio] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [monedaFiltro, setMonedaFiltro] = useState<'USD' | 'ARS'>('USD');
  const [orden, setOrden] = useState('destacadas');
  const [pagina, setPagina] = useState(1);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('filtros-abiertos', filtrosAbiertos);
    return () => document.body.classList.remove('filtros-abiertos');
  }, [filtrosAbiertos]);

  useEffect(() => {
    if (!filtrosAbiertos) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFiltrosAbiertos(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [filtrosAbiertos]);

  const cantFiltros =
    filtrosTipo.size + filtrosAmbientes.size + filtrosAmenities.size +
    (filtroBarrio ? 1 : 0) + (filtroEstado ? 1 : 0) + ((precioMin || precioMax) ? 1 : 0);

  const barrios = useMemo(
    () => [...new Set(properties.filter(p => p.op === operacion).map(p => p.barrio))].sort(),
    [operacion]
  );

  const resultado = useMemo(() => {
    let r = properties.filter(p => p.op === operacion);

    if (q) {
      const lower = q.toLowerCase();
      r = r.filter(p =>
        p.dir.toLowerCase().includes(lower) || p.barrio.toLowerCase().includes(lower)
      );
    }
    if (filtrosTipo.size > 0) r = r.filter(p => filtrosTipo.has(p.tipo));
    if (filtrosAmbientes.size > 0)
      r = r.filter(p => p.ambientes !== null && filtrosAmbientes.has(p.ambientes));
    if (filtrosAmenities.size > 0)
      r = r.filter(p => [...filtrosAmenities].every(a => p.amenities.includes(a)));
    if (filtroBarrio) r = r.filter(p => p.barrio === filtroBarrio);
    if (filtroEstado) r = r.filter(p => p.estado === filtroEstado);
    if (precioMin || precioMax) {
      r = r.filter(p => {
        if (!p.precio || p.moneda !== monedaFiltro) return false;
        if (precioMin && p.precio < Number(precioMin)) return false;
        if (precioMax && p.precio > Number(precioMax)) return false;
        return true;
      });
    }

    const sorted = [...r];
    if (orden === 'recientes') sorted.sort((a, b) => b.id - a.id);
    else if (orden === 'precio-asc') sorted.sort((a, b) => (a.precio ?? Infinity) - (b.precio ?? Infinity));
    else if (orden === 'precio-desc') sorted.sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0));
    else if (orden === 'ambientes-asc') sorted.sort((a, b) => (a.ambientes ?? 0) - (b.ambientes ?? 0));
    else if (orden === 'ambientes-desc') sorted.sort((a, b) => (b.ambientes ?? 0) - (a.ambientes ?? 0));
    else sorted.sort((a, b) => (b.destacada ? 1 : 0) - (a.destacada ? 1 : 0));

    return sorted;
  }, [operacion, q, filtrosTipo, filtrosAmbientes, filtrosAmenities, filtroBarrio, filtroEstado, precioMin, precioMax, monedaFiltro, orden]);

  const totalPaginas = Math.ceil(resultado.length / POR_PAGINA);
  const paginados = resultado.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const toggleTipo = (t: string) => {
    setFiltrosTipo(prev => { const s = new Set(prev); s.has(t) ? s.delete(t) : s.add(t); return s; });
    setPagina(1);
  };

  const toggleAmbientes = (n: number) => {
    setFiltrosAmbientes(prev => { const s = new Set(prev); s.has(n) ? s.delete(n) : s.add(n); return s; });
    setPagina(1);
  };

  const toggleAmenity = (a: string) => {
    setFiltrosAmenities(prev => { const s = new Set(prev); s.has(a) ? s.delete(a) : s.add(a); return s; });
    setPagina(1);
  };

  const switchOp = (op: Operacion) => {
    setOperacion(op);
    setFiltrosTipo(new Set());
    setFiltrosAmbientes(new Set());
    setFiltrosAmenities(new Set());
    setFiltroBarrio('');
    setFiltroEstado('');
    setPrecioMin('');
    setPrecioMax('');
    setPagina(1);
    router.replace(`/listado?operacion=${op}`, { scroll: false });
  };

  const limpiarFiltros = () => {
    setFiltrosTipo(new Set());
    setFiltrosAmbientes(new Set());
    setFiltrosAmenities(new Set());
    setFiltroBarrio('');
    setFiltroEstado('');
    setPrecioMin('');
    setPrecioMax('');
    setPagina(1);
  };

  const hayFiltros =
    filtrosTipo.size > 0 || filtrosAmbientes.size > 0 || filtrosAmenities.size > 0 ||
    filtroBarrio || filtroEstado || precioMin || precioMax;

  return (
    <div className="pt-32 pb-16 max-w-6xl mx-auto px-6">

      {/* Backdrop filtros — mobile */}
      <div
        className={`fixed inset-0 z-[90] bg-[rgba(38,37,37,.5)] transition-opacity duration-[250ms] lg:hidden ${
          filtrosAbiertos ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setFiltrosAbiertos(false)}
        aria-hidden="true"
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-[#6f6a6d] mb-6">
        <span className="hover:text-[#8a4f70] cursor-pointer" onClick={() => router.push('/')}>Inicio</span>
        <span className="mx-2">›</span>
        <span className="text-[#262525] font-medium">{operacion}</span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar — drawer en mobile, estático en desktop */}
        <aside
          className={[
            'fixed left-0 top-0 bottom-0 z-[95] w-[min(320px,86vw)] overflow-y-auto',
            'bg-[#faf9f8] shadow-xl px-6 pt-5 pb-8',
            'transition-transform duration-300 ease-out',
            filtrosAbiertos ? 'translate-x-0' : '-translate-x-full',
            'lg:static lg:translate-x-0 lg:shadow-none lg:overflow-visible',
            'lg:w-64 lg:flex-shrink-0 lg:p-0 lg:z-auto lg:bg-transparent',
          ].join(' ')}
          aria-label="Filtros"
        >
          {/* Cerrar drawer — solo mobile */}
          <div className="flex justify-end mb-4 lg:hidden">
            <button
              onClick={() => setFiltrosAbiertos(false)}
              className="w-[38px] h-[38px] rounded-full border flex items-center justify-center cursor-pointer transition-colors hover:border-[#aa6d8f] hover:text-[#aa6d8f]"
              style={{ borderColor: 'rgba(38,37,37,.14)', background: '#fff', color: '#262525' }}
              aria-label="Cerrar filtros"
            >
              <X size={17} />
            </button>
          </div>

          <div className="lg:sticky lg:top-32 space-y-6">
            {/* Op toggle */}
            <div>
              <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: 'rgba(38,37,37,.2)' }}>
                {(['Venta', 'Alquiler'] as Operacion[]).map(op => (
                  <button
                    key={op}
                    onClick={() => switchOp(op)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      operacion === op
                        ? 'bg-[#8a4f70] text-white'
                        : 'text-[#6f6a6d] hover:bg-[#8a4f70]/10'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#262525]">Precio</span>
                <div className="flex text-xs rounded overflow-hidden border" style={{ borderColor: 'rgba(38,37,37,.2)' }}>
                  {(['USD', 'ARS'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setMonedaFiltro(m)}
                      className={`px-2 py-0.5 ${monedaFiltro === m ? 'bg-[#8a4f70] text-white' : 'text-[#6f6a6d]'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Mín"
                  value={precioMin}
                  onChange={e => { setPrecioMin(e.target.value); setPagina(1); }}
                  className="w-full px-2 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-[#8a4f70]"
                  style={{ borderColor: 'rgba(38,37,37,.2)' }}
                />
                <input
                  type="number"
                  placeholder="Máx"
                  value={precioMax}
                  onChange={e => { setPrecioMax(e.target.value); setPagina(1); }}
                  className="w-full px-2 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-[#8a4f70]"
                  style={{ borderColor: 'rgba(38,37,37,.2)' }}
                />
              </div>
            </div>

            {/* Tipo */}
            <FilterGroup title="Tipo de propiedad">
              {TIPOS.map(t => (
                <Checkbox key={t} label={t} checked={filtrosTipo.has(t)} onChange={() => toggleTipo(t)} />
              ))}
            </FilterGroup>

            {/* Barrio */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-[#262525] mb-2">Barrio</span>
              <select
                value={filtroBarrio}
                onChange={e => { setFiltroBarrio(e.target.value); setPagina(1); }}
                className="w-full px-2 py-2 rounded-lg border text-sm text-[#262525] focus:outline-none focus:ring-1 focus:ring-[#8a4f70]"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
              >
                <option value="">Todos los barrios</option>
                {barrios.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Ambientes */}
            <FilterGroup title="Ambientes">
              {AMBIENTES_OPCIONES.map(n => (
                <Checkbox
                  key={n}
                  label={n === 4 ? '4+' : String(n)}
                  checked={filtrosAmbientes.has(n)}
                  onChange={() => toggleAmbientes(n)}
                />
              ))}
            </FilterGroup>

            {/* Estado */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-[#262525] mb-2">Estado</span>
              <select
                value={filtroEstado}
                onChange={e => { setFiltroEstado(e.target.value); setPagina(1); }}
                className="w-full px-2 py-2 rounded-lg border text-sm text-[#262525] focus:outline-none focus:ring-1 focus:ring-[#8a4f70]"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
              >
                <option value="">Cualquier estado</option>
                {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            {/* Amenities */}
            <FilterGroup title="Características">
              {AMENITIES_LIST.map(a => (
                <Checkbox key={a} label={a} checked={filtrosAmenities.has(a)} onChange={() => toggleAmenity(a)} />
              ))}
            </FilterGroup>

            {hayFiltros && (
              <button
                onClick={limpiarFiltros}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border text-sm text-[#6f6a6d] hover:text-[#8a4f70] hover:border-[#8a4f70] transition-colors"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
              >
                <X size={14} />
                Limpiar filtros
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <h1 className="text-lg font-semibold text-[#262525]">
              {resultado.length} {resultado.length === 1 ? 'propiedad' : 'propiedades'} en {operacion.toLowerCase()}
            </h1>
            <div className="flex items-center gap-2">
              {/* Botón filtros — solo mobile */}
              <button
                onClick={() => setFiltrosAbiertos(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold text-[#262525] bg-white hover:border-[#aa6d8f] transition-colors"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
                aria-expanded={filtrosAbiertos}
                aria-label="Abrir filtros"
              >
                <SlidersHorizontal size={15} />
                Filtros
                {cantFiltros > 0 && (
                  <span className="bg-[#aa6d8f] text-white text-[11px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 leading-none">
                    {cantFiltros}
                  </span>
                )}
              </button>
              <SlidersHorizontal size={16} className="text-[#6f6a6d] hidden lg:block" />
              <select
                value={orden}
                onChange={e => { setOrden(e.target.value); setPagina(1); }}
                className="text-sm border rounded-lg px-2 py-1.5 text-[#262525] focus:outline-none focus:ring-1 focus:ring-[#8a4f70]"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
              >
                <option value="destacadas">Destacadas primero</option>
                <option value="recientes">Más recientes</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="ambientes-asc">Ambientes: menor a mayor</option>
                <option value="ambientes-desc">Ambientes: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {paginados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginados.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-[#6f6a6d]">
              <p className="text-lg mb-4">No encontramos propiedades con esos filtros.</p>
              <button onClick={limpiarFiltros} className="text-[#8a4f70] underline text-sm">
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                disabled={pagina === 1}
                className="px-3 py-2 rounded-lg border text-sm disabled:opacity-40 hover:bg-[#8a4f70]/10 transition-colors"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
              >
                ←
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPagina(n)}
                  className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors ${
                    n === pagina
                      ? 'bg-[#8a4f70] text-white border-[#8a4f70]'
                      : 'hover:bg-[#8a4f70]/10'
                  }`}
                  style={{ borderColor: n === pagina ? '#8a4f70' : 'rgba(38,37,37,.2)' }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                className="px-3 py-2 rounded-lg border text-sm disabled:opacity-40 hover:bg-[#8a4f70]/10 transition-colors"
                style={{ borderColor: 'rgba(38,37,37,.2)' }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-[#262525] mb-2">{title}</span>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#6f6a6d] cursor-pointer hover:text-[#262525]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-[#8a4f70]"
      />
      {label}
    </label>
  );
}
