import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  ArrowUpRight,
  Droplet,
  Activity,
  BookOpen,
  Flower2,
  Ban
} from 'lucide-react';
import { UserStats, HeatmapDay, Habit } from '../types';

interface StatsPanelProps {
  stats: UserStats;
  heatmap: HeatmapDay[];
  habits: Habit[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, heatmap, habits }) => {
  const daysHeader = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Map intensity color for heatmap dots
  const getDotColor = (intensity: string) => {
    switch (intensity) {
      case 'yellow':
        return 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]';
      case 'teal':
        return 'bg-[#00D5B6] shadow-[0_0_6px_rgba(0,213,182,0.6)]';
      case 'green':
        return 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]';
      case 'purple':
        return 'bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]';
      default:
        return 'bg-[#152033]';
    }
  };

  // Habit breakdown icons matching each habit
  const getBreakdownIcon = (icon: string) => {
    switch (icon) {
      case 'water':
        return <Droplet className="w-4 h-4 text-cyan-400" />;
      case 'stretch':
        return <Activity className="w-4 h-4 text-orange-400" />;
      case 'book':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'meditate':
        return <Flower2 className="w-4 h-4 text-purple-400" />;
      case 'social':
        return <Ban className="w-4 h-4 text-rose-400" />;
      default:
        return <Flame className="w-4 h-4 text-slate-400" />;
    }
  };

  // Bar gradient mapping
  const getBarGradient = (icon: string) => {
    switch (icon) {
      case 'water':
        return 'from-[#00D5B6] to-[#00A896]';
      case 'stretch':
        return 'from-[#FF8438] to-[#EA580C]';
      case 'book':
        return 'from-[#22C55E] to-[#16A34A]';
      case 'meditate':
        return 'from-[#A855F7] to-[#7E22CE]';
      case 'social':
        return 'from-[#EF4444] to-[#991B1B]';
      default:
        return 'from-blue-500 to-indigo-600';
    }
  };

  // Calculate dynamic circular gauge stroke dash offset (circumference = 2 * PI * 34 ≈ 213.6)
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.monthlyRate / 100) * circumference;

  return (
    <div className="rounded-3xl p-6 bg-[#0E1626]/90 border border-[#18263E] shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#00D5B6]/15 border border-[#00D5B6]/30 flex items-center justify-center text-[#00D5B6]">
          <TrendingUp className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide">
          Progress & Statistics
        </h3>
      </div>

      {/* Habit Streak & Heatmap Card */}
      <div className="p-4 rounded-2xl bg-[#0B1220] border border-[#162238] flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Habit Streak</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.streak} <span className="text-sm font-semibold text-slate-300">days</span>
          </div>
          <p className="text-xs font-bold text-amber-400 flex items-center gap-1 mt-1">
            Keep it up! 🔥
          </p>
        </div>

        {/* Heatmap Grid */}
        <div className="flex flex-col items-center">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5 text-[10px] font-bold text-slate-500 text-center w-full">
            {daysHeader.map((d, i) => (
              <span key={i} className="w-3.5">{d}</span>
            ))}
          </div>

          {/* Dots Grid (5 rows x 7 cols) */}
          <div className="grid grid-cols-7 gap-1.5">
            {heatmap.map((dot, idx) => (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${getDotColor(
                  dot.intensity
                )}`}
                title={`${dot.date}: Activity level (${dot.intensity})`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Completion Rate Card */}
      <div className="p-4 rounded-2xl bg-[#0B1220] border border-[#162238]">
        <h4 className="text-xs font-bold text-slate-400 mb-3">
          Monthly Completion Rate
        </h4>

        <div className="flex items-center justify-between gap-4">
          {/* Circular Donut Gauge */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-slate-800"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress circle with cyan-teal gradient */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="url(#completionGradient)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="completionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D5B6" />
                  <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-white">{stats.monthlyRate}%</span>
            </div>
          </div>

          {/* SVG Smooth Sparkline / Trend Area Chart */}
          <div className="flex-1 flex flex-col items-end">
            <div className="w-full h-12">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D5B6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00D5B6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area fill under curve */}
                <path
                  d="M0,35 Q 20,30 40,20 T 70,18 T 100,6 L 100,40 L 0,40 Z"
                  fill="url(#waveGradient)"
                />
                {/* Smooth curve line */}
                <path
                  d="M0,35 Q 20,30 40,20 T 70,18 T 100,6"
                  fill="none"
                  stroke="#00D5B6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Growth indicator */}
            <div className="flex items-center gap-1 text-xs font-bold text-[#00D5B6] mt-1">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              <span>{stats.rateChangeVsLastMonth}%</span>
              <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Habit Breakdown Bar Chart */}
      <div className="p-4 rounded-2xl bg-[#0B1220] border border-[#162238]">
        <h4 className="text-xs font-bold text-slate-400 mb-4">
          Habit Breakdown
        </h4>

        {/* 5 Vertical Bars */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end h-40 pt-6 px-1">
          {habits.slice(0, 5).map((habit) => {
            const percentage = habit.completionRate ?? (habit.completed ? 100 : 0);

            return (
              <div key={habit.id} className="flex flex-col items-center h-full justify-end group">
                {/* Percentage label above bar */}
                <span className="text-[11px] font-bold text-slate-300 mb-1.5 transition-transform group-hover:scale-110">
                  {percentage}%
                </span>

                {/* Vertical Bar Container */}
                <div className="w-full max-w-[28px] h-24 bg-[#142034] rounded-t-xl rounded-b-md overflow-hidden flex flex-col justify-end p-0.5">
                  <div
                    className={`w-full rounded-t-lg rounded-b-sm bg-gradient-to-t ${getBarGradient(
                      habit.icon
                    )} transition-all duration-700 ease-out shadow-sm`}
                    style={{ height: `${Math.max(percentage, 4)}%` }}
                  />
                </div>

                {/* Habit Icon Below Bar */}
                <div className="mt-2.5 w-7 h-7 rounded-lg bg-[#142034] flex items-center justify-center transition-transform group-hover:scale-110">
                  {getBreakdownIcon(habit.icon)}
                </div>

                {/* Habit short label */}
                <span className="text-[9px] font-medium text-slate-400 text-center truncate w-full mt-1">
                  {habit.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
