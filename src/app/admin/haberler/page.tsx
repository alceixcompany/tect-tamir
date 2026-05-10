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
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-[var(--lale-anthracite)] mb-2">Haber Yönetimi</h1>
          <p className="text-[#5a666d] font-medium">Sitenizdeki güncel gelişmeleri ve blog yazılarını yönetin.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-[var(--lale-gold)] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[var(--lale-gold)]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <FiPlus /> YENİ HABER EKLE
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <FiFileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">TOPLAM</p>
            <p className="text-2xl font-bold text-[var(--lale-anthracite)]">{haberler.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
          <div className="h-12 w-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
            <FiStar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">ÖNE ÇIKAN</p>
            <p className="text-2xl font-bold text-[var(--lale-anthracite)]">{haberler.filter(h => h.featured).length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
          <div className="h-12 w-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
            <FiCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">AKTİF</p>
            <p className="text-2xl font-bold text-[var(--lale-anthracite)]">{haberler.filter(h => h.isActive).length}</p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6">
        {haberler.map((haber) => (
          <motion.div 
            layout
            key={haber.id} 
            className="bg-white rounded-[2rem] border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/40 transition-all group"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                {haber.imageUrl ? (
                  <Image src={haber.imageUrl} alt={haber.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    <FiImage className="w-8 h-8" />
                  </div>
                )}
                {haber.featured && (
                  <div className="absolute top-2 left-2 bg-[var(--lale-gold)] text-white p-1.5 rounded-lg shadow-lg">
                    <FiStar className="w-3 h-3 fill-current" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${haber.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {haber.isActive ? 'YAYINDA' : 'TASLAK'}
                      </span>
                      <span className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                        <FiCalendar /> {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--lale-anthracite)] truncate group-hover:text-[var(--lale-gold)] transition-colors">{haber.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(haber)} className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(haber.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#5a666d] line-clamp-2 mb-4">{haber.description}</p>
                <div className="flex flex-wrap gap-2">
                  {haber.tags?.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">#{tag}</span>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-[var(--lale-gold)]/10 text-[var(--lale-gold)] rounded-2xl flex items-center justify-center">
                    <FiLayout className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--lale-anthracite)]">{editingHaber ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}</h2>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">İÇERİK YÖNETİMİ</p>
                  </div>
                </div>
                <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--lale-anthracite)] uppercase tracking-wider ml-1">Başlık *</label>
                      <input
                        type="text"
                        required
                        value={haberForm.title}
                        onChange={(e) => setHaberForm({...haberForm, title: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[var(--lale-gold)] focus:bg-white transition-all text-sm"
                        placeholder="Haber başlığını girin..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--lale-anthracite)] uppercase tracking-wider ml-1">Alt Başlık</label>
                      <input
                        type="text"
                        value={haberForm.subtitle}
                        onChange={(e) => setHaberForm({...haberForm, subtitle: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[var(--lale-gold)] focus:bg-white transition-all text-sm"
                        placeholder="Kısa alt başlık..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--lale-anthracite)] uppercase tracking-wider ml-1">Özet Açıklama *</label>
                      <textarea
                        rows={3}
                        required
                        value={haberForm.description}
                        onChange={(e) => setHaberForm({...haberForm, description: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[var(--lale-gold)] focus:bg-white transition-all text-sm resize-none"
                        placeholder="Listeleme sayfasında görünecek kısa özet..."
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--lale-anthracite)] uppercase tracking-wider ml-1">Kapak Görseli</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-4">
                          <input
                            type="url"
                            value={haberForm.imageUrl}
                            onChange={(e) => setHaberForm({...haberForm, imageUrl: e.target.value})}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[var(--lale-gold)] focus:bg-white transition-all text-sm"
                            placeholder="Resim URL'si (https://...) veya dosya yükleyin"
                          />
                          <div className="relative group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setHaberForm({...haberForm, imageUrl: reader.result as string});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                              id="news-image-upload"
                            />
                            <label 
                              htmlFor="news-image-upload"
                              className="flex items-center justify-center gap-2 w-full px-5 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-[var(--lale-gold)] hover:text-[var(--lale-gold)] transition-all cursor-pointer font-bold text-xs"
                            >
                              <FiPlus /> CİHAZDAN DOSYA SEÇ
                            </label>
                          </div>
                        </div>
                        <div className="relative aspect-video bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                          {haberForm.imageUrl ? (
                            <Image 
                              src={haberForm.imageUrl} 
                              alt="Preview" 
                              fill 
                              className="object-cover"
                              unoptimized // Admin panelinde önizleme için optimizasyonu kapatalım
                              onError={() => {
                                // Hata durumunda URL'yi temizleyebiliriz veya uyarı verebiliriz
                              }}
                            />
                          ) : (
                            <div className="text-center p-4">
                              <FiImage className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                              <p className="text-[10px] text-gray-300 font-bold uppercase">ÖNİZLEME</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium px-1">
                        * İnternetten resim eklerken direkt resim dosyasının linkini yapıştırdığınızdan emin olun (Örn: .jpg, .png ile biten linkler).
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--lale-anthracite)] uppercase tracking-wider ml-1">Etiketler (virgülle ayırın)</label>
                      <input
                        type="text"
                        value={haberForm.tags}
                        onChange={(e) => setHaberForm({...haberForm, tags: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[var(--lale-gold)] focus:bg-white transition-all text-sm"
                        placeholder="muhasebe, vergi, danismanlik..."
                      />
                    </div>
                    <div className="flex gap-8 pt-4 ml-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={haberForm.featured}
                          onChange={(e) => setHaberForm({...haberForm, featured: e.target.checked})}
                          className="w-5 h-5 rounded-lg border-gray-300 text-[var(--lale-gold)] focus:ring-[var(--lale-gold)]"
                        />
                        <span className="text-sm font-bold text-[#5a666d] group-hover:text-[var(--lale-gold)] transition-colors">Öne Çıkar</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={haberForm.isActive}
                          onChange={(e) => setHaberForm({...haberForm, isActive: e.target.checked})}
                          className="w-5 h-5 rounded-lg border-gray-300 text-[var(--lale-gold)] focus:ring-[var(--lale-gold)]"
                        />
                        <span className="text-sm font-bold text-[#5a666d] group-hover:text-[var(--lale-gold)] transition-colors">Yayına Al</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--lale-anthracite)] uppercase tracking-wider ml-1">Haber Detay İçeriği *</label>
                  <div className="rounded-3xl border border-gray-100 overflow-hidden bg-white min-h-[300px]">
                    <CKEditorComponent
                      value={haberForm.content}
                      onChange={(data) => setHaberForm({...haberForm, content: data})}
                      placeholder="Haberin detaylı içeriğini buraya yazın..."
                    />
                  </div>
                </div>
              </form>

              <div className="p-8 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/30">
                <button onClick={closeModal} className="px-8 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">İPTAL</button>
                <button 
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="px-10 py-4 bg-[var(--lale-anthracite)] text-white font-bold text-sm rounded-2xl shadow-xl hover:bg-[#2c3e47] transition-all disabled:opacity-50"
                >
                  {isUploading ? 'KAYDEDİLİYOR...' : 'KAYDET VE YAYINLA'}
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
