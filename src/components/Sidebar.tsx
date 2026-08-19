import React from 'react';
import { 
  Home, 
  BarChart2, 
  Target, 
  Users, 
  Trophy, 
  PieChart, 
  Settings, 
  Check, 
  Star
} from 'lucide-react';
import { UserStats } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  stats: UserStats;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, stats }) => {
  const menuItems = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'my-habits', label: 'My Habits', icon: Target },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const xpProgressPercent = Math.round((stats.xp / stats.xpToNextLevel) * 100);

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col justify-between p-5 bg-[#080E1B] border-r border-[#152033] min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-2 mb-8 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D5B6] to-[#00F0FF] flex items-center justify-center shadow-glow-teal transition-transform duration-300 group-hover:scale-105">
            <Check className="w-6 h-6 text-[#080E1B] stroke-[3]" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5 font-sans">
              HABIT<span className="text-[#00D5B6]">VERSE</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-normal tracking-tight">
              Build better habits, every day.
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00D5B6] to-[#00B4A0] text-[#06151E] font-bold shadow-glow-teal'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0F1A2D]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#06151E] stroke-[2.5]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Gamification / Level Rocket Card */}
      <div className="relative mt-8 rounded-2xl p-4 bg-gradient-to-b from-[#0F1C33] to-[#0A1324] border border-[#1E2E4A] overflow-hidden shadow-lg group">
        {/* Ambient star sparkles */}
        <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-6 left-6 w-1 h-1 bg-purple-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-4 right-8 w-1 h-1 bg-teal-300 rounded-full opacity-50"></div>

        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#162746] flex items-center justify-center border border-cyan-500/30 text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
            <span className="relative">
              🚀
            </span>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm flex items-center gap-1">
              Keep Going! 🚀
            </h4>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Small steps
            </p>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Big changes
            </p>
          </div>
        </div>

        {/* Level and Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-300">Level {stats.level}</span>
            <span className="text-[10px] text-slate-400">{xpProgressPercent}%</span>
          </div>

          <div className="w-full h-1.5 bg-[#090F1C] rounded-full overflow-hidden p-0.5 border border-slate-700/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#A855F7] via-[#00D5B6] to-[#00F0FF] shadow-glow-purple transition-all duration-500"
              style={{ width: `${xpProgressPercent}%` }}
            ></div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-purple-300">
            <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
            <span>{stats.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
