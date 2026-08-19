import React from 'react';
import { 
  Calendar, 
  ChevronRight, 
  Check, 
  Droplet, 
  Activity, 
  BookOpen, 
  Flower2, 
  Ban, 
  CircleDot,
  Plus
} from 'lucide-react';
import { Habit, DayOfWeek } from '../types';
import confetti from 'canvas-confetti';

interface HabitListProps {
  habits: Habit[];
  days: DayOfWeek[];
  selectedDayId: string;
  onSelectDay: (id: string) => void;
  onToggleHabit: (id: string) => void;
  onUpdateWaterCount: (habitId: string, count: number) => void;
  onOpenCalendar: () => void;
  onOpenAddHabit: () => void;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  days,
  selectedDayId,
  onSelectDay,
  onToggleHabit,
  onUpdateWaterCount,
  onOpenCalendar,
  onOpenAddHabit,
}) => {

  const triggerCelebration = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 35,
      spread: 50,
      colors: ['#00D5B6', '#00F0FF', '#A855F7', '#FF8438', '#22C55E'],
    });
  };

  const getHabitIcon = (iconName: string, iconColor: string) => {
    switch (iconName) {
      case 'water':
        return <Droplet className="w-5 h-5" style={{ color: iconColor }} />;
      case 'stretch':
        return <Activity className="w-5 h-5" style={{ color: iconColor }} />;
      case 'book':
        return <BookOpen className="w-5 h-5" style={{ color: iconColor }} />;
      case 'meditate':
        return <Flower2 className="w-5 h-5" style={{ color: iconColor }} />;
      case 'social':
        return <Ban className="w-5 h-5" style={{ color: iconColor }} />;
      default:
        return <CircleDot className="w-5 h-5" style={{ color: iconColor }} />;
    }
  };

  return (
    <div className="rounded-3xl p-6 bg-[#0E1626]/90 border border-[#18263E] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#00D5B6]/15 border border-[#00D5B6]/30 flex items-center justify-center text-[#00D5B6]">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Today's Habits
          </h3>
        </div>

        <button
          onClick={onOpenCalendar}
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[#00D5B6] transition-colors"
        >
          <span>View Calendar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Week Day Selector Strip */}
      <div className="grid grid-cols-7 gap-2 pb-5 mb-5 border-b border-slate-800/80">
        {days.map((day) => {
          const isSelected = selectedDayId === day.id;
          let circleBg = 'bg-[#101A2C] text-slate-400 border-transparent hover:border-slate-700';

          if (isSelected) {
            circleBg = 'bg-[#1C2C45] text-white border border-slate-500 shadow-md font-bold';
          } else if (day.status === 'highlight-purple') {
            circleBg = 'bg-[#A855F7] text-white shadow-glow-purple font-bold';
          } else if (day.status === 'highlight-teal') {
            circleBg = 'bg-[#00D5B6] text-[#06151E] shadow-glow-teal font-bold';
          }

          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className="flex flex-col items-center gap-1.5 focus:outline-none group transition-transform active:scale-95"
            >
              <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-200">
                {day.dayLetter}
              </span>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all duration-200 ${circleBg}`}
              >
                {day.dayNumber}
              </div>
            </button>
          );
        })}
      </div>

      {/* Habit Items List */}
      <div className="space-y-3">
        {habits.map((habit) => {
          return (
            <div
              key={habit.id}
              className={`habit-card flex items-center justify-between p-3.5 rounded-2xl cursor-pointer ${
                habit.completed ? 'bg-[#0F1A2D]/80' : 'bg-[#0D1524]/60'
              }`}
              onClick={(e) => {
                if (!habit.completed) {
                  triggerCelebration(e);
                }
                onToggleHabit(habit.id);
              }}
            >
              {/* Left Habit Info */}
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: habit.iconBg,
                    border: `1px solid ${habit.iconColor}33`,
                  }}
                >
                  {getHabitIcon(habit.icon, habit.iconColor)}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    {habit.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {habit.subtitle}
                  </p>
                </div>
              </div>

              {/* Center / Right Section (Water Tracker or Info) */}
              <div className="flex items-center gap-4 sm:gap-6" onClick={(e) => e.stopPropagation()}>
                {/* Water Glasses visual indicator */}
                {habit.type === 'counter' && habit.targetCount && (
                  <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#09111E]/70 rounded-xl border border-cyan-900/40">
                    {Array.from({ length: habit.targetCount }).map((_, index) => {
                      const isFilled = (habit.currentCount ?? 0) > index;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            const newCount = index + 1 === habit.currentCount ? index : index + 1;
                            onUpdateWaterCount(habit.id, newCount);
                          }}
                          className={`water-glass w-5 h-7 rounded-b-md rounded-t-sm border transition-all duration-150 ${
                            isFilled
                              ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                              : 'bg-transparent border-slate-600 hover:border-cyan-400'
                          }`}
                          title={`Glass ${index + 1}`}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Status Badge & Checkmark */}
                <div 
                  className="flex items-center gap-3"
                  onClick={(e) => {
                    if (!habit.completed) triggerCelebration(e);
                    onToggleHabit(habit.id);
                  }}
                >
                  {/* Status Text */}
                  <div className="text-right min-w-[70px]">
                    <div
                      className={`text-xs font-bold ${
                        habit.completed ? 'text-[#00D5B6]' : 'text-slate-400'
                      }`}
                    >
                      {habit.completed ? 'Completed' : 'Pending'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {habit.completed ? habit.completedTime || 'Done' : '—'}
                    </div>
                  </div>

                  {/* Icon Button */}
                  <button
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      habit.completed
                        ? 'bg-[#00D5B6] text-[#080E1B] shadow-glow-teal'
                        : 'border-2 border-slate-600 hover:border-slate-400 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>

                  {/* Chevron Right */}
                  <ChevronRight className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Habit Quick Row */}
      <button
        onClick={onOpenAddHabit}
        className="w-full mt-4 py-2.5 px-4 rounded-2xl border border-dashed border-slate-700/80 hover:border-[#00D5B6]/50 bg-[#0A101C]/40 hover:bg-[#0F1C30]/50 text-slate-400 hover:text-[#00D5B6] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Add a new custom habit</span>
      </button>
    </div>
  );
};
