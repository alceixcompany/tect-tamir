'use client'
import React from 'react';
import Link from 'next/link';
import {
  FiBarChart2,
  FiFileText,
  FiShield,
  FiUsers,
  FiBriefcase
} from 'react-icons/fi';

const services = [
  {
    icon: FiFileText,
    title: 'Muhasebe',
    description: 'Dönemsel kayıt tutma ve mali raporlama.'
  },
  {
    icon: FiShield,
    title: 'Vergi Danışmanlığı',
    description: 'Vergi avantajlarını maksimize eden yasal çözümler.'
  },
  {
    icon: FiBriefcase,
    title: 'Şirket Kuruluşu',
    description: 'Yerli ve yabancı sermayeli şirketlerin uçtan uca kurulum süreci.'
  },
  {
    icon: FiUsers,
    title: 'Bordro Hizmetleri',
    description: 'Hatasız bordrolama ve profesyonel İK yönetimi desteği.'
  },
  {
    icon: FiBarChart2,
    title: 'Finansal Danışmanlık',
    description: 'Şirketinizin finansal sağlığını koruyan veri odaklı analizler.'
  }
];

const Services = () => {
  return (
    <section id="hizmetler" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block">
            Hizmetlerimiz
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--lale-gold)] rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <article
              key={index}
              className="group p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-[var(--lale-gold)] group-hover:bg-[var(--lale-gold)] group-hover:text-white transition-all duration-300">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#5f6970]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
