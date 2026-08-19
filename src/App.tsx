import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HabitList } from './components/HabitList';
import { QuoteCard } from './components/QuoteCard';
import { StatsPanel } from './components/StatsPanel';
import { QuickActions } from './components/QuickActions';
import { LoginPage } from './components/LoginPage';

// Modals
import { AddHabitModal } from './components/modals/AddHabitModal';
import { CalendarModal } from './components/modals/CalendarModal';
import { LogActivityModal } from './components/modals/LogActivityModal';
import { AddNoteModal } from './components/modals/AddNoteModal';
import { AnalyticsModal } from './components/modals/AnalyticsModal';

// Initial Data
import { initialHabits, initialDays, initialStats, initialHeatmap } from './data/initialData';
import { Habit, DayOfWeek, UserStats, HeatmapDay, NoteItem, UserProfile } from './types';
import confetti from 'canvas-confetti';

export function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('habitverse_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    
    return {
      id: 'user-demo-123',
      name: 'Alex Morgan',
      email: 'alex@habitverse.app',
      initials: 'AM',
      joinedDate: 'Oct 2026',
      role: 'Level 12 Habit Master',
    };
  });

  const [currentTab, setCurrentTab] = useState('today');
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habitverse_habits');
    return saved ? JSON.parse(saved) : initialHabits;
  });
  const [days] = useState<DayOfWeek[]>(initialDays);
  const [selectedDayId, setSelectedDayId] = useState('d-26');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('habitverse_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });
  const [heatmap] = useState<HeatmapDay[]>(initialHeatmap);
  const [, setNotes] = useState<NoteItem[]>([]);


  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Persistence
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('habitverse_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('habitverse_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('habitverse_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habitverse_stats', JSON.stringify(stats));
  }, [stats]);

  // Auth Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('habitverse_user');
  };

  // Recalculate dynamic statistics when habits change
  const handleToggleHabit = (habitId: string) => {
    setHabits((prevHabits) => {
      const updated = prevHabits.map((h) => {
        if (h.id === habitId) {
          const nextCompleted = !h.completed;
          const currentTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }).format(new Date());

          return {
            ...h,
            completed: nextCompleted,
            completedTime: nextCompleted ? (h.completedTime || currentTime) : null,
            currentCount: nextCompleted && h.type === 'counter' ? (h.targetCount || 5) : (nextCompleted ? h.currentCount : 0),
            completionRate: nextCompleted ? Math.min(100, (h.completionRate || 0) + 20) : Math.max(0, (h.completionRate || 0) - 20),
          };
        }
        return h;
      });

      // Update XP & level dynamically
      const completedCount = updated.filter((h) => h.completed).length;
      const rate = Math.round((completedCount / updated.length) * 100);

      setStats((prevStats) => {
        const addedXP = 50;
        const newXP = prevStats.xp + addedXP;
        const newLevel = Math.floor(newXP / 100) > prevStats.level ? Math.floor(newXP / 100) : prevStats.level;
        return {
          ...prevStats,
          monthlyRate: rate,
          xp: newXP,
          level: newLevel,
        };
      });

      return updated;
    });
  };

  // Water glasses increment/decrement
  const handleUpdateWaterCount = (habitId: string, count: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const target = h.targetCount || 5;
          const isComplete = count >= target;
          const currentTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }).format(new Date());

          if (isComplete && !h.completed) {
            confetti({ particleCount: 40, spread: 60 });
          }

          return {
            ...h,
            currentCount: count,
            completed: isComplete,
            completedTime: isComplete ? (h.completedTime || currentTime) : null,
            completionRate: Math.round((count / target) * 100),
          };
        }
        return h;
      })
    );
  };

  // Add new habit
  const handleAddHabit = (newHabit: Habit) => {
    setHabits((prev) => [newHabit, ...prev]);
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + 100,
    }));
  };

  // Log activity
  const handleLogActivity = (activity: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.title.toLowerCase().includes(activity.toLowerCase()) || activity.toLowerCase().includes(h.title.toLowerCase())) {
          return {
            ...h,
            completed: true,
            completedTime: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date()),
          };
        }
        return h;
      })
    );

    setStats((prev) => ({
      ...prev,
      xp: prev.xp + 25,
    }));
  };

  // Add Note
  const handleSaveNote = (note: { title: string; content: string; mood: string }) => {
    const newNoteItem: NoteItem = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: note.title,
      content: note.content,
      mood: note.mood,
    };
    setNotes((prev) => [newNoteItem, ...prev]);
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + 30,
    }));
  };

  const selectedDayObj = days.find((d) => d.id === selectedDayId);
  const selectedDateLabel = selectedDayObj
    ? `Monday, October ${selectedDayObj.dayNumber}`
    : 'Monday, October 26';

  // If user is not authenticated, render Login Page
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-[#070B14] text-slate-100 font-sans selection:bg-[#00D5B6] selection:text-[#070B14]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        stats={stats}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <Header
          stats={stats}
          user={currentUser}
          selectedDate={selectedDateLabel}
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
          onOpenCalendar={() => setIsCalendarOpen(true)}
          onLogout={handleLogout}
        />

        {/* Dashboard Body Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Main 2-Column Responsive Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Center Column (7 cols): Today's Habits + Motivational Quote */}
            <div className="lg:col-span-7 space-y-6">
              {/* Today's Habits Card */}
              <HabitList
                habits={habits}
                days={days}
                selectedDayId={selectedDayId}
                onSelectDay={setSelectedDayId}
                onToggleHabit={handleToggleHabit}
                onUpdateWaterCount={handleUpdateWaterCount}
                onOpenCalendar={() => setIsCalendarOpen(true)}
                onOpenAddHabit={() => setIsAddHabitOpen(true)}
              />

              {/* Motivational Quote Card with 3D Bullseye Target */}
              <QuoteCard />
            </div>

            {/* Right Column (5 cols): Progress & Statistics + Quick Actions */}
            <div className="lg:col-span-5 space-y-6">
              {/* Progress & Statistics Panel */}
              <StatsPanel
                stats={stats}
                heatmap={heatmap}
                habits={habits}
              />

              {/* Quick Actions Card */}
              <QuickActions
                onAddHabit={() => setIsAddHabitOpen(true)}
                onLogActivity={() => setIsLogActivityOpen(true)}
                onViewCalendar={() => setIsCalendarOpen(true)}
                onAddNote={() => setIsAddNoteOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Modals */}
      <AddHabitModal
        isOpen={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
        onAddHabit={handleAddHabit}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        currentDateStr={selectedDateLabel}
      />

      <LogActivityModal
        isOpen={isLogActivityOpen}
        onClose={() => setIsLogActivityOpen(false)}
        onLog={handleLogActivity}
      />

      <AddNoteModal
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(false)}
        onSaveNote={handleSaveNote}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        stats={stats}
        habits={habits}
      />
    </div>
  );
}

export default App;
