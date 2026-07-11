'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Venta', href: '/listado?operacion=Venta' },
  { label: 'Alquiler', href: '/listado?operacion=Alquiler' },
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
  { label: 'Tasaciones', href: '/tasaciones' },
  { label: 'Contacto', href: '/#contacto' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href.split('?')[0];
  };

  const abrir = () => {
    setMenuAbierto(true);
    document.body.classList.add('menu-abierto');
  };
  const cerrar = () => {
    setMenuAbierto(false);
    document.body.classList.remove('menu-abierto');
  };

  const scrollToAnchor = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const manejarLinkDesktop = (href: string, e: React.MouseEvent) => {
    if (!href.startsWith('/#')) return;
    if (pathname === '/') {
      e.preventDefault();
      scrollToAnchor(href.slice(2));
    }
    // Si no estamos en home, <Link> navega a /#... y el browser + useEffect de la home hacen el scroll
  };

  const manejarLinkDrawer = (href: string, e: React.MouseEvent) => {
    cerrar();
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      requestAnimationFrame(() => scrollToAnchor(href.slice(2)));
    }
    // Si no estamos en home, <Link> navega a /#... normalmente
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') cerrar(); };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.classList.remove('menu-abierto');
    };
  }, []);

  return (
    <>
      <nav
        id="nav"
        aria-label="Principal"
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: '#faf9f8', boxShadow: '0 1px 0 rgba(38,37,37,.14)' }}
      >
        {/* Utility bar — se oculta en mobile vía CSS .nav-utilitaria */}
        <div className="nav-utilitaria" style={{ borderBottom: '1px solid rgba(38,37,37,.14)' }}>
          <div
            className="max-w-[1140px] mx-auto flex items-center justify-end gap-[22px]"
            style={{ padding: '9px 24px', color: '#6f6a6d', fontSize: '13px' }}
          >
            <div className="flex items-center gap-5">
              <a href="tel:+542235456335" className="flex items-center gap-1.5 transition-colors hover:text-[#262525]">
                <Phone size={14} />
                +54 223 545-6335
              </a>
              <a href="mailto:info@rubinettipropiedades.com.ar" className="flex items-center gap-1.5 transition-colors hover:text-[#262525]">
                <Mail size={14} />
                info@rubinettipropiedades.com.ar
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center transition-colors hover:bg-[rgba(138,79,112,.08)]"
                style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid rgba(38,37,37,.14)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#aa6d8f')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(38,37,37,.14)')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center transition-colors hover:bg-[rgba(138,79,112,.08)]"
                style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid rgba(38,37,37,.14)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#aa6d8f')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(38,37,37,.14)')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className="flex items-center justify-between max-[720px]:justify-start max-[720px]:gap-4 max-w-[1140px] mx-auto"
          style={{ padding: '18px 24px' }}
        >
          {/* Hamburguesa — visible sólo en mobile vía CSS .btn-hamburguesa */}
          <button
            className="btn-hamburguesa"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            aria-controls="menu-mobile"
            onClick={abrir}
          >
            <Menu size={26} />
          </button>

          <Link href="/" aria-label="Rubinetti Propiedades — inicio">
            <Image
              src="/logo-rubinetti-horizontal.png"
              alt="Rubinetti Propiedades"
              width={160}
              height={48}
              priority
              className="h-12 max-[720px]:h-[34px] w-auto"
            />
          </Link>

          {/* Links desktop — ocultos en mobile vía CSS .nav-links-desktop */}
          <ul
            className="nav-links-desktop flex items-center"
            style={{ gap: '30px', fontSize: '15px', fontWeight: 500 }}
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link-underline ${isActive(link.href) ? 'text-[#8a4f70]' : 'text-[#262525]'}`}
                  onClick={(e) => manejarLinkDesktop(link.href, e)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`menu-mobile-backdrop ${menuAbierto ? 'abierto' : ''}`}
        onClick={cerrar}
        aria-hidden="true"
      />

      {/* Drawer mobile */}
      <div
        id="menu-mobile"
        className={`menu-mobile ${menuAbierto ? 'abierto' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        {/* Header con botón cerrar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
          <button
            className="menu-mobile-cerrar"
            id="btn-cerrar-menu"
            type="button"
            aria-label="Cerrar menú"
            onClick={cerrar}
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="menu-mobile-links" role="navigation" aria-label="Principal (mobile)">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={(e) => manejarLinkDrawer(link.href, e)}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contacto */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(38,37,37,.14)',
            fontSize: '14.5px',
            color: '#6f6a6d',
          }}
        >
          <a href="tel:+542235456335" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={16} style={{ flexShrink: 0 }} />
            +54 223 545-6335
          </a>
          <a href="mailto:info@rubinettipropiedades.com.ar" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={16} style={{ flexShrink: 0 }} />
            info@rubinettipropiedades.com.ar
          </a>
        </div>

        {/* Redes */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '22px' }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(38,37,37,.14)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(38,37,37,.14)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
