import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useVisibleTrips } from "@/hooks/use-visible-trips";
import { Trip } from "@/types/trip";

const mockTrips: Trip[] = [
  {
    id: 1,
    photoUrl: "",
    title: "European Quest",
    subtitle: "",
    countries: ["Poland", "Germany"],
    days: 21,
    co2kilograms: 4000,
    rating: 4.7,
    description: "",
    advantages: [],
  },
  {
    id: 2,
    photoUrl: "",
    title: "Autumn Roadtrip",
    subtitle: "",
    countries: ["Norway", "Finland"],
    days: 7,
    co2kilograms: 1500,
    rating: 3.5,
    description: "",
    advantages: [],
  },
  {
    id: 3,
    photoUrl: "",
    title: "Diving adventure in Egypt",
    subtitle: "",
    countries: ["Egypt"],
    days: 14,
    co2kilograms: 800,
    rating: 5,
    description: "",
    advantages: [],
  },
];

describe("useVisibleTrips", () => {
  it("returns all trips when search and country filters are empty", () => {
    const { result } = renderHook(() =>
      useVisibleTrips({
        trips: mockTrips,
        searchQuery: "",
        countryFilter: "all",
        sortBy: "default",
        sortOrder: "asc",
      })
    );

    expect(result.current.map((trip) => trip.id)).toEqual([1, 2, 3]);
  });

  it("filters trips by title search", () => {
    const { result } = renderHook(() =>
      useVisibleTrips({
        trips: mockTrips,
        searchQuery: "roadtrip",
        countryFilter: "all",
        sortBy: "default",
        sortOrder: "asc",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.title).toBe("Autumn Roadtrip");
  });

  it("filters trips by country", () => {
    const { result } = renderHook(() =>
      useVisibleTrips({
        trips: mockTrips,
        searchQuery: "",
        countryFilter: "Egypt",
        sortBy: "default",
        sortOrder: "asc",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.countries).toContain("Egypt");
  });

  it("sorts trips by rating descending", () => {
    const { result } = renderHook(() =>
      useVisibleTrips({
        trips: mockTrips,
        searchQuery: "",
        countryFilter: "all",
        sortBy: "rating",
        sortOrder: "desc",
      })
    );

    expect(result.current.map((trip) => trip.rating)).toEqual([5, 4.7, 3.5]);
  });

  it("sorts trips by days ascending", () => {
    const { result } = renderHook(() =>
      useVisibleTrips({
        trips: mockTrips,
        searchQuery: "",
        countryFilter: "all",
        sortBy: "days",
        sortOrder: "asc",
      })
    );

    expect(result.current.map((trip) => trip.days)).toEqual([7, 14, 21]);
  });
});
