
"use client"
import { PricingTable } from '@clerk/nextjs'
import React from 'react'
import { 
  CreditCard, 
  Shield, 
  Zap, 
  Crown, 
  Check, 
  Star,
  Users,
  Infinity,
  Sparkles
} from 'lucide-react'

// Floating Orbs Component
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingOrbs />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full mb-6">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-blue-300 font-medium">Pricing Plans</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Learning Journey
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of AI-powered learning with our flexible pricing plans. 
            Start free and upgrade as you grow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center group hover:bg-slate-800/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unlimited Tutors</h3>
            <p className="text-slate-400">Create as many AI tutors as you need for different subjects</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center group hover:bg-slate-800/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Infinity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unlimited Sessions</h3>
            <p className="text-slate-400">Learn without limits with unlimited AI tutoring sessions</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center group hover:bg-slate-800/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Premium Support</h3>
            <p className="text-slate-400">Get priority support and exclusive features</p>
          </div>
        </div>

        {/* Clerk Pricing Table Container */}
        <div className="relative">
          {/* Custom Styling Wrapper */}
          <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
            <div 
              className="clerk-pricing-table-wrapper"
              style={{
                '--clerk-color-primary': '#3b82f6',
                '--clerk-color-primary-hover': '#2563eb',
                '--clerk-color-text': '#ffffff',
                '--clerk-color-text-secondary': '#94a3b8',
                '--clerk-color-background': 'transparent',
                '--clerk-color-background-secondary': 'rgba(51, 65, 85, 0.3)',
                '--clerk-border-radius': '1rem',
                '--clerk-border-color': 'rgba(71, 85, 105, 0.5)',
                '--clerk-font-family': 'inherit'
              } as React.CSSProperties}
            >
              <PricingTable />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40" />
          <div className="absolute top-1/2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-50" />
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-slate-300">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm">
            Join thousands of learners already using our AI tutoring platform
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Can I change plans anytime?</h3>
              <p className="text-slate-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial?</h3>
              <p className="text-slate-400">Yes, we offer a free plan with limited features so you can try our platform risk-free.</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-slate-400">We accept all major credit cards, PayPal, and other secure payment methods.</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">How does billing work?</h3>
              <p className="text-slate-400">Billing is automatic and recurring. You'll be charged monthly or annually based on your chosen plan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Clerk Pricing Table */}
      <style jsx global>{`
        .clerk-pricing-table-wrapper .cl-card {
          background: rgba(51, 65, 85, 0.3) !important;
          border: 1px solid rgba(71, 85, 105, 0.5) !important;
          border-radius: 1rem !important;
          backdrop-filter: blur(12px) !important;
        }
        
        .clerk-pricing-table-wrapper .cl-button {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
          border: none !important;
          border-radius: 0.75rem !important;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
        }
        
        .clerk-pricing-table-wrapper .cl-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3) !important;
        }
        
        .clerk-pricing-table-wrapper .cl-text {
          color: #ffffff !important;
        }
        
        .clerk-pricing-table-wrapper .cl-text-secondary {
          color: #94a3b8 !important;
        }
        
        .clerk-pricing-table-wrapper .cl-price {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          font-weight: 800 !important;
        }
        
        .clerk-pricing-table-wrapper .cl-feature-list {
          border-top: 1px solid rgba(71, 85, 105, 0.3) !important;
          padding-top: 1rem !important;
        }
        
        .clerk-pricing-table-wrapper .cl-feature-item {
          color: #e2e8f0 !important;
          margin-bottom: 0.5rem !important;
        }
        
        .clerk-pricing-table-wrapper .cl-feature-item::before {
          content: "✓" !important;
          color: #10b981 !important;
          font-weight: bold !important;
          margin-right: 0.5rem !important;
        }
        
        .clerk-pricing-table-wrapper .cl-popular-badge {
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%) !important;
          color: white !important;
          border-radius: 9999px !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          padding: 0.25rem 0.75rem !important;
        }
        
        .clerk-pricing-table-wrapper .cl-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
          transition: all 0.3s ease !important;
        }
      `}</style>
    </div>
  )
}

export default page