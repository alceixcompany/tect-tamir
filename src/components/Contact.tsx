'use client'
import React from 'react';
import Image from 'next/image';

const Contact = () => {
  return (
    <section id="iletisim" className="bg-background py-24 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Reviews/Experience */}
          <div>
            <span className="font-technical text-tertiary tracking-[0.3em] uppercase mb-4 block text-xs">Müşteri Deneyimi</span>
            <h2 className="text-4xl text-on-surface mb-12">Güvenilir Referanslar</h2>
            <div className="space-y-8">
              <div className="p-6 bg-surface-container-low border-l-4 border-tertiary">
                <div className="flex text-tertiary mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant italic mb-4">"Ağır vasıta aracımın beynini başka servislerin 'tamir edilemez' demesine rağmen 2 günde onarıp teslim ettiler. Gerçekten uzman bir ekip."</p>
                <div className="font-technical text-on-surface text-xs uppercase tracking-wider">Ahmet Y. - Lojistik Firma Sahibi</div>
              </div>
              <div className="p-6 bg-surface-container-low border-l-4 border-outline-variant">
                <div className="flex text-tertiary mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant italic mb-4">"iPhone anakartındaki sıvı temasını titizlikle temizleyip cihazımı verileriyle birlikte kurtardılar. Teşekkürler iPhone Tamir Atölyesi."</p>
                <div className="font-technical text-on-surface text-xs uppercase tracking-wider">Merve K. - Freelance Tasarımcı</div>
              </div>
            </div>
          </div>

          {/* Contact/Map */}
          <div className="bg-surface-container border border-outline-variant p-8 relative">
            <h3 className="text-2xl font-display font-bold text-on-surface mb-8 uppercase tracking-tighter">İletişim & Lokasyon</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary mt-1">location_on</span>
                <div>
                  <div className="font-technical text-on-surface-variant text-[10px] tracking-widest uppercase">ADRES</div>
                  <p className="text-sm">Esenler / İstanbul</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary mt-1">call</span>
                <div>
                  <div className="font-technical text-on-surface-variant text-[10px] tracking-widest uppercase">TELEFON</div>
                  <p className="text-sm">+90 (551) 367 81 34</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary mt-1">mail</span>
                <div>
                  <div className="font-technical text-on-surface-variant text-[10px] tracking-widest uppercase">E-POSTA</div>
                  <p className="text-sm">Zaferbicici34@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-48 bg-background border border-outline-variant relative overflow-hidden">
              <Image 
                src="/stylized_map_1778396592720.png"
                alt="Istanbul Location Map"
                fill
                className="object-cover opacity-80 contrast-125"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-background/90 border border-tertiary p-2 text-[10px] font-technical text-tertiary animate-bounce uppercase">
                  41°02'10.7"N 28°52'58.3"E
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
