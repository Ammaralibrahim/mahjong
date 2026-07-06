"use client";
import { Tile, TileValues } from "@/domain/types";
import { TileCard } from "./TileCard";
import { calculateHandValue } from "@/domain/valuation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type HandDisplayProps = {
  hand: Tile[];
  tileValues: TileValues;
  label?: string;
  previousTotal?: number;
};

export function HandDisplay({ hand, tileValues, label, previousTotal }: HandDisplayProps) {
  const [total, setTotal] = useState(calculateHandValue(hand, tileValues));
  const [showScorePop, setShowScorePop] = useState(false);
  const [scoreChange, setScoreChange] = useState<number | null>(null);

  useEffect(() => {
    const newTotal = calculateHandValue(hand, tileValues);
    if (previousTotal !== undefined && previousTotal !== newTotal) {
      const change = newTotal - previousTotal;
      setScoreChange(change);
      setShowScorePop(true);
      setTimeout(() => setShowScorePop(false), 600);
    }
    setTotal(newTotal);
  }, [hand, tileValues, previousTotal]);

  // Mobilde tile boyutunu otomatik küçült
  const tileSize = "lg"; // sabit, ancak TileCard içinde responsive yapacağız

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3 sm:gap-5 p-4 sm:p-8 glass rounded-2xl w-full max-w-3xl border border-[#F5B041]/10 relative mx-auto"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#F5B041]/30 to-transparent" />

      {label && (
        <span className="text-[#8AA3A8] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold">
          {label}
        </span>
      )}

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 min-h-[120px] sm:min-h-[170px] items-center w-full">
        <AnimatePresence mode="wait">
          {hand.map((tile, idx) => (
            <TileCard
              key={tile.instanceId}
              tile={tile}
              tileValues={tileValues}
              size="responsive" // yeni bir size modu
              index={idx}
              isNew={idx === hand.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative mt-1">
        <motion.div
          key={total}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        >
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] bg-clip-text text-transparent font-display">
            {total}
          </span>
        </motion.div>
        <AnimatePresence>
          {showScorePop && scoreChange !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, y: -30, scale: 1.2 }}
              exit={{ opacity: 0, y: -50, scale: 0.5 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 200,
                duration: 0.3,
              }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <span className={`text-xl sm:text-2xl font-bold ${scoreChange >= 0 ? "text-[#2ECC71]" : "text-[#E74C6F]"}`}>
                {scoreChange >= 0 ? "+" : ""}{scoreChange}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#F5B041]/15 to-transparent" />
    </motion.div>
  );
}