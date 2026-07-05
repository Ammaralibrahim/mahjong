import { Tile, TileValues, Hand } from "./types";

const NUMBER_TILE_VALUE_REGEX = /-(\d+)$/;

export function getTileCurrentValue(tile: Tile, tileValues: TileValues): number {
  if (tile.category === "number") {
    const match = tile.key.match(NUMBER_TILE_VALUE_REGEX);
    return match ? parseInt(match[1], 10) : 0;
  }
  return tileValues[tile.key] ?? 5;
}

export function calculateHandValue(hand: Tile[], tileValues: TileValues): number {
  return hand.reduce((sum, tile) => sum + getTileCurrentValue(tile, tileValues), 0);
}

export function updateTileValuesAfterHand(
  previousHand: Tile[],
  tileValues: TileValues,
  won: boolean
): TileValues {
  const updated = { ...tileValues };
  previousHand.forEach((tile) => {
    if (tile.category !== "number") {
      const current = updated[tile.key] ?? 5;
      const newValue = won ? current + 1 : current - 1;
      updated[tile.key] = Math.max(0, Math.min(10, newValue));
    }
  });
  return updated;
}

export function recalculateHistoryTotals(
  history: { hand: Hand; total: number }[],
  tileValues: TileValues
): { hand: Hand; total: number }[] {
  return history.map(entry => ({
    ...entry,
    total: calculateHandValue(entry.hand, tileValues)
  }));
}