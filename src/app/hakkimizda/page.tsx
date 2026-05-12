'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2014', title: 'Laboratuvar Kuruluşu', subtitle: 'İkitelli OSB bünyesinde ilk mikro-lehimleme ünitesi faaliyete geçti.' },
  { year: '2017', title: 'Ağır Vasıta Uzmanlığı', subtitle: 'Scania ve Volvo beyin onarım protokolleri laboratuvarımıza eklendi.' },
  { year: '2020', title: 'Dijital Mikroskopik Onarım', subtitle: '4K dijital analiz ve lazer destekli arıza tespit sistemlerine geçiş yapıldı.' },
  { year: '2024', title: 'Global Standartlar', subtitle: 'IPC-A-610 ve ISO 9001 sertifikalı onarım süreçleri tamamlandı.' },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background text-on-background">
      {/* About Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image 
          src="/clean_room_facility_1778396507960.png"
          alt="iPhone Tamir Atölyesi Temiz Oda Laboratuvarı"
          fill
          className="object-cover opacity-40 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Kurumsal Kimlik</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
              Görünmeyen <span className="text-tertiary">Mimarlar</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-24">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface leading-tight uppercase tracking-tighter">
              Teknolojiye Bilimsel <br/> Bir <span className="text-tertiary">Dokunuş</span>
            </h2>
            <p className="mt-8 text-xl text-on-surface-variant leading-relaxed font-display uppercase tracking-tight">
              iPhone Tamir Atölyesi, modern elektroniğin en hassas noktalarında cerrahi titizlikle çalışan bir teknoloji laboratuvarıdır.
            </p>
            <p className="mt-6 text-on-surface-variant/70 leading-relaxed text-sm">
              2014 yılından bu yana, endüstriyel kontrol ünitelerinden en hassas mobil sistemlere kadar 
              geniş bir spektrumda onarım ve mühendislik hizmeti sunuyoruz. Amacımız, atıl durumdaki 
              sistemleri bilimsel yöntemlerle hayata döndürerek sürdürülebilir bir teknoloji ekosistemi yaratmaktır.
            </p>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 border border-outline-variant overflow-hidden group">
              <Image
                src="/tech_lab_overview_1778397945364.png"
                alt="iPhone Tamir Atölyesi Laboratuvarı"
                width={800}
                height={600}
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-tertiary/10 -z-10 translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </section>

      {/* Stats / Timeline */}
      <section className="bg-surface-container py-24 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {milestones.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l border-tertiary/30"
              >
                <div className="text-4xl font-display font-bold text-tertiary mb-2">{item.year}</div>
                <h3 className="text-lg font-bold text-on-surface mb-2 uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid lg:grid-cols-2 gap-32">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tighter">MİSYONUMUZ</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  Elektronik atığı minimize ederek, yüksek maliyetli kontrol ünitelerini ve anakartları orijinal performansına döndürmek; 
                  müşterilerimize ekonomik ve sürdürülebilir teknik çözümler sunmak.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-surface-container-high border border-outline-variant">
                  <span className="material-symbols-outlined text-tertiary mb-4">precision_manufacturing</span>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-2">HASSASİYET</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">Mikroskobik seviyede hatasız onarım protokolleri.</p>
                </div>
                <div className="p-6 bg-surface-container-high border border-outline-variant">
                  <span className="material-symbols-outlined text-tertiary mb-4">science</span>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-2">BİLİMSELLİK</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">Veriye dayalı diagnostik ve analiz yöntemleri.</p>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-4 text-right">
                <h2 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tighter">VİZYONUMUZ</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  Türkiye'nin en gelişmiş bağımsız elektronik onarım laboratuvarı olarak, endüstriyel ve bireysel teknolojilerde 
                  "onarılamaz" denilen her şeyi bilimsel standartlarda çözüme ulaştıran lider kuruluş olmak.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-surface-container-high border border-outline-variant">
                  <span className="material-symbols-outlined text-tertiary mb-4">security</span>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-2">GÜVENLİK</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">Veri gizliliği ve donanım bütünlüğü koruması.</p>
                </div>
                <div className="p-6 bg-surface-container-high border border-outline-variant">
                  <span className="material-symbols-outlined text-tertiary mb-4">verified</span>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-2">GARANTİ</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">Yapılan her onarımda servis garantisi desteği.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab CTA */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop mb-24">
        <div className="bg-surface-container border border-outline-variant p-20 text-center relative overflow-hidden circuit-pattern">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface mb-8 uppercase tracking-tighter">
            Laboratuvarımızı <span className="text-tertiary neon-text-glow">Ziyaret Edin</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            İkitelli OSB'de bulunan yüksek teknolojili laboratuvarımızda, onarım süreçlerimizi şeffaf bir şekilde inceleyebilir ve 
            teknik ekibimizden detaylı bilgi alabilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/galeri" className="btn-tech px-12 py-4">
              LABORATUVARI GÖRÜNTÜLE
            </Link>
            <Link href="/iletisim" className="btn-tech-outline px-12 py-4">
              İLETİŞİME GEÇİN
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
