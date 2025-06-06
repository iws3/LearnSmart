import Link from "next/link";


const subjectBackgrounds: Record<string, string> = {
  'Mathematics': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Maths': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Physics': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
  // ... more subjects
  'default': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
};


const getSubjectBackground = (subject: string) => {
  return subjectBackgrounds[subject] || subjectBackgrounds.default;
};
// --- Subject Filter Card Component (Modified to be a Link) ---
const SubjectFilterCard = ({ subject, count, currentSearch }: { subject: string; count: number; currentSearch?: string; }) => {
  const queryParams = new URLSearchParams();
  if (currentSearch) queryParams.set('search', currentSearch);
  queryParams.set('subject', subject);

  return (
    <Link 
      href={`/companions?${queryParams.toString()}`} 
      className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
        <img 
          src={getSubjectBackground(subject)} 
          alt={subject}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute top-2 right-2 bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
          {count}
        </div>
      </div>
      <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
        {subject}
      </h3>
      <p className="text-sm text-slate-400">
        {count} tutor{count !== 1 ? 's' : ''} available
      </p>
    </Link>
  );
};
export default SubjectFilterCard