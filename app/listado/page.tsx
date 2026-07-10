import { Suspense } from 'react';
import ListadoContent from '@/components/ListadoContent';

export default function ListadoPage() {
  return (
    <Suspense fallback={
      <div className="pt-36 text-center text-[#6f6a6d]">Cargando propiedades...</div>
    }>
      <ListadoContent />
    </Suspense>
  );
}
