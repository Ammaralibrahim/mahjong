# 🎴 Hand Betting Game — Premium Edition

> A dynamic, real‑time betting game built with Mahjong tiles, featuring intelligent state management, smooth animations, and a persistent leaderboard.  
> *Ready for extension and live demo.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/State-Zustand-ff69b4?style=flat)](https://zustand-demo.pmnd.rs/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-ff007f?style=flat&logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Overview

The **Hand Betting Game** is a web‑based gambling simulation inspired by Mahjong. Players bet whether the next hand's total value will be *higher* or *lower* than the current one. Each tile has a dynamic value that changes based on win/loss outcomes, and the game ends when any tile hits 0 or 10, or after the draw pile is reshuffled for the third time.

This project was built as a technical assessment to demonstrate:

- **Complex state management** (Zustand + local persistence)
- **UI polish** (smooth animations, glass‑morphism, responsive design)
- **Scalability** (modular domain logic, feature‑ready architecture for easy extension)

---

## ✨ Features

- **Landing Page** – Start a new game or view the top 5 high scores.
- **Full Mahjong Tile Set** – 34 tile types (numbers, winds, dragons) × 4 copies.
- **Dynamic Tile Values** – Non‑number tiles gain/lose value after each hand.
- **Smart Deck Management** – Draw pile count, discard pile count, and reshuffle counter. Auto‑reshuffles when the draw pile is empty.
- **Betting** – Two‑click "Higher" or "Lower" bets with instant feedback.
- **Hand Display** – Visually rich tile cards with value indicators and new‑tile highlights.
- **History Strip** – Scrollable history of previous hands with win/loss arrows and expandable view.
- **Game Over Modal** – Save your score to the leaderboard with a custom name.
- **Leaderboard** – Persistent top 5 scores stored in MongoDB.
- **Keyboard Shortcuts** – Use arrow keys (↑/↓) for quick betting (optional, not yet implemented, but easy to add).

---

## 🛠️ Tech Stack

| Layer          | Technology                                   |
|----------------|----------------------------------------------|
| Framework      | [Next.js 15](https://nextjs.org/) (App Router) |
| Language       | [TypeScript](https://www.typescriptlang.org/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/)   |
| Styling        | [Tailwind CSS](https://tailwindcss.com/) + custom glass‑morphism |
| Animations     | [Framer Motion](https://www.framer.com/motion/) |
| Database       | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) |
| API            | Next.js API Routes (serverless)             |
| Deployment     | Vercel (recommended) or any Node.js host    |

---

## 📂 Project Structure
.
├── app/
│ ├── api/
│ │ └── leaderboard/
│ │ └── route.ts # GET (top 5) & POST (save score)
│ ├── game/
│ │ └── page.tsx # Game interface
│ └── page.tsx # Landing page
├── components/
│ ├── game/
│ │ ├── BettingControls.tsx
│ │ ├── DeckStatus.tsx
│ │ ├── HandDisplay.tsx
│ │ ├── HistoryStrip.tsx
│ │ ├── ScoreSummaryModal.tsx
│ │ ├── TileCard.tsx
│ │ └── TileIcons.tsx # SVG tile renderers
│ ├── landing/
│ │ ├── LeaderboardList.tsx
│ │ └── NewGameButton.tsx
│ └── shared/
│ └── Button.tsx # Reusable premium button
├── domain/
│ ├── gameRules.ts # Bet resolution, game over checks
│ ├── tiles.ts # Deck generation, shuffling
│ ├── types.ts # TypeScript definitions
│ └── valuation.ts # Value calculation and updates
├── lib/
│ └── mongodb.ts # MongoDB connection caching
├── models/
│ └── Score.ts # Mongoose schema for leaderboard
├── store/
│ └── gameStore.ts # Zustand store (all game logic)
├── .env.local.example # Environment variables template
├── README.md
└── package.json

text

> **Architecture Highlight**  
> Domain logic is completely separated from UI components and state management. This makes adding new features (e.g., multiplayer, different scoring rules, AI opponents) straightforward.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/hand-betting-game.git
cd hand-betting-game
Install dependencies

bash
npm install
# or
yarn install
Set up environment variables

Copy the example environment file:

bash
cp .env.local.example .env.local
Edit .env.local and add your MongoDB connection string:

text
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/handbetting?retryWrites=true&w=majority
Run the development server

bash
npm run dev
# or
yarn dev
Open http://localhost:3000 to see the game.

Build for Production
bash
npm run build
npm start
🎮 How to Play
Start a new game from the landing page.

You'll be dealt 3 tiles – their values sum to your current total.

Bet whether the next hand's total will be higher or lower.

A new hand is drawn; if your bet is correct, you gain +10 points; otherwise, you lose -5 points.

Non‑number tiles (winds and dragons) in the losing/winning hand change their base value by ±1.

The game ends when:

Any tile reaches value 0 or 10.

The draw pile is reshuffled for the 3rd time.

At game over, enter your name to save your score to the leaderboard.

📡 API Endpoints
Method	Endpoint	Description
GET	/api/leaderboard	Returns top 5 scores (descending).
POST	/api/leaderboard	Saves a new score. Body: { playerName, score }
🗄️ Database Setup
The project uses MongoDB with Mongoose. The Score model stores:

playerName (string, max 30 chars)

score (number, non‑negative)

createdAt (auto‑timestamp)

Indexes are added on score for fast sorting.

You can use a local MongoDB instance or a cloud service like MongoDB Atlas. Make sure to allow network access for your IP if using Atlas.

🔧 Customization & Extension
This codebase is built with extension in mind. Here are a few ideas you can implement:

Add new tile types – Just extend buildTileDefinitions() and update TileIcons.

Change scoring rules – Modify WIN_SCORE and LOSE_SCORE constants in gameStore.ts.

Implement keyboard shortcuts – Add useEffect listeners for arrow keys in BettingControls.

Multiplayer mode – Leverage the store's pure functions and sync via WebSockets.

Persist game state – Use zustand/persist middleware to keep state between page refreshes.

🤖 AI Usage Note
This project was developed with the assistance of AI (Large Language Models) for:

Boilerplate generation – Initial file structure, API routes, and MongoDB connection code.

UI component scaffolding – Basic tile icons and layout.

Code suggestions – Logic for deck management and value updates.

The following parts were hand‑written:

All domain logic (domain/ folder) – to ensure correctness and modularity.

Zustand store (store/gameStore.ts) – tailored state transitions and side effects.

Animation orchestration – Framer Motion transitions and micro‑interactions.

Styling – The premium glass‑morphism design and responsive layouts.

AI was used as a productivity tool; all critical game mechanics were manually verified for accuracy and edge cases.

📄 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgements
Mahjong tile designs – Traditional tile art.

Framer Motion – Delightful animations.

Tailwind CSS – Utility‑first styling.

Built with ❤️ for the Hand Betting Game technical assessment.
Ready for the onsite interview – extend me!

text

---