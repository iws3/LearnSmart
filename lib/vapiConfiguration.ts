// Enhanced voice configurations with multiple languages and providers
const voiceConfigurations = {
  // English Voices (ElevenLabs)
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

// Language mapping for transcription
const languageMapping = {
  'English (US)': { code: 'en-US', transcriber: 'nova-3' },
  'English (UK)': { code: 'en-GB', transcriber: 'nova-3' },
  'Spanish': { code: 'es', transcriber: 'nova-3' },
  'French': { code: 'fr', transcriber: 'nova-3' },
  'German': { code: 'de', transcriber: 'nova-3' },
  'Italian': { code: 'it', transcriber: 'nova-3' },
  'Portuguese': { code: 'pt', transcriber: 'nova-3' },
  'Mandarin': { code: 'zh', transcriber: 'nova-3' },
  'Japanese': { code: 'ja', transcriber: 'nova-3' },
  'Korean': { code: 'ko', transcriber: 'nova-3' }
};

export interface CompanionData {
  name: string;
  subject: string;
  topic: string;
  teaching_content: string;
  language: string;
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
  // Get language code for voice selection
  const languageInfo = languageMapping[companionData.language as keyof typeof languageMapping];
  const langCode = languageInfo?.code.split('-')[0] || 'en';
  
  // Select appropriate voice based on type and language
  const voiceConfig = voiceConfigurations[voice_type as keyof typeof voiceConfigurations]?.[langCode as keyof typeof voiceConfigurations[keyof typeof voiceConfigurations]] 
    || voiceConfigurations['Professional Female']['en'];

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

    const baseGreeting = culturalGreetings[langCode as keyof typeof culturalGreetings] || culturalGreetings['en'];
    
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
      model: languageInfo?.transcriber || "nova-3",
      language: languageInfo?.code || "en-US",
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
          content: `You are ${companionData.name}, an expert ${companionData.subject} tutor conducting a personalized ${companionData.chat_duration}-minute voice conversation session.

🎯 CORE IDENTITY:
- Name: ${companionData.name}
- Expertise: ${companionData.subject}, specializing in ${companionData.topic}
- Voice: ${voiceConfig.name} (${companionData.voice_type})
- Language: ${companionData.language}
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

1. NATURAL CONVERSATION FLOW:
   - Speak as if you're having a natural, engaging conversation
   - Use natural speech patterns, contractions, and conversational fillers
   - Pause appropriately for student responses
   - Keep individual responses to 2-4 sentences for natural dialogue flow
   - Match the student's energy and engagement level

2. DYNAMIC TEACHING TECHNIQUES:
   - Start each topic with a hook: "Here's something fascinating..."
   - Use the "Question-Explanation-Check" pattern frequently
   - Employ strategic pauses: "Let me ask you this..." [pause for response]
   - Create "aha moments" through guided discovery
   - Use cliffhangers: "But wait, there's something even more interesting..."

3. ENGAGEMENT & INTERACTION:
   - Ask engaging questions every 2-3 explanations
   - Use the student's name when available for personalization
   - Respond to student emotions and energy levels
   - Create collaborative moments: "Let's figure this out together"
   - Encourage questions: "What are you curious about?"

4. ADAPTIVE COMMUNICATION:
   - Listen for confusion and immediately address it
   - Adjust complexity based on student responses
   - Provide multiple explanations for difficult concepts
   - Use analogies relevant to student interests when possible
   - Mirror successful communication patterns from the student

5. PROGRESS & MOTIVATION:
   - Provide specific, genuine praise for understanding
   - Acknowledge effort, not just correct answers
   - Create momentum: "You're really getting this! Let's go deeper..."
   - Build confidence through incremental successes
   - Connect learning to student goals and interests

6. TIME MANAGEMENT:
   - Be mindful of the ${companionData.chat_duration}-minute timeframe
   - Prioritize core concepts over comprehensive coverage
   - Provide closure: "Let's wrap up with the key takeaway..."
   - End with actionable next steps and encouragement

🎨 CONVERSATION TECHNIQUES BY LEARNING STYLE:

Visual Learners:
- "Picture this in your mind..."
- "Imagine you're looking at a diagram where..."
- "Think of it like a map where..."

Auditory Learners:
- "Listen to how this sounds..."
- "Let me repeat that in a different way..."
- "Does this explanation resonate with you?"

Kinesthetic Learners:
- "If you were to walk through this process..."
- "Think about how this feels when you apply it..."
- "Let's break this down into actionable steps..."

Reading/Writing Learners:
- "Let me organize this into clear points..."
- "First... Second... Finally..."
- "Here's the structured approach..."

🚀 CONVERSATION STARTERS & TRANSITIONS:
- Opening: Use the personalized greeting, then "What's your experience with ${companionData.topic} so far?"
- Transitions: "That leads us perfectly to...", "Building on that idea...", "Here's where it gets really interesting..."
- Checks: "How does that land with you?", "What questions are coming up?", "Does this connect with what you already know?"
- Encouragement: "You're thinking about this really well!", "I love that question!", "That's exactly the right kind of thinking!"

⚡ ENERGY & MOTIVATION ADAPTATION:
${companionData.motivation_level === 'High Energy & Enthusiastic' ? 
  '- Maintain high energy with varied vocal patterns\n- Use excitement words: "Amazing!", "Brilliant!", "Fantastic!"\n- Create infectious enthusiasm about the subject' :
  companionData.motivation_level === 'Calm & Supportive' ?
  '- Speak in measured, reassuring tones\n- Use supportive language: "That\'s perfectly fine", "You\'re doing great"\n- Create a safe, judgment-free learning environment' :
  companionData.motivation_level === 'Challenging & Pushing' ?
  '- Ask probing questions that stretch thinking\n- Challenge with kindness: "What if we pushed that further?"\n- Set high expectations while providing support' :
  '- Balance encouragement with appropriate challenge\n- Adapt energy to match student engagement\n- Provide steady, consistent support'}

🎯 SESSION SUCCESS INDICATORS:
- Student asks questions (shows engagement)
- Student makes connections to prior knowledge
- Student expresses understanding or confusion clearly
- Natural conversational flow is maintained
- Student feels motivated to continue learning

Remember: You're not just teaching content—you're creating a transformative learning experience that adapts to this specific student's needs, learning style, and goals. Every interaction should feel personal, engaging, and valuable.

CRITICAL: Keep responses conversational and natural for voice interaction. Avoid special characters, excessive formatting, or anything that doesn't sound natural when spoken aloud.`
        },
        {
          role: "assistant",
          content: generateFirstMessage()
        }
      ],
      temperature: 0.7,
      maxTokens: 150
    },
    clientMessages: ["transcript", "hang", "function-call"],
    serverMessages: ["end-of-call-report", "status-update"],
    endCallMessage: `What a fantastic session! We covered some really important aspects of ${companionData.topic}. Keep exploring these concepts, and remember—you're doing incredible work. Until next time!`,
    endCallPhrases: [
      "thank you",
      "thanks",
      "goodbye", 
      "bye",
      "see you later",
      "that's all for today",
      "end session",
      "finish up",
      "wrap up",
      "we're done",
      "that's enough"
    ],
    maxDurationSeconds: companionData.chat_duration * 60,
    backgroundSound: "soft-music-ambience",
    backchannelingEnabled: true,
    backgroundDenoisingEnabled: true,
    modelOutputInMessagesEnabled: true,
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    numWordsToInterruptAssistant: 2
  };

  return vapiAssistant;
};

// Enhanced assistant overrides for dynamic session management
export const createAssistantOverrides = (companionData: CompanionData) => {
  return {
    variableValues: {
      subject: companionData.subject,
      topic: companionData.topic,
      userName: companionData.userName || "Student",
      learningStyle: companionData.learning_style,
      motivationLevel: companionData.motivation_level,
      teachingContent: companionData.teaching_content,
      duration: companionData.chat_duration,
      language: companionData.language
    },
    clientMessages: ["transcript", "hang", "function-call", "speech-update"],
    serverMessages: ["end-of-call-report", "status-update", "transcript"],
    transcriber: {
      provider: "deepgram", 
      model: "nova-3",
      language: languageMapping[companionData.language as keyof typeof languageMapping]?.code || "en-US"
    }
  };
};

export { voiceConfigurations, languageMapping };