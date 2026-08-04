'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Shield, Menu, X, LayoutDashboard, Search, 
  PlusCircle, DollarSign, Star, User, Settings, Bell, 
  LogOut, ClipboardList, FileText, Award, Briefcase, CheckCircle, 
  ChevronDown, Globe, HelpCircle, MessageCircle
} from 'lucide-react';

export default function GlobalNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<'client' | 'provider'>('client');
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  const mainMenu = role === 'client' ? [
    { label: 'Dashboard', href: '/dashboard/client', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Post a Job', href: '/jobs/post', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Create Contract', href: '/contracts/create', icon: <FileText className="w-4 h-4" /> },
  ] : [
    { label: 'Dashboard', href: '/dashboard/provider', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Find Work', href: '/jobs', icon: <Search className="w-4 h-4" /> },
    { label: 'Applications', href: '/applications', icon: <ClipboardList className="w-4 h-4" /> },
  ];

  const moreMenu = [
    { label: 'Payments', href: '/payments', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Vouch Score', href: '/vouch-score', icon: <Star className="w-4 h-4" /> },
    { label: 'Skill Tests', href: '/skills', icon: <Award className="w-4 h-4" /> },
    { label: 'Showcase', href: '/showcase', icon: <Star className="w-4 h-4" /> },
    { label: 'Services', href: '/services', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Reviews', href: '/reviews', icon: <Star className="w-4 h-4" /> },
    { label: 'Notifications', href: '/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Disputes', href: '/disputes', icon: <Shield className="w-4 h-4" /> },
    { label: 'KYC', href: '/kyc', icon: <CheckCircle className="w-4 h-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
    { label: 'FAQ', href: '/faq', icon: <HelpCircle className="w-4 h-4" /> },
    { label: 'Help', href: '/help', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 lg:px-6 flex items-center justify-between h-14">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/logo.jpeg" alt="Dokets VouchAI" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover" />
              <span className="font-bold text-sm sm:text-base hidden sm:block">Dokets VouchAI</span>
            </Link>
            
            {/* Role Switcher */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setRole('client')} 
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${role === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>
                👤 Hire
              </button>
              <button onClick={() => setRole('provider')}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${role === 'provider' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>
                🔧 Work
              </button>
            </div>
            
            {/* Desktop Main Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainMenu.map((item, i) => (
                <Link key={i} href={item.href}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  {item.icon} {item.label}
                </Link>
              ))}
              
              {/* More Dropdown */}
              <div className="relative">
                <button onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100">
                  More <ChevronDown className="w-3 h-3" />
                </button>
                {moreOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg py-1 w-44 z-50" onMouseLeave={() => setMoreOpen(false)}>
                    {moreMenu.map((item, i) => (
                      <Link key={i} href={item.href} onClick={() => setMoreOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        {item.icon} {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Country/Currency */}
<div className="hidden lg:flex items-center gap-1">
  <select className="text-xs bg-gray-50 border rounded px-1.5 py-1">
  <option>🇮🇳 IN</option><option>🇺🇸 US</option><option>🇬🇧 UK</option>
  <option>🇦🇪 UAE</option><option>🇸🇦 SA</option><option>🇸🇬 SG</option>
  <option>🇯🇵 JP</option><option>🇨🇳 CN</option><option>🇰🇷 KR</option>
  <option>🇮🇩 ID</option><option>🇹🇭 TH</option><option>🇵🇭 PH</option>
  <option>🇻🇳 VN</option><option>🇦🇺 AU</option><option>🇳🇿 NZ</option>
  <option>🇧🇷 BR</option><option>🇲🇽 MX</option><option>🇦🇷 AR</option>
  <option>🇨🇦 CA</option><option>🇳🇬 NG</option><option>🇰🇪 KE</option>
  <option>🇿🇦 ZA</option><option>🇪🇬 EG</option><option>🇩🇪 DE</option>
  <option>🇫🇷 FR</option><option>🇪🇸 ES</option>
</select>
  <select className="text-xs bg-gray-50 border rounded px-1.5 py-1">
    <option>₹ INR</option><option>$ USD</option><option>€ EUR</option>
    <option>£ GBP</option><option>¥ JPY</option><option>A$ AUD</option>
    <option>C$ CAD</option><option>S$ SGD</option><option>R$ BRL</option>
    <option>د.إ AED</option><option>﷼ SAR</option><option>Mex$ MXN</option>
    <option>₦ NGN</option><option>KSh KES</option><option>R ZAR</option>
    <option>E£ EGP</option><option>¥ CNY</option><option>₩ KRW</option>
    <option>Rp IDR</option><option>₱ PHP</option><option>₫ VND</option>
    <option>฿ THB</option><option>NZ$ NZD</option><option>AR$ ARS</option>
  </select>
</div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="flex items-center gap-1.5 hover:bg-gray-100 px-2 py-1 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0] || 'U'}
                  </div>
                  <span className="text-xs text-gray-700 hidden md:block max-w-[60px] truncate">{user.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">{user.vouchScore}</span>
                </Link>
                <button onClick={() => { logout(); router.push('/login'); }}
                  className="text-xs text-red-500 hover:text-red-700 hidden md:block">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700">
                Login
              </Link>
            )}
            
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t bg-white shadow-lg">
            <div className="p-3">
              <div className="flex bg-gray-100 rounded-lg p-0.5 mb-3">
                <button onClick={() => setRole('client')} className={`flex-1 py-2 rounded-md text-sm font-medium ${role === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>👤 Hire</button>
                <button onClick={() => setRole('provider')} className={`flex-1 py-2 rounded-md text-sm font-medium ${role === 'provider' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>🔧 Work</button>
              </div>
              <div className="space-y-0.5">
                {[...mainMenu, ...moreMenu].map((item, i) => (
                  <Link key={i} href={item.href} onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100">
                    {item.icon} {item.label}
                  </Link>
                ))}
                {user && (
                  <button onClick={() => { logout(); router.push('/login'); setOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 w-full mt-2 border-t pt-3">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-14"></div>
    </>
  );
}