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

## Notes on Authorship

This codebase was produced through AI-assisted development (iterative generation and
refinement via Claude). Rather than guess at a handwritten/AI split I don't have visibility
into, here's a suggested way to fill this section in accurately:

- **Handwritten / manually adjusted:** *(list specific files or logic you wrote or edited
  by hand — e.g. game balance numbers, specific styling tweaks, bug fixes you made directly)*
- **AI-generated / AI-assisted:** *(list the parts produced by an AI assistant, e.g. component
  scaffolding, animation code, API route boilerplate, error-handling patterns)*

If useful, `git blame` or your editor/AI tool's history is the most reliable source for
reconstructing this breakdown precisely.