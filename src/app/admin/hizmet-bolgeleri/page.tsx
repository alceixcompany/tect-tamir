'use client'
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchServiceAreas, 
  addServiceArea, 
  updateServiceArea, 
  deleteServiceArea 
} from '@/store/slices/serviceAreasSlice';
import CKEditorComponent from '@/components/CKEditorComponent';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  maps?: Array<{id: string, url: string, title: string}>;
}

export default function AdminServiceAreas() {
  const dispatch = useAppDispatch();
  const { items: serviceAreas, isLoading: loading } = useAppSelector((state) => state.serviceAreas);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArea, setEditingArea] = useState<ServiceArea | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [areaForm, setAreaForm] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    imageUrl: '',
    isActive: true,
    order: 0,
    maps: [] as Array<{id: string, url: string, title: string}>
  });

  useEffect(() => {
    dispatch(fetchServiceAreas({}));
  }, [dispatch]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaForm.name || !areaForm.description || !areaForm.content) {
      alert('Lütfen tüm gerekli alanları doldurun.');
      return;
    }

    setIsUploading(true);
    try {
      const areaData = {
        ...areaForm,
        slug: areaForm.slug || generateSlug(areaForm.name),
        createdAt: editingArea ? editingArea.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingArea) {
        await dispatch(updateServiceArea({ id: editingArea.id, ...areaData })).unwrap();
      } else {
        await dispatch(addServiceArea(areaData)).unwrap();
      }

      setShowAddModal(false);
      setEditingArea(null);
      setAreaForm({ name: '', slug: '', description: '', content: '', imageUrl: '', isActive: true, order: 0, maps: [] });
      dispatch(fetchServiceAreas({}));
    } catch (error) {
      console.error('Error saving service area:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (area: ServiceArea) => {
    setEditingArea(area);
    setAreaForm({
      name: area.name, slug: area.slug, description: area.description, content: area.content, imageUrl: area.imageUrl,
      isActive: area.isActive, order: area.order, maps: area.maps || []
    });
    setShowAddModal(true);
  };

  const handleDelete = async (areaId: string) => {
    if (confirm('Bu hizmet bölgesini silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(deleteServiceArea(areaId)).unwrap();
        dispatch(fetchServiceAreas({}));
      } catch (error) {
        console.error('Error deleting service area:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-tertiary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-technical text-[10px] text-tertiary uppercase tracking-[0.4em]">VERİLER SENKRONİZE EDİLİYOR...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-10">
      {/* Page Header */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 bg-tertiary/10 text-tertiary border border-tertiary/20 flex items-center justify-center rounded-md">
            <span className="material-symbols-outlined text-4xl">location_on</span>
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tight">HİZMET BÖLGELERİ</h1>
            <p className="font-technical text-[10px] text-on-surface-variant/50 uppercase tracking-[0.4em]">COĞRAFİ OPERASYON MERKEZİ</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            setShowAddModal(true);
            setEditingArea(null);
            setAreaForm({ name: '', slug: '', description: '', content: '', imageUrl: '', isActive: true, order: 0, maps: [] });
          }}
          className="btn-tech px-10 py-4 text-xs rounded-md"
        >
          YENİ BÖLGE TANIMLA
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'TOPLAM BÖLGE', value: serviceAreas.length, icon: 'map' },
          { label: 'AKTİF OPERASYON', value: serviceAreas.filter(h => h.isActive).length, icon: 'check_circle' },
          { label: 'PASİF / YEDEK', value: serviceAreas.filter(h => !h.isActive).length, icon: 'pause_circle' },
          { label: 'YENİ VERİLER', value: serviceAreas.filter(h => new Date(h.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length, icon: 'history' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container border border-outline-variant p-8 rounded-md group hover:border-tertiary/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-tertiary/50 group-hover:text-tertiary transition-colors">{stat.icon}</span>
              <span className="font-technical text-[10px] text-on-surface-variant/40 font-bold">ST-{i+1}</span>
            </div>
            <p className="text-2xl font-display font-bold text-on-surface mb-1">{stat.value}</p>
            <p className="font-technical text-[9px] text-on-surface-variant/60 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-outline-variant rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-background/50 border-b border-outline-variant">
            <tr>
              <th className="px-8 py-6 font-technical text-[10px] text-tertiary uppercase tracking-widest">BÖLGE / ANALİZ</th>
              <th className="px-8 py-6 font-technical text-[10px] text-tertiary uppercase tracking-widest">SLUG</th>
              <th className="px-8 py-6 font-technical text-[10px] text-tertiary uppercase tracking-widest text-center">SIRA</th>
              <th className="px-8 py-6 font-technical text-[10px] text-tertiary uppercase tracking-widest">DURUM</th>
              <th className="px-8 py-6 font-technical text-[10px] text-tertiary uppercase tracking-widest text-right">EYLEM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {serviceAreas.map((area) => (
              <tr key={area.id} className="group hover:bg-white/[0.02] transition-all">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-surface-container-high border border-outline-variant flex items-center justify-center font-display font-bold text-tertiary rounded-sm group-hover:border-tertiary/30 transition-all">
                      {area.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-display font-bold text-on-surface uppercase tracking-tight">{area.name}</p>
                      <p className="text-[10px] text-on-surface-variant/40 font-technical uppercase tracking-widest truncate max-w-[200px]">{area.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 font-technical text-[10px] text-on-surface-variant/60">{area.slug}</td>
                <td className="px-8 py-6 font-technical text-[10px] text-on-surface-variant text-center">{area.order}</td>
                <td className="px-8 py-6">
                  <span className={`inline-flex px-3 py-1 rounded-sm font-technical text-[9px] font-bold uppercase tracking-widest ${
                    area.isActive ? 'bg-tertiary/10 text-tertiary border border-tertiary/20' : 'bg-outline-variant/10 text-on-surface-variant/40 border border-outline-variant/20'
                  }`}>
                    {area.isActive ? 'AKTİF' : 'PASİF'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleEdit(area)} className="p-2 text-tertiary hover:bg-tertiary/10 rounded-sm transition-all"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(area.id)} className="p-2 text-error hover:bg-error/10 rounded-sm transition-all"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-[100] p-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant max-w-6xl w-full max-h-[95vh] flex flex-col relative overflow-hidden shadow-2xl rounded-md"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-circuit-pattern opacity-10 rotate-90 pointer-events-none"></div>
            
            <div className="p-10 border-b border-outline-variant flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-tertiary/10 text-tertiary border border-tertiary/20 flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-3xl">add_location_alt</span>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-on-surface uppercase tracking-tight">
                    {editingArea ? 'BÖLGE GÜNCELLEME' : 'YENİ BÖLGE TANIMI'}
                  </h2>
                  <p className="font-technical text-[10px] text-on-surface-variant/50 uppercase tracking-[0.4em]">LOJİSTİK VERİ GİRİŞİ</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="h-12 w-12 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-tertiary transition-all">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 relative z-10 scrollbar-technical">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">BÖLGE ADI *</label>
                      </div>
                      <input
                        type="text"
                        value={areaForm.name}
                        onChange={(e) => setAreaForm({...areaForm, name: e.target.value})}
                        required
                        className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                        placeholder="Örn: Kadıköy"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">URL SLUG</label>
                      </div>
                      <input
                        type="text"
                        value={areaForm.slug}
                        onChange={(e) => setAreaForm({...areaForm, slug: e.target.value})}
                        className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                        placeholder="otomatik-olusturulur"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                      <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">OPERASYONEL ÖZET *</label>
                    </div>
                    <textarea
                      value={areaForm.description}
                      onChange={(e) => setAreaForm({...areaForm, description: e.target.value})}
                      required
                      rows={3}
                      className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all resize-none"
                      placeholder="Bölge hizmet kapsamı özeti..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">KAPAK GÖRSEL URL</label>
                      </div>
                      <input
                        type="url"
                        value={areaForm.imageUrl}
                        onChange={(e) => setAreaForm({...areaForm, imageUrl: e.target.value})}
                        className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-[10px] focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                        <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">LİSTE SIRALAMASI</label>
                      </div>
                      <input
                        type="number"
                        value={areaForm.order}
                        onChange={(e) => setAreaForm({...areaForm, order: parseInt(e.target.value) || 0})}
                        className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={areaForm.isActive}
                        onChange={(e) => setAreaForm({...areaForm, isActive: e.target.checked})}
                        className="w-5 h-5 bg-background border-outline-variant rounded-sm text-tertiary focus:ring-tertiary/50"
                      />
                    </div>
                    <span className="font-technical text-[10px] font-bold text-on-surface-variant group-hover:text-tertiary transition-colors uppercase tracking-widest">OPERASYONEL OLARAK AKTİF</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                    <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">BÖLGESEL ANALİZ VE DETAYLAR *</label>
                  </div>
                  <div className="border border-outline-variant bg-white rounded-md min-h-[400px] text-slate-900 overflow-hidden">
                    <CKEditorComponent
                      value={areaForm.content}
                      onChange={(data) => setAreaForm({...areaForm, content: data})}
                      onMapsChange={(maps) => setAreaForm({...areaForm, maps})}
                      initialMaps={areaForm.maps}
                      placeholder="Bölgeye özel detaylı teknik bilgiler ve haritalar..."
                      height="300px"
                      label=""
                    />
                  </div>
                </div>
              </div>
            </form>
            
            <div className="p-10 border-t border-outline-variant flex items-center justify-end gap-6 bg-background/50 relative z-10">
              <button 
                type="button"
                onClick={() => setShowAddModal(false)} 
                className="font-technical text-[10px] font-bold text-on-surface-variant/50 hover:text-on-surface transition-colors uppercase tracking-[0.4em]"
              >
                İPTAL TERMİNALİ
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isUploading}
                className="btn-tech px-12 py-5 h-auto text-xs rounded-md"
              >
                {isUploading ? 'VERİ AKTARILIYOR...' : (editingArea ? 'VERİLERİ GÜNCELLE' : 'SİSTEME KAYDET')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
