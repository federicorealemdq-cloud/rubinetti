export type Operacion = 'Venta' | 'Alquiler';

export interface Property {
  id: number;
  op: Operacion;
  tipo: string;
  barrio: string;
  dir: string;
  precio: number | null;
  moneda: 'USD' | 'ARS';
  ambientes: number | null;
  m2: number;
  estado: string | null;
  amenities: string[];
  destacada: boolean;
  fotos: number;
  img: string | null;
}

const IMGS_CICLO = [
  'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Alberti.jpg?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20al%20atardecer-2.jpg?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Barrio%20La%20Perla%20antiguo.jpg?width=700',
];

export function getPropertyImages(property: Property): string[] {
  if (property.fotos === 0) return [];
  const result: string[] = [];
  for (let i = 0; i < property.fotos; i++) {
    result.push(IMGS_CICLO[(property.id + i) % IMGS_CICLO.length]);
  }
  if (property.img) result[0] = property.img;
  return result;
}

export function formatPrice(property: Property): string {
  if (!property.precio) return 'Consultar precio';
  const formatter = new Intl.NumberFormat('es-AR');
  const sym = property.moneda === 'USD' ? 'USD' : '$';
  return `${sym} ${formatter.format(property.precio)}`;
}

export function getPropertyDetail(property: Property) {
  return {
    dormitorios: property.ambientes && property.ambientes > 1 ? property.ambientes - 1 : null,
    banos: property.ambientes && property.ambientes >= 3 ? 2 : 1,
    m2Cubierta: Math.round(property.m2 * 0.92),
    m2Semicubierta: property.m2 - Math.round(property.m2 * 0.92),
    disposicion: ['Frente', 'Contrafrente', 'Interno'][property.id % 3],
    aptoCredito: property.amenities.includes('Apto crédito'),
    ref: 1000 + property.id,
    videoId: property.id === 1 ? 'meAzO4IvYSU' : null,
  };
}

export function getSimilarProperties(property: Property): Property[] {
  const others = properties.filter(p => p.id !== property.id && p.op === property.op);
  const sameBarrio = others.filter(p => p.barrio === property.barrio);
  const sameTipo = others.filter(p => p.tipo === property.tipo && p.barrio !== property.barrio);
  const rest = others.filter(p => p.barrio !== property.barrio && p.tipo !== property.tipo);
  return [...sameBarrio, ...sameTipo, ...rest].slice(0, 3);
}

export const TIPOS = ['Departamento', 'Casa', 'PH', 'Local comercial', 'Lote', 'Cochera'];
export const AMBIENTES_OPCIONES = [1, 2, 3, 4];
export const AMENITIES_LIST = ['Balcón', 'Terraza', 'Patio', 'Cochera', 'Pileta', 'Vista al mar', 'Apto crédito', 'Amoblado'];
export const ESTADOS = ['Excelente', 'Muy bueno', 'Bueno', 'A refaccionar'];

export const properties: Property[] = [
  { id: 1, op: 'Venta', tipo: 'Departamento', barrio: 'Plaza Mitre', dir: 'Rawson al 4500', precio: 45000, moneda: 'USD', ambientes: 2, m2: 52, estado: 'Muy bueno', amenities: ['Cochera'], destacada: true, fotos: 6, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 2, op: 'Venta', tipo: 'Casa', barrio: 'Güemes', dir: 'Alberti al 1200', precio: 72000, moneda: 'USD', ambientes: 3, m2: 78, estado: 'Excelente', amenities: ['Balcón', 'Patio'], destacada: true, fotos: 8, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Alberti.jpg?width=700' },
  { id: 3, op: 'Alquiler', tipo: 'Departamento', barrio: 'Centro', dir: 'San Luis al 2300', precio: 480000, moneda: 'ARS', ambientes: 1, m2: 34, estado: 'Bueno', amenities: [], destacada: true, fotos: 5, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20al%20atardecer-2.jpg?width=700' },
  { id: 4, op: 'Venta', tipo: 'Departamento', barrio: 'Centro', dir: 'Belgrano al 2800', precio: 58000, moneda: 'USD', ambientes: 2, m2: 48, estado: 'Bueno', amenities: ['Balcón'], destacada: true, fotos: 2, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 5, op: 'Venta', tipo: 'Casa', barrio: 'La Perla', dir: 'Colón al 3500', precio: 94000, moneda: 'USD', ambientes: 3, m2: 85, estado: 'Excelente', amenities: ['Vista al mar', 'Cochera'], destacada: true, fotos: 9, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barrio%20La%20Perla%20antiguo.jpg?width=700' },
  { id: 6, op: 'Alquiler', tipo: 'Departamento', barrio: 'Güemes', dir: 'Güemes al 900', precio: 620000, moneda: 'ARS', ambientes: 2, m2: 60, estado: 'Muy bueno', amenities: ['Amoblado'], destacada: true, fotos: 4, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Alberti.jpg?width=700' },
  { id: 7, op: 'Venta', tipo: 'Departamento', barrio: 'Puerto', dir: 'Falucho al 1400', precio: 31000, moneda: 'USD', ambientes: 1, m2: 38, estado: 'Bueno', amenities: ['Cochera'], destacada: false, fotos: 1, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20al%20atardecer-2.jpg?width=700' },
  { id: 8, op: 'Venta', tipo: 'Casa', barrio: 'Centro', dir: 'Bernardo de Irigoyen al 400', precio: 110000, moneda: 'USD', ambientes: 4, m2: 120, estado: 'Excelente', amenities: ['Cochera', 'Patio'], destacada: true, fotos: 7, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 9, op: 'Venta', tipo: 'PH', barrio: 'San Juan', dir: 'San Juan al 2100', precio: 63000, moneda: 'USD', ambientes: 3, m2: 70, estado: 'Bueno', amenities: ['Patio'], destacada: false, fotos: 0, img: null },
  { id: 10, op: 'Alquiler', tipo: 'Departamento', barrio: 'Plaza Mitre', dir: 'Rawson al 4300', precio: 390000, moneda: 'ARS', ambientes: 1, m2: 32, estado: 'Muy bueno', amenities: [], destacada: false, fotos: 3, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 11, op: 'Venta', tipo: 'Lote', barrio: 'Constitución', dir: 'Rizzuto al 600', precio: 22000, moneda: 'USD', ambientes: null, m2: 300, estado: null, amenities: [], destacada: false, fotos: 1, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barrio%20La%20Perla%20antiguo.jpg?width=700' },
  { id: 12, op: 'Venta', tipo: 'Cochera', barrio: 'Centro', dir: 'San Martín al 3000', precio: 8500, moneda: 'USD', ambientes: null, m2: 14, estado: null, amenities: [], destacada: false, fotos: 1, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20al%20atardecer-2.jpg?width=700' },
  { id: 13, op: 'Alquiler', tipo: 'Casa', barrio: 'La Perla', dir: 'Vértiz al 1800', precio: 850000, moneda: 'ARS', ambientes: 4, m2: 140, estado: 'Muy bueno', amenities: ['Patio', 'Cochera'], destacada: true, fotos: 6, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barrio%20La%20Perla%20antiguo.jpg?width=700' },
  { id: 14, op: 'Venta', tipo: 'Departamento', barrio: 'Güemes', dir: 'Alberti al 1500', precio: null, moneda: 'USD', ambientes: 2, m2: 55, estado: 'A refaccionar', amenities: [], destacada: false, fotos: 2, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Alberti.jpg?width=700' },
  { id: 15, op: 'Venta', tipo: 'Local comercial', barrio: 'Centro', dir: 'Rivadavia al 2000', precio: 135000, moneda: 'USD', ambientes: null, m2: 90, estado: 'Bueno', amenities: ['Apto crédito'], destacada: false, fotos: 5, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 16, op: 'Alquiler', tipo: 'Departamento', barrio: 'Centro', dir: 'Corrientes al 1900', precio: 410000, moneda: 'ARS', ambientes: 2, m2: 50, estado: 'Bueno', amenities: [], destacada: false, fotos: 0, img: null },
  { id: 17, op: 'Venta', tipo: 'Casa', barrio: 'San Juan', dir: 'Juan B. Justo al 3200', precio: 88000, moneda: 'USD', ambientes: 3, m2: 95, estado: 'Muy bueno', amenities: ['Cochera'], destacada: false, fotos: 4, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Alberti.jpg?width=700' },
  { id: 18, op: 'Venta', tipo: 'Departamento', barrio: 'Plaza Mitre', dir: 'Rawson al 4700', precio: 39500, moneda: 'USD', ambientes: 2, m2: 45, estado: 'Bueno', amenities: [], destacada: false, fotos: 1, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 19, op: 'Alquiler', tipo: 'PH', barrio: 'Puerto', dir: 'Génova al 800', precio: 340000, moneda: 'ARS', ambientes: 2, m2: 52, estado: 'Muy bueno', amenities: ['Patio'], destacada: false, fotos: 3, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20al%20atardecer-2.jpg?width=700' },
  { id: 20, op: 'Venta', tipo: 'Departamento', barrio: 'Centro', dir: 'Moreno al 2600', precio: 51000, moneda: 'USD', ambientes: 2, m2: 50, estado: 'Excelente', amenities: ['Cochera'], destacada: true, fotos: 5, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
  { id: 21, op: 'Venta', tipo: 'Casa', barrio: 'Constitución', dir: 'Champagnat al 1100', precio: 76000, moneda: 'USD', ambientes: 3, m2: 82, estado: 'Bueno', amenities: ['Patio'], destacada: false, fotos: 2, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barrio%20La%20Perla%20antiguo.jpg?width=700' },
  { id: 22, op: 'Alquiler', tipo: 'Departamento', barrio: 'Güemes', dir: 'Formosa al 700', precio: 520000, moneda: 'ARS', ambientes: 2, m2: 58, estado: 'Muy bueno', amenities: ['Balcón'], destacada: false, fotos: 1, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Alberti.jpg?width=700' },
  { id: 23, op: 'Venta', tipo: 'Departamento', barrio: 'La Perla', dir: 'Alem al 3300', precio: 99000, moneda: 'USD', ambientes: 3, m2: 80, estado: 'Excelente', amenities: ['Vista al mar'], destacada: false, fotos: 0, img: null },
  { id: 24, op: 'Venta', tipo: 'PH', barrio: 'Centro', dir: 'Entre Ríos al 2400', precio: 67000, moneda: 'USD', ambientes: 3, m2: 68, estado: 'Bueno', amenities: ['Patio'], destacada: false, fotos: 6, img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chalet%20calle%20Rawson.jpg?width=700' },
];
