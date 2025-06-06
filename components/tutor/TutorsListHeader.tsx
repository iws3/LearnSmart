"use client"
import { Filter, Grid, Star } from "lucide-react";

const TutorsListHeader = ({ tutorsCount }: { tutorsCount: number }) => {
  const handleFilterClick = () => console.log("Filter button clicked");
  const handleGridViewClick = () => console.log("Grid view button clicked");
  // Add List view button if needed

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Your AI Teaching Staff
        </h2>
        <p className="text-slate-400">
          {tutorsCount > 0 ? `${tutorsCount} expert tutor${tutorsCount !== 1 ? 's' : ''} ready to help you learn` : "No tutors match your current view."}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-1 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-white">Highly Rated</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={handleFilterClick}
            aria-label="Filter tutors"
            className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button 
            type="button" 
            onClick={handleGridViewClick}
            aria-label="Grid view"
            className="p-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            <Grid className="w-5 h-5" />
          </button>
          {/* Add List view button if needed
          <button type="button" onClick={() => console.log("List view")} className="p-3 ..."><List className="w-5 h-5" /></button>
          */}
        </div>
      </div>
    </div>
  );
};

export default TutorsListHeader