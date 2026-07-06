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
    <div className="relative group w-full sm:w-auto flex justify-center">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#F5B041] to-[#F7DC6F] rounded-2xl blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
      <Button
        onClick={handleClick}
        size="lg"
        className="relative text-lg sm:text-xl px-6 sm:px-1 py-4 sm:py-5 w-full sm:min-w-[240px] max-w-xs sm:max-w-none shadow-2xl"
      >
       Start New Game
      </Button>
    </div>
  );
}