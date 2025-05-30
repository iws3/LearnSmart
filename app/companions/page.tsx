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
  Calendar
} from 'lucide-react';
import TutorCard from '@/components/TutorCard';
// import SearchFilters from '@/components/SearchFilters';
// import TutorCard from '@/components/TutorCard';
// import StatsOverview from '@/components/StatsOverview';

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
  'https://images.unsplash.com/photo-1557862921-37829c790f19?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
];

// Random cover images pool
const coverImages = [
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop',
];

// Utility function to get consistent random image based on ID
const getRandomImage = (id: string, imagePool: string[]) => {
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return imagePool[Math.abs(hash) % imagePool.length];
};

// Utility function to get subject color
const getSubjectColor = (subject: string) => {
  const colors = {
    'Maths': 'from-blue-500 to-cyan-500',
    'Physics': 'from-purple-500 to-pink-500',
    'Chemistry': 'from-green-500 to-emerald-500',
    'Biology': 'from-orange-500 to-red-500',
    'Computer Science': 'from-indigo-500 to-purple-500',
    'Economics': 'from-yellow-500 to-orange-500',
    'Geography': 'from-teal-500 to-green-500',
    'History': 'from-rose-500 to-pink-500',
    'Literature': 'from-violet-500 to-purple-500',
    'Art': 'from-pink-500 to-rose-500',
  };
  return colors[subject as keyof typeof colors] || 'from-gray-500 to-slate-500';
};

// Hero Section Component
const HeroSection = ({ tutorCount }: { tutorCount: number }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-8 pb-20">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
          <Users className="w-5 h-5 text-blue-300" />
          <span className="text-white font-medium">Meet Your AI Teaching Staff</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          The
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Staff Room
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
          Connect with our world-class AI tutors, each specialized in their field and ready to guide your learning journey
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-300" />
            <span>{tutorCount} Expert Tutors</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-300" />
            <span>Multiple Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-300" />
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StaffRoomPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  console.log('PARAMS: ', params);

  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";
  const search = filters.search ? filters.search : "";

  const aiTutors = await getAllCompanions({ subject, topic });
  console.log(aiTutors);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <HeroSection tutorCount={filteredTutors.length} />

      {/* Search and Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        {/* <SearchFilters /> */}
      </section>

      {/* Stats Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <StatsOverview tutors={filteredTutors} /> */}
      </section>

      {/* Tutors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Our AI Teaching Staff
            </h2>
            <p className="text-gray-600">
              {filteredTutors.length} tutors ready to help you learn
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Highly Rated</span>
            </div>
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tutors found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <Link 
              href="/companions"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Users className="w-5 h-5" />
              View All Tutors
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
             {filteredTutors.map((tutor: AITutor) => (
             <TutorCard 
                key={tutor.id} 
                tutor ={tutor}
                avatarImage={getRandomImage(tutor.id, avatarImages)}
                coverImage={getRandomImage(tutor.id, coverImages)}
                subjectColor={getSubjectColor(tutor.subject)}
              />
            ))} 
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Brain className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Learning with AI Tutors Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students getting personalized education from our AI teaching staff
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/companions/new"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Create Your Tutor
            </Link>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaffRoomPage;