# 🌿 Health & Wellness Dashboard

**BITSFRAME Frontend Engineering Assignment**
**Candidate:** Khatija Zaidi
**Role:** Frontend Engineer (Next.js)

---

## 📌 Overview

A modern, responsive Health & Wellness Dashboard built with **Next.js App Router**, **Material UI**, and **React Hooks**. The app allows users to log daily health metrics, view a smart status indicator, receive logic-based insights, and get live content from public APIs — all with localStorage persistence across sessions.

---

## 🚀 Live Features

### ✅ Core Features
| Feature | Details |
|---|---|
| Health Input Form | Steps walked, water intake (L), calories (optional) |
| Input Validation | No negative values, required field checks, inline error messages |
| Dashboard Display | Summary cards for all entered metrics |
| Health Status | Dynamic **Good / Warning / Poor** badge with color coding |
| Smart Insights | Logic-based suggestions generated from user data |
| localStorage | Data persists across page refreshes, cleared on reset |

### 🔌 Public API Integration
| API | Usage |
|---|---|
| [Advice Slip API](https://api.adviceslip.com) | Daily wellness tip with refresh support |
| [Bored API](https://bored-api.appbrewery.com) | Activity suggestion with category and participant info |

### 🎁 Bonus Features
- ✅ localStorage persistence (save, restore, clear)
- ✅ Loading and error states on all API calls
- ✅ Bar chart visualization via Recharts
- ✅ Fully responsive UI (mobile → desktop)
- ✅ Animated background with themed design

---

## 🧠 Smart Insights Logic

Defined in `src/lib/healthLogic.js`:

```js
// Health Status Rules
Good    → steps > 8000  AND  water >= 2
Poor    → water < 1.5   OR   steps < 4000
Warning → all other valid cases

// Insight Messages
Steps > 8000 && Water >= 2  → "Great job! You're hitting your daily targets."
Water < 1.5                 → "Drink more water. You're below the recommended intake."
Steps < 4000                → "Increase your activity. Try to walk more today."
```

Multiple insights can appear simultaneously based on the data entered.

---

## 🗂️ Project Structure

```
health-wellness-dashboard/
├── public/
│   └── health-hero.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── activity/route.js       # Bored API proxy route
│   │   │   └── advice/route.js         # Advice Slip API proxy route
│   │   ├── globals.css                 # Global styles + background theme
│   │   ├── layout.jsx                  # Root layout with ThemeProvider
│   │   └── page.jsx                    # Main dashboard page
│   ├── components/
│   │   ├── ActivitySuggestionCard.jsx  # Bored API activity display
│   │   ├── AdviceTipCard.jsx           # Advice Slip tip display
│   │   ├── AppThemeProvider.jsx        # MUI theme configuration
│   │   ├── DashboardSummary.jsx        # Summary + status + chart
│   │   ├── EmptyState.jsx              # Shown before data is entered
│   │   ├── HealthChart.jsx             # Recharts bar chart
│   │   ├── HealthForm.jsx              # Input form with validation
│   │   ├── InsightsList.jsx            # Logic-based insight alerts
│   │   ├── RulesCard.jsx               # Status rules reference card
│   │   ├── StatusBadge.jsx             # Good / Warning / Poor badge
│   │   └── SummaryCard.jsx             # Individual metric card
│   └── lib/
│       ├── activityApi.js              # Bored API fetch logic
│       ├── adviceApi.js                # Advice Slip fetch logic
│       ├── contextualActivity.js       # Activity context helpers
│       ├── healthLogic.js              # Status + insights logic
│       ├── healthRules.js              # Rules data for RulesCard
│       ├── storage.js                  # localStorage helpers
│       └── wellnessTip.js              # Tip formatting helpers
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### 1. Clone the repository

```bash
git clone https://github.com/khatijazaidi/health-wellness-dashboard.git
cd health-wellness-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org) (App Router) | Framework, routing, API routes |
| [React](https://react.dev) | UI with `useState`, `useEffect`, `useMemo` |
| [Material UI (MUI)](https://mui.com) | Component library and theming |
| [Recharts](https://recharts.org) | Bar chart visualization |
| Fetch API | HTTP requests to public APIs |
| localStorage | Client-side data persistence |

---

## 🔗 Public APIs Used

### Advice Slip API
- **Endpoint:** `https://api.adviceslip.com/advice`
- **Usage:** Fetches a random wellness tip displayed in the Wellness Tip tab
- **Auth:** None required

### Bored API
- **Endpoint:** `https://bored-api.appbrewery.com/random`
- **Fallback:** `https://www.boredapi.com/api/activity`
- **Usage:** Fetches a random activity suggestion displayed in the Activity tab
- **Auth:** None required

---

## 💾 localStorage Persistence

Handled in `src/lib/storage.js`:

```js
saveHealthData(data)   // Saves on form submit
loadHealthData()       // Restores on page load
clearHealthData()      // Clears on form reset
```

Data is stored under the key `health_dashboard_data` as JSON.

---

## 📊 Health Chart

A `Recharts` `BarChart` in `HealthChart.jsx` renders three bars — Steps, Water (L), and Calories — using distinct colors per metric for quick visual comparison.

---

## 💡 Implementation Decisions

### Why Next.js App Router?
App Router provides a clean, scalable folder structure with co-located API routes. The `/api/activity` and `/api/advice` route handlers act as lightweight proxies, keeping external API calls server-side and avoiding CORS issues in the browser.

### Why Material UI over Tailwind?
MUI provides a complete design system with accessible, production-ready components out of the box. For a dashboard with forms, cards, charts, and status indicators, MUI reduces boilerplate significantly while keeping the UI consistent.

### Why separate `lib/` utilities?
All business logic (health status, insights, rules) lives in `lib/healthLogic.js` and `lib/healthRules.js` — completely decoupled from the UI. This means the logic can be tested independently and the rules (thresholds like `8000` steps) are defined in one place (`healthRules.js`), not scattered across components.

### Why `useMemo` for status and insights?
`status` and `insights` are derived from `healthData`. Wrapping them in `useMemo` ensures they only recompute when `healthData` actually changes, not on every render.

### Why proxy API routes instead of direct client fetch?
Calling external APIs from Next.js API routes (`/api/advice`, `/api/activity`) avoids CORS errors, hides implementation details from the client, and makes it easy to add caching or fallback logic server-side in the future.

---

## 🔮 Future Improvements

- [ ] Multi-day history tracking with trend charts
- [ ] Weekly analytics and goal-setting
- [ ] Unit tests for health logic and storage utilities
- [ ] PWA support for offline usage
- [ ] User authentication and personalized health goals
- [ ] Open-Meteo API integration for weather-based activity suggestions
- [ ] Dark mode toggle

---

## 👩‍💻 About

Built by **Khatija Zaidi** as part of the BITSFRAME Frontend Engineering Assignment.
The goal was to demonstrate Next.js proficiency, clean component architecture, public API integration, and thoughtful UI/UX design.
