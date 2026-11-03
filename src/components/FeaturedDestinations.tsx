import React from 'react';
import { Compass, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface FeaturedDestinationsProps {
  onSelectCity: (cityName: string) => void;
  isLoading: boolean;
}

const FEATURED = [
  {
    name: 'Tokyo',
    country: 'Japan',
    tagline: 'Ancient Shinto shrines meet neon-lit futuristic alleys and world-class ramen.',
    highlight: 'Asakusa Senso-ji · Shibuya Sky · Tsukiji Seafood',
    category: 'Vibrant Metropolis',
  },
  {
    name: 'Paris',
    country: 'France',
    tagline: 'The romantic capital of art, bohemian Montmartre, and candlelit bistros.',
    highlight: 'Louvre Pyramid · Sainte-Chapelle · Seine Riverwalk',
    category: 'Art & Heritage',
  },
  {
    name: 'Rome',
    country: 'Italy',
    tagline: 'Centuries of empire, the Colosseum, cobblestone squares, and authentic pasta.',
    highlight: 'Roman Forum · Trastevere Taverns · Pantheon Vista',
    category: 'Ancient Marvels',
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    tagline: 'Antoni Gaudí architectural masterpieces, Mediterranean beaches, and tapas.',
    highlight: 'Sagrada Família · Gothic Quarter · Park Güell',
    category: 'Coastal Culture',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    tagline: 'Tranquil bamboo groves, 10,000 crimson torii gates, and centuries-old tea houses.',
    highlight: 'Fushimi Inari · Arashiyama Bamboo · Gion Geisha District',
    category: 'Serene Heritage',
  },
  {
    name: 'New York',
    country: 'United States',
    tagline: 'The vibrant metropolis of world-class museums, Broadway, and iconic skylines.',
    highlight: 'Central Park Walk · High Line · Chelsea Market',
    category: 'Urban Icons',
  },
];

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  onSelectCity,
  isLoading,
}) => {
  return (
    <section id="featured-destinations" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
            Featured Destinations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Hand-Crafted 3-Day Itineraries
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          Explore expertly tested routes or enter your own custom city above for instant personalized generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED.map((city) => (
          <div
            key={city.name}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-medium text-amber-600 dark:text-amber-400">{city.category}</span>
                <span className="font-mono">{city.country}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {city.name}
              </h3>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {city.tagline}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Key Stops:</span> {city.highlight}
              </div>
            </div>

            <div className="mt-6 pt-2">
              <button
                onClick={() => onSelectCity(city.name)}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Generate 3-Day Plan</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
