import Link from "next/link";

// --- Popular Subjects Links ---
const PopularSubjectsLinks = ({ subjects, currentSearch }: { subjects: string[]; currentSearch?: string; }) => (
  <div className="flex flex-wrap justify-center gap-2 mt-4">
    {subjects.slice(0, 5).map((subject) => {
      const queryParams = new URLSearchParams();
      if (currentSearch) queryParams.set('search', currentSearch);
      queryParams.set('subject', subject);
      return (
        <Link
          key={subject}
          href={`/companions?${queryParams.toString()}`}
          className="px-4 py-2 bg-slate-800/30 border border-slate-700/50 text-slate-300 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 text-sm"
        >
          {subject}
        </Link>
      );
    })}
  </div>
);

export default PopularSubjectsLinks
