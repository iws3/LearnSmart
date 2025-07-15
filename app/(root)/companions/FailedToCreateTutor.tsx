"use client"
import React from 'react'
import { 
  GraduationCap, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Star,
  Trophy,
  Zap,
  Heart,
  CheckCircle,
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Floating animation component
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
)

const FailedToCreateTutor = () => {
  const router = useRouter()

  const premiumFeatures = [
    { icon: Users, text: "Create unlimited AI tutors", color: "text-blue-400" },
    { icon: Sparkles, text: "Advanced tutor personalities", color: "text-purple-400" },
    { icon: Trophy, text: "Priority support & features", color: "text-yellow-400" },
    { icon: Zap, text: "Faster response times", color: "text-green-400" },
    { icon: Heart, text: "Custom tutor avatars", color: "text-pink-400" },
    { icon: Star, text: "Exclusive subject templates", color: "text-orange-400" }
  ]

  const handleUpgrade = () => {
    // Navigate to billing/subscription page
    router.push('/billing')
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <FloatingOrbs />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Main Card */}
        <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 md:p-12 text-center hover:bg-slate-800/30 transition-all duration-500">
          
          {/* Icon with Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <X className="w-12 h-12 text-red-400" />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-6 h-6 bg-yellow-400/20 rounded-full animate-bounce delay-300" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 font-medium text-sm">Tutor Limit Reached</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">Oops! You've reached your</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Tutor Limit
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            You've used all your free tutor credits. 
            <span className="text-blue-400 font-semibold"> Upgrade to Premium</span> to create unlimited AI tutors and unlock advanced features.
          </p>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:bg-slate-800/40 transition-all duration-300"
              >
                <div className="p-2 bg-slate-700/30 rounded-lg">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <span className="text-slate-300 text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Pricing Highlight */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-bold text-lg">Premium Plan</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              $9.99<span className="text-lg text-slate-400 font-normal">/month</span>
            </div>
            <p className="text-slate-400 text-sm">
              Unlimited tutors • Advanced features • Priority support
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Crown className="w-6 h-6" />
              Upgrade to Premium
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleGoBack}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:bg-slate-800/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
              Go Back
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-slate-700/30">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No hidden fees</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Message */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Join thousands of educators creating amazing AI tutors with Premium
          </p>
        </div>
      </div>

      {/* Additional Styling */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

export default FailedToCreateTutor