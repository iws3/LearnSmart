// app/companions/[id]/session/page.tsx (or your actual path)
import { getCompanion } from '@/lib/actions/aiCompanion.action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
// import ActualClassroomComponent from '../ActualClassroom'; // Adjust path
import { CompanionComponentProps, VoiceTypeKey, SpeakingStyleKey } from '@/types'; // Adjust path to your types
import ActualClassroom from '@/components/form/ActualClassroom';
// import ActualClassroom from '@/components/form/ActualClassroom';

interface CompanionSessionPageProps {
    params: { id: string };
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps)=> {
    const { id } =await params;
    const user = await currentUser();

    if (!user || !user.firstName || !user.imageUrl) {
        redirect("/sign-in");
        return null;
    }

    const rawTutorData = await getCompanion(id); 

    if (!rawTutorData) {
        console.error(`Companion with ID ${id} not found.`);
        redirect("/companions");
        return null;
    }

    // Map rawTutorData to CompanionComponentProps
    // IMPORTANT: Ensure rawTutorData fields correctly map and types are compatible
    // Especially voice_type and speaking_style need to be valid VoiceTypeKey and SpeakingStyleKey
    const classroomProps: CompanionComponentProps = {
        id: rawTutorData.id,
        name: rawTutorData.name,
        subject: rawTutorData.subject,
        topic: rawTutorData.topic || "General Discussion", // Ensure topic is always present
        teaching_content: rawTutorData.teaching_content, // Matches your CreateCompanion
        // Ensure these are valid keys from your vapi.config or type definitions
        voice_type: rawTutorData.voice_type as VoiceTypeKey, 
        speaking_style: rawTutorData.speaking_style as SpeakingStyleKey,
        language: rawTutorData.language,
        chat_duration: rawTutorData.chat_duration, // Matches your CreateCompanion
        learning_style: rawTutorData.learning_style,
        motivation_level: rawTutorData.motivation_level,
        iconPreview: rawTutorData.iconPreview || rawTutorData.src || "default_icon_url", // Ensure a fallback

        // User data
        userName: user.firstName,
        userImage: user.imageUrl,
    };

  return (
    <div>
      <ActualClassroom {...classroomProps} />
    </div>
  );
};

export default CompanionSessionPage;