import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";


interface CompanionData {
  name: string;
  subject: string;
  teachingContent: string;
  voiceType: string;
  speakingStyle: string;
  language: string;
  icon: File | null;
  iconPreview: string;
}


const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  error,
  icon: Icon,
  required = false 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  icon: any;
  required?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Icon className="w-4 h-4" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-left flex items-center justify-between ${
            error 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
          }`}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || 'Select an option'}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
              >
                <span>{option}</span>
                {value === option && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormSelect