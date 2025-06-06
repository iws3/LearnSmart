import { Globe, GraduationCap, MessageCircle, Share2, Users } from "lucide-react";
import Link from "next/link";

const FooterSection = () => (
  <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI Tutors</span>
          </Link>
          <p className="text-slate-400">
            Revolutionizing education with AI-powered personalized learning experiences.
          </p>
          <div className="flex gap-4">
            {[Share2, Globe, MessageCircle].map((Icon, idx) => (
              <a key={idx} href="#" aria-label={`Social link ${idx+1}`} className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Quick Links', links: ['Find Tutors', 'Browse Subjects', 'How It Works', 'Pricing', 'Student Portal'] },
          { title: 'Popular Subjects', links: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English Literature'] }
        ].map(col => (
          <div key={col.title}>
            <h3 className="text-lg font-semibold text-white mb-4">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <div className="space-y-3">
            {[
              { icon: MessageCircle, text: '24/7 Chat Support' },
              { icon: Globe, text: 'help@aitutors.com' },
              { icon: Users, text: 'Join Community' }
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-slate-400">
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-slate-400 text-sm">
          © {new Date().getFullYear()} AI Tutors. All rights reserved.
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
            <Link key={link} href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection