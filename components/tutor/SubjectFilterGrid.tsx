import { BookOpen } from "lucide-react";
import SubjectFilterCard from "./SubjectFilterCard";
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


// --- Browse By Subject Grid ---
const SubjectFilterGrid = ({ uniqueSubjects, subjectCounts, tutors, currentSearch }: { uniqueSubjects: string[]; subjectCounts: Record<string, number>; tutors: AITutor[]; currentSearch?: string; }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
      <BookOpen className="w-8 h-8 text-blue-400" />
      Browse by Subject
    </h2>
    {uniqueSubjects.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueSubjects.map((subject) => (
          <SubjectFilterCard 
            key={subject}
            subject={subject}
            count={subjectCounts[subject]}
            currentSearch={currentSearch}
            // tutors prop was there but not used in card, removed for clarity. If needed, can be re-added.
          />
        ))}
      </div>
    ) : (
      <p className="text-slate-400">No subjects found based on your current tutors or filters.</p>
    )}
  </div>
);

export default SubjectFilterGrid