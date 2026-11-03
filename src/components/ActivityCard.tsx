import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Tag,
  Lightbulb,
  ExternalLink,
  Check,
  Copy,
  Trash2,
  Utensils,
  Landmark,
  TreePine,
  ShoppingBag,
  Moon,
  Sparkles,
  Camera
} from 'lucide-react';
import { Activity } from '../types/itinerary.ts';

interface ActivityCardProps {
  activity: Activity;
  destination: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  destination,
  onToggleComplete,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dining':
        return <Utensils className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />;
      case 'Culture':
        return <Landmark className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />;
      case 'Nature':
        return <TreePine className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'Shopping':
        return <ShoppingBag className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />;
      case 'Nightlife':
        return <Moon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      case 'Relaxation':
        return <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />;
      default:
        return <Camera className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
    }
  };

  const mapsQuery = encodeURIComponent(`${activity.location}, ${destination}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const handleCopy = () => {
    const text = `${activity.time} - ${activity.title}\nLocation: ${activity.location}\nDetails: ${activity.description}\nCost: ${activity.estimatedCost}${activity.insiderTip ? `\nTip: ${activity.insiderTip}` : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative rounded-xl border transition-all p-5 ${
        activity.isCompleted
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Time and Category Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 font-mono font-medium tabular-nums text-slate-800 dark:text-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{activity.time}</span>
          </div>

          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

          <span className="font-medium text-slate-600 dark:text-slate-300">
            {activity.period}
          </span>

          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

          <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
            {getCategoryIcon(activity.category)}
            <span>{activity.category}</span>
          </div>

          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
            {activity.estimatedCost}
          </span>
        </div>

        {/* Quick action controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onToggleComplete(activity.id)}
            aria-label={activity.isCompleted ? 'Mark as unvisited' : 'Mark as visited'}
            title={activity.isCompleted ? 'Mark as unvisited' : 'Mark as visited'}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors border ${
              activity.isCompleted
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-400 hover:text-emerald-500'
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={handleCopy}
            aria-label="Copy activity details"
            title="Copy details"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onDelete(activity.id)}
            aria-label="Remove activity"
            title="Remove activity"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-3">
        <h3
          className={`text-base font-semibold transition-colors ${
            activity.isCompleted
              ? 'line-through text-slate-500 dark:text-slate-400'
              : 'text-slate-900 dark:text-white'
          }`}
        >
          {activity.title}
        </h3>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {activity.description}
        </p>
      </div>

      {/* Location Link & Insider Tip */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate max-w-md group/loc"
        >
          <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover/loc:text-amber-600 dark:group-hover/loc:text-amber-400 shrink-0" />
          <span className="truncate underline-offset-2 hover:underline">{activity.location}</span>
          <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
        </a>

        {activity.insiderTip && (
          <div className="inline-flex items-start gap-1.5 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-200/60 dark:border-amber-900/50 max-w-xl">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="font-semibold text-amber-900 dark:text-amber-200">Local Tip:</strong> {activity.insiderTip}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
