import { Tile, TileDefinition, TileValues } from "./types";

const SUITS = ["bamboo", "dot", "character"] as const;
const WINDS = ["east", "south", "west", "north"] as const;
const DRAGONS = ["red", "green", "white"] as const;

let instanceCounter = 0;

export function buildTileDefinitions(): TileDefinition[] {
  const definitions: TileDefinition[] = [];

  for (const suit of SUITS) {
    for (let num = 1; num <= 9; num++) {
      definitions.push({
        key: `${suit}-${num}`,
        category: "number",
        label: `${num} ${suit}`,
        baseValue: num,
      });
    }
  }

  for (const wind of WINDS) {
    definitions.push({
      key: `wind-${wind}`,
      category: "wind",
      label: `${wind} wind`,
      baseValue: 5,
    });
  }

  for (const dragon of DRAGONS) {
    definitions.push({
      key: `dragon-${dragon}`,
      category: "dragon",
      label: `${dragon} dragon`,
      baseValue: 5,
    });
  }

  return definitions;
}

export function createFullDeck(): Tile[] {
  const definitions = buildTileDefinitions();
  const deck: Tile[] = [];
  definitions.forEach((def) => {
    for (let copy = 0; copy < 4; copy++) {
      deck.push({
        instanceId: `${def.key}-${copy}-${instanceCounter++}`,
        key: def.key,
        category: def.category,
        label: def.label,
      });
    }
  });
  return deck;
}

export function createInitialTileValues(): TileValues {
  const definitions = buildTileDefinitions();
  const values: TileValues = {};
  definitions.forEach((def) => {
    if (def.category !== "number") {
      values[def.key] = def.baseValue;
    }
  });
  return values;
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawTiles(
  deck: Tile[],
  count: number
): { drawn: Tile[]; remaining: Tile[] } {
  const safeCount = Math.min(count, deck.length);
  const drawn = deck.slice(0, safeCount);
  const remaining = deck.slice(safeCount);
  return { drawn, remaining };
}

export function validateDeck(deck: Tile[]): boolean {
  if (!Array.isArray(deck)) return false;
  if (deck.length === 0) return false;
  
  return deck.every(tile => 
    tile.instanceId && 
    tile.key && 
    tile.category && 
    tile.label
  );
}