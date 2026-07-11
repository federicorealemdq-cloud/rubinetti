'use client';
import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const tryScroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // Pequeño delay para que la página termine de renderizar
    const t = setTimeout(tryScroll, 80);
    return () => clearTimeout(t);
  }, []);

  return null;
}
