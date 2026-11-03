export interface Activity {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  title: string;
  description: string;
  location: string;
  category: 'Sightseeing' | 'Culture' | 'Dining' | 'Nature' | 'Shopping' | 'Nightlife' | 'Relaxation';
  estimatedCost: string;
  insiderTip?: string;
  isCompleted?: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  activities: Activity[];
}

export interface TravelItinerary {
  id: string;
  destination: string;
  country: string;
  tagline: string;
  summary: string;
  bestTimeToVisit: string;
  localCurrency: string;
  transitTip: string;
  estimatedBudgetDaily: string;
  vibe?: string;
  pace?: string;
  budget?: string;
  createdAt: string;
  days: ItineraryDay[];
}

export interface GenerateItineraryRequest {
  city: string;
  vibe?: string;
  pace?: string;
  budget?: string;
}
