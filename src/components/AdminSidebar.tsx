'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  FiBarChart, 
  FiImage, 
  FiFileText, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut,
  FiX,
  FiMenu,
  FiUser,
  FiChevronRight
} from 'react-icons/fi';

const AdminSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Terminal', href: '/admin', icon: FiBarChart },
    { name: 'Teknik Yayınlar', href: '/admin/haberler', icon: FiFileText },
    { name: 'Talep Analizi', href: '/admin/mesajlar', icon: FiMessageSquare },
    { name: 'Veri Arşivi', href: '/admin/galeri', icon: FiImage },
    { name: 'Sistem Ayarları', href: '/admin/ayarlar', icon: FiSettings },
  ];

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className="relative z-40 lg:hidden">
        {isMobileOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        )}
        
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface-container border-r border-outline-variant transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-20 px-6 border-b border-outline-variant">
              <Link href="/" className="text-xl font-display font-bold tracking-tighter text-on-surface uppercase">
                TECH-LAB <span className="text-tertiary">PRECISION</span>
              </Link>
              <button onClick={toggleMobileMenu} className="p-2 text-on-surface-variant hover:text-tertiary">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 transition-all group ${
                        isActive 
                          ? 'bg-tertiary text-on-tertiary' 
                          : 'text-on-surface-variant hover:bg-background/50 hover:text-tertiary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-on-tertiary' : 'text-outline-variant group-hover:text-tertiary'}`} />
                        <span className="font-technical font-bold text-xs tracking-widest uppercase">{item.name}</span>
                      </div>
                      {isActive && <FiChevronRight className="w-4 h-4" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-outline-variant bg-background/20">
              <div className="flex items-center gap-3 p-4 bg-background/40 border border-outline-variant/30 rounded-md mb-4">
                <div className="h-10 w-10 bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 rounded-sm">
                  <FiUser className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-technical font-bold text-on-surface truncate tracking-wider uppercase">{user?.displayName || 'Yönetici'}</p>
                  <p className="text-[8px] font-technical text-on-surface-variant/50 uppercase tracking-[0.3em]">OPERASYONEL BİRİM</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-red-400 font-technical font-bold text-[10px] tracking-widest hover:bg-red-900/10 transition-all border border-transparent hover:border-red-900/30 uppercase"
              >
                <FiLogOut className="w-4 h-4" />
                SİSTEMDEN ÇIK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-72 bg-surface-container border-r border-outline-variant flex flex-col">
          <div className="flex items-center h-20 px-8 border-b border-outline-variant">
            <Link href="/" className="text-xl font-display font-bold tracking-tighter text-on-surface uppercase">
              TECH-LAB <span className="text-tertiary">PRECISION</span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto py-8 px-6">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-4 transition-all group border-l-2 ${
                      isActive 
                        ? 'bg-tertiary/5 border-tertiary text-tertiary' 
                        : 'text-on-surface-variant border-transparent hover:bg-background/50 hover:text-tertiary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-tertiary' : 'text-outline-variant group-hover:text-tertiary'}`} />
                      <span className="font-technical font-bold text-xs tracking-[0.2em] uppercase">{item.name}</span>
                    </div>
                    {isActive && <FiChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-6 border-t border-outline-variant bg-background/20 relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-circuit-pattern opacity-5"></div>
            <div className="flex items-center gap-4 p-4 bg-background/40 border border-outline-variant/30 rounded-md mb-6 relative z-10">
              <div className="h-11 w-11 bg-tertiary/10 flex items-center justify-center text-tertiary shadow-inner border border-tertiary/20 rounded-sm">
                <FiUser className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-technical font-bold text-on-surface truncate tracking-wider uppercase">{user?.displayName || 'Yönetici'}</p>
                <p className="text-[8px] font-technical text-on-surface-variant/50 uppercase tracking-[0.3em]">TERMİNAL YETKİLİSİ</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 text-red-400/70 font-technical font-bold text-[10px] tracking-[0.3em] hover:text-red-400 hover:bg-red-900/10 rounded-sm transition-all border border-outline-variant/30 uppercase"
            >
              <FiLogOut className="w-5 h-5" />
              OTURUMU KAPAT
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden mobile-menu-container">
        <button
          onClick={toggleMobileMenu}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 bg-tertiary rounded-md flex items-center justify-center text-on-tertiary shadow-2xl active:scale-95 transition-transform"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
