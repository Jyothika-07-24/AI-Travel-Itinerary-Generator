import React, { useState } from 'react';
import { Search, Sparkles, MapPin, SlidersHorizontal, Loader2, ArrowRight } from 'lucide-react';

interface HeroSearchProps {
  onGenerate: (city: string, options: { vibe: string; pace: string; budget: string }) => void;
  isLoading: boolean;
  currentDestination?: string;
}

const POPULAR_DESTINATIONS = [
  { name: 'Tokyo', country: 'Japan', highlight: 'Ancient Shrines & Neon' },
  { name: 'Paris', country: 'France', highlight: 'Art, Cafes & Seine Vistas' },
  { name: 'Rome', country: 'Italy', highlight: 'Colosseum & Roman Gastronomy' },
  { name: 'Barcelona', country: 'Spain', highlight: 'Gaudí Architecture & Tapas' },
  { name: 'Kyoto', country: 'Japan', highlight: 'Torii Gates & Zen Temples' },
  { name: 'New York', country: 'USA', highlight: 'Skyline, Central Park & Broadway' },
];

const VIBE_OPTIONS = [
  'Culture & Sights',
  'Food & Gastronomy',
  'Nature & Outdoors',
  'Hidden Gems',
];

const PACE_OPTIONS = ['Relaxed', 'Balanced', 'Packed'];
const BUDGET_OPTIONS = ['Budget', 'Moderate', 'Luxury'];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onGenerate,
  isLoading,
  currentDestination,
}) => {
  const [cityInput, setCityInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [vibe, setVibe] = useState('Culture & Sights');
  const [pace, setPace] = useState('Balanced');
  const [budget, setBudget] = useState('Moderate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim() || isLoading) return;
    onGenerate(cityInput.trim(), { vibe, pace, budget });
  };

  const handleSelectQuickCity = (city: string) => {
    setCityInput(city);
    onGenerate(city, { vibe, pace, budget });
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_travel_destination_1793556262283.jpg"
          alt="Historic city street travel destination"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3 block">
            Intelligent City Travel Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
            Curate Your Perfect 3-Day City Adventure
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Enter any city across the globe to receive a bespoke, hour-by-hour itinerary complete with morning sights, midday dining, neighborhood gems, and local insider tips.
          </p>
        </div>

        {/* Primary Input Container */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-white/20 dark:border-slate-700 shadow-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-amber-400/80"
          >
            <div className="relative flex-1 flex items-center">
              <MapPin className="w-5 h-5 text-amber-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city (e.g., Tokyo, Paris, Rome, Lisbon)..."
                disabled={isLoading}
                aria-label="City name"
                className="w-full pl-11 pr-4 py-3 bg-transparent text-white placeholder-slate-400 text-base font-medium focus:outline-none disabled:opacity-50"
              />
              {cityInput && (
                <button
                  type="button"
                  onClick={() => setCityInput('')}
                  className="mr-2 text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  showFilters
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                    : 'border-white/20 text-slate-300 hover:bg-white/10'
                }`}
                title="Customize style & budget"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Preferences</span>
              </button>

              <button
                type="submit"
                disabled={!cityInput.trim() || isLoading}
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Planning 3 Days...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Collapsible Preferences Panel */}
          {showFilters && (
            <div className="mt-3 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-slate-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Travel Vibe</label>
                <div className="flex flex-col gap-1">
                  {VIBE_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setVibe(opt)}
                      className={`text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        vibe === opt
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Daily Pace</label>
                <div className="flex flex-col gap-1">
                  {PACE_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setPace(opt)}
                      className={`text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        pace === opt
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Budget Tier</label>
                <div className="flex flex-col gap-1">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={`text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        budget === opt
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Destination Inspiration */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-medium mr-1 text-slate-300">Popular Cities:</span>
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                type="button"
                onClick={() => handleSelectQuickCity(dest.name)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 transition-colors border border-white/10 focus-visible:outline-none"
              >
                {dest.name}
              </button>
            ))}
          </div>

          {/* Active Loading Guidance */}
          {isLoading && (
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-semibold text-sm">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Crafting your 3-day itinerary...</span>
              </div>
              <p className="mt-1 text-xs text-amber-200/80">
                Optimizing morning and evening neighborhood routes, ticket times, and local culinary highlights.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
