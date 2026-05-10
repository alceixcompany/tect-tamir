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
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-[var(--lale-anthracite)] mb-2">Genel Bakış</h1>
          <p className="text-[#5a666d] font-medium">Demirbaş Muhasebe yönetim sistemine hoş geldiniz.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchDashboardData} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[var(--lale-gold)] hover:border-[var(--lale-gold)] transition-all">
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
          </button>
          {user?.isStaticAdmin && (
            <button 
              onClick={() => setShowCreateAdminModal(true)}
              className="px-6 py-3 bg-[var(--lale-gold)] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[var(--lale-gold)]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <FiPlus /> YENİ ADMİN
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Haberler', val: stats.totalNews, sub: `${stats.activeNews} Aktif`, icon: FiFileText, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Mesajlar', val: stats.totalMessages, sub: 'Yeni Gelen', icon: FiMessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Galeri', val: stats.totalGalleryItems, sub: 'Görsel Aset', icon: FiImage, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Aramalar', val: stats.callCounter, sub: 'Hızlı Erişim', icon: FiPhoneCall, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all"
          >
            <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#5a666d] uppercase tracking-wider mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[var(--lale-anthracite)]">{stat.val}</span>
              <span className="text-xs font-bold text-gray-400">{stat.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <FiActivity className="text-[var(--lale-gold)]" />
              Hızlı Yönetim
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/admin/haberler" className="group flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-[var(--lale-gold)] hover:bg-white transition-all">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[var(--lale-gold)] shadow-sm">
                  <FiPlus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--lale-anthracite)]">Yeni Haber Yayınla</h4>
                  <p className="text-xs text-gray-400 font-medium">Güncel gelişmeleri paylaşın</p>
                </div>
              </Link>
              <Link href="/admin/mesajlar" className="group flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-[var(--lale-gold)] hover:bg-white transition-all">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[var(--lale-gold)] shadow-sm">
                  <FiMessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--lale-anthracite)]">Mesajları Yanıtla</h4>
                  <p className="text-xs text-gray-400 font-medium">Müşteri taleplerini inceleyin</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-[#1e333c] rounded-[2.5rem] p-10 text-white overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--lale-gold)]/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold mb-4">Sistem Durumu</h3>
            <p className="text-white/60 mb-8 max-w-md leading-relaxed">Sisteminiz şu anda %100 kapasiteyle ve güvenli bağlantı üzerinden çalışmaktadır.</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-400">AKTİF</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-xs font-bold text-white/40">V.2.5.0</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 h-full shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <FiClock className="text-[var(--lale-gold)]" />
              Son Hareketler
            </h3>
            <div className="space-y-6">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, i) => (
                  <div key={activity.id + i} className="flex gap-4 group">
                    <div className="relative flex flex-col items-center">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
                        activity.type === 'news' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
                      }`}>
                        {activity.type === 'news' ? <FiFileText /> : <FiMessageSquare />}
                      </div>
                      {i !== recentActivities.length - 1 && <div className="w-px h-full bg-gray-50 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[var(--lale-gold)] uppercase tracking-wider">{activity.action}</span>
                        <span className="text-[10px] text-gray-300 font-medium">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--lale-anthracite)] line-clamp-1">{activity.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FiActivity className="w-8 h-8 text-gray-200 mx-auto mb-4" />
                  <p className="text-sm text-gray-400 font-medium">Henüz aktivite bulunmuyor.</p>
                </div>
              )}
            </div>
            <Link href="/admin/haberler" className="mt-8 block w-full text-center py-4 rounded-2xl bg-gray-50 text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-[var(--lale-anthracite)] transition-all">
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
