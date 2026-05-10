'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface Haber {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  imageUrl: string;
  tags?: string[];
  createdAt: string;
  isActive: boolean;
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
        const snapshot = await getDocs(collection(db, 'haberler'));
        const allNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        const foundHaber = allNews.find(h => createSlug(h.title) === haberSlug && h.isActive);
        
        if (foundHaber) {
          setHaber(foundHaber);
          const related = allNews
            .filter(h => h.isActive && h.id !== foundHaber.id)
            .slice(0, 3);
          setRelatedHaberler(related);
        } else {
          router.push('/haberler');
        }
      } catch (error) {
        console.error('Haber fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (haberSlug) fetchHaber();
  }, [haberSlug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-2 border-tertiary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!haber) return null;

  return (
    <main className="min-h-screen bg-background text-on-background pb-32">
      {/* Article Header */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src={haber.imageUrl || '/micro_soldering_lab_1778397801389.png'} 
          alt={haber.title}
          fill
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-container-max mx-auto px-margin-desktop pb-16">
            <Link href="/haberler" className="group inline-flex items-center gap-4 font-technical text-[10px] text-tertiary uppercase tracking-[0.4em] mb-12 hover:drop-shadow-[0_0_8px_rgba(173,199,255,0.5)] transition-all">
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-2">west</span>
              TÜM ANALİZLERE DÖN
            </Link>
            <div className="flex items-center gap-4 font-technical text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest">
              <span className="w-2 h-2 bg-tertiary rounded-full"></span>
              {new Date(haber.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface leading-[0.9] uppercase tracking-tighter max-w-5xl">
              {haber.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <div className="max-w-container-max mx-auto px-margin-desktop grid lg:grid-cols-12 gap-20 mt-20">
        <div className="lg:col-span-8">
          <div className="prose prose-invert prose-tech max-w-none">
            {haber.subtitle && (
              <p className="text-2xl font-display font-medium text-tertiary leading-relaxed mb-12 italic border-l-2 border-tertiary/30 pl-8">
                {haber.subtitle}
              </p>
            )}
            
            <div 
              className="article-content font-sans text-lg leading-relaxed text-on-surface-variant space-y-8"
              dangerouslySetInnerHTML={{ __html: haber.content }}
            />
          </div>

          {/* Tags */}
          {haber.tags && haber.tags.length > 0 && (
            <div className="mt-20 flex flex-wrap gap-4 pt-10 border-t border-outline-variant">
              {haber.tags.map(tag => (
                <span key={tag} className="font-technical text-[10px] text-on-surface-variant border border-outline-variant px-4 py-1 uppercase tracking-widest bg-surface-container">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar / Related */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-surface-container border border-outline-variant p-10">
            <h3 className="font-technical text-[10px] text-tertiary uppercase tracking-[0.3em] mb-8 border-b border-outline-variant pb-4">İLGİLİ ANALİZLER</h3>
            <div className="space-y-10">
              {relatedHaberler.map(item => (
                <Link key={item.id} href={`/haberler/${createSlug(item.title)}`} className="group block">
                  <div className="relative aspect-video overflow-hidden mb-4 border border-outline-variant group-hover:border-tertiary transition-colors">
                    <Image src={item.imageUrl || '/lab_workstation_1778396468117.png'} alt={item.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-on-surface leading-tight group-hover:text-tertiary transition-colors line-clamp-2 uppercase tracking-tight">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-tertiary/5 border border-tertiary/20 p-10">
            <h3 className="font-technical text-[10px] text-tertiary uppercase tracking-[0.3em] mb-4">TEKNİK DESTEK</h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              Bu raporla ilgili teknik sorularınız için mühendislik birimimizle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn-tech w-full py-4 text-[10px] uppercase tracking-[0.2em] inline-flex justify-center">
              ANALİZ TALEBİ GÖNDER
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HaberDetay;
