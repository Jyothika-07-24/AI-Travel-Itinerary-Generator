import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Bookmark,
  Check,
  Plus,
  Share2,
  Filter
} from 'lucide-react';
import { TravelItinerary } from '../types/itinerary.ts';

interface ItineraryControlsProps {
  itinerary: TravelItinerary;
  activeDayTab: number | 'all';
  setActiveDayTab: (tab: number | 'all') => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  onSaveTrip: () => void;
  isSaved: boolean;
  onOpenAddActivity: (dayNumber: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Activities' },
  { id: 'sightseeing', label: 'Sightseeing' },
  { id: 'culture', label: 'Culture & Art' },
  { id: 'dining', label: 'Food & Dining' },
  { id: 'nature', label: 'Parks & Nature' },
];

export const ItineraryControls: React.FC<ItineraryControlsProps> = ({
  itinerary,
  activeDayTab,
  setActiveDayTab,
  categoryFilter,
  setCategoryFilter,
  onSaveTrip,
  isSaved,
  onOpenAddActivity,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    let md = `# 3-Day Travel Itinerary: ${itinerary.destination}, ${itinerary.country}\n\n`;
    md += `> ${itinerary.tagline}\n\n`;
    md += `**Best Time to Visit:** ${itinerary.bestTimeToVisit}\n`;
    md += `**Daily Budget:** ${itinerary.estimatedBudgetDaily}\n`;
    md += `**Currency:** ${itinerary.localCurrency}\n`;
    md += `**Transit Advice:** ${itinerary.transitTip}\n\n`;
    md += `## Overview\n${itinerary.summary}\n\n---\n\n`;

    itinerary.days.forEach((day) => {
      md += `### Day ${day.dayNumber}: ${day.title}\n`;
      md += `*Theme: ${day.theme}*\n\n`;
      day.activities.forEach((act) => {
        md += `- **${act.time}** (${act.period} · ${act.category}): **${act.title}**\n`;
        md += `  Location: ${act.location} | Cost: ${act.estimatedCost}\n`;
        md += `  ${act.description}\n`;
        if (act.insiderTip) {
          md += `  *Insider Tip:* ${act.insiderTip}\n`;
        }
        md += `\n`;
      });
      md += `---\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8 transition-colors no-print">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Day Selector Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveDayTab('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeDayTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All 3 Days
          </button>
          {[1, 2, 3].map((dayNum) => (
            <button
              key={dayNum}
              onClick={() => setActiveDayTab(dayNum)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeDayTab === dayNum
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Day {dayNum}
            </button>
          ))}
        </div>

        {/* Category Filter Pills & Primary Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown or Segmented Filters */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

          {/* Action buttons */}
          <button
            onClick={onSaveTrip}
            title={isSaved ? 'Trip saved' : 'Save to My Trips'}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved' : 'Save Plan'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            title="Copy as Markdown"
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handlePrint}
            title="Print or save as PDF"
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={() => onOpenAddActivity(activeDayTab === 'all' ? 1 : activeDayTab)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>
    </div>
  );
};
