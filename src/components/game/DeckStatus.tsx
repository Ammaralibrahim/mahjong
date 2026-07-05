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
      className="flex gap-6 px-6 py-3 glass rounded-xl border border-[#F5B041]/10"
    >
      {statuses.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="text-sm">{item.icon}</span>
          <span className="text-[#8AA3A8] text-xs uppercase tracking-wider">{item.label}</span>
          <span className="text-[#F7DC6F] font-bold text-sm min-w-[24px] text-center">
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}