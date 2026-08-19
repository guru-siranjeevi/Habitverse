import React from 'react';
import { Plus, CheckCircle2, Calendar, FileText } from 'lucide-react';

interface QuickActionsProps {
  onAddHabit: () => void;
  onLogActivity: () => void;
  onViewCalendar: () => void;
  onAddNote: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddHabit,
  onLogActivity,
  onViewCalendar,
  onAddNote,
}) => {
  return (
    <div className="rounded-3xl p-6 bg-[#0E1626]/90 border border-[#18263E] shadow-xl">
      <h3 className="text-sm font-bold text-slate-300 mb-4 tracking-wide">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* + Add Habit (Teal button) */}
        <button
          onClick={onAddHabit}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00D5B6] to-[#00B4A0] text-[#06151E] font-bold text-xs sm:text-sm hover:shadow-glow-teal transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Habit</span>
        </button>

        {/* Log Activity (Emerald button) */}
        <button
          onClick={onLogActivity}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs sm:text-sm hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all duration-200 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>Log Activity</span>
        </button>

        {/* View Calendar (Purple button) */}
        <button
          onClick={onViewCalendar}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white font-bold text-xs sm:text-sm hover:shadow-glow-purple transition-all duration-200 active:scale-95"
        >
          <Calendar className="w-4 h-4 stroke-[2.5]" />
          <span>View Calendar</span>
        </button>

        {/* Add Note (Orange button) */}
        <button
          onClick={onAddNote}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF8438] to-[#EA580C] text-white font-bold text-xs sm:text-sm hover:shadow-glow-orange transition-all duration-200 active:scale-95"
        >
          <FileText className="w-4 h-4 stroke-[2.5]" />
          <span>Add Note</span>
        </button>
      </div>
    </div>
  );
};
