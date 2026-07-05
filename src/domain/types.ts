export type TileCategory = "number" | "dragon" | "wind";

export type TileDefinition = {
  key: string;
  category: TileCategory;
  label: string;
  baseValue: number;
};

export type Tile = {
  instanceId: string;
  key: string;
  category: TileCategory;
  label: string;
};

export type TileValues = Record<string, number>;

export type Hand = Tile[];