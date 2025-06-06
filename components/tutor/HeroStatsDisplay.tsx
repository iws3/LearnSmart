import StatsCard from "./StatsCard";

// --- Hero Stats Display ---
type StatItem = { label: string; value: string; icon: React.ElementType; change: string };
const HeroStatsDisplay = ({ stats }: { stats: StatItem[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
    {stats.map((stat, index) => (
      <StatsCard key={index} {...stat} />
    ))}
  </div>
);

export default HeroStatsDisplay