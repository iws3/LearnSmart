"use client"
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  User, 
  BookOpen, 
  FlaskConical,
  Zap,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Brain,
  Target,
  Filter,
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
  Headphones
} from 'lucide-react';

// Types
interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  aiTutor: string;
  tutorAvatar: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  students: number;
  category: string;
  thumbnail: string;
  isPopular?: boolean;
  isNew?: boolean;
  subject?: string;
  lessonType?: 'Theory' | 'Practical';
  progress?: number;
}

const featuredLessons: Lesson[] = [
  {
    id: '1',
    title: 'Advanced Neural Networks',
    description: 'Master deep learning architectures, backpropagation, and cutting-edge AI techniques.',
    duration: '4h 30m',
    aiTutor: 'Dr. Neural AI',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b2942e?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Advanced',
    rating: 4.9,
    students: 2450,
    category: 'AI & Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    isPopular: true,
    subject: 'Artificial Intelligence',
    lessonType: 'Theory',
    progress: 65
  },
  {
    id: '2',
    title: 'React Native Mobile Mastery',
    description: 'Build production-ready mobile apps with modern React Native and Expo.',
    duration: '6h 15m',
    aiTutor: 'Mobile Mentor',
    tutorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Intermediate',
    rating: 4.8,
    students: 1890,
    category: 'Mobile Development',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    isNew: true,
    subject: 'Mobile Development',
    lessonType: 'Practical',
    progress: 30
  },
  {
    id: '3',
    title: 'Quantum Computing Fundamentals',
    description: 'Explore quantum mechanics principles and their applications in computing.',
    duration: '3h 45m',
    aiTutor: 'Quantum Sage',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Advanced',
    rating: 4.7,
    students: 1250,
    category: 'Quantum Computing',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    isPopular: true,
    subject: 'Computer Science',
    lessonType: 'Theory',
    progress: 0
  }
];

const categories = [
  { 
    name: 'AI & Machine Learning', 
    icon: Brain, 
    courses: 42, 
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  { 
    name: 'Web Development', 
    icon: Code, 
    courses: 38, 
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  { 
    name: 'Data Science', 
    icon: BarChart3, 
    courses: 29, 
    color: 'from-green-500 to-emerald-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  { 
    name: 'Design & UI/UX', 
    icon: Palette, 
    courses: 25, 
    color: 'from-orange-500 to-red-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  { 
    name: 'Mobile Development', 
    icon: Rocket, 
    courses: 31, 
    color: 'from-indigo-500 to-purple-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  { 
    name: 'Cybersecurity', 
    icon: Shield, 
    courses: 18, 
    color: 'from-red-500 to-pink-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  }
];

const stats = [
  { label: 'Active Learners', value: '50K+', icon: Users, change: '+12%' },
  { label: 'Expert Tutors', value: '200+', icon: Award, change: '+8%' },
  { label: 'Course Hours', value: '1000+', icon: Clock, change: '+25%' },
  { label: 'Success Rate', value: '94%', icon: Trophy, change: '+3%' }
];

// Components
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

const LessonCard = ({ lesson, size = 'normal' }: { lesson: Lesson; size?: 'normal' | 'large' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden hover:bg-slate-800/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 ${
      size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
      {/* Progress Bar */}
      {lesson.progress !== undefined && lesson.progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700/50">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
            style={{ width: `${lesson.progress}%` }}
          />
        </div>
      )}

      {/* Image Container */}
      <div className={`relative overflow-hidden ${size === 'large' ? 'h-64' : 'h-48'}`}>
        <img 
          src={lesson.thumbnail} 
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {lesson.isPopular && (
            <span className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          )}
          {lesson.isNew && (
            <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New
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

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110">
            <Play className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${size === 'large' ? 'md:p-8' : ''}`}>
        {/* Category & Difficulty */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
            {lesson.category}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            lesson.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
            lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
            'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {lesson.difficulty}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className={`font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 ${
          size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {lesson.title}
        </h3>
        <p className={`text-slate-400 leading-relaxed mb-4 line-clamp-3 ${
          size === 'large' ? 'text-base' : 'text-sm'
        }`}>
          {lesson.description}
        </p>

        {/* Progress Bar (if in progress) */}
        {lesson.progress !== undefined && lesson.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs text-blue-400 font-medium">{lesson.progress}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{lesson.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{lesson.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Tutor & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={lesson.tutorAvatar} 
              alt={lesson.aiTutor}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <p className="text-sm font-medium text-white">{lesson.aiTutor}</p>
              <p className="text-xs text-slate-400">AI Tutor</p>
            </div>
          </div>

          <button className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
            {lesson.progress && lesson.progress > 0 ? (
              <>
                <Play className="w-4 h-4" />
                Continue
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start
              </>
            )}
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: any }) => (
  <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <category.icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
      {category.name}
    </h3>
    <p className="text-slate-400 text-sm mb-4">
      {category.courses} courses available
    </p>
    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm group-hover:gap-3 transition-all">
      Explore <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

const StatCard = ({ stat }: { stat: any }) => (
  <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
        <stat.icon className="w-6 h-6 text-blue-400" />
      </div>
      <span className="text-sm font-medium text-green-400">{stat.change}</span>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
    <p className="text-slate-400 text-sm">{stat.label}</p>
  </div>
);

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

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
            <span className="text-slate-300 font-medium">{getGreeting()}, Alex!</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">Master the</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Future of Tech
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your career with AI-powered learning. From beginner to expert, 
            <span className="text-blue-400"> master cutting-edge technologies</span> with 
            personalized AI tutors and hands-on projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-3">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8  py-4 rounded-2xl text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer">
              <Play className="w-6 h-6" />
              Start Learning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800/70 transition-all duration-300 flex items-center justify-center gap-3">
              <Headphones className="w-6 h-6" />
              Watch Demo
            </button>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-16">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input
                  type="text"
                  placeholder="What would you like to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-4 focus:outline-none text-lg"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Ask AI
                </button>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Machine Learning', 'React', 'Python', 'Data Science', 'UI/UX'].map((term) => (
                <button
                  key={term}
                  className="px-4 py-2 bg-slate-800/30 border border-slate-700/50 text-slate-300 rounded-full text-sm hover:bg-slate-700/50 hover:text-white transition-all duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-300 font-medium">Featured Content</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Continue Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Pick up where you left off or discover something completely new
            </p>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredLessons.map((lesson, index) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                size={index === 0 ? 'large' : 'normal'} 
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="group bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600/50 text-white px-8 py-4 rounded-2xl font-medium text-lg hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 transition-all duration-300 flex items-center gap-3 mx-auto">
              View All Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-6">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 font-medium">Learning Paths</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose your path and let AI guide you to mastery
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-blue-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-8">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join over 50,000 learners who are already mastering tomorrow's technologies with AI-powered education
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
              <Plus className="w-6 h-6" />
              Get Premium Access
              <Sparkles className="w-5 h-5" />
            </button>
            <button className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-8 py-4 rounded-2xl  text-lg hover:bg-slate-800/70 transition-all duration-300 flex items-center justify-center gap-3">
              <MessageSquare className="w-6 h-6" />
              Talk to AI Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page