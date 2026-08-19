import React, { useState } from 'react';
import { X, CheckCircle2, Droplet, Clock, Flame, Dumbbell } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLog: (activity: string, amount: string) => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({ isOpen, onClose, onLog }) => {
  const [activity, setActivity] = useState('Drink Water');
  const [amount, setAmount] = useState('1 glass');

  if (!isOpen) return null;

  const quickActivities = [
    { title: 'Drink Water', icon: Droplet, defaultAmount: '1 glass (+250ml)', color: '#38BDF8' },
    { title: 'Workout / Stretch', icon: Dumbbell, defaultAmount: '15 mins', color: '#FF8438' },
    { title: 'Meditation', icon: Flame, defaultAmount: '10 mins', color: '#A855F7' },
    { title: 'Focus Session', icon: Clock, defaultAmount: '25 mins (Pomodoro)', color: '#10B981' },
  ];

  const handleQuickSelect = (title: string, defAmt: string) => {
    setActivity(title);
    setAmount(defAmt);
  };

  const handleSave = () => {
    onLog(activity, amount);
    confetti({ particleCount: 40, spread: 50 });
    onClose();
  };

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
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Log Habit Activity</h3>
            <p className="text-xs text-slate-400">Record a quick session or measurement</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {quickActivities.map((act) => {
                const Icon = act.icon;
                const isSelected = activity === act.title;
                return (
                  <button
                    key={act.title}
                    onClick={() => handleQuickSelect(act.title, act.defaultAmount)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'bg-[#15273C] border-emerald-500 text-white'
                        : 'bg-[#0B1322] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" style={{ color: act.color }} />
                    <span className="truncate">{act.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Activity Description</label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1322] border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Amount / Duration</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1322] border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all active:scale-95"
            >
              Confirm Log (+25 XP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
