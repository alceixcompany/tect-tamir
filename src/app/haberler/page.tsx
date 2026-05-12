'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface Haber {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  tags?: string[];
  isActive: boolean;
}

const NewsPage = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'haberler'));
        const newsData = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        setHaberler(newsData.filter(h => h.isActive).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error('Haberler fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background text-on-background">
      {/* News Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image 
          src="/micro_soldering_lab_1778397801389.png"
          alt="iPhone Tamir Atölyesi Teknik Raporlar"
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
            <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Teknik Analiz & Gündem</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
              Laboratuvar <span className="text-tertiary">Raporları</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-20">
        <div className="max-w-4xl">
          <p className="text-xl text-on-surface-variant leading-relaxed font-display uppercase tracking-tight">
            Elektronik dünyasındaki son gelişmeler, karmaşık onarım vaka analizleri ve laboratuvarımızdan güncel teknik raporlar.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-surface-container animate-pulse border border-outline-variant"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {haberler.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col bg-surface-container border border-outline-variant hover:border-tertiary transition-all duration-500 overflow-hidden glow-border"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={news.imageUrl || '/micro_soldering_lab_1778397801389.png'}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent opacity-60"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-background/80 backdrop-blur-md border border-outline-variant text-tertiary text-[10px] font-technical px-4 py-1 uppercase tracking-widest">
                      {news.tags?.[0] || 'TEKNİK RAPOR'}
                    </span>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-technical text-on-surface-variant mb-6 uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 bg-tertiary rounded-full"></span>
                    {new Date(news.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>

                  <h2 className="text-3xl font-display font-bold text-on-surface mb-6 group-hover:text-tertiary transition-colors leading-tight">
                    {news.title}
                  </h2>

                  <p className="text-on-surface-variant leading-relaxed mb-10 line-clamp-3">
                    {news.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-outline-variant">
                    <Link 
                      href={`/haberler/${createSlug(news.title)}`}
                      className="group/link inline-flex items-center gap-4 font-technical text-xs text-on-surface uppercase tracking-[0.3em]"
                    >
                      TAM ANALİZİ OKU
                      <span className="material-symbols-outlined text-tertiary transition-transform group-hover/link:translate-x-2">trending_flat</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop mt-32">
        <div className="bg-surface-container-high border border-outline-variant p-12 md:p-20 relative overflow-hidden circuit-pattern">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface mb-6 uppercase tracking-tighter">
              Teknik Bültene <span className="text-tertiary neon-text-glow">Abone Olun</span>
            </h2>
            <p className="text-on-surface-variant mb-10 text-lg">
              En son onarım teknikleri ve laboratuvar güncellemelerinden ilk siz haberdar olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="E-POSTA ADRESİNİZ"
                className="flex-1 bg-background border border-outline-variant px-6 py-4 text-on-surface font-technical text-sm focus:border-tertiary outline-none transition-colors"
              />
              <button className="btn-tech px-10 py-4 uppercase tracking-widest text-xs font-technical">
                KAYDOL
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
