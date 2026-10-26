/// <reference types="bun" />
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

  test("exactly three bags: Blue, Black, Brown", () => {
    expect(travelGymBagInfo.map((b) => b.color)).toEqual(["Blue", "Black", "Brown"]);
  });

  test("Black description matches the supplied wording", () => {
    expect(byColor("Black").description).toBe(
      "A black synthetic leather duffel bag for gym sessions and travel. It features three compartments, a handmade finish, and dimensions of 18 × 9 × 8 inches. Weight: 450 g. Waterproofing is stated by the supplier.",
    );
  });
});

describe("Delivery", () => {
  test("estimate is 5–7 days and is not presented as a guarantee", async () => {
    const { deliveryEstimate, deliveryEstimateLabel } = await import("./travel-gym-bags");
    expect(deliveryEstimate).toEqual({ minDays: 5, maxDays: 7 });
    expect(deliveryEstimateLabel).toContain("5–7 days");
    expect(deliveryEstimateLabel).toMatch(/not a guaranteed/i);
  });
});
