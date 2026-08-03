'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Shield, Menu, X, LayoutDashboard, Briefcase, Search, 
  PlusCircle, DollarSign, Star, User, Settings, Bell, 
  LogOut, ClipboardList, FileText
} from 'lucide-react';

export default function GlobalNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/client', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Find Work', href: '/jobs', icon: <Search className="w-4 h-4" /> },
    { label: 'Post a Job', href: '/jobs/post', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Create Contract', href: '/contracts/create', icon: <FileText className="w-4 h-4" /> },
    { label: 'My Applications', href: '/applications', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'Payments', href: '/payments', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Vouch Score', href: '/vouch-score', icon: <Star className="w-4 h-4" /> },
    { label: 'Notifications', href: '/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-lg hidden sm:block">VouchAI</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.slice(0, 6).map((item, i) => (
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
            
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t bg-white">
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