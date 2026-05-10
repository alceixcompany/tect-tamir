'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    icon: 'local_shipping',
    image: '/heavy_truck_ecu_repair_1778397685432.png',
    title: 'Ağır Vasıta Beyin Tamiri',
    description: 'Tır, kamyon ve otobüslerin motor kontrol üniteleri (ECU) üzerinde çip seviyesi hassas onarım.'
  },
  {
    icon: 'directions_car',
    image: '/automotive_ecu_repair_1778397704368.png',
    title: 'Otomotiv ECU Tamiri',
    description: 'Binek araçların tüm elektronik beyin arızaları, yazılım güncellemeleri ve donanım müdahaleleri.'
  },
  {
    icon: 'ac_unit',
    image: '/abs_klima_repair_1778397726542.png',
    title: 'ABS / Klima Beyni Onarımı',
    description: 'Güvenlik ve konfor ünitelerinde meydana gelen sistemsel ve fiziksel arızaların giderilmesi.'
  },
  {
    icon: 'memory',
    image: '/pcb_card_repair_1778397751635.png',
    title: 'Elektronik Kart Tamiri',
    description: 'Endüstriyel ve bireysel kullanımda olan her türlü çok katmanlı elektronik kartın onarımı.'
  },
  {
    icon: 'smartphone',
    image: '/iphone_motherboard_repair_1778397775835.png',
    title: 'iPhone Anakart Tamiri',
    description: 'Sıvı teması, şebeke sorunları ve açılmama gibi kritik iPhone anakart arızalarında mikro cerrahi.'
  },
  {
    icon: 'biotech',
    image: '/micro_soldering_lab_1778397801389.png',
    title: 'Mikro Lehimleme',
    description: 'Çip değişimi, entegre onarımı ve BGA reballing işlemlerinde laboratuvar hassasiyeti.'
  }
];

const Services = () => {
  return (
    <section id="hizmetler" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="font-technical text-tertiary tracking-[0.3em] uppercase text-xs">UZMANLIK ALANLARIMIZ</span>
            <h2 className="text-4xl text-on-surface mt-2">Endüstriyel Onarım Çözümleri</h2>
          </div>
          <div className="text-on-surface-variant font-technical max-w-sm text-right hidden md:block text-xs uppercase tracking-wider">
            Gelişmiş mikroskoplar ve diagnostik ekipmanlar ile her türlü karmaşık devre onarımını gerçekleştiriyoruz.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-surface-container border border-outline-variant hover:border-tertiary transition-all duration-300 relative circuit-pattern glow-border overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
              </div>
              
              <div className="p-8 pt-4">
                <div className="w-10 h-10 flex items-center justify-center bg-tertiary/10 text-tertiary mb-4 border border-tertiary/20">
                  <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-on-surface">{service.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed h-12 line-clamp-2">{service.description}</p>
                <Link 
                  href="/hizmetlerimiz" 
                  className="font-technical text-tertiary text-[10px] tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  DETAYLARI İNCELE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
