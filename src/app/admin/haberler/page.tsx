'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import CKEditorComponent from '@/components/CKEditorComponent';
import { FiFileText, FiPlus, FiEdit2, FiTrash2, FiStar, FiCheck, FiX, FiCalendar, FiTag, FiLayout, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

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

const AdminNews = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHaber, setEditingHaber] = useState<Haber | null>(null);
  
  const [haberForm, setHaberForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    content: '',
    imageUrl: '',
    tags: '',
    featured: false,
    isActive: true
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchHaberler();
  }, []);

  const fetchHaberler = async () => {
    try {
      setLoading(true);
      const newsSnapshot = await getDocs(collection(db, 'haberler'));
      const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
      newsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setHaberler(newsData);
    } catch (error) {
      console.error('Haberler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const haberData = {
        ...haberForm,
        tags: haberForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString()
      };

      if (editingHaber) {
        await updateDoc(doc(db, 'haberler', editingHaber.id), haberData);
      } else {
        await addDoc(collection(db, 'haberler'), {
          ...haberData,
          createdAt: new Date().toISOString(),
          order: 0
        });
      }
      
      closeModal();
      fetchHaberler();
    } catch (error) {
      console.error('Haber kaydedilirken hata:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingHaber(null);
    setHaberForm({ title: '', subtitle: '', description: '', content: '', imageUrl: '', tags: '', featured: false, isActive: true });
  };

  const handleEdit = (haber: Haber) => {
    setEditingHaber(haber);
    setHaberForm({
      title: haber.title,
      subtitle: haber.subtitle,
      description: haber.description,
      content: haber.content,
      imageUrl: haber.imageUrl,
      tags: haber.tags.join(', '),
      featured: haber.featured,
      isActive: haber.isActive
    });
    setShowAddModal(true);
  };

  const handleDelete = async (haberId: string) => {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'haberler', haberId));
        fetchHaberler();
      } catch (error) {
        console.error('Haber silinirken hata:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--lale-gold)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline-variant relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-5 pointer-events-none"></div>
        <div className="relative z-10">
          <span className="font-technical text-tertiary text-[10px] tracking-[0.4em] uppercase mb-2 block">İçerik & Rapor Yönetimi</span>
          <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-tighter">Teknik <span className="text-tertiary">Yayınlar</span></h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-tech flex items-center gap-3 h-12 relative z-10"
        >
          <FiPlus /> YENİ ANALİZ EKLE
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'TOPLAM KAYIT', val: haberler.length, color: 'text-tertiary', icon: FiFileText },
          { label: 'KRİTİK / ÖNE ÇIKAN', val: haberler.filter(h => h.featured).length, color: 'text-tertiary', icon: FiStar },
          { label: 'AKTİF YAYIN', val: haberler.filter(h => h.isActive).length, color: 'text-green-400', icon: FiCheck }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container p-8 border border-outline-variant rounded-md flex items-center gap-6 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-circuit-pattern opacity-5"></div>
            <div className={`h-12 w-12 bg-background border border-outline-variant ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-technical text-[9px] text-on-surface-variant/50 uppercase tracking-[0.3em] mb-1">{stat.label}</p>
              <p className="text-3xl font-display font-bold text-on-surface">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6">
        {haberler.map((haber) => (
          <motion.div 
            layout
            key={haber.id} 
            className="bg-surface-container border border-outline-variant rounded-md p-8 group hover:border-tertiary/30 transition-all"
          >
            <div className="flex flex-col md:flex-row gap-10">
              <div className="relative w-full md:w-56 h-40 bg-background border border-outline-variant/30 rounded-sm overflow-hidden shrink-0">
                {haber.imageUrl ? (
                  <Image src={haber.imageUrl} alt={haber.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="flex items-center justify-center h-full text-outline-variant/20">
                    <FiImage className="w-12 h-12" />
                  </div>
                )}
                {haber.featured && (
                  <div className="absolute top-3 left-3 bg-tertiary text-on-tertiary p-2 shadow-2xl">
                    <FiStar className="w-4 h-4 fill-current" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className={`font-technical text-[8px] px-3 py-1 border uppercase tracking-widest ${haber.isActive ? 'border-green-900/30 text-green-400 bg-green-900/10' : 'border-red-900/30 text-red-400 bg-red-900/10'}`}>
                          {haber.isActive ? 'AKTİF ANALİZ' : 'TASLAK KAYIT'}
                        </span>
                        <span className="font-technical text-[9px] text-on-surface-variant/30 flex items-center gap-2 uppercase tracking-widest">
                          <FiCalendar className="text-tertiary/50" /> {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-on-surface uppercase tracking-tight group-hover:text-tertiary transition-colors">{haber.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEdit(haber)} className="h-10 w-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(haber.id)} className="h-10 w-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-red-400 hover:border-red-400 transition-all">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-technical text-xs text-on-surface-variant/60 line-clamp-2 mb-6 uppercase tracking-wider leading-relaxed">{haber.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {haber.tags?.map(tag => (
                    <span key={tag} className="font-technical text-[9px] text-tertiary/40 border border-tertiary/10 px-3 py-1 uppercase tracking-widest hover:text-tertiary hover:border-tertiary/30 transition-all cursor-default">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[95vh] bg-surface-container border border-outline-variant rounded-md flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-circuit-pattern opacity-10 rotate-90 pointer-events-none"></div>
              
              <div className="p-10 border-b border-outline-variant flex items-center justify-between relative z-10">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-tertiary/10 text-tertiary border border-tertiary/20 flex items-center justify-center">
                    <FiLayout className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-on-surface uppercase tracking-tight">{editingHaber ? 'ANALİZ DÜZENLEME' : 'YENİ TEKNİK ANALİZ'}</h2>
                    <p className="font-technical text-[10px] text-on-surface-variant/50 uppercase tracking-[0.4em]">VERİ GİRİŞ TERMİNALİ</p>
                  </div>
                </div>
                <button onClick={closeModal} className="h-12 w-12 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-tertiary transition-all">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 relative z-10 scrollbar-technical">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">ANALİZ BAŞLIĞI *</label>
                      </div>
                      <input
                        type="text"
                        required
                        value={haberForm.title}
                        onChange={(e) => setHaberForm({...haberForm, title: e.target.value})}
                        className="w-full px-6 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                        placeholder="Örn: ECU Onarım Teknikleri"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">KATEGORİ / ALT BAŞLIK</label>
                      </div>
                      <input
                        type="text"
                        value={haberForm.subtitle}
                        onChange={(e) => setHaberForm({...haberForm, subtitle: e.target.value})}
                        className="w-full px-6 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                        placeholder="Örn: Donanım Mühendisliği"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">TEKNİK ÖZET *</label>
                      </div>
                      <textarea
                        rows={4}
                        required
                        value={haberForm.description}
                        onChange={(e) => setHaberForm({...haberForm, description: e.target.value})}
                        className="w-full px-6 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all resize-none placeholder:text-outline-variant/30"
                        placeholder="Analizin kısa teknik özeti..."
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">GÖRSEL MATERYAL</label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <input
                            type="url"
                            value={haberForm.imageUrl}
                            onChange={(e) => setHaberForm({...haberForm, imageUrl: e.target.value})}
                            className="w-full px-6 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-[10px] focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                            placeholder="Görsel URL..."
                          />
                        </div>
                        <div className="relative aspect-video bg-background border border-outline-variant rounded-md overflow-hidden flex items-center justify-center">
                          {haberForm.imageUrl ? (
                            <Image 
                              src={haberForm.imageUrl} 
                              alt="Preview" 
                              fill 
                              className="object-cover opacity-80"
                              unoptimized
                            />
                          ) : (
                            <div className="text-center opacity-10">
                              <FiImage className="w-10 h-10 mx-auto mb-2" />
                              <p className="font-technical text-[8px] uppercase tracking-widest">GÖRSEL YOK</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">ETİKETLER (VİRGÜLLE AYIRIN)</label>
                      </div>
                      <input
                        type="text"
                        value={haberForm.tags}
                        onChange={(e) => setHaberForm({...haberForm, tags: e.target.value})}
                        className="w-full px-6 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                        placeholder="Örn: ecu, bga, osiloskop..."
                      />
                    </div>
                    <div className="flex gap-10 pt-4 px-2">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={haberForm.featured}
                            onChange={(e) => setHaberForm({...haberForm, featured: e.target.checked})}
                            className="w-5 h-5 bg-background border-outline-variant rounded-sm text-tertiary focus:ring-tertiary/50"
                          />
                        </div>
                        <span className="font-technical text-[10px] font-bold text-on-surface-variant group-hover:text-tertiary transition-colors uppercase tracking-widest">KRİTİK / ÖNE ÇIKAR</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={haberForm.isActive}
                            onChange={(e) => setHaberForm({...haberForm, isActive: e.target.checked})}
                            className="w-5 h-5 bg-background border-outline-variant rounded-sm text-tertiary focus:ring-tertiary/50"
                          />
                        </div>
                        <span className="font-technical text-[10px] font-bold text-on-surface-variant group-hover:text-tertiary transition-colors uppercase tracking-widest">YAYINDA AKTİF ET</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                    <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">DETAYLI ANALİZ RAPORU *</label>
                  </div>
                  <div className="border border-outline-variant bg-white rounded-md min-h-[400px] text-slate-900 overflow-hidden">
                    <CKEditorComponent
                      value={haberForm.content}
                      onChange={(data) => setHaberForm({...haberForm, content: data})}
                      placeholder="Teknik raporun tam içeriği..."
                    />
                  </div>
                </div>
              </form>

              <div className="p-10 border-t border-outline-variant flex items-center justify-end gap-6 bg-background/50 relative z-10">
                <button onClick={closeModal} className="font-technical text-[10px] font-bold text-on-surface-variant/50 hover:text-on-surface transition-colors uppercase tracking-[0.4em]">İPTAL TERMİNALİ</button>
                <button 
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="btn-tech px-12 py-5 h-auto text-xs rounded-md"
                >
                  {isUploading ? 'VERİ AKTARILIYOR...' : 'SİSTEME KAYDET VE YAYINLA'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNews;
