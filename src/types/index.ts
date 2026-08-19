export interface Habit {
  id: string;
  title: string;
  subtitle: string;
  icon: 'water' | 'stretch' | 'book' | 'meditate' | 'social' | 'custom' | string;
  iconColor: string;
  iconBg: string;
  completed: boolean;
  completedTime?: string | null;
  type?: 'counter' | 'check';
  targetCount?: number;
  currentCount?: number;
  unit?: string;
  completionRate?: number; // percentage for habit breakdown
  category?: string;
  frequency?: string;
}

export interface DayOfWeek {
  id: string;
  dayLetter: string;
  dayNumber: number;
  fullDate: string;
  status: 'selected' | 'highlight-purple' | 'highlight-teal' | 'default';
  isCurrent?: boolean;
}

export interface UserStats {
  streak: number;
  monthlyRate: number;
  rateChangeVsLastMonth: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  notificationsCount: number;
}

export interface HeatmapDay {
  dayOfWeek: number; // 0-6 (S M T W T F S)
  weekIndex: number;
  intensity: 'none' | 'yellow' | 'green' | 'teal' | 'purple';
  date: string;
}

export interface NoteItem {
  id: string;
  date: string;
  title: string;
  content: string;
  mood?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  joinedDate?: string;
  role?: string;
}

