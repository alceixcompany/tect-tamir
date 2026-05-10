'use client'
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiActivity, FiInfo } from 'react-icons/fi';

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { changePassword, user, error, successMessage } = useAuth();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await changePassword(currentPassword, newPassword);
      if (result.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Password change error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-12 flex items-center gap-6">
        <div className="h-16 w-16 bg-tertiary/10 text-tertiary border border-tertiary/20 flex items-center justify-center rounded-md">
          <span className="material-symbols-outlined text-4xl">shield_person</span>
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tight">GÜVENLİK TERMİNALİ</h1>
          <p className="font-technical text-[10px] text-on-surface-variant/50 uppercase tracking-[0.4em]">ERİŞİM VE KİMLİK YÖNETİMİ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-surface-container border border-outline-variant rounded-md p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-circuit-pattern opacity-5 rotate-90"></div>
            
            <form onSubmit={handlePasswordChange} className="space-y-8 relative z-10">
              {user?.isStaticAdmin ? (
                <div className="p-6 bg-tertiary/5 border border-tertiary/20 rounded-md">
                  <div className="flex items-start gap-4">
                    <FiLock className="text-tertiary mt-1" />
                    <p className="text-[10px] font-technical font-bold text-on-surface-variant uppercase tracking-widest leading-loose">
                      Statik geliştirme hesabı ile oturum açtınız. <br/>
                      <span className="text-tertiary">Bu hesapta şifre değiştirme yetkisi bulunmamaktadır.</span>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
                      <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">MEVCUT ŞİFRE</label>
                    </div>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                      <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">YENİ ŞİFRE</label>
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                      placeholder="Minimum 6 Karakter"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                      <label className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">YENİ ŞİFRE TEKRAR</label>
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-background border border-outline-variant rounded-md px-6 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                      placeholder="Şifreyi Doğrulayın"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-tech w-full py-5 text-xs font-bold tracking-[0.3em] rounded-md disabled:opacity-50"
                    >
                      {isLoading ? 'PROTOKOL GÜNCELLENİYOR...' : 'ŞİFREYİ GÜNCELLE'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence>
            {(error || successMessage) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-6 rounded-md border font-technical text-[10px] uppercase tracking-widest ${
                  error ? 'bg-error/10 border-error/20 text-error' : 'bg-tertiary/10 border-tertiary/20 text-tertiary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FiActivity className="animate-pulse" />
                  {error || successMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface-container/50 border border-outline-variant rounded-md p-8">
            <h3 className="text-sm font-display font-bold text-on-surface uppercase tracking-tight mb-6 flex items-center gap-3">
              <FiInfo className="text-tertiary" />
              GÜVENLİK PROTOKOLLERİ
            </h3>
            <ul className="space-y-6">
              {[
                'Şifre en az 6 alfanümerik karakter içermelidir.',
                'Büyük/küçük harf duyarlılığına dikkat edin.',
                'Şifrenizi dijital ortamlarda açık metin olarak saklamayın.',
                'Her 90 günde bir şifre güncellemesi önerilir.'
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-tertiary font-technical text-[10px] font-bold">0{i+1}</span>
                  <p className="text-[9px] text-on-surface-variant/70 uppercase tracking-widest leading-loose">{tip}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 border border-outline-variant rounded-md circuit-pattern opacity-50">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full border border-outline-variant flex items-center justify-center mb-4">
                <FiActivity className="text-tertiary" />
              </div>
              <p className="font-technical text-[8px] text-on-surface-variant uppercase tracking-[0.5em]">SİSTEM DURUMU: NOMİNAL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
