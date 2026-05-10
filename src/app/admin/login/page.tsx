'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, loginWithStaticAdmin, clearError, checkDatabaseAdmins } from '@/store/slices/authSlice';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkDatabaseAdmins());
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/admin');
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      if (email === 'demirbas@admin.com' && password === 'Demirbas123') {
        await dispatch(loginWithStaticAdmin({ email, password })).unwrap();
      } else {
        await dispatch(loginUser({ email, password })).unwrap();
      }
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-surface-container border border-outline-variant p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-circuit-pattern opacity-10 rotate-90"></div>
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-12">
            <Link href="/" className="text-3xl font-display font-bold tracking-tighter text-on-surface uppercase mb-8">
              TECH-LAB <span className="text-tertiary">PRECISION</span>
            </Link>
            
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-background border border-outline-variant/50">
              <FiShield className="text-tertiary text-xs" />
              <span className="font-technical text-[9px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">GÜVENLİ TERMİNAL GİRİŞİ</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                <label className="font-technical text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">KİMLİK BİLGİSİ / E-POSTA</label>
              </div>
              <div className="relative">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@techlabprecision.com"
                  className="w-full pl-14 pr-5 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/50"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                <label className="font-technical text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">ERİŞİM ANAHTARI / ŞİFRE</label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-12 py-4 bg-background border border-outline-variant rounded-md text-on-surface font-technical text-xs focus:border-tertiary focus:ring-2 focus:ring-tertiary/10 outline-none transition-all placeholder:text-outline-variant/50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-tertiary transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-900/10 text-red-400 text-[10px] font-technical font-bold border border-red-900/30 text-center uppercase tracking-widest">
                ERİŞİM REDDEDİLDİ: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-tech w-full flex items-center justify-center gap-4 py-5 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-tertiary/30 border-t-on-tertiary rounded-full animate-spin" />
              ) : (
                <>
                  SİSTEME BAĞLAN
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="font-technical text-[8px] text-on-surface-variant/30 uppercase tracking-[0.5em]">
            TECH-LAB PRECISION &copy; {new Date().getFullYear()} / INTERNAL ACCESS ONLY
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
