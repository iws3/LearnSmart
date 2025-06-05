import { getUserCompanions, getUserSessions } from '@/lib/actions/aiCompanion.action';
import { currentUser } from '@clerk/nextjs/server';
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
  ChevronRight,
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
  List,
  Edit,
  MapPin,
  Mail,
  Phone,
  Globe,
  Heart,
  Brain,
  Volume2,
  Mic,
  Eye
} from 'lucide-react';

// Types
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

interface Session {
  id: string;
  name: string;
  style: string | null;
  topic: string;
  author: string;
  subject: string;
  language: string;
  created_at: string;
  voice_type: string;
  chat_duration: number;
  learning_style: string;
  speaking_style: string;
  motivation_level: string;
  teaching_content: string;
}

// Subject-specific background images
const subjectBackgrounds = {
  'Mathematics': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop',
  'Maths': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop',
  'Physics': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=600&fit=crop',
  'Chemistry': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=600&fit=crop',
  'Biology': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
  'Computer Science': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
  'Software Engineering': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
  'English': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop',
  'History': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&h=600&fit=crop',
  'Geography': 'https://images.unsplash.com/photo-1446776756104-7e081298375a?w=1200&h=600&fit=crop',
  'Football - soccer': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=600&fit=crop',
  'default': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop'
};

// Voice type icons mapping
const voiceIcons = {
  'Professional Female': { icon: User, color: 'from-pink-500 to-rose-400' },
  'Professional Male': { icon: Mic, color: 'from-blue-500 to-indigo-400' },
  'Calm Male': { icon: Coffee, color: 'from-green-500 to-emerald-400' },
  'Friendly Female': { icon: Heart, color: 'from-purple-500 to-pink-400' },
  'Friendly Male': { icon: Heart, color: 'from-cyan-500 to-blue-400' },
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

// Utility functions
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

const getMostFrequentSubject = (tutors: AITutor[], sessions: Session[]) => {
  const subjectCount: Record<string, number> = {};
  
  [...tutors, ...sessions].forEach(item => {
    subjectCount[item.subject] = (subjectCount[item.subject] || 0) + 1;
  });
  
  return Object.keys(subjectCount).reduce((a, b) => 
    subjectCount[a] > subjectCount[b] ? a : b, 'default'
  );
};

// Floating Orbs Component
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  </div>
);

// Profile Header Component
const ProfileHeader = ({ user, tutorsCount, sessionsCount, favoriteSubject }: { 
  user: any; 
  tutorsCount: number; 
  sessionsCount: number; 
  favoriteSubject: string;
}) => (
  <div className="relative h-80 overflow-hidden rounded-3xl mb-8">
    {/* Cover Image */}
    <div className="absolute inset-0">
      <img 
        src={getSubjectBackground(favoriteSubject)} 
        alt="Profile Cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />
    </div>

    {/* Profile Content */}
    <div className="absolute inset-0 flex items-end p-8">
      <div className="flex items-end gap-6 w-full">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 backdrop-blur-sm bg-slate-800/50">
            <img 
              src={user?.imageUrl || user?.profileImageUrl || '/default-avatar.png'} 
              alt={user?.firstName || 'User'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
              <span className="text-blue-300 text-sm font-medium">Pro Learner</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-slate-300 mb-4">
            {user?.emailAddresses?.[0]?.emailAddress && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.emailAddresses[0].emailAddress}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Joined {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tutorsCount}</div>
              <div className="text-sm text-slate-400">Tutors Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{sessionsCount}</div>
              <div className="text-sm text-slate-400">Learning Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{favoriteSubject}</div>
              <div className="text-sm text-slate-400">Favorite Subject</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-white rounded-xl hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <Link href="/quiz" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
          
            <Edit className="w-5 h-5" />
            Answer Quiz
            </Link>
          
        </div>
      </div>
    </div>
  </div>
);

// Tutor Card Component
const CompactTutorCard = ({ tutor }: { tutor: AITutor }) => {
  // @ts-ignore
  const voiceConfig = voiceIcons[tutor.voice_type] || voiceIcons['Professional Male'];
  // @ts-ignore
  const speakingConfig = speakingStyleIcons[tutor.speaking_style] || speakingStyleIcons['Conversational'];
  const VoiceIcon = voiceConfig.icon;
  const SpeakingIcon = speakingConfig.icon;

  return (
    <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
              {tutor.subject}
            </span>
            {tutor.topic && (
              <span className="px-2 py-1 text-xs bg-slate-700/30 text-slate-300 rounded-full">
                {tutor.topic}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {tutor.name}
          </h3>
          {tutor.teaching_content && tutor.teaching_content !== 'no' && (
            <p className="text-sm text-slate-400 line-clamp-2 mb-3">
              {tutor.teaching_content}
            </p>
          )}
        </div>
        <div className="ml-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${voiceConfig.color} p-2 flex items-center justify-center`}>
            <VoiceIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className={`inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs ${speakingConfig.color}`}>
            <SpeakingIcon className="w-3 h-3" />
            {tutor.speaking_style}
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/30 rounded-full text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {formatDuration(tutor.chat_duration * 15)}
          </div>
        </div>
        <Link 
          href={`/companions/${tutor.id}`}
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm font-medium"
        >
          View
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

// Session Card Component
const SessionCard = ({ session }: { session: Session }) => {
  // @ts-ignore
  const voiceConfig = voiceIcons[session.voice_type] || voiceIcons['Professional Male'];
  const VoiceIcon = voiceConfig.icon;

  return (
    <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${voiceConfig.color} p-2 flex items-center justify-center flex-shrink-0`}>
          <VoiceIcon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">
              {session.subject}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">
              {getTimeSince(session.created_at)}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-300 transition-colors">
            {session.name}
          </h3>
          
          <p className="text-sm text-slate-400 mb-3">
            {session.topic} • {session.teaching_content}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>{session.language}</span>
            <span>•</span>
            <span>{formatDuration(session.chat_duration * 15)} session</span>
            <span>•</span>
            <span>{session.learning_style.split(' ')[0]} learning</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">Completed</span>
        </div>
      </div>
    </div>
  );
};

// Achievement Badge Component
const AchievementBadge = ({ title, description, icon: Icon, color }: { 
  title: string; 
  description: string; 
  icon: any; 
  color: string;
}) => (
  <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-800/50 transition-all duration-300 group">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-full h-full text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </div>
);

// Main Profile Page Component
const UserProfilePage = async () => {
  const user = await currentUser();
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  const [userTutors, userSessions] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id)
  ]);

  // @ts-ignore

  const favoriteSubject = getMostFrequentSubject(userTutors, userSessions);
  const totalLearningTime = [...userTutors, ...userSessions].reduce((acc, item) => acc + (item.chat_duration * 15), 0);
  
  // Get unique subjects
  // @ts-ignore
  const uniqueSubjects = new Set([...userTutors.map(t => t.subject), ...userSessions.map(s => s.subject)]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingOrbs />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader 
          user={user}
          tutorsCount={userTutors.length}
          sessionsCount={userSessions.length}
          favoriteSubject={favoriteSubject}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-green-400">+{Math.floor(totalLearningTime * 0.1)}h</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{formatDuration(totalLearningTime)}</h3>
            <p className="text-slate-400 text-sm">Total Learning Time</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-green-400">+{uniqueSubjects.size > 1 ? '2' : '1'}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{uniqueSubjects.size}</h3>
            <p className="text-slate-400 text-sm">Subjects Explored</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm font-medium text-green-400">+15</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">4.{Math.floor(Math.random() * 3) + 7}</h3>
            <p className="text-slate-400 text-sm">Average Rating</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-sm font-medium text-green-400">+{Math.floor(userSessions.length / 2)}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{userSessions.length + Math.floor(Math.random() * 5)}</h3>
            <p className="text-slate-400 text-sm">Learning Streak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tutors & Sessions */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Tutors Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Users className="w-7 h-7 text-blue-400" />
                  My AI Tutors
                  <span className="text-lg text-slate-400">({userTutors.length})</span>
                </h2>
                <Link 
                  href="/companions/create"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Create New
                </Link>
              </div>

              {userTutors.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No tutors created yet</h3>
                  <p className="text-slate-400 mb-6">Create your first AI tutor to start learning</p>
                  <Link 
                    href="/companions/create"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Tutor
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {userTutors.slice(0, 3).map((tutor) => (
                    <CompactTutorCard key={tutor.id} tutor={tutor} />
                  ))}
                  {userTutors.length > 3 && (
                    <Link 
                      href="/companions"
                      className="text-center py-4 text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
                    >
                      View all {userTutors.length} tutors
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Recent Sessions Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Activity className="w-7 h-7 text-green-400" />
                  Recent Sessions
                  <span className="text-lg text-slate-400">({userSessions.length})</span>
                </h2>
                <Link 
                  href="/companions"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-600/50 text-white rounded-xl hover:bg-slate-700/50 transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  Start Session
                </Link>
              </div>

              {userSessions.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No sessions yet</h3>
                  <p className="text-slate-400 mb-6">Start your first learning session with an AI tutor</p>
                  <Link 
                    href="/companions"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Play className="w-5 h-5" />
                    Browse Tutors
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userSessions.slice(0, 3).map((session) => (
                    // @ts-ignore
                    <SessionCard key={session.id} session={session} />
                  ))}
                  {userSessions.length > 3 && (
                    <div className="text-center py-4 text-green-400 hover:text-green-300 transition-colors">
                      <button className="flex items-center justify-center gap-2 mx-auto">
                        View all {userSessions.length} sessions
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Achievements & Activity */}
          <div className="space-y-8">
            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Trophy className="w-7 h-7 text-yellow-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                <AchievementBadge 
                  title="First Steps"
                  description="Created your first AI tutor"
                  icon={Rocket}
                  color="from-blue-500 to-purple-500"
                />
                
                {userTutors.length >= 3 && (
                  <AchievementBadge 
                    title="Tutor Master"
                    description="Created 3+ AI tutors"
                    icon={GraduationCap}
                    color="from-purple-500 to-pink-500"
                  />
                )}
                
                {userSessions.length >= 5 && (
                  <AchievementBadge 
                    title="Dedicated Learner"
                    description="Completed 5+ sessions"
                    icon={Target}
                    color="from-green-500 to-emerald-500"
                  />
                )}
                
                {uniqueSubjects.size >= 3 && (
                  <AchievementBadge 
                    title="Multi-Subject Explorer"
                    description="Explored 3+ subjects"
                    icon={Brain}
                    color="from-orange-500 to-red-500"
                  />
                )}
                
                {totalLearningTime >= 180 && (
                  <AchievementBadge 
                    title="Time Master"
                    description="3+ hours of learning"
                    icon={Clock}
                    color="from-cyan-500 to-blue-500"
                  />
                )}
                
                <AchievementBadge 
                  title="Rising Star"
                  description="Excellent progress"
                  icon={Star}
                  color="from-yellow-500 to-orange-500"
                />
              </div>
            </div>

            {/* Learning Analytics */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-cyan-400" />
                Learning Analytics
              </h2>
              
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-6">
                {/* Subject Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Subject Focus</h3>
                  <div className="space-y-3">
                    {Array.from(uniqueSubjects).slice(0, 3).map((subject) => {
                      const count = [...userTutors, ...userSessions].filter(item => item.subject === subject).length;
                      const percentage = Math.round((count / (userTutors.length + userSessions.length)) * 100);
                      
                      return (
                        <div key={subject} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300">{subject}</span>
                            <span className="text-slate-400">{percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-700/30 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Learning Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Learning Style</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                      <Volume2 className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-white">Audio</div>
                      <div className="text-xs text-slate-400">Preferred</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                      <Eye className="w-5 h-5 text-green-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-white">Visual</div>
                      <div className="text-xs text-slate-400">Secondary</div>
                    </div>
                  </div>
                </div>

                {/* Weekly Goal */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Weekly Progress</h3>
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Learning Goal</span>
                      <span className="text-sm text-green-400">4h 30m / 5h</span>
                    </div>
                    <div className="w-full bg-slate-600/50 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full w-[90%]" />
                    </div>
                    <div className="text-xs text-slate-400 mt-2">90% complete - Great job!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap className="w-7 h-7 text-yellow-400" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <Link 
                  href="/companions/create"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-3 group"
                >
                  <Plus className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Create New Tutor</div>
                    <div className="text-sm text-blue-100">Start a new learning journey</div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  href="/companions"
                  className="w-full bg-slate-800/50 border border-slate-600/50 text-white p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-3 group"
                >
                  <Play className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Browse Tutors</div>
                    <div className="text-sm text-slate-300">Discover new learning opportunities</div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button className="w-full bg-slate-800/50 border border-slate-600/50 text-white p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-3 group">
                  <BarChart3 className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">View Analytics</div>
                    <div className="text-sm text-slate-300">Track your learning progress</div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="w-full bg-slate-800/50 border border-slate-600/50 text-white p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-3 group">
                  <Share2 className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Share Profile</div>
                    <div className="text-sm text-slate-300">Show off your achievements</div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-7 h-7 text-green-400" />
            Recent Activity
          </h2>
          
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            {userSessions.length === 0 && userTutors.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No recent activity</h3>
                <p className="text-slate-400">Start learning to see your activity here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Combine and sort recent activities */}
                {[...userTutors.map(t => ({ ...t, type: 'tutor' })), ...userSessions.map(s => ({ ...s, type: 'session' }))]
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 py-3 border-b border-slate-700/30 last:border-b-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        item.type === 'tutor' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {item.type === 'tutor' ? <Users className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">
                            {item.type === 'tutor' ? 'Created tutor' : 'Completed session'}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-sm text-slate-400">{getTimeSince(item.created_at)}</span>
                        </div>
                        <div className="text-sm text-slate-300">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-slate-400"> in {item.subject}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-500">
                        {formatDuration(item.chat_duration * 15)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;