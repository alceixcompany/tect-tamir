'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { 
  FiImage, 
  FiFileText, 
  FiFolder, 
  FiMessageSquare, 
  FiPlus,
  FiRefreshCw,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiPhoneCall,
  FiActivity
} from 'react-icons/fi';
import CreateAdminModal from '@/components/CreateAdminModal';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalGalleryItems: number;
  totalCategories: number;
  totalNews: number;
  totalMessages: number;
  callCounter: number;
  activeNews: number;
  featuredNews: number;
  activeCategories: number;
  featuredGalleryItems: number;
}

interface RecentActivity {
  id: string;
  type: 'news' | 'gallery' | 'message' | 'category';
  title: string;
  description: string;
  timestamp: Timestamp;
  action: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalGalleryItems: 0,
    totalCategories: 0,
    totalNews: 0,
    totalMessages: 0,
    callCounter: 0,
    activeNews: 0,
    featuredNews: 0,
    activeCategories: 0,
    featuredGalleryItems: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [galleryItemsSnapshot, categoriesSnapshot, newsSnapshot, messagesSnapshot, callCounterSnapshot] = await Promise.all([
        getDocs(collection(db, 'gallery_items')),
        getDocs(collection(db, 'gallery_categories')),
        getDocs(collection(db, 'haberler')),
        getDocs(collection(db, 'contact_messages')),
        getDocs(collection(db, 'call_counter'))
      ]);

      const galleryItems = galleryItemsSnapshot.docs.map(doc => doc.data());
      const categories = categoriesSnapshot.docs.map(doc => doc.data());
      const news = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const callCounter = callCounterSnapshot.empty ? 0 : callCounterSnapshot.docs[0].data().count || 0;

      setStats({
        totalGalleryItems: galleryItems.length,
        totalCategories: categories.length,
        totalNews: news.length,
        totalMessages: messages.length,
        callCounter: callCounter,
        activeNews: news.filter((item: any) => item.isActive).length,
        featuredNews: news.filter((item: any) => item.featured).length,
        activeCategories: categories.filter((item: any) => item.isActive).length,
        featuredGalleryItems: galleryItems.filter((item: any) => item.isFeatured).length
      });

      const activities: RecentActivity[] = [];
      const getTimestampValue = (ts: any) => ts?.toDate?.()?.getTime() || new Date(ts).getTime() || 0;

      // News activities
      news.sort((a: any, b: any) => getTimestampValue(b.createdAt) - getTimestampValue(a.createdAt)).slice(0, 3).forEach((item: any) => {
        activities.push({
          id: item.id,
          type: 'news',
          title: item.title,
          description: item.subtitle || '',
          timestamp: item.createdAt,
          action: 'Yeni Haber'
        });
      });

      // Message activities
      messages.sort((a: any, b: any) => getTimestampValue(b.createdAt) - getTimestampValue(a.createdAt)).slice(0, 2).forEach((item: any) => {
        activities.push({
          id: item.id,
          type: 'message',
          title: item.name,
          description: item.message.substring(0, 40) + '...',
          timestamp: item.createdAt,
          action: 'Yeni Mesaj'
        });
      });

      activities.sort((a, b) => getTimestampValue(b.timestamp) - getTimestampValue(a.timestamp));
      setRecentActivities(activities.slice(0, 5));

    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (ts: any) => {
    if (!ts) return '...';
    const date = ts.toDate?.() || new Date(ts);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 3600) return Math.floor(seconds / 60) + ' dk önce';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' saat önce';
    return date.toLocaleDateString('tr-TR');
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
          <span className="font-technical text-tertiary text-[10px] tracking-[0.4em] uppercase mb-2 block">Sistem Durumu: Çevrimiçi</span>
          <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-tighter">Terminal <span className="text-tertiary">Özeti</span></h1>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button onClick={fetchDashboardData} className="h-12 w-12 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all">
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
          </button>
          {user?.isStaticAdmin && (
            <button 
              onClick={() => setShowCreateAdminModal(true)}
              className="btn-tech flex items-center gap-2 h-12"
            >
              <FiPlus /> YENİ OPERATÖR
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Teknik Haberler', val: stats.totalNews, sub: `${stats.activeNews} Yayınlanan`, icon: FiFileText, color: 'text-tertiary' },
          { label: 'Sistem Mesajları', val: stats.totalMessages, sub: 'Analiz Talebi', icon: FiMessageSquare, color: 'text-tertiary' },
          { label: 'Görsel Asetler', val: stats.totalGalleryItems, sub: 'Laboratuvar Kaydı', icon: FiImage, color: 'text-tertiary' },
          { label: 'Hızlı Erişim', val: stats.callCounter, sub: 'Telefon Araması', icon: FiPhoneCall, color: 'text-tertiary' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-surface-container p-8 border border-outline-variant rounded-md hover:border-tertiary/40 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-circuit-pattern opacity-5 rotate-90"></div>
            <div className={`h-10 w-10 bg-background border border-outline-variant ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="font-technical text-[9px] text-on-surface-variant/50 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-display font-bold text-on-surface tracking-tighter">{stat.val}</span>
              <span className="font-technical text-[8px] text-tertiary uppercase tracking-widest">{stat.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container border border-outline-variant p-10 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-circuit-pattern opacity-5"></div>
            <h3 className="text-lg font-display font-bold text-on-surface uppercase tracking-tight mb-8 flex items-center gap-3">
              <FiActivity className="text-tertiary" />
              SİSTEM KONTROLLERİ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/admin/haberler" className="group p-6 bg-background border border-outline-variant hover:border-tertiary transition-all flex items-center gap-6">
                <div className="h-12 w-12 bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-tertiary border border-outline-variant/30">
                  <FiPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-technical text-xs font-bold text-on-surface uppercase tracking-widest">YENİ ANALİZ RAPORU</h4>
                  <p className="text-[9px] text-on-surface-variant/40 mt-1 uppercase tracking-tighter">Haber veya teknik rapor ekleyin</p>
                </div>
              </Link>
              <Link href="/admin/mesajlar" className="group p-6 bg-background border border-outline-variant hover:border-tertiary transition-all flex items-center gap-6">
                <div className="h-12 w-12 bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-tertiary border border-outline-variant/30">
                  <FiMessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-technical text-xs font-bold text-on-surface uppercase tracking-widest">TALEP MERKEZİ</h4>
                  <p className="text-[9px] text-on-surface-variant/40 mt-1 uppercase tracking-tighter">Müşteri taleplerini inceleyin</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-high border border-outline-variant p-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-on-surface uppercase tracking-tighter">SİSTEM DURUMU</h3>
                <p className="text-on-surface-variant/60 max-w-md text-sm leading-relaxed uppercase font-technical text-[10px] tracking-widest">Sistem %100 kapasiteyle çalışıyor. Güvenli terminal bağlantısı aktif.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-background/50 px-4 py-2 border border-outline-variant">
                  <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                  <span className="font-technical text-[9px] text-green-400 uppercase tracking-[0.3em]">AKTİF</span>
                </div>
                <span className="font-technical text-[9px] text-on-surface-variant/30 uppercase tracking-widest">V.3.1.0-PRECISION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container border border-outline-variant rounded-md p-10 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-circuit-pattern opacity-5"></div>
            <h3 className="text-lg font-display font-bold text-on-surface uppercase tracking-tight mb-8 flex items-center gap-3">
              <FiClock className="text-tertiary" />
              SON İŞLEMLER
            </h3>
            <div className="space-y-8">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, i) => (
                  <div key={activity.id + i} className="flex gap-6 group">
                    <div className="relative flex flex-col items-center">
                      <div className={`h-10 w-10 border border-outline-variant bg-background flex items-center justify-center shrink-0 transition-all group-hover:border-tertiary ${
                        activity.type === 'news' ? 'text-tertiary' : 'text-tertiary/70'
                      }`}>
                        {activity.type === 'news' ? <FiFileText className="w-4 h-4" /> : <FiMessageSquare className="w-4 h-4" />}
                      </div>
                      {i !== recentActivities.length - 1 && <div className="w-[1px] h-full bg-outline-variant/30 mt-2" />}
                    </div>
                    <div className="pb-6">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="font-technical text-[8px] text-tertiary uppercase tracking-[0.3em] font-bold">{activity.action}</span>
                        <span className="font-technical text-[8px] text-on-surface-variant/30 uppercase">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                      <h4 className="text-xs font-technical font-bold text-on-surface uppercase tracking-wider line-clamp-1 group-hover:text-tertiary transition-colors">{activity.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-20">
                  <FiActivity className="w-12 h-12 mx-auto mb-6" />
                  <p className="font-technical text-[10px] uppercase tracking-widest">VERİ AKIŞI YOK</p>
                </div>
              )}
            </div>
            <Link href="/admin/haberler" className="mt-12 block w-full text-center py-4 border border-outline-variant bg-background/30 font-technical text-[9px] text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all uppercase tracking-[0.4em]">
              TÜMÜNÜ GÖRÜNTÜLE
            </Link>
          </div>
        </div>
      </div>

      <CreateAdminModal 
        isOpen={showCreateAdminModal} 
        onClose={() => setShowCreateAdminModal(false)} 
      />
    </div>
  );
};

export default AdminDashboard;
