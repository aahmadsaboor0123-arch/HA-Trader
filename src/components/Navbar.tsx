import React from 'react';
import { HaTraderLogo } from './HaTraderLogo';
import { Moon, Sun, RotateCcw, Wallet, Bell, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  balance: number;
  equity: number;
  onResetBalance: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  balance,
  equity,
  onResetBalance,
  isDark,
  onToggleTheme,
  onOpenPortal,
}) => {
  const navItems = [
    { id: 'academy', label: 'Academy & Courses' },
    { id: 'simulator', label: 'Live Trading Room' },
    { id: 'signals', label: 'Trade Signals' },
    { id: 'sandbox', label: 'Pattern Sandbox' },
    { id: 'masterclasses', label: 'Masterclasses' },
    { id: 'journal', label: 'Trading Journal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 bg-white/90 dark:bg-slate-950/90 border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title / Wordmark lockup */}
        <button
          onClick={() => setActiveTab('academy')}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group text-left cursor-pointer"
          aria-label="HA Trader Trading Academy Home"
        >
          <HaTraderLogo size="md" theme={isDark ? 'dark' : 'light'} />
        </button>

        {/* Zone 2: Navigation Links (Single-line, 4-6 links) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Account Balance */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Paper Trading Balance Chip */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
            <Wallet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 leading-none">
                Demo Balance
              </span>
              <span className="text-xs font-mono font-bold tabular-nums text-slate-900 dark:text-slate-100">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={onResetBalance}
              title="Reset $50,000 Demo Balance"
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors cursor-pointer"
              aria-label="Reset Balance"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Student Portal / Action Button */}
          <button
            onClick={onOpenPortal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none px-4 py-2 flex items-center gap-1.5 bg-slate-50/70 dark:bg-slate-950/70">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-md cursor-pointer ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
