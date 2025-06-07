import React from 'react';
import { X, FileText, ArrowRight, Sparkles, Trophy, Brain, Target, Zap } from 'lucide-react';

interface QuizPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakeQuiz: () => void;
  tutorName: string;
  topic: string;
  subject: string;
}

const QuizPromptModal: React.FC<QuizPromptModalProps> = ({
  isOpen,
  onClose,
  onTakeQuiz,
  tutorName,
  topic,
  subject
}) => {
  if (!isOpen) return null;

  const handleTakeQuiz = () => {
    window.location.href = '/quiz';
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl w-full max-w-lg p-8 sm:p-10 relative transform transition-all duration-300 scale-100 opacity-100 hover:bg-slate-800/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700/50 backdrop-blur-sm"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 font-medium text-sm">Session Complete!</span>
            <Sparkles className="w-4 h-4 text-green-400" />
          </div>

          {/* Icon with Gradient Background */}
          <div className="relative mb-6">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110">
              <FileText size={48} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
              <Trophy size={16} className="text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Knowledge Check
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-2xl sm:text-3xl">
              Time!
            </span>
          </h2>

          {/* Subject and Topic Info */}
          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 mb-6 w-full">
            <p className="text-slate-300 mb-2 text-sm">
              Great job mastering
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
                <Brain className="w-3 h-3" />
                {topic}
              </span>
              <span className="text-slate-400">in</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                <Target className="w-3 h-3" />
                {subject}
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              with <span className="text-blue-400 font-medium">{tutorName}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-400 mb-8 text-base leading-relaxed max-w-md">
            Ready to test your understanding and earn your achievement badge? 
            Let's see how much you've learned!
          </p>

          {/* Quiz Benefits */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-slate-300 text-xs font-medium">Quick Test</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <p className="text-slate-300 text-xs font-medium">Reinforce</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <p className="text-slate-300 text-xs font-medium">Earn Badge</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={handleTakeQuiz}
              className="group flex-1 w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span>Take the Quiz</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onClose}
              className="flex-1 w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-slate-300 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
            >
              Maybe Later
            </button>
          </div>

          {/* Small motivational text */}
          <p className="text-slate-500 text-xs mt-4 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Show off what you've learned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPromptModal;