'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Layer - High Fidelity Realistic Photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/realistic_hero.png"
          alt="Profesyonel ECU Onarım Laboratuvarı"
          fill
          className="object-cover opacity-50 brightness-90"
          priority
        />
        {/* Natural Vignette and Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 w-full">
        <div className="max-w-4xl space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-tertiary/40"></span>
              <span className="font-technical text-tertiary uppercase tracking-[0.4em] text-[10px] font-bold">
                Endüstriyel Teknik Laboratuvarı
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] text-on-surface uppercase tracking-tighter">
              Bilimsel Metotlarla <br/>
              <span className="text-white">Elektronik Onarım</span>
            </h1>
            
            <p className="text-lg md:text-xl text-on-surface-variant/80 font-display uppercase tracking-tight max-w-xl">
              Ağır Vasıta, Otomotiv ve Mikro-Cerrahi Anakart Uzmanlığı
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-10"
          >
            <div className="space-y-2">
              <p className="text-on-surface-variant/60 text-xs leading-relaxed max-w-sm">
                Laboratuvarımızda IPC standartlarında, çip seviyesinde hassas müdahaleler gerçekleştirilerek 
                kritik sistemler orijinal formuna kavuşturulur.
              </p>
              <div className="flex gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-tertiary">10+ Yıl</span>
                  <span className="font-technical text-[8px] uppercase tracking-widest text-on-surface-variant/40">Deneyim</span>
                </div>
                <div className="w-[1px] h-8 bg-outline-variant/30"></div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-tertiary">%98.4</span>
                  <span className="font-technical text-[8px] uppercase tracking-widest text-on-surface-variant/40">Başarı</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="btn-tech px-8 py-4 text-[10px] uppercase tracking-[0.3em] bg-white text-black hover:bg-tertiary hover:text-white transition-all">
                TEKNİK ANALİZ TALEBİ
              </button>
              <button className="px-8 py-4 border border-white/20 text-white/80 font-technical text-[9px] tracking-widest hover:bg-white/5 transition-all">
                HİZMETLERİMİZ
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side Detail Element */}
      <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-end gap-4">
        <div className="font-technical text-[9px] text-on-surface-variant/30 uppercase tracking-[0.5em] vertical-rl">
          EST. 2014 / İSTANBUL / IPHONE TAMİR ATÖLYESİ
        </div>
        <div className="w-[1px] h-24 bg-gradient-to-b from-outline-variant/50 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
