"use client";
import { NewGameButton } from "@/components/landing/NewGameButton";
import { LeaderboardList } from "@/components/landing/LeaderboardList";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-10 px-4 py-10 sm:py-16">
      {/* Arka plan efekti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-[#F5B041]/5 via-transparent to-transparent animate-pulse" />
      </div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 px-2"
      >
        <h1 className="font-display text-4xl xs:text-5xl md:text-7xl font-bold shimmer-text mb-3 sm:mb-4 leading-tight">
          Hand Betting
        </h1>
        <p className="text-[#8AA3A8] text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md mx-auto">
          Bet higher or lower with Mahjong tiles
        </p>
      </motion.div>
      {/* New Game Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full flex justify-center px-4"
      >
        <NewGameButton />
      </motion.div>
      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full px-2 sm:px-0"
      >
        <LeaderboardList />
      </motion.div>

    </main>
  );
}