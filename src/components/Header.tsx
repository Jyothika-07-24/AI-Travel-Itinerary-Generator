import React from 'react';
import { Compass, Moon, Sun, BookmarkCheck, MapPin } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedTripsCount: number;
  onOpenSavedTrips: () => void;
  onOpenChecklist: () => void;
  onScrollToSearch: () => void;
  onScrollToDestinations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  savedTripsCount,
  onOpenSavedTrips,
  onOpenChecklist,
  onScrollToSearch,
  onScrollToDestinations,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in display face */}
        <button
          onClick={onScrollToSearch}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white block leading-tight">
              WanderPlan
            </span>
          </div>
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={onScrollToSearch}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Plan Itinerary
          </button>
          <button
            onClick={onScrollToDestinations}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Featured Cities
          </button>
          <button
            onClick={onOpenChecklist}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Trip Checklist
          </button>
          <button
            onClick={onOpenSavedTrips}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Saved Plans {savedTripsCount > 0 && `(${savedTripsCount})`}
          </button>
        </nav>

        {/* Zone 3: 1 primary action group */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSavedTrips}
            aria-label="View saved itineraries"
            className="relative px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">My Trips</span>
            {savedTripsCount > 0 && (
              <span className="tabular-nums font-mono text-[11px] px-1.5 py-0.2 bg-amber-600 text-white rounded-md">
                {savedTripsCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
