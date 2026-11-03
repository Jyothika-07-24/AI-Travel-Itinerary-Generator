import React from 'react';
import { Calendar, DollarSign, Train, Coins, CheckCircle2 } from 'lucide-react';
import { TravelItinerary } from '../types/itinerary.ts';

interface TripStatsBarProps {
  itinerary: TravelItinerary;
  completedCount: number;
  totalActivitiesCount: number;
}

export const TripStatsBar: React.FC<TripStatsBarProps> = ({
  itinerary,
  completedCount,
  totalActivitiesCount,
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-slate-600 dark:text-slate-300">
        {/* Unboxed Metadata Stats */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-slate-400 dark:text-slate-500">Best Season:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {itinerary.bestTimeToVisit}
            </span>
          </div>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>

          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-slate-400 dark:text-slate-500">Daily Spend:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200 font-mono tabular-nums">
              {itinerary.estimatedBudgetDaily}
            </span>
          </div>

          <span className="hidden md:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>

          <div className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-slate-400 dark:text-slate-500">Currency:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {itinerary.localCurrency}
            </span>
          </div>

          <span className="hidden lg:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>

          <div className="hidden lg:flex items-center gap-1.5 max-w-sm truncate">
            <Train className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-slate-400 dark:text-slate-500">Transit:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate" title={itinerary.transitTip}>
              {itinerary.transitTip}
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Visited:</span>
          <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100 font-semibold">
            {completedCount} / {totalActivitiesCount}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">
            ({Math.round((completedCount / (totalActivitiesCount || 1)) * 100)}%)
          </span>
        </div>
      </div>
    </div>
  );
};
