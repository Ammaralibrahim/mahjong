import { describe, it, expect } from "vitest";
import { updateTileValuesAfterHand, calculateHandValue } from "../valuation";
import { Tile } from "../types";

const redDragon: Tile = {
  instanceId: "1",
  key: "dragon-red",
  category: "dragon",
  label: "red dragon",
};

describe("updateTileValuesAfterHand", () => {
  it("kazanan elde dragon değeri 1 artar", () => {
    const result = updateTileValuesAfterHand([redDragon], { "dragon-red": 5 }, true);
    expect(result["dragon-red"]).toBe(6);
  });

  it("kaybeden elde dragon değeri 1 azalır", () => {
    const result = updateTileValuesAfterHand([redDragon], { "dragon-red": 5 }, false);
    expect(result["dragon-red"]).toBe(4);
  });

  it("diğer taşların değeri etkilenmez", () => {
    const result = updateTileValuesAfterHand(
      [redDragon],
      { "dragon-red": 5, "dragon-green": 5 },
      true
    );
    expect(result["dragon-green"]).toBe(5);
  });
});

describe("calculateHandValue", () => {
  it("sayı taşı + dragon değerini doğru toplar", () => {
    const bamboo7: Tile = {
      instanceId: "2",
      key: "bamboo-7",
      category: "number",
      label: "7 bamboo",
    };
    const total = calculateHandValue([bamboo7, redDragon], { "dragon-red": 5 });
    expect(total).toBe(12);
  });
});