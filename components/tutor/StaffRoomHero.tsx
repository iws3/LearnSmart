import { Sparkles, Users } from "lucide-react";
import PopularSubjectsLinks from "./PopularSubjectsLinks";
import SearchBar from "./SearchBar";
import HeroStatsDisplay from "./HeroStatsDisplay";

type StatItem = { label: string; value: string; icon: React.ElementType; change: string };


// --- Hero Section ---
const StaffRoomHero = ({ uniqueSubjects, stats, currentSearchQuery }: { uniqueSubjects: string[]; stats: StatItem[]; currentSearchQuery?: string; }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 mb-8">
        <Users className="w-5 h-5 text-blue-300" />
        <span className="text-slate-300 font-medium">Meet Your AI Teaching Staff</span>
        <Sparkles className="w-4 h-4 text-yellow-400" />
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
        <span className="text-white">The</span><br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          Staff Room
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 px-5 leading-relaxed">
        Connect with our world-class AI tutors, each specialized in their field and ready to 
        <span className="text-blue-400"> guide your learning journey</span>.
      </p>
      <div className="max-w-2xl mx-auto relative mb-16">
        <SearchBar initialSearch={currentSearchQuery} />
        {uniqueSubjects.length > 0 && <PopularSubjectsLinks subjects={uniqueSubjects} currentSearch={currentSearchQuery} />}
      </div>
      <HeroStatsDisplay stats={stats} />
    </div>
  </section>
);

export default StaffRoomHero