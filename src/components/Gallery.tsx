'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiEye } from 'react-icons/fi';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag?: string;
  isActive: boolean;
  isFeatured: boolean;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'gallery_items'));
        const galleryData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
        // Filter active and featured, or just active
        const activeItems = galleryData.filter(item => item.isActive !== false).slice(0, 3);
        setItems(activeItems);
      } catch (error) {
        console.error('Gallery fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading && items.length === 0) return null;
  if (!loading && items.length === 0) return null; // Don't show empty gallery section

  return (
    <section id="galeri" className="bg-white py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--lale-gold)]">
              Kurumsal Galeri
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.02em] text-[var(--lale-anthracite)] sm:text-5xl">
              Çalışma biçimimizi yansıtan kareler
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5a666d]">
              Ofis düzenimiz, danışmanlık yaklaşımımız ve süreç disiplinimizi anlatan
              görsel seçkilerle kurumsal dili daha yakından inceleyin.
            </p>
          </div>

          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--lale-gold)] transition-colors hover:text-[#d97706]"
          >
            Tüm galeriyi gör
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/40 flex flex-col h-full"
            >
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,51,60,0.3)] to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lale-gold)] shadow-sm">
                  {item.tag || 'Kurumsal'}
                </div>
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--lale-gold)] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiEye className="h-5 w-5" />
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[var(--lale-anthracite)] line-clamp-1 group-hover:text-[var(--lale-gold)] transition-colors">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#5a666d] line-clamp-3">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
