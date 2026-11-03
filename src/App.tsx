import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSearch } from './components/HeroSearch.tsx';
import { TripStatsBar } from './components/TripStatsBar.tsx';
import { DaySection } from './components/DaySection.tsx';
import { ItineraryControls } from './components/ItineraryControls.tsx';
import { FeaturedDestinations } from './components/FeaturedDestinations.tsx';
import { AddActivityModal } from './components/AddActivityModal.tsx';
import { SavedTripsModal } from './components/SavedTripsModal.tsx';
import { TripChecklistModal } from './components/TripChecklistModal.tsx';
import { TravelItinerary, Activity } from './types/itinerary.ts';
import { MapPin, Sparkles, AlertCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('wanderplan_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [itinerary, setItinerary] = useState<TravelItinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDayTab, setActiveDayTab] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [savedTrips, setSavedTrips] = useState<TravelItinerary[]>([]);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState<boolean>(false);
  const [addActivityDayNumber, setAddActivityDayNumber] = useState<number>(1);
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState<boolean>(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);

  const itineraryRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sync theme with HTML root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('wanderplan_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('wanderplan_theme', 'light');
    }
  }, [darkMode]);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wanderplan_saved_trips');
      if (saved) {
        setSavedTrips(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load saved trips:', e);
    }
  }, []);

  // Sync saved trips back to localStorage
  const persistSavedTrips = (trips: TravelItinerary[]) => {
    setSavedTrips(trips);
    try {
      localStorage.setItem('wanderplan_saved_trips', JSON.stringify(trips));
    } catch (e) {
      console.warn('Could not save trips:', e);
    }
  };

  // Generate initial showcase itinerary for Paris on first visit
  useEffect(() => {
    generateItinerary('Paris', {
      vibe: 'Culture & Sights',
      pace: 'Balanced',
      budget: 'Moderate',
    }, false);
  }, []);

  const generateItinerary = async (
    cityName: string,
    options: { vibe: string; pace: string; budget: string },
    scrollToResults: boolean = true
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: cityName,
          vibe: options.vibe,
          pace: options.pace,
          budget: options.budget,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.itinerary) {
        throw new Error('No itinerary data returned.');
      }

      setItinerary(data.itinerary);
      setActiveDayTab('all');
      setCategoryFilter('all');

      if (scrollToResults && itineraryRef.current) {
        setTimeout(() => {
          itineraryRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err: any) {
      console.error('Failed to generate itinerary:', err);
      setError(err?.message || 'Could not generate itinerary. Please try another city.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = (activityId: string) => {
    if (!itinerary) return;
    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) => ({
        ...day,
        activities: day.activities.map((act) =>
          act.id === activityId ? { ...act, isCompleted: !act.isCompleted } : act
        ),
      })),
    });
  };

  const handleDeleteActivity = (activityId: string) => {
    if (!itinerary) return;
    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) => ({
        ...day,
        activities: day.activities.filter((act) => act.id !== activityId),
      })),
    });
  };

  const handleOpenAddActivity = (dayNumber: number) => {
    setAddActivityDayNumber(dayNumber);
    setIsAddActivityOpen(true);
  };

  const handleAddActivity = (
    dayNumber: number,
    activityData: Omit<Activity, 'id' | 'isCompleted'>
  ) => {
    if (!itinerary) return;

    const newActivity: Activity = {
      ...activityData,
      id: `act-${dayNumber}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      isCompleted: false,
    };

    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) =>
        day.dayNumber === dayNumber
          ? { ...day, activities: [...day.activities, newActivity] }
          : day
      ),
    });
  };

  const isCurrentTripSaved = Boolean(
    itinerary && savedTrips.some((t) => t.id === itinerary.id || t.destination.toLowerCase() === itinerary.destination.toLowerCase())
  );

  const handleSaveTrip = () => {
    if (!itinerary) return;

    if (isCurrentTripSaved) {
      // Remove from saved
      persistSavedTrips(
        savedTrips.filter((t) => t.id !== itinerary.id && t.destination.toLowerCase() !== itinerary.destination.toLowerCase())
      );
    } else {
      // Add to saved
      persistSavedTrips([itinerary, ...savedTrips]);
    }
  };

  const handleDeleteSavedTrip = (id: string) => {
    persistSavedTrips(savedTrips.filter((t) => t.id !== id));
  };

  const handleSelectTrip = (trip: TravelItinerary) => {
    setItinerary(trip);
    setActiveDayTab('all');
    setCategoryFilter('all');
    if (itineraryRef.current) {
      itineraryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Activity counts
  const totalActivitiesCount =
    itinerary?.days.reduce((acc, day) => acc + day.activities.length, 0) || 0;
  const completedCount =
    itinerary?.days.reduce(
      (acc, day) => acc + day.activities.filter((a) => a.isCompleted).length,
      0
    ) || 0;

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDestinations = () => {
    const el = document.getElementById('featured-destinations');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-amber-500/20">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        savedTripsCount={savedTrips.length}
        onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onScrollToSearch={scrollToSearch}
        onScrollToDestinations={scrollToDestinations}
      />

      <main className="flex-1">
        {/* Hero Section with City Input */}
        <div ref={searchRef}>
          <HeroSearch
            onGenerate={(city, opts) => generateItinerary(city, opts, true)}
            isLoading={isLoading}
            currentDestination={itinerary?.destination}
          />
        </div>

        {/* Error message notice */}
        {error && (
          <div className="max-w-4xl mx-auto mt-6 px-4">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-3 text-red-800 dark:text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
              <div className="flex-1">
                <span className="font-semibold">Unable to plan trip:</span> {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="text-xs underline hover:no-underline font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Itinerary Container */}
        {itinerary && (
          <div ref={itineraryRef} className="print-page">
            {/* Trip Stats Bar */}
            <TripStatsBar
              itinerary={itinerary}
              completedCount={completedCount}
              totalActivitiesCount={totalActivitiesCount}
            />

            {/* Itinerary Controls & Day Selector */}
            <ItineraryControls
              itinerary={itinerary}
              activeDayTab={activeDayTab}
              setActiveDayTab={setActiveDayTab}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              onSaveTrip={handleSaveTrip}
              isSaved={isCurrentTripSaved}
              onOpenAddActivity={handleOpenAddActivity}
            />

            {/* City Title and Summary Header */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <MapPin className="w-4 h-4" />
                <span>{itinerary.destination}, {itinerary.country}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                3-Day Itinerary: {itinerary.destination}
              </h1>

              <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 italic font-normal">
                "{itinerary.tagline}"
              </p>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {itinerary.summary}
              </p>
            </div>

            {/* Days Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {itinerary.days
                .filter((day) => activeDayTab === 'all' || day.dayNumber === activeDayTab)
                .map((day) => (
                  <DaySection
                    key={day.dayNumber}
                    day={day}
                    destination={itinerary.destination}
                    onToggleComplete={handleToggleComplete}
                    onDeleteActivity={handleDeleteActivity}
                    onOpenAddActivity={handleOpenAddActivity}
                    categoryFilter={categoryFilter}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Featured Cities Section */}
        <FeaturedDestinations
          onSelectCity={(cityName) =>
            generateItinerary(cityName, { vibe: 'Culture & Sights', pace: 'Balanced', budget: 'Moderate' }, true)
          }
          isLoading={isLoading}
        />
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 transition-colors no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">WanderPlan</span>
            <span>·</span>
            <span>Comprehensive 3-Day Travel Itinerary Generator</span>
          </div>

          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Packing Checklist
            </button>
            <button
              onClick={() => setIsSavedTripsOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Saved Trips ({savedTrips.length})
            </button>
            <button
              onClick={scrollToSearch}
              className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        defaultDayNumber={addActivityDayNumber}
        onAddActivity={handleAddActivity}
      />

      <SavedTripsModal
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={handleSelectTrip}
        onDeleteTrip={handleDeleteSavedTrip}
      />

      <TripChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        destination={itinerary?.destination}
      />
    </div>
  );
}
