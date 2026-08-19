import React, { useState } from 'react';
import { X, FileText, Smile, Meh, Zap, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (note: { title: string; content: string; mood: string }) => void;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onSaveNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('energized');

  if (!isOpen) return null;

  const moods = [
    { id: 'energized', label: 'Energized', icon: Zap, color: '#EAB308' },
    { id: 'happy', label: 'Great', icon: Smile, color: '#00D5B6' },
    { id: 'calm', label: 'Mindful', icon: Heart, color: '#A855F7' },
    { id: 'neutral', label: 'Okay', icon: Meh, color: '#94A3B8' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSaveNote({
      title: title.trim() || 'Daily Reflection',
      content: content.trim(),
      mood: selectedMood,
    });

    confetti({ particleCount: 30, spread: 40 });
    onClose();
    setTitle('');
    setContent('');
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
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Daily Reflection Note</h3>
            <p className="text-xs text-slate-400">Jot down notes, feelings, or habit insights</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">How are you feeling today?</label>
            <div className="grid grid-cols-4 gap-2">
              {moods.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1C273C] border-orange-400 text-white shadow-glow-orange'
                        : 'bg-[#0B1322] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" style={{ color: m.color }} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Note Title</label>
            <input
              type="text"
              placeholder="e.g. Great morning momentum..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1322] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Thoughts</label>
            <textarea
              rows={4}
              required
              placeholder="Write your reflections, challenges overcome, or reminders for tomorrow..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1322] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-400 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8438] to-[#EA580C] text-white text-xs font-bold hover:shadow-glow-orange transition-all active:scale-95"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
