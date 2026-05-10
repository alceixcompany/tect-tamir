'use client'
import React from 'react';

const steps = [
  { icon: 'input', title: 'CİHAZ KABUL', desc: 'Kayıt ve fiziksel ön inceleme.' },
  { icon: 'search_insights', title: 'ARIZA TESPİTİ', desc: 'Yazılımsal ve donanımsal tarama.' },
  { icon: 'analytics', title: 'TEKNİK ANALİZ', desc: 'Mikroskobik devre incelemesi.' },
  { icon: 'precision_manufacturing', title: 'ÇİP ONARIM', desc: 'Hassas mikro lehimleme işlemi.' },
  { icon: 'fact_check', title: 'TEST SÜRECİ', desc: 'Fonksiyonel performans testleri.' },
  { icon: 'verified_user', title: 'TESLİMAT', desc: 'Garanti belgesi ile güvenli teslim.' },
];

const References = () => {
  return (
    <section id="process" className="py-24 bg-background">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="text-left md:text-center mb-20">
          <span className="font-technical text-tertiary tracking-[0.3em] uppercase text-xs">Süreç Analizi</span>
          <h2 className="text-4xl text-on-surface mt-2 uppercase tracking-tighter">Onarım Algoritması</h2>
        </div>
        
        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant hidden lg:block"></div>
          
          {/* Mobile vertical line */}
          <div className="absolute top-0 left-8 w-[1px] h-full bg-gradient-to-b from-tertiary/50 via-outline-variant to-transparent lg:hidden"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-16 gap-x-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-row lg:flex-col items-start lg:items-center group gap-6 lg:gap-0">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center lg:mb-6 group-hover:border-tertiary group-hover:shadow-[0_0_15px_rgba(173,199,255,0.3)] transition-all bg-background relative">
                  <span className="material-symbols-outlined text-tertiary">{step.icon}</span>
                  {/* Step number for mobile */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-tertiary text-black text-[10px] font-bold flex items-center justify-center lg:hidden">
                    {index + 1}
                  </div>
                </div>
                <div className="flex flex-col lg:items-center pt-2 lg:pt-0">
                  <h4 className="font-technical text-on-surface mb-2 text-left lg:text-center text-xs font-bold tracking-wider">{step.title}</h4>
                  <p className="text-[10px] text-on-surface-variant text-left lg:text-center lg:px-4 uppercase tracking-tight">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
