'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    slug: 'agir-vasita-beyin-tamiri',
    image: '/heavy_truck_ecu_repair_1778397685432.png',
    title: 'Ağır Vasıta Beyin Tamiri',
    description: 'Tır, kamyon ve otobüs kontrol ünitelerinde (ECU) çip seviyesi hassas müdahale ve onarım.',
    features: ['EURO 6 Sistem Desteği', 'Parametre Programlama', 'Hata Kodu Temizleme']
  },
  {
    slug: 'otomotiv-ecu-tamiri',
    image: '/automotive_ecu_repair_1778397704368.png',
    title: 'Otomotiv ECU Tamiri',
    description: 'Binek araçların motor ve konfor beyinlerinde donanımsal onarım ve yazılım güncellemeleri.',
    features: ['Immobilizer Onarımı', 'Airbag Beyin Tamiri', 'Yazılım Güncelleme']
  },
  {
    slug: 'iphone-anakart-tamiri',
    image: '/iphone_motherboard_repair_1778397775835.png',
    title: 'iPhone Anakart Tamiri',
    description: 'Sıvı teması, şebeke ve enerji sorunlarında mikro-cerrahi hassasiyetinde anakart onarımı.',
    features: ['Veri Kurtarma', 'NAND Değişimi', 'Audio IC Tamiri']
  },
  {
    slug: 'elektronik-kart-tamiri',
    image: '/pcb_card_repair_1778397751635.png',
    title: 'Endüstriyel Kart Tamiri',
    description: 'Üretim makineleri ve endüstriyel cihazların çok katmanlı PCB kartlarında profesyonel çözüm.',
    features: ['PCB Rework', 'BGA Entegre Değişimi', 'Devre Analizi']
  },
  {
    slug: 'abs-klima-beyni',
    image: '/abs_klima_repair_1778397726542.png',
    title: 'ABS / Klima Beyni Onarımı',
    description: 'Güvenlik ve konfor ünitelerinde kronikleşmiş elektronik arızaların kalıcı onarımı.',
    features: ['ABS Modül Tamiri', 'Klima Kontrol Onarımı', 'Sinyal Analizi']
  },
  {
    slug: 'mikro-lehimleme',
    image: '/micro_soldering_lab_1778397801389.png',
    title: 'Mikro Lehimleme Laboratuvarı',
    description: 'İleri seviye mikroskoplar altında gerçekleştirilen hassas mikro lehimleme ve reballing işlemleri.',
    features: ['BGA Reballing', 'SMD Entegre Montajı', 'Mikroskopik Onarım']
  }
];

const ServicesPage = () => {
  return (
    <main className="min-h-screen bg-background text-on-background">
      {/* Services Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image 
          src="/bga_rework_1778396487205.png"
          alt="TECH-LAB BGA Rework"
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
            <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Teknik Çözümler</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
              Endüstriyel <span className="text-tertiary">Uzmanlık</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-20">
        <div className="max-w-4xl">
          <p className="text-xl text-on-surface-variant leading-relaxed font-display uppercase tracking-tight">
            Laboratuvarımızda en karmaşık anakart ve beyin arızalarını, IPC standartlarında ve orijinal parçalar kullanarak çip seviyesinde onarıyoruz.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-surface-container border border-outline-variant rounded-md hover:border-tertiary transition-all duration-500 overflow-hidden glow-border"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-on-surface mb-4">{service.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-technical text-on-surface-variant uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-tertiary shadow-[0_0_8px_#adc7ff]"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/hizmetlerimiz/${service.slug}`}
                  className="btn-tech-outline w-full text-center block"
                >
                  TEKNİK DETAYLAR
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop mt-32">
        <div className="bg-surface-container border border-outline-variant rounded-md p-12 md:p-20 relative overflow-hidden text-center circuit-pattern">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface mb-6 uppercase tracking-tighter">
            Cihazınız İçin <span className="text-tertiary neon-text-glow">Ücretsiz Ön Analiz</span> Alın
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
            Laboratuvarımızda yapılacak ilk inceleme sonrası arıza ve onarım süreci hakkında detaylı rapor sunuyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/iletisim" className="btn-tech px-12 py-4">
              ANALİZ TALEBİ OLUŞTUR
            </Link>
            <Link href="tel:+902125550123" className="btn-tech-outline px-12 py-4">
              TEKNİK DESTEK HATTI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
