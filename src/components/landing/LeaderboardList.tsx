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
    <div className="flex justify-center w-full px-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md rounded-2xl p-5 sm:p-7
                   bg-[#1A2A2F]/40 backdrop-blur-sm
                   border border-[#F5B041]/10
                   shadow-lg shadow-black/10"
      >
        {/* Başlık */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <span className="text-2xl sm:text-3xl">🏆</span>
          <h2 className="text-lg sm:text-xl font-light tracking-[0.15em] text-[#F0E6D3]/80 uppercase">
            Leaderboard
          </h2>
        </div>

        <div className="w-12 h-px mx-auto mb-5 bg-gradient-to-r from-transparent via-[#F5B041]/30 to-transparent" />

        {leaderboard.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-[#8AA3A8]/60 text-sm font-light">No scores yet</p>
            <p className="text-[#8AA3A8]/30 text-xs mt-1 tracking-wider">Be the first</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {leaderboard.map((entry, index) => {
              const medals = ["🥇", "🥈", "🥉"];
              const medal = index < 3 ? medals[index] : `#${index + 1}`;
              const isTop3 = index < 3;

              return (
                <motion.li
                  key={`${entry.playerName}-${entry.createdAt}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.01,
                    borderColor: "rgba(245, 176, 65, 0.3)",
                  }}
                  className={`
                    flex justify-between items-center
                    px-3 py-2.5 rounded-lg
                    border-b border-[#F5B041]/5 last:border-0
                    transition-all duration-200
                    ${isTop3 ? "bg-[#F5B041]/5" : "hover:bg-[#F5B041]/5"}
                  `}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base sm:text-lg w-6 sm:w-7 text-center">
                      {medal}
                    </span>
                    <span className="text-[#F0E6D3] text-sm sm:text-base font-light truncate max-w-[120px] sm:max-w-[160px]">
                      {entry.playerName}
                    </span>
                  </span>
                  <span className={`
                    text-base sm:text-lg font-medium
                    ${isTop3 ? "text-[#F7DC6F]" : "text-[#8AA3A8]"}
                  `}>
                    {entry.score}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </div>
  );
}