'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) return null;

  const navLinks = [
    { name: 'HİZMETLERİMİZ', href: '/hizmetlerimiz' },
    { name: 'HAKKIMIZDA', href: '/hakkimizda' },
    { name: 'GALERİ', href: '/galeri' },
    { name: 'HABERLER', href: '/haberler' },
    { name: 'İLETİŞİM', href: '/iletisim' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-outline-variant/20 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl h-16 shadow-lg' 
          : 'bg-background h-20'
      }`}>
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex items-center justify-between h-full">
          <Link href="/" className="text-xl md:text-2xl font-display font-bold tracking-tighter text-on-background group shrink-0">
            TECH-LAB <span className="text-tertiary transition-all duration-300 group-hover:neon-text-glow">PRECISION</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-technical text-[9px] font-bold tracking-[0.2em] transition-all duration-300 hover:text-tertiary relative group/link ${
                  pathname === link.href ? 'text-tertiary' : 'text-on-surface-variant/70'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-tertiary transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block btn-tech px-10 rounded-full h-11 text-[9px] font-bold tracking-widest shrink-0">
              TEKLİF AL
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-11 w-11 flex items-center justify-center border border-outline-variant/30 rounded-md text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all"
            >
              <div className="w-5 h-4 flex flex-col justify-between overflow-hidden">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-10' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-translate-x-10' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col h-full p-10 pt-32">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-10 right-10 h-12 w-12 flex items-center justify-center border border-outline-variant/30 rounded-full text-on-surface-variant hover:text-tertiary transition-all"
          >
            <span className="text-2xl font-light">×</span>
          </button>

          <div className="space-y-12">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-4xl font-display font-bold tracking-tighter transition-all duration-300 ${
                  pathname === link.href ? 'text-tertiary translate-x-4' : 'text-on-surface-variant hover:text-on-surface hover:translate-x-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-tertiary/20 text-sm mr-4 font-technical">0{i + 1}</span>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-6">
            <button className="btn-tech w-full py-6 rounded-full text-xs font-bold tracking-[0.3em]">
              TEKLİF AL
            </button>
            <div className="flex justify-between items-center px-2">
              <span className="font-technical text-[8px] text-on-surface-variant/40 uppercase tracking-[0.5em]">Istanbul / Tech-Lab Precision</span>
              <div className="h-px flex-1 mx-6 bg-outline-variant/20"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
