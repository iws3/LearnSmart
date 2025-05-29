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
  FlaskConical
} from 'lucide-react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-pink-200/30 rounded-full blur-xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          {/* Logo & Title */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl mb-6">
              <Brain className="w-6 h-6" />
              <span className="font-bold text-lg">LearnSmart</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome to the Future of
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of learners mastering new skills with personalized AI tutors and interactive lessons.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Theory Lessons</h3>
              <p className="text-sm text-gray-600">Comprehensive theoretical knowledge with AI tutors</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Practical Labs</h3>
              <p className="text-sm text-gray-600">Hands-on projects and real-world applications</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Companions</h3>
              <p className="text-sm text-gray-600">Personalized learning companions for every subject</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Certificates</h3>
              <p className="text-sm text-gray-600">Earn recognized certificates for your achievements</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">AI Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl mb-4">
                <Brain className="w-6 h-6" />
                <span className="font-bold text-lg">EduAI Platform</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your learning journey</p>
            </div>

            {/* Sign In Container */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"></div>
              
              {/* Main Container */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header for Desktop */}
                  <div className="hidden lg:block text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign In</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600">Continue your learning adventure</p>
                  </div>

                  {/* Clerk Sign In Component with Custom Styling */}
                  <div className="clerk-signin-wrapper">
                    <SignIn 
                      appearance={{
                        elements: {
                          rootBox: "mx-auto",
                          card: "bg-transparent shadow-none border-0",
                          headerTitle: "text-gray-900 font-bold",
                          headerSubtitle: "text-gray-600",
                          socialButtonsBlockButton: "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl",
                          socialButtonsBlockButtonText: "text-gray-700 font-medium",
                          dividerLine: "bg-gray-200",
                          dividerText: "text-gray-500 font-medium",
                          formFieldInput: "border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-blue-50/50 transition-all duration-300",
                          formFieldLabel: "text-gray-700 font-semibold",
                          formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl",
                          footerActionLink: "text-blue-600 hover:text-purple-600 transition-colors duration-300 font-medium",
                          identityPreviewText: "text-gray-700",
                          formResendCodeLink: "text-blue-600 hover:text-purple-600 transition-colors duration-300",
                          otpCodeFieldInput: "border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300"
                        },
                        layout: {
                          socialButtonsPlacement: "top"
                        }
                      }}
                    />
                  </div>

                  {/* Additional Features */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Secure Login</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>24/7 Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>AI Powered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                New to LearnSmart? 
                <a href="/sign-up" className="text-blue-600 hover:text-purple-600 font-semibold ml-1 transition-colors duration-300">
                  Create your account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 animate-bounce delay-1000">
        <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-3/4 right-1/4 animate-bounce delay-500">
        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/2 left-1/6 animate-bounce delay-700">
        <div className="w-4 h-4 bg-pink-400 rounded-full opacity-40"></div>
      </div>

      {/* Custom Styles for Clerk */}
      <style jsx global>{`
        .clerk-signin-wrapper .cl-socialButtonsBlockButton:hover {
          transform: translateY(-1px);
        }
        
        .clerk-signin-wrapper .cl-formButtonPrimary:hover {
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        
        .clerk-signin-wrapper .cl-card {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }
        
        .clerk-signin-wrapper .cl-internal-b3fm6y {
          background: transparent !important;
        }
      `}</style>
    </div>
  )
}

export default page