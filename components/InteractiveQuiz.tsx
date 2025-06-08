"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock, Award,
  ChevronLeft, ChevronRight, RotateCcw, Zap, Smile, Meh, Frown, Sparkles, Trophy, Brain, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
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
  questions: QuizQuestion[] | null;
}

interface InteractiveQuizProps {
  quiz: QuizData;
}

interface FeedbackContent {
  type: 'correct' | 'wrong' | 'timeout';
  emoji: string;
  message: string;
  explanation?: string;
}

const EMOJIS = {
  correct: ['🥳', '🎉', '🤩', '🚀', '🌟', '👍', '💯', '✨', '✔️', '🎯'],
  wrong: ['😂', '🤪', '😬', '🙈', '🤦‍♂️', '🤷‍♀️', '🤨', '👀', '😅', '🤣'],
  motivational: [
    "Nailed it!", "Awesome!", "You're a star!", "Keep it up!", "Brilliant!",
    "Fantastic!", "Super!", "Correct!", "Great job!", "Spot on!"
  ],
  encouragement: [
    "Almost!", "Nice try!", "So close!", "Don't give up!", "Keep thinking!",
    "Not quite!", "Try again next time!", "A valiant effort!"
  ],
};

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const TIME_PER_QUESTION = 30;
const FEEDBACK_DISPLAY_DURATION = 4500; // Increased from 3500ms to 4500ms

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackContent | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const questions = quiz.questions || [];

  // Auto-scroll to quiz on mount
  useEffect(() => {
    const scrollToQuiz = () => {
      if (quizContainerRef.current) {
        const yOffset = -20; // Offset from top
        const element = quizContainerRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    };

    // Delay to ensure component is fully rendered
    const timer = setTimeout(scrollToQuiz, 300);
    return () => clearTimeout(timer);
  }, []);

  const resetTimerAndFeedback = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIME_PER_QUESTION);
    setIsAnswered(false);
    setFeedback(null);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  useEffect(() => {
    resetTimerAndFeedback();
  }, [currentQuestionIndex, resetTimerAndFeedback]);

  const handleTimeUp = useCallback(() => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: null }));
    const currentQuestion = questions[currentQuestionIndex];
    const explanation = currentQuestion?.explanation;

    const newFeedback: FeedbackContent = {
      type: 'timeout',
      emoji: '⏳',
      message: "Time's up! Moving on...",
      explanation
    };
    setFeedback(newFeedback);
  }, [currentQuestionIndex, questions, isAnswered]);

  useEffect(() => {
    if (!isAnswered && !quizFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered && !quizFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      handleTimeUp();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isAnswered, quizFinished, handleTimeUp]);

  useEffect(() => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    if (feedback) {
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
      }, FEEDBACK_DISPLAY_DURATION);
    }
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, [feedback]);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setIsAnswered(true);
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = Array.isArray(currentQuestion.correct_answer)
      ? currentQuestion.correct_answer.includes(option)
      : currentQuestion.correct_answer === option;

    const explanation = currentQuestion.explanation;
    let newFeedback: FeedbackContent;

    if (isCorrect) {
      setScore(prev => prev + 1);
      newFeedback = {
        type: 'correct',
        emoji: getRandomItem(EMOJIS.correct),
        message: getRandomItem(EMOJIS.motivational),
        explanation
      };
    } else {
      newFeedback = {
        type: 'wrong',
        emoji: getRandomItem(EMOJIS.wrong),
        message: getRandomItem(EMOJIS.encouragement),
        explanation
      };
    }
    setFeedback(newFeedback);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      setFeedback(null);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(0);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizFinished(false);
  };

  const getQuizNicknameAndBadge = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { nickname: "Quiz Virtuoso", badge: <Trophy className="w-12 h-12 text-yellow-400" />, color: "text-yellow-400" };
    if (percentage >= 75) return { nickname: "Brainiac Challenger", badge: <Award className="w-12 h-12 text-sky-400" />, color: "text-sky-400" };
    if (percentage >= 50) return { nickname: "Knowledge Seeker", badge: <Sparkles className="w-12 h-12 text-purple-400" />, color: "text-purple-400" };
    if (percentage >= 25) return { nickname: "Curious Explorer", badge: <Brain className="w-12 h-12 text-green-400" />, color: "text-green-400" };
    return { nickname: "Aspiring Learner", badge: <Target className="w-12 h-12 text-orange-400" />, color: "text-orange-400" };
  };

  if (quizFinished) {
    const { nickname, badge, color } = getQuizNicknameAndBadge();
    return (
      <motion.div
        ref={quizContainerRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto my-8 sm:my-12 p-6 sm:p-8 bg-slate-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700 text-center"
      >
        <div className="mb-4 sm:mb-6">{badge}</div>
        <h2 className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 ${color}`}>{nickname}!</h2>
        <p className="text-xl sm:text-2xl text-slate-200 mb-1 sm:mb-2">Quiz Complete!</p>
        <p className="text-lg sm:text-xl text-slate-300 mb-4 sm:mb-6">
          You scored <span className="font-bold text-sky-400">{score}</span> out of <span className="font-bold text-slate-200">{questions.length}</span> questions.
        </p>
        <div className="my-4 sm:my-6 p-3 sm:p-4 bg-slate-700/50 rounded-xl">
          <h3 className="text-base sm:text-lg font-semibold text-slate-200 mb-2">Your Performance:</h3>
          <div className="w-full bg-slate-600 rounded-full h-4 sm:h-6">
            <motion.div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-4 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-white"
              initial={{ width: 0 }}
              animate={{ width: `${(score / questions.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {Math.round((score / questions.length) * 100)}%
            </motion.div>
          </div>
        </div>
        <button
          onClick={handleRestartQuiz}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-2 w-full sm:w-auto mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl sm:rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg text-base sm:text-lg"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Play Again</span>
        </button>
      </motion.div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center text-slate-400 p-8">This quiz has no questions.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div className="text-center text-red-400 p-8">Error: Could not load current question.</div>;
  }
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  let displayOptions: string[] = [];
  if (currentQuestion.type === "true_false") {
    if (currentQuestion.options && currentQuestion.options.length > 0) {
      displayOptions = currentQuestion.options;
    } else {
      displayOptions = ["True", "False"];
    }
  } else if (currentQuestion.options) {
    displayOptions = currentQuestion.options;
  }

  const isNextButtonDisabled = !isAnswered || !!feedback;

  return (
    <div ref={quizContainerRef} className="max-w-4xl mx-auto my-6 sm:my-8 p-4 sm:p-6 lg:p-10">
      {/* Mobile-First Quiz Container */}
      <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden">
        
        {/* Progress Bar and Question Counter - Mobile Optimized */}
        <div className="p-4 sm:p-6 border-b border-slate-700/50">
          <div className="flex justify-between items-center text-slate-300 mb-3">
            <span className="text-sm sm:text-base font-medium">
              Question <span className="text-sky-400 font-bold">{currentQuestionIndex + 1}</span> of {questions.length}
            </span>
            <span className="text-sm sm:text-base font-medium">
              Score: <span className="text-green-400 font-bold">{score}</span>
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3">
            <motion.div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 sm:h-3 rounded-full"
              initial={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Timer - Mobile Optimized */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-700/50 rounded-full px-4 sm:px-6 py-2 sm:py-3">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <span className="text-slate-300 text-sm sm:text-base font-medium">Time Left:</span>
              <span className={`text-lg sm:text-xl font-bold min-w-[3rem] text-center ${
                timeLeft <= 10 && timeLeft > 0 
                  ? 'text-red-400 animate-pulse' 
                  : timeLeft === 0 
                    ? 'text-slate-500' 
                    : 'text-yellow-400'
              }`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Question Text - Mobile Optimized */}
        <div className="px-4 sm:px-6 mb-6 sm:mb-8">
          <motion.div
            key={`question_text_${currentQuestion.id || currentQuestionIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-slate-100 text-center leading-relaxed px-2">
              {currentQuestion.text}
            </h2>
          </motion.div>
        </div>

        {/* Options - Mobile Optimized */}
        <div className="px-4 sm:px-6 space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {displayOptions.map((option, index) => {
            const answerForThisQuestion = selectedAnswers[currentQuestionIndex];
            const isSelected = answerForThisQuestion === option;
            
            const isCorrectAnswer = Array.isArray(currentQuestion.correct_answer)
              ? currentQuestion.correct_answer.includes(option)
              : currentQuestion.correct_answer === option;

            let buttonClass = "w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform focus:outline-none focus:ring-4 ring-offset-2 ring-offset-slate-800 font-medium text-sm sm:text-base lg:text-lg shadow-md ";
            
            const questionHasBeenAttemptedOrIsReviewed = isAnswered || selectedAnswers[currentQuestionIndex] !== undefined;

            if (questionHasBeenAttemptedOrIsReviewed) { 
              if (isCorrectAnswer) {
                buttonClass += "bg-green-500/80 border-green-400 text-white ring-green-500";
              } else if (isSelected && !isCorrectAnswer) { 
                buttonClass += "bg-red-500/80 border-red-400 text-white ring-red-500";
              } else { 
                buttonClass += "bg-slate-700 border-slate-600 text-slate-400 opacity-60 cursor-not-allowed";
              }
            } else {
               buttonClass += "bg-slate-700/80 border-slate-600 hover:border-sky-500 text-slate-200 hover:text-white active:scale-[0.98]";
            }

            return (
              <motion.button
                key={`${currentQuestion.id}_option_${index}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className={buttonClass}
                whileHover={!isAnswered ? { y: -2, scale: 1.01 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  {currentQuestion.type !== "true_false" && (
                    <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 font-bold text-xs sm:text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                  )}
                  <span className="flex-1">{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Navigation Buttons - Mobile Optimized */}
        <div className="p-4 sm:p-6 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0 || quizFinished}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-700 text-slate-300 rounded-xl sm:rounded-2xl font-semibold hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md order-2 sm:order-1"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={isNextButtonDisabled}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-lg order-1 sm:order-2"
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Feedback Pop-up - Mobile Optimized */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            key="feedback-popup"
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{
              opacity: 1, y: 0, scale: 1,
              transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 }
            }}
            exit={{ 
              opacity: 0, y: 80, scale: 0.8,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            className={`fixed inset-x-4 md:bottom-9 bottom-[50%]  right-7 sm:left-auto sm:max-w-sm p-4 sm:p-6 rounded-2xl shadow-2xl border-2 z-50 text-center
              ${feedback.type === 'correct' 
                ? 'bg-green-600/95 border-green-500' 
                : feedback.type === 'timeout' 
                  ? 'bg-yellow-500/95 border-yellow-400' 
                  : 'bg-red-600/95 border-red-500'}
              backdrop-blur-lg`}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1, 1.2, 1], 
                rotate: [0, -10, 10, -5, 5, 0] 
              }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="text-4xl sm:text-5xl mb-3"
            >
              {feedback.emoji}
            </motion.div>
            <p className="text-lg sm:text-xl font-bold text-white mb-2">{feedback.message}</p>
            {feedback.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-3 p-3 bg-black/20 rounded-lg"
              >
                <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed">
                  <strong className="font-semibold">💡 Explanation:</strong>
                  <br />
                  {feedback.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveQuiz;