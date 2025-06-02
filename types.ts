// In a types file (e.g., @/types/index.ts) or at the top of ActualClassroom.tsx
export type SpeakingStyleKey =
  | 'Conversational'
  | 'Formal Academic'
  | 'Enthusiastic'
  | 'Patient & Encouraging'
  | 'Direct & Clear'
  | 'Storytelling'
  | 'Question-Based'
  | 'Interactive'
  | 'African Female'
  | 'African Male';

export type VoiceTypeKey =
  | 'Professional Female'
  | 'Professional Male'
  | 'Friendly Female'
  | 'Friendly Male'
  | 'Energetic Female'
  | 'Energetic Male'
  | 'Calm Female'
  | 'Calm Male';

// This should match the structure of data coming from your form/DB for a companion
// and what's needed by VAPI configuration and the UI.
export interface CompanionComponentProps {
  id: string; // From DB, was tutorsId in your example
  name: string;
  subject: string;
  topic: string; // Was optional, making it required for classroom
  teaching_content: string;
  voice_type: VoiceTypeKey; // Use specific VAPI types
  speaking_style: SpeakingStyleKey; // Use specific VAPI types
  language: string;
  chat_duration: number;
  learning_style: string;
  motivation_level: string;
  iconPreview: string; // For the UI

  // User data
  userName: string;
  userImage: string;
}

export interface UserProfile {
  firstName: string;
  imageUrl: string;
}