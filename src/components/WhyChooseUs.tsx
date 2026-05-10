'use client'
import React from 'react';

const stats = [
  { value: '10+', label: 'YILLIK DENEYİM' },
  { value: '5000+', label: 'BAŞARILI ONARIM' },
  { value: '100%', label: 'GELİŞMİŞ TEST' },
  { value: '24H', label: 'HIZLI SERVİS' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-surface-container-lowest border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-5xl text-tertiary mb-2 neon-text-glow">
                {stat.value}
              </div>
              <div className="font-technical text-on-surface-variant tracking-widest text-[10px] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
