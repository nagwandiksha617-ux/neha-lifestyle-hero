import { describe, expect, test } from "bun:test";
import { formatPrice, travelGymBagInfo } from "./travel-gym-bags";

const byColor = (color: string) => travelGymBagInfo.find((b) => b.color === color)!;

describe("Travel & Gym Bags", () => {
  test("all three bags sell at ₹799", () => {
    expect(travelGymBagInfo.map((b) => b.price)).toEqual([799, 799, 799]);
    expect(formatPrice(799)).toBe("₹799");
  });

  test("Black and Brown carry the confirmed supplier specifications", () => {
    for (const color of ["Black", "Brown"]) {
      const specs = byColor(color).specs!;
      expect(specs.material).toBe("Synthetic Leather");
      expect(specs.dimensions).toBe("18 × 9 × 8 inches (L × W × H)");
      expect(specs.weight).toBe("450 g");
      expect(specs.compartments).toBe(3);
    }
  });

  test("Blue has no specifications until they are confirmed", () => {
    expect(byColor("Blue").specs).toBeUndefined();
    expect(byColor("Blue").description).not.toMatch(/synthetic|450|waterproof|handmade/i);
  });
});
