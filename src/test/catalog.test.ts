import { describe, expect, it } from "vitest";
import { cartTotal, filterProducts, products, priceLabel } from "@/lib/catalog";

describe("Frontend shopping demo", () => {
  it("calculates local cart quantity totals without checkout", () => {
    expect(cartTotal({ kibble: 2, rope: 1 })).toBe(805000);
    expect(cartTotal({})).toBe(0);
  });
  it("filters by local favorites only", () => {
    expect(filterProducts(products, "", "favorites", ["rope"]).map((p) => p.id)).toEqual(["rope"]);
    expect(filterProducts(products, "", "favorites", [])).toEqual([]);
  });
  it("filters Persian names and categories together", () => {
    expect(filterProducts(products, "طنابی", "toy").map((p) => p.id)).toEqual(["rope"]);
    expect(filterProducts(products, "طنابی", "food")).toEqual([]);
  });
  it("uses the requested toman currency", () => {
    expect(priceLabel(95000)).toBe("۹۵٬۰۰۰ تومان");
  });
});
