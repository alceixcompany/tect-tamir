'use client'
import React from 'react';

const References = () => {
  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      title: 'CEO, TechForward AS',
      comment: '"Demirbaş ile çalışmaya başladığımızdan beri mali süreçlerimizde gözle görülür bir hızlanma ve netlik sağladık."'
    },
    {
      name: 'Zeynep Kaya',
      title: 'Kurucu, Global Trade',
      comment: '"Mali danışmanlık konusundaki derin bilgileri, yatırım kararlarımızda bize büyük bir güven verdi."'
    },
    {
      name: 'Mehmet Demir',
      title: 'Operasyon Müdürü, Nexus Log',
      comment: '"Bordrolama ve SGK desteği konusunda aldığımız hizmet, operasyonel yükümüzü %40 oranında azalttı."'
    }
  ];

  return (
    <section id="referanslar" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#1a1a1a]">Referanslarımız</h2>
          <p className="mt-4 text-[#5f6970]">Lider kurumların güvenilir iş ortağıyız.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <article
              key={index}
              className="relative p-10 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-6xl text-[var(--lale-gold)]/20 font-serif absolute top-6 right-8 leading-none select-none">”</div>
              
              <p className="relative z-10 text-lg leading-relaxed text-[#5f6970] mb-8 italic">
                {item.comment}
              </p>
              
              <div className="mt-auto">
                <h4 className="font-bold text-[#1a1a1a] text-lg">{item.name}</h4>
                <p className="text-[var(--lale-gold)] text-sm font-medium mt-1">{item.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;
