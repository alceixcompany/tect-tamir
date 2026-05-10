'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag?: string;
  isActive: boolean;
}

const fallbackGallery = [
  { id: '1', imageUrl: '/lab_workstation_1778396468117.png', title: 'Hassas Onarım İstasyonu', description: 'Yüksek çözünürlüklü mikroskoplar ve ESD güvenli çalışma alanları.' },
  { id: '2', imageUrl: '/bga_rework_1778396487205.png', title: 'BGA Rework Ünitesi', description: 'Otomatik profil kontrollü çip sökme ve takma sistemleri.' },
  { id: '3', imageUrl: '/clean_room_facility_1778396507960.png', title: 'Kontrollü Ortam', description: 'Tozdan arındırılmış laboratuvar standartlarında onarım süreçleri.' }
];

const GaleriPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'gallery_items'));
        const galleryData = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.isActive !== false);
        
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

  return (
    <main className="min-h-screen bg-background text-on-background">
      {/* Gallery Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image 
          src="/lab_workstation_1778396468117.png"
          alt="TECH-LAB Çalışma İstasyonu"
          fill
          className="object-cover opacity-40 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Laboratuvar Ortamı</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
              Teknolojik <span className="text-tertiary">Altyapımız</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-desktop py-20">
        <div className="max-w-4xl">
          <p className="text-xl text-on-surface-variant leading-relaxed font-display uppercase tracking-tight">
            Onarım süreçlerimizi gerçekleştirdiğimiz, en son teknoloji diagnostik ve mikro-cerrahi ekipmanlarla donatılmış laboratuvarımızdan kesitler.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-desktop pb-32">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-surface-container animate-pulse border border-outline-variant"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden border border-outline-variant bg-surface-container cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title || 'Lab View'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="font-technical text-tertiary text-[10px] tracking-widest uppercase mb-2">{item.tag || 'LABORATUVAR'}</div>
                  <h3 className="text-lg font-display font-bold text-on-surface">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video border border-outline-variant overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-3xl font-display font-bold text-on-surface mb-4">{selectedImage.title}</h3>
                <p className="text-on-surface-variant max-w-2xl">{selectedImage.description}</p>
              </div>
              <button 
                className="absolute top-8 right-8 w-12 h-12 border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};


export default GaleriPage;
