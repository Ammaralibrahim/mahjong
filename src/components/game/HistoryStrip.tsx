"use client";
import { Hand } from "@/domain/types";
import { TileValues } from "@/domain/types";
import { TileCard } from "./TileCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type HistoryStripProps = {
  history: { hand: Hand; total: number }[];
  tileValues: TileValues;
};

export function HistoryStrip({ history, tileValues }: HistoryStripProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const recentHistory = history.slice(-6).reverse();
  const allHistory = history.slice().reverse();
  const displayHistory = isExpanded ? allHistory : recentHistory;

  const getResult = (index: number, total: number) => {
    if (index === history.length - 1) return null;
    const nextTotal = history[index + 1]?.total;
    if (nextTotal === undefined) return null;
    if (total > nextTotal) return "down";
    if (total < nextTotal) return "up";
    return "same";
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#8AA3A8] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold">
            History
          </span>
          <span className="text-[#8AA3A8]/40 text-[8px] sm:text-[10px]">
            {history.length} hands
          </span>
        </div>
        {history.length > 6 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#8AA3A8] text-[8px] sm:text-[10px] uppercase tracking-wider hover:text-[#F5B041] transition-colors touch-manipulation"
          >
            {isExpanded ? "Show less" : "Show all"}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-6 sm:py-8 border-2 border-dashed border-[#F5B041]/10 rounded-xl"
        >
          <span className="text-2xl sm:text-3xl mb-2">🎴</span>
          <p className="text-[#8AA3A8]/40 text-xs sm:text-sm">No hands played yet</p>
          <p className="text-[#8AA3A8]/20 text-[10px] sm:text-xs mt-1">Place your first bet to start</p>
        </motion.div>
      ) : (
        <div className="relative">
          <div 
            className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#F5B041]/20 hover:scrollbar-thumb-[#F5B041]/40"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(245, 176, 65, 0.2) transparent",
            }}
          >
            <AnimatePresence initial={false}>
              {displayHistory.map((entry, index) => {
                const result = getResult(history.length - 1 - index, entry.total);
                const isLatest = index === 0;
                return (
                  <motion.div
                    key={history.length - 1 - index}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ 
                      delay: index * 0.03,
                      duration: 0.2,
                      type: "spring",
                      damping: 20
                    }}
                    className={`
                      flex flex-col items-center 
                      glass rounded-xl p-2 sm:p-3 shrink-0 
                      min-w-[90px] sm:min-w-[120px] 
                      border transition-all duration-300
                      ${isLatest 
                        ? "border-[#F5B041]/30 shadow-lg shadow-[#F5B041]/5" 
                        : "border-[#F5B041]/10 hover:border-[#F5B041]/20"
                      }
                      ${result === "up" ? "border-l-2 border-l-[#2ECC71]" : ""}
                      ${result === "down" ? "border-l-2 border-l-[#E74C6F]" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[#8AA3A8]/40 text-[7px] sm:text-[9px] font-mono">
                        #{history.length - index}
                      </span>
                      <div className="flex items-center gap-1">
                        {result === "up" && <span className="text-[#2ECC71] text-[8px] sm:text-[10px]">↑</span>}
                        {result === "down" && <span className="text-[#E74C6F] text-[8px] sm:text-[10px]">↓</span>}
                        {result === "same" && <span className="text-[#8AA3A8]/30 text-[8px] sm:text-[10px]">−</span>}
                        {isLatest && (
                          <span className="text-[#F5B041] text-[6px] sm:text-[8px] animate-pulse">●</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {entry.hand.map((tile, idx) => (
                        <div key={tile.instanceId} className="transform scale-75 sm:scale-90 origin-center">
                          <TileCard
                            tile={tile}
                            tileValues={tileValues}
                            size="sm"
                            index={idx}
                            isNew={isLatest && idx < 3}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 sm:mt-2 pt-1 border-t border-[#F5B041]/5 w-full justify-center">
                      <span className="text-[#8AA3A8]/30 text-[6px] sm:text-[8px]">Σ</span>
                      <span className={`
                        text-xs sm:text-sm font-bold
                        ${isLatest ? "text-[#F7DC6F]" : "text-[#8AA3A8]/60"}
                      `}>
                        {entry.total}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {displayHistory.length > 4 && (
            <div className="flex justify-center mt-0.5 sm:mt-1">
              <span className="text-[#8AA3A8]/20 text-[6px] sm:text-[8px] uppercase tracking-widest animate-pulse">
                ← scroll →
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}