'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Shield, Menu, X, LayoutDashboard, Search, 
  PlusCircle, DollarSign, Star, User, Settings, Bell, 
  LogOut, ClipboardList, FileText, Home
} from 'lucide-react';

export default function GlobalNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<'client' | 'provider'>('client');

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  const clientMenu = [
    { label: 'Dashboard', href: '/dashboard/client', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Post a Job', href: '/jobs/post', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Create Contract', href: '/contracts/create', icon: <FileText className="w-4 h-4" /> },
    { label: 'Payments', href: '/payments', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Vouch Score', href: '/vouch-score', icon: <Star className="w-4 h-4" /> },
  ];

  const providerMenu = [
    { label: 'Dashboard', href: '/dashboard/provider', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Find Work', href: '/jobs', icon: <Search className="w-4 h-4" /> },
    { label: 'Applications', href: '/applications', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'Earnings', href: '/payments', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Vouch Score', href: '/vouch-score', icon: <Star className="w-4 h-4" /> },
  ];

  const commonMenu = [
    { label: 'Notifications', href: '/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
    { label: 'Reviews', href: '/reviews', icon: <Star className="w-4 h-4" /> },
    { label: 'Disputes', href: '/disputes', icon: <Shield className="w-4 h-4" /> },
    { label: 'KYC', href: '/kyc', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const menuItems = role === 'client' ? [...clientMenu, ...commonMenu] : [...providerMenu, ...commonMenu];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between h-14">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
  <img src="/logo.jpeg" alt="Dokets VouchAI" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover" />
  <span className="font-bold text-base sm:text-lg hidden xs:block">Dokets VouchAI</span>
</Link>
            
            {/* Role Switcher - visible on all screens */}
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-shrink-0">
              <button onClick={() => setRole('client')} 
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-all ${
                  role === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}>
                <span className="hidden sm:inline">👤 Hire</span>
                <span className="sm:hidden">👤</span>
              </button>
              <button onClick={() => setRole('provider')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-all ${
                  role === 'provider' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'
                }`}>
                <span className="hidden sm:inline">🔧 Work</span>
                <span className="sm:hidden">🔧</span>
              </button>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {menuItems.map((item, i) => (
                <Link key={i} href={item.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                    isActive(item.href) 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}>
                  {item.icon} {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {user ? (
              <>
                <span className="text-xs sm:text-sm text-gray-500 hidden sm:block max-w-[80px] truncate">{user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded-full font-medium">{user.vouchScore}</span>
                <button onClick={() => { logout(); router.push('/login'); }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium hidden sm:flex items-center gap-1">
                  <LogOut className="w-3 h-3" /> <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
                Login
              </Link>
            )}
            
            {/* Mobile Menu Button - larger touch target */}
            <button className="lg:hidden p-2 -mr-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors" 
              onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t bg-white shadow-lg animate-in slide-in-from-top">
            {/* Mobile Role Switcher */}
            <div className="p-3 pb-1">
              <p className="text-xs text-gray-400 mb-2 px-1">I want to</p>
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button onClick={() => setRole('client')} 
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                    role === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
                  }`}>
                  👤 Hire Services
                </button>
                <button onClick={() => setRole('provider')}
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                    role === 'provider' ? 'bg-white shadow text-green-600' : 'text-gray-500'
                  }`}>
                  🔧 Provide Services
                </button>
              </div>
            </div>
            
            <div className="p-3 space-y-0.5">
              {menuItems.map((item, i) => (
                <Link key={i} href={item.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive(item.href) 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }`}>
                  <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <button onClick={() => { logout(); router.push('/login'); setOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 active:bg-red-100 w-full mt-2 border-t pt-3">
                  <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </span>
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-14"></div>
    </>
  );
}