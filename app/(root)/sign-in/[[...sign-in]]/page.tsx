"use client"
import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  Zap,
  Target,
  Star,
  FlaskConical,
  Shield,
  Clock,
  Rocket,
  Heart,
  Globe,
  Code,
  Trophy,
  ChevronRight
} from 'lucide-react'

const page = () => {
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

        .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #fb7185);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.2), transparent);
          animation: float 6s ease-in-out infinite;
          filter: blur(1px);
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.6;
          }
          33% { 
            transform: translateY(-20px) rotate(120deg) scale(1.1);
            opacity: 0.8;
          }
          66% { 
            transform: translateY(10px) rotate(240deg) scale(0.9);
            opacity: 0.7;
          }
        }
        
        .feature-card {
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1), 
            rgba(139, 92, 246, 0.08),
            rgba(59, 130, 246, 0.1));
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
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
        
        .feature-card:hover::before {
          left: 100%;
        }
        
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(99, 102, 241, 0.25),
                      0 0 0 1px rgba(99, 102, 241, 0.3);
          border-color: rgba(99, 102, 241, 0.4);
        }
        
        .logo-container {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
          border-radius: 20px;
          padding: 12px;
          position: relative;
          animation: logoGlow 4s ease-in-out infinite alternate;
        }
        
        @keyframes logoGlow {
          0% { 
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.4),
                        0 0 60px rgba(99, 102, 241, 0.2);
            filter: hue-rotate(0deg);
          }
          100% { 
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6),
                        0 0 80px rgba(139, 92, 246, 0.3);
            filter: hue-rotate(30deg);
          }
        }
        
        .stats-item {
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.15), 
            rgba(139, 92, 246, 0.15));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          transition: all 0.3s ease;
        }
        
        .stats-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.2);
        }
        
        .signin-container {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.9) 0%, 
            rgba(30, 27, 75, 0.95) 50%, 
            rgba(15, 23, 42, 0.9) 100%);
          backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(99, 102, 241, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }
        
        .signin-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, 
            rgba(99, 102, 241, 0.1) 0%, 
            transparent 50%);
          animation: rotateGradient 20s linear infinite;
        }
        
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .feature-icon {
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.2), 
            rgba(139, 92, 246, 0.2));
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .feature-icon:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }
        
        .notification-dot {
          background: linear-gradient(135deg, #ef4444, #f97316);
          animation: notificationPulse 2s infinite;
        }
        
        @keyframes notificationPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% { 
            transform: scale(1.2);
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
          }
        }
        
        .mobile-optimized {
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile */
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        @media (max-width: 768px) {
          .mobile-centered {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            min-height: 100dvh;
            padding: 1rem;
          }
          
          .mobile-signin-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
        }
          
      `}</style>

      <div className="mobile-optimized bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Enhanced Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb absolute top-10 left-10 w-32 h-32"></div>
          <div className="floating-orb absolute top-1/4 right-20 w-48 h-48" style={{animationDelay: '2s'}}></div>
          <div className="floating-orb absolute bottom-20 left-1/4 w-40 h-40" style={{animationDelay: '4s'}}></div>
          <div className="floating-orb absolute bottom-1/3 right-10 w-24 h-24" style={{animationDelay: '1s'}}></div>
          <div className="floating-orb absolute top-1/2 left-1/6 w-20 h-20" style={{animationDelay: '3s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Ambient Light */}
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side - Enhanced Branding & Features */}
          <div className="hidden lg:block space-y-10">
            
            {/* Enhanced Logo & Title */}
            <div className="text-left space-y-6">
              {/* <div className="logo-container inline-flex items-center gap-4 mb-8">
                <Brain className="w-10 h-10 text-white" />
                <div>
                  <h1 className="text-3xl font-bold gradient-text">LearnSmart</h1>
                  <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                    <Zap className="w-4 h-4" />
                    AI Learning Platform
                  </p>
                </div>
                <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse ml-2" />
              </div>
               */}
              <div className="space-y-4">
                <h2 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                  Welcome to 
                  <span className="block gradient-text mt-2">
                  {"{LearnSmart}"}
                  </span>
                    Future of Learning
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Join thousands of learners mastering new skills with personalized AI tutors, 
                  interactive lessons, and cutting-edge technology.
                </p>
                
                {/* Key Benefits */}
                <div className="flex items-center gap-6 mt-8">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">24/7 Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Rocket className="w-5 h-5" />
                    <span className="font-medium">AI Powered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Feature Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="feature-card rounded-3xl p-8 group">
                <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-bold text-white mb-3 text-lg">Theory Lessons</h3>
                <p className="text-slate-400 leading-relaxed">Comprehensive theoretical knowledge with AI tutors and interactive content</p>
                <div className="flex items-center gap-2 mt-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Explore</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="feature-card rounded-3xl p-8 group">
                <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-white mb-3 text-lg">Practical Labs</h3>
                <p className="text-slate-400 leading-relaxed">Hands-on projects and real-world applications with guided practice</p>
                <div className="flex items-center gap-2 mt-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Start Lab</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="feature-card rounded-3xl p-8 group">
                <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white mb-3 text-lg">AI Companions</h3>
                <p className="text-slate-400 leading-relaxed">Personalized learning companions for every subject and skill level</p>
                <div className="flex items-center gap-2 mt-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Meet AI</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="feature-card rounded-3xl p-8 group">
                <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="font-bold text-white mb-3 text-lg">Certificates</h3>
                <p className="text-slate-400 leading-relaxed">Earn recognized certificates and showcase your achievements</p>
                <div className="flex items-center gap-2 mt-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">View Certs</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex items-center justify-start gap-8 mt-12">
              <div className="stats-item text-center p-6 rounded-2xl">
                <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  50K+
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 font-medium">Active Learners</div>
              </div>
              <div className="stats-item text-center p-6 rounded-2xl">
                <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  1000+
                  <Code className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-sm text-slate-400 font-medium">AI Lessons</div>
              </div>
              <div className="stats-item text-center p-6 rounded-2xl">
                <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  95%
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-sm text-slate-400 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Sign In Form */}
          <div className="mobile-centered">
            <div className="mobile-signin-container">
              
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
              <span className="block gradient-text mt-2 md:text-2xl text-4xl font-bold mb-4">
                  {"{LearnSmart}"}
                  </span>
                <h2 className="text-3xl font-bold text-white mb-3">Welcome Back!</h2>
                <p className="text-slate-300 text-lg">Sign in to continue your learning journey</p>
              </div>

              {/* Enhanced Sign In Container */}
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 blur-sm"></div>
                <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-sm"></div>
                
                {/* Main Container */}
                <div className="signin-container rounded-4xl p-8 lg:p-10 relative">
                  {/* Content */}
                  <div className="relative z-20">
                    
                    {/* Header for Desktop */}
                    <div className="hidden lg:block text-center mb-10">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl mb-6">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-medium">Sign In</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-3">Welcome Back!</h2>
                      <p className="text-slate-300 text-lg">Continue your learning adventure</p>
                    </div>

                    {/* Enhanced Clerk Sign In Component */}
                    <div className="clerk-signin-wrapper">
                      <SignIn 
                        appearance={{
                          elements: {
                            rootBox: "mx-auto w-full",
                            card: "bg-transparent shadow-none border-0 w-full",
                            headerTitle: "text-white font-bold text-xl",
                            headerSubtitle: "text-slate-300",
                            socialButtonsBlockButton: `
                              bg-slate-800/50 
                              border-2 border-slate-700/50 
                              hover:border-blue-400/50 
                              hover:bg-slate-700/50 
                              transition-all duration-300 
                              rounded-2xl 
                              backdrop-blur-sm
                              text-white
                              font-medium
                            `,
                            socialButtonsBlockButtonText: "text-white font-medium",
                            dividerLine: "bg-slate-600/50",
                            dividerText: "text-slate-400 font-medium",
                            formFieldInput: `
                              border-2 border-slate-600/50 
                              bg-slate-800/30 
                              rounded-2xl 
                              focus:border-blue-400 
                              focus:bg-slate-700/30 
                              transition-all duration-300
                              text-white
                              placeholder:text-slate-400
                              backdrop-blur-sm
                            `,
                            formFieldLabel: "text-slate-300 font-semibold",
                            formButtonPrimary: `
                              bg-gradient-to-r from-blue-600 to-purple-600 
                              hover:from-blue-500 hover:to-purple-500
                              hover:shadow-lg hover:shadow-blue-500/25
                              transform hover:scale-105 
                              transition-all duration-300 
                              rounded-2xl
                              font-semibold
                              text-white
                            `,
                            footerActionLink: "text-blue-400 hover:text-purple-400 transition-colors duration-300 font-medium",
                            identityPreviewText: "text-slate-300",
                            formResendCodeLink: "text-blue-400 hover:text-purple-400 transition-colors duration-300",
                            otpCodeFieldInput: `
                              border-2 border-slate-600/50 
                              bg-slate-800/30 
                              rounded-2xl 
                              focus:border-blue-400 
                              transition-all duration-300
                              text-white
                              backdrop-blur-sm
                            `,
                            formFieldInputShowPasswordButton: "text-slate-400 hover:text-white",
                            formFieldAction: "text-blue-400 hover:text-purple-400",
                            footer: "text-slate-400",
                            footerAction: "text-blue-400 hover:text-purple-400"
                          },
                          layout: {
                            socialButtonsPlacement: "top"
                          }
                        }}
                      />
                    </div>

                    {/* Enhanced Additional Features */}
                    <div className="mt-10 pt-8 border-t border-slate-700/50">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
                          <div className="notification-dot w-3 h-3 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-300">Secure Login</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-300">24/7 Support</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-300">AI Powered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Bottom CTA */}
              <div className="text-center mt-8">
                <p className="text-slate-400">
                  New to LearnSmart? 
                  <a href="/sign-up" className="text-blue-400 hover:text-purple-400 font-semibold ml-2 transition-colors duration-300 inline-flex items-center gap-1">
                    Create your account
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-1000">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-70 blur-sm"></div>
        </div>
        <div className="absolute top-3/4 right-1/4 animate-bounce delay-500">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70 blur-sm"></div>
        </div>
        <div className="absolute top-1/2 left-1/6 animate-bounce delay-700">
          <div className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60 blur-sm"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/6 animate-bounce delay-300">
          <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 blur-sm"></div>
        </div>

        {/* Custom Styles for Enhanced Clerk */}
        
      </div>
    </>
  )
}

export default page