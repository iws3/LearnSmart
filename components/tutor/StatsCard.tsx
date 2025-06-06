// --- Stats Card Component --- (As provided)
const StatsCard = ({ label, value, icon: Icon, change }: { label: string; value: string; icon: any; change: string }) => (
  <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <span className="text-sm font-medium text-green-400">{change}</span>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-slate-400 text-sm">{label}</p>
  </div>
);

export default StatsCard