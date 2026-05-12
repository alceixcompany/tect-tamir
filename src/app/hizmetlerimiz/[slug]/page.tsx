'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { FiArrowRight, FiCheckCircle, FiArrowLeft, FiClock, FiSettings, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const servicesData = {
  'iphone-anakart-tamiri': {
    title: 'iPhone Anakart Tamiri',
    image: '/iphone_motherboard_repair_1778397775835.png',
    icon: '01',
    description: 'Sıvı teması, şebeke ve enerji sorunlarında mikro-cerrahi hassasiyetinde anakart onarımı.',
    features: ['Veri Kurtarma', 'NAND Değişimi', 'Audio IC Tamiri', 'FaceID Onarımı'],
    overview: 'Mikro-elektronik dünyasının en hassas alanı olan iPhone anakartları, laboratuvarımızda yüksek çözünürlüklü mikroskoplar altında onarılmaktadır.',
    whyChoose: ['Mikro-Cerrahi Ekipmanlar', 'Veri Güvenliği Önceliği', 'Yüksek Başarı Oranı'],
    process: [
      { step: 1, title: 'Mikroskopik İnceleme', description: 'Kart üzerindeki oksitlenme ve kısa devre alanları saptanır.' },
      { step: 2, title: 'Katman Analizi', description: 'Çok katmanlı kart yapısındaki iç kopukluklar kontrol edilir.' },
      { step: 3, title: 'Entegre Reballing', description: 'Ayakları kopan veya bozulan çipler yeniden kalıplanarak dizilir.' },
      { step: 4, title: 'Stabilite Testi', description: 'Cihazın tüm sensör ve ağ fonksiyonları test edilir.' },
    ],
  },
  'mikro-lehimleme': {
    title: 'Mikro Lehimleme Laboratuvarı',
    image: '/micro_soldering_lab_1778397801389.png',
    icon: '02',
    description: 'İleri seviye mikroskoplar altında gerçekleştirilen hassas mikro lehimleme ve reballing işlemleri.',
    features: ['BGA Reballing', 'SMD Entegre Montajı', 'Mikroskopik Onarım', 'İnce Hat Jumper Uygulaması'],
    overview: 'Standart lehimleme tekniklerinin yetersiz kaldığı mikron seviyesindeki işlemler için uzman ekibimizle hizmet veriyoruz.',
    whyChoose: ['JBC & Metcal Ekipmanlar', 'Sertifikalı Teknik Personel', 'Mikron Seviyesinde Hassasiyet'],
    process: [
      { step: 1, title: 'Hazırlık', description: 'Çalışma alanı ve komponentler ESD korumalı ortamda hazırlanır.' },
      { step: 2, title: 'Mikro-Müdahale', description: 'Yüksek çözünürlüklü mikroskop altında hassas lehimleme yapılır.' },
      { step: 3, title: 'X-Ray Kontrolü', description: 'Görünmeyen lehim bağlantıları teknik yöntemlerle kontrol edilir.' },
      { step: 4, title: 'Temizlik & Koruma', description: 'Onarılan alan ultrasonik temizlikten geçirilir ve koruyucu kaplama uygulanır.' },
    ],
  },
  'elektronik-kart-tamiri': {
    title: 'Hassas Elektronik Kart Tamiri',
    image: '/pcb_card_repair_1778397751635.png',
    icon: '03',
    description: 'Bireysel ve kurumsal cihazların çok katmanlı PCB kartlarında profesyonel çözüm.',
    features: ['PCB Rework', 'BGA Entegre Değişimi', 'Devre Analizi', 'SMD Montajı'],
    overview: 'Hassas elektronik sistemlerin duruş süresini en aza indirmek için kritik önem taşıyan kontrol kartlarını hızla onarıyoruz.',
    whyChoose: ['Gelişmiş Parça Stoğu', 'Yerinde Analiz İmkanı', 'Kritik Sistem Tecrübesi'],
    process: [
      { step: 1, title: 'Devre Şeması Analizi', description: 'Kartın çalışma prensibi ve kritik noktaları belirlenir.' },
      { step: 2, title: 'Kritik Komponent Testi', description: 'Hassas ölçüm cihazları ile parçalar incelenir.' },
      { step: 3, title: 'Parça Değişimi', description: 'Uluslararası standartlarda yedek parçalarla onarım yapılır.' },
      { step: 4, title: 'Yük Altında Test', description: 'Kartın gerçek çalışma yükünde stabilitesi ölçülür.' },
    ],
  },
} as const;

type ServiceSlug = keyof typeof servicesData;

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as ServiceSlug;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-on-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover opacity-40 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/hizmetlerimiz" className="inline-flex items-center gap-2 text-[10px] font-bold text-tertiary uppercase tracking-[0.4em] mb-8 hover:opacity-70 transition-all">
              <FiArrowLeft /> ANALİZ MERKEZİNE DÖN
            </Link>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-tertiary/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-tertiary">Teknik Spesifikasyon</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold text-on-surface leading-[0.95] mb-6 uppercase tracking-tighter">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant/80 leading-relaxed max-w-xl font-display uppercase tracking-tight">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            
            {/* Left Column: Scope & Features */}
            <div className="lg:col-span-7 space-y-20">
              <div className="space-y-8">
                <h2 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tight">Operasyonel Kapsam</h2>
                <p className="text-lg leading-relaxed text-on-surface-variant/70 font-display">
                  {service.overview}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  {service.features.map((item) => (
                    <div key={item} className="flex items-start gap-4 p-5 rounded-md border border-outline-variant/30 bg-surface-container/50 group hover:border-tertiary/30 transition-all">
                      <div className="h-6 w-6 rounded-sm bg-tertiary/10 border border-tertiary/20 flex items-center justify-center shrink-0">
                        <FiCheckCircle className="h-3 w-3 text-tertiary" />
                      </div>
                      <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-on-surface-variant/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Section */}
              <div className="pt-12 border-t border-outline-variant/20">
                <h2 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tight mb-12">Teknik İş Akışı</h2>
                <div className="space-y-4">
                  {service.process.map((item) => (
                    <div key={item.step} className="relative flex gap-10 group bg-surface-container/30 p-8 rounded-lg border border-transparent hover:border-outline-variant/30 transition-all">
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-background border border-outline-variant text-tertiary text-xs font-technical font-bold z-10 group-hover:border-tertiary transition-colors">
                          0{item.step}
                        </div>
                        {item.step !== service.process.length && (
                          <div className="h-full w-[1px] bg-outline-variant/20 absolute top-20" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-technical font-bold text-on-surface uppercase tracking-wider group-hover:text-tertiary transition-colors">{item.title}</h4>
                        <p className="text-xs leading-relaxed text-on-surface-variant/50 uppercase tracking-widest">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Why Us & CTA */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                {/* Why Choose Card */}
                <div className="bg-surface-container border border-outline-variant p-10 rounded-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-5 rotate-90"></div>
                  <h3 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight mb-10 flex items-center gap-4">
                    <FiActivity className="text-tertiary" />
                    Laboratuvar Standartları
                  </h3>
                  <div className="space-y-8">
                    {service.whyChoose.map((item) => (
                      <div key={item} className="flex gap-5">
                        <div className="h-1.5 w-1.5 rounded-full bg-tertiary mt-2 shrink-0 shadow-[0_0_8px_#adc7ff]" />
                        <p className="text-[10px] leading-relaxed text-on-surface-variant font-technical font-bold uppercase tracking-widest">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consultation CTA */}
                <div className="bg-surface-container/30 border border-outline-variant p-10 rounded-md text-center circuit-pattern">
                  <FiSettings className="h-10 w-10 text-tertiary mx-auto mb-8 animate-spin-slow" />
                  <h3 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight mb-4">Hassas Analiz Talebi</h3>
                  <p className="text-[10px] text-on-surface-variant/60 font-technical uppercase tracking-widest leading-loose mb-10">
                    Kritik sistemleriniz için profesyonel laboratuvar raporu ve onarım planı hazırlayalım.
                  </p>
                  <Link href="/iletisim" className="btn-tech w-full py-5 text-xs font-bold tracking-[0.3em] block rounded-md">
                    ANALİZ BAŞLAT
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
