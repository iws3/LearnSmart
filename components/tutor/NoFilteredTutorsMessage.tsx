import { Frown, Users } from "lucide-react";
import Link from "next/link";

// --- No Filtered Tutors Message ---
const NoFilteredTutorsMessage = () => (
  <div className="text-center py-20">
    <div className="w-24 h-24 bg-slate-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
      <Frown className="w-12 h-12 text-slate-400" /> {/* Changed icon */}
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No tutors found</h3>
    <p className="text-slate-400 mb-6">Try adjusting your search criteria or filters, or explore all your tutors.</p>
    <Link 
      href="/staff-room" // Clears filters by going to base page
      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 hover:shadow-lg transition-all duration-300"
    >
      <Users className="w-5 h-5" />
      View All Your Tutors
    </Link>
  </div>
);

export default NoFilteredTutorsMessage
