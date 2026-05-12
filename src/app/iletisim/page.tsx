'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [success, setSuccess] = useState(false);

  return (
    <main className="min-h-screen bg-background text-on-background relative overflow-hidden">
      {/* Contact Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image 
          src="/tech_lab_overview_1778397945364.png"
          alt="iPhone Tamir Atölyesi Laboratuvar"
          fill
          className="object-cover opacity-40 brightness-75 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">İletişim & Teknik Destek</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
              Teknik Analiz <span className="text-tertiary">Masası</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-24 relative">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Info & Visuals */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-xl text-on-surface-variant leading-relaxed max-w-md">
                Kritik sistemlerin onarımı ve mikro-cerrahi müdahaleler için mühendislik ekibimizle doğrudan bağlantı kurun.
              </p>
              
              <div className="relative aspect-video w-full overflow-hidden border border-outline-variant group">
                <Image 
                  src="/micro_soldering_lab_1778397801389.png"
                  alt="Mikro Lehimleme Laboratuvarı"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 font-technical text-[8px] text-tertiary tracking-widest uppercase">Operasyonel Birim / Laboratuvar-01</div>
              </div>
            </motion.div>

            <div className="grid gap-6">
              {[
                { icon: 'location_on', label: 'Laboratuvar Adresi', value: 'Esenler / İstanbul' },
                { icon: 'contact_support', label: 'Teknik Destek', value: '+90 (551) 367 81 34' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 bg-surface-container/30 border border-outline-variant/30 hover:border-tertiary/20 transition-all group flex gap-6"
                >
                  <span className="material-symbols-outlined text-tertiary text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-technical text-[9px] text-on-surface-variant/40 uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-on-surface font-medium text-sm leading-snug">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-surface-container border border-outline-variant p-10 md:p-16 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-10 rotate-90"></div>
              
              <div className="mb-12">
                <h3 className="text-2xl font-display font-bold text-on-surface uppercase tracking-tight">ANALİZ TALEBİ</h3>
                <div className="w-12 h-[1px] bg-tertiary mt-4"></div>
              </div>
              
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">AD SOYAD / KURUM</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/30 px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary outline-none transition-all" placeholder="Giriş yapın..." />
                  </div>
                  <div className="space-y-3">
                    <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">İLETİŞİM NUMARASI</label>
                    <input type="tel" className="w-full bg-background border border-outline-variant/30 px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary outline-none transition-all" placeholder="05XX XXX XX XX" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">SİSTEM KATEGORİSİ</label>
                    <select className="w-full bg-background border border-outline-variant/30 px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary outline-none appearance-none cursor-pointer">
                      <option>Ağır Vasıta ECU / Kontrol Ünitesi</option>
                      <option>Endüstriyel Otomasyon Kartları</option>
                      <option>Tıbbi Cihaz Elektroniği</option>
                      <option>Hassas Mobil Sistemler</option>
                      <option>Diğer Karmaşık Devreler</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">ÖNCELİK SEVİYESİ</label>
                    <select className="w-full bg-background border border-outline-variant/30 px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary outline-none appearance-none cursor-pointer">
                      <option>STANDART (48 Saat)</option>
                      <option>HIZLI (24 Saat)</option>
                      <option>KRİTİK (Acil Müdahale)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">ARIZA DETAYLARI</label>
                  <textarea rows={5} className="w-full bg-background border border-outline-variant/30 px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary outline-none resize-none transition-all" placeholder="Arıza belirtilerini detaylıca buraya aktarın..."></textarea>
                </div>

                <button type="submit" className="btn-tech w-full py-5 text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 group">
                  SİSTEM ANALİZİNİ BAŞLAT
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">east</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Integration */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop mb-24">
        <div className="relative aspect-[21/9] border border-outline-variant overflow-hidden group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3181.91326781458!2d28.880287076041974!3d41.036315971346724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDAyJzEwLjciTiAyOMKwNTInNTguMyJF!5e1!3m2!1str!2saz!4v1778560712527!5m2!1str!2saz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="iPhone Tamir Atölyesi Konumu"
            className="filter contrast-125 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          />
          <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-md border border-outline-variant p-4 font-technical text-[9px] text-tertiary uppercase tracking-[0.3em]">
            KOORDİNATLAR: 41°02'10.7"N 28°52'58.3"E
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
