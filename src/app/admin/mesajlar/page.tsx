'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, orderBy, query, Timestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiClock, FiSearch, FiCheckCircle, FiClock as FiPending, FiAlertCircle, FiX, FiSend, FiUser, FiPhone, FiMail } from 'react-icons/fi';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  urgency: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  isReplied: boolean;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü');
  const [selectedPriority, setSelectedPriority] = useState<string>('Tümü');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySubject, setReplySubject] = useState('');

  const statuses = ['Tümü', 'Yeni', 'Okundu', 'Yanıtlandı', 'Kapatıldı'];
  const priorities = ['Tümü', 'Düşük', 'Orta', 'Yüksek'];

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const messagesQuery = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(messagesQuery);
      
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      
      setMessages(messagesData);
    } catch (error) {
      console.error('Mesajlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-tertiary border-tertiary/20 bg-tertiary/5';
      case 'read': return 'text-on-surface-variant border-outline-variant bg-background/50';
      case 'replied': return 'text-green-400 border-green-900/30 bg-green-900/10';
      case 'closed': return 'text-on-surface-variant/40 border-outline-variant/20 bg-background/20';
      default: return 'text-on-surface-variant border-outline-variant bg-background/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-900/30 bg-red-900/10';
      case 'medium': return 'text-tertiary border-tertiary/20 bg-tertiary/5';
      case 'low': return 'text-on-surface-variant/70 border-outline-variant/30 bg-background/30';
      default: return 'text-on-surface-variant/70 border-outline-variant/30 bg-background/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'YENİ TALEP';
      case 'read': return 'İNCELENİYOR';
      case 'replied': return 'YANITLANDI';
      case 'closed': return 'ARŞİVLENDİ';
      default: return status.toUpperCase();
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'KRİTİK';
      case 'medium': return 'NORMAL';
      case 'low': return 'DÜŞÜK';
      default: return priority.toUpperCase();
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'normal': return 'STANDART (48S)';
      case 'acil': return 'HIZLI (24S)';
      case 'cok-acil': return 'ACİL MÜDAHALE';
      default: return urgency.toUpperCase();
    }
  };

  const getServiceTypeText = (serviceType: string) => {
    switch (serviceType) {
      case 'agir-vasita': return 'AĞIR VASITA ECU';
      case 'otomotiv-ecu': return 'OTOMOTİV KONTROL ÜNİTESİ';
      case 'iphone-anakart': return 'IPHONE / MOBİL ANAKART';
      case 'endustriyel-kart': return 'ENDÜSTRİYEL KART';
      case 'abs-klima': return 'ABS / KLİMA BEYNİ';
      case 'mikro-lehimleme': return 'MİKRO-CERRAHİ ONARIM';
      case 'diger': return 'DİĞER KARMAŞIK DEVRELER';
      default: return serviceType.toUpperCase();
    }
  };

  const filteredMessages = messages.filter(message => {
    const statusMatch = selectedStatus === 'Tümü' || getStatusText(message.status) === selectedStatus;
    const priorityMatch = selectedPriority === 'Tümü' || getPriorityText(message.priority) === selectedPriority;
    return statusMatch && priorityMatch;
  });

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    try {
      const messageRef = doc(db, 'contact_messages', messageId);
      await updateDoc(messageRef, {
        status: newStatus,
        isRead: newStatus === 'read' || newStatus === 'replied' || newStatus === 'closed',
        isReplied: newStatus === 'replied'
      });
      
      // Local state'i güncelle
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: newStatus as 'new' | 'read' | 'replied' | 'closed', isRead: newStatus === 'read' || newStatus === 'replied' || newStatus === 'closed', isReplied: newStatus === 'replied' }
          : msg
      ));
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
    }
  };

  const handleReply = (message: Message) => {
    setSelectedMessage(message);
    setReplySubject(`Re: ${getServiceTypeText(message.serviceType)} Hakkında`);
    setReplyText('');
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      const messageRef = doc(db, 'contact_messages', selectedMessage.id);
      await updateDoc(messageRef, {
        status: 'replied',
        isRead: true,
        isReplied: true,
        replyText: replyText,
        replySubject: replySubject,
        repliedAt: new Date()
      });

      // Local state'i güncelle
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id 
          ? { ...msg, status: 'replied', isRead: true, isReplied: true }
          : msg
      ));

      setShowReplyModal(false);
      setSelectedMessage(null);
      setReplyText('');
      setReplySubject('');
    } catch (error) {
      console.error('Yanıt gönderilirken hata:', error);
    }
  };

  const formatDate = (timestamp: Timestamp | Date | string | number | null | undefined) => {
    if (!timestamp) return 'Tarih yok';
    
    let date: Date;
    
    if (typeof (timestamp as { toDate?: () => Date }).toDate === 'function') {
      date = (timestamp as { toDate: () => Date }).toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else {
      return 'Tarih yok';
    }
    
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Mesajlar yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 bg-background min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline-variant">
        <div>
          <span className="font-technical text-tertiary text-[10px] tracking-[0.4em] uppercase mb-2 block">İletişim & Talep Yönetimi</span>
          <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-tighter">Analiz <span className="text-tertiary">Talepleri</span></h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'YENİ TALEP', val: messages.filter(m => m.status === 'new').length, color: 'text-tertiary', icon: 'pending' },
          { label: 'İNCELENEN', val: messages.filter(m => m.status === 'read').length, color: 'text-on-surface-variant', icon: 'visibility' },
          { label: 'YANITLANDI', val: messages.filter(m => m.status === 'replied').length, color: 'text-green-400', icon: 'done_all' },
          { label: 'ARŞİVLENDİ', val: messages.filter(m => m.status === 'closed').length, color: 'text-on-surface-variant/40', icon: 'archive' }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container p-6 border border-outline-variant relative overflow-hidden">
             <div className="absolute top-0 right-0 w-12 h-12 bg-circuit-pattern opacity-5"></div>
             <div className="flex items-center gap-4 mb-4">
               <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
               <span className="font-technical text-[9px] text-on-surface-variant/50 uppercase tracking-widest">{stat.label}</span>
             </div>
             <div className="text-3xl font-display font-bold text-on-surface">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-surface-container p-8 border border-outline-variant flex flex-wrap gap-8 items-end">
        <div className="space-y-3">
          <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">DURUM FİLTRESİ</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-background border border-outline-variant px-5 py-3 text-on-surface font-technical text-[10px] focus:border-tertiary outline-none min-w-[200px] cursor-pointer"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">ÖNCELİK SEVİYESİ</label>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-background border border-outline-variant px-5 py-3 text-on-surface font-technical text-[10px] focus:border-tertiary outline-none min-w-[200px] cursor-pointer"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="font-technical text-xs font-bold text-on-surface uppercase tracking-[0.2em]">
            AKTİF VERİ AKIŞI ({filteredMessages.length})
          </h2>
        </div>

        <div className="grid gap-6">
          {filteredMessages.map((message) => (
            <motion.div 
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container border border-outline-variant rounded-md p-8 group hover:border-tertiary/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight">{message.name}</h3>
                    <div className="flex gap-2">
                      <span className={`font-technical text-[8px] px-3 py-1 border border-outline-variant uppercase tracking-widest ${getStatusColor(message.status)}`}>
                        {getStatusText(message.status)}
                      </span>
                      <span className={`font-technical text-[8px] px-3 py-1 border border-outline-variant uppercase tracking-widest ${getPriorityColor(message.priority)}`}>
                        {getPriorityText(message.priority)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-technical text-[10px] text-on-surface-variant uppercase tracking-wider">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-sm">alternate_email</span>
                      {message.email}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-sm">call</span>
                      {message.phone}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-sm">schedule</span>
                      {formatDate(message.createdAt)}
                    </div>
                  </div>

                  <div className="p-6 bg-background/50 border border-outline-variant/30 text-on-surface-variant text-sm leading-relaxed relative">
                    <div className="absolute top-2 right-4 font-technical text-[8px] text-tertiary/30 tracking-widest uppercase">Mesaj İçeriği</div>
                    {message.message}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="px-4 py-2 bg-tertiary/5 border border-tertiary/20 font-technical text-[9px] text-tertiary uppercase tracking-widest">
                      KATEGORİ: {getServiceTypeText(message.serviceType)}
                    </div>
                    <div className="px-4 py-2 bg-outline-variant/10 border border-outline-variant/30 font-technical text-[9px] text-on-surface-variant/70 uppercase tracking-widest">
                      ACİLİYET: {getUrgencyText(message.urgency)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-auto">
                  <button
                    onClick={() => handleReply(message)}
                    className="btn-tech text-[10px] py-4 w-full lg:w-48 flex items-center justify-center gap-3"
                  >
                    YANITLA
                    <span className="material-symbols-outlined text-sm">reply</span>
                  </button>
                  <div className="space-y-2">
                    <label className="font-technical text-[8px] text-on-surface-variant/40 uppercase tracking-widest ml-1">DURUMU GÜNCELLE</label>
                    <select
                      value={message.status}
                      onChange={(e) => handleStatusChange(message.id, e.target.value)}
                      className="bg-background border border-outline-variant px-4 py-3 text-on-surface font-technical text-[10px] focus:border-tertiary outline-none w-full cursor-pointer"
                    >
                      <option value="new">YENİ</option>
                      <option value="read">İNCELENİYOR</option>
                      <option value="replied">YANITLANDI</option>
                      <option value="closed">KAPATILDI</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-32 border border-outline-variant bg-surface-container/30">
            <span className="material-symbols-outlined text-outline-variant text-6xl mb-6">dynamic_feed</span>
            <h3 className="font-technical text-sm font-bold text-on-surface uppercase tracking-[0.3em]">TALEP VERİSİ BULUNAMADI</h3>
            <p className="font-technical text-[10px] text-on-surface-variant/40 mt-2 uppercase tracking-widest">Seçilen filtrelere uygun aktif kayıt yok.</p>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant max-w-2xl w-full p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-10 rotate-90"></div>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight">
                ANALİZ YANITI: {selectedMessage.name}
              </h3>
              <button 
                onClick={() => setShowReplyModal(false)}
                className="text-on-surface-variant hover:text-tertiary transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                  <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">KONU BAŞLIĞI</label>
                </div>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                  placeholder="Yanıt konusu..."
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                  <label className="font-technical text-[9px] text-tertiary uppercase tracking-widest">TEKNİK YANIT İÇERİĞİ</label>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={8}
                  className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none resize-none transition-all"
                  placeholder="Yanıtınızı buraya yazın..."
                ></textarea>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReplyModal(false)}
                  className="btn-tech-outline flex-1 py-5 rounded-md"
                >
                  İPTAL
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="btn-tech flex-1 py-5 disabled:opacity-30 rounded-md"
                >
                  SİSTEME İŞLE & GÖNDER
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
