'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const fallbackGallery = [
  { id: '1', imageUrl: '/lab_workstation_1778396468117.png', title: 'Teknik Çalışma İstasyonu' },
  { id: '2', imageUrl: '/bga_rework_1778396487205.png', title: 'BGA Rework İstasyonu' },
  { id: '3', imageUrl: '/clean_room_facility_1778396507960.png', title: 'Temiz Oda Tesisi' }
];

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'gallery_items'));
        const galleryData = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.isActive !== false)
          .slice(0, 3);
        
        if (galleryData.length > 0) {
          setItems(galleryData);
        } else {
          setItems(fallbackGallery);
        }
      } catch (error) {
        console.error('Gallery fetch error:', error);
        setItems(fallbackGallery);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const displayItems = loading ? fallbackGallery : items;

  return (
    <section id="galeri" className="py-24 bg-surface-container overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-4 self-center space-y-6">
            <span className="font-technical text-tertiary tracking-[0.3em] uppercase text-xs">Temiz Oda Laboratuvarı</span>
            <h2 className="text-4xl text-on-surface">Teknolojik Altyapımız</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Tamir işlemlerimiz, statik elektrikten arındırılmış, ileri seviye mikroskoplar ve lazer ölçüm cihazları ile donatılmış profesyonel laboratuvar ortamında gerçekleştirilir.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                <span className="font-technical text-[10px] uppercase tracking-wider">ESD GÜVENLİ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#adc7ff]"></span>
                <span className="font-technical text-[10px] uppercase tracking-wider">ISO SERTİFİKALI</span>
              </div>
            </div>
            <Link 
              href="/galeri"
              className="btn-tech-outline inline-block text-center mt-4"
            >
              GALERİMİZİ GÖRÜNTÜLE
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-8">
            {displayItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`overflow-hidden border border-outline-variant rounded-md relative group ${index === 2 ? 'col-span-2 h-64' : 'h-64'}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title || 'Laboratuvar Görseli'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
