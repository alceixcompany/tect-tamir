'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) return null;

  const navLinks = [
    { name: 'ANA SAYFA', href: '/' },
    { name: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Haberler', href: '/haberler' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-40 sm:h-12 sm:w-48 transition-all duration-300">
              <Image
                src="/demirbaslogo.png"
                alt="Demirbaş Muhasebe Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold transition-all duration-200 relative group ${
                  pathname === link.href ? 'text-[var(--lale-gold)]' : 'text-[#5f6970] hover:text-[#1a1a1a]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--lale-gold)] transition-transform duration-300 origin-left ${
                  pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <Link 
              href="/iletisim" 
              className="bg-[var(--lale-gold)] text-white px-7 py-2.5 rounded-lg text-sm font-bold hover:bg-[#f57c00] transition-all shadow-md shadow-[var(--lale-gold)]/20 active:scale-95"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-[#1a1a1a]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {isMenuOpen && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[10000] bg-white flex flex-col p-10 animate-in slide-in-from-right duration-300">
          <button className="self-end text-[#1a1a1a] mb-10" onClick={() => setIsMenuOpen(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-2xl font-bold text-[#1a1a1a]" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/iletisim" 
              className="bg-[var(--lale-gold)] text-white py-4 rounded-xl text-center font-bold text-lg" 
              onClick={() => setIsMenuOpen(false)}
            >
              Teklif Al
            </Link>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
