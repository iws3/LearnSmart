// app/my-quizzes/page.tsx

import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getQuizzesForUser } from '@/lib/actions/gemini.action';
import { 
  Brain, 
  Calendar, 
  Clock, 
  BookOpen, 
  Trophy, 
  Zap, 
  Star, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Award, 
  Plus,
  Filter,
  Search,
  Grid,
  List,
  ArrowRight,
  Rocket,
  Users,
  CheckCircle,
  PlayCircle,
  Flame
} from 'lucide-react';

interface CompanionSnippet {
  id: string;
  name: string;
}

interface UserQuiz {
  id: string;
  title: string;
  subject: string | null;
  topic: string | null;
  created_at: string;
  num_questions: number | null;
  companion_id: string | null;
  companions: CompanionSnippet | null;
}

export default async function MyQuizzesPage() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    redirect('/sign-in');
  }

  let quizzes: UserQuiz[] = [];
  let fetchError: string | null = null;

  try {
    quizzes = await getQuizzesForUser({ limit: 20 });
    console.log("quizzes gotten are:", quizzes);
  } catch (error) {
    console.error("Failed to fetch user quizzes:", error);
    if (error instanceof Error) {
      fetchError = error.message;
    } else {
      fetchError = "An unknown error occurred while fetching your quizzes.";
    }
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Error Loading Quizzes</h1>
          <p className="text-red-400">{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Enhanced Global Styles */}
    

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb" style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
          <div className="floating-orb" style={{top: '20%', right: '15%', animationDelay: '1s'}}></div>
          <div className="floating-orb" style={{bottom: '30%', left: '20%', animationDelay: '2s'}}></div>
          <div className="floating-orb" style={{bottom: '15%', right: '25%', animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 mb-6 relative">
              <Trophy className="w-10 h-10 text-white" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-4">
              My Quiz Journey
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Track your progress, review your achievements, and continue your learning adventure
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="stats-card rounded-3xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{quizzes.length}</h3>
              <p className="text-slate-400 text-sm">Total Quizzes</p>
            </div>
            
            <div className="stats-card rounded-3xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {quizzes.reduce((total, quiz) => total + (quiz.num_questions || 0), 0)}
              </h3>
              <p className="text-slate-400 text-sm">Questions Tackled</p>
            </div>
            
            <div className="stats-card rounded-3xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {new Set(quizzes.map(q => q.subject).filter(Boolean)).size}
              </h3>
              <p className="text-slate-400 text-sm">Subjects Explored</p>
            </div>
            
            <div className="stats-card rounded-3xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-400 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">7</h3>
              <p className="text-slate-400 text-sm">Day Streak</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/companions/new"
                className="create-quiz-btn flex items-center space-x-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:scale-105 transition-all"
              >
                <Plus className="w-6 h-6" />
                <span>Create New Quiz</span>
                <Rocket className="w-5 h-5" />
              </Link>
            </div>
            
            {/* <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="pl-12 pr-6 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 backdrop-blur-xl"
                />
              </div>
              
              <button className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-colors backdrop-blur-xl">
                <Filter className="w-5 h-5" />
              </button>
              
              <button className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-colors backdrop-blur-xl">
                <Grid className="w-5 h-5" />
              </button>
            </div> */}
          </div>

          {/* Quiz Cards */}
          {quizzes.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 mb-6">
                <BookOpen className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">No Quizzes Yet</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                Start your learning journey by creating your first quiz or working with an AI tutor
              </p>
              <Link
                href="/companions"
                className="create-quiz-btn inline-flex items-center space-x-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg"
              >
                <Brain className="w-6 h-6" />
                <span>Browse AI Tutors</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, index) => (
                <div key={quiz.id} className="quiz-card rounded-3xl p-6 group">
                  {/* Quiz Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                          {quiz.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">
                            {new Date(quiz.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pulse-animation">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>

                  {/* Quiz Details */}
                  <div className="space-y-3 mb-6">
                    {quiz.topic && (
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300 font-medium">{quiz.topic}</span>
                      </div>
                    )}
                    
                    {quiz.subject && (
                      <div className="inline-block">
                        <span className="subject-tag px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                          {quiz.subject}
                        </span>
                      </div>
                    )}
                    
                    {quiz.companions && (
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-slate-300">
                          by <span className="font-semibold text-purple-300">{quiz.companions.name}</span>
                        </span>
                      </div>
                    )}
                    
                    {quiz.num_questions !== null && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">
                          {quiz.num_questions} Questions
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/quizzes/${quiz.id}`}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Start Quiz</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}