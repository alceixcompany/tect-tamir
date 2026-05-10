'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-white pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-7 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Sol Metin Bloğu */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl text-left"
          >
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-[#1a1a1a]">
              Finansal Geleceğinizi <br />
              <span className="text-[var(--lale-gold)]">Güvenle</span> İnşa Edin
            </h1>
            
            <p className="mt-8 text-lg leading-relaxed text-[#5f6970]">
              Mali süreçlerinizde uzmanlık, şeffaflık ve dijital dönüşümün 
              gücüyle işletmenize değer katıyoruz. Prestijli danışmanlık 
              hizmetlerimizle tanışın.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                href="/iletisim" 
                className="inline-flex items-center justify-center rounded-lg bg-[var(--lale-gold)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#f57c00] hover:scale-105 active:scale-95"
              >
                ÜCRETSİZ DANIŞMANLIK AL
              </Link>
            </div>
          </motion.div>

          {/* Sağ Görsel Bloğu */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/banner/hero_meeting.png"
                alt="Demirbaş Muhasebe Toplantı Odası"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Dekoratif eleman (İsteğe bağlı, resimdeki gölge ve derinlik hissi için) */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-[var(--lale-gold)]/10 rounded-[2rem]"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
