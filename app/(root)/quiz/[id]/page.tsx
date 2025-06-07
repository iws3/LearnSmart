// app/(root)/quiz/[id]/page.tsx

import { getQuizById } from '@/lib/actions/gemini.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import InteractiveQuiz from '@/components/InteractiveQuiz'; // Ensure this is the correct path
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
  Sparkles as SparklesIcon
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

  if (titleLower.includes("expert") || subjectLower.includes("advanced")) return <Trophy className="w-7 h-7 text-yellow-300" />;
  if (titleLower.includes("challenge") || subjectLower.includes("hard")) return <Brain className="w-7 h-7 text-purple-300" />;
  if (titleLower.includes("fun") || subjectLower.includes("easy")) return <SparklesIcon className="w-7 h-7 text-pink-300" />;
  return <BookOpen className="w-7 h-7 text-sky-300" />;
};

export default async function QuizPage({ params }: QuizPageProps) {
  // CORRECTED LINE: Removed 'await'
  const {id} = params;

  const { userId: clerkUserId } = await auth(); // auth() is async, so await here is correct

  if (!clerkUserId) {
    redirect(`/sign-in?redirectUrl=/quiz/${id}`);
  }

  // It's good practice to check if params itself is defined, though Next.js usually ensures this for route params
  if (!params || !id || id === "undefined") {
    console.error("Quiz ID is undefined, invalid from params, or params object is missing:", params);
     return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Invalid Quiz ID</h1>
              <p className="text-slate-400 text-lg mb-8">
                The Quiz ID provided in the URL is not valid or has been corrupted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/my-quizzes"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>My Quizzes</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-600 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let quiz: QuizData | null = null;
  let fetchError: string | null = null;

  console.log(`Fetching quiz with ID: ${id} for user: ${clerkUserId}`); // Added clerkUserId for context

  try {
    quiz = await getQuizById(id);
    // console.log("Fetched quiz data:", quiz); // Good for debugging
  } catch (error) {
    console.error(`Failed to fetch quiz with ID ${id}:`, error);
    if (error instanceof Error) fetchError = error.message;
    else fetchError = "An unknown error occurred while fetching the quiz.";
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Error Loading Quiz</h1>
              <p className="text-red-400 text-lg mb-2">{fetchError}</p>
              <p className="text-slate-400 mb-8">Quiz ID: {id}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/my-quizzes"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>My Quizzes</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-600 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Quiz Not Found</h1>
              <p className="text-slate-400 text-lg mb-8">
                The quiz with ID "{id}" could not be found or may have been deleted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/my-quizzes"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>My Quizzes</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-600 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quiz.user_id !== clerkUserId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
              <p className="text-slate-400 text-lg mb-8">
                You do not have permission to view this quiz. This quiz belongs to another user.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/my-quizzes"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>My Quizzes</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-600 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return 'Unknown date'; }
  };

  const quizIcon = getGamifiedQuizIcon(quiz);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
      <div className="border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/my-quizzes"
              className="flex items-center space-x-2 text-slate-400 hover:text-sky-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>All Quizzes</span>
            </Link>
            <div className="flex items-center space-x-3">
              {quizIcon}
              <h1 className="text-lg sm:text-xl font-semibold text-slate-100 truncate">{quiz.title}</h1>
            </div>
             <div className="w-1/3"> {/* Placeholder for balance or can be removed */} </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/50">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 mb-2">
                {quiz.title}
              </h2>
              <p className="text-slate-400 text-lg">
                Challenge accepted! {quiz.questions?.length || 0} questions await.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm">
              {[
                { label: "Subject", value: quiz.subject, icon: <BookOpen/>, color: "from-blue-500 to-cyan-400" },
                { label: "Topic", value: quiz.topic, icon: <Target/>, color: "from-green-500 to-emerald-400" },
                { label: "Questions", value: quiz.questions?.length || 0, icon: <Award/>, color: "from-purple-500 to-pink-500" },
                { label: "Created", value: formatDate(quiz.created_at), icon: <Calendar/>, color: "from-orange-500 to-red-500" },
              ].map((item, idx) => item.value ? (
                <div key={idx} className="bg-slate-700/40 p-4 rounded-xl border border-slate-600/50 text-center shadow-lg">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}>
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5"})}
                  </div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-slate-100 font-semibold truncate">{item.value}</p>
                </div>
              ) : null)}
            </div>
          </div>
        </div>

        {/* Interactive Quiz Component */}
        <InteractiveQuiz quiz={quiz} />
      </div>
    </div>
  );
}