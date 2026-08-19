import React, { useState } from 'react';
import { Quote as QuoteIcon, Sparkles, RefreshCw } from 'lucide-react';

export const QuoteCard: React.FC = () => {
  const quotes = [
    {
      text: "Discipline is choosing between what you want now and what you want most.",
      author: "Abraham Lincoln",
    },
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle",
    },
    {
      text: "You do not rise to the level of your goals. You fall to the level of your systems.",
      author: "James Clear",
    },
    {
      text: "Small daily improvements over time lead to stunning results.",
      author: "Robin Sharma",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const currentQuote = quotes[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-[#0C162A] via-[#101D36] to-[#12162E] border border-[#1C2C47] shadow-xl flex items-center justify-between group">
      {/* Background ambient light */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Quote text */}
      <div className="relative z-10 max-w-[70%] pr-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <QuoteIcon className="w-4 h-4" />
          </div>
          <button 
            onClick={nextQuote}
            className="text-[11px] font-medium text-slate-500 hover:text-purple-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Next quote"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Shuffle</span>
          </button>
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-200 leading-relaxed font-sans italic">
          "{currentQuote.text}"
        </p>

        <p className="text-xs font-bold text-[#00D5B6] mt-2 tracking-wide">
          — {currentQuote.author}
        </p>
      </div>

      {/* 3D Target Illustration with Arrow */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
        {/* Glow behind target */}
        <div className="absolute w-24 h-24 bg-gradient-to-tr from-pink-500/20 via-purple-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse-slow"></div>

        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Sparkles */}
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-300 animate-bounce" />
          <div className="absolute bottom-1 -left-2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></div>

          {/* SVG 3D-styled concentric target with dart */}
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="targetOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2A4A" />
                <stop offset="100%" stopColor="#0B1324" />
              </linearGradient>
              <linearGradient id="targetRing1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="targetRing2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#00D5B6" />
              </linearGradient>
              <linearGradient id="arrowShaft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <filter id="glowTarget" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Stand & Shadow */}
            <ellipse cx="60" cy="105" rx="35" ry="8" fill="#050B16" opacity="0.8" />

            {/* Outer Rim Ring */}
            <circle cx="60" cy="60" r="48" fill="url(#targetOuter)" stroke="#334155" strokeWidth="3" />

            {/* Ring 1 - Pink / Violet */}
            <circle cx="60" cy="60" r="38" fill="url(#targetRing1)" stroke="#F472B6" strokeWidth="1.5" />

            {/* Ring 2 - White Inner */}
            <circle cx="60" cy="60" r="28" fill="#F8FAFC" />

            {/* Ring 3 - Teal / Cyan Bullseye Ring */}
            <circle cx="60" cy="60" r="18" fill="url(#targetRing2)" />

            {/* Center Bullseye */}
            <circle cx="60" cy="60" r="9" fill="#0F172A" />
            <circle cx="60" cy="60" r="5" fill="#00F0FF" filter="url(#glowTarget)" />

            {/* Target Crosshair lines */}
            <line x1="60" y1="18" x2="60" y2="102" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="18" y1="60" x2="102" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />

            {/* Dart / Arrow in Bullseye */}
            <g transform="translate(60, 60) rotate(-45)">
              {/* Arrow shaft */}
              <line x1="0" y1="0" x2="45" y2="0" stroke="url(#arrowShaft)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Arrow feathers / fletching */}
              <polygon points="35,-8 48,-10 44,0" fill="#00D5B6" />
              <polygon points="35,8 48,10 44,0" fill="#00D5B6" />
              <polygon points="40,-4 52,0 40,4" fill="#00F0FF" />
              {/* Impact point */}
              <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
