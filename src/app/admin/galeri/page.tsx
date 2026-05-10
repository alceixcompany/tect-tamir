'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import CKEditorComponent from '@/components/CKEditorComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiX, FiImage, FiPlus, FiLayout, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const AdminGallery = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'items'>('categories');
  
  // Category states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GalleryCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    icon: '📷',
    color: 'blue',
    isActive: true
  });

  // Gallery item states
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [itemForm, setItemForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    thumbnailUrl: '',
    tags: '',
    isActive: true,
    isFeatured: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories - index hatası olmaması için orderBy kaldırıldı
      const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
      const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryCategory[];
      
      // Client-side sıralama
      categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(categoriesData);

      // Fetch gallery items - index hatası olmaması için orderBy kaldırıldı
      const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
      const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
      
      // Client-side sıralama
      itemsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setGalleryItems(itemsData);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category functions
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // Update existing category
        await updateDoc(doc(db, 'gallery_categories', editingCategory.id), {
          ...categoryForm,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Add new category
        await addDoc(collection(db, 'gallery_categories'), {
          ...categoryForm,
          createdAt: new Date().toISOString()
        });
      }
      
      setShowCategoryModal(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '', icon: '📷', color: 'blue', isActive: true });
      fetchData();
    } catch (error) {
      console.error('Kategori kaydedilirken hata:', error);
    }
  };

  const handleCategoryEdit = (category: GalleryCategory) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      isActive: category.isActive
    });
    setShowCategoryModal(true);
  };

  const handleCategoryDelete = async (categoryId: string) => {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'gallery_categories', categoryId));
        fetchData();
      } catch (error) {
        console.error('Kategori silinirken hata:', error);
      }
    }
  };

  // Gallery item functions
  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const itemData = {
        ...itemForm,
        tags: itemForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString()
      };

      if (editingItem) {
        // Update existing item
        await updateDoc(doc(db, 'gallery_items', editingItem.id), itemData);
      } else {
        // Add new item
        await addDoc(collection(db, 'gallery_items'), {
          ...itemData,
          createdAt: new Date().toISOString()
        });
      }
      
      setShowItemModal(false);
      setEditingItem(null);
      setItemForm({ title: '', description: '', categoryId: '', imageUrl: '', thumbnailUrl: '', tags: '', isActive: true, isFeatured: false });
      fetchData();
    } catch (error) {
      console.error('Galeri resmi kaydedilirken hata:', error);
    }
  };

  const handleItemEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setItemForm({
      title: item.title,
      description: item.description,
      categoryId: item.categoryId,
      imageUrl: item.imageUrl,
      thumbnailUrl: item.thumbnailUrl,
      tags: item.tags.join(', '),
      isActive: item.isActive,
      isFeatured: item.isFeatured
    });
    setShowItemModal(true);
  };

  const handleItemDelete = async (itemId: string) => {
    if (confirm('Bu galeri resmini silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'gallery_items', itemId));
        fetchData();
      } catch (error) {
        console.error('Galeri resmi silinirken hata:', error);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Kategori Yok';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 bg-background min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline-variant relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-5 pointer-events-none"></div>
        <div className="relative z-10">
          <span className="font-technical text-tertiary text-[10px] tracking-[0.4em] uppercase mb-2 block">Görsel Veri & Kayıt Yönetimi</span>
          <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-tighter">Laboratuvar <span className="text-tertiary">Galerisi</span></h1>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'BİRİMLER', val: categories.length, icon: 'folder', color: 'text-tertiary' },
          { label: 'KAYITLI GÖRSEL', val: galleryItems.length, icon: 'image', color: 'text-tertiary' },
          { label: 'AKTİF BİRİM', val: categories.filter(c => c.isActive).length, icon: 'check_circle', color: 'text-green-400' },
          { label: 'ÖNE ÇIKAN', val: galleryItems.filter(i => i.isFeatured).length, icon: 'star', color: 'text-tertiary' }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container p-6 border border-outline-variant rounded-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-12 h-12 bg-circuit-pattern opacity-5"></div>
            <div className="flex items-center gap-4 mb-4">
              <span className={`material-symbols-outlined ${stat.color} text-xl group-hover:scale-110 transition-transform`}>{stat.icon}</span>
              <span className="font-technical text-[9px] text-on-surface-variant/50 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-3xl font-display font-bold text-on-surface">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex border-b border-outline-variant">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-8 py-4 font-technical text-[10px] tracking-[0.3em] uppercase transition-all relative ${
              activeTab === 'categories'
                ? 'text-tertiary'
                : 'text-on-surface-variant/40 hover:text-on-surface-variant'
            }`}
          >
            SİSTEM BİRİMLERİ
            {activeTab === 'categories' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tertiary" />}
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-8 py-4 font-technical text-[10px] tracking-[0.3em] uppercase transition-all relative ${
              activeTab === 'items'
                ? 'text-tertiary'
                : 'text-on-surface-variant/40 hover:text-on-surface-variant'
            }`}
          >
            GÖRSEL ARŞİV
            {activeTab === 'items' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tertiary" />}
          </button>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="font-technical text-xs font-bold text-on-surface uppercase tracking-[0.2em]">BİRİM LİSTESİ</h2>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="btn-tech text-[9px] py-3 px-6"
              >
                + YENİ BİRİM TANIMLA
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-surface-container border border-outline-variant rounded-md group hover:border-tertiary/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-circuit-pattern opacity-5"></div>
                  <div className="p-8 border-b border-outline-variant/30 flex items-center gap-6">
                    <div className="h-12 w-12 bg-background border border-outline-variant flex items-center justify-center text-xl">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-on-surface uppercase tracking-tight">{category.name}</h4>
                      <span className={`font-technical text-[8px] px-2 py-0.5 border uppercase tracking-widest ${
                        category.isActive 
                          ? 'border-green-900/30 text-green-400 bg-green-900/10' 
                          : 'border-outline-variant text-on-surface-variant/40'
                      }`}>
                        {category.isActive ? 'AKTİF' : 'DEVRE DIŞI'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <p className="font-technical text-[10px] text-on-surface-variant/60 line-clamp-2 uppercase tracking-wider h-10">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between font-technical text-[9px] text-tertiary/40 uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">photo_library</span>
                        {galleryItems.filter(item => item.categoryId === category.id).length} VERİ KAYDI
                      </span>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => handleCategoryEdit(category)}
                        className="flex-1 border border-outline-variant text-on-surface-variant font-technical text-[9px] py-3 uppercase tracking-widest hover:border-tertiary hover:text-tertiary transition-all"
                      >
                        DÜZENLE
                      </button>
                      <button
                        onClick={() => handleCategoryDelete(category.id)}
                        className="flex-1 border border-outline-variant text-on-surface-variant/40 font-technical text-[9px] py-3 uppercase tracking-widest hover:border-red-900/50 hover:text-red-400 transition-all"
                      >
                        SİL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {categories.length === 0 && (
              <div className="text-center py-32 border border-outline-variant bg-surface-container/30">
                <span className="material-symbols-outlined text-outline-variant text-6xl mb-6">folder_open</span>
                <h3 className="font-technical text-sm font-bold text-on-surface uppercase tracking-[0.3em]">SİSTEM BİRİMİ TANIMLANMAMIŞ</h3>
                <p className="font-technical text-[10px] text-on-surface-variant/40 mt-2 uppercase tracking-widest">Laboratuvar birimlerini tanımlayarak başlayın.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'items' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="font-technical text-xs font-bold text-on-surface uppercase tracking-[0.2em]">ARŞİV KAYITLARI</h2>
              <button
                onClick={() => setShowItemModal(true)}
                className="btn-tech text-[9px] py-3 px-6"
              >
                + YENİ GÖRSEL KAYDI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-surface-container border border-outline-variant rounded-md group hover:border-tertiary/30 transition-all overflow-hidden">
                  <div className="aspect-square bg-background relative overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-outline-variant/20">
                        <span className="material-symbols-outlined text-4xl">image</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <span className="font-technical text-[8px] px-2 py-1 bg-background/90 border border-outline-variant text-tertiary uppercase tracking-widest">
                        {getCategoryName(item.categoryId)}
                      </span>
                    </div>
                    
                    {item.isFeatured && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-tertiary text-on-tertiary p-1.5 shadow-2xl">
                          <FiStar className="w-3 h-3 fill-current" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="font-display font-bold text-on-surface uppercase tracking-tight text-sm line-clamp-1 group-hover:text-tertiary transition-colors">{item.title}</h3>
                    
                    <div className="flex items-center justify-between font-technical text-[8px] text-on-surface-variant/30 uppercase tracking-widest">
                      <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleItemEdit(item)}
                        className="flex-1 border border-outline-variant text-on-surface-variant font-technical text-[8px] py-2.5 uppercase tracking-widest hover:border-tertiary hover:text-tertiary transition-all"
                      >
                        DÜZENLE
                      </button>
                      <button
                        onClick={() => handleItemDelete(item.id)}
                        className="flex-1 border border-outline-variant text-on-surface-variant/40 font-technical text-[8px] py-2.5 uppercase tracking-widest hover:border-red-900/50 hover:text-red-400 transition-all"
                      >
                        SİL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant max-w-md w-full p-10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-10 rotate-90 pointer-events-none"></div>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight">
                {editingCategory ? 'BİRİM DÜZENLEME' : 'YENİ BİRİM TANIMI'}
              </h3>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-on-surface-variant hover:text-tertiary transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCategorySubmit} className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                  <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">BİRİM ADI *</label>
                </div>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  required
                  className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                  placeholder="Örn: ECU Onarım Birimi"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                  <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">OPERASYONEL AÇIKLAMA</label>
                </div>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  rows={3}
                  className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all resize-none placeholder:text-outline-variant/30"
                  placeholder="Birim görev tanımı..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                    <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">İKON (EMOJI)</label>
                  </div>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                    className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none text-center"
                    placeholder="📷"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                    <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">SİSTEM RENGİ</label>
                  </div>
                  <select
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({...categoryForm, color: e.target.value})}
                    className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none cursor-pointer"
                  >
                    <option value="blue">TEKNİK MAVİ</option>
                    <option value="gray">ENDÜSTRİYEL GRİ</option>
                    <option value="purple">HASSAS MOR</option>
                  </select>
                </div>
              </div>
              
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={categoryForm.isActive}
                    onChange={(e) => setCategoryForm({...categoryForm, isActive: e.target.checked})}
                    className="w-5 h-5 bg-background border-outline-variant rounded-sm text-tertiary focus:ring-tertiary/50"
                  />
                </div>
                <span className="font-technical text-[10px] font-bold text-on-surface-variant group-hover:text-tertiary transition-colors uppercase tracking-widest">AKTİF DURUMDA</span>
              </label>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="btn-tech-outline flex-1 py-5 text-[10px] rounded-md"
                >
                  İPTAL
                </button>
                <button
                  type="submit"
                  className="btn-tech flex-1 py-5 text-[10px] rounded-md"
                >
                  {editingCategory ? 'GÜNCELLE' : 'SİSTEME TANIMLA'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Gallery Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant max-w-6xl w-full max-h-[95vh] flex flex-col relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-circuit-pattern opacity-10 rotate-90 pointer-events-none"></div>
            
            <div className="p-10 border-b border-outline-variant flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-tertiary/10 text-tertiary border border-tertiary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">image_search</span>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-on-surface uppercase tracking-tight">
                    {editingItem ? 'KAYIT DÜZENLEME' : 'YENİ GÖRSEL KAYDI'}
                  </h2>
                  <p className="font-technical text-[10px] text-on-surface-variant/50 uppercase tracking-[0.4em]">VERİ ARŞİV TERMİNALİ</p>
                </div>
              </div>
              <button onClick={() => setShowItemModal(false)} className="h-12 w-12 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-tertiary transition-all">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleItemSubmit} className="flex-1 overflow-y-auto p-10 relative z-10 scrollbar-technical">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">KAYIT BAŞLIĞI *</label>
                      </div>
                      <input
                        type="text"
                        value={itemForm.title}
                        onChange={(e) => setItemForm({...itemForm, title: e.target.value})}
                        required
                        className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                        placeholder="Örn: ECU Mikro-Lehimleme İşlemi"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">BİRİM SEÇİMİ *</label>
                      </div>
                      <select
                        value={itemForm.categoryId}
                        onChange={(e) => setItemForm({...itemForm, categoryId: e.target.value})}
                        required
                        className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none cursor-pointer"
                      >
                        <option value="">BİRİM SEÇİNİZ</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                      <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">ANA GÖRSEL URL *</label>
                    </div>
                    <input
                      type="url"
                      value={itemForm.imageUrl}
                      onChange={(e) => setItemForm({...itemForm, imageUrl: e.target.value})}
                      required
                      className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-[10px] focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                      placeholder="https://.../high-res-image.jpg"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                      <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">TETKİK ETİKETLERİ (VİRGÜLLE AYIRIN)</label>
                    </div>
                    <input
                      type="text"
                      value={itemForm.tags}
                      onChange={(e) => setItemForm({...itemForm, tags: e.target.value})}
                      placeholder="ecu, analiz, onarim..."
                      className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/30"
                    />
                  </div>
                  
                  <div className="flex gap-10 pt-4 px-2">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={itemForm.isActive}
                          onChange={(e) => setItemForm({...itemForm, isActive: e.target.checked})}
                          className="w-5 h-5 bg-background border-outline-variant rounded-sm text-tertiary focus:ring-tertiary/50"
                        />
                      </div>
                      <span className="font-technical text-[10px] font-bold text-on-surface-variant group-hover:text-tertiary transition-colors uppercase tracking-widest">ARŞİVDE AKTİF</span>
                    </label>
                    
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={itemForm.isFeatured}
                          onChange={(e) => setItemForm({...itemForm, isFeatured: e.target.checked})}
                          className="w-5 h-5 bg-background border-outline-variant rounded-sm text-tertiary focus:ring-tertiary/50"
                        />
                      </div>
                      <span className="font-technical text-[10px] font-bold text-on-surface-variant group-hover:text-tertiary transition-colors uppercase tracking-widest">KRİTİK GÖRSEL</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-8">
                  <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em] ml-1 block mb-4">GÖRSEL ANALİZ ÖNİZLEME</label>
                  <div className="aspect-video bg-background border border-outline-variant overflow-hidden flex items-center justify-center relative">
                    {itemForm.imageUrl ? (
                      <Image
                        src={itemForm.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover opacity-80"
                        unoptimized
                      />
                    ) : (
                      <div className="text-center opacity-10">
                        <span className="material-symbols-outlined text-6xl mb-4">image</span>
                        <p className="font-technical text-[10px] uppercase tracking-[0.4em]">SİSTEME VERİ BEKLENİYOR</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                  <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">TEKNİK ANALİZ NOTLARI *</label>
                </div>
                <div className="border border-outline-variant bg-white rounded-md min-h-[300px] text-slate-900 overflow-hidden">
                  <CKEditorComponent
                    value={itemForm.description}
                    onChange={(data: string) => setItemForm({...itemForm, description: data})}
                    placeholder="Görsel ile ilgili teknik detayları buraya girin..."
                  />
                </div>
              </div>
            </form>
            
            <div className="p-10 border-t border-outline-variant flex items-center justify-end gap-6 bg-background/50 relative z-10">
              <button 
                type="button"
                onClick={() => setShowItemModal(false)} 
                className="font-technical text-[10px] font-bold text-on-surface-variant/50 hover:text-on-surface transition-colors uppercase tracking-[0.4em]"
              >
                İPTAL TERMİNALİ
              </button>
              <button 
                onClick={handleItemSubmit}
                className="btn-tech px-12 py-5 h-auto text-xs rounded-md"
              >
                {editingItem ? 'VERİLERİ GÜNCELLE' : 'ARŞİVE KAYDET'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
