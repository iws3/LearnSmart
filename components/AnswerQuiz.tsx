// components/AnswerQuiz.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  RotateCcw,
  Target,
  Clock,
  Award,
  BookOpen
} from 'lucide-react';

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
  user_id: string;
  created_at: string;
}

interface AnswerQuizProps {
  quiz: QuizData;
}

interface UserAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  timeTaken?: number;
}

const AnswerQuiz: React.FC<AnswerQuizProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const isCorrect = Array.isArray(currentQuestion.correct_answer) 
      ? currentQuestion.correct_answer.includes(selectedAnswer)
      : currentQuestion.correct_answer === selectedAnswer;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      isCorrect,
      timeTaken: Date.now() - startTime
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    setSelectedAnswer('');

    if (isLastQuestion) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Remove the last answer when going back
      setUserAnswers(prev => prev.slice(0, -1));
      setSelectedAnswer('');
    }
  };

  const handleShowResults = () => {
    const totalQuestions = questions.length;
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = Math.round((Date.now() - startTime) / 1000);

    // Console log all the data for AI processing
    console.log('=== QUIZ COMPLETION DATA ===');
    console.log('Quiz ID:', quiz.id);
    console.log('Quiz Title:', quiz.title);
    console.log('Subject:', quiz.subject);
    console.log('Topic:', quiz.topic);
    console.log('Total Questions:', totalQuestions);
    console.log('Correct Answers:', correctAnswers);
    console.log('Incorrect Answers:', incorrectAnswers);
    console.log('Score Percentage:', score);
    console.log('Total Time (seconds):', totalTime);
    console.log('User Answers:', userAnswers);
    
    // Detailed question analysis
    console.log('=== DETAILED QUESTION ANALYSIS ===');
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      console.log(`Question ${index + 1}:`, {
        questionId: question.id,
        questionText: question.text,
        questionType: question.type,
        correctAnswer: question.correct_answer,
        userAnswer: userAnswer?.answer,
        isCorrect: userAnswer?.isCorrect,
        explanation: question.explanation
      });
    });

    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setIsQuizCompleted(false);
    setShowResults(false);
  };

  if (showResults) {
    const totalQuestions = questions.length;
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-slate-400 text-lg">Here's how you performed</p>
        </div>

        {/* Score Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{score}%</h3>
            <p className="text-slate-400">Overall Score</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{correctAnswers}</h3>
            <p className="text-slate-400">Correct Answers</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{totalQuestions - correctAnswers}</h3>
            <p className="text-slate-400">Incorrect Answers</p>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Question Review</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              return (
                <div key={question.id} className="bg-slate-700/30 rounded-2xl p-4 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium text-lg flex-1 pr-4">
                      {index + 1}. {question.text}
                    </h4>
                    {userAnswer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Your Answer: </span>
                      <span className={userAnswer.isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {userAnswer.answer}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Correct Answer: </span>
                      <span className="text-green-400">
                        {Array.isArray(question.correct_answer) 
                          ? question.correct_answer.join(', ') 
                          : question.correct_answer}
                      </span>
                    </div>
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-slate-600/20 rounded-xl">
                      <span className="text-slate-400 text-sm font-medium">Explanation: </span>
                      <span className="text-slate-300 text-sm">{question.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Quiz</span>
          </button>
          
          <Link
            href="/my-quizzes"
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Back to Quizzes</span>
          </Link>
        </div>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
          <p className="text-slate-400 text-lg mb-8">
            You've answered all {questions.length} questions. Ready to see your results?
          </p>
          
          <button
            onClick={handleShowResults}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Show Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-slate-400 text-sm">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {currentQuestion.text}
        </h2>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                selectedAnswer === option
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-500'
                }`}>
                  {selectedAnswer === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}

          {currentQuestion.type === 'true_false' && (
            <>
              <button
                onClick={() => handleAnswerSelect('True')}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedAnswer === 'True'
                    ? 'border-green-500 bg-green-500/10 text-white'
                    : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === 'True'
                      ? 'border-green-500 bg-green-500'
                      : 'border-slate-500'
                  }`}>
                    {selectedAnswer === 'True' && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">True</span>
                </div>
              </button>
              
              <button
                onClick={() => handleAnswerSelect('False')}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedAnswer === 'False'
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === 'False'
                      ? 'border-red-500 bg-red-500'
                      : 'border-slate-500'
                  }`}>
                    {selectedAnswer === 'False' && (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">False</span>
                </div>
              </button>
            </>
          )}

         {(currentQuestion.type === 'short_answer' || currentQuestion.type === 'fill_in_the_blank') && (
            <textarea
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-2xl border-2 border-slate-600 bg-slate-700/30 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:bg-slate-700/50 transition-all resize-none"
              rows={4}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
              currentQuestionIndex === 0
                ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">Progress</p>
            <p className="text-white font-semibold">
              {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer.trim()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
              !selectedAnswer.trim()
                ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quiz Info Sidebar */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Quiz Info</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-slate-400 text-sm">Title</p>
              <p className="text-white font-medium">{quiz.title}</p>
            </div>
          </div>
          
          {quiz.subject && (
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">Subject</p>
                <p className="text-white font-medium">{quiz.subject}</p>
              </div>
            </div>
          )}
          
          {quiz.topic && (
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-slate-400 text-sm">Topic</p>
                <p className="text-white font-medium">{quiz.topic}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-slate-400 text-sm">Questions</p>
              <p className="text-white font-medium">{questions.length} total</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-2">Quick Tips:</p>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Read each question carefully</li>
            <li>• You can go back to previous questions</li>
            <li>• Take your time to think</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuiz;