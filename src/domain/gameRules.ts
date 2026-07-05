import { TileValues } from "./types";

export type BetDirection = "higher" | "lower";

export function resolveBet(
  previousTotal: number,
  newTotal: number,
  bet: BetDirection
): boolean {
  if (newTotal === previousTotal) return false;
  const actualDirection: BetDirection = newTotal > previousTotal ? "higher" : "lower";
  return actualDirection === bet;
}

export function checkTileLimitReached(tileValues: TileValues): boolean {
  return Object.values(tileValues).some((value) => value === 0 || value === 10);
}

export function checkDepletionLimitReached(depletionCount: number): boolean {
  return depletionCount >= 3;
}

export function checkGameOver(
  tileValues: TileValues,
  depletionCount: number
): boolean {
  if (checkTileLimitReached(tileValues)) {
    return true;
  }
  if (checkDepletionLimitReached(depletionCount)) {
    return true;
  }
  return false;
}

export function isValidBet(
  previousTotal: number,
  newTotal: number,
  bet: BetDirection
): boolean {
  if (newTotal === previousTotal) return false;
  const actualDirection = newTotal > previousTotal ? "higher" : "lower";
  return actualDirection === bet;
}