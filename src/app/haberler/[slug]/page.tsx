'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiCalendar, FiArrowLeft, FiShare2, FiClock, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Haber {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const HaberDetay = () => {
  const params = useParams();
  const router = useRouter();
  const haberSlug = params.slug as string;
  const [haber, setHaber] = useState<Haber | null>(null);
  const [relatedHaberler, setRelatedHaberler] = useState<Haber[]>([]);
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
    const fetchHaber = async () => {
      try {
        setLoading(true);
        const allNewsSnapshot = await getDocs(collection(db, 'haberler'));
        const allNews = allNewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        const foundHaber = allNews.find(h => createSlug(h.title) === haberSlug && h.isActive);
        
        if (foundHaber) {
          setHaber(foundHaber);
          const related = allNews
            .filter(h => h.isActive && h.id !== foundHaber.id)
            .filter(h => h.tags && foundHaber.tags && h.tags.some(tag => foundHaber.tags.includes(tag)))
            .slice(0, 3);
          setRelatedHaberler(related);
        } else {
          router.push('/haberler');
        }
      } catch (error) {
        console.error('Haber yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    if (haberSlug) fetchHaber();
  }, [haberSlug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-3 border-[var(--lale-gold)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!haber) return null;

  return (
    <main className="min-h-screen bg-white text-[var(--lale-anthracite)] pb-24">
      {/* Article Hero */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image 
          src={haber.imageUrl || '/banner/news_hero.png'} 
          alt={haber.title}
          fill
          unoptimized
          className="object-cover"
          priority
          onError={(e) => { (e.target as HTMLImageElement).src = '/banner/news_hero.png'; }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-4xl px-6 pb-12">
            <Link href="/haberler" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--lale-gold)] uppercase tracking-widest mb-6 hover:text-white transition-colors">
              <FiArrowLeft /> HABERLERE DÖN
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--lale-anthracite)] leading-tight">
              {haber.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="mx-auto max-w-4xl px-6 mt-12">
        <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-[#5a666d] uppercase tracking-widest mb-10 pb-10 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-[var(--lale-gold)]" />
            <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiTag className="text-[var(--lale-gold)]" />
            <span>{haber.tags?.[0] || 'Muhasebe'}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <FiShare2 className="text-[var(--lale-gold)]" />
            <span>PAYLAŞ</span>
          </div>
        </div>

        {/* Subtitle / Lead */}
        {haber.subtitle && (
          <p className="text-xl font-bold text-[#5a666d] mb-10 leading-relaxed italic border-l-4 border-[var(--lale-gold)] pl-6">
            {haber.subtitle}
          </p>
        )}

        {/* Main Content Render */}
        <article 
          className="prose prose-lg max-w-none prose-headings:text-[var(--lale-anthracite)] prose-p:text-[#5a666d] prose-strong:text-[var(--lale-anthracite)] prose-a:text-[var(--lale-gold)]"
          dangerouslySetInnerHTML={{ __html: haber.content }}
        />

        {/* Related Section */}
        {relatedHaberler.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <h3 className="text-2xl font-bold mb-8">İlgili Haberler</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedHaberler.map(item => (
                <Link key={item.id} href={`/haberler/${createSlug(item.title)}`} className="group">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                    <Image src={item.imageUrl || '/banner/news_hero.png'} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <h4 className="font-bold text-sm leading-snug group-hover:text-[var(--lale-gold)] transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HaberDetay;
