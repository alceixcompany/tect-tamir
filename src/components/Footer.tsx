'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMail, FiPhone, FiShare2, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="bg-[#f8fafc] pt-20 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
          
          {/* Logo ve Hakkında */}
          <div className="space-y-6 text-center md:text-left">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-40 sm:h-12 sm:w-48">
                <Image
                  src="/demirbaslogo.png"
                  alt="Demirbaş Muhasebe Logo"
                  fill
                  className="object-contain object-left md:object-left"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#5f6970] max-w-xs mx-auto md:mx-0">
              Küresel standartlarda mali müşavirlik ve stratejik danışmanlık hizmetleri sunan güvenilir çözüm ortağınız.
            </p>
          </div>

          {/* Hızlı Bağlantılar */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-4 text-sm text-[#5f6970]">
              <li><Link href="/hakkimizda" className="hover:text-[var(--lale-gold)] transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/hizmetlerimiz" className="hover:text-[var(--lale-gold)] transition-colors">Kullanım Şartları</Link></li>
              <li><Link href="/haberler" className="hover:text-[var(--lale-gold)] transition-colors">Kariyer</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-6">İletişim</h3>
            <ul className="space-y-4 text-sm text-[#5f6970]">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FiMail className="text-[var(--lale-gold)]" />
                <span>info@demirbas.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FiPhone className="text-[var(--lale-gold)]" />
                <span>+90 (212) 555 01 01</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-6 pt-2">
                <FiShare2 className="text-gray-400 cursor-pointer hover:text-[var(--lale-gold)] transition-colors" />
                <FiGlobe className="text-gray-400 cursor-pointer hover:text-[var(--lale-gold)] transition-colors" />
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-200 py-10 text-center">
          <p className="text-xs text-gray-400">
            © 2026 Demirbaş. Created by <a href="https://www.alceix.com/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[var(--lale-gold)] transition-colors">Alceix</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
