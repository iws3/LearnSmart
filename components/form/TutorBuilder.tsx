"use client"
import { useState } from "react";
// import { createCompanion } from "@/path/to/your/server-actions"; // Update this path

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
  Check,
  Clock,
  Zap,
  Heart
} from 'lucide-react';
import FormInput from "./FormInput";
import FileUpload from "./FileUpload";
import FormTextarea from "./TextArea";
import FormSelect from "./FormSelect";
import PreviewCard from "./PreviewCard";
import { createCompanion } from "@/lib/actions/aiCompanion.action";
import { useRouter } from "next/navigation";



const CompanionBuilder = () => {
  const router=useRouter()
   const [formData, setFormData] = useState<CompanionData>({
    name: '',
    subject: '',
    topic:'',
    teaching_content: '', // Updated to match interface
    voice_type: '', // Updated to match interface
    speaking_style: '', // Updated to match interface
    language: '',
    chat_duration: 0, // Changed to number
    learning_style: '', // Updated to match interface
    motivation_level: '', // Updated to match interface
    icon: null,
    iconPreview: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

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

  const motivationLevels = [
    'High Energy & Enthusiastic',
    'Calm & Supportive',
    'Goal-Oriented & Results-Focused',
    'Patient & Understanding',
    'Challenging & Pushing'
  ];

  const learningStyles = [
    'Visual (diagrams, charts, images)',
    'Auditory (explanations, discussions)',
    'Kinesthetic (hands-on, practical)',
    'Reading/Writing (text-based)',
    'Mixed Learning Style'
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
    if (!formData.teaching_content.trim()) newErrors.teaching_content = 'Teaching content is required';
    if (!formData.voice_type) newErrors.voice_type = 'Voice type is required';
    if (!formData.speaking_style) newErrors.speaking_style = 'Speaking style is required';
    if (!formData.language) newErrors.language = 'Language is required';
       if (!formData.topic) newErrors.topic = 'Topic is required';
    
    
    // Chat duration validation
    if (!formData.chat_duration) {
      newErrors.chat_duration = 'Chat duration is required';
    } else {
      const duration = formData.chat_duration;
      if (isNaN(duration) || duration <= 0 || duration > 6) {
        newErrors.chat_duration = 'Chat duration must be between 1 and 6 minutes';
      }
    }
    
    if (!formData.learning_style) newErrors.learning_style = 'Learning style is required';
    if (!formData.motivation_level) newErrors.motivation_level = 'Motivation level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Prepare data for server action (exclude UI-only fields)
      const companionData: CreateCompanion = {
        name: formData.name,
        subject: formData.subject,
        topic:formData.topic,
        teaching_content: formData.teaching_content,
        voice_type: formData.voice_type,
        speaking_style: formData.speaking_style,
        language: formData.language,
        chat_duration: formData.chat_duration,
        learning_style: formData.learning_style,
        motivation_level: formData.motivation_level,
      };

      const result = await createCompanion(companionData);
      
      console.log('Companion created successfully:', result);
      setShowSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          subject: '',
          topic:'',
          teaching_content: '',
          voice_type: '',
          speaking_style: '',
          language: '',
          chat_duration: 0,
          learning_style: '',
          motivation_level: '',
          icon: null,
          iconPreview: ''
        });
      }, 3000);

      // push to the the staff room, if teacher was created
      router.push("/companions")
    } catch (error) {
      console.error('Error creating companion:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to create companion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              Personalize Tutor
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
                  <FormInput
                    label="Topic/Interested In"
                    value={formData.topic as string }
                    onChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}
                    placeholder="e.g., Optics | Trigonometry |  Waves"
                    error={errors.topic}
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
                value={formData.teaching_content}
                onChange={(value) => setFormData(prev => ({ ...prev, teaching_content: value }))}
                placeholder="Describe the topics, concepts, or skills this companion should focus on. Be specific about the learning objectives and target audience."
                error={errors.teaching_content}
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
                  value={formData.voice_type}
                  onChange={(value) => setFormData(prev => ({ ...prev, voice_type: value }))}
                  options={voiceTypes}
                  error={errors.voice_type}
                  icon={Mic}
                  required
                />
                
                <FormSelect
                  label="Speaking Style"
                  value={formData.speaking_style}
                  onChange={(value) => setFormData(prev => ({ ...prev, speaking_style: value }))}
                  options={speakingStyles}
                  error={errors.speaking_style}
                  icon={MessageCircle}
                  required
                />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Language"
                  value={formData.language}
                  onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                  options={languages}
                  error={errors.language}
                  icon={Globe}
                  required
                />
                         
                <FormInput
                  label="Chat Duration (minutes)"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.chat_duration.toString()}
                  onChange={(value) => setFormData(prev => ({ ...prev, chat_duration: parseInt(value) || 0 }))}
                  placeholder="1-6 minutes"
                  error={errors.chat_duration}
                  icon={Clock}
                  required
                />
              </div>
            </div>

            {/* Personalization Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-600" />
                Personalization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Preferred Learning Style"
                  value={formData.learning_style}
                  onChange={(value) => setFormData(prev => ({ ...prev, learning_style: value }))}
                  options={learningStyles}
                  error={errors.learning_style}
                  icon={BookOpen}
                  required
                />
                
                <FormSelect
                  label="Motivation & Energy Level"
                  value={formData.motivation_level}
                  onChange={(value) => setFormData(prev => ({ ...prev, motivation_level: value }))}
                  options={motivationLevels}
                  error={errors.motivation_level}
                  icon={Zap}
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
              
              {/* Error Message */}
              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}
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