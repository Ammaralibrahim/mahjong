"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { HandDisplay } from "@/components/game/HandDisplay";
import { BettingControls } from "@/components/game/BettingControls";
import { HistoryStrip } from "@/components/game/HistoryStrip";
import { DeckStatus } from "@/components/game/DeckStatus";
import { ScoreSummaryModal } from "@/components/game/ScoreSummaryModal";
import { Button } from "@/components/shared/Button";
import { motion } from "framer-motion";

export default function GamePage() {
  const router = useRouter();

  const currentHand = useGameStore((state) => state.currentHand);
  const tileValues = useGameStore((state) => state.tileValues);
  const drawPile = useGameStore((state) => state.drawPile);
  const discardPile = useGameStore((state) => state.discardPile);
  const depletionCount = useGameStore((state) => state.depletionCount);
  const score = useGameStore((state) => state.score);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const history = useGameStore((state) => state.history);
  const placeBet = useGameStore((state) => state.placeBet);
  const resetToLanding = useGameStore((state) => state.resetToLanding);

  const handleExit = () => {
    resetToLanding();
    router.push("/");
  };

const previousTotal = history.length > 1 ? history[history.length - 2].total : undefined;

  if (currentHand.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-2xl p-12">
          <p className="text-[#8AA3A8] mb-4">Game not found.</p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center gap-6 px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl flex justify-between items-center"
      >
        <Button variant="ghost" onClick={handleExit} className="text-sm">
          <span className="flex items-center gap-2">
            <span>←</span> Exit
          </span>
        </Button>
        <div className="text-center">
          <span className="text-[#8AA3A8] text-xs uppercase tracking-[0.2em]">
            Score
          </span>
          <motion.p
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, duration: 0.3 }}
            className="text-3xl font-bold text-[#F7DC6F] font-display"
          >
            {score}
          </motion.p>
        </div>
        <div className="w-16"></div>
      </motion.div>

      {/* Deck Status */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <DeckStatus
  drawCount={drawPile.length}
  discardCount={discardPile.length}
  reshuffleCount={depletionCount}
/>
      </motion.div>

      {/* Hand Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <HandDisplay
          hand={currentHand}
          tileValues={tileValues}
          label="Current Hand"
          previousTotal={previousTotal}
        />
      </motion.div>

      {/* Betting Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <BettingControls onBet={placeBet} disabled={isGameOver} />
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <HistoryStrip history={history} tileValues={tileValues} />
      </motion.div>

      {/* Score Summary Modal */}
      <ScoreSummaryModal />
    </main>
  );
}
