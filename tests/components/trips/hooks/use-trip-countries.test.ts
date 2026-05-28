import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTripCountries } from "@/hooks/use-trip-countries";
import { Trip } from "@/types/trip";

const mockTrips: Trip[] = [
  {
    id: 1,
    photoUrl: "",
    title: "Trip A",
    subtitle: "",
    countries: ["Poland", "Germany"],
    days: 7,
    co2kilograms: 100,
    rating: 4,
    description: "",
    advantages: [],
  },
  {
    id: 2,
    photoUrl: "",
    title: "Trip B",
    subtitle: "",
    countries: ["Norway", "Poland"],
    days: 10,
    co2kilograms: 200,
    rating: 3,
    description: "",
    advantages: [],
  },
];

describe("useTripCountries", () => {
  it("returns unique countries sorted alphabetically", () => {
    const { result } = renderHook(() => useTripCountries(mockTrips));

    expect(result.current).toEqual(["Germany", "Norway", "Poland"]);
  });

  it("returns an empty list when there are no trips", () => {
    const { result } = renderHook(() => useTripCountries([]));

    expect(result.current).toEqual([]);
  });
});
