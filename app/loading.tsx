"use client"

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  BookOpen, 
  Users, 
  Sparkles, 
  Zap, 
  Target, 
  Globe, 
  Lightbulb,
  Rocket,
  Waves,
  Wind,
  Flame,
  Code,
  Palette,
  Heart,
  Star,
  Trophy,
  Shield,
  Clock,
  Activity,
  MessageSquare,
  Volume2,
  Eye
} from 'lucide-react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [particleCount, setParticleCount] = useState(0);

  const loadingPhases = [
    { text: 'Initializing AI Brain...', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { text: 'Loading Knowledge Base...', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { text: 'Connecting to Tutors...', icon: Users, color: 'from-green-500 to-emerald-500' },
    { text: 'Personalizing Experience...', icon: Target, color: 'from-orange-500 to-red-500' },
    { text: 'Almost Ready...', icon: Sparkles, color: 'from-yellow-500 to-pink-500' }
  ];

  const floatingIcons = [
    Brain, BookOpen, Users, Lightbulb, Target, Globe, Code, Palette,
    Heart, Star, Trophy, Shield, Clock, Activity, MessageSquare, Volume2
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 3 + 1);
        
        // Update phase based on progress
        const phaseIndex = Math.min(Math.floor(newProgress / 20), loadingPhases.length - 1);
        setCurrentPhase(phaseIndex);
        setLoadingText(loadingPhases[phaseIndex]?.text || 'Loading...');
        
        // Increase particle count as we progress
        setParticleCount(Math.floor(newProgress / 4));
        
        return Math.min(newProgress, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Animated Background Particles
  const BackgroundParticles = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: particleCount }).map((_, i) => {
        const Icon = floatingIcons[i % floatingIcons.length];
        const delay = i * 0.1;
        const duration = 3 + Math.random() * 4;
        const size = 16 + Math.random() * 24;
        const opacity = 0.1 + Math.random() * 0.3;
        
        return (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: opacity
            }}
          >
            <Icon 
              className="text-blue-400"
              style={{ width: size, height: size }}
            />
          </div>
        );
      })}
    </div>
  );

  // Orbital Elements
  const OrbitalElements = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Outer Ring */}
      <div className="absolute w-96 h-96 border border-slate-600/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Middle Ring */}
      <div className="absolute w-64 h-64 border border-slate-600/40 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
      </div>
      
      {/* Inner Ring */}
      <div className="absolute w-32 h-32 border border-slate-600/50 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );

  // Floating Orbs
  const FloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );

  // Neural Network Animation
  const NeuralNetwork = () => {
    const nodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 20 + (i % 4) * 25,
      y: 30 + Math.floor(i / 4) * 20,
      active: i <= Math.floor(progress / 8)
    }));

    const connections = [
      [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
      [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [7, 11],
      [8, 9], [9, 10], [10, 11]
    ];

    return (
      <div className="absolute top-10 right-10 w-64 h-48 opacity-30">
        <svg className="w-full h-full">
          {/* Connections */}
          {connections.map(([start, end], i) => {
            const startNode = nodes[start];
            const endNode = nodes[end];
            const isActive = startNode.active && endNode.active;
            
            return (
              <line
                key={i}
                x1={`${startNode.x}%`}
                y1={`${startNode.y}%`}
                x2={`${endNode.x}%`}
                y2={`${endNode.y}%`}
                stroke={isActive ? '#60a5fa' : '#475569'}
                strokeWidth={isActive ? '2' : '1'}
                className={isActive ? 'animate-pulse' : ''}
              />
            );
          })}
          
          {/* Nodes */}
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.active ? '4' : '2'}
              fill={node.active ? '#3b82f6' : '#64748b'}
              className={node.active ? 'animate-pulse' : ''}
            />
          ))}
        </svg>
      </div>
    );
  };

  // Progress Waves
  const ProgressWaves = () => (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/20 to-transparent transition-all duration-500"
        style={{ height: `${progress * 2}%` }}
      >
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 animate-pulse" />
          <div className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );

  const currentIcon = loadingPhases[currentPhase]?.icon || Brain;
  const CurrentIcon = currentIcon;
  const currentColor = loadingPhases[currentPhase]?.color || 'from-blue-500 to-purple-500';

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      <FloatingOrbs />
      <BackgroundParticles />
      <OrbitalElements />
      <NeuralNetwork />
      <ProgressWaves />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateX(${progress * 2}px)`
          }}
        />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Central Loading Icon */}
        <div className="relative mb-12">
          <div className={`w-32 h-32 mx-auto bg-gradient-to-r ${currentColor} rounded-full flex items-center justify-center shadow-2xl animate-pulse`}>
            <CurrentIcon className="w-16 h-16 text-white animate-bounce" />
          </div>
          
          {/* Rotating Ring */}
          <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-transparent border-t-blue-400 rounded-full animate-spin" />
          <div className="absolute inset-2 w-28 h-28 mx-auto border-2 border-transparent border-r-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-slate-300 font-medium">AI Tutor Platform</span>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Loading</span>
            <br />
            <span className={`bg-gradient-to-r ${currentColor} bg-clip-text text-transparent animate-pulse`}>
              Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-6 animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="w-full h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
            <div 
              className={`h-full bg-gradient-to-r ${currentColor} transition-all duration-300 relative overflow-hidden`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-slate-400">Initializing...</span>
            <span className="text-sm font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Phases Indicators */}
        <div className="flex justify-center gap-3 mb-8">
          {loadingPhases.map((phase, index) => {
            const PhaseIcon = phase.icon;
            const isActive = index <= currentPhase;
            const isCompleted = index < currentPhase;
            
            return (
              <div
                key={index}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  isCompleted 
                    ? `bg-gradient-to-r ${phase.color} border-transparent scale-110` 
                    : isActive 
                      ? `border-blue-400 bg-blue-400/20 animate-pulse scale-110` 
                      : 'border-slate-600 bg-slate-800/30'
                }`}
              >
                <PhaseIcon 
                  className={`w-6 h-6 ${
                    isCompleted ? 'text-white' : isActive ? 'text-blue-400' : 'text-slate-500'
                  }`} 
                />
              </div>
            );
          })}
        </div>

        {/* Fun Loading Messages */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <span>Preparing your personalized learning experience</span>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 left-8 opacity-50">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>System Status: Online</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 opacity-50">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Connecting...</span>
        </div>
      </div>

      {/* Custom CSS for slide animation */}
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-slide {
          animation: slide 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;