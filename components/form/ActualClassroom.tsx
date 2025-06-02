"use client"
import React, { useEffect, useRef, useState } from 'react';
import { 
  Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, 
  BookOpen, GraduationCap, Clock, User, Settings,
  MessageCircle, Zap, Heart, Target, Brain, Users,
  Globe, Sparkles, X, Play, Pause, RotateCcw,
  Wifi, WifiOff, Activity
} from 'lucide-react';
// import { configureAssistant, createAssistantOverrides } from '@/lib/utils';

// Import VAPI configuration functions
import { 
  configureAssistant, 
  createAssistantOverrides,
  voiceConfigurations,
  languageMapping,
  type CompanionData
} from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';

// Mock VAPI object - replace with actual VAPI implementation
// const mockVapi = {
//   on: (event: string, callback: Function) => {},
//   off: (event: string, callback: Function) => {},
//   start: (config: any, overrides: any) => {},
//   stop: () => {},
//   isMuted: () => false,
//   setMuted: (muted: boolean) => {}
// };

// Mock function for session history - replace with actual implementation
const mockAddToSessionHistory = (id: string) => console.log('Added to history:', id);

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
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
  chat_duration: number;
  teaching_content: string;
}

// Enhanced Sound Wave Animation with better visual effects
const AdvancedSoundWave = ({ isActive, intensity = 1 }: { isActive: boolean; intensity?: number }) => (
  <div className="flex items-center justify-center space-x-1.5">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className={`bg-gradient-to-t from-blue-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300 shadow-sm ${
          isActive ? 'animate-pulse' : ''
        }`}
        style={{
          width: '4px',
          height: isActive ? `${20 + Math.sin(i * 0.6) * 25 * intensity}px` : '8px',
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
const StatusIndicator = ({ status, duration }: { status: CallStatus; duration?: number }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === CallStatus.ACTIVE) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
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
          color: 'bg-yellow-400', 
          text: 'Connecting...', 
          pulse: true,
          bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
          textColor: 'text-yellow-800',
          icon: <Wifi className="w-4 h-4" />
        };
      case CallStatus.ACTIVE:
        return { 
          color: 'bg-green-400', 
          text: `Live • ${formatTime(timer)}`, 
          pulse: false,
          bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
          textColor: 'text-green-800',
          icon: <Activity className="w-4 h-4" />
        };
      case CallStatus.FINISHED:
        return { 
          color: 'bg-gray-400', 
          text: 'Session Ended', 
          pulse: false,
          bgColor: 'bg-gradient-to-r from-gray-50 to-slate-50',
          textColor: 'text-gray-800',
          icon: <WifiOff className="w-4 h-4" />
        };
      default:
        return { 
          color: 'bg-blue-400', 
          text: 'Ready to Start', 
          pulse: false,
          bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          textColor: 'text-blue-800',
          icon: <Play className="w-4 h-4" />
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center space-x-3 px-5 py-3 rounded-full ${config.bgColor} border border-opacity-30 shadow-lg backdrop-blur-sm`}>
      <div className={`w-3 h-3 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''} shadow-sm`} />
      {config.icon}
      <span className={`text-sm font-semibold ${config.textColor}`}>{config.text}</span>
      {duration && status === CallStatus.ACTIVE && (
        <div className={`text-xs ${config.textColor} opacity-70`}>
          / {duration}min
        </div>
      )}
    </div>
  );
};

// Enhanced Connection Animation
const ConnectionAnimation = () => (
  <div className="relative w-full h-40 flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-20 h-20 border-4 border-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-ping opacity-75"
          style={{
            animationDelay: `${i * 0.4}s`,
            animationDuration: '2.5s'
          }}
        />
      ))}
    </div>
    <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-2xl border border-white/50">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

const EnhancedClassroom: React.FC<CompanionComponentProps> = ({
  id,
  subject,
  topic,
  name,
  userName,
  userImage,
  voice_type,
  speaking_style,
  learning_style,
  motivation_level,
  language,
  chat_duration,
  teaching_content
}) => {

  console.log("my data is: ", {
  id,
  subject,
  topic,
  name,
  userName,
  userImage,
  voice_type,
  speaking_style,
  learning_style,
  motivation_level,
  language,
  chat_duration,
  teaching_content
  })
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [connectionTimer, setConnectionTimer] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create companion data using the proper interface
  const companionData: CompanionData = {
    name,
    subject,
    topic,
    teaching_content,
    language,
    chat_duration,
    learning_style,
    motivation_level,
    voice_type,
    speaking_style,
    userName
  };

useEffect(() => {
  console.log("Setting up VAPI event listeners (this should run less often)");

  const onCallStart = () => {
    console.log("VAPI EVENT: call-start received!");
    setCallStatus(CallStatus.ACTIVE);
    setIsSpeaking(false);
    setAudioLevel(0);
  };

  const onCallEnd = () => {
    console.log("VAPI EVENT: call-end received!");
    setCallStatus(CallStatus.FINISHED);
    setIsSpeaking(false);
    setAudioLevel(0);
    mockAddToSessionHistory(id); // 'id' is stable from props
  };

  const onMessage = (message: any) => {
    console.log("VAPI EVENT: message received", message);
    if (message.type === 'transcript' && message.transcriptType === 'final') {
      const newMessage: SavedMessage = {
        role: message.role,
        content: message.transcript,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, newMessage]); // 'setMessages' is stable
    }
  };

  const onSpeechStart = (eventData?: { role?: 'assistant' | 'user' }) => {
    console.log("VAPI EVENT: speech-start", eventData);
    if (eventData?.role === 'assistant') {
      setIsSpeaking(true); // 'setIsSpeaking' is stable
      setAudioLevel(Math.random() * 0.8 + 0.2); // 'setAudioLevel' is stable
    }
  };

  const onSpeechEnd = (eventData?: { role?: 'assistant' | 'user' }) => {
    console.log("VAPI EVENT: speech-end", eventData);
     if (eventData?.role === 'assistant') {
      setIsSpeaking(false);
      setAudioLevel(0);
    }
  };

  const onError = (error: any) => {
    console.error('VAPI EVENT: error received!', error);
    setCallStatus(CallStatus.FINISHED);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `Connection error: ${error?.message || JSON.stringify(error) || 'Unknown VAPI error'}. Please try again.`, 
      timestamp: new Date() 
    }]);
    setIsSpeaking(false);
    setAudioLevel(0);
  };

  vapi.on('call-start', onCallStart);
  vapi.on('call-end', onCallEnd);
  vapi.on('message', onMessage);
  vapi.on('error', onError);
  vapi.on('speech-start', onSpeechStart);
  vapi.on('speech-end', onSpeechEnd);

  return () => {
    console.log("Cleaning up VAPI event listeners.");
    vapi.off('call-start', onCallStart);
    vapi.off('call-end', onCallEnd);
    vapi.off('message', onMessage);
    vapi.off('error', onError);
    vapi.off('speech-start', onSpeechStart);
    vapi.off('speech-end', onSpeechEnd);

    // Only stop the call if it's truly unmounting, not just due to dependency change.
    // This logic needs to be carefully considered.
    // If the goal is to stop the call when the component *actually* unmounts,
    // this cleanup logic is mostly fine, but the dependency array is key.
  };
// }, [id, callStatus]); // ORIGINAL
}, [id]); // REVISED: Only 'id' because that's the prop used directly in an event handler (onCallEnd).
           // The setters (setCallStatus, setMessages, etc.) are stable.
           // The handlers are defined inside the effect, so they capture the correct 'id'.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === CallStatus.CONNECTING) {
      interval = setInterval(() => {
        setConnectionTimer(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTimer(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const toggleMicrophone = () => {
    const currentMuted = vapi.isMuted();
    vapi.setMuted(!currentMuted);
    setIsMuted(!currentMuted);
  };

 const handleCall = async () => {
  console.log("Starting call with VAPI...");
  setCallStatus(CallStatus.CONNECTING);
  setMessages([]); // Clear messages on new call attempt

  const assistantConfig = configureAssistant(voice_type, speaking_style, companionData);
  console.log("Assistant Config:", JSON.stringify(assistantConfig, null, 2));
  
  const assistantOverrides = createAssistantOverrides(companionData);
  console.log("Assistant Overrides:", JSON.stringify(assistantOverrides, null, 2));

  try {
    // The @ts-expect-error might be due to the VAPI SDK's type for the first argument
    // being AssistantCreatable or similar, which your config should match.
    // If your 'assistantConfig' is the full assistant object, it should be passed directly.
    // @ts-expect-error (if type mismatch, but structure should be correct for VAPI)
    vapi.start(assistantConfig, assistantOverrides); 
    console.log("vapi.start() called.");
  } catch (error:any) {
    console.error("Error during vapi.start():", error);
    setCallStatus(CallStatus.FINISHED); // Or an error state
    // Optionally add an error message to the UI
    setMessages(prev => [...prev, { role: 'assistant', content: `Error starting call: ${error.message}`, timestamp: new Date() }]);
  }
};

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const cancelConnection = () => {
    setCallStatus(CallStatus.INACTIVE);
    vapi.stop();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/50 relative overflow-hidden">
      <FloatingElements />
      
      {/* Enhanced Classroom Header */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span>{subject}</span>
                  <span className="text-blue-500">•</span>
                  <span className="text-purple-600">{topic}</span>
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{chat_duration} minutes</span>
                  </div>
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
              <StatusIndicator status={callStatus} duration={chat_duration} />
              <MotivationBadge level={motivation_level} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Enhanced AI Tutor Section */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="text-center">
                {/* Enhanced AI Avatar with Dynamic States */}
                <div className="relative w-56 h-56 mx-auto mb-8">
                  {/* Base Avatar with enhanced gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-2" />
                  
                  {/* Connection State */}
                  {callStatus === CallStatus.CONNECTING && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ConnectionAnimation />
                    </div>
                  )}
                  
                  {/* Inactive State */}
                  {(callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/25 backdrop-blur-md rounded-full p-12 border border-white/20">
                        <GraduationCap className="w-20 h-20 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}

                  {/* Active State */}
                  {callStatus === CallStatus.ACTIVE && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/25 backdrop-blur-md rounded-full p-12 border border-white/20">
                          <AdvancedSoundWave isActive={isSpeaking} intensity={isSpeaking ? audioLevel * 2 : 0.3} />
                        </div>
                      </div>
                      
                      {/* Enhanced active rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-pulse shadow-lg" />
                      <div className="absolute -inset-6 rounded-full border-2 border-white/25 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
                      <div className="absolute -inset-12 rounded-full border border-white/15 animate-ping opacity-50" style={{ animationDuration: '4s' }} />
                    </>
                  )}
                </div>

                {/* Enhanced Tutor Info */}
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {name}
                  </h2>
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
                  
                  {/* Enhanced Voice & Style Info */}
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

          {/* Enhanced Student & Controls Section */}
          <div className="space-y-6">
            {/* Enhanced Student Info */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="text-center">
                <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-gradient-to-br from-blue-200 to-purple-200 shadow-xl">
                  <img 
                    src={userImage || '/api/placeholder/150/150'} 
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

            {/* Enhanced Control Panel */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="space-y-5">
                {/* Enhanced Main Call Button */}
                {callStatus === CallStatus.CONNECTING ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-3 text-yellow-600 font-medium mb-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                        <span>Connecting to {name}... ({connectionTimer}s)</span>
                      </div>
                    </div>
                    <button
                      onClick={cancelConnection}
                      className="w-full flex items-center justify-center space-x-3 py-5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel Connection</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    // @ts-ignore
                    disabled={callStatus === CallStatus.CONNECTING}
                    className={`w-full flex items-center justify-center space-x-4 py-5 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                      callStatus === CallStatus.ACTIVE
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
                    }`}
                  >
                    {callStatus === CallStatus.ACTIVE ? (
                      <>
                        <PhoneOff className="w-6 h-6" />
                        <span>End Learning Session</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-6 h-6" />
                        <span>Start Learning with {name}</span>
                      </>
                    )}
                  </button>
                )}

                {/* Enhanced Control Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={toggleMicrophone}
                    disabled={callStatus !== CallStatus.ACTIVE}
                    className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      callStatus !== CallStatus.ACTIVE
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isMuted
                        ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 border-2 border-red-300 shadow-lg'
                        : 'bg-gradient-to-r from-green-100 to-green-200 text-green-600 hover:from-green-200 hover:to-green-300 border-2 border-green-300 shadow-lg'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button
                    disabled={callStatus !== CallStatus.ACTIVE}
                    className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      callStatus !== CallStatus.ACTIVE
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 hover:from-blue-200 hover:to-blue-300 border-2 border-blue-300 shadow-lg'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm">Audio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Transcript Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-8 border-b border-gray-100/50">
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
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-600 transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-2">Ready to start learning!</p>
                  <p className="text-gray-400 text-sm">Your conversation with {name} will appear here</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white/90 text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-br from-blue-500 to-purple-500'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <GraduationCap className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1">
                            {message.role === 'user' ? userName : name}
                          </p>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Enhanced Learning Insights Panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Session Progress */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">85%</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Session Progress</h4>
            <p className="text-sm text-gray-600">Learning objectives covered</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Engagement Level */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">High</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Engagement</h4>
            <p className="text-sm text-gray-600">Active participation level</p>
            <div className="mt-3 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i < 4 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>

          {/* Understanding Score */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">92%</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Understanding</h4>
            <p className="text-sm text-gray-600">Comprehension accuracy</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          {/* Next Topics */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Next Topics</h4>
            <p className="text-sm text-gray-600">Recommended for learning</p>
            <div className="mt-3 flex -space-x-1">
              <div className="w-6 h-6 bg-orange-400 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-red-400 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-pink-400 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10 mt-12 bg-white/50 backdrop-blur-lg border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI-Powered Learning Environment</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="hidden sm:inline">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-xl transition-colors duration-200">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-xl transition-colors duration-200">
                <MessageCircle className="w-4 h-4" />
                <span>Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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

export default EnhancedClassroom;