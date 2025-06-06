// --- Feature Card for WhyChooseUsSection ---
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}
const FeatureCard = ({ icon: Icon, title, description, color }: Feature) => (
  <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-full h-full text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

export default FeatureCard