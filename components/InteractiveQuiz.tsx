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
  options?: string[]; // Options are still optional for true/false if we default them
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
const FEEDBACK_DISPLAY_DURATION = 3500;

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
  const questions = quiz.questions || [];

  const resetTimerAndFeedback = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIME_PER_QUESTION);
    setIsAnswered(false);
    setFeedback(null);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []); // Removed currentQuestionIndex as it's not strictly needed for reset logic itself

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
      setTimeLeft(0); // Show timer as expired for previous questions
      // `isAnswered` and `feedback` will be reset by `resetTimerAndFeedback` via useEffect
      // The options will show their selected/correct state based on `selectedAnswers`
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizFinished(false);
    // resetTimerAndFeedback will be called by useEffect
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto my-12 p-8 bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-700 text-center"
      >
        <div className="mb-6">{badge}</div>
        <h2 className={`text-4xl font-bold mb-3 ${color}`}>{nickname}!</h2>
        <p className="text-2xl text-slate-200 mb-2">Quiz Complete!</p>
        <p className="text-xl text-slate-300 mb-6">
          You scored <span className="font-bold text-sky-400">{score}</span> out of <span className="font-bold text-slate-200">{questions.length}</span> questions.
        </p>
        <div className="my-6 p-4 bg-slate-700/50 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Your Performance:</h3>
          <div className="w-full bg-slate-600 rounded-full h-6">
            <motion.div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-6 rounded-full flex items-center justify-center text-sm font-medium text-white"
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
          className="mt-8 flex items-center justify-center gap-2 w-full sm:w-auto mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg text-lg"
        >
          <RotateCcw className="w-6 h-6" />
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

  // *** MODIFICATION FOR TRUE/FALSE OPTIONS START ***
  let displayOptions: string[] = [];
  if (currentQuestion.type === "true_false") {
    // If options are provided for true/false (e.g., custom labels like "Yes"/"No"), use them.
    // Otherwise, default to "True" and "False".
    if (currentQuestion.options && currentQuestion.options.length > 0) {
      displayOptions = currentQuestion.options;
    } else {
      displayOptions = ["True", "False"];
    }
  } else if (currentQuestion.options) {
    // For other types like multiple_choice, use provided options
    displayOptions = currentQuestion.options;
  }
  // For "short_answer" or "fill_in_the_blank", displayOptions will remain empty,
  // and the .map below won't render buttons, which is correct for those types.
  // *** MODIFICATION FOR TRUE/FALSE OPTIONS END ***

  const isNextButtonDisabled = !isAnswered || !!feedback;

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 sm:p-10 bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 relative">
      {/* Progress Bar and Question Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-slate-300 mb-2">
          <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full"
            initial={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center mb-6 text-2xl font-bold text-slate-200">
        <Clock className="w-7 h-7 mr-3 text-yellow-400 animate-pulse" />
        Time Left: <span className={`ml-2 ${timeLeft <= 10 && timeLeft > 0 ? 'text-red-400 animate-ping opacity-75' : timeLeft === 0 ? 'text-slate-500' : 'text-yellow-400'}`}>{timeLeft}s</span>
      </div>

      {/* Question Text */}
      <motion.div
        key={`question_text_${currentQuestion.id || currentQuestionIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-3 text-center leading-tight">
          {currentQuestion.text}
        </h2>
      </motion.div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {displayOptions.map((option, index) => { // Use `displayOptions` here
          const answerForThisQuestion = selectedAnswers[currentQuestionIndex];
          const isSelected = answerForThisQuestion === option;
          
          const isCorrectAnswer = Array.isArray(currentQuestion.correct_answer)
            ? currentQuestion.correct_answer.includes(option)
            : currentQuestion.correct_answer === option;

          let buttonClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 ring-offset-2 ring-offset-slate-800 font-medium text-lg shadow-md ";
          
          // Show feedback styling if an answer was made OR if coming back to an answered question
          // `isAnswered` is for the current live attempt.
          // `selectedAnswers[currentQuestionIndex]` indicates if this question (identified by index) has been answered in the past.
          const questionHasBeenAttemptedOrIsReviewed = isAnswered || selectedAnswers[currentQuestionIndex] !== undefined;

          if (questionHasBeenAttemptedOrIsReviewed) { 
            if (isCorrectAnswer) {
              buttonClass += "bg-green-500/80 border-green-400 text-white ring-green-500";
            } else if (isSelected && !isCorrectAnswer) { 
              buttonClass += "bg-red-500/80 border-red-400 text-white ring-red-500";
            } else { 
              buttonClass += "bg-slate-700 border-slate-600 text-slate-400 opacity-60 cursor-not-allowed";
            }
          } else { // Not answered yet for this attempt
             buttonClass += "bg-slate-700/80 border-slate-600 hover:border-sky-500 text-slate-200 hover:text-white";
          }

          return (
            <motion.button
              key={`${currentQuestion.id}_option_${index}`}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered} // Only disable based on the current attempt's `isAnswered` state
              className={buttonClass}
              whileHover={!isAnswered ? { y: -3, transition: { type: 'spring', stiffness: 400, damping: 10 } } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
            >
              {/* For True/False, we don't need A/B/C/D prefixes if it's just two options */}
              {currentQuestion.type !== "true_false" && <span className="mr-3 text-sky-300">{String.fromCharCode(65 + index)}.</span>}
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Pop-up */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            key="feedback-popup"
            initial={{ opacity: 0, y: 80, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1, y: 0, scale: 1, rotate: 0,
              transition: { type: "spring", stiffness: 380, damping: 18, mass: 0.9, delay: 0.1 }
            }}
            exit={{ opacity: 0, y: 60, scale: 0.7, rotate: 15, transition: { duration: 0.4, ease: "anticipate" } }}
            className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 p-5 sm:p-6 rounded-2xl shadow-xl border-2 z-50 text-center
              ${feedback.type === 'correct' ? 'bg-green-600/90 border-green-500' : feedback.type === 'timeout' ? 'bg-yellow-500/90 border-yellow-400' : 'bg-red-600/90 border-red-500'}
              backdrop-blur-md max-w-sm`}
          >
            <motion.div
              animate={{ scale: [1, 1.35, 1, 1.2, 1], rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2, repeat: 0 }}
              className="text-4xl sm:text-5xl mb-2 sm:mb-3"
            >
              {feedback.emoji}
            </motion.div>
            <p className="text-lg sm:text-xl font-semibold text-white mb-2">{feedback.message}</p>
            {feedback.explanation && (
                <p className="text-xs sm:text-sm text-slate-100/90 mt-2 italic max-w-xs mx-auto leading-snug">
                  <strong className="font-medium">Explanation:</strong> {feedback.explanation}
                </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0 || quizFinished}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 text-slate-300 rounded-2xl font-semibold hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Previous</span>
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={isNextButtonDisabled}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto shadow-lg"
        >
          <span>{currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;