"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Tile, TileValues } from "@/domain/types";
import { getTileCurrentValue } from "@/domain/valuation";
import { TileIcon, TileIconSize } from "./TileIcons";
import { useState } from "react";

type TileCardProps = {
  tile: Tile;
  tileValues: TileValues;
  size?: TileIconSize;
  index?: number;
  isNew?: boolean;
};

export function TileCard({
  tile,
  tileValues,
  size = "md",
  index = 0,
  isNew = false,
}: TileCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const value = getTileCurrentValue(tile, tileValues);
  const rotation = index * 1.5 - 4.5;

  const paddingClasses: Record<TileIconSize, string> = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  const isDanger = 
    tile.category !== "number" && 
    (value <= 1 || value >= 9);

  const showValue = tile.category !== "number" && size !== "sm";

  const getValueColor = (val: number) => {
    if (val <= 1 || val >= 9) return "text-[#E74C6F] bg-[#E74C6F]/20";
    if (val <= 3 || val >= 7) return "text-[#F5B041] bg-[#F5B041]/15";
    return "text-[#2ECC71] bg-[#2ECC71]/15";
  };

  const getTileEmoji = () => {
    if (tile.category === "dragon") return "🐉";
    if (tile.category === "wind") return "🌬️";
    return "🎴";
  };

  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0, scale: 0.8, y: 20 }}
      animate={{ rotateY: 0, opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 200,
        delay: index * 0.06,
        duration: 0.5,
      }}
      whileHover={{
        y: -6,
        scale: 1.04,
        rotate: 0,
        transition: { duration: 0.15 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotate(${rotation}deg)`,
      }}
      className={`
        relative flex flex-col items-center
        ${paddingClasses[size]}
        rounded-xl
        transition-all duration-200
        ${isDanger ? "ring-2 ring-[#E74C6F]/40 ring-offset-2 ring-offset-transparent" : ""}
        ${showValue ? "cursor-help" : ""}
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-black/10 pointer-events-none" />

      <TileIcon tile={tile} size={size} />

      {showValue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", damping: 15 }}
          className={`
            mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold
            ${getValueColor(value)}
            border border-[#F5B041]/10
            shadow-sm
          `}
        >
          <span className="flex items-center gap-1">
            <span className="text-[8px] opacity-50">{getTileEmoji()}</span>
            {value}
          </span>
        </motion.div>
      )}

      {showTooltip && showValue && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute z-50 -top-14 left-1/2 -translate-x-1/2
                     bg-[#0A1215] text-white px-3 py-2 rounded-lg
                     text-xs whitespace-nowrap border border-[#F5B041]/20
                     shadow-xl shadow-black/30"
        >
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[#8AA3A8] text-[10px]">Value:</span>
              <span className={`font-bold text-sm ${isDanger ? "text-[#E74C6F]" : "text-[#F5B041]"}`}>
                {value}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[8px] text-[#8AA3A8]/60">
              <span>{tile.label}</span>
              <span className="w-px h-3 bg-[#F5B041]/20" />
              <span>ID: {tile.key}</span>
            </div>
            {isDanger && (
              <div className="text-[8px] text-[#E74C6F] animate-pulse mt-0.5">
                ⚠️ Critical value!
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2
                          w-2 h-2 bg-[#0A1215] rotate-45 border-r border-b border-[#F5B041]/20" />
        </motion.div>
      )}

      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.3 }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#F5B041] rounded-full shadow-md flex items-center justify-center"
        >
          <span className="text-[8px] text-[#0A1215] font-bold">✦</span>
        </motion.div>
      )}

      {isDanger && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-1 -left-1"
        >
          <div className="w-2.5 h-2.5 bg-[#E74C6F] rounded-full animate-pulse" />
        </motion.div>
      )}
    </motion.div>
  );
}