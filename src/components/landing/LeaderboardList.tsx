"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export function LeaderboardList() {
  const leaderboard = useGameStore((state) => state.leaderboard);
  const fetchLeaderboard = useGameStore((state) => state.fetchLeaderboard);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-gold rounded-2xl p-8 w-full max-w-md border border-[#F5B041]/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🏆</span>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] bg-clip-text text-transparent font-display">
          Top 5 Scores
        </h2>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#8AA3A8] text-sm">No scores yet.</p>
          <p className="text-[#8AA3A8]/60 text-xs mt-1">Be the first!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {leaderboard.map((entry, index) => {
            const medals = ["🥇", "🥈", "🥉"];
            const medal = index < 3 ? medals[index] : `#${index + 1}`;
            
            return (
              <motion.li
                key={`${entry.playerName}-${entry.createdAt}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex justify-between items-center glass rounded-xl px-5 py-3 hover:bg-[#F5B041]/5 transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg w-8 text-center">{medal}</span>
                  <span className="text-[#F0E6D3] font-medium">{entry.playerName}</span>
                </span>
                <span className="text-xl font-bold text-[#F7DC6F]">{entry.score}</span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}