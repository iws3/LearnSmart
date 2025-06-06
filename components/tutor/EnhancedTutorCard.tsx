"use client"
import { Bookmark, Brain, Calendar, ChevronRight, Clock, Flame, Heart, MessageCircle, Mic, Play, Star, User } from "lucide-react";
import Link from "next/link";
interface AITutor {
  id: string;
  created_at: string;
  name: string;
  subject: string;
  topic: string | null;
  voice_type: string;
  chat_duration: number; // Assuming this is number of 15-min blocks
  author: string;
  teaching_content: string;
  language: string;
  speaking_style: string;
  learning_style: string;
  motivation_level: string;
}


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

const getRandomImage = (id: string, imagePool: string[]) => {
  if (!id || imagePool.length === 0) return imagePool[0] || '';
  const hash = id.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  return imagePool[Math.abs(hash) % imagePool.length];
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


const getSubjectBackground = (subject: string) => {
  return subjectBackgrounds[subject] || subjectBackgrounds.default;
};

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

export default EnhancedTutorCard
