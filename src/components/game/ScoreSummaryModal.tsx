"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/shared/Button";
import { useRouter } from "next/navigation";

export function ScoreSummaryModal() {
  const isGameOver = useGameStore((state) => state.isGameOver);
  const score = useGameStore((state) => state.score);
  const submitScore = useGameStore((state) => state.submitScore);
  const isSubmittingScore = useGameStore((state) => state.isSubmittingScore);
  const resetToLanding = useGameStore((state) => state.resetToLanding);
  const router = useRouter();

  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!playerName.trim()) return;
    await submitScore(playerName.trim());
    setSubmitted(true);
  };

  const handleExit = () => {
    resetToLanding();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 22, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="glass rounded-3xl p-8 md:p-10 w-full max-w-md border border-[#F5B041]/20 relative overflow-hidden"
          >
            {/* Arka plan efekti */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#F5B041]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, delay: 0.1 }}
                className="text-6xl mb-3"
              >
                {score > 80 ? "🏆" : score > 50 ? "⭐" : "🎯"}
              </motion.div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] bg-clip-text text-transparent font-display">
                Game Over
              </h2>
              
              <div className="mt-4 mb-6">
                <span className="text-[#8AA3A8] text-sm uppercase tracking-[0.2em]">Your Score</span>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 12, stiffness: 200 }}
                  className="text-6xl font-bold text-[#F7DC6F] font-display"
                >
                  {score}
                </motion.p>
              </div>
            </div>

            {!submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 relative z-10"
              >
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="👤 Enter your name"
                  maxLength={30}
                  className="bg-[#1A2A2F] border border-[#F5B041]/30 rounded-xl px-5 py-3 text-[#F0E6D3] placeholder:text-[#8AA3A8]/50 outline-none focus:border-[#F5B041] transition-all duration-200"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmittingScore || !playerName.trim()}
                  className="w-full"
                >
                  {isSubmittingScore ? (
                    <span className="flex items-center gap-2 justify-center">
                      <motion.span 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span> 
                      Saving...
                    </span>
                  ) : (
                    "💾 Save Score"
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-center py-4 relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="text-4xl mb-2"
                >
                  ✅
                </motion.div>
                <p className="text-[#2ECC71] font-semibold text-lg">Score saved!</p>
                <p className="text-[#8AA3A8] text-sm mt-1">You're on the leaderboard.</p>
              </motion.div>
            )}

            <Button
              onClick={handleExit}
              variant="outline"
              className="w-full mt-4 relative z-10"
            >
              🏠 Back to Home
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}