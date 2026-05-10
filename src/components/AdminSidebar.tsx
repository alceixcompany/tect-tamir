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
    { name: 'Panel', href: '/admin', icon: FiBarChart },
    { name: 'Haberler', href: '/admin/haberler', icon: FiFileText },
    { name: 'Mesajlar', href: '/admin/mesajlar', icon: FiMessageSquare },
    { name: 'Galeri', href: '/admin/galeri', icon: FiImage },
    { name: 'Ayarlar', href: '/admin/ayarlar', icon: FiSettings },
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
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
        )}
        
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
              <div className="relative h-8 w-32">
                <Image src="/demirbaslogo.png" alt="Logo" fill className="object-contain object-left" />
              </div>
              <button onClick={toggleMobileMenu} className="p-2 text-gray-400 hover:text-gray-600">
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
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                        isActive 
                          ? 'bg-[var(--lale-gold)] text-white shadow-lg shadow-[var(--lale-gold)]/20' 
                          : 'text-[#5a666d] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[var(--lale-gold)]'}`} />
                        <span className="font-bold text-sm">{item.name}</span>
                      </div>
                      {isActive && <FiChevronRight className="w-4 h-4" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 mb-4">
                <div className="h-10 w-10 rounded-xl bg-[var(--lale-gold)]/10 flex items-center justify-center text-[var(--lale-gold)]">
                  <FiUser className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-[var(--lale-anthracite)] truncate">{user?.displayName || 'Yönetici'}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ADMİN PANELİ</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"
              >
                <FiLogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-72 bg-white border-r border-gray-100 flex flex-col">
          <div className="flex items-center h-20 px-8 border-b border-gray-100">
            <div className="relative h-10 w-40">
              <Image src="/demirbaslogo.png" alt="Logo" fill className="object-contain object-left" />
            </div>
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
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${
                      isActive 
                        ? 'bg-[var(--lale-gold)] text-white shadow-xl shadow-[var(--lale-gold)]/20' 
                        : 'text-[#5a666d] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[var(--lale-gold)]'}`} />
                      <span className="font-bold text-[15px]">{item.name}</span>
                    </div>
                    {isActive && <FiChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50 mb-6 border border-gray-100/50">
              <div className="h-11 w-11 rounded-2xl bg-[var(--lale-gold)]/10 flex items-center justify-center text-[var(--lale-gold)] shadow-inner">
                <FiUser className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-[var(--lale-anthracite)] truncate">{user?.displayName || 'Yönetici'}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">ADMİN PANELİ</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
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
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-[var(--lale-gold)] flex items-center justify-center text-white shadow-2xl shadow-[var(--lale-gold)]/40 active:scale-95 transition-transform"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
