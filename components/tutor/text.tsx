'use client'; // Top-level client directive if SearchBar needs to be defined in the same file and work.
              // Better practice: SearchBar in its own file with 'use client'.
              // For this example, if StaffRoomPage itself remains Server Component, SearchBar
              // would need to be imported from a separate 'use client' file.
              // Assuming for this exercise we can make parts client-side within the structure.

import React, { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image'; // Keep if used, but img tags are used in original
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // For client-side navigation/param updates
import { 
  Users, GraduationCap, Clock, Star, MessageCircle, Sparkles, BookOpen, Award,
  Search, Filter, Globe, Mic, Heart, Volume2, Eye, Brain, ChevronRight, Calendar,
  Play, User, TrendingUp, Target, Share2, Bookmark, ArrowRight, Code, Palette,
  Rocket, Trophy, Shield, Lightbulb, ChevronDown, Plus, Activity, BarChart3,
  FileText, Headphones, Zap, Coffee, Moon, Sun, Flame, Wind, Waves, Settings,
  Grid, List, Smile, Frown // Added Smile, Frown for notices
} from 'lucide-react';
import { auth } from '@clerk/nextjs/server'; // This line makes the component a Server Component by default.
                                       // To use client hooks like useState/useRouter at top level,
                                       // this page would need restructuring or SearchBar moved.
                                       // For this solution, I'll assume StaffRoomPage is a Server Component
                                       // and SearchBar is a separate client component.

// Types (assuming these are defined elsewhere or at the top)

interface SearchPageParams { // Renamed to avoid conflict with native SearchParams
  subject?: string;
  topic?: string;
  search?: string;
}

// Random avatar images pool
const avatarImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b2942e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  // ... more images
];

// Subject-specific background images
const subjectBackgrounds: Record<string, string> = {
  'Mathematics': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Maths': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Physics': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
  // ... more subjects
  'default': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
};

// Voice type icons mapping
const voiceIcons: Record<string, { icon: React.ElementType; color: string }> = {
  'Professional Female': { icon: User, color: 'from-pink-500 to-rose-400' },
  'Professional Male': { icon: Mic, color: 'from-blue-500 to-indigo-400' },
  // ... more voice types
};

// Speaking style icons
const speakingStyleIcons: Record<string, { icon: React.ElementType; color: string }> = {
  'Enthusiastic': { icon: Flame, color: 'text-orange-400' },
  'Conversational': { icon: MessageCircle, color: 'text-blue-400' },
  // ... more styles
};

// Utility functions

const getSubjectBackground = (subject: string) => {
  return subjectBackgrounds[subject] || subjectBackgrounds.default;
};

const formatDuration = (chatBlocks: number) => {
  const minutes = chatBlocks * 15; // Assuming chat_duration is in 15-minute blocks
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getTimeSince = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};


// --- Floating Orbs Component --- (As provided)
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

// --- Enhanced Tutor Card Component (Modified for clickable buttons) ---
const EnhancedTutorCard = ({ tutor }: { tutor: AITutor }) => {
  const voiceConfig = voiceIcons[tutor.voice_type] || voiceIcons['Professional Male'] || { icon: Mic, color: 'from-blue-500 to-indigo-400' };
  const speakingConfig = speakingStyleIcons[tutor.speaking_style] || speakingStyleIcons['Conversational'] || { icon: MessageCircle, color: 'text-blue-400' };
  const VoiceIconComponent = voiceConfig.icon;
  const SpeakingIconComponent = speakingConfig.icon;

  const handleHeartClick = () => console.log(`Heart clicked for tutor: ${tutor.name} (ID: ${tutor.id})`);
  const handleBookmarkClick = () => console.log(`Bookmark clicked for tutor: ${tutor.name} (ID: ${tutor.id})`);

  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden hover:bg-slate-800/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className="relative overflow-hidden h-56">
        <img 
          src={getSubjectBackground(tutor.subject)} 
          alt={tutor.subject}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            Available
          </span>
          {tutor.topic && (
            <span className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
              {tutor.topic}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            type="button" 
            onClick={handleHeartClick}
            aria-label="Favorite tutor"
            className="p-2 rounded-full backdrop-blur-sm bg-slate-900/50 text-white hover:bg-slate-800/70 hover:scale-110 transition-all"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            onClick={handleBookmarkClick}
            aria-label="Bookmark tutor"
            className="p-2 rounded-full backdrop-blur-sm bg-slate-900/50 text-white hover:bg-slate-800/70 hover:scale-110 transition-all"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${voiceConfig.color} px-3 py-1 rounded-full text-white text-xs font-medium`}>
            <VoiceIconComponent className="w-3 h-3" />
            {tutor.voice_type}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
            {tutor.subject}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full">
            {tutor.language}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
          {tutor.name}
        </h3>
        {tutor.teaching_content && tutor.teaching_content.toLowerCase() !== 'no' && (
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
            {tutor.teaching_content}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs ${speakingConfig.color}`}>
            <SpeakingIconComponent className="w-3 h-3" />
            {tutor.speaking_style}
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-purple-400">
            <Brain className="w-3 h-3" />
            {tutor.learning_style.split(' ')[0]}
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-green-400">
            <Heart className="w-3 h-3" /> {/* Consider changing icon if Heart is for favorite */}
            {tutor.motivation_level}
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(tutor.chat_duration)} avg</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{getTimeSince(tutor.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">4.{Math.floor(Math.random() * 3) + 7}</span> {/* Random rating, consider making it stable or from data */}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={getRandomImage(tutor.id, avatarImages)} 
              alt={tutor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <p className="text-sm font-medium text-white">{tutor.name}</p>
              <p className="text-xs text-slate-400">AI Tutor</p>
            </div>
          </div>
          <Link 
            href={`/companions/${tutor.id}`}
            className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Session
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Stats Card Component --- (As provided)
const StatsCard = ({ label, value, icon: Icon, change }: { label: string; value: string; icon: any; change: string }) => (
  <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <span className="text-sm font-medium text-green-400">{change}</span>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-slate-400 text-sm">{label}</p>
  </div>
);

// --- Subject Filter Card Component (Modified to be a Link) ---
const SubjectFilterCard = ({ subject, count, currentSearch }: { subject: string; count: number; currentSearch?: string; }) => {
  const queryParams = new URLSearchParams();
  if (currentSearch) queryParams.set('search', currentSearch);
  queryParams.set('subject', subject);

  return (
    <Link 
      href={`/companions?${queryParams.toString()}`} 
      className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
        <img 
          src={getSubjectBackground(subject)} 
          alt={subject}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute top-2 right-2 bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
          {count}
        </div>
      </div>
      <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
        {subject}
      </h3>
      <p className="text-sm text-slate-400">
        {count} tutor{count !== 1 ? 's' : ''} available
      </p>
    </Link>
  );
};

// --- SearchBar (Client Component) ---
// This component should ideally be in its own file: `SearchBar.tsx` with 'use client'
const SearchBar = ({ initialSearch }: { initialSearch?: string }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(currentSearchParams.toString());
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    router.push(`/companions?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:bg-slate-800/70 transition-all duration-300">
      <div className="flex items-center">
        <Search className="w-6 h-6 text-slate-400 ml-4" />
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tutors, subjects, or topics..."
          className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-4 focus:outline-none text-lg"
        />
        <button 
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Brain className="w-5 h-5" />
          Find Tutor
        </button>
      </div>
    </form>
  );
};

// --- Popular Subjects Links ---
const PopularSubjectsLinks = ({ subjects, currentSearch }: { subjects: string[]; currentSearch?: string; }) => (
  <div className="flex flex-wrap justify-center gap-2 mt-4">
    {subjects.slice(0, 5).map((subject) => {
      const queryParams = new URLSearchParams();
      if (currentSearch) queryParams.set('search', currentSearch);
      queryParams.set('subject', subject);
      return (
        <Link
          key={subject}
          href={`/companions?${queryParams.toString()}`}
          className="px-4 py-2 bg-slate-800/30 border border-slate-700/50 text-slate-300 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 text-sm"
        >
          {subject}
        </Link>
      );
    })}
  </div>
);



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

// --- No User Tutors Message ---
const NoUserTutorsMessage = () => (
  <section className="relative py-24">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
        <Smile className="w-20 h-20 text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          It seems you have no AI Tutors yet!
        </h2>
        <p className="text-lg text-slate-300 mb-8">
          Don't worry, creating your first AI Tutor is quick and easy. Get started on your personalized learning journey now!
        </p>
        <Link 
          href="/companions/new"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
          Create Your First AI Tutor
        </Link>
        <p className="text-sm text-slate-400 mt-8">
          Once you create tutors, they will appear here in your Staff Room.
        </p>
      </div>
    </div>
  </section>
);

// --- Browse By Subject Grid ---
const SubjectFilterGrid = ({ uniqueSubjects, subjectCounts, tutors, currentSearch }: { uniqueSubjects: string[]; subjectCounts: Record<string, number>; tutors: AITutor[]; currentSearch?: string; }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
      <BookOpen className="w-8 h-8 text-blue-400" />
      Browse by Subject
    </h2>
    {uniqueSubjects.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueSubjects.map((subject) => (
          <SubjectFilterCard 
            key={subject}
            subject={subject}
            count={subjectCounts[subject]}
            currentSearch={currentSearch}
            // tutors prop was there but not used in card, removed for clarity. If needed, can be re-added.
          />
        ))}
      </div>
    ) : (
      <p className="text-slate-400">No subjects found based on your current tutors or filters.</p>
    )}
  </div>
);

// --- Tutors List Header ---
const TutorsListHeader = ({ tutorsCount }: { tutorsCount: number }) => {
  const handleFilterClick = () => console.log("Filter button clicked");
  const handleGridViewClick = () => console.log("Grid view button clicked");
  // Add List view button if needed

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Your AI Teaching Staff
        </h2>
        <p className="text-slate-400">
          {tutorsCount > 0 ? `${tutorsCount} expert tutor${tutorsCount !== 1 ? 's' : ''} ready to help you learn` : "No tutors match your current view."}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-1 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-white">Highly Rated</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={handleFilterClick}
            aria-label="Filter tutors"
            className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button 
            type="button" 
            onClick={handleGridViewClick}
            aria-label="Grid view"
            className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            <Grid className="w-5 h-5" />
          </button>
          {/* Add List view button if needed
          <button type="button" onClick={() => console.log("List view")} className="p-3 ..."><List className="w-5 h-5" /></button>
          */}
        </div>
      </div>
    </div>
  );
};

// --- No Filtered Tutors Message ---
const NoFilteredTutorsMessage = () => (
  <div className="text-center py-20">
    <div className="w-24 h-24 bg-slate-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
      <Frown className="w-12 h-12 text-slate-400" /> {/* Changed icon */}
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No tutors found</h3>
    <p className="text-slate-400 mb-6">Try adjusting your search criteria or filters, or explore all your tutors.</p>
    <Link 
      href="/staff-room" // Clears filters by going to base page
      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 hover:shadow-lg transition-all duration-300"
    >
      <Users className="w-5 h-5" />
      View All Your Tutors
    </Link>
  </div>
);

// --- User Tutors Section (combines browse, header, list/no-list messages) ---
const UserTutorsSection = ({ 
  allUserTutors, // The complete list of tutors for the user
  filteredTutors, // Tutors after search/subject filters
  subjectCounts, 
  uniqueSubjects,
  currentSearchQuery
}: { 
  allUserTutors: AITutor[];
  filteredTutors: AITutor[];
  subjectCounts: Record<string, number>; 
  uniqueSubjects: string[];
  currentSearchQuery?: string;
}) => {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {uniqueSubjects.length > 0 && ( // Show browse by subject only if there are subjects from user's tutors
            <SubjectFilterGrid 
                uniqueSubjects={uniqueSubjects} 
                subjectCounts={subjectCounts} 
                tutors={allUserTutors} // Pass all tutors for context if SubjectFilterCard needs it
                currentSearch={currentSearchQuery}
            />
        )}
        
        <TutorsListHeader tutorsCount={filteredTutors.length} />

        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTutors.map((tutor: AITutor) => (
              <EnhancedTutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <NoFilteredTutorsMessage />
        )}
      </div>
    </section>
  );
};

// --- Feature Card for WhyChooseUsSection ---
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}
const FeatureCard = ({ icon: Icon, title, description, color }: Feature) => (
  <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-full h-full text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

// --- Why Choose Us Section ---
const pageFeatures: Feature[] = [
    { icon: Brain, title: 'Adaptive Teaching', description: 'Each tutor adapts their teaching style to match your learning preferences', color: 'from-purple-500 to-pink-500' },
    { icon: Clock, title: '24/7 Availability', description: 'Our AI tutors are available whenever you need them, day or night', color: 'from-blue-500 to-cyan-500' },
    { icon: Target, title: 'Personalized Learning', description: 'Customized curriculum and pace tailored to your individual needs', color: 'from-green-500 to-emerald-500' },
    { icon: Globe, title: 'Multi-Language Support', description: 'Learn in your preferred language with native-speaking AI tutors', color: 'from-orange-500 to-red-500' },
    { icon: Shield, title: 'Safe Environment', description: 'Judgment-free learning space where you can make mistakes and grow', color: 'from-indigo-500 to-purple-500' },
    { icon: Lightbulb, title: 'Interactive Sessions', description:  'Engaging conversations with real-time feedback and explanations', color: 'from-yellow-500 to-orange-500' }
];

const WhyChooseUsSection = () => (
  <section className="relative py-24 bg-slate-800/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Tutors</span>?
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Experience personalized learning with our world-class AI teaching staff.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pageFeatures.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

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

// --- Footer Section ---
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


// --- Main Page Component ---
// This needs to be an async Server Component if `auth` and `getUserCompanions` are used directly.
// To use client hooks like `useSearchParams` directly inside, it would need `'use client'`.
// The solution assumes StaffRoomPage is a Server Component that prepares data for client sub-components or uses form submissions/Link navigations.
// For the SearchBar to update URL and cause re-render, StaffRoomPage itself can remain a Server Component.

// Dummy action functions (replace with actual imports)
const getUserCompanions = async (userId: string): Promise<AITutor[]> => {
  console.log("Fetching companions for user:", userId);
  // Dummy data for demonstration
  if (userId === "user_with_tutors") {
    return [
      { id: '1', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), name: 'Einstein AI', subject: 'Physics', topic: 'Relativity', voice_type: 'Professional Male', chat_duration: 4, author: 'user1', teaching_content: 'Explains complex physics theories.', language: 'English', speaking_style: 'Formal Academic', learning_style: 'Visual', motivation_level: 'High' },
      { id: '2', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), name: 'Shakespeare Bot', subject: 'English', topic: 'Sonnets', voice_type: 'Calm Male', chat_duration: 2, author: 'user1', teaching_content: 'Delves into literary analysis.', language: 'English', speaking_style: 'Storytelling', learning_style: 'Auditory', motivation_level: 'Medium' },
      { id: '3', created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), name: 'Math Whiz', subject: 'Mathematics', topic: 'Algebra', voice_type: 'Energetic Male', chat_duration: 6, author: 'user1', teaching_content: 'Makes math fun and engaging.', language: 'English', speaking_style: 'Enthusiastic', learning_style: 'Kinesthetic', motivation_level: 'Very High' },
    ];
  }
  if (userId === "user_for_search_test") {
    return [
      { id: 'search-1', created_at: new Date().toISOString(), name: 'Alpha Tutor', subject: 'Science', topic: 'General', voice_type: 'Friendly Female', chat_duration: 3, author: 'user_for_search_test', teaching_content: 'General science topics for beginners.', language: 'English', speaking_style: 'Conversational', learning_style: 'Visual', motivation_level: 'Medium' },
      { id: 'search-2', created_at: new Date().toISOString(), name: 'Beta Coder', subject: 'Computer Science', topic: 'Python', voice_type: 'Professional Male', chat_duration: 5, author: 'user_for_search_test', teaching_content: 'Teaches Python programming.', language: 'English', speaking_style: 'Interactive', learning_style: 'Logical', motivation_level: 'High' },
    ]
  }
  return []; // Default: no tutors for other users
};


// The main page component. This is a Server Component.
// searchParams prop is automatically passed by Next.js for pages in app router.
const StaffRoomPage = async ({ searchParams }: { searchParams: SearchPageParams }) => {
  // Simulate auth() - in a real app, this comes from Clerk
  const { userId } = { userId: "user_with_tutors" }; // Replace with actual auth() or test different users like "user_without_tutors", "user_for_search_test"
  // const { userId } = await auth(); // Uncomment for actual Clerk auth

  if (!userId) {
    // Handle unauthenticated user, e.g., redirect to login
    // For now, let's assume they might see a generic version or get an error.
    // Or, redirect them using Next.js redirect function.
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white text-2xl">
        Please log in to access your Staff Room.
      </div>
    );
  }

  const allUserTutors = await getUserCompanions(userId as string);

  const currentSearchQuery = searchParams?.search || "";
  const currentSubjectFilter = searchParams?.subject || "";
  // Add topic filter if needed: const currentTopicFilter = searchParams?.topic || "";

  const filteredTutors = allUserTutors.filter((tutor: AITutor) => {
    const searchMatch = currentSearchQuery ? (
      tutor.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      (tutor.topic && tutor.topic.toLowerCase().includes(currentSearchQuery.toLowerCase())) ||
      tutor.teaching_content.toLowerCase().includes(currentSearchQuery.toLowerCase())
    ) : true;

    const subjectMatch = currentSubjectFilter ? 
      tutor.subject.toLowerCase() === currentSubjectFilter.toLowerCase() 
      : true;
    
    // const topicMatch = currentTopicFilter ? (tutor.topic && tutor.topic.toLowerCase() === currentTopicFilter.toLowerCase()) : true;

    return searchMatch && subjectMatch; // && topicMatch;
  });

  const subjectCounts = allUserTutors.reduce((acc, tutor) => { // Counts based on all user tutors, not filtered ones
    acc[tutor.subject] = (acc[tutor.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const uniqueSubjects = Object.keys(subjectCounts);

  // Stats for the Hero section (can be dynamic based on allUserTutors or filteredTutors)
  const totalUserTutors = allUserTutors.length;
  const averageRating = totalUserTutors > 0 ? 4.8 : 0; // Example static rating
  const totalSessions = allUserTutors.reduce((acc, tutor) => acc + tutor.chat_duration, 0) * 15 / 60; // in hours

  const heroStats: StatItem[] = [
    { label: 'Your Tutors', value: totalUserTutors.toString(), icon: Users, change: `+${Math.floor(Math.random()*5)}` }, // Example dynamic change
    { label: 'Subject Areas', value: uniqueSubjects.length.toString(), icon: BookOpen, change: `+${Math.floor(Math.random()*2)}` },
    { label: 'Avg. Rating', value: averageRating.toFixed(1), icon: Star, change: '+0.1' },
    { label: 'Total Hours', value: `${totalSessions.toFixed(0)}h`, icon: Activity, change: `+${Math.floor(Math.random()*10)}h` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <FloatingOrbs />
      
      <StaffRoomHero 
        uniqueSubjects={uniqueSubjects} 
        stats={heroStats}
        currentSearchQuery={currentSearchQuery}
      />

      {allUserTutors.length === 0 ? (
        <NoUserTutorsMessage />
      ) : (
        <UserTutorsSection
          allUserTutors={allUserTutors}
          filteredTutors={filteredTutors}
          subjectCounts={subjectCounts}
          uniqueSubjects={uniqueSubjects}
          currentSearchQuery={currentSearchQuery}
        />
      )}
      
      <WhyChooseUsSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default StaffRoomPage;