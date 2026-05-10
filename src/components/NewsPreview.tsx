'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Haber {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  isActive?: boolean;
}

const fallbackNews = [
  {
    id: '1',
    tag: 'ECU GÜNCELLEME',
    title: 'Yeni Nesil Ağır Vasıta Beyin Onarım Teknikleri',
    description: 'Euro 6 sistemlerinde karşılaşılan kronik arızaların çip seviyesinde kalıcı onarım metotları.',
    imageUrl: '/news_ecu_tech_1778397998458.png'
  },
  {
    id: '2',
    tag: 'IPHONE ONARIM',
    title: 'iPhone 15 Pro Max Anakart Mimarisi ve Onarım Zorlukları',
    description: 'Mikro-BGA yapısındaki katmanlı anakartlarda sıvı teması sonrası veri kurtarma süreçleri.',
    imageUrl: '/news_iphone_fix_1778398018931.png'
  },
  {
    id: '3',
    tag: 'DİAGNOSTİK',
    title: 'Lazer Destekli Arıza Tespit Sistemleri Laboratuvarımızda',
    description: 'Gözle görülmeyen kılcal çatlakların ve kısa devrelerin lazer termal görüntüleme ile tespiti.',
    imageUrl: '/news_laser_diag_1778398038684.png'
  }
];

const NewsPreview = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'haberler'));
        const items = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.isActive !== false)
          .slice(0, 3);
        
        if (items.length > 0) {
          setNews(items);
        } else {
          setNews(fallbackNews);
        }
      } catch (error) {
        console.error('News fetch error:', error);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

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

  const displayNews = loading ? fallbackNews : news;

  return (
    <section id="haberler" className="bg-background py-24 relative overflow-hidden border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-technical text-tertiary tracking-[0.3em] uppercase text-xs">Teknik Bilgi Bankası</span>
            <h2 className="text-4xl font-display font-bold text-on-surface mt-2">Güncel Analizler & Haberler</h2>
            <p className="mt-4 text-on-surface-variant">Elektronik onarım dünyasındaki son gelişmeler ve laboratuvarımızdan teknik güncellemeler.</p>
          </div>

          <Link
            href="/haberler"
            className="btn-tech-outline"
          >
            TÜMÜNÜ GÖR
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayNews.map((item) => (
            <article
              key={item.id}
              className="group bg-surface-container border border-outline-variant hover:border-tertiary transition-all duration-300 flex flex-col h-full glow-border"
            >
              <div className="relative h-56 overflow-hidden bg-background">
                <Image
                  src={item.imageUrl || '/news_ecu_tech_1778397998458.png'}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="text-tertiary text-[10px] font-technical uppercase tracking-[0.2em] mb-3">
                  {item.tag || item.tags?.[0] || 'TEKNİK ANALİZ'}
                </div>

                <h3 className="text-xl font-display font-bold leading-tight text-on-surface mb-4 group-hover:text-tertiary transition-colors">
                  {item.title}
                </h3>
                
                <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant mb-6">
                  {item.description}
                </p>

                <Link
                  href={`/haberler/${createSlug(item.title)}`}
                  className="mt-auto inline-flex items-center gap-2 text-[10px] font-technical uppercase tracking-widest text-tertiary group-hover:gap-4 transition-all"
                >
                  DETAYLI OKU
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
