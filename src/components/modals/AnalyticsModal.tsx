import React from 'react';
import { X, TrendingUp, Award, Target, Flame, CheckCircle, Zap } from 'lucide-react';
import { UserStats, Habit } from '../../types';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  habits: Habit[];
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose, stats, habits }) => {
  if (!isOpen) return null;

  const totalCompleted = habits.filter((h) => h.completed).length;
  const completionPercentage = habits.length > 0 ? Math.round((totalCompleted / habits.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0F172A] border border-[#1E293B] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1E293B] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00D5B6]/15 border border-[#00D5B6]/30 flex items-center justify-center text-[#00D5B6]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Habit Analytics & Insights</h3>
            <p className="text-xs text-slate-400">Detailed breakdown of your performance</p>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0B1322] border border-slate-800 text-center">
            <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">{stats.streak} Days</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Current Streak</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B1322] border border-slate-800 text-center">
            <Target className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">{completionPercentage}%</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Today's Score</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B1322] border border-slate-800 text-center">
            <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">Level {stats.level}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Rank</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B1322] border border-slate-800 text-center">
            <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">{stats.xp}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Total XP</div>
          </div>
        </div>

        {/* Breakdown Progress */}
        <div className="p-4 rounded-2xl bg-[#0B1322] border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Habit Consistency Index
          </h4>
          {habits.map((habit) => {
            const rate = habit.completionRate ?? (habit.completed ? 100 : 0);
            return (
              <div key={habit.id} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{habit.title}</span>
                  <span className="text-[#00D5B6] font-bold">{rate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00D5B6] to-[#A855F7] transition-all duration-500"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Tip */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00D5B6]/10 to-purple-600/10 border border-[#00D5B6]/20 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-[#00D5B6] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-bold">Pro Tip:</strong> You have the highest completion rate in the morning. Completing "Drink Water" and "Morning Stretch" before 9 AM boosts your daily streak consistency by 84%.
          </p>
        </div>
      </div>
    </div>
  );
};
