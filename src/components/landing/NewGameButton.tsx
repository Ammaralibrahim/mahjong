"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { useGameStore } from "@/store/gameStore";

export function NewGameButton() {
  const router = useRouter();
  const startNewGame = useGameStore((state) => state.startNewGame);

  const handleClick = () => {
    startNewGame();
    router.push("/game");
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] rounded-2xl blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
      <Button
        onClick={handleClick}
        size="lg"
        className="relative text-xl px-10 py-5 min-w-[240px] shadow-2xl"
      >
        ✨ Start New Game
      </Button>
    </div>
  );
}