// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

enum Subject {
  maths = "maths",
  language = "language",
  science = "science",
  history = "history",
  coding = "coding",
  geography = "geography",
  economics = "economics",
  finance = "finance",
  business = "business",
}

type Companion = Models.DocumentList<Models.Document> & {
  $id: string;
  name: string;
  subject: Subject;
  topic: string;
  duration: number;
  bookmarked: boolean;
};

interface CreateCompanion {
    name: string;
    subject: string;
    topic?:string;
    teaching_content: string;  // Note: snake_case for database
    voice_type: string;
    speaking_style: string;
    language: string;
    chat_duration: number;     // Will be validated as 1-6 minutes
    learning_style: string;
    motivation_level: string;
    // author will be added automatically in the server action
}
// Types - Updated to match server interface


interface CompanionData extends CreateCompanion {
  icon: File | null;
  iconPreview: string;
}

interface GetAllCompanions {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
}

interface BuildClient {
  key?: string;
  sessionToken?: string;
}

interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
}


interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

// interface CompanionComponentProps {
//   tutorsId: string;
//   subject: string;
//   topic: string;
//   name: string;
//   userName: string;
//   userImage: string;
//   voice: string;
//   speaking_style?: string;
// }







_______


interface CreateCompanion {
    name: string;
    subject: string;
    topic?:string;
    teaching_content: string;  // Note: snake_case for database
    voice_type: string;
    speaking_style: string;
    language: string;
    chat_duration: number;     // Will be validated as 1-6 minutes
    learning_style: string;
    motivation_level: string;
    // author will be added automatically in the server action
}
// Types - Updated to match server interface


interface CompanionData extends CreateCompanion {
  icon: File | null;
  iconPreview: string;
}


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
 interface CompanionComponentProps {
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
  iconPreview?: string; // For the UI

  // User data
  userName?: string;
  userImage?: string;
}

export interface UserProfile {
  firstName: string;
  imageUrl: string;
}