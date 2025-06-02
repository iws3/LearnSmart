import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices, /* voices */ } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};
// ./vapiConfig.ts (or your actual path)

const voiceConfigurations = {
  // ... (your voiceConfigurations - no changes needed here based on the error) ...
  'Professional Female': {
    en: { provider: "11labs", voiceId: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
    es: { provider: "11labs", voiceId: "VR6AewLTigWG4xSOukaG", name: "Esperanza" },
    fr: { provider: "11labs", voiceId: "ThT5KcBeYPX3keUQqHPh", name: "Charlotte" },
    de: { provider: "11labs", voiceId: "nPczCjzI2devNBz1zQrb", name: "Helga" },
    pt: { provider: "11labs", voiceId: "yoZ06aMxZJJ28mfd3POQ", name: "Francisca" },
    it: { provider: "11labs", voiceId: "AZnzlk1XvdvUeBnXmlld", name: "Giulia" }
  },
  'Professional Male': {
    en: { provider: "11labs", voiceId: "29vD33N1CtxCmqQRPOHJ", name: "Drew" },
    es: { provider: "11labs", voiceId: "GBv7mTt0atIp3Br8iCZE", name: "Matias" },
    fr: { provider: "11labs", voiceId: "alXUWaXHpAyqtHunuPGH", name: "Henri" },
    de: { provider: "11labs", voiceId: "nBVqtztKKMXnBuGgWUD1", name: "Klaus" },
    pt: { provider: "11labs", voiceId: "yoZ06aMxZJJ28mfd3POQ", name: "Antonio" },
    it: { provider: "11labs", voiceId: "GBv7mTt0atIp3Br8iCZE", name: "Marco" }
  },
  'Friendly Female': {
    en: { provider: "11labs", voiceId: "pNInz6obpgDQGcFmaJgB", name: "Sarah" },
    es: { provider: "11labs", voiceId: "IKne3meq5aSn9XLyUdCD", name: "Sofia" },
    fr: { provider: "11labs", voiceId: "Xb7hH8MSUJpSbSDYk0k2", name: "Marie" },
    de: { provider: "11labs", voiceId: "ErXwobaYiN019PkySvjV", name: "Anna" },
    pt: { provider: "11labs", voiceId: "TxGEqnHWrfWFTfGW9XjX", name: "Isabella" },
    it: { provider: "11labs", voiceId: "MF3mGyEYCl7XYWbV9V6O", name: "Lucia" }
  },
  'Friendly Male': {
    en: { provider: "11labs", voiceId: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
    es: { provider: "11labs", voiceId: "VR6AewLTigWG4xSOukaG", name: "Diego" },
    fr: { provider: "11labs", voiceId: "onwK4e9ZLuTAKqWW03F9", name: "Pierre" },
    de: { provider: "11labs", voiceId: "yoZ06aMxZJJ28mfd3POQ", name: "Hans" },
    pt: { provider: "11labs", voiceId: "IKne3meq5aSn9XLyUdCD", name: "Carlos" },
    it: { provider: "11labs", voiceId: "nPczCjzI2devNBz1zQrb", name: "Giuseppe" }
  },
  'Energetic Female': {
    en: { provider: "11labs", voiceId: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
    es: { provider: "11labs", voiceId: "XB0fDUnXU5powFXDhCwa", name: "Carmen" },
    fr: { provider: "11labs", voiceId: "g5CIjZEefAph4nQFvHAz", name: "Amelie" },
    de: { provider: "11labs", voiceId: "pFZP5JQG7iQjIQuC4Bku", name: "Greta" },
    pt: { provider: "11labs", voiceId: "jBpfuIE2acCO8z3wKNLl", name: "Camila" },
    it: { provider: "11labs", voiceId: "jsCqWAovK2LkecY7zXl4", name: "Valentina" }
  },
  'Energetic Male': {
    en: { provider: "11labs", voiceId: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
    es: { provider: "11labs", voiceId: "flq6f7yk4E4fJM5XTYuZ", name: "Alejandro" },
    fr: { provider: "11labs", voiceId: "Zlb1dXrM653N07WRdFW3", name: "Antoine" },
    de: { provider: "11labs", voiceId: "SOYHLrjzK2X1ezoPC6cr", name: "Stefan" },
    pt: { provider: "11labs", voiceId: "TX3LPaxmHKxFdv7VOQHJ", name: "Ricardo" },
    it: { provider: "11labs", voiceId: "ZQe5CZNOzWyzPSCn5a3c", name: "Lorenzo" }
  },
  'Calm Female': {
    en: { provider: "11labs", voiceId: "pMsXgVXv3BLzUgSXRplE", name: "Serena" },
    es: { provider: "11labs", voiceId: "XrExE9yKIg1WjnnlVkGX", name: "Elena" },
    fr: { provider: "11labs", voiceId: "piTKgcLEGmPE4e6mEKli", name: "Isabelle" },
    de: { provider: "11labs", voiceId: "AZnzlk1XvdvUeBnXmlld", name: "Ingrid" },
    pt: { provider: "11labs", voiceId: "ODq5zmih8GrVes37Dizd", name: "Beatriz" },
    it: { provider: "11labs", voiceId: "XB0fDUnXU5powFXDhCwa", name: "Francesca" }
  },
  'Calm Male': {
    en: { provider: "11labs", voiceId: "5Q0t7uMcjvnagumLfvZi", name: "Marcus" },
    es: { provider: "11labs", voiceId: "yoZ06aMxZJJ28mfd3POQ", name: "Sebastian" },
    fr: { provider: "11labs", voiceId: "Yko7PKHZNXotIFUBG7I9", name: "Emmanuel" },
    de: { provider: "11labs", voiceId: "EXAVITQu4vr4xnSDxMaL", name: "Friedrich" },
    pt: { provider: "11labs", voiceId: "bVMeCyTHy58xNoL34h3p", name: "Miguel" },
    it: { provider: "11labs", voiceId: "flq6f7yk4E4fJM5XTYuZ", name: "Alessandro" }
  }
};

const languageMapping = {
  // Keep your original mapping for selecting voice and display
  'English (US)': { code: 'en-US', transcriberModel: 'nova-3', transcriberLang: 'en-US' },
  'English (UK)': { code: 'en-GB', transcriberModel: 'nova-3', transcriberLang: 'en' }, // or en-US if GB not specific for nova-3
  'Spanish':      { code: 'es',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'French':       { code: 'fr',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'German':       { code: 'de',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'Italian':      { code: 'it',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'Portuguese':   { code: 'pt',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'Mandarin':     { code: 'zh',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'Japanese':     { code: 'ja',    transcriberModel: 'nova-3', transcriberLang: 'multi' },
  'Korean':       { code: 'ko',    transcriberModel: 'nova-3', transcriberLang: 'multi' }
};

export interface CompanionData {
  name: string;
  subject: string;
  topic: string;
  teaching_content: string;
  language: string; // This is the display language e.g., "Spanish", "English (US)"
  chat_duration: number;
  learning_style: string;
  motivation_level: string;
  voice_type: string;
  speaking_style: string;
  userName?: string;
}

export const configureAssistant = (
  voice_type: string, 
  speaking_style: string, 
  companionData: CompanionData
) => {
  const selectedLanguageKey = companionData.language as keyof typeof languageMapping;
  const languageInfo = languageMapping[selectedLanguageKey] || languageMapping['English (US)']; // Fallback
  
  // For voice selection, use the primary language code (e.g., 'en', 'es')
  const voiceLangCode = languageInfo.code.split('-')[0]; 
  
  const voiceConfig = voiceConfigurations[voice_type as keyof typeof voiceConfigurations]?.[voiceLangCode as keyof typeof voiceConfigurations[keyof typeof voiceConfigurations]] 
    || voiceConfigurations['Professional Female']['en']; // Fallback voice

  // ... (generateFirstMessage, getLearningStylePrompt, etc. - no changes needed here based on the error)
    // Generate dynamic first message with cultural context
    const generateFirstMessage = () => {
      const culturalGreetings = {
        'en': `Hello! I'm ${companionData.name}, and I'm thrilled to be your ${companionData.subject} tutor today!`,
        'es': `¡Hola! Soy ${companionData.name}, y estoy emocionado de ser tu tutor de ${companionData.subject} hoy!`,
        'fr': `Bonjour! Je suis ${companionData.name}, et je suis ravi d'être votre tuteur en ${companionData.subject} aujourd'hui!`,
        'de': `Hallo! Ich bin ${companionData.name}, und freue mich, heute Ihr ${companionData.subject}-Tutor zu sein!`,
        'pt': `Olá! Eu sou ${companionData.name}, e estou animado para ser seu tutor de ${companionData.subject} hoje!`,
        'it': `Ciao! Sono ${companionData.name}, e sono entusiasta di essere il tuo tutor di ${companionData.subject} oggi!`
      };
  
      const baseGreeting = culturalGreetings[voiceLangCode as keyof typeof culturalGreetings] || culturalGreetings['en'];
      
      const motivationAddons = {
        'High Energy & Enthusiastic': ` Let's dive into ${companionData.topic} with incredible energy! This is going to be amazing!`,
        'Calm & Supportive': ` We'll explore ${companionData.topic} together at a comfortable pace. I'm here to support you every step of the way.`,
        'Goal-Oriented & Results-Focused': ` Today, we'll master key concepts in ${companionData.topic}. Let's achieve some real learning goals!`,
        'Patient & Understanding': ` We'll take our time with ${companionData.topic}. Remember, every expert was once a beginner.`,
        'Challenging & Pushing': ` Ready to push your boundaries with ${companionData.topic}? I believe you can handle more than you think!`
      };
      
      return baseGreeting + (motivationAddons[companionData.motivation_level as keyof typeof motivationAddons] || '');
    };
  
    // Enhanced learning style adaptations
    const getLearningStylePrompt = () => {
      const styles = {
        'Visual (diagrams, charts, images)': `
          - Use vivid descriptive language to paint mental pictures
          - Frequently reference visual concepts: "Imagine this as a graph where..."
          - Suggest visual analogies and metaphors
          - Break down complex ideas into visual components
          - Use spatial relationships in explanations`,
        
        'Auditory (explanations, discussions)': `
          - Emphasize rhythm and flow in explanations
          - Use verbal repetition of key concepts
          - Encourage the student to repeat back important points
          - Create memorable phrases and verbal mnemonics
          - Ask "Does that sound right?" frequently`,
        
        'Kinesthetic (hands-on, practical)': `
          - Focus on real-world applications and examples
          - Use physical metaphors: "Think of it like building..."
          - Encourage mental simulation of processes
          - Break learning into action-oriented steps
          - Connect abstract concepts to tangible experiences`,
        
        'Reading/Writing (text-based)': `
          - Structure information in clear, logical sequences
          - Use numbered lists and categorization
          - Encourage mental note-taking during conversation
          - Provide clear definitions and terminology
          - Summarize key points systematically`,
        
        'Mixed Learning Style': `
          - Combine visual descriptions with practical examples
          - Use both auditory reinforcement and structured explanations
          - Adapt teaching method based on student responses
          - Provide multiple ways to understand each concept`
      };
      
      return styles[companionData.learning_style as keyof typeof styles] || styles['Mixed Learning Style'];
    };
  
    // Enhanced motivation approaches with conversation techniques
    const getMotivationApproach = () => {
      const approaches = {
        'High Energy & Enthusiastic': `
          - Maintain infectious enthusiasm and excitement
          - Use energetic language with exclamation points in tone
          - Celebrate every small breakthrough: "That's fantastic!"
          - Create momentum with rapid-fire positive reinforcement
          - Use energizing phrases: "Brilliant!" "Exactly!" "You're on fire!"`,
        
        'Calm & Supportive': `
          - Speak in a gentle, reassuring tone
          - Use soothing phrases: "That's perfectly fine," "Take your time"
          - Provide emotional safety: "Mistakes are part of learning"
          - Offer gentle encouragement: "You're doing wonderfully"
          - Validate feelings and create a safe learning space`,
        
        'Goal-Oriented & Results-Focused': `
          - Set clear micro-objectives for each part of the lesson
          - Track progress explicitly: "We've mastered concept A, now for B"
          - Focus on measurable achievements and breakthroughs
          - Use results-oriented language: "By the end, you'll be able to..."
          - Celebrate concrete accomplishments`,
        
        'Patient & Understanding': `
          - Allow natural pauses and processing time
          - Never rush or pressure the student
          - Offer multiple explanations for the same concept
          - Show empathy: "I understand this can be challenging"
          - Provide reassurance about the learning process`,
        
        'Challenging & Pushing': `
          - Ask probing questions that stretch thinking
          - Set slightly higher expectations: "I think you can go deeper"
          - Challenge assumptions with Socratic questioning
          - Encourage critical analysis: "What if we looked at it this way?"
          - Push for deeper understanding while remaining supportive`
      };
      
      return approaches[companionData.motivation_level as keyof typeof approaches] || approaches['Calm & Supportive'];
    };
  
    // Enhanced conversation techniques based on speaking style
    const getSpeakingStyleTechniques = () => {
      const techniques = {
        'Conversational': `
          - Use natural, informal language with contractions
          - Include conversational fillers: "You know," "So," "Well"
          - Ask casual check-ins: "Make sense so far?"
          - Share relatable examples and analogies
          - Maintain a friendly, approachable tone`,
        
        'Formal Academic': `
          - Use precise, professional vocabulary
          - Structure responses with clear logical flow
          - Reference established principles and theories
          - Maintain academic rigor while being accessible
          - Use formal transitions: "Furthermore," "Moreover," "In conclusion"`,
        
        'Enthusiastic': `
          - Express genuine excitement about the subject
          - Use dynamic vocal variety and emphasis
          - Share passion for the topic: "This is one of my favorite concepts!"
          - Create contagious energy around learning
          - Use superlatives: "incredible," "fascinating," "remarkable"`,
        
        'Patient & Encouraging': `
          - Speak slowly and clearly with natural pauses
          - Offer frequent positive reinforcement
          - Repeat key concepts in different ways
          - Use gentle prompting: "What do you think about...?"
          - Maintain calm, steady pacing throughout`,
        
        'Direct & Clear': `
          - Get straight to the point without unnecessary elaboration
          - Use simple, clear language and short sentences
          - Provide concrete, actionable explanations
          - Focus on essential information first
          - Ask direct questions: "Do you understand this part?"`,
        
        'Storytelling': `
          - Frame concepts within engaging narratives
          - Use character-driven examples and scenarios
          - Create memorable story arcs around learning concepts
          - Connect abstract ideas through relatable stories
          - Build suspense: "But here's where it gets interesting..."`,
        
        'Question-Based': `
          - Lead with thought-provoking questions
          - Use Socratic method to guide discovery
          - Ask follow-up questions: "Why do you think that is?"
          - Encourage student-led exploration of concepts
          - Guide learning through strategic questioning`,
        
        'Interactive': `
          - Frequently check for understanding and engagement
          - Encourage student participation and input
          - Use collaborative language: "Let's explore this together"
          - Create two-way dialogue rather than monologue
          - Adapt based on student responses and energy`
      };
      
      return techniques[companionData.speaking_style as keyof typeof techniques] || techniques['Conversational'];
    };

  const vapiAssistant = {
    name: companionData.name,
    firstMessage: generateFirstMessage(),
    transcriber: {
      provider: "deepgram",
      model: languageInfo.transcriberModel, // e.g., "nova-3"
      language: languageInfo.transcriberLang, // CORRECTED: Use specific lang for transcriber
    },
    voice: {
      provider: voiceConfig.provider,
      voiceId: voiceConfig.voiceId,
      stability: companionData.motivation_level === 'Calm & Supportive' ? 0.7 : 0.5,
      similarityBoost: 0.8,
      speed: companionData.motivation_level === 'High Energy & Enthusiastic' ? 1.1 : 
             companionData.motivation_level === 'Patient & Understanding' ? 0.8 : 0.95,
      style: companionData.speaking_style === 'Enthusiastic' ? 0.8 : 0.6,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4", // Consider gpt-3.5-turbo for faster responses/lower cost if sufficient
      messages: [
        {
          role: "system",
          content: `You are ${companionData.name}, an expert ${companionData.subject} tutor conducting a personalized ${companionData.chat_duration}-minute voice conversation session.

Your primary display language for UI purposes is ${companionData.language}, but you will conduct the conversation in the language implied by the voice: ${voiceConfig.name} (${voiceLangCode}). The transcription will attempt to match this.

🎯 CORE IDENTITY:
- Name: ${companionData.name}
- Expertise: ${companionData.subject}, specializing in ${companionData.topic}
- Voice: ${voiceConfig.name} (${companionData.voice_type}, language code: ${voiceLangCode})
- Session Duration: ${companionData.chat_duration} minutes

📚 SESSION LEARNING OBJECTIVES:
${companionData.teaching_content}

🧠 STUDENT PROFILE & PERSONALIZATION:
- Learning Style: ${companionData.learning_style}
${getLearningStylePrompt()}

- Motivation Level: ${companionData.motivation_level}
${getMotivationApproach()}

- Speaking Style: ${companionData.speaking_style}
${getSpeakingStyleTechniques()}

🎙️ VOICE CONVERSATION MASTERY:
... (rest of your detailed prompt - looks good) ...
CRITICAL: Keep responses conversational and natural for voice interaction. Avoid special characters, excessive formatting, or anything that doesn't sound natural when spoken aloud.`
        },
        {
          role: "assistant", // This is a seed message for the LLM, should be in the voice's language
          content: generateFirstMessage() // Ensure this generates in the target voiceLangCode
        }
      ],
      temperature: 0.7,
      maxTokens: 150 // Be mindful if this is too short for some responses
    },
    // MOVED from createAssistantOverrides to here
    clientMessages: ["transcript", "hang", "function-call", "speech-update"], 
    serverMessages: ["end-of-call-report", "status-update", "transcript"], 
    
    endCallMessage: `What a fantastic session! We covered some really important aspects of ${companionData.topic}. Keep exploring these concepts, and remember—you're doing incredible work. Until next time!`, // Ensure this is in the target language or make it dynamic
    endCallPhrases: [ /* ... common end phrases in various languages if needed, or keep English */
      "thank you", "thanks", "goodbye", "bye", "see you later",
      "gracias", "adiós", "hasta luego",
      "merci", "au revoir",
      // Add more as needed
      "that's all for today", "end session", "finish up", "wrap up",
      "we're done", "that's enough"
    ],
    maxDurationSeconds: companionData.chat_duration * 60,
    backgroundSound: "off", // CORRECTED
    backchannelingEnabled: true,
    backgroundDenoisingEnabled: true,
    modelOutputInMessagesEnabled: true, // Good for debugging transcripts
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    numWordsToInterruptAssistant: 2
  };

  console.log("VAPI Assistant Config:", JSON.stringify(vapiAssistant, null, 2)); // For debugging
  return vapiAssistant;
};

export const createAssistantOverrides = (companionData: CompanionData) => {
  // Overrides should be minimal when providing a full assistant config inline.
  // 'variableValues' are typically for assistants defined in the VAPI dashboard.
  // For inline configs, embed dynamic data directly in systemPrompt or firstMessage.
  // 'metadata' is a common place for custom data in overrides.
  console.log("Creating Assistant Overrides with companionData:", companionData);
  return {
    metadata: { // Pass dynamic data that your functions or VAPI dashboard might use
      userName: companionData.userName || "Student",
      subject: companionData.subject,
      topic: companionData.topic,
      // Any other useful metadata for your VAPI functions or logs
    }
    // REMOVED transcriber, clientMessages, serverMessages from here
  };
};

export { voiceConfigurations, languageMapping };