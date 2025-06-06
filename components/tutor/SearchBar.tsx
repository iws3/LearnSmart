"use client"
import { Brain, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchBar = ({ initialSearch }: { initialSearch?: string }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(currentSearchParams.toString());
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    router.push(`/companions?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:bg-slate-800/70 transition-all duration-300">
      <div className="flex items-center">
        
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tutors, subjects, or topics..."
          className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-4 focus:outline-none text-lg"
        />
        <button 
          type="submit"
        //   className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 hover:shadow-lg transition-all duration-300 flex items-center gap-2 hidden"
        >
         <Search className="w-6 h-6 text-slate-400 ml-4" />
       
        </button>
      </div>
    </form>
  );
};

export default SearchBar