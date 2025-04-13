import { getColorForRoute } from "./utils";

describe("getColorForRoute", () => {
  it("Given that the route is the same, should return the same color", () => {
    const color1 = getColorForRoute("JFK", "LAX");
    const color2 = getColorForRoute("JFK", "LAX");

    expect(color1).toBe(color2);
  });

  it("Given that the route is differet, should return different colors", () => {
    const color1 = getColorForRoute("JFK", "LAX");
    const color2 = getColorForRoute("ORD", "ATL");

    expect(color1).not.toBe(color2);
  });
});