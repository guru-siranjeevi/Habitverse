import React, { useState } from 'react';
import { X, Droplet, Activity, BookOpen, Flower2, Ban, Dumbbell, Sparkles, Moon, Zap } from 'lucide-react';
import { Habit } from '../../types';
import confetti from 'canvas-confetti';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habit: Habit) => void;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAddHabit }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('water');
  const [selectedColor, setSelectedColor] = useState('#00D5B6');
  const [category] = useState('Health');
  const [isCounter, setIsCounter] = useState(false);
  const [targetCount, setTargetCount] = useState(5);

  if (!isOpen) return null;

  const iconOptions = [
    { id: 'water', icon: Droplet, label: 'Water' },
    { id: 'stretch', icon: Activity, label: 'Stretch' },
    { id: 'book', icon: BookOpen, label: 'Reading' },
    { id: 'meditate', icon: Flower2, label: 'Mind' },
    { id: 'fitness', icon: Dumbbell, label: 'Fitness' },
    { id: 'sleep', icon: Moon, label: 'Sleep' },
    { id: 'energy', icon: Zap, label: 'Energy' },
    { id: 'social', icon: Ban, label: 'Focus' },
  ];

  const colorOptions = [
    '#00D5B6', // Teal
    '#38BDF8', // Sky Cyan
    '#FF8438', // Orange
    '#34D399', // Emerald
    '#A855F7', // Purple
    '#EC4899', // Pink
    '#EF4444', // Red
    '#EAB308', // Amber
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Daily habit',
      icon: selectedIcon,
      iconColor: selectedColor,
      iconBg: `${selectedColor}22`,
      completed: false,
      completedTime: null,
      type: isCounter ? 'counter' : 'check',
      targetCount: isCounter ? targetCount : undefined,
      currentCount: isCounter ? 0 : undefined,
      completionRate: 0,
      category,
      frequency: 'Daily',
    };

    onAddHabit(newHabit);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    onClose();
    setTitle('');
    setSubtitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0F172A] border border-[#1E293B] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1E293B] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#00D5B6]/15 border border-[#00D5B6]/30 flex items-center justify-center text-[#00D5B6]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Create New Habit</h3>
            <p className="text-xs text-slate-400">Track a new daily routine to boost your consistency</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Habit Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Read 20 pages, Drink Water, Walk 5k..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1322] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D5B6] transition-colors"
            />
          </div>

          {/* Subtitle / Goal target */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Target / Goal Description</label>
            <input
              type="text"
              placeholder="e.g. 10 minutes, 5 glasses, Focus time"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1322] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D5B6] transition-colors"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Choose Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = selectedIcon === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedIcon(opt.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#162746] border-[#00D5B6] text-white shadow-glow-teal'
                        : 'bg-[#0B1322] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-[#00D5B6]" />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Theme Color</label>
            <div className="flex items-center gap-2.5">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    selectedColor === color ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#0F172A]' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Toggle Counter Mode (like water glasses) */}
          <div className="p-3 rounded-xl bg-[#0B1322] border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Glass / Rep Counter</span>
              <span className="text-[11px] text-slate-400">Track quantity (e.g. 5 glasses of water)</span>
            </div>
            <input
              type="checkbox"
              checked={isCounter}
              onChange={(e) => setIsCounter(e.target.checked)}
              className="w-5 h-5 accent-[#00D5B6] cursor-pointer rounded"
            />
          </div>

          {isCounter && (
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-300">Target Count:</label>
              <input
                type="number"
                min="1"
                max="20"
                value={targetCount}
                onChange={(e) => setTargetCount(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-1.5 rounded-lg bg-[#0B1322] border border-slate-700 text-white text-xs font-bold text-center"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D5B6] to-[#00B4A0] text-[#06151E] text-xs font-bold hover:shadow-glow-teal transition-all active:scale-95"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
