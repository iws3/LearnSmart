"use client"
import React, { useState } from 'react';
import Link from 'next/link';
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
  Bookmark
} from 'lucide-react';

// Types
interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  aiTutor: string;
  tutorAvatar: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'; // Added 'All Levels'
  rating: number;
  students: number;
  category: string;
  thumbnail: string;
  isPopular?: boolean;
  isNew?: boolean;
  subject?: 'Chemistry' | 'Physics' | 'Biology' | 'Economics' | 'Geography' | 'Maths' | 'Computer Science' | 'Web Development' | 'Artificial Intelligence' | 'Frontend Development' | 'MLOps' | 'Mobile Development'; // Added subject field
  lessonType?: 'Theory' | 'Practical'; // Added lessonType field
}

const theoryLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML algorithms, data preprocessing, and model evaluation techniques.',
    duration: '2h 30m',
    aiTutor: 'Dr. Sarah AI',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b2942e?w=100&h=100&fit=crop&crop=face', // Different Unsplash image
    difficulty: 'Beginner',
    rating: 4.8,
    students: 1240,
    category: 'Artificial Intelligence',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    isPopular: true,
    subject: 'Artificial Intelligence',
    lessonType: 'Theory',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into closures, prototypes, async programming, and modern ES6+ features.',
    duration: '3h 15m',
    aiTutor: 'Prof. Alex Code',
    tutorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Advanced',
    rating: 4.9,
    students: 892,
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    isNew: true,
    subject: 'Web Development',
    lessonType: 'Theory',
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    description: 'Master essential data structures and algorithmic thinking for coding interviews.',
    duration: '4h 20m',
    aiTutor: 'Dr. Logic Prime',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Intermediate',
    rating: 4.7,
    students: 2156,
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop',
    subject: 'Computer Science',
    lessonType: 'Theory',
  },
  // --- New High School Theory Lessons ---
  {
    id: '7',
    title: 'Fundamentals of Algebra',
    description: 'Explore variables, equations, inequalities, and functions. Build a strong foundation in algebraic thinking.',
    duration: '1h 45m',
    aiTutor: 'Prof. Mathemagica',
    tutorAvatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Beginner',
    rating: 4.6,
    students: 1850,
    category: 'High School Maths',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
    isPopular: true,
    subject: 'Maths',
    lessonType: 'Theory',
  },
  {
    id: '8',
    title: 'Introduction to Economics: Supply & Demand',
    description: 'Understand the core principles of microeconomics, market forces, and how prices are determined.',
    duration: '2h 00m',
    aiTutor: 'Dr. Eco Novice',
    tutorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Beginner',
    rating: 4.7,
    students: 1320,
    category: 'High School Economics',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4be3?w=400&h=250&fit=crop',
    subject: 'Economics',
    lessonType: 'Theory',
  },
  {
    id: '9',
    title: 'World Geography: Continents and Climates',
    description: 'Explore the Earth\'s major landforms, diverse climates, and their impact on human societies.',
    duration: '1h 30m',
    aiTutor: 'Explorer GeoBot',
    tutorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
    difficulty: 'All Levels',
    rating: 4.5,
    students: 980,
    category: 'High School Geography',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    isNew: true,
    subject: 'Geography',
    lessonType: 'Theory',
  },
];

const practicalLessons: Lesson[] = [
  {
    id: '4',
    title: 'Build a React Dashboard',
    description: 'Create a fully functional admin dashboard with charts, tables, and real-time data.',
    duration: '5h 45m',
    aiTutor: 'React Master AI',
    tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Intermediate',
    rating: 4.6,
    students: 758,
    category: 'Frontend Development',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
    isPopular: true,
    subject: 'Frontend Development',
    lessonType: 'Practical',
  },
  {
    id: '5',
    title: 'ML Model Deployment Lab',
    description: 'Deploy machine learning models to production using Docker, AWS, and FastAPI.',
    duration: '6h 30m',
    aiTutor: 'DevOps Guru AI',
    tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Advanced',
    rating: 4.9,
    students: 543,
    category: 'MLOps',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop',
    isNew: true,
    subject: 'MLOps',
    lessonType: 'Practical',
  },
  {
    id: '6',
    title: 'Mobile App with React Native',
    description: 'Build and publish a cross-platform mobile app with navigation and API integration.',
    duration: '7h 15m',
    aiTutor: 'Mobile Mentor AI',
    tutorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Intermediate',
    rating: 4.8,
    students: 1089,
    category: 'Mobile Development',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    subject: 'Mobile Development',
    lessonType: 'Practical',
  },
  // --- New High School Practical Lessons ---
  {
    id: '10',
    title: 'Chemistry Lab: Acid-Base Titration',
    description: 'Perform a classic titration experiment to determine the concentration of an unknown acid or base. Learn lab safety and precision techniques.',
    duration: '2h 15m',
    aiTutor: 'Dr. Beaker Bot',
    tutorAvatar: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Intermediate',
    rating: 4.8,
    students: 750,
    category: 'High School Chemistry',
    thumbnail: 'https://images.unsplash.com/photo-1576091999482-8c3507109587?w=400&h=250&fit=crop', // Chemistry lab image
    isPopular: true,
    subject: 'Chemistry',
    lessonType: 'Practical',
  },
  {
    id: '11',
    title: 'Physics Lab: Ohm\'s Law Experiment',
    description: 'Investigate the relationship between voltage, current, and resistance by building simple circuits and taking measurements.',
    duration: '2h 00m',
    aiTutor: 'Circuit Sage AI',
    tutorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Intermediate',
    rating: 4.7,
    students: 680,
    category: 'High School Physics',
    thumbnail: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400&h=250&fit=crop', // Physics experiment image
    subject: 'Physics',
    lessonType: 'Practical',
  },
  {
    id: '12',
    title: 'Biology Lab: Microscopic World',
    description: 'Learn to use a microscope, prepare slides, and observe various microorganisms and cell structures.',
    duration: '1h 45m',
    aiTutor: 'Microbe Mentor',
    tutorAvatar: 'https://images.unsplash.com/photo-1612279210995-55c0aea5f86e?w=100&h=100&fit=crop&crop=face',
    difficulty: 'Beginner',
    rating: 4.9,
    students: 920,
    category: 'High School Biology',
    thumbnail: 'https://images.unsplash.com/photo-1578496479531-329f64bf3906?w=400&h=250&fit=crop', // Microscope/biology image
    isNew: true,
    subject: 'Biology',
    lessonType: 'Practical',
  },
];

// Components
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    Beginner: 'bg-green-100 text-green-700 border-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Advanced: 'bg-red-100 text-red-700 border-red-200',
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty}
    </span>
  );
};

const LessonCard = ({ lesson, type }: { lesson: Lesson; type: 'theory' | 'practical' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Card Header with Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        <img 
          src={lesson.thumbnail} 
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {lesson.isPopular && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          )}
          {lesson.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Type Icon */}
        <div className="absolute bottom-3 left-3">
          <div className={`p-2 rounded-full backdrop-blur-sm ${
            type === 'theory' ? 'bg-blue-500/80' : 'bg-purple-500/80'
          } text-white`}>
            {type === 'theory' ? <BookOpen className="w-5 h-5" /> : <FlaskConical className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Category & Difficulty */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {lesson.category}
          </span>
          <DifficultyBadge difficulty={lesson.difficulty} />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {lesson.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{lesson.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{lesson.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Tutor Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={lesson.tutorAvatar} 
              alt={lesson.aiTutor}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{lesson.aiTutor}</p>
              <p className="text-xs text-gray-500">AI Tutor</p>
            </div>
          </div>

          {/* Launch Button */}
          <Link 
            href={`/lesson/${lesson.id}`}
            className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            <span>Launch</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  count,
  gradient 
}: { 
  icon: any;
  title: string;
  subtitle: string;
  count: number;
  gradient: string;
}) => (
  <div className="text-center mb-12">
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${gradient} mb-4`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600 mb-4">{subtitle}</p>
    <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
      <Target className="w-4 h-4" />
      <span>{count} lessons available</span>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, label, value, change }: { 
  icon: any;
  label: string;
  value: string;
  change: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-100 rounded-xl">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-green-600">{change}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-gray-600 text-sm">{label}</p>
  </div>
);

const page = () => {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 pt-8 pb-20">
   
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Welcome back, John!</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Your Learning
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Journey Continues
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Discover new lessons, practice with hands-on labs, and master skills with AI-powered tutors
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard icon={BookOpen} label="Courses Completed" value="12" change="+2 this week" />
            <StatsCard icon={Clock} label="Hours Learned" value="48" change="+6 this week" />
            <StatsCard icon={Award} label="Certificates" value="8" change="+1 this week" />
            <StatsCard icon={TrendingUp} label="Skill Level" value="Expert" change="↗ Growing" />
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons, topics, or tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              />
            </div>
            <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Learning Path Toggle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-2 md:inline-flex flex-col md:flex mx-auto block border border-gray-200">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'theory'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Theory Lessons</span>
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {theoryLessons.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'practical'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <FlaskConical className="w-5 h-5" />
            <span>Practical Labs</span>
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {practicalLessons.length}
            </span>
          </button>
        </div>
      </section>

      {/* Theory Section */}
      {activeTab === 'theory' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeader
            icon={BookOpen}
            title="Theory Lessons"
            subtitle="Build strong foundations with comprehensive theoretical knowledge"
            count={theoryLessons.length}
            gradient="bg-gradient-to-r from-blue-600 to-blue-500"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {theoryLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} type="theory" />
            ))}
          </div>
        </section>
      )}

      {/* Practical Section */}
      {activeTab === 'practical' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeader
            icon={FlaskConical}
            title="Practical Labs"
            subtitle="Apply your knowledge with hands-on projects and real-world applications"
            count={practicalLessons.length}
            gradient="bg-gradient-to-r from-purple-600 to-purple-500"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {practicalLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} type="practical" />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Brain className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners mastering new technologies with AI-powered education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Explore All Courses
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Get Premium Access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;