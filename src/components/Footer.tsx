'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  if (isAdminPage) {
    return null;
  }

  const services = [
    'iPhone Anakart Tamiri',
    'Mikro Lehimleme Laboratuvarı',
    'Hassas Elektronik Kart Tamiri',
    'Veri Kurtarma',
    'Ekran & Batarya Değişimi'
  ];

  return (
    <footer className="bg-surface-container-lowest text-on-surface-variant border-t border-outline-variant pt-20 pb-10">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="relative h-16 w-64 block">
              <Image
                src="/iphonetamiratolyesi_logo.png"
                alt="iPhone Tamir Atölyesi"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              iPhone anakart onarımı ve mikro lehimleme alanında uzman laboratuvar altyapısı ile profesyonel teknik servis çözümleri sunuyoruz.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-outline-variant rounded-full flex items-center justify-center hover:border-tertiary hover:text-tertiary transition-all">
                <span className="material-symbols-outlined text-sm">share</span>
              </Link>
              <Link href="#" className="w-10 h-10 border border-outline-variant rounded-full flex items-center justify-center hover:border-tertiary hover:text-tertiary transition-all">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-technical text-on-surface text-[10px] tracking-[0.2em] uppercase mb-8">HİZMETLERİMİZ</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href="/hizmetlerimiz" className="text-sm hover:text-tertiary transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-tertiary/30 group-hover:bg-tertiary transition-all"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-technical text-on-surface text-[10px] tracking-[0.2em] uppercase mb-8">KURUMSAL</h4>
            <ul className="space-y-4">
              <li><Link href="/hakkimizda" className="text-sm hover:text-tertiary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/galeri" className="text-sm hover:text-tertiary transition-colors">Laboratuvarımız</Link></li>
              <li><Link href="/haberler" className="text-sm hover:text-tertiary transition-colors">Teknik Analizler</Link></li>
              <li><Link href="/iletisim" className="text-sm hover:text-tertiary transition-colors">İletişim</Link></li>
              <li><Link href="#" className="text-sm hover:text-tertiary transition-colors">KVKK Aydınlatma Metni</Link></li>
              <li><Link href="#" className="text-sm hover:text-tertiary transition-colors">Garanti Şartları</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-technical text-on-surface text-[10px] tracking-[0.2em] uppercase mb-8">İLETİŞİM</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary text-lg">location_on</span>
                <p className="text-sm">Esenler / İstanbul</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary text-lg">call</span>
                <p className="text-sm font-technical">+90 (551) 367 81 34</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-outline-variant/30 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="font-technical text-[10px] tracking-widest uppercase opacity-60">
            © 2026 IPHONE TAMİR ATÖLYESİ. TÜM HAKLARI SAKLIDIR.
          </div>
          <div className="font-technical text-[10px] tracking-widest uppercase flex items-center gap-4">
            <span>DESIGNED BY <Link href="https://www.alceix.com/" target="_blank" className="text-tertiary font-bold hover:underline">ALCEIX</Link></span>
            <span className="opacity-40">|</span>
            <span className="opacity-60">ALCEIX tarafından oluşturulmuştur.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
