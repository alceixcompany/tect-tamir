'use client'
import React from 'react';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="iletisim" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Sol: Form */}
          <div className="flex-1 w-full">
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-2">Bize Ulaşın</h2>
            <p className="text-[#5f6970] mb-8">
              Danışmanlık talepleriniz veya sorularınız için aşağıdaki formu doldurabilir ya da bizi ofisimizde ziyaret edebilirsiniz.
            </p>

            <form className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">AD SOYAD</label>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">E-POSTA</label>
                <input
                  type="email"
                  placeholder="email@adresiniz.com"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">MESAJINIZ</label>
                <textarea
                  rows={4}
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[var(--lale-gold)] text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--lale-gold)] text-white py-4 rounded-lg font-bold text-xs tracking-[0.15em] hover:bg-[#f57c00] transition-all shadow-lg shadow-[var(--lale-gold)]/20 active:scale-[0.98]"
              >
                GÖNDER
              </button>
            </form>
          </div>

          {/* Sağ: Harita/Adres Bloğu */}
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] w-full bg-gray-200 rounded-[2rem] relative overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Ofis Görseli */}
              <Image 
                src="/banner/office_contact.png"
                alt="Demirbaş Ofis"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gray-900/10"></div>
              
              {/* Adres Kartı */}
              <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center text-center max-w-[320px]">
                <div className="h-10 w-10 bg-[var(--lale-gold)]/10 rounded-full flex items-center justify-center text-[var(--lale-gold)] mb-4">
                  <FiMapPin className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[#1a1a1a] mb-2 text-lg">Demirbaş Merkez Ofis</h4>
                <p className="text-sm text-[#5f6970] leading-relaxed">
                  Levent, Büyükdere Cd. No:123 <br />
                  34394 Beşiktaş/İstanbul
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
