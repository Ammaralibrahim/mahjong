"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  onClick,
  variant = "gold",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "relative rounded-xl font-semibold tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden touch-manipulation";

  const sizeClasses = {
    sm: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm",
    md: "px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base",
    lg: "px-5 sm:px-8 py-2.5 sm:py-4 text-base sm:text-lg",
  };

  const variants = {
    gold: "bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] text-[#0A1215] hover:shadow-lg hover:shadow-[#F5B041]/30 active:scale-[0.98]",
    outline: "border-2 border-[#F5B041] text-[#F5B041] hover:bg-[#F5B041]/10 active:scale-[0.98]",
    ghost: "text-[#8AA3A8] hover:text-[#F5B041] hover:bg-[#F5B041]/5",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 300,
        duration: 0.15 
      }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizeClasses[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}