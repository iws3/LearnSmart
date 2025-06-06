import { Plus, Smile } from "lucide-react";
import Link from "next/link";

const NoUserTutorsMessage = () => (
  <section className="relative py-24">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
        <Smile className="w-20 h-20 text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          It seems you have no AI Tutors yet!
        </h2>
        <p className="text-lg text-slate-300 mb-8">
          Don't worry, creating your first AI Tutor is quick and easy. Get started on your personalized learning journey now!
        </p>
        <Link 
          href="/companions/new"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
          Create Your First AI Tutor
        </Link>
        <p className="text-sm text-slate-400 mt-8">
          Once you create tutors, they will appear here in your Staff Room.
        </p>
      </div>
    </div>
  </section>
);

export default NoUserTutorsMessage