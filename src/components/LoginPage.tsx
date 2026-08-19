import React, { useState } from 'react';
import { 
  Check, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isSignUp) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const userName = isSignUp ? name.trim() : (email.split('@')[0] || 'Habit Builder');
      const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2) || 'HV';

      const userProfile: UserProfile = {
        id: `user-${Date.now()}`,
        name: isSignUp ? name.trim() : (email === 'alex@habitverse.app' ? 'Alex Morgan' : userName.charAt(0).toUpperCase() + userName.slice(1)),
        email: email.trim().toLowerCase(),
        initials: initials,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        role: 'Habit Master (Level 12)',
      };

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00D5B6', '#00F0FF', '#A855F7', '#FF8438'],
      });

      onLoginSuccess(userProfile);
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('alex@habitverse.app');
    setPassword('habitverse2026');
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const demoUser: UserProfile = {
        id: 'user-demo-123',
        name: 'Alex Morgan',
        email: 'alex@habitverse.app',
        initials: 'AM',
        joinedDate: 'Oct 2026',
        role: 'Level 12 Habit Master',
      };

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00D5B6', '#00F0FF', '#A855F7', '#FF8438'],
      });

      onLoginSuccess(demoUser);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#070B14] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#00D5B6] selection:text-[#070B14]">
      {/* Background ambient lighting glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00D5B6]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-[#0E1626]/90 border border-[#1C2C47] shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Side: Brand Showcase & Value Props (Visible on LG) */}
        <div className="lg:col-span-5 p-8 lg:p-10 bg-gradient-to-br from-[#0B1322] via-[#0D182E] to-[#0A111F] border-b lg:border-b-0 lg:border-r border-[#1C2C47] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle star particle effects */}
          <div className="absolute top-10 right-8 w-1.5 h-1.5 bg-teal-300 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-20 left-6 w-1 h-1 bg-purple-400 rounded-full opacity-50"></div>

          {/* Brand Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00D5B6] to-[#00F0FF] flex items-center justify-center shadow-glow-teal">
                <Check className="w-6 h-6 text-[#080E1B] stroke-[3]" />
              </div>
              <div>
                <h1 className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1">
                  HABIT<span className="text-[#00D5B6]">VERSE</span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">Daily Habit Tracker</p>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight tracking-tight mt-6">
              Build habits that <br />
              <span className="bg-gradient-to-r from-[#00D5B6] via-[#00F0FF] to-[#A855F7] bg-clip-text text-transparent">
                transform your life.
              </span>
            </h2>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Track daily routines, maintain unstoppable streaks, level up your character, and reach your full potential.
            </p>

            {/* Feature Badges */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#14223A]/60 border border-slate-700/50">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Gamified Streaks & Heatmaps</h4>
                  <p className="text-[11px] text-slate-400">Keep momentum with visual consistency grids</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#14223A]/60 border border-slate-700/50">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Earn XP & Level Up</h4>
                  <p className="text-[11px] text-slate-400">Gain rewards for every completed daily habit</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#14223A]/60 border border-slate-700/50">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Interactive Daily Routine</h4>
                  <p className="text-[11px] text-slate-400">Clickable water counters, timers & notes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00D5B6]" />
            <span>Secure local encryption • 100% private data</span>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          {/* Sign In / Sign Up Switcher */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-white">
                {isSignUp ? 'Create your account' : 'Welcome back! 👋'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isSignUp
                  ? 'Start tracking your daily habits and earn your first XP.'
                  : 'Enter your credentials to access your daily habits.'}
              </p>
            </div>

            <div className="p-1 rounded-2xl bg-[#09111E] border border-slate-800 flex items-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !isSignUp
                    ? 'bg-[#00D5B6] text-[#06151E] shadow-glow-teal'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSignUp
                    ? 'bg-[#00D5B6] text-[#06151E] shadow-glow-teal'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required={isSignUp}
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09111E] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D5B6] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="alex@habitverse.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09111E] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D5B6] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo email!')}
                    className="text-[11px] font-semibold text-[#00D5B6] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#09111E] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D5B6] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required={isSignUp}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09111E] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D5B6] transition-colors"
                  />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#00D5B6] cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-slate-400 select-none cursor-pointer">
                  Remember me on this browser
                </label>
              </div>
            )}

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00D5B6] via-[#00D5B6] to-[#00B4A0] text-[#06151E] font-extrabold text-sm flex items-center justify-center gap-2 hover:shadow-glow-teal transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#06151E] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In to HabitVerse'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo 1-Click Login Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#14233C]/70 border border-slate-700/70 hover:border-[#00D5B6]/60 text-slate-200 hover:text-[#00D5B6] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00D5B6]" />
              <span>Instant 1-Click Demo Login (Alex Morgan)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative px-3 bg-[#0E1626] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Social Logins */}
          <div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#09111E] border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
