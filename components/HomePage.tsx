"use client"
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  User, 
  BookOpen, 
  Brain,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Target,
  Search,
  Heart,
  Share2,
  Bookmark,
  ArrowRight,
  Code,
  Palette,
  Rocket,
  Trophy,
  Globe,
  Shield,
  Lightbulb,
  ChevronDown,
  Plus,
  Activity,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Headphones,
  Mic,
  Volume2,
  Zap,
  Coffee,
  Moon,
  Sun,
  Flame,
  Wind,
  Waves,
  Eye
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';

// Random avatar images pool
const avatarImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b2942e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
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
  'Conversational': { icon: MessageSquare, color: 'text-blue-400' },
  'Formal Academic': { icon: BookOpen, color: 'text-purple-400' },
  'Storytelling': { icon: FileText, color: 'text-green-400' },
  'Interactive': { icon: Users, color: 'text-cyan-400' }
};

// Learning style icons
const learningStyleIcons = {
  'Visual (diagrams, charts, images)': { icon: Eye, color: 'text-blue-400' },
  'Auditory (explanations, discussions)': { icon: Headphones, color: 'text-green-400' },
  'Mixed Learning Style': { icon: Brain, color: 'text-purple-400' },
  'Kinesthetic (hands-on activities)': { icon: Activity, color: 'text-orange-400' }
};

// Mock data for demonstration - replace with your actual props
const mockTutors = [
  {
    id: 'd089f66b-c2ed-4c4c-a935-e36b1337cabb',
    created_at: '2025-05-30T09:47:05.413292+00:00',
    name: 'Prof Alexandra',
    subject: 'Mathematics',
    topic: 'Advanced Calculus',
    style: null,
    voice_type: 'Professional Female',
    chat_duration: 4,
    author: 'user_2xlmrKtHbu3SBSmel0IfABSdx6u',
    teaching_content: 'Comprehensive calculus fundamentals',
    language: 'English (UK)',
    speaking_style: 'Enthusiastic',
    learning_style: 'Visual (diagrams, charts, images)',
    motivation_level: 'Calm & Supportive'
  },
  {
    id: '4ebae5cf-4646-400f-9fdb-1336183e518e',
    created_at: '2025-05-30T09:56:03.442628+00:00',
    name: 'Dr. Marcus Chen',
    subject: 'Physics',
    topic: 'Quantum Mechanics',
    style: null,
    voice_type: 'Professional Male',
    chat_duration: 3,
    author: 'user_2xlmrKtHbu3SBSmel0IfABSdx6u',
    teaching_content: 'Exploring quantum physics principles and applications',
    language: 'English (UK)',
    speaking_style: 'Conversational',
    learning_style: 'Visual (diagrams, charts, images)',
    motivation_level: 'Calm & Supportive'
  },
  {
    id: '6e3707a7-8932-4961-923b-8709b075733c',
    created_at: '2025-05-30T11:48:27.793988+00:00',
    name: 'Prof. Sarah Williams',
    subject: 'Computer Science',
    topic: 'Machine Learning',
    style: null,
    voice_type: 'Professional Female',
    chat_duration: 6,
    author: 'user_2xlmrKtHbu3SBSmel0IfABSdx6u',
    teaching_content: 'Introduction to AI and Machine Learning concepts',
    language: 'English (US)',
    speaking_style: 'Formal Academic',
    learning_style: 'Mixed Learning Style',
    motivation_level: 'High Energy & Enthusiastic'
  }
];

const mockSessions = [
  {
    id: 'e5fd1e6d-58f9-4ff4-9a40-6a3ad9b71ce0',
    name: 'Coach Kilian',
    style: null,
    topic: 'Advanced Football Tactics',
    author: 'user_2xlmrKtHbu3SBSmel0IfABSdx6u',
    subject: 'Football - soccer',
    language: 'English (UK)',
    created_at: '2025-06-03T07:37:31.115927+00:00',
    voice_type: 'Calm Male',
    chat_duration: 1,
    learning_style: 'Auditory (explanations, discussions)',
    speaking_style: 'Storytelling',
    motivation_level: 'Calm & Supportive',
    teaching_content: 'Understanding the evolution and application of the offside rule in modern football'
  }
];

// Utility functions
const getRandomAvatar = (seed) => {
  const index = seed ? seed.length % avatarImages.length : Math.floor(Math.random() * avatarImages.length);
  return avatarImages[index];
};

const getSubjectBackground = (subject) => {
  return subjectBackgrounds[subject] || subjectBackgrounds.default;
};

const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getTimeSince = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

// Components
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

const TutorCard = ({ tutor, isLarge = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const voiceConfig = voiceIcons[tutor.voice_type] || voiceIcons['Professional Male'];
  const speakingConfig = speakingStyleIcons[tutor.speaking_style] || speakingStyleIcons['Conversational'];
  const VoiceIcon = voiceConfig.icon;
  const SpeakingIcon = speakingConfig.icon;

  return (
    <div className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden hover:bg-slate-800/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 ${
      isLarge ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-64' : 'h-48'}`}>
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
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-slate-900/50 text-white hover:bg-slate-800/70 hover:scale-110'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isBookmarked 
                ? 'bg-blue-500 text-white scale-110' 
                : 'bg-slate-900/50 text-white hover:bg-slate-800/70 hover:scale-110'
            }`}
          >
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
      <div className={`p-6 ${isLarge ? 'md:p-8' : ''}`}>
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
        <h3 className={`font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 ${
          isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {tutor.name}
        </h3>
        
        {tutor.teaching_content && tutor.teaching_content !== 'no' && (
          <p className={`text-slate-400 leading-relaxed mb-4 line-clamp-3 ${
            isLarge ? 'text-base' : 'text-sm'
          }`}>
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
              src={getRandomAvatar(tutor.id)} 
              alt={tutor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <p className="text-sm font-medium text-white">{tutor.name}</p>
              <p className="text-xs text-slate-400">AI Tutor</p>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = `/companions/${tutor.id}`}
            className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Session
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
// @ts-ignore
const SessionCard = ({ session }) => {
  const [isActive, setIsActive] = useState(false);
  
  const voiceConfig = voiceIcons[session.voice_type] || voiceIcons['Professional Male'];
  const speakingConfig = speakingStyleIcons[session.speaking_style] || speakingStyleIcons['Conversational'];
  const VoiceIcon = voiceConfig.icon;
  const SpeakingIcon = speakingConfig.icon;

  return (
    <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={getRandomAvatar(session.id)} 
            alt={session.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30"
          />
          <div>
            <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
              {session.name}
            </h3>
            <p className="text-sm text-slate-400">{session.subject}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`p-2 bg-gradient-to-r ${voiceConfig.color} rounded-lg`}>
            <VoiceIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs text-slate-400">{getTimeSince(session.created_at)}</span>
        </div>
      </div>

      {/* Topic */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2 capitalize">
          {session.topic}
        </h4>
        {session.teaching_content && (
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {session.teaching_content}
          </p>
        )}
      </div>

      {/* Session Details */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className={`inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs ${speakingConfig.color}`}>
          <SpeakingIcon className="w-3 h-3" />
          {session.speaking_style}
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-blue-400">
          <Headphones className="w-3 h-3" />
          {session.learning_style.split(' ')[0]}
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-green-400">
          <Clock className="w-3 h-3" />
          {formatDuration(session.chat_duration * 15)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span>{session.language}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => window.location.href = `/session/${session.id}`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-3 h-3" />
            Join
          </button>
        </div>
      </div>
    </div>
  );
};
// @ts-ignore
const StatsCard = ({ label, value, icon: Icon, change }) => (
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

const HomePage = ({ tutors, recentSessions}:{tutors:any; recentSessions:CompanionData}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('tutors');
  const {user}=useUser()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    { label: 'Available Tutors', value: tutors.length.toString(), icon: Users, change: '+2' },
    { label: 'Active Sessions', value: recentSessions.length.toString(), icon: Activity, change: '+1' },
    { label: 'Total Subjects', value: new Set([...tutors.map(t => t.subject), ...recentSessions.map(s => s.subject)]).size.toString(), icon: BookOpen, change: '+3' },
    { label: 'Success Rate', value: '96%', icon: Trophy, change: '+2%' }
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
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-slate-300 font-medium">{getGreeting()}!, <span className='text-orange-400'>{user?.fullName}</span> Ready to learn?</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">Learn with</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              AI Tutors
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 px-5 leading-relaxed">
            Connect with personalized AI tutors across {new Set([...tutors.map(t => t.subject), ...recentSessions.map(s => s.subject)]).size} subjects. 
            <span className="text-blue-400"> Start learning instantly</span> with adaptive teaching styles.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-16 md:flex hidden">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search tutors, subjects, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              {[...new Set(tutors.map(t => t.subject))].slice(0, 5).map((subject) => (
                <button
                  key={subject}
                  className="px-4 py-2 bg-slate-800/30 border border-slate-700/50 text-slate-300 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 text-sm"
                  onClick={() => setSearchQuery(subject)}
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
          {/* Section Tabs */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-1 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('tutors')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'tutors'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Available Tutors
                </div>
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'sessions'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Recent Sessions
                </div>
              </button>
            </div>

            <div className=" items-center gap-2 md:flex hidden">
              <button className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                <BarChart3 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          {activeTab === 'tutors' && (
            <div>
              {/* Featured Tutors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {tutors.map((tutor, index) => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={tutor} 
                    isLarge={index === 0}
                  />
                ))}
              </div>

              {/* Subject Categories */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  Browse by Subject
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...new Set(tutors.map(t => t.subject))].map((subject) => (
                    <div
                      key={subject}
                      className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    >
                      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                        <img 
                          src={getSubjectBackground(subject)} 
                          alt={subject}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      </div>
                      <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {subject}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {tutors.filter(t => t.subject === subject).length} tutors available
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              {/* Recent Sessions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {recentSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>

              {/* Session Stats */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  Learning Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {recentSessions.reduce((acc, s) => acc + s.chat_duration, 0) * 15}m
                    </h4>
                    <p className="text-slate-400">Total Learning Time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {recentSessions.length}
                    </h4>
                    <p className="text-slate-400">Sessions Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {Math.floor(Math.random() * 20) + 10}
                    </h4>
                    <p className="text-slate-400">Skills Learned</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Tutors</span>?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience personalized learning with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Adaptive Learning',
                description: 'AI tutors adapt to your learning style and pace for optimal comprehension',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Learn anytime, anywhere with tutors available around the clock',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Target,
                title: 'Personalized Goals',
                description: 'Set and achieve custom learning objectives with guided support',
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
                title: 'Safe Learning Environment',
                description: 'Secure, private, and judgment-free space for comfortable learning',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: Lightbulb,
                title: 'Interactive Lessons',
                description: 'Engage with dynamic content, quizzes, and real-time feedback',
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of learners already using AI tutors to achieve their educational goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6" />
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                <Play className="w-6 h-6" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;