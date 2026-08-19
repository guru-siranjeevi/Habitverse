import React from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDateStr?: string;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // October 2026 calendar days simulation
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Completed days in October
  const completedDays = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 29, 30];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0F172A] border border-[#1E293B] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1E293B] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Habit Calendar</h3>
            <p className="text-xs text-slate-400">October 2026 • Consistency View</p>
          </div>
        </div>

        {/* Month header */}
        <div className="flex items-center justify-between px-2 mb-4">
          <button className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-slate-200">October 2026</span>
          <button className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
          {daysOfWeek.map((d) => (
            <span key={d} className="text-[11px] font-bold text-slate-500">
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {/* October starts on Thursday (index 4) so 4 blanks */}
          <div className="h-9"></div>
          <div className="h-9"></div>
          <div className="h-9"></div>
          <div className="h-9"></div>

          {calendarDays.map((day) => {
            const isCompleted = completedDays.includes(day);
            const isSelected = day === 26;

            return (
              <div
                key={day}
                className={`h-9 rounded-xl flex flex-col items-center justify-center relative text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#00D5B6] text-[#06151E] font-bold shadow-glow-teal scale-105'
                    : isCompleted
                    ? 'bg-[#15233D] text-[#00D5B6] border border-[#00D5B6]/30'
                    : 'bg-[#0B1322] text-slate-500 hover:bg-[#121E33]'
                }`}
              >
                <span>{day}</span>
                {isCompleted && !isSelected && (
                  <span className="w-1 h-1 bg-[#00D5B6] rounded-full mt-0.5"></span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D5B6]"></span>
            <span>Completed (25/31)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15233D]"></span>
            <span>Rest / Missed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
