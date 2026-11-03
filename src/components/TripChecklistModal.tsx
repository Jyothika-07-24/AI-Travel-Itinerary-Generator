import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Trash2, CheckSquare } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  category: 'Documents' | 'Gear' | 'Financial' | 'Health';
  checked: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', text: 'Valid Passport / Visa (minimum 6 months validity)', category: 'Documents', checked: false },
  { id: 'c2', text: 'Download offline Google Maps of the city', category: 'Gear', checked: false },
  { id: 'c3', text: 'Universal travel power adapter & 10,000mAh power bank', category: 'Gear', checked: false },
  { id: 'c4', text: 'Zero-fee travel credit/debit card notified of travel dates', category: 'Financial', checked: false },
  { id: 'c5', text: 'Broken-in, comfortable walking sneakers (15,000+ steps/day)', category: 'Gear', checked: false },
  { id: 'c6', text: 'Hotel / Airbnb reservations saved offline on phone', category: 'Documents', checked: false },
  { id: 'c7', text: 'Personal medication and mini first-aid kit', category: 'Health', checked: false },
  { id: 'c8', text: 'Pre-booked advance museum tickets (e.g. Louvre, Shibuya Sky)', category: 'Documents', checked: false },
];

interface TripChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: string;
}

export const TripChecklistModal: React.FC<TripChecklistModalProps> = ({
  isOpen,
  onClose,
  destination,
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('wanderplan_checklist');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('wanderplan_checklist', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save checklist to localStorage:', e);
    }
  }, [items]);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      text: newItemText.trim(),
      category: 'Gear',
      checked: false,
    };

    setItems((prev) => [...prev, newItem]);
    setNewItemText('');
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((i) => i.checked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Trip Preparation Checklist
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {destination ? `Essential pack-list for ${destination}` : 'Travel essentials & pre-flight items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-2.5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-mono">
          <span>Ready to Depart:</span>
          <span className="tabular-nums font-semibold text-slate-900 dark:text-white">
            {completedCount} / {items.length} items checked ({Math.round((completedCount / (items.length || 1)) * 100)}%)
          </span>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-2.5 flex-1">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                item.checked
                  ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                    item.checked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="font-medium">{item.text}</span>
              </button>

              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add custom item form */}
        <form onSubmit={addItem} className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add a custom packing item or reminder..."
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>
    </div>
  );
};
