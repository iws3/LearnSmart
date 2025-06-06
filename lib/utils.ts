import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices, /* voices */ } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomImage = (id: string, imagePool: string[]) => {
  if (!id || imagePool.length === 0) return imagePool[0] || '';
  const hash = id.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  return imagePool[Math.abs(hash) % imagePool.length];
};



export const formatDuration = (chatBlocks: number) => {
  const minutes = chatBlocks * 15; // Assuming chat_duration is in 15-minute blocks
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const getTimeSince = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};


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

// Assuming CompanionData, languageMapping, and voiceConfigurations are defined elsewhere
// e.g.,
// export interface CompanionData {
//   name: string;
//   subject: string;
//   topic: string;
//   language: string;
//   voice_type: string;
//   speaking_style: string;
//   motivation_level: string;
//   learning_style: string;
//   chat_duration: number; // IMPORTANT: Ensure this is a number
//   teaching_content: string;
//   userName?: string;
// }
// export const languageMapping = { /* ... */ };
// export const voiceConfigurations = { /* ... */ };


// Helper function for dynamic end call message
const generateEndCallMessage = (langCode: string, topic: string, duration: number) => {
  const messages = {
    'en': `That was a productive ${duration}-minute session on ${topic}! We covered some key points. Keep up the great work, and I look forward to our next session!`,
    'es': `¡Esa fue una productiva sesión de ${duration} minutos sobre ${topic}! Cubrimos puntos clave. ¡Sigue con el gran trabajo y espero nuestra próxima sesión!`,
    'fr': `C'était une session productive de ${duration} minutes sur ${topic} ! Nous avons couvert des points clés. Continuez votre excellent travail et j'attends avec impatience notre prochaine session !`,
    'de': `Das war eine produktive ${duration}-minütige Sitzung zu ${topic}! Wir haben einige wichtige Punkte behandelt. Machen Sie weiter so und ich freue mich auf unsere nächste Sitzung!`,
    'pt': `Essa foi uma sessão produtiva de ${duration} minutos sobre ${topic}! Cobrimos pontos importantes. Continue com o ótimo trabalho e aguardo nossa próxima sessão!`,
    'it': `È stata una sessione produttiva di ${duration} minuti su ${topic}! Abbiamo trattato alcuni punti chiave. Continua così e non vedo l'ora della nostra prossima sessione!`
  };
  return messages[langCode as keyof typeof messages] || messages['en']; // Fallback to English
};


export const configureAssistant = (
  voice_type: string,
  speaking_style: string,
  companionData: CompanionData
) => {
  const selectedLanguageKey = companionData.language as keyof typeof languageMapping;
  const languageInfo = languageMapping[selectedLanguageKey] || languageMapping['English (US)']; // Fallback

  const voiceLangCode = languageInfo.code.split('-')[0];

  const voiceConfig = voiceConfigurations[voice_type as keyof typeof voiceConfigurations]?.[voiceLangCode as keyof typeof voiceConfigurations[keyof typeof voiceConfigurations]]
    || voiceConfigurations['Professional Female']['en']; // Fallback voice

  const generateFirstMessage = () => {
    const culturalGreetings = {
      'en': `Hello! I'm ${companionData.name}, and I'm thrilled to be your ${companionData.subject} tutor for our ${companionData.chat_duration}-minute session today!`,
      'es': `¡Hola! Soy ${companionData.name}, y estoy emocionado de ser tu tutor de ${companionData.subject} para nuestra sesión de ${companionData.chat_duration} minutos hoy!`,
      'fr': `Bonjour! Je suis ${companionData.name}, et je suis ravi d'être votre tuteur en ${companionData.subject} pour notre session de ${companionData.chat_duration} minutes aujourd'hui!`,
      'de': `Hallo! Ich bin ${companionData.name}, und freue mich, heute Ihr ${companionData.subject}-Tutor für unsere ${companionData.chat_duration}-minütige Sitzung zu sein!`,
      'pt': `Olá! Eu sou ${companionData.name}, e estou animado para ser seu tutor de ${companionData.subject} para nossa sessão de ${companionData.chat_duration} minutos hoje!`,
      'it': `Ciao! Sono ${companionData.name}, e sono entusiasta di essere il tuo tutor di ${companionData.subject} per la nostra sessione di ${companionData.chat_duration} minuti oggi!`
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

  // Ensure companionData.chat_duration is a number for calculations
  const sessionDurationMinutes = Number(companionData.chat_duration);
  const halfwayPointMinutes = Math.floor(sessionDurationMinutes / 2);


  const vapiAssistant = {
    name: companionData.name,
    firstMessage: generateFirstMessage(),
    transcriber: {
      provider: "deepgram",
      model: languageInfo.transcriberModel,
      language: languageInfo.transcriberLang,
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
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are ${companionData.name}, an expert ${companionData.subject} tutor conducting a personalized ${sessionDurationMinutes}-minute voice conversation session.

Your primary display language for UI purposes is ${companionData.language}, but you will conduct the conversation in the language implied by the voice: ${voiceConfig.name} (${voiceLangCode}). The transcription will attempt to match this.

🎯 CORE IDENTITY:
- Name: ${companionData.name}
- Expertise: ${companionData.subject}, specializing in ${companionData.topic}
- Voice: ${voiceConfig.name} (${companionData.voice_type}, language code: ${voiceLangCode})
- Session Duration: ${sessionDurationMinutes} minutes. This is a fixed duration.

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

⏰ TIME MANAGEMENT & SESSION PACING:
- You are acutely aware that this session is strictly ${sessionDurationMinutes} minutes long.
- Proactively manage the conversation flow to cover key objectives within this timeframe.
- Around the halfway mark (approximately ${halfwayPointMinutes} minutes into the session), provide a brief, natural time check. For example: "Just a quick check, we're about halfway through our ${sessionDurationMinutes}-minute session. How are you finding the pace so far regarding ${companionData.topic}?"
- When there are approximately 5 minutes remaining, clearly inform the user and begin to guide the conversation towards a conclusion. For example: "We have about 5 minutes left in our session. Is there one last quick question on ${companionData.topic}, or shall we start summarizing what we've covered?"
- In the final minutes, focus on summarizing key takeaways and avoid introducing new complex topics.
- If the user attempts to extend the discussion significantly as the ${sessionDurationMinutes}-minute mark approaches, politely remind them of the time limit and steer towards wrapping up. For example: "That's an interesting point, and I'd love to discuss it, but we're just about at the end of our scheduled ${sessionDurationMinutes} minutes. Let's make sure we summarize our main points for today."
- The call will automatically end after ${sessionDurationMinutes} minutes. Your role is to ensure a smooth and educational experience right up to this limit, concluding gracefully.

CRITICAL: Keep responses conversational and natural for voice interaction. Avoid special characters, excessive formatting, or anything that doesn't sound natural when spoken aloud. Ensure all your spoken responses are in the target language: ${voiceConfig.name} (${voiceLangCode}).`
        },
        {
          role: "assistant",
          content: generateFirstMessage() // Ensures seed message matches the AI's first spoken line and language
        }
      ],
      temperature: 0.7,
      maxTokens: 150
    },
    clientMessages: ["transcript", "hang", "function-call", "speech-update"],
    serverMessages: ["end-of-call-report", "status-update", "transcript"],

    endCallMessage: generateEndCallMessage(voiceLangCode, companionData.topic, sessionDurationMinutes),
    endCallPhrases: [
      "thank you", "thanks", "goodbye", "bye", "see you later",
      "gracias", "adiós", "hasta luego",
      "merci", "au revoir",
      "that's all for today", "end session", "finish up", "wrap up",
      "we're done", "that's enough"
    ],
    maxDurationSeconds: sessionDurationMinutes * 60, // VAPI will enforce this hard limit
    backgroundSound: "off",
    backchannelingEnabled: true,
    backgroundDenoisingEnabled: true,
    modelOutputInMessagesEnabled: true,
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    numWordsToInterruptAssistant: 2
  };

  console.log("VAPI Assistant Config:", JSON.stringify(vapiAssistant, null, 2));
  return vapiAssistant;
};

export const createAssistantOverrides = (companionData: CompanionData) => {
  console.log("Creating Assistant Overrides with companionData:", companionData);
  return {
    metadata: {
      userName: companionData.userName || "Student",
      subject: companionData.subject,
      topic: companionData.topic,
      sessionDurationMinutes: Number(companionData.chat_duration), // Ensure it's a number here too if used
    }
  };
};

// Dummy definitions for languageMapping and voiceConfigurations if you need to run this snippet standalone
// Replace with your actual definitions
/*
export const languageMapping = {
  'English (US)': { code: 'en-US', transcriberModel: 'nova-2', transcriberLang: 'en-US' },
  'Spanish (Spain)': { code: 'es-ES', transcriberModel: 'nova-2', transcriberLang: 'es' },
  // ... other languages
};

export const voiceConfigurations = {
  'Professional Female': {
    'en': { provider: 'elevenlabs', voiceId: 'jessica', name: 'English Female Voice' },
    'es': { provider: 'elevenlabs', voiceId: 'sofia', name: 'Spanish Female Voice' },
    // ... other languages
  },
  // ... other voice types
};
*/

export { voiceConfigurations, languageMapping }; // Assuming these are defined elsewhere