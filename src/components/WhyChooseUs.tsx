'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const WhyChooseUs = () => {
  const points = [
    {
      title: 'Uzman Deneyimi',
      description: 'Yılların getirdiği sektörel tecrübe ile en karmaşık mali sorunlarınıza çözüm üretiyoruz.'
    },
    {
      title: 'Şeffaf Süreçler',
      description: 'Tüm operasyonlarımızda tam şeffaflık ve düzenli raporlama prensibiyle çalışıyoruz.'
    },
    {
      title: 'Dijital Dönüşüm',
      description: 'En yeni teknolojileri kullanarak muhasebe süreçlerinizi dijital çağa taşıyoruz.'
    }
  ];

  return (
    <section id="neden-biz" className="bg-[#f8fafc] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Sol: Liste */}
          <div className="flex-1 space-y-12">
            <h2 className="text-4xl font-bold text-[#1a1a1a]">Neden Demirbaş?</h2>
            
            <div className="space-y-8">
              {points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 mt-1">
                    <FiCheckCircle className="h-6 w-6 text-[var(--lale-gold)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{point.title}</h3>
                    <p className="text-[#5f6970] leading-relaxed max-w-md">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sağ: İstatistik Blokları */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-square flex flex-col items-center justify-center bg-[var(--lale-gold)] rounded-[2.5rem] text-white p-8 shadow-xl shadow-[var(--lale-gold)]/20"
            >
              <span className="text-6xl font-extrabold mb-3">15+</span>
              <span className="text-lg font-medium opacity-90">Yıllık Tecrübe</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/50"
            >
              <span className="text-6xl font-extrabold text-[var(--lale-gold)] mb-3">500+</span>
              <span className="text-lg font-medium text-[#1a1a1a]">Mutlu Müşteri</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
