import { getAllCompanions } from '@/lib/actions/aiCompanion.action';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  GraduationCap, 
  Clock, 
  Star, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  Award,
  Search,
  Filter,
  Globe,
  Mic,
  Heart,
  Volume2,
  Eye,
  Brain,
  ChevronRight,
  Calendar,
  Play,
  User,
  TrendingUp,
  Target,
  Share2,
  Bookmark,
  ArrowRight,
  Code,
  Palette,
  Rocket,
  Trophy,
  Shield,
  Lightbulb,
  ChevronDown,
  Plus,
  Activity,
  BarChart3,
  FileText,
  Headphones,
  Zap,
  Coffee,
  Moon,
  Sun,
  Flame,
  Wind,
  Waves,
  Settings,
  Grid,
  List
} from 'lucide-react';

// Types
interface SearchParams {
  searchParams: {
    subject?: string;
    topic?: string;
    search?: string;
  };
}

interface AITutor {
  id: string;
  created_at: string;
  name: string;
  subject: string;
  topic: string | null;
  voice_type: string;
  chat_duration: number;
  author: string;
  teaching_content: string;
  language: string;
  speaking_style: string;
  learning_style: string;
  motivation_level: string;
}

// Random avatar images pool
const avatarImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b2942e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face',
];

// Subject-specific background images
const subjectBackgrounds = {
  'Mathematics': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Maths': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Physics': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
  'Chemistry': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
  'Biology': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
  'Computer Science': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
  'English': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  'History': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&h=400&fit=crop',
  'Geography': 'https://images.unsplash.com/photo-1446776756104-7e081298375a?w=600&h=400&fit=crop',
  'Football - soccer': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
};

// Voice type icons mapping
const voiceIcons = {
  'Professional Female': { icon: User, color: 'from-pink-500 to-rose-400' },
  'Professional Male': { icon: Mic, color: 'from-blue-500 to-indigo-400' },
  'Calm Male': { icon: Coffee, color: 'from-green-500 to-emerald-400' },
  'Friendly Female': { icon: Heart, color: 'from-purple-500 to-pink-400' },
  'Energetic Male': { icon: Zap, color: 'from-orange-500 to-red-400' }
};

// Speaking style icons
const speakingStyleIcons = {
  'Enthusiastic': { icon: Flame, color: 'text-orange-400' },
  'Conversational': { icon: MessageCircle, color: 'text-blue-400' },
  'Formal Academic': { icon: BookOpen, color: 'text-purple-400' },
  'Storytelling': { icon: FileText, color: 'text-green-400' },
  'Interactive': { icon: Users, color: 'text-cyan-400' }
};

// Utility function to get consistent random image based on ID
const getRandomImage = (id: string, imagePool: string[]) => {
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return imagePool[Math.abs(hash) % imagePool.length];
};

const getSubjectBackground = (subject: string) => {
  // @ts-ignore
  return subjectBackgrounds[subject] || subjectBackgrounds.default;
};

const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getTimeSince = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  // @ts-ignore
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

// Floating Orbs Component
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

// Enhanced Tutor Card Component
const EnhancedTutorCard = ({ tutor }: { tutor: AITutor }) => {
  // @ts-ignore
  const voiceConfig = voiceIcons[tutor.voice_type] || voiceIcons['Professional Male'];
  // @ts-ignore

  const speakingConfig = speakingStyleIcons[tutor.speaking_style] || speakingStyleIcons['Conversational'];
  const VoiceIcon = voiceConfig.icon;
  const SpeakingIcon = speakingConfig.icon;

  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden hover:bg-slate-800/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={getSubjectBackground(tutor.subject)} 
          alt={tutor.subject}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        
        {/* Status Badge */}
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

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 rounded-full backdrop-blur-sm bg-slate-900/50 text-white hover:bg-slate-800/70 hover:scale-110 transition-all">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full backdrop-blur-sm bg-slate-900/50 text-white hover:bg-slate-800/70 hover:scale-110 transition-all">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Voice Type Indicator */}
        <div className="absolute bottom-4 left-4">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${voiceConfig.color} px-3 py-1 rounded-full text-white text-xs font-medium`}>
            <VoiceIcon className="w-3 h-3" />
            {tutor.voice_type}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Subject & Language */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
            {tutor.subject}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full">
            {tutor.language}
          </span>
        </div>

        {/* Name & Teaching Content */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
          {tutor.name}
        </h3>
        
        {tutor.teaching_content && tutor.teaching_content !== 'no' && (
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
            {tutor.teaching_content}
          </p>
        )}

        {/* Teaching Style Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs ${speakingConfig.color}`}>
            <SpeakingIcon className="w-3 h-3" />
            {tutor.speaking_style}
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-purple-400">
            <Brain className="w-3 h-3" />
            {tutor.learning_style.split(' ')[0]}
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-green-400">
            <Heart className="w-3 h-3" />
            {tutor.motivation_level}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(tutor.chat_duration * 15)} avg</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{getTimeSince(tutor.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">4.{Math.floor(Math.random() * 3) + 7}</span>
          </div>
        </div>

        {/* Tutor Avatar & Action */}
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

// Stats Card Component
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

// Subject Filter Card Component
const SubjectFilterCard = ({ subject, count, tutors }: { subject: string; count: number; tutors: AITutor[] }) => (
  <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer hover:-translate-y-1">
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
  </div>
);

const StaffRoomPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  
  const filters = params || {};
  const subject = filters.subject || "";
  const topic = filters.topic || "";
  const search = filters.search || "";

  const aiTutors = await getAllCompanions({ subject, topic });

  // Filter tutors based on search query
  const filteredTutors = aiTutors.filter((tutor: AITutor) => {
    if (!search) return true;
    return (
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(search.toLowerCase()) ||
      (tutor.topic && tutor.topic.toLowerCase().includes(search.toLowerCase())) ||
      tutor.teaching_content.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Get unique subjects and their counts
  const subjectCounts = filteredTutors.reduce((acc, tutor) => {
    acc[tutor.subject] = (acc[tutor.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueSubjects = Object.keys(subjectCounts);
  const totalSubjects = uniqueSubjects.length;
  const averageRating = 4.8;
  const totalSessions = filteredTutors.reduce((acc, tutor) => acc + tutor.chat_duration, 0);

  const stats = [
    { label: 'Expert Tutors', value: filteredTutors.length.toString(), icon: Users, change: '+12' },
    { label: 'Subject Areas', value: totalSubjects.toString(), icon: BookOpen, change: '+3' },
    { label: 'Average Rating', value: averageRating.toString(), icon: Star, change: '+0.2' },
    { label: 'Total Sessions', value: totalSessions.toString(), icon: Activity, change: '+45' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingOrbs />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 mb-8">
            <Users className="w-5 h-5 text-blue-300" />
            <span className="text-slate-300 font-medium">Meet Your AI Teaching Staff</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">The</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Staff Room
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 px-5 leading-relaxed">
            Connect with our world-class AI tutors, each specialized in their field and ready to 
            <span className="text-blue-400"> guide your learning journey</span>
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-16">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search tutors, subjects, or topics..."
                  className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-4 focus:outline-none text-lg"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Find Tutor
                </button>
              </div>
            </div>
            
            {/* Popular Subjects */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {uniqueSubjects.slice(0, 5).map((subject) => (
                <button
                  key={subject}
                  className="px-4 py-2 bg-slate-800/30 border border-slate-700/50 text-slate-300 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 text-sm"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Browse by Subject Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              Browse by Subject
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueSubjects.map((subject) => (
                <SubjectFilterCard 
                  key={subject}
                  subject={subject}
                  count={subjectCounts[subject]}
                  tutors={filteredTutors.filter(t => t.subject === subject)}
                />
              ))}
            </div>
          </div>

          {/* Tutors Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Our AI Teaching Staff
              </h2>
              <p className="text-slate-400">
                {filteredTutors.length} expert tutors ready to help you learn
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-white">Highly Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tutors Grid */}
          {filteredTutors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No tutors found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search criteria or filters</p>
              <Link 
                href="/companions"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                View All Tutors
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredTutors.map((tutor: AITutor) => (
                <EnhancedTutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Tutors</span>?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience personalized learning with our world-class AI teaching staff
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Adaptive Teaching',
                description: 'Each tutor adapts their teaching style to match your learning preferences',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Our AI tutors are available whenever you need them, day or night',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Target,
                title: 'Personalized Learning',
                description: 'Customized curriculum and pace tailored to your individual needs',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Globe,
                title: 'Multi-Language Support',
                description: 'Learn in your preferred language with native-speaking AI tutors',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Shield,
                title: 'Safe Environment',
                description: 'Judgment-free learning space where you can make mistakes and grow',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: Lightbulb,
                title: 'Interactive Sessions',
                description:  'Engaging conversations with real-time feedback and explanations',
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already learning with our AI tutors
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/companions"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Rocket className="w-6 h-6" />
                  Start Learning Now
                </Link>
                <button className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800/70 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-6 h-6" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI Tutors</span>
              </div>
              <p className="text-slate-400">
                Revolutionizing education with AI-powered personalized learning experiences.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Find Tutors', 'Browse Subjects', 'How It Works', 'Pricing', 'Student Portal'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Popular Subjects</h3>
              <ul className="space-y-2">
                {['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English Literature'].map((subject) => (
                  <li key={subject}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                      {subject}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400">
                  <MessageCircle className="w-5 h-5" />
                  <span>24/7 Chat Support</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Globe className="w-5 h-5" />
                  <span>help@aitutors.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Users className="w-5 h-5" />
                  <span>Join Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm">
              © 2025 AI Tutors. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StaffRoomPage;