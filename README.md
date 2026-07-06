# Hand Betting — Mahjong Tile Betting Game

A browser-based "higher or lower" betting game built around Mahjong tiles. Draw a hand,
bet whether the next hand's value will be higher or lower, and watch tile values drift
up or down as you win or lose. Scores are saved to a MongoDB-backed leaderboard.

## Tech Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **State management:** Zustand (`src/store/gameStore.ts`)
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS
- **Database:** MongoDB via Mongoose (leaderboard persistence)

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- A MongoDB connection string (local instance or a hosted cluster, e.g. MongoDB Atlas)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env.local` file in the project root:
   ```bash
   MONGODB_URI="your-mongodb-connection-string"
   ```
   The app will throw an error on startup (`lib/mongodb.ts`) if this variable is missing.

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
app/
  page.tsx              # Landing page (new game + leaderboard)
  game/page.tsx          # Main game screen
  api/leaderboard/route.ts  # GET (top 5 scores) / POST (save score)
components/
  game/                  # Hand display, betting controls, history, deck status, modal
  landing/               # New game button, leaderboard list
  shared/                # Reusable Button component
domain/
  types.ts               # Core Tile / Hand / TileValues types
  tiles.ts               # Deck construction, shuffling, dealing
  valuation.ts           # Hand value calculation, tile value drift logic
  gameRules.ts           # Bet resolution, game-over conditions
lib/mongodb.ts           # Cached Mongoose connection helper
models/Score.ts          # Mongoose schema for leaderboard scores
store/gameStore.ts       # Zustand store: game state + actions
```

## Game Rules (quick reference)

- Each hand is 3 tiles; non-number tiles (winds/dragons) have values that start at 5
  and drift between 0–10 based on wins/losses.
- Betting **higher** or **lower** compares the new hand's total value to the previous
  hand's total.
- A win adds 10 points, a loss subtracts 5 (score floors at 0).
- The game ends if any non-number tile value hits 0 or 10, or after 3 deck reshuffles.

## Development Notes

I used Claude (AI assistant) support to speed up the initial logic and frontend/backend
implementation of the project. I examined the generated code in detail, understood the
architecture, and had control to the point where I could modify it and add new features
when necessary. I used AI as a time-saving tool; design decisions and final responsibility
for the code belong to me.