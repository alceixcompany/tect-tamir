'use client'
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createAdmin, clearError } from '@/store/slices/authSlice';

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      await dispatch(createAdmin({ email, password, displayName })).unwrap();
      // Başarılı olursa formu temizle ve modalı kapat
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setDisplayName('');
      onClose();
    } catch (err) {
      console.error('Admin creation error:', err);
    }
  };

  const handleClose = () => {
    dispatch(clearError());
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-6">
      <div className="w-full max-w-md bg-surface-container border border-outline-variant rounded-md shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-circuit-pattern opacity-10 rotate-90 pointer-events-none"></div>
        
        <div className="p-8 border-b border-outline-variant flex items-center justify-between relative z-10">
          <div>
            <h3 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight">YENİ OPERATÖR TANIMI</h3>
            <p className="font-technical text-[8px] text-on-surface-variant/50 uppercase tracking-[0.4em]">SİSTEM YETKİ KİMLİĞİ</p>
          </div>
          <button
            onClick={handleClose}
            className="h-10 w-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-tertiary transition-all"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-1 bg-tertiary rounded-full"></div>
              <label htmlFor="displayName" className="font-technical text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">OPERATÖR ADI</label>
            </div>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
              placeholder="Ad Soyad"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-1 bg-tertiary/40 rounded-full"></div>
              <label htmlFor="email" className="font-technical text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">SİSTEM E-POSTA</label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
              placeholder="admin@iphonetamiratolyesi.com"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-1 bg-tertiary rounded-full"></div>
              <label htmlFor="password" className="font-technical text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">ERİŞİM ŞİFRESİ</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 pr-12 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-tertiary transition-colors"
              >
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.645 11.645 0 013.77-4.65M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-1 bg-tertiary rounded-full"></div>
              <label htmlFor="confirmPassword" className="font-technical text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">ŞİFRE DOĞRULAMA</label>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded-md px-5 py-4 pr-12 text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-tertiary transition-colors"
              >
                {showConfirmPassword ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.645 11.645 0 013.77-4.65M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {password !== confirmPassword && confirmPassword && (
            <div className="p-3 bg-red-900/10 border border-red-900/20 text-red-400 font-technical text-[8px] uppercase tracking-widest text-center">
              DİKKAT: Şifreler eşleşmiyor
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-900/10 border border-red-900/20 text-red-400 font-technical text-[8px] uppercase tracking-widest text-center">
              HATA: {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn-tech-outline flex-1 py-5 rounded-md"
            >
              İPTAL
            </button>
            <button
              type="submit"
              disabled={isLoading || password !== confirmPassword}
              className="btn-tech flex-1 py-5 rounded-md disabled:opacity-50"
            >
              {isLoading ? 'OLUŞTURULUYOR...' : 'OPERATÖR TANIMLA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminModal;
