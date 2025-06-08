// app/(root)/quiz/[id]/page.tsx

import { getQuizById } from '@/lib/actions/gemini.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Target,
  Award,
  AlertCircle,
  Home,
  Brain,
  Trophy,
  Sparkles as SparklesIcon,
  Clock,
  User,
  Languages,
  CheckCircle,
  Play
} from 'lucide-react';

// Define the expected shape of your quiz data for type safety
interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "short_answer" | "fill_in_the_blank";
  text: string;
  options?: string[];
  correct_answer: string | string[];
  explanation?: string;
}

interface QuizData {
  id: string;
  title: string;
  subject: string | null;
  topic: string | null;
  language: string | null;
  num_questions: number | null;
  questions: QuizQuestion[] | null;
  user_id: string; // Clerk ID
  created_at: string;
}

interface QuizPageProps {
  params: {
    id: string;
  };
}

const getGamifiedQuizIcon = (quiz: QuizData) => {
  const titleLower = quiz.title?.toLowerCase() || "";
  const subjectLower = quiz.subject?.toLowerCase() || "";

  if (titleLower.includes("expert") || subjectLower.includes("advanced")) 
    return { icon: <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />, color: "from-yellow-400 to-orange-500" };
  if (titleLower.includes("challenge") || subjectLower.includes("hard")) 
    return { icon: <Brain className="w-6 h-6 sm:w-7 sm:h-7" />, color: "from-purple-500 to-pink-500" };
  if (titleLower.includes("fun") || subjectLower.includes("easy")) 
    return { icon: <SparklesIcon className="w-6 h-6 sm:w-7 sm:h-7" />, color: "from-pink-500 to-rose-400" };
  return { icon: <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />, color: "from-sky-500 to-blue-500" };
};

const ErrorPage = ({ 
  icon, 
  title, 
  description, 
  quizId,
  iconColor = "from-red-500 to-pink-500"
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  quizId?: string;
  iconColor?: string;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-6 sm:py-16">
    <div className="max-w-lg mx-auto">
      <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl text-center">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r ${iconColor} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{title}</h1>
        <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
          {description}
        </p>
        {quizId && (
          <div className="mb-6 p-3 bg-slate-700/50 rounded-xl">
            <p className="text-slate-400 text-sm">Quiz ID: <span className="font-mono text-slate-300">{quizId}</span></p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/my-quizzes"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg flex-1"
          >
            <BookOpen className="w-5 h-5" />
            <span>My Quizzes</span>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-xl sm:rounded-2xl font-semibold hover:bg-slate-600 transition-colors shadow-lg flex-1"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    redirect(`/sign-in?redirectUrl=/quiz/${id}`);
  }

  if (!params || !id || id === "undefined") {
    console.error("Quiz ID is undefined, invalid from params, or params object is missing:", params);
    return (
      <ErrorPage
        icon={<AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
        title="Invalid Quiz ID"
        description="The Quiz ID provided in the URL is not valid or has been corrupted."
        iconColor="from-red-500 to-pink-500"
      />
    );
  }

  let quiz: QuizData | null = null;
  let fetchError: string | null = null;

  console.log(`Fetching quiz with ID: ${id} for user: ${clerkUserId}`);

  try {
    quiz = await getQuizById(id);
  } catch (error) {
    console.error(`Failed to fetch quiz with ID ${id}:`, error);
    if (error instanceof Error) fetchError = error.message;
    else fetchError = "An unknown error occurred while fetching the quiz.";
  }

  if (fetchError) {
    return (
      <ErrorPage
        icon={<AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
        title="Error Loading Quiz"
        description={fetchError}
        quizId={id}
        iconColor="from-red-500 to-pink-500"
      />
    );
  }

  if (!quiz) {
    return (
      <ErrorPage
        icon={<BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
        title="Quiz Not Found"
        description={`The quiz with ID "${id}" could not be found or may have been deleted.`}
        iconColor="from-yellow-500 to-orange-500"
      />
    );
  }

  if (quiz.user_id !== clerkUserId) {
    return (
      <ErrorPage
        icon={<AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
        title="Access Denied"
        description="You do not have permission to view this quiz. This quiz belongs to another user."
        iconColor="from-red-500 to-pink-500"
      />
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch { 
      return 'Unknown date'; 
    }
  };

  const { icon: quizIcon, color: iconColor } = getGamifiedQuizIcon(quiz);
  const questionCount = quiz.questions?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
      {/* Mobile-First Navigation Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/70 backdrop-blur-xl sticky top-0 z-20">
        <div className="px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/my-quizzes"
              className="flex items-center gap-2 text-slate-400 hover:text-sky-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </Link>
            
            {/* Mobile Quiz Title */}
            <div className="flex items-center gap-2 flex-1 justify-center max-w-xs">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${iconColor} shadow-lg`}>
                {quizIcon}
              </div>
              <h1 className="text-base sm:text-lg font-semibold text-slate-100 truncate">
                {quiz.title}
              </h1>
            </div>
            
            {/* Question count badge */}
            <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1.5 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">{questionCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:py-8">
        {/* Enhanced Quiz Header Card - Mobile Optimized */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
            
            {/* Quiz Title Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className={`inline-flex p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${iconColor} shadow-lg mb-4`}>
                {React.cloneElement(quizIcon as React.ReactElement, { 
                  className: "w-8 h-8 sm:w-10 sm:h-10 text-white" 
                })}
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 mb-3 sm:mb-4 leading-tight">
                {quiz.title}
              </h2>
              <p className="text-slate-400 text-base sm:text-lg mb-4">
                Ready to test your knowledge? {questionCount} questions await your expertise!
              </p>
              
              {/* Start Quiz CTA Button */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl sm:rounded-2xl font-semibold shadow-lg">
                <Play className="w-5 h-5" />
                <span>Let's Begin!</span>
              </div>
            </div>

            {/* Quiz Stats Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { 
                  label: "Subject", 
                  value: quiz.subject || "General", 
                  icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />, 
                  color: "from-blue-500 to-cyan-400",
                  bgColor: "bg-blue-500/10",
                  textColor: "text-blue-400"
                },
                { 
                  label: "Topic", 
                  value: quiz.topic || "Mixed", 
                  icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, 
                  color: "from-green-500 to-emerald-400",
                  bgColor: "bg-green-500/10",
                  textColor: "text-green-400"
                },
                { 
                  label: "Questions", 
                  value: questionCount.toString(), 
                  icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, 
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-500/10",
                  textColor: "text-purple-400"
                },
                { 
                  label: "Created", 
                  value: formatDate(quiz.created_at), 
                  icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />, 
                  color: "from-orange-500 to-red-500",
                  bgColor: "bg-orange-500/10",
                  textColor: "text-orange-400"
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-700/30 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-600/30 text-center hover:bg-slate-700/40 transition-colors shadow-lg">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-xl ${item.bgColor} backdrop-blur-sm flex items-center justify-center border border-slate-600/20`}>
                    <div className={item.textColor}>
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="text-slate-100 font-semibold text-sm sm:text-base truncate">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional Quiz Metadata - Collapsible on Mobile */}
            {quiz.language && (
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="flex items-center justify-center gap-3 text-slate-400">
                  <Languages className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Language: </span>
                  <span className="text-slate-300 font-medium">{quiz.language}</span>
                </div>
              </div>
            )}

            {/* Quick Tips Section */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-slate-700/30 rounded-xl sm:rounded-2xl border border-slate-600/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-200 font-semibold text-sm sm:text-base mb-2">Quick Tips</h3>
                  <ul className="text-slate-400 text-xs sm:text-sm space-y-1 leading-relaxed">
                    <li>• Each question has a 30-second timer</li>
                    <li>• You can navigate between questions</li>
                    <li>• Explanations are provided after each answer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quiz Component */}
        <InteractiveQuiz quiz={quiz} />
      </div>
    </div>
  );
}