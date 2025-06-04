"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { 
  Brain, 
  Users, 
  Map, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  Sparkles,
  AtSign,
  DollarSign,
  Plus,
  Home,
  BookOpen,
  Trophy,
  Settings,
  Zap,
  Star,
  Rocket,
  Heart
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Create', icon: Plus, href: '/companions/new', gradient: 'from-orange-500 to-red-400' },
    { name: 'AI Tutors', icon: Brain, href: '/companions', gradient: 'from-blue-500 to-cyan-400' },
    { name: 'Billing', icon: DollarSign, href: '/billing', gradient: 'from-green-500 to-emerald-400' },
    { name: 'My Journey', icon: Map, href: '/journey', gradient: 'from-purple-500 to-pink-400' },
   
  ];

  const mobileTabItems = [
    { name: 'Home', icon: Home, id: 'home', href: '/', color: 'text-blue-400' },
    { name: 'Learn', icon: BookOpen, id: 'learn', href: '/companions', color: 'text-purple-400' },
    { name: 'Progress', icon: Trophy, id: 'progress', href: '/journey', color: 'text-orange-400' },
    { name: 'Profile', icon: User, id: 'profile', href: '/profile', color: 'text-pink-400' }
  ];

  return (
    <>
      {/* Enhanced Global Styles */}
      <style jsx global>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #1e1b4b;
        }
        
        *::-webkit-scrollbar {
          width: 6px;
        }
        
        *::-webkit-scrollbar-track {
          background: #1e1b4b;
        }
        
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 3px;
        }

        .navbar-dark {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%, 
            rgba(30, 27, 75, 0.98) 50%, 
            rgba(15, 23, 42, 0.95) 100%);
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 
                      0 0 0 1px rgba(99, 102, 241, 0.1);
        }
        
        .navbar-scrolled {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.98) 0%, 
            rgba(30, 27, 75, 0.99) 50%, 
            rgba(15, 23, 42, 0.98) 100%);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 
                      0 0 0 1px rgba(99, 102, 241, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .nav-item-modern {
          position: relative;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
        }
        
        .nav-item-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.1), 
            transparent);
          transition: left 0.6s ease;
        }
        
        .nav-item-modern:hover::before {
          left: 100%;
        }
        
        .nav-item-modern:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.25);
        }
        
        .logo-container {
          position: relative;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
          padding: 8px;
          border-radius: 16px;
          animation: logoGlow 3s ease-in-out infinite alternate;
        }
        
        @keyframes logoGlow {
          0% { 
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            filter: hue-rotate(0deg);
          }
          100% { 
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
            filter: hue-rotate(30deg);
          }
        }
        
        .search-modern {
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1), 
            rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(99, 102, 241, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .search-modern:focus-within {
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.15), 
            rgba(139, 92, 246, 0.15));
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1),
                      0 8px 25px rgba(99, 102, 241, 0.15);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #fb7185);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .notification-badge {
          background: linear-gradient(135deg, #ef4444, #f97316);
          animation: notificationPulse 2s infinite;
        }
        
        @keyframes notificationPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
        
        .mobile-tabs {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.98) 0%, 
            rgba(30, 27, 75, 0.99) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          border-top: 1px solid rgba(99, 102, 241, 0.2);
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .mobile-tab {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .mobile-tab.active {
          transform: translateY(-4px);
        }
        
        .mobile-tab.active::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 2px;
        }
        
        .mobile-menu-overlay {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%, 
            rgba(30, 27, 75, 0.98) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          border-left: 1px solid rgba(99, 102, 241, 0.2);
        }
        
        .profile-avatar {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: 2px solid rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
        }
        
        .profile-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }
        
        .floating-orb {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #60a5fa, transparent);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .glow-button {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
        }
        
        .glow-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
        }
      `}</style>

      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled ? 'navbar-scrolled' : 'navbar-dark'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="logo-container relative">
                <Brain className="w-8 h-8 text-white" />
                <div className="floating-orb" style={{top: '2px', right: '2px'}}></div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-300 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold gradient-text">
                  LearnSmart
                </h1>
                <p className="text-xs text-slate-400 -mt-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  AI Learning Platform
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Enhanced Search */}
              {/* <div className="search-modern relative mr-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, tutorials..."
                  className="w-72 pl-12 pr-6 py-3 rounded-2xl bg-transparent border-0 text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
                />
                <Rocket className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              </div> */}

              {/* Navigation Items with Gradients */}
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-item-modern group relative flex items-center space-x-3 px-6 py-3 rounded-2xl text-slate-300 hover:text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))`,
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                  }}
                >
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient} bg-opacity-20`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}

              {/* Auth Buttons */}
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="glow-button flex items-center space-x-2 px-6 py-3 rounded-2xl text-white font-medium text-sm"
                >
                  <AtSign className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </SignedOut>

              {/* Notifications */}
              <button className="nav-item-modern relative p-4 rounded-2xl text-slate-300 hover:text-white bg-slate-800/50 border border-slate-700/50">
                <Bell className="w-6 h-6" />
                <span className="notification-badge absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </span>
              </button>

              {/* Profile Section */}
              <SignedIn>
                <div className="flex items-center space-x-4 ml-4">
                  <div className="profile-avatar w-12 h-12 rounded-2xl flex items-center justify-center">
                    <UserButton />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-white flex items-center gap-2">
                      Alex Johnson
                      <Star className="w-4 h-4 text-yellow-400" />
                    </p>
                    <p className="text-xs text-purple-400 flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Pro Student
                    </p>
                  </div>
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden nav-item-modern p-3 rounded-2xl text-slate-300 bg-slate-800/50 border border-slate-700/50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-sm mobile-menu-overlay z-[9999] transform transition-transform duration-300">
              <div className="p-6 h-full overflow-y-auto">
                {/* Mobile Profile */}
                <div className="flex items-center space-x-4 mb-8 pt-8">
                  <div className="profile-avatar w-16 h-16 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white flex items-center gap-2">
                      Alex Johnson
                      <Star className="w-4 h-4 text-yellow-400" />
                    </p>
                    <p className="text-sm text-purple-400 flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Pro Student
                    </p>
                  </div>
                </div>

                {/* Mobile Search */}
                {/* <div className="search-modern relative mb-8 rounded-2xl">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-white placeholder-slate-400 focus:outline-none rounded-2xl"
                  />
                </div> */}

                {/* Mobile Navigation */}
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="nav-item-modern flex items-center space-x-4 p-4 rounded-2xl text-slate-300 hover:text-white bg-slate-800/30 border border-slate-700/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} bg-opacity-20`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth */}
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="glow-button flex items-center justify-center space-x-2 w-full mt-8 py-4 rounded-2xl text-white font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <AtSign className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                </SignedOut>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Mobile Bottom Tabs (App-like) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 mobile-tabs z-[9999]">
        <div className="flex items-center justify-around py-2">
          {mobileTabItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`mobile-tab flex flex-col items-center space-y-1 py-3 px-4 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? `active ${item.color}` 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
      {/* Mobile bottom tabs spacer */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default Navbar;