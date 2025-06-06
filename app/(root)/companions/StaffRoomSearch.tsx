'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Brain, Users, BookOpen, Star, Activity } from 'lucide-react';

// You might want to pass these as props if they are dynamic from the server
// or keep them static if they are just for display/initial suggestion.
// For this example, I'll assume uniqueSubjects is passed as a prop.
interface StaffRoomSearchProps {
  initialSearchQuery?: string;
  uniqueSubjects: string[];
}

const StaffRoomSearch: React.FC<StaffRoomSearchProps> = ({ initialSearchQuery = '', uniqueSubjects }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams(); // Get current search params

  // Effect to update internal state if the URL search param changes (e.g., browser back/forward)
  useEffect(() => {
    setSearchTerm(initialSearchQuery || '');
  }, [initialSearchQuery]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // Prevent default form submission if it's part of a form

    const params = new URLSearchParams(currentSearchParams.toString()); // Preserve existing params
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search'); // Remove search param if input is empty
    }
    // When performing a new text search, you might want to clear subject/topic filters
    // params.delete('subject');
    // params.delete('topic');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubjectButtonClick = (subject: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set('subject', subject);
    // When selecting a subject, you might want to clear the generic search and topic
    params.delete('search');
    params.delete('topic');
    setSearchTerm(''); // Clear the search input field
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto relative mb-16">
      <form onSubmit={handleSearchSubmit} className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:bg-slate-800/70 transition-all duration-300">
        <div className="flex items-center">
          <Search className="w-6 h-6 text-slate-400 ml-4" />
          <input
            type="text"
            placeholder="Search tutors, subjects, or topics..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-4 focus:outline-none text-lg"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            Find Tutor
          </button>
        </div>
      </form>

      {/* Popular Subjects */}
      {uniqueSubjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {uniqueSubjects.slice(0, 5).map((subject) => (
            <button
              key={subject}
              onClick={() => handleSubjectButtonClick(subject)}
              className="px-4 py-2 bg-slate-800/30 border border-slate-700/50 text-slate-300 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 text-sm"
            >
              {subject}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffRoomSearch;