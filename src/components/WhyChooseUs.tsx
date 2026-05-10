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
    <section className="py-20 bg-surface-container-lowest border-y border-outline-variant relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar justify-between items-center gap-12 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-12 py-6 px-4 md:px-0">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center group min-w-[120px] snap-center`}
            >
              <div className="font-display text-4xl md:text-5xl text-tertiary mb-2 neon-text-glow group-hover:scale-110 transition-transform duration-500 whitespace-nowrap">
                {stat.value}
              </div>
              <div className="font-technical text-on-surface-variant tracking-[0.2em] text-[8px] md:text-[9px] uppercase font-bold whitespace-nowrap">
                {stat.label}
              </div>
              <div className="w-8 h-[1px] bg-tertiary/30 mt-3 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
