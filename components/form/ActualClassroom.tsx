"use client"
import React, { useEffect, useRef, useState } from 'react';
import { 
  Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, 
  BookOpen, GraduationCap, Clock as ClockIconLucide, User, Settings, // Renamed Clock to avoid conflict
  MessageCircle, Zap, Heart, Target, Brain, Users,
  Globe, Sparkles, X, Play, Pause, RotateCcw,
  Wifi, WifiOff, Activity, FileText, ArrowRight // Added for modal
} from 'lucide-react';
import { vapi } from '@/lib/vapi.sdk';
import { 
  configureAssistant, 
  createAssistantOverrides,
  type CompanionData 
} from '@/lib/utils'; // Your vapiConfig path
import CountdownTimerDisplay from '../CountDownTimerDisplay';
import QuizPromptModal from '../QuizModal';

// Import the new components
// import CountdownTimerDisplay from './CountdownTimerDisplay'; // Adjust path if needed
// import QuizPromptModal from './QuizPromptModal'; // Adjust path if needed

// Mock function for session history - replace with actual implementation
const mockAddToSessionHistory = (id: string) => console.log('Added to history:', id);

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR', // Optional: for specific error states
}

interface SavedMessage {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface CompanionComponentProps {
  id: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  voice_type: string;
  speaking_style: string;
  learning_style: string;
  motivation_level: string;
  language: string;
  chat_duration: number; // in minutes
  teaching_content: string;
}

// ... (AdvancedSoundWave, FloatingElements, LearningStyleIcon, MotivationBadge, StatusIndicator, ConnectionAnimation - KEEP THESE AS THEY ARE)
// --- PASTE YOUR EXISTING HELPER COMPONENTS HERE ---
// Enhanced Sound Wave Animation with better visual effects
const AdvancedSoundWave = ({ isActive, intensity = 1 }: { isActive: boolean; intensity?: number }) => (
  <div className="flex items-center justify-center space-x-1.5 h-full">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className={`bg-gradient-to-t from-blue-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300 shadow-sm ${
          isActive ? 'animate-pulse' : ''
        }`}
        style={{
          width: '4px',
          height: isActive ? `${8 + Math.sin(i * 0.6 + Date.now() / 200) * 15 * intensity}px` : '8px',
          animationDelay: `${i * 0.08}s`,
          animationDuration: `${0.6 + Math.random() * 0.3}s`,
          transform: isActive ? `scaleY(${0.8 + Math.random() * 0.4})` : 'scaleY(1)'
        }}
      />
    ))}
  </div>
);

// Enhanced Floating Elements Background
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-10 hover:opacity-20 transition-opacity duration-1000"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${12 + Math.random() * 6}s`,
          fontSize: `${12 + Math.random() * 8}px`
        }}
      >
        {i % 4 === 0 ? (
          <BookOpen className="w-6 h-6 text-blue-400/60" />
        ) : i % 4 === 1 ? (
          <GraduationCap className="w-5 h-5 text-purple-400/60" />
        ) : i % 4 === 2 ? (
          <Brain className="w-4 h-4 text-green-400/60" />
        ) : (
          <Sparkles className="w-5 h-5 text-pink-400/60" />
        )}
      </div>
    ))}
  </div>
);

// Learning Style Icon with enhanced styling
const LearningStyleIcon = ({ style }: { style: string }) => {
  const icons = {
    'Visual (diagrams, charts, images)': <Target className="w-5 h-5" />,
    'Auditory (explanations, discussions)': <Volume2 className="w-5 h-5" />,
    'Kinesthetic (hands-on, practical)': <Zap className="w-5 h-5" />,
    'Reading/Writing (text-based)': <BookOpen className="w-5 h-5" />,
    'Mixed Learning Style': <Brain className="w-5 h-5" />
  };
  return icons[style as keyof typeof icons] || <Brain className="w-5 h-5" />;
};

// Enhanced Motivation Level Badge
const MotivationBadge = ({ level }: { level: string }) => {
  const configs = {
    'High Energy & Enthusiastic': { 
      icon: <Zap className="w-4 h-4" />, 
      color: 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200', 
      pulse: true 
    },
    'Calm & Supportive': { 
      icon: <Heart className="w-4 h-4" />, 
      color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200', 
      pulse: false 
    },
    'Goal-Oriented & Results-Focused': { 
      icon: <Target className="w-4 h-4" />, 
      color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200', 
      pulse: false 
    },
    'Patient & Understanding': { 
      icon: <Users className="w-4 h-4" />, 
      color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-200', 
      pulse: false 
    },
    'Challenging & Pushing': { 
      icon: <Sparkles className="w-4 h-4" />, 
      color: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200', 
      pulse: false 
    }
  };
  
  const config = configs[level as keyof typeof configs] || configs['Calm & Supportive'];
  
  return (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${config.color} ${config.pulse ? 'animate-pulse' : ''} shadow-sm backdrop-blur-sm`}>
      {config.icon}
      <span className="hidden sm:inline">{level.split(' ')[0]}</span>
    </div>
  );
};

// Enhanced Status Indicator
const StatusIndicator = ({ status, totalDurationMinutes }: { status: CallStatus; totalDurationMinutes?: number }) => {
  const [elapsedTimer, setElapsedTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === CallStatus.ACTIVE) {
      setElapsedTimer(0); // Reset timer when call becomes active
      interval = setInterval(() => {
        setElapsedTimer(prev => prev + 1);
      }, 1000);
    } else if (status === CallStatus.INACTIVE || status === CallStatus.FINISHED || status === CallStatus.ERROR) {
        setElapsedTimer(0); 
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusConfig = () => {
    switch (status) {
      case CallStatus.CONNECTING:
        return { 
          color: 'bg-yellow-400', text: 'Connecting...', pulse: true,
          bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50', textColor: 'text-yellow-800', icon: <Wifi className="w-4 h-4" />
        };
      case CallStatus.ACTIVE:
        return { 
          color: 'bg-green-400', text: `Live • ${formatTime(elapsedTimer)}`, pulse: false,
          bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50', textColor: 'text-green-800', icon: <Activity className="w-4 h-4" />
        };
      case CallStatus.FINISHED:
        return { 
          color: 'bg-gray-400', text: 'Session Ended', pulse: false,
          bgColor: 'bg-gradient-to-r from-gray-50 to-slate-50', textColor: 'text-gray-800', icon: <WifiOff className="w-4 h-4" />
        };
      case CallStatus.ERROR:
        return {
          color: 'bg-red-400', text: 'Connection Error', pulse: false,
          bgColor: 'bg-gradient-to-r from-red-50 to-pink-50', textColor: 'text-red-800', icon: <WifiOff className="w-4 h-4" />
        };
      default: // INACTIVE
        return { 
          color: 'bg-blue-400', text: 'Ready to Start', pulse: false,
          bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50', textColor: 'text-blue-800', icon: <Play className="w-4 h-4" />
        };
    }
  };
  const config = getStatusConfig();
  return (
    <div className={`inline-flex items-center space-x-3 px-5 py-3 rounded-full ${config.bgColor} border border-opacity-30 shadow-lg backdrop-blur-sm`}>
      <div className={`w-3 h-3 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''} shadow-sm`} />
      {config.icon}
      <span className={`text-sm font-semibold ${config.textColor}`}>{config.text}</span>
      {totalDurationMinutes && status === CallStatus.ACTIVE && (
        <div className={`text-xs ${config.textColor} opacity-70`}>
          / {totalDurationMinutes} min
        </div>
      )}
    </div>
  );
};

// Enhanced Connection Animation
const ConnectionAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-20 h-20 sm:w-28 sm:h-28 border-4 border-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-ping opacity-75"
          style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2.5s' }}
        />
      ))}
    </div>
    <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-6 shadow-2xl border border-white/50">
      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);
// --- END OF HELPER COMPONENTS ---


const ActualClassroom: React.FC<CompanionComponentProps> = ({
  id, subject, topic, name, userName, userImage, voice_type, 
  speaking_style, learning_style, motivation_level, language, 
  chat_duration, teaching_content
}) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false); // Renamed from isSpeaking
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [connectionTimer, setConnectionTimer] = useState(0); // For "Connecting..." message
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showQuizModal, setShowQuizModal] = useState(false); // New state for quiz modal

  const companionData: CompanionData = {
    name, subject, topic, teaching_content, language, chat_duration,
    learning_style, motivation_level, voice_type, speaking_style, userName
  };

  // Effect for VAPI listeners
  useEffect(() => {
    console.log("Effect: Setting up VAPI event listeners.");

    const onCallStart = () => {
      console.log("VAPI EVENT: call-start");
      setCallStatus(CallStatus.ACTIVE);
      setIsAssistantSpeaking(false);
      setAudioLevel(0);
      setShowQuizModal(false); // Ensure quiz modal is hidden when a new call starts
    };
    const onCallEnd = () => {
      console.log("VAPI EVENT: call-end");
      setCallStatus(CallStatus.FINISHED);
      setIsAssistantSpeaking(false);
      setAudioLevel(0);
      mockAddToSessionHistory(id);
      setShowQuizModal(true); // Show quiz modal when call ends
    };
    const onMessage = (message: any) => {
      console.log("VAPI EVENT: message", message);
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage: SavedMessage = { 
          role: message.role, 
          content: message.transcript,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = (eventData?: { role?: 'assistant' | 'user' }) => {
      console.log('VAPI EVENT: speech-start', eventData);
      if (eventData?.role === 'assistant') {
        setIsAssistantSpeaking(true);
        setAudioLevel(Math.random() * 0.6 + 0.4);
      }
    };
    const onSpeechEnd = (eventData?: { role?: 'assistant' | 'user' }) => {
      console.log('VAPI EVENT: speech-end', eventData);
      if (eventData?.role === 'assistant') {
        setIsAssistantSpeaking(false);
        setAudioLevel(0);
      }
    };
    const onError = (error: any) => {
        console.error('VAPI EVENT: error', error);
        setCallStatus(CallStatus.ERROR); // Use specific error state
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Connection error: ${error?.message || JSON.stringify(error) || 'Unknown VAPI error'}. Please try again.`, 
          timestamp: new Date() 
        }]);
        setIsAssistantSpeaking(false);
        setAudioLevel(0);
        // setShowQuizModal(true); // Optionally show quiz modal even on error, or handle differently
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      console.log("Effect Cleanup: Removing VAPI event listeners.");
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      // Stop call if component unmounts while active/connecting
      // const currentStatus = vapi.getCallStatus?.() // Fictional: check VAPI docs for actual method
      // if (currentStatus === 'connecting' || currentStatus === 'connected') {
      //    vapi.stop();
      // }
         vapi.stop(); 
    };
  }, [id]); // Dependency: id (stable from props)

  // Effect for scrolling messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Effect for connection timer display
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === CallStatus.CONNECTING) {
      setConnectionTimer(0);
      interval = setInterval(() => setConnectionTimer(prev => prev + 1), 1000);
    } else {
      setConnectionTimer(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);


  const toggleMicrophone = () => {
    if (callStatus !== CallStatus.ACTIVE) return;
    const newMutedState = !isMuted;
    vapi.setMuted(newMutedState);
    setIsMuted(newMutedState);
  };

  const toggleSpeaker = () => {
    if (callStatus !== CallStatus.ACTIVE) return;
    const newSpeakerOnState = !isSpeakerOn;
    setIsSpeakerOn(newSpeakerOnState);
    if (typeof (vapi as any).setPlaybackMuted === 'function') {
        (vapi as any).setPlaybackMuted(!newSpeakerOnState);
    } else {
        console.warn("VAPI SDK does not have setPlaybackMuted or it's not typed.");
    }
  };

  const handleCall = async () => {
    if (callStatus === CallStatus.CONNECTING || callStatus === CallStatus.ACTIVE) return;
    console.log("Attempting to start call...");
    setCallStatus(CallStatus.CONNECTING);
    setMessages([]); 
    setShowQuizModal(false); // Hide quiz modal if it was somehow visible

    const assistantConfig = configureAssistant(voice_type, speaking_style, companionData);
    const assistantOverrides = createAssistantOverrides(companionData);
    
    try {
      // @ts-expect-error (If types don't perfectly match SDK, but structure should be fine)
      vapi.start(assistantConfig, assistantOverrides);
      console.log("vapi.start() invoked.");
    } catch (error: any) {
      console.error("Error immediately from vapi.start():", error);
      setCallStatus(CallStatus.ERROR);
      setMessages(prev => [...prev, { role: 'assistant', content: `Failed to initiate call: ${error.message || 'Unknown error'}.`, timestamp: new Date() }]);
    }
  };

  const handleDisconnect = () => {
    console.log("User initiated disconnect.");
    vapi.stop(); // This will trigger the 'call-end' event eventually
  };

  const cancelConnection = () => {
    console.log("Cancelling connection attempt.");
    vapi.stop();
    setCallStatus(CallStatus.INACTIVE);
  };

  const handleTakeQuiz = () => {
    console.log(`User taking quiz for topic: ${topic}, tutor: ${name}, subject: ${subject}`);
    // Example: router.push(`/quiz/start?topic=${encodeURIComponent(topic)}&subject=${encodeURIComponent(subject)}`);
    setShowQuizModal(false);
    // Potentially redirect or open a new interface for the quiz
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <FloatingElements />
      
      {/* Header */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-3 flex-wrap">
                  <span>{subject}</span>
                  <span className="text-blue-500">•</span>
                  <span className="text-purple-600">{topic}</span>
                </h1>
                <div className="flex items-center space-x-4 mt-2 flex-wrap">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ClockIconLucide className="w-4 h-4" /> {/* Used Renamed Clock */}
                    <span>{chat_duration} min session</span>
                  </div>
                  {/* ... other header info ... */}
                   <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>{language}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Volume2 className="w-4 h-4" />
                    <span>{voice_type}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <StatusIndicator status={callStatus} totalDurationMinutes={chat_duration} />
              <MotivationBadge level={motivation_level} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... Your existing grid for AI Tutor and Student Controls ... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
           {/* Enhanced AI Tutor Section */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="p-8 sm:p-10 h-full flex flex-col justify-center">
              <div className="text-center">
                {/* Avatar */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-2" />
                  {callStatus === CallStatus.CONNECTING && (<div className="absolute inset-0 flex items-center justify-center"><ConnectionAnimation /></div>)}
                  {(callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED || callStatus === CallStatus.ERROR) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/25 backdrop-blur-md rounded-full p-10 sm:p-12 border border-white/20">
                        <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}
                  {callStatus === CallStatus.ACTIVE && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/25 backdrop-blur-md rounded-full p-10 sm:p-12 border border-white/20 w-full h-full flex items-center justify-center">
                          <AdvancedSoundWave isActive={isAssistantSpeaking} intensity={isAssistantSpeaking ? audioLevel : 0.3} />
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-pulse shadow-lg" />
                      <div className="absolute -inset-3 sm:-inset-6 rounded-full border-2 border-white/25 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
                      <div className="absolute -inset-6 sm:-inset-12 rounded-full border border-white/15 animate-ping opacity-50" style={{ animationDuration: '4s' }} />
                    </>
                  )}
                </div>
                {/* Tutor Info */}
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {name}
                  </h2>
                  {/* ... other tutor details ... */}
                   <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium border border-blue-200 shadow-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>{subject} Expert</span>
                    </span>
                    <span className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-sm font-medium border border-purple-200 shadow-sm">
                      <LearningStyleIcon style={learning_style} />
                      <span className="hidden sm:inline">{learning_style.split(' ')[0]} Focused</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100/80 rounded-full backdrop-blur-sm">
                      <Volume2 className="w-4 h-4" />
                      <span>{voice_type}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="px-3 py-1 bg-gray-100/80 rounded-full backdrop-blur-sm">
                      <span>{speaking_style}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student & Controls Section */}
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-gradient-to-br from-blue-200 to-purple-200 shadow-xl">
                  <img 
                    src={userImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=128`} 
                    alt={userName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{userName}</h3>
                <p className="text-gray-600 text-sm mb-3">Learning Student</p>
                <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                  {learning_style.split(' ')[0]} Learner
                </div>
              </div>
            </div>
            {/* Control Panel Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="space-y-5">
                {/* Main Call Button */}
                {callStatus === CallStatus.CONNECTING ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-3 text-yellow-600 font-medium mb-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                        <span>Connecting to {name}... ({connectionTimer}s)</span>
                      </div>
                    </div>
                    <button onClick={cancelConnection} className="w-full flex items-center justify-center space-x-3 py-5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                      <X className="w-5 h-5" />
                      <span>Cancel Connection</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    // @ts-ignore
                    disabled={callStatus === CallStatus.CONNECTING || callStatus === CallStatus.ERROR && !messages.find(m => m.content.includes("Failed to initiate call"))} // Disable if connecting or certain errors
                    className={`w-full flex items-center justify-center space-x-4 py-5 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                      callStatus === CallStatus.ACTIVE
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {callStatus === CallStatus.ACTIVE ? (<><PhoneOff className="w-6 h-6" /><span>End Learning Session</span></>) : (<><Phone className="w-6 h-6" /><span>Start Learning with {name}</span></>)}
                  </button>
                )}
                {/* Mic and Speaker Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE} className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${callStatus !== CallStatus.ACTIVE ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isMuted ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 border-2 border-red-300 shadow-lg' : 'bg-gradient-to-r from-green-100 to-green-200 text-green-600 hover:from-green-200 hover:to-green-300 border-2 border-green-300 shadow-lg'}`}>
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span className="text-sm">{isMuted ? 'Mic Off' : 'Mic On'}</span>
                  </button>
                  <button onClick={toggleSpeaker} disabled={callStatus !== CallStatus.ACTIVE} className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${callStatus !== CallStatus.ACTIVE ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isSpeakerOn ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-600 hover:from-green-200 hover:to-green-300 border-2 border-green-300 shadow-lg' : 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 border-2 border-red-300 shadow-lg'}`}>
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    <span className="text-sm">{isSpeakerOn ? 'Speaker On' : 'Speaker Off'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Section - PASTE YOUR EXISTING TRANSCRIPT JSX HERE */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-200/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Live Conversation</h3>
                  <p className="text-sm text-gray-500">Real-time learning transcript</p>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100/70 hover:text-gray-800 transition-colors duration-200 backdrop-blur-sm border border-gray-200/50 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>
          <div className="h-[300px] sm:h-[400px] overflow-y-auto p-6 sm:p-8 space-y-6 scroll-smooth">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 mb-4 opacity-50" />
                <p className="text-base sm:text-lg font-medium">No messages yet.</p>
                <p className="text-xs sm:text-sm">
                  {callStatus === CallStatus.INACTIVE ? "Start the session to see the conversation." : 
                   callStatus === CallStatus.CONNECTING ? "Connecting to the tutor..." :
                   callStatus === CallStatus.ACTIVE ? "Waiting for the conversation to start..." :
                   callStatus === CallStatus.ERROR ? "There was an issue with the session." :
                   "The session has ended."}
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
                      <GraduationCap size={16} />
                    </div>
                  )}
                  <div 
                    className={`max-w-[70%] sm:max-w-[65%] p-3 sm:p-4 rounded-2xl shadow-md text-sm sm:text-base ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-lg'
                        : 'bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800 rounded-bl-lg border border-slate-200/80'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    <p 
                      className={`text-xs mt-2 opacity-80 ${
                        msg.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.role === 'user' && (
                     <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-md flex-shrink-0">
                        <img src={userImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=40`} alt={userName} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* ... Your existing Learning Insights Panel & Footer ... */}
      </div>

      {/* Countdown Timer Display */}
      {(callStatus === CallStatus.ACTIVE || (callStatus === CallStatus.FINISHED && messages.length > 0)) && ( // Show timer if active, or if finished but there were messages (so user sees it hit 0)
           <CountdownTimerDisplay
            isActive={callStatus === CallStatus.ACTIVE}
            initialDurationSeconds={chat_duration * 60}
            // onTimeUp={() => { console.log("UI Timer hit zero!"); }} // VAPI's maxDurationSeconds will handle actual call end
          />
      )}
     

      {/* Quiz Prompt Modal */}
      <QuizPromptModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onTakeQuiz={handleTakeQuiz}
        tutorName={name}
        topic={topic}
        subject={subject}
      />

      {/* Custom CSS for animations - PASTE YOUR EXISTING STYLE JSX HERE */}
       <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ActualClassroom;