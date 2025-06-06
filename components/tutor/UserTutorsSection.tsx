import EnhancedTutorCard from "./EnhancedTutorCard";
import NoFilteredTutorsMessage from "./NoFilteredTutorsMessage";
import SubjectFilterGrid from "./SubjectFilterGrid";
import TutorsListHeader from "./TutorsListHeader";

// --- User Tutors Section (combines browse, header, list/no-list messages) ---


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
const UserTutorsSection = ({ 
  allUserTutors, // The complete list of tutors for the user
  filteredTutors, // Tutors after search/subject filters
  subjectCounts, 
  uniqueSubjects,
  currentSearchQuery
}: { 
  allUserTutors: AITutor[];
  filteredTutors: AITutor[];
  subjectCounts: Record<string, number>; 
  uniqueSubjects: string[];
  currentSearchQuery?: string;
}) => {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {uniqueSubjects.length > 0 && ( // Show browse by subject only if there are subjects from user's tutors
            <SubjectFilterGrid 
                uniqueSubjects={uniqueSubjects} 
                subjectCounts={subjectCounts} 
                tutors={allUserTutors} // Pass all tutors for context if SubjectFilterCard needs it
                currentSearch={currentSearchQuery}
            />
        )}
        
        <TutorsListHeader tutorsCount={filteredTutors.length} />

        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTutors.map((tutor: AITutor) => (
              <EnhancedTutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <NoFilteredTutorsMessage />
        )}
      </div>
    </section>
  );
};

export default UserTutorsSection