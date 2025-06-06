
"use client"
import { Play, Rocket } from "lucide-react";
import Link from "next/link";

// --- Call To Action Section ---
const CallToActionSection = () => {
  const handleDemoClick = () => console.log("Watch Demo clicked");
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already learning with our AI tutors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/companions" // Or specific getting started page
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Rocket className="w-6 h-6" />
                Start Learning Now
              </Link>
              <button 
                type="button" 
                onClick={handleDemoClick}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800/70 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-6 h-6" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection