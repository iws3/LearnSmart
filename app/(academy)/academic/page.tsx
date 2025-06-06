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
  Eye,
  GraduationCap,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Video,
  UserCheck,
  BookMarked,
  PenTool,
  Briefcase,
  Stars,
  Timer,
  Medal,
  TrendingDown,
  CalculatorIcon,
  FlaskConical,
  LeafIcon
} from 'lucide-react';

// Mock data for real tutors
const realTutors = [
  {
    id: '1',
    name: 'Fonyuy Gita',
    subject: 'Mathematics',
    specialization: 'Calculus & Statistics',
    experience: 8,
    rating: 4.9,
    studentsCount: 150,
    location: 'Bamenda, North-West',
    languages: ['English', 'French'],
    image: 'https://i.ibb.co/ynyGrRcv/Whats-App-Image-2025-06-06-at-14-26-15-1.jpg',
    qualification: 'PhD in Mathematics, University of Cambridge',
    hourlyRate: 25,
    availability: 'Available',
    teachingStyle: 'Interactive & Patient',
    subjects: ['Calculus', 'Statistics', 'Algebra', 'Geometry'],
    bio: 'Passionate educator with 8+ years helping students excel in mathematics through personalized learning approaches.',
    achievements: ['Best Teacher Award 2023', '98% Pass Rate', 'Published Research']
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    subject: 'Physics',
    specialization: 'Quantum Physics & Mechanics',
    experience: 12,
    rating: 4.8,
    studentsCount: 200,
    location: 'Douala, Littoral',
    languages: ['English', 'Mandarin'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    qualification: 'PhD in Theoretical Physics, MIT',
    hourlyRate: 35,
    availability: 'Available',
    teachingStyle: 'Conceptual & Practical',
    subjects: ['Quantum Physics', 'Classical Mechanics', 'Thermodynamics', 'Optics'],
    bio: 'Former MIT researcher specializing in making complex physics concepts accessible and engaging.',
    achievements: ['Published 25+ Papers', 'Research Excellence Award', 'Student Choice Award']
  },
  {
    id: '3',
    name: 'Dr. Aminata Diallo',
    subject: 'Chemistry',
    specialization: 'Organic & Biochemistry',
    experience: 6,
    rating: 4.9,
    studentsCount: 120,
    location: 'Yaoundé, Centre',
    languages: ['English', 'French', 'Arabic'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    qualification: 'PhD in Biochemistry, Sorbonne University',
    hourlyRate: 30,
    availability: 'Busy',
    teachingStyle: 'Hands-on & Experimental',
    subjects: ['Organic Chemistry', 'Biochemistry', 'Analytical Chemistry', 'Physical Chemistry'],
    bio: 'Award-winning chemist who believes in learning through experimentation and real-world applications.',
    achievements: ['Young Scientist Award', 'Innovation in Teaching', '100% Exam Success Rate']
  },
  {
    id: '4',
    name: 'Mr. James Okoye',
    subject: 'Computer Science',
    specialization: 'Web Development & AI',
    experience: 5,
    rating: 4.7,
    studentsCount: 180,
    location: 'Bamenda, North-West',
    languages: ['English', 'Igbo'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    qualification: 'MSc Computer Science, University of Buea',
    hourlyRate: 20,
    availability: 'Available',
    teachingStyle: 'Project-based & Modern',
    subjects: ['JavaScript', 'Python', 'React', 'Machine Learning'],
    bio: 'Tech industry professional bringing real-world coding experience to passionate learners.',
    achievements: ['Industry Expert', '5-Star Rating', 'Career Mentor']
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Fonyuy Gita',
    role: 'High School Student',
    image: 'https://i.ibb.co/ynyGrRcv/Whats-App-Image-2025-06-06-at-14-26-15-1.jpg',
    content: 'Dr. Sarah helped me go from failing math to scoring 95% on my final exam. Her teaching style is incredible!',
    rating: 5,
    subject: 'Mathematics'
  },
  {
    id: 2,
    name: 'Paul Nguma',
    role: 'University Student',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'Prof. Chen made quantum physics actually make sense. Best investment in my education ever!',
    rating: 5,
    subject: 'Physics'
  },
  {
    id: 3,
    name: 'Grace Tabi',
    role: 'Medical Student',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'Dr. Diallo\'s biochemistry sessions were game-changing. She explains complex concepts beautifully.',
    rating: 5,
    subject: 'Chemistry'
  }
];

const subjects = [
  { name: 'Mathematics', icon: CalculatorIcon, tutors: 15, color: 'from-blue-500 to-cyan-500' },
  { name: 'Physics', icon: Zap, tutors: 12, color: 'from-purple-500 to-pink-500' },
  { name: 'Chemistry', icon: FlaskConical, tutors: 10, color: 'from-green-500 to-emerald-500' },
  { name: 'Biology', icon: LeafIcon, tutors: 8, color: 'from-orange-500 to-red-500' },
  { name: 'Computer Science', icon: Code, tutors: 20, color: 'from-indigo-500 to-purple-500' },
  { name: 'English', icon: BookOpen, tutors: 14, color: 'from-yellow-500 to-orange-500' },
  { name: 'French', icon: Globe, tutors: 9, color: 'from-pink-500 to-rose-500' },
  { name: 'Economics', icon: TrendingUp, tutors: 6, color: 'from-teal-500 to-cyan-500' }
];

// Add missing imports
const Calculator = () => <div className="w-6 h-6 bg-white/20 rounded"></div>;
const Flask = () => <div className="w-6 h-6 bg-white/20 rounded"></div>;
const Leaf = () => <div className="w-6 h-6 bg-white/20 rounded"></div>;

// Floating animation component
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

// Enhanced Tutor Card Component
const TutorCard = ({ tutor, featured = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`group relative bg-white/5 backdrop-blur-sm border border-slate-700/30 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 ${
      featured ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
      {/* Header Image & Status */}
      <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900`}>
        <img 
          src={tutor.image} 
          alt={tutor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        {/* Status & Actions */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            tutor.availability === 'Available' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-yellow-500/90 text-white'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              tutor.availability === 'Available' ? 'bg-green-300' : 'bg-yellow-300'
            }`} />
            {tutor.availability}
          </span>
        </div>

        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-slate-900/30 text-white hover:bg-slate-800/50 hover:scale-110'
          }`}
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Experience Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1">
            <Award className="w-3 h-3" />
            {tutor.experience} Years Exp.
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Header Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                {tutor.subject}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-400">{tutor.location}</span>
            </div>
            
            <h3 className={`font-bold text-white mb-1 group-hover:text-blue-300 transition-colors ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {tutor.name}
            </h3>
            
            <p className="text-sm text-slate-400 font-medium">
              {tutor.specialization}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold text-white">{tutor.rating}</span>
            </div>
            <p className="text-xs text-slate-400">{tutor.studentsCount} students</p>
          </div>
        </div>

        {/* Bio */}
        <p className={`text-slate-400 leading-relaxed mb-4 ${featured ? 'text-sm' : 'text-xs'} line-clamp-2`}>
          {tutor.bio}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-800/30 rounded-2xl">
          <div className="text-center">
            <div className="text-lg font-bold text-white">${tutor.hourlyRate}</div>
            <div className="text-xs text-slate-400">per hour</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{tutor.languages.length}</div>
            <div className="text-xs text-slate-400">languages</div>
          </div>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="px-2 py-1 bg-slate-700/30 text-slate-400 text-xs rounded-full">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Book Session
          </button>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="p-3 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-3 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card
// @ts-ignore
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
    <div className="flex items-start gap-4 mb-4">
      <img 
        src={testimonial.image} 
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-white">{testimonial.name}</h4>
        <p className="text-sm text-slate-400">{testimonial.role}</p>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <span className="text-xs text-blue-400 font-medium">{testimonial.subject}</span>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed italic">
      "{testimonial.content}"
    </p>
  </div>
);

// Main Component
const AcademicLandingPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

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
    { label: 'Expert Tutors', value: '100+', icon: Users, change: '+12 this month' },
    { label: 'Success Rate', value: '98%', icon: Trophy, change: '+2% this year' },
    { label: 'Subjects Covered', value: '25+', icon: BookOpen, change: '+3 new subjects' },
    { label: 'Happy Students', value: '2000+', icon: Heart, change: '+150 this month' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingOrbs />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-full px-6 py-3 mb-8 hover:bg-slate-800/40 transition-all duration-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-slate-300 font-medium">{getGreeting()}! Ready to excel with real experts?</span>
            <GraduationCap className="w-5 h-5 text-blue-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">Learn from</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Real Experts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Connect with <span className="text-blue-400 font-semibold">qualified human tutors</span> in Cameroon. 
            Get personalized, face-to-face learning with proven educators who understand your local curriculum.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-12 md:flex hidden">
            <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-2 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search tutors, subjects, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-4 focus:outline-none text-lg"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Find Tutor
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:bg-slate-800/30 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-green-400 text-xs font-medium">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Expert Tutors</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Qualified educators with proven track records, ready to help you achieve academic excellence
            </p>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {realTutors.map((tutor, index) => (
              <TutorCard 
                key={tutor.id} 
                tutor={tutor} 
                featured={index === 0}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              <Users className="w-6 h-6" />
              View All Tutors
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="relative py-24 bg-slate-800/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Subjects We <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Master</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              From basic fundamentals to advanced concepts, our tutors cover all major academic subjects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 hover:bg-slate-800/30 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <subject.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-center group-hover:text-blue-300 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-slate-400 text-center">
                  {subject.tutors} expert tutors
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Success Stories</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Real results from real students who transformed their academic journey with our expert tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-12">
            <div className="mb-8">
              <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Excel?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful students who chose personalized learning with our expert tutors
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6" />
                Find Your Tutor
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:bg-slate-800/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">EduConnect</span>
              </div>
              <p className="text-slate-400 mb-6">
                Connecting students with expert tutors across Cameroon for personalized, quality education.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-slate-800/50 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
                <button className="w-10 h-10 bg-slate-800/50 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
                <button className="w-10 h-10 bg-slate-800/50 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Find Tutors', 'Browse Subjects', 'How it Works', 'Success Stories', 'Pricing'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="text-white font-bold mb-6">Popular Subjects</h3>
              <ul className="space-y-3">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].map((subject) => (
                  <li key={subject}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {subject}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-400">Bamenda, North-West, Cameroon</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-400">+237 6XX XXX XXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-400">hello@educonnect.cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 EduConnect. All rights reserved. Made with ❤️ in Cameroon
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcademicLandingPage;