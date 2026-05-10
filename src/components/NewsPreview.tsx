'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { FiArrowRight } from 'react-icons/fi';
import { db } from '@/lib/firebase';

interface Haber {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  isActive?: boolean;
  order?: number;
  createdAt?: string;
}

const createSlug = (title: string): string =>
  title
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

const NewsPreview = () => {
  const [news, setNews] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'haberler'));
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Haber[];
        const activeItems = items
          .filter((item) => item.isActive !== false)
          .sort((a, b) => {
            const aOrder = a.order ?? 0;
            const bOrder = b.order ?? 0;
            if (aOrder !== bOrder) {
              return aOrder - bOrder;
            }
            return (b.createdAt ?? '').localeCompare(a.createdAt ?? '');
          })
          .slice(0, 3);

        setNews(activeItems);
      } catch (error) {
        console.error('Ana sayfa haberleri yuklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading && news.length === 0) return null;
  if (!loading && news.length === 0) return null;

  return (
    <section id="haberler" className="bg-[#f8fafc] py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-[#1a1a1a]">Güncel Analizler</h2>
            <p className="mt-4 text-[#5f6970]">Ekonomi ve mevzuattaki son gelişmeler.</p>
          </div>

          <Link
            href="/haberler"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--lale-gold)] transition-colors hover:opacity-80"
          >
            Tümünü Gör
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={item.imageUrl || '/banner/news_hero.png'}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="text-[var(--lale-gold)] text-xs font-bold uppercase tracking-widest mb-3">
                  {item.tags?.[0] || 'MEVZUAT'}
                </div>

                <h3 className="text-xl font-bold leading-tight text-[#1a1a1a] mb-4 group-hover:text-[var(--lale-gold)] transition-colors">
                  {item.title}
                </h3>
                
                <p className="line-clamp-3 text-sm leading-relaxed text-[#5f6970] mb-6">
                  {item.description || 'Güncel mali gelişmeler ve işletmeler için önemli hatırlatmalar.'}
                </p>

                <Link
                  href={`/haberler/${createSlug(item.title)}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#1a1a1a] group-hover:text-[var(--lale-gold)] transition-all"
                >
                  Okumaya Devam Et
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
