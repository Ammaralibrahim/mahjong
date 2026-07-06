"use client";
import { motion } from "framer-motion";

type DeckStatusProps = {
  drawCount: number;
  discardCount: number;
  reshuffleCount: number;
};

export function DeckStatus({ drawCount, discardCount, reshuffleCount }: DeckStatusProps) {
  const statuses = [
    { label: "Draw Pile", value: drawCount, icon: "📚" },
    { label: "Discard Pile", value: discardCount, icon: "🗑️" },
    { label: "Reshuffles", value: `${reshuffleCount}/3`, icon: "🔄" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3 glass rounded-xl border border-[#F5B041]/10 w-full max-w-md mx-auto"
    >
      {statuses.map((item) => (
        <div key={item.label} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span className="text-sm sm:text-base">{item.icon}</span>
          <span className="text-[#8AA3A8] text-[10px] sm:text-xs uppercase tracking-wider hidden xs:inline">
            {item.label}
          </span>
          <span className="text-[#F7DC6F] font-bold text-sm sm:text-base min-w-[20px] sm:min-w-[24px] text-center">
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}