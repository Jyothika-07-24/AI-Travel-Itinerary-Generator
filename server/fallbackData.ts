export interface GeneratedItineraryData {
  destination: string;
  country: string;
  tagline: string;
  summary: string;
  bestTimeToVisit: string;
  localCurrency: string;
  transitTip: string;
  estimatedBudgetDaily: string;
  days: {
    dayNumber: number;
    title: string;
    theme: string;
    activities: {
      time: string;
      period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
      title: string;
      description: string;
      location: string;
      category: 'Sightseeing' | 'Culture' | 'Dining' | 'Nature' | 'Shopping' | 'Nightlife' | 'Relaxation';
      estimatedCost: string;
      insiderTip?: string;
    }[];
  }[];
}

export const curatedCities: Record<string, GeneratedItineraryData> = {
  tokyo: {
    destination: "Tokyo",
    country: "Japan",
    tagline: "Where ancient shrines meet neon-lit futuristic streets.",
    summary: "A thrilling three-day journey through Tokyo's vibrant neighborhoods, from tranquil Senso-ji Temple and Meiji Shrine to bustling Shibuya crossing and culinary alleys of Shinjuku.",
    bestTimeToVisit: "March to May (Cherry Blossoms) or October to November (Autumn Foliage)",
    localCurrency: "Japanese Yen (¥, JPY)",
    transitTip: "Use a Suica/Pasmo IC card or a 72-hour Tokyo Subway ticket on JR Yamanote and Metro lines.",
    estimatedBudgetDaily: "$80 - $160 USD (¥12,000 - ¥24,000)",
    days: [
      {
        dayNumber: 1,
        title: "Historic Asakusa & Modern Skyline",
        theme: "Heritage & Modern Contrast",
        activities: [
          {
            time: "08:30 AM",
            period: "Morning",
            title: "Explore Senso-ji Temple & Nakamise-dori",
            description: "Tokyo's oldest and most iconic Buddhist temple. Stroll through the Kaminarimon gate with its giant red lantern and browse traditional craft shops along Nakamise shopping street.",
            location: "Asakusa, Taito City",
            category: "Culture",
            estimatedCost: "Free (Snacks ~¥500)",
            insiderTip: "Arrive before 9 AM to experience the serene inner courtyard before tour crowds gather."
          },
          {
            time: "11:30 AM",
            period: "Morning",
            title: "Traditional Tempura Lunch at Daikokuya",
            description: "Savor authentic sesame oil-fried tendon (tempura rice bowl), served here continuously since 1887 in traditional tatami dining rooms.",
            location: "1-38-10 Asakusa",
            category: "Dining",
            estimatedCost: "¥2,000 - ¥3,200",
            insiderTip: "The classic Ebi Tendon (prawn) with deep amber sauce is their signature specialty."
          },
          {
            time: "02:00 PM",
            period: "Afternoon",
            title: "Sumida River Cruise to Hamarikyu Gardens",
            description: "Board the futuristic Himiko water bus designed by anime icon Leiji Matsumoto. Drift down the Sumida River and disembark directly at the Edo-period shogun gardens with its tidal duck pond.",
            location: "Hamarikyu Gardens, Chuo City",
            category: "Nature",
            estimatedCost: "¥1,200 cruise + ¥300 garden entry",
            insiderTip: "Stop by the Nakajima Teahouse in the center of the lake for matcha and seasonal wagashi sweets."
          },
          {
            time: "06:30 PM",
            period: "Evening",
            title: "Ginza Art & Evening Dinner in Yurakucho",
            description: "Wander the architectural flagships of Ginza, explore the Ginza Six rooftop garden, then head to the atmospheric yakitori alleys tucked beneath the Yurakucho train tracks.",
            location: "Yurakucho Gado-shita, Chiyoda",
            category: "Dining",
            estimatedCost: "¥3,000 - ¥5,000",
            insiderTip: "Order skewers of tsukune (chicken meatball) with tare sauce and a cold draft beer amidst the smoky vintage lanterns."
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Youth Culture, Shrines & Neon Horizons",
        theme: "Pop Culture, Fashion & Harajuku Charms",
        activities: [
          {
            time: "09:00 AM",
            period: "Morning",
            title: "Meiji Jingu Shrine Sacred Forest",
            description: "Walk under towering cypress torii gates into a lush 170-acre evergreen forest surrounding Tokyo's most venerated Shinto shrine dedicated to Emperor Meiji.",
            location: "Yoyogi Kamizonocho, Shibuya",
            category: "Culture",
            estimatedCost: "Free",
            insiderTip: "Write an 'Ema' wooden plaque with your travel wish and hang it under the sacred camphor trees."
          },
          {
            time: "11:00 AM",
            period: "Morning",
            title: "Takeshita Street & Cat Street Vintage Browsing",
            description: "Dive into colorful Harajuku pop fashion, crepe stalls, and then transition into Cat Street for Japanese denim, artisanal coffee roasters, and curated boutiques.",
            location: "Jingumae, Shibuya",
            category: "Shopping",
            estimatedCost: "Free to browse",
            insiderTip: "Grab a single-origin pour-over at The Roastery by Nozy Coffee on Cat Street."
          },
          {
            time: "02:30 PM",
            period: "Afternoon",
            title: "Shibuya Sky Observation Deck & Scramble Crossing",
            description: "Stand atop the 229m open-air rooftop observatory at Shibuya Scramble Square for sweeping 360-degree views of Tokyo and Mount Fuji on clear days, overlooking the world's busiest pedestrian crossing.",
            location: "Shibuya Scramble Square",
            category: "Sightseeing",
            estimatedCost: "¥2,200 (Online advance ticket)",
            insiderTip: "Book sunset slot 2 weeks in advance to capture golden hour transitioning into Tokyo's neon twilight."
          },
          {
            time: "07:30 PM",
            period: "Night",
            title: "Shinjuku Omoide Yokocho & Golden Gai",
            description: "Explore the post-war labyrinth of Memory Lane (Omoide Yokocho) for hand-grilled kushiyaki, followed by cozy two-to-six seater micro-bars in historic Golden Gai.",
            location: "Kabukicho / Golden Gai, Shinjuku",
            category: "Nightlife",
            estimatedCost: "¥3,500 - ¥6,000",
            insiderTip: "Look for bars with signs indicating 'English Menu / No Table Charge' to keep things simple."
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Digital Art, Tsukiji Flavors & Roppongi Panoramas",
        theme: "Sensory Immersion & Culinary Delights",
        activities: [
          {
            time: "08:30 AM",
            period: "Morning",
            title: "Tsukiji Outer Market Food Crawl",
            description: "Graze through bustling stalls of fresh sashimi bowls, grilled tamagoyaki (sweet rolled omelets), wagyu skewers, and fresh sea urchin (uni).",
            location: "Tsukiji, Chuo City",
            category: "Dining",
            estimatedCost: "¥2,500 - ¥4,500",
            insiderTip: "Try the freshly torched scallop and crab bowl from the corner seafood grills."
          },
          {
            time: "11:00 AM",
            period: "Morning",
            title: "teamLab Planets Immersive Digital Art",
            description: "Wade through knee-deep water installations and mirror rooms filled with infinite floating crystal flowers and responsive light projections.",
            location: "Toyosu, Koto City",
            category: "Culture",
            estimatedCost: "¥3,800 (Timed admission)",
            insiderTip: "Wear pants that can easily roll up above the knees since you will be walking barefoot through water."
          },
          {
            time: "03:00 PM",
            period: "Afternoon",
            title: "Ueno Park & Tokyo National Museum",
            description: "Stroll through peaceful Ueno Park and visit Japan's oldest museum, home to over 110,000 cultural artifacts including samurai armor, katana swords, and delicate ukiyo-e woodblock prints.",
            location: "Ueno Koen, Taito City",
            category: "Culture",
            estimatedCost: "¥1,000",
            insiderTip: "The Honkan (Japanese Gallery) second floor exhibits the best historical chronology."
          },
          {
            time: "07:00 PM",
            period: "Evening",
            title: "Ramen Tasting & Tokyo Tower Night Lights",
            description: "Conclude your 3-day Tokyo journey with a steaming bowl of tonkotsu or yuzu shio ramen in Roppongi, followed by a night view of the glowing retro Tokyo Tower.",
            location: "Roppongi / Shiba Park, Minato",
            category: "Sightseeing",
            estimatedCost: "¥1,500 - ¥3,000",
            insiderTip: "Take photos from the stairs outside Akabanebashi Station for the most cinematic perspective of the illuminated tower."
          }
        ]
      }
    ]
  },
  paris: {
    destination: "Paris",
    country: "France",
    tagline: "The City of Light, romance, world-class art, and culinary elegance.",
    summary: "Three unforgettable days in Paris discovering grand boulevards, world-renowned museums, bohemian Montmartre alleys, and gourmet bistro dinners along the Seine.",
    bestTimeToVisit: "April to June (Spring blooms) or September to October (Mild autumn)",
    localCurrency: "Euro (€, EUR)",
    transitTip: "Use the Paris Metro with contactless Navigo Easy cards; most central landmarks are 15-20 minutes apart.",
    estimatedBudgetDaily: "€90 - €180 EUR ($100 - $200 USD)",
    days: [
      {
        dayNumber: 1,
        title: "The Historic Heart & Masterpieces of the Seine",
        theme: "Royal History & World-Class Art",
        activities: [
          {
            time: "09:00 AM",
            period: "Morning",
            title: "Louvre Museum & Cour Napoléon",
            description: "Begin at the former royal palace to admire Leonardo's Mona Lisa, the Winged Victory of Samothrace, and the Venus de Milo surrounded by I.M. Pei's glass pyramid.",
            location: "Rue de Rivoli, 1st Arrondissement",
            category: "Culture",
            estimatedCost: "€22 (Advance timed entry)",
            insiderTip: "Enter via the Carrousel du Louvre shopping concourse underground to skip the main outdoor pyramid line."
          },
          {
            time: "12:30 PM",
            period: "Afternoon",
            title: "Lunch & Stroll at Jardin des Tuileries",
            description: "Pick up fresh baguettes and éclairs from a local boulangerie, grab one of the iconic green metal chairs by the Grand Bassin pond, and watch Parisian life unfold.",
            location: "Tuileries Garden, 1st Arrondissement",
            category: "Dining",
            estimatedCost: "€10 - €18",
            insiderTip: "Stop by Café Kitsuné or Angelina on Rue de Rivoli for rich hot chocolate if you have a sweet tooth."
          },
          {
            time: "02:30 PM",
            period: "Afternoon",
            title: "Île de la Cité & Sainte-Chapelle Stained Glass",
            description: "Cross Pont Neuf to marvel at the 13th-century Gothic masterpiece Sainte-Chapelle, featuring 15 towering stained-glass lancets depicting 1,113 biblical scenes in radiant violet and ruby hues.",
            location: "Île de la Cité, 4th Arrondissement",
            category: "Sightseeing",
            estimatedCost: "€13",
            insiderTip: "Visit while the afternoon sun shines directly through the south-facing rose windows for breathtaking color."
          },
          {
            time: "07:30 PM",
            period: "Evening",
            title: "Classic Parisian Bistro Dinner in Saint-Germain",
            description: "Indulge in French classics like duck confit, boeuf bourguignon, and tarte tatin accompanied by a carafe of Côtes du Rhône wine in an intimate candlelit Saint-Germain bistro.",
            location: "Saint-Germain-des-Prés, 6th Arrondissement",
            category: "Dining",
            estimatedCost: "€35 - €60",
            insiderTip: "Le Comptoir du Relais or Bistrot Paul Bert (reservations essential) represent benchmark French bistro dining."
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Bohemian Montmartre, Marais & Golden Sunset",
        theme: "Artistic Quarters & Sunset Vistas",
        activities: [
          {
            time: "09:30 AM",
            period: "Morning",
            title: "Montmartre Hills & Sacré-Cœur Basilica",
            description: "Wander the winding cobblestone lanes where Picasso and Renoir once lived, inspect the Moulin de la Galette windmill, and admire panoramic views of Paris from Sacré-Cœur.",
            location: "Montmartre, 18th Arrondissement",
            category: "Sightseeing",
            estimatedCost: "Free (Dome climb €8)",
            insiderTip: "Walk up Rue de l'Abreuvoir past the pink Maison Rose house for one of the most picturesque streets in Paris."
          },
          {
            time: "12:30 PM",
            period: "Afternoon",
            title: "Le Marais Falafel & Historic Place des Vosges",
            description: "Explore the trendy Marais district, enjoy the legendary pita sandwich at L'As du Fallafel on Rue des Rosiers, and lounge in the Renaissance arcades of Place des Vosges.",
            location: "Le Marais, 4th Arrondissement",
            category: "Dining",
            estimatedCost: "€10 - €20",
            insiderTip: "The spicy special pita with fried eggplant and tahini at L'As du Fallafel is the gold standard street food here."
          },
          {
            time: "03:30 PM",
            period: "Afternoon",
            title: "Musée d'Orsay Impressionist Collections",
            description: "Housed in a breathtaking Beaux-Arts railway station, this museum hosts the greatest collection of Impressionist and Post-Impressionist masterpieces by Monet, Van Gogh, Degas, and Cézanne.",
            location: "1 Rue de la Légion d'Honneur, 7th Arr.",
            category: "Culture",
            estimatedCost: "€16",
            insiderTip: "Head to the 5th floor behind the giant station clock face for both artwork and a scenic view through the clock hands."
          },
          {
            time: "07:30 PM",
            period: "Night",
            title: "Eiffel Tower Twinkle & Sunset River Cruise",
            description: "Witness the Eiffel Tower illuminate and sparkle on the hour from the Trocadéro terrace, then embark on a 1-hour Vedettes de Paris boat cruise along the illuminated Seine.",
            location: "Champ de Mars / Pont de Bir-Hakeim",
            category: "Sightseeing",
            estimatedCost: "€18 (Cruise ticket)",
            insiderTip: "The 5-minute sparkle show starts at the top of every hour after dusk until 11 PM."
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Latin Quarter, Grand Boulevards & Hidden Passages",
        theme: "Literary Haunts & Architectural Splendor",
        activities: [
          {
            time: "09:00 AM",
            period: "Morning",
            title: "Latin Quarter, Panthéon & Shakespeare and Company",
            description: "Walk the historic student quarter, inspect the resting place of Marie Curie and Voltaire in the Panthéon, and browse rare books at the legendary Shakespeare and Company bookshop.",
            location: "Latin Quarter, 5th Arrondissement",
            category: "Culture",
            estimatedCost: "€13 (Panthéon entry)",
            insiderTip: "Pick up a stamped book from Shakespeare & Company as an authentic personal keepsake."
          },
          {
            time: "12:30 PM",
            period: "Morning",
            title: "Jardin du Luxembourg & French Tartine Lunch",
            description: "Walk past the Medici Fountain in the sprawling Luxembourg Gardens and have a leisurely tartine lunch at Bread & Roses or nearby Café de Flore.",
            location: "6th Arrondissement",
            category: "Relaxation",
            estimatedCost: "€15 - €25",
            insiderTip: "Sit in the orchard section near the beekeeping school for the most serene ambience."
          },
          {
            time: "03:00 PM",
            period: "Afternoon",
            title: "Palais Garnier Opera & 19th-Century Glass Passages",
            description: "Marvel at the gilded auditorium and Marc Chagall ceiling inside the Palais Garnier Opera House, then explore the historic glass-roofed arcade Galerie Vivienne for antique shops.",
            location: "Opera / Bourse, 9th & 2nd Arr.",
            category: "Sightseeing",
            estimatedCost: "€15 (Opera self-guided tour)",
            insiderTip: "Galerie Vivienne's mosaic tile floors by Giandomenico Facchina are among the most exquisite in Europe."
          },
          {
            time: "07:30 PM",
            period: "Evening",
            title: "Farewell Dinner at Canal Saint-Martin",
            description: "End your Parisian journey at the vibrant, local Canal Saint-Martin, watching iron footbridges reflect in the water while enjoying natural wines and contemporary Neo-bistro plates.",
            location: "Canal Saint-Martin, 10th Arrondissement",
            category: "Dining",
            estimatedCost: "€35 - €55",
            insiderTip: "Restaurants like Le Verre Volé or Early June offer incredible rotating chef menus with seasonal French produce."
          }
        ]
      }
    ]
  }
};

export function generateFallbackItinerary(cityName: string, preferences?: { vibe?: string; pace?: string; budget?: string }): GeneratedItineraryData {
  const normalized = cityName.trim().toLowerCase();
  if (curatedCities[normalized]) {
    return curatedCities[normalized];
  }

  // Format capitalized city name
  const formattedCity = cityName
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  const vibe = preferences?.vibe || "Culture & Sights";
  const pace = preferences?.pace || "Balanced";
  const budget = preferences?.budget || "Moderate";

  return {
    destination: formattedCity,
    country: "Featured Destination",
    tagline: `Experience the captivating sights, vibrant culture, and culinary highlights of ${formattedCity}.`,
    summary: `An expertly curated 3-day exploration of ${formattedCity}, balancing must-see historic landmarks, scenic viewpoints, neighborhood strolls, and beloved local eateries.`,
    bestTimeToVisit: "Spring (April - June) or Autumn (September - November)",
    localCurrency: "Local Currency",
    transitTip: "Walking combined with the local metro or rapid transit network provides the fastest and most scenic travel.",
    estimatedBudgetDaily: budget === "Budget" ? "$50 - $90 USD" : budget === "Luxury" ? "$250 - $500 USD" : "$90 - $160 USD",
    days: [
      {
        dayNumber: 1,
        title: `Heart of ${formattedCity}: Historic Landmarks & Grand Squares`,
        theme: "Heritage & Iconic Highlights",
        activities: [
          {
            time: "09:00 AM",
            period: "Morning",
            title: `Historic Old Town & Central Square of ${formattedCity}`,
            description: `Begin your morning walking through ${formattedCity}'s oldest district, exploring central civic monuments, historic architecture, and artisan shops.`,
            location: `Historic Center, ${formattedCity}`,
            category: "Sightseeing",
            estimatedCost: "Free to explore",
            insiderTip: "Start early in the morning to capture photographs of the central square before tour groups arrive."
          },
          {
            time: "11:30 AM",
            period: "Morning",
            title: `Visit the Principal Art & History Museum`,
            description: `Immerse yourself in ${formattedCity}'s rich cultural tapestry through permanent collections, archaeology exhibits, and national treasures.`,
            location: `Museum Quarter, ${formattedCity}`,
            category: "Culture",
            estimatedCost: "$15 - $25 USD",
            insiderTip: "Check for free audio guide apps or reserve timed entry online to skip the ticket booth."
          },
          {
            time: "01:00 PM",
            period: "Afternoon",
            title: `Traditional Lunch at a Historic Tavern`,
            description: `Taste signature regional dishes prepared with local farm ingredients, complemented by traditional hospitality.`,
            location: `Market District, ${formattedCity}`,
            category: "Dining",
            estimatedCost: "$18 - $32 USD",
            insiderTip: "Ask the server for the daily special (plat du jour / menu del día) for the freshest seasonal offering."
          },
          {
            time: "03:30 PM",
            period: "Afternoon",
            title: `Scenic Waterfront or Grand Boulevard Promenade`,
            description: `Take a relaxed walk along ${formattedCity}'s famous avenue or riverfront promenade, taking in panoramic views and historic bridges.`,
            location: `Waterfront District, ${formattedCity}`,
            category: "Relaxation",
            estimatedCost: "Free",
            insiderTip: "Rent a city bike or sit at an outdoor café terrace to people-watch."
          },
          {
            time: "07:30 PM",
            period: "Evening",
            title: `Evening Welcome Dinner & Regional Wine Tasting`,
            description: `Celebrate your first night in ${formattedCity} with a multi-course dinner highlighting local culinary traditions and regional wines.`,
            location: `Old Town Alleys, ${formattedCity}`,
            category: "Dining",
            estimatedCost: "$35 - $60 USD",
            insiderTip: "Book an outdoor patio table if the weather is mild."
          }
        ]
      },
      {
        dayNumber: 2,
        title: `Arts, Vibrant Neighborhoods & Sunset Views`,
        theme: "Creative Districts & Panoramic Panoramas",
        activities: [
          {
            time: "09:00 AM",
            period: "Morning",
            title: `Morning Market Crawl & Artisanal Coffee`,
            description: `Graze through ${formattedCity}'s premier covered food market, sampling local cheeses, fresh baked pastries, seasonal fruit, and specialty coffee.`,
            location: `Central Market Hall, ${formattedCity}`,
            category: "Dining",
            estimatedCost: "$10 - $18 USD",
            insiderTip: "Look for stalls with long lines of local residents—they always know the best pastry and espresso spots."
          },
          {
            time: "11:00 AM",
            period: "Morning",
            title: `Explore the Arts & Bohemian Quarter`,
            description: `Stroll through the creative quarter filled with independent bookstores, vintage boutiques, contemporary galleries, and street art murals.`,
            location: `Arts Quarter, ${formattedCity}`,
            category: "Culture",
            estimatedCost: "Free to browse",
            insiderTip: "Duck into quiet courtyard passages to find hidden independent makers and ceramic studios."
          },
          {
            time: "02:30 PM",
            period: "Afternoon",
            title: `Botanical Gardens or Royal Park Stroll`,
            description: `Relax amidst centuries-old trees, manicured flowerbeds, fountains, and glasshouse conservatories in ${formattedCity}'s most celebrated green space.`,
            location: `City Gardens, ${formattedCity}`,
            category: "Nature",
            estimatedCost: "Free (Glasshouse $5)",
            insiderTip: "Bring a light picnic snack or book to enjoy on the garden benches."
          },
          {
            time: "06:00 PM",
            period: "Evening",
            title: `Sunset Lookout at the Highest Vantage Point`,
            description: `Ascend to a hilltop viewpoint, historic fortress terrace, or rooftop observation deck to watch the sun sink below ${formattedCity}'s skyline.`,
            location: `Summit Vista Point, ${formattedCity}`,
            category: "Sightseeing",
            estimatedCost: "$0 - $15 USD",
            insiderTip: "Arrive 45 minutes before golden hour to find a prime photography vantage point."
          },
          {
            time: "08:30 PM",
            period: "Night",
            title: `Dinner & Evening Entertainment / Jazz Lounge`,
            description: `Experience ${formattedCity}'s night energy with tapas or a gourmet dinner followed by live acoustic music or a cozy cocktail bar.`,
            location: `Entertainment Quarter, ${formattedCity}`,
            category: "Nightlife",
            estimatedCost: "$30 - $55 USD",
            insiderTip: "Ask the bartender for a cocktail featuring local herbs or indigenous spirits."
          }
        ]
      },
      {
        dayNumber: 3,
        title: `Hidden Gems, Modern Architecture & Farewell Feast`,
        theme: "Modern Culture & Local Treasures",
        activities: [
          {
            time: "09:30 AM",
            period: "Morning",
            title: `Architectural Wonder or Historic Fortress`,
            description: `Discover one of ${formattedCity}'s architectural crowning jewels—whether an ancient citadel, historic cathedral tower, or striking modernist landmark.`,
            location: `Upper District, ${formattedCity}`,
            category: "Sightseeing",
            estimatedCost: "$12 - $20 USD",
            insiderTip: "Climb the tower steps for an unforgettable high-altitude look at the roofline geometry."
          },
          {
            time: "12:30 PM",
            period: "Afternoon",
            title: `Lunch at a Neighborhood Bistro`,
            description: `Escape the main tourist thoroughfares to dine at a beloved family-owned bistro serving authentic local comfort food.`,
            location: `Residential Quarter, ${formattedCity}`,
            category: "Dining",
            estimatedCost: "$15 - $28 USD",
            insiderTip: "Pair your meal with a homemade dessert or signature local craft brew."
          },
          {
            time: "02:30 PM",
            period: "Afternoon",
            title: `Craft Workshops & Local Souvenir Hunting`,
            description: `Browse authentic artisanal souvenirs—such as handmade leather goods, ceramics, local spices, or regional sweets—directly from craftsmen.`,
            location: `Artisans Row, ${formattedCity}`,
            category: "Shopping",
            estimatedCost: "Variable ($15 - $50)",
            insiderTip: "Avoid generic tourist shops; look for ateliers displaying 'Made Locally' certifications."
          },
          {
            time: "07:00 PM",
            period: "Evening",
            title: `Grand Finale Dinner with City Views`,
            description: `Wrap up your memorable 3-day itinerary in ${formattedCity} with an extraordinary dining experience celebrating the finest regional gastronomy.`,
            location: `Panoramic Dining Terrace, ${formattedCity}`,
            category: "Dining",
            estimatedCost: "$45 - $80 USD",
            insiderTip: "Reserve a table by the window well in advance to enjoy city lights reflecting in the evening."
          }
        ]
      }
    ]
  };
}
