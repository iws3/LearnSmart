import CallToActionSection from "@/components/tutor/CallToActionSection";
import FloatingOrbs from "@/components/tutor/FloatingOrbs";
import FooterSection from "@/components/tutor/FooterSection";
import NoUserTutorsMessage from "@/components/tutor/NoUserTutorsMessage";
import StaffRoomHero from "@/components/tutor/StaffRoomHero";
import UserTutorsSection from "@/components/tutor/UserTutorsSection";
import WhyChooseUsSection from "@/components/tutor/WhyChooseUsSection";
import { getUserCompanions } from "@/lib/actions/aiCompanion.action";
import { auth } from "@clerk/nextjs/server";
import { Activity, BookOpen, Star, Users } from "lucide-react";
// import { useRouter, useSearchParams } from 'next/navigation';

interface AITutor {
  id: string;
  created_at: string;
  name: string;
  subject: string;
  topic: string | null;
  voice_type: string;
  chat_duration: number; // Assuming this is number of 15-min blocks
  author: string;
  teaching_content: string;
  language: string;
  speaking_style: string;
  learning_style: string;
  motivation_level: string;
}
type StatItem = { label: string; value: string; icon: React.ElementType; change: string };

interface SearchPageParams { // Renamed to avoid conflict with native SearchParams
  subject?: string;
  topic?: string;
  search?: string;
}
const StaffRoomPage = async ({ searchParams }: { searchParams: SearchPageParams }) => {
  // Simulate auth() - in a real app, this comes from Clerk
   // Replace with actual auth() or test different users like "user_without_tutors", "user_for_search_test"
  const { userId } = await auth();

  if (!userId) {
    // Handle unauthenticated user, e.g., redirect to login
    // For now, let's assume they might see a generic version or get an error.
    // Or, redirect them using Next.js redirect function.
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white text-2xl">
        Please log in to access your Staff Room.
      </div>
    );
  }

  const allUserTutors = await getUserCompanions(userId as string);

  const currentSearchQuery = searchParams?.search || "";
  const currentSubjectFilter = searchParams?.subject || "";
  // Add topic filter if needed: const currentTopicFilter = searchParams?.topic || "";

  const filteredTutors = allUserTutors.filter((tutor: AITutor) => {
    const searchMatch = currentSearchQuery ? (
      tutor.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      (tutor.topic && tutor.topic.toLowerCase().includes(currentSearchQuery.toLowerCase())) ||
      tutor.teaching_content.toLowerCase().includes(currentSearchQuery.toLowerCase())
    ) : true;

    const subjectMatch = currentSubjectFilter ? 
      tutor.subject.toLowerCase() === currentSubjectFilter.toLowerCase() 
      : true;
    
    // const topicMatch = currentTopicFilter ? (tutor.topic && tutor.topic.toLowerCase() === currentTopicFilter.toLowerCase()) : true;

    return searchMatch && subjectMatch; // && topicMatch;
  });

  const subjectCounts = allUserTutors.reduce((acc, tutor) => { // Counts based on all user tutors, not filtered ones
    acc[tutor.subject] = (acc[tutor.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const uniqueSubjects = Object.keys(subjectCounts);

  // Stats for the Hero section (can be dynamic based on allUserTutors or filteredTutors)
  const totalUserTutors = allUserTutors.length;
  const averageRating = totalUserTutors > 0 ? 4.8 : 0; // Example static rating
  const totalSessions = allUserTutors.reduce((acc:any, tutor:any) => acc + tutor.chat_duration, 0) * 15 / 60; // in hours

  const heroStats: StatItem[] = [
    { label: 'Your Tutors', value: totalUserTutors.toString(), icon: Users, change: `+${Math.floor(Math.random()*5)}` }, // Example dynamic change
    { label: 'Subject Areas', value: uniqueSubjects.length.toString(), icon: BookOpen, change: `+${Math.floor(Math.random()*2)}` },
    { label: 'Avg. Rating', value: averageRating.toFixed(1), icon: Star, change: '+0.1' },
    { label: 'Total Hours', value: `${totalSessions.toFixed(0)}h`, icon: Activity, change: `+${Math.floor(Math.random()*10)}h` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <FloatingOrbs />
      
      <StaffRoomHero 
        uniqueSubjects={uniqueSubjects} 
        stats={heroStats}
        currentSearchQuery={currentSearchQuery}
      />

      {allUserTutors.length === 0 ? (
        <NoUserTutorsMessage />
      ) : (
        <UserTutorsSection
          allUserTutors={allUserTutors}
          filteredTutors={filteredTutors}
          subjectCounts={subjectCounts}
          uniqueSubjects={uniqueSubjects}
          currentSearchQuery={currentSearchQuery}
        />
      )}
      
      <WhyChooseUsSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default StaffRoomPage;