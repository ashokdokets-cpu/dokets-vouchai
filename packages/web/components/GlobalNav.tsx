'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Shield, Menu, X, LayoutDashboard, Search, 
  PlusCircle, DollarSign, Star, User, Settings, Bell, 
  LogOut, ClipboardList, FileText, Briefcase
} from 'lucide-react';

export default function GlobalNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<'client' | 'provider'>('client');

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
    { label: 'My Applications', href: '/applications', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'Earnings', href: '/payments', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Vouch Score', href: '/vouch-score', icon: <Star className="w-4 h-4" /> },
  ];

  const commonMenu = [
    { label: 'Notifications', href: '/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const menuItems = role === 'client' ? [...clientMenu, ...commonMenu] : [...providerMenu, ...commonMenu];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-lg hidden sm:block">VouchAI</span>
            </Link>
            
            {/* Role Switcher */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setRole('client')} 
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${role === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>
                👤 Hire
              </button>
              <button onClick={() => setRole('provider')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${role === 'provider' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>
                🔧 Work
              </button>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item, i) => (
                <Link key={i} href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  {item.icon} {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500 hidden md:block">{user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{user.vouchScore}</span>
                <button onClick={() => { logout(); router.push('/login'); }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium hidden md:flex items-center gap-1">
                  <LogOut className="w-3 h-3" /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                Login
              </Link>
            )}
            
            <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t bg-white">
            {/* Mobile Role Switcher */}
            <div className="p-4 pb-0">
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button onClick={() => setRole('client')} 
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${role === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>
                  👤 Hire
                </button>
                <button onClick={() => setRole('provider')}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${role === 'provider' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>
                  🔧 Work
                </button>
              </div>
            </div>
            <div className="p-4 space-y-1">
              {menuItems.map((item, i) => (
                <Link key={i} href={item.href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                  {item.icon} {item.label}
                </Link>
              ))}
              {user && (
                <button onClick={() => { logout(); router.push('/login'); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}