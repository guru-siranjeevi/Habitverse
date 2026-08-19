import React, { useState } from 'react';
import { Sun, Calendar as CalendarIcon, TrendingUp, Bell, LogOut, Award, Sparkles } from 'lucide-react';
import { UserStats, UserProfile } from '../types';

interface HeaderProps {
  stats: UserStats;
  user: UserProfile | null;
  selectedDate: string;
  onOpenAnalytics: () => void;
  onOpenCalendar: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  user,
  selectedDate,
  onOpenAnalytics,
  onOpenCalendar,
  onLogout,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(stats.notificationsCount);

  const notifications = [
    { id: 1, text: "🔥 You're on a 15-day streak! Don't break it today.", time: "10m ago" },
    { id: 2, text: "💧 Completed 'Drink Water' goal early!", time: "3h ago" },
    { id: 3, text: "⭐ Level 12 reached! 750 XP to Level 13.", time: "Yesterday" }
  ];

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 px-8 border-b border-[#141F32]">
      {/* Title & Greeting */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Sun className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Daily Check-in
          </h2>
          <div 
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00D5B6] hover:text-[#38BDF8] cursor-pointer transition-colors mt-0.5"
          >
            <span>{selectedDate}</span>
            <CalendarIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 self-end sm:self-center">
        {/* Analytics button */}
        <button
          onClick={onOpenAnalytics}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F2232] border border-[#00D5B6]/40 hover:border-[#00D5B6] text-[#00D5B6] text-xs sm:text-sm font-semibold transition-all duration-200 hover:shadow-glow-teal active:scale-95"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileDropdownOpen(false);
              if (notifCount > 0) setNotifCount(0);
            }}
            className="relative w-10 h-10 rounded-xl bg-[#101A2D] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-all active:scale-95"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A855F7] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow-purple border-2 border-[#080D1A]">
                {notifCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0F1C31] border border-[#1E2E4A] p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 mb-2">
                <span className="font-bold text-xs text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[11px] text-[#00D5B6] cursor-pointer hover:underline" onClick={() => setNotificationsOpen(false)}>Close</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-[#14233D]/60 hover:bg-[#14233D] text-xs text-slate-300">
                    <p className="text-slate-200">{n.text}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 pr-2 rounded-xl bg-[#0F2232] border border-[#00D5B6]/50 hover:border-[#00D5B6] text-[#00D5B6] transition-all hover:scale-105 active:scale-95"
            title="User Profile"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D5B6] to-[#00F0FF] text-[#080E1B] font-extrabold text-xs flex items-center justify-center shadow-inner">
              {user?.initials || 'AM'}
            </div>
            <span className="hidden md:block text-xs font-bold text-slate-200">
              {user?.name || 'Alex Morgan'}
            </span>
          </button>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0F1C31] border border-[#1E2E4A] p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* User summary */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D5B6] to-[#00F0FF] text-[#080E1B] font-extrabold text-sm flex items-center justify-center">
                  {user?.initials || 'AM'}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">{user?.name || 'Alex Morgan'}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email || 'alex@habitverse.app'}</p>
                </div>
              </div>

              {/* Status & Badges */}
              <div className="py-2.5 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#14233D]/70">
                  <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Level {stats.level}</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{stats.xp.toLocaleString()} XP</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-[#14233D]/70">
                  <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Streak</span>
                  </span>
                  <span className="text-[11px] font-bold text-orange-300">{stats.streak} Days 🔥</span>
                </div>
              </div>

              {/* Logout Option */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
