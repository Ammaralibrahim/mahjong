"use client";
import { Button } from "@/components/shared/Button";
import { BetDirection } from "@/domain/gameRules";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type BettingControlsProps = {
  onBet: (direction: BetDirection) => void;
  disabled?: boolean;
};

export function BettingControls({ onBet, disabled }: BettingControlsProps) {
  const [feedback, setFeedback] = useState<{ direction: BetDirection; value: number } | null>(null);

  const handleBet = (direction: BetDirection) => {
    if (disabled) return;
    onBet(direction);
    setFeedback({ direction, value: Math.floor(Math.random() * 20) + 10 });
    setTimeout(() => setFeedback(null), 800);
  };

  return (
    <div className="relative flex flex-col items-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
      {/* Buton Container – mobilde üst üste değil yan yana (flex-wrap) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
        {/* Higher Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex-1 min-w-[140px] sm:min-w-[160px]"
        >
          <button
            onClick={() => handleBet("higher")}
            disabled={disabled}
            className={`
              w-full relative px-4 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg
              bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] 
              text-[#0A1215] shadow-lg shadow-[#F5B041]/30
              hover:shadow-xl hover:shadow-[#F5B041]/50
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center justify-center gap-2 sm:gap-3
              overflow-hidden group
              touch-manipulation
              min-h-[52px] sm:min-h-[64px]
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <motion.span 
                className="text-xl sm:text-2xl"
                whileHover={{ y: -3, rotate: 10 }}
                transition={{ type: "spring", damping: 15 }}
              >
                ⬆
              </motion.span>
              <span className="tracking-wide">Higher</span>
            </span>
          </button>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#F7DC6F]/50 to-transparent rounded-full blur-sm" />
        </motion.div>

        {/* Lower Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex-1 min-w-[140px] sm:min-w-[160px]"
        >
          <button
            onClick={() => handleBet("lower")}
            disabled={disabled}
            className={`
              w-full relative px-4 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg
              border-2 border-[#F5B041] text-[#F5B041]
              hover:bg-[#F5B041]/10 hover:shadow-lg hover:shadow-[#F5B041]/20
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center justify-center gap-2 sm:gap-3
              overflow-hidden group
              touch-manipulation
              min-h-[52px] sm:min-h-[64px]
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5B041]/0 via-[#F5B041]/5 to-[#F5B041]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <motion.span 
                className="text-xl sm:text-2xl"
                whileHover={{ y: 3, rotate: -10 }}
                transition={{ type: "spring", damping: 15 }}
              >
                ⬇
              </motion.span>
              <span className="tracking-wide">Lower</span>
            </span>
          </button>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#F5B041]/30 to-transparent rounded-full blur-sm" />
        </motion.div>
      </div>

      {/* Geri bildirim animasyonu */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1.3, y: -50 }}
            exit={{ opacity: 0, scale: 0.5, y: -70 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-50"
          >
            <span className="text-4xl sm:text-5xl font-bold text-[#F7DC6F] drop-shadow-2xl">
              {feedback.direction === "higher" ? "⬆" : "⬇"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Klavye kısayol göstergesi – sadece masaüstü */}
      <div className="hidden sm:flex gap-6 text-xs text-[#8AA3A8]/50">
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-[#1A2A2F] rounded text-[#8AA3A8] text-[10px] border border-[#8AA3A8]/10">↑</kbd>
          <span>Higher</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-[#1A2A2F] rounded text-[#8AA3A8] text-[10px] border border-[#8AA3A8]/10">↓</kbd>
          <span>Lower</span>
        </span>
      </div>
    </div>
  );
}