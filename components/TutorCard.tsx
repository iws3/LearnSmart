'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MessageCircle, 
  Clock, 
  Mic, 
  Globe, 
  Heart, 
  Bookmark, 
  Share2,
  ChevronRight,
  Volume2,
  Eye,
  Calendar,
  Star,
  Award,
  Brain
} from 'lucide-react';

interface AITutor {
  id: string;
  created_at: string;
  name: string;
  subject: string;
  topic: string | null;
  voice_type: string;
  chat_duration: number;
  author: string;
  teaching_content: string;
  language: string;
  speaking_style: string;
  learning_style: string;
  motivation_level: string;
}

interface TutorCardProps {
  tutor: AITutor;
  avatarImage: string;
  coverImage: string;
  subjectColor: string;
}

const TutorCard: React.FC<TutorCardProps> = ({ 
  tutor, 
  avatarImage, 
  coverImage, 
  subjectColor 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Generate a rating based on tutor data (for demo purposes)
  const generateRating = (id: string) => {
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return (4.2 + (Math.abs(hash) % 8) / 10);
  };

  const rating = generateRating(tutor.id);
  const studentCount = Math.floor(Math.random() * 1000) + 100;

  // Get voice type icon
  const getVoiceIcon = (voiceType: string) => {
    return voiceType.toLowerCase().includes('female') ? '👩‍🏫' : '👨‍🏫';
  };

  // Get speaking style badge color
  const getSpeakingStyleColor = (style: string) => {
    const colors = {
      'Conversational': 'bg-blue-100 text-blue-700 border-blue-200',
      'Enthusiastic': 'bg-orange-100 text-orange-700 border-orange-200',
      'Professional': 'bg-purple-100 text-purple-700 border-purple-200',
      'Friendly': 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[style as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${subjectColor} opacity-90`}></div>
        <Image
          src={coverImage}
          alt={`${tutor.name} cover`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Subject badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
            {tutor.subject}
          </span>
        </div>
      </div>

      {/* Avatar positioned to overlap cover */}
      <div className="relative -mt-12 flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
            <Image
              src={avatarImage}
              alt={tutor.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          {/* Online status */}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6 pt-4">
        {/* Name and Voice Type */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
            {tutor.name}
            <span className="text-lg">{getVoiceIcon(tutor.voice_type)}</span>
          </h3>
          <p className="text-sm text-gray-500">{tutor.voice_type}</p>
        </div>

        {/* Topic */}
        {tutor.topic && (
          <div className="text-center mb-4">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Specializes in {tutor.topic}
            </span>
          </div>
        )}

        {/* Teaching Content */}
        {tutor.teaching_content && tutor.teaching_content !== 'no' && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm text-center leading-relaxed line-clamp-2">
              "{tutor.teaching_content}"
            </p>
          </div>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{studentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{tutor.chat_duration}m avg</span>
          </div>
        </div>

        {/* Speaking Style */}
        <div className="flex justify-center mb-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getSpeakingStyleColor(tutor.speaking_style)}`}>
            {tutor.speaking_style}
          </span>
        </div>

        {/* Features Row */}
        <div className="flex items-center justify-center gap-3 mb-6 text-gray-400">
          <div className="flex items-center gap-1 text-xs">
            <Globe className="w-3 h-3" />
            <span>{tutor.language}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Volume2 className="w-3 h-3" />
            <span>Voice</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Brain className="w-3 h-3" />
            <span>{tutor.learning_style.split(' ')[0]}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            href={`/companions/${tutor.id}`}
            className="flex-1 group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Start Chat</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <Calendar className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Motivation Level Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Award className="w-3 h-3" />
            <span>{tutor.motivation_level} Teaching Style</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;