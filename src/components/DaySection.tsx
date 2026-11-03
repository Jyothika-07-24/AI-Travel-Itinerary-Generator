import React from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { ItineraryDay, Activity } from '../types/itinerary.ts';
import { ActivityCard } from './ActivityCard.tsx';

interface DaySectionProps {
  day: ItineraryDay;
  destination: string;
  onToggleComplete: (id: string) => void;
  onDeleteActivity: (id: string) => void;
  onOpenAddActivity: (dayNumber: number) => void;
  categoryFilter: string;
}

export const DaySection: React.FC<DaySectionProps> = ({
  day,
  destination,
  onToggleComplete,
  onDeleteActivity,
  onOpenAddActivity,
  categoryFilter,
}) => {
  const filteredActivities = day.activities.filter((act) => {
    if (categoryFilter === 'all') return true;
    return act.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const completedActivities = day.activities.filter((act) => act.isCompleted).length;

  return (
    <section className="scroll-mt-24 mb-12">
      {/* Day Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
              Day 0{day.dayNumber}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {day.theme}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {day.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono tabular-nums">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{completedActivities} / {day.activities.length} completed</span>
          </div>

          <button
            onClick={() => onOpenAddActivity(day.dayNumber)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Spot</span>
          </button>
        </div>
      </div>

      {/* Activities Timeline */}
      {filteredActivities.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
          No activities match the selected filter.
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {filteredActivities.map((activity, idx) => (
            <div key={activity.id} className="relative">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                  activity.isCompleted
                    ? 'bg-emerald-600 border-white dark:border-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-amber-500 dark:border-amber-400'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    activity.isCompleted ? 'bg-white' : 'bg-amber-500 dark:bg-amber-400'
                  }`}
                />
              </div>

              <ActivityCard
                activity={activity}
                destination={destination}
                onToggleComplete={onToggleComplete}
                onDelete={onDeleteActivity}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
