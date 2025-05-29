"use client"
import React, { useState } from 'react';
import { 
  Upload, 
  User, 
  BookOpen, 
  MessageCircle,
  Mic,
  Globe,
  Target,
  Sparkles,
  Camera,
  Save,
  Eye,
  ChevronDown,
  X,
  Check
} from 'lucide-react';

// Types
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

// Form Components
const FileUpload = ({ onFileSelect, preview, error }: {
  onFileSelect: (file: File) => void;
  preview: string;
  error?: string;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Companion Icon
      </label>
      <div className="relative">
        <div className={`group relative w-32 h-32 mx-auto border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50'
        }`}>
          {preview ? (
            <div className="relative w-full h-full">
              <img 
                src={preview} 
                alt="Companion preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-blue-500 transition-colors">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Upload Icon</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <p className="text-xs text-gray-500 text-center">
        Upload a square image (PNG, JPG) up to 2MB
      </p>
    </div>
  );
};

const FormInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  icon: Icon,
  required = false 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  icon: any;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Icon className="w-4 h-4" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-gray-200 bg-white focus:border-blue-500 focus:bg-blue-50/50'
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const FormTextarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  icon: Icon,
  required = false 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  icon: any;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Icon className="w-4 h-4" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-gray-200 bg-white focus:border-blue-500 focus:bg-blue-50/50'
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

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

const PreviewCard = ({ data }: { data: CompanionData }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
    <div className="flex items-center gap-2 mb-4">
      <Eye className="w-5 h-5 text-blue-600" />
      <h3 className="text-lg font-bold text-gray-900">Preview</h3>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-200 overflow-hidden flex-shrink-0">
          {data.iconPreview ? (
            <img src={data.iconPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{data.name || 'Companion Name'}</h4>
          <p className="text-sm text-gray-600">{data.subject || 'Subject'}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Mic className="w-4 h-4 text-purple-600" />
          <span className="text-gray-700">{data.voiceType || 'Voice Type'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">{data.speakingStyle || 'Speaking Style'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">{data.language || 'Language'}</span>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const CompanionBuilder = () => {
  const [formData, setFormData] = useState<CompanionData>({
    name: '',
    subject: '',
    teachingContent: '',
    voiceType: '',
    speakingStyle: '',
    language: '',
    icon: null,
    iconPreview: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const voiceTypes = [
    'Professional Female',
    'Professional Male',
    'Friendly Female',
    'Friendly Male',
    'Energetic Female',
    'Energetic Male',
    'Calm Female',
    'Calm Male'
  ];

  const speakingStyles = [
    'Conversational',
    'Formal Academic',
    'Enthusiastic',
    'Patient & Encouraging',
    'Direct & Clear',
    'Storytelling',
    'Question-Based',
    'Interactive'
  ];

  const languages = [
    'English (US)',
    'English (UK)',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Mandarin',
    'Japanese',
    'Korean'
  ];

  const handleFileSelect = (file: File) => {
    setFormData(prev => ({ ...prev, icon: file }));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, iconPreview: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
    
    if (errors.icon) {
      setErrors(prev => ({ ...prev, icon: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Companion name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.teachingContent.trim()) newErrors.teachingContent = 'Teaching content is required';
    if (!formData.voiceType) newErrors.voiceType = 'Voice type is required';
    if (!formData.speakingStyle) newErrors.speakingStyle = 'Speaking style is required';
    if (!formData.language) newErrors.language = 'Language is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Companion Data:', formData);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI Companion Builder</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Perfect
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Learning Companion
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Design an AI tutor that matches your learning style and teaching preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    preview={formData.iconPreview}
                    error={errors.icon}
                  />
                </div>
                
                <div className="space-y-6">
                  <FormInput
                    label="Companion Name"
                    value={formData.name}
                    onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                    placeholder="e.g., Professor Einstein, Dr. Code"
                    error={errors.name}
                    icon={User}
                    required
                  />
                  
                  <FormInput
                    label="Subject/Field"
                    value={formData.subject}
                    onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                    placeholder="e.g., Mathematics, Computer Science"
                    error={errors.subject}
                    icon={BookOpen}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teaching Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                Teaching Focus
              </h2>
              
              <FormTextarea
                label="What should this companion teach?"
                value={formData.teachingContent}
                onChange={(value) => setFormData(prev => ({ ...prev, teachingContent: value }))}
                placeholder="Describe the topics, concepts, or skills this companion should focus on. Be specific about the learning objectives and target audience."
                error={errors.teachingContent}
                icon={BookOpen}
                required
              />
            </div>

            {/* Voice & Communication */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Mic className="w-6 h-6 text-green-600" />
                Voice & Communication
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Voice Type"
                  value={formData.voiceType}
                  onChange={(value) => setFormData(prev => ({ ...prev, voiceType: value }))}
                  options={voiceTypes}
                  error={errors.voiceType}
                  icon={Mic}
                  required
                />
                
                <FormSelect
                  label="Speaking Style"
                  value={formData.speakingStyle}
                  onChange={(value) => setFormData(prev => ({ ...prev, speakingStyle: value }))}
                  options={speakingStyles}
                  error={errors.speakingStyle}
                  icon={MessageCircle}
                  required
                />
              </div>
              
              <div className="mt-6">
                <FormSelect
                  label="Language"
                  value={formData.language}
                  onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                  options={languages}
                  error={errors.language}
                  icon={Globe}
                  required
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <PreviewCard data={formData} />
            
            {/* Submit Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Companion...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Companion
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-green-800">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Success!</h3>
                    <p className="text-sm">Your companion has been created successfully.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionBuilder;