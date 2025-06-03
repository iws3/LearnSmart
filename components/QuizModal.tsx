// QuizPromptModal.tsx
import React from 'react';
import { X, FileText, ArrowRight } from 'lucide-react';

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

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-opacity duration-300"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-3xl shadow-2xl w-full max-w-lg p-8 sm:p-10 relative transform transition-all duration-300 scale-100 opacity-100 border border-slate-200/70"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200/50"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <FileText size={40} className="text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Session Complete!
          </h2>
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            Great job learning about <strong className="text-purple-600">{topic}</strong> in <strong className="text-blue-600">{subject}</strong> with {tutorName}!
          </p>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Ready to test your knowledge and solidify your understanding?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={onTakeQuiz}
              className="flex-1 w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <span>Take the Quiz</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={onClose}
              className="flex-1 w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-100/80 border border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPromptModal;