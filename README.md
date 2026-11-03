# ✈️ AI Travel Itinerary Generator

An AI-powered travel planning application that generates personalized, day-wise travel itineraries based on the destination entered by the user.

The application uses Generative AI to simplify travel planning by suggesting activities, organizing schedules, and creating structured itineraries for travelers.

## 🌍 Project Overview

Planning a trip involves researching destinations, identifying attractions, organizing activities, and managing time. This application makes the process easier by generating a structured travel itinerary using AI.

Users can enter a destination, and the application generates a **3-day travel itinerary** with suggested activities, timings, and places to explore.

## ✨ Features

- **AI-Powered Itinerary Generation:** Generates travel plans using Generative AI.
- **Destination-Based Planning:** Users can enter their preferred travel destination.
- **3-Day Travel Plan:** Organizes the trip into three individual days.
- **Time-Based Scheduling:** Provides suggested timings for activities.
- **Activity Recommendations:** Suggests places to visit and activities to experience.
- **Structured Output:** Presents the itinerary in an organized, easy-to-understand format.
- **User-Friendly Interface:** Provides a simple interface for generating travel plans.

## 🛠️ Technologies Used

- Google AI Studio
- Generative AI (Gemini)
- JavaScript / TypeScript
- React.js
- HTML5
- CSS3

*Note: Confirm the exact framework and language against your exported source code before publishing.*

## ⚙️ How It Works

1. The user opens the application.
2. Enters a destination, such as Rome.
3. The application sends the destination details to the AI model.
4. The AI generates a structured three-day itinerary.
5. The application displays daily activities, suggested timings, and places to explore.

## 📸 Example

**Input:** Rome

**Generated Output:**
- Day 1 – Explore historical landmarks and popular attractions.
- Day 2 – Visit museums, cultural locations, and local attractions.
- Day 3 – Explore shopping areas, local food, and other experiences.

The actual itinerary is generated dynamically based on the destination.

## 🚀 Future Enhancements

- Allow users to customize trip duration.
- Add budget-based travel recommendations.
- Include hotel and restaurant suggestions.
- Integrate Google Maps for location visualization.
- Add weather information for destinations.
- Provide downloadable itineraries in PDF format.
- Support multiple travel preferences.

---

# 💻 Installation and Setup

Follow these steps to run the project locally.

## 1. Prerequisites

Install the following software:

- Node.js (LTS version)
- npm (included with Node.js)
- Visual Studio Code (recommended)
- Google AI Studio API key, if required by the application

Check whether Node.js and npm are installed:

```bash
node -v
npm -v
```

## 2. Download the Project

Download the project ZIP from Google AI Studio or clone your GitHub repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

If you downloaded the ZIP, extract it and open the extracted project folder.

## 3. Open the Project Folder

```bash
cd AI-Travel-Itinerary-Generator
```

Open it in Visual Studio Code:

```bash
code .
```

## 4. Install Dependencies

Run:

```bash
npm install
```

This installs the dependencies specified in `package.json`.

## 5. Configure Environment Variables

If the project uses the Gemini API directly, create a `.env.local` file in the project root and configure the API key using the environment variable name expected by the source code.

Example:

```env
GEMINI_API_KEY=your_api_key_here
```

**Important:** Never upload API keys or `.env.local` files to GitHub. Add them to `.gitignore`.

## 6. Run the Application

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 7. Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 👩‍💻 Author

**Jyothika Neerudi**

Computer Science and Engineering Undergraduate

- GitHub: https://github.com/Jyothika-07-24
- LinkedIn: https://www.linkedin.com/in/jyothika-neerudi-a38413349/

---

⭐ If you find this project interesting, consider giving the repository a star!
