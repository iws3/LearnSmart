"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignOutButton, SignedIn,SignedOut, UserButton } from '@clerk/nextjs';
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
  AtSignIcon
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Learning Friends', icon: Users, href: '/friends' },
    { name: 'My Journey', icon: Map, href: '/journey' },
  ];

  return (
    <>
      {/* Global CSS Styles */}
      <style jsx global>{`
        .navbar-glass {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(147, 197, 253, 0.2);
        }
        
        .navbar-shadow {
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1);
        }
        
        .nav-item-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-item-hover:hover {
          background: linear-gradient(135deg, rgba(147, 197, 253, 0.1), rgba(191, 219, 254, 0.15));
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
        }
        
        .logo-glow {
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
        }
        
        .mobile-menu-slide {
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .mobile-menu-slide.open {
          transform: translateX(0);
        }
        
        .notification-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .profile-ring {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          padding: 2px;
          border-radius: 50%;
        }
        
        .search-glow:focus-within {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        @media (max-width: 768px) {
          .mobile-app-feel {
            border-radius: 0 0 24px 24px;
            padding: 12px 16px;
          }
        }
      `}</style>

      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 mobile-app-feel ${
        isScrolled ? 'navbar-glass navbar-shadow' : 'bg-white/90'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                {/* Logo Image Placeholder - Replace src with your actual logo */}
                <div className="logo-glow">
                  <Image
                    src="/logo.png" // Replace with your actual logo path
                    alt="LearnSmart Logo"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                    priority
                  />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-300 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  LearnSmart
                </h1>
                <p className="text-xs text-blue-400 -mt-1">AI Teaching Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Search Bar */}
              <div className="search-glow relative mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  className="w-64 pl-10 pr-4 py-2 rounded-full border-0 bg-blue-50/50 text-sm focus:outline-none focus:ring-0 placeholder-blue-400"
                />
              </div>

              {/* Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-item-hover flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 font-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            <SignedOut>

               <Link
                  
                  href="/sign-in"
                  className="nav-item-hover flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 font-medium"
                >
                  <AtSignIcon className="w-5 h-5" />
                  <span className="text-sm">SignIn</span>
                </Link>
                </SignedOut>

              {/* Notifications */}
              <button className="nav-item-hover relative p-3 rounded-xl text-gray-700 hover:text-blue-600">
                <Bell className="w-5 h-5" />
                <span className="notification-pulse absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center space-x-3 ml-4">
                <div className="profile-ring">
                 <UserButton/>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-gray-800">John Doe</p>
                  <p className="text-xs text-blue-500"> Student</p>
                </div>
                <SignedIn>
                    <Link
                  
                  href="/sign-in"
                  className="nav-item-hover flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 font-medium"
                >
                <button className="nav-item-hover p-2 rounded-lg text-gray-700 hover:text-red-500">
                  <LogOut className="w-4 h-4" />
                </button>
                </Link>
                </SignedIn>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden nav-item-hover p-2 rounded-xl text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" 
               onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-sm navbar-glass z-[9999] mobile-menu-slide ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="p-6">
            {/* Mobile Profile Header */}
            <div className="flex items-center space-x-4 mb-8 pt-8">
              <div className="profile-ring">
                <Image
                  src=""
                  alt="Profile"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-blue-500">Premium Student</p>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="search-glow relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-blue-50/50 text-sm focus:outline-none focus:ring-0 placeholder-blue-400"
              />
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-item-hover flex items-center space-x-4 p-4 rounded-xl text-gray-700 hover:text-blue-600 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              {/* Mobile Notifications */}
              <button className="nav-item-hover flex items-center space-x-4 p-4 rounded-xl text-gray-700 hover:text-blue-600 w-full">
                <div className="relative">
                  <Bell className="w-6 h-6" />
                  <span className="notification-pulse absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
                </div>
                <span className="font-medium">Notifications</span>
              </button>

              {/* Mobile Logout */}
              <button className="nav-item-hover flex items-center space-x-4 p-4 rounded-xl text-gray-700 hover:text-red-500 w-full mt-8 border-t pt-6">
                <LogOut className="w-6 h-6" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>

      {/* Demo Content */}
     
    </>
  );
};

export default Navbar;