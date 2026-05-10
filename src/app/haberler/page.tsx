'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FiArrowRight, FiCalendar, FiTag, FiMail, FiSearch } from 'react-icons/fi';
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

const NewsPage = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
  
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()));
        setHaberler(activeNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(haberler.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = haberler.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    try {
      setIsSubscribing(true);
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
        isActive: true,
        source: 'haberler_sayfasi'
      });
      setSubscriptionStatus('success');
      setSubscriptionMessage('E-posta adresiniz başarıyla kaydedildi!');
      setEmail('');
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setSubscriptionMessage('');
      }, 5000);
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[var(--lale-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5a666d] text-xs font-bold uppercase tracking-widest">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="page-flow min-h-screen bg-white">
      {/* Refined Chic News Hero */}
      <section className="relative flex min-h-[450px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner/news_hero.png"
            alt="Demirbaş Muhasebe Haberler"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(30,51,60,0.70)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(150,73,0,0.3)] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-block rounded bg-[var(--lale-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              GÜNCEL GELİŞMELER
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Mali Gündem ve <br />
              <span className="text-[var(--lale-gold)]">Sektörel Haberler</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
              Vergi dünyasındaki değişiklikler, mevzuat güncellemeleri ve işletmenizi 
              ilgilendiren tüm önemli başlıkları buradan takip edebilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {haberler.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--lale-anthracite)]">Henüz haber bulunmuyor</h3>
              <p className="mt-2 text-sm text-[#5a666d]">En kısa sürede güncel içerikler eklenecektir.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((haber, index) => (
                <motion.article
                  key={haber.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {haber.imageUrl ? (
                      <Image
                        src={haber.imageUrl}
                        alt={haber.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/banner/news_hero.png'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <FiTag className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[var(--lale-gold)] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase">
                        {haber.tags?.[0] || 'Genel'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#5a666d] mb-3 uppercase tracking-widest">
                      <FiCalendar className="w-3 h-3" />
                      <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>

                    <h2 className="text-lg font-bold text-[var(--lale-anthracite)] mb-3 group-hover:text-[var(--lale-gold)] transition-colors line-clamp-2">
                      {haber.title}
                    </h2>

                    <p className="text-sm text-[#5a666d] leading-6 mb-6 line-clamp-3">
                      {haber.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link 
                        href={`/haberler/${createSlug(haber.title)}`}
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-[var(--lale-gold)] uppercase tracking-widest group/link"
                      >
                        DEVAMINI OKU
                        <FiArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    currentPage === page
                      ? 'bg-[var(--lale-gold)] text-white shadow-md'
                      : 'border border-gray-100 text-[#5a666d] hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter - Chic Light */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-3xl px-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lale-gold)]/10 text-[var(--lale-gold)]">
              <FiMail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--lale-anthracite)]">E-Bültene Kaydolun</h3>
            <p className="mt-4 text-sm text-[#5a666d] leading-6">
              Mali güncellemeler ve duyurulardan haberdar olmak için bültenimize katılın.
            </p>
            
            <form onSubmit={handleNewsletterSubscription} className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] transition-all text-sm"
              />
              <button 
                type="submit"
                className="bg-[var(--lale-gold)] text-white px-8 py-3 rounded-xl font-bold text-xs tracking-widest hover:bg-[#f57c00] transition-all shadow-md active:scale-95"
              >
                KAYDOL
              </button>
            </form>
            {subscriptionMessage && (
              <p className={`mt-4 text-xs font-bold ${subscriptionStatus === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {subscriptionMessage}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
