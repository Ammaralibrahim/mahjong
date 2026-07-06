"use client";

import { NewGameButton } from "@/components/landing/NewGameButton";
import { LeaderboardList } from "@/components/landing/LeaderboardList";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 py-16">
      {/* Arka plan efekti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-[#F5B041]/5 via-transparent to-transparent animate-pulse" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold shimmer-text mb-4">
          Hand Betting
        </h1>
        <p className="text-[#8AA3A8] text-lg md:text-xl max-w-md mx-auto">
          Bet higher or lower with Mahjong tiles
        </p>
      </motion.div>

      {/* New Game Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <NewGameButton />
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <LeaderboardList />
      </motion.div>

   
    </main>
  );
}