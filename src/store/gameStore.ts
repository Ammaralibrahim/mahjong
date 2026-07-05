import { create } from "zustand";
import { Tile, TileValues, Hand } from "@/domain/types";
import {
  createFullDeck,
  createInitialTileValues,
  shuffle,
  drawTiles,
} from "@/domain/tiles";
import { 
  calculateHandValue, 
  updateTileValuesAfterHand,
  recalculateHistoryTotals
} from "@/domain/valuation";
import { 
  resolveBet, 
  checkGameOver, 
  checkTileLimitReached,
  checkDepletionLimitReached,
  BetDirection 
} from "@/domain/gameRules";

const HAND_SIZE = 3;
const WIN_SCORE = 10;
const LOSE_SCORE = -5;

export type LeaderboardEntry = {
  playerName: string;
  score: number;
  createdAt: string;
};

type RoundResult = {
  previousHand: Hand;
  previousTotal: number;
  newHand: Hand;
  newTotal: number;
  bet: BetDirection;
  won: boolean;
} | null;

type GameStore = {
  drawPile: Tile[];
  discardPile: Tile[];
  currentHand: Hand;
  tileValues: TileValues;
  depletionCount: number;
  score: number;
  isGameOver: boolean;
  lastRoundResult: RoundResult;
  history: { hand: Hand; total: number }[];
  leaderboard: LeaderboardEntry[];
  isSubmittingScore: boolean;
  startNewGame: () => void;
  placeBet: (direction: BetDirection) => void;
  resetToLanding: () => void;
  fetchLeaderboard: () => Promise<void>;
  submitScore: (playerName: string) => Promise<void>;
};

function dealInitialHand(deck: Tile[]) {
  const { drawn, remaining } = drawTiles(deck, HAND_SIZE);
  return { hand: drawn, remaining };
}

export const useGameStore = create<GameStore>((set, get) => ({
  drawPile: [],
  discardPile: [],
  currentHand: [],
  tileValues: {},
  depletionCount: 0,
  score: 0,
  isGameOver: false,
  lastRoundResult: null,
  history: [],
  leaderboard: [],
  isSubmittingScore: false,

  startNewGame: () => {
    const freshDeck = shuffle(createFullDeck());
    const { hand, remaining } = dealInitialHand(freshDeck);
    const tileValues = createInitialTileValues();
    set({
      drawPile: remaining,
      discardPile: [],
      currentHand: hand,
      tileValues,
      depletionCount: 0,
      score: 0,
      isGameOver: false,
      lastRoundResult: null,
      history: [{ hand, total: calculateHandValue(hand, tileValues) }],
    });
  },

  placeBet: (direction: BetDirection) => {
    const state = get();
    
    if (state.isGameOver) {
      console.warn("Game is already over!");
      return;
    }

    let { drawPile, discardPile } = state;
    let depletionCount = state.depletionCount;

    if (drawPile.length < HAND_SIZE) {
      depletionCount += 1;

      if (depletionCount >= 3) {
        set({ isGameOver: true, depletionCount });
        return;
      }

      // Reshuffle: add fresh deck and discard pile
      const freshDeck = shuffle(createFullDeck());
      const allTiles = [...drawPile, ...discardPile, ...freshDeck];
      
      if (allTiles.length > 2000) {
        console.warn("Deck size is too large, truncating...");
        drawPile = shuffle(allTiles.slice(0, 1500));
      } else {
        drawPile = shuffle(allTiles);
      }
      discardPile = [];
    }

    const { drawn: newHand, remaining } = drawTiles(drawPile, HAND_SIZE);
    
    if (newHand.length < HAND_SIZE) {
      console.error("Not enough tiles to draw!");
      set({ isGameOver: true });
      return;
    }

    const previousHand = state.currentHand;
    const previousTotal = calculateHandValue(previousHand, state.tileValues);
    const newTotal = calculateHandValue(newHand, state.tileValues);
    
    const won = resolveBet(previousTotal, newTotal, direction);

    const scoreChange = won ? WIN_SCORE : LOSE_SCORE;
    const newScore = Math.max(0, state.score + scoreChange);

    const updatedTileValues = updateTileValuesAfterHand(
      previousHand,
      state.tileValues, 
      won
    );

    const gameOver = checkGameOver(updatedTileValues, depletionCount);

    const updatedHistory = [
      ...state.history,
      { 
        hand: newHand, 
        total: calculateHandValue(newHand, updatedTileValues)
      }
    ];

    const updatedDiscardPile = [...discardPile, ...previousHand];

    set({
      drawPile: remaining,
      discardPile: updatedDiscardPile,
      currentHand: newHand,
      tileValues: updatedTileValues,
      depletionCount,
      score: newScore,
      isGameOver: gameOver,
      lastRoundResult: {
        previousHand,
        previousTotal,
        newHand,
        newTotal: calculateHandValue(newHand, updatedTileValues),
        bet: direction,
        won,
      },
      history: updatedHistory,
    });

    if (gameOver) {
      console.log("Game Over! Final Score:", newScore);
      console.log("Reason:", {
        tileLimit: checkTileLimitReached(updatedTileValues),
        depletionLimit: checkDepletionLimitReached(depletionCount)
      });
    }
  },

  resetToLanding: () => {
    set({
      drawPile: [],
      discardPile: [],
      currentHand: [],
      tileValues: {},
      depletionCount: 0,
      score: 0,
      isGameOver: false,
      lastRoundResult: null,
      history: [],
    });
  },

  fetchLeaderboard: async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        set({ leaderboard: json.data });
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  },

  submitScore: async (playerName: string) => {
    const state = get();
    if (state.isSubmittingScore) return;
    if (!playerName.trim()) {
      console.warn("Player name is required");
      return;
    }
    
    set({ isSubmittingScore: true });
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName.trim().slice(0, 30),
          score: state.score,
        }),
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      await get().fetchLeaderboard();
    } catch (error) {
      console.error("Failed to submit score:", error);
    } finally {
      set({ isSubmittingScore: false });
    }
  },
}));