// app/(root)/quiz/[id]/page.tsx

import { getQuizById } from '@/lib/actions/gemini.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AnswerQuiz from '@/components/AnswerQuiz';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Target, 
  Award,
  AlertCircle,
  Home
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

export default async function QuizPage({ params }: QuizPageProps) {
  const { id: quizIdFromParams } = params;
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    redirect(`/sign-in?redirectUrl=/quiz/${quizIdFromParams}`);
  }

  // Validate quiz ID
  if (!quizIdFromParams || quizIdFromParams === "undefined") {
    console.error("Quiz ID is undefined or invalid from params:", quizIdFromParams);
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

  console.log(`Fetching quiz with ID: ${quizIdFromParams}`);

  try {
    quiz = await getQuizById(quizIdFromParams);
    console.log("quiz is: ", quiz);
  } catch (error) {
    console.error(`Failed to fetch quiz with ID ${quizIdFromParams}:`, error);
    if (error instanceof Error) {
      fetchError = error.message;
    } else {
      fetchError = "An unknown error occurred while fetching the quiz.";
    }
  }

  // Error handling
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
              <p className="text-slate-400 mb-8">Quiz ID: {quizIdFromParams}</p>
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

  // Quiz not found
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
                The quiz with ID "{quizIdFromParams}" could not be found or may have been deleted.
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

  // Authorization check
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

  // Format the creation date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  // Main quiz render
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/my-quizzes"
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Quizzes</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">{quiz.title}</p>
                <p className="text-slate-400 text-sm">Taking Quiz</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-white mb-4">{quiz.title}</h1>
              <p className="text-slate-400 text-lg">
                Get ready to test your knowledge with {quiz.questions?.length || 0} questions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {quiz.subject && (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-400 text-sm">Subject</p>
                  <p className="text-white font-semibold">{quiz.subject}</p>
                </div>
              )}
              
              {quiz.topic && (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-400 text-sm">Topic</p>
                  <p className="text-white font-semibold">{quiz.topic}</p>
                </div>
              )}
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-slate-400 text-sm">Questions</p>
                <p className="text-white font-semibold">{quiz.questions?.length || 0}</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-slate-400 text-sm">Created</p>
                <p className="text-white font-semibold">{formatDate(quiz.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Component */}
        <AnswerQuiz quiz={quiz} />
      </div>
    </div>
  );
}