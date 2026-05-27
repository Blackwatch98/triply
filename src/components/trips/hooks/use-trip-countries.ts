import { useMemo } from "react";
import { Trip } from "@/types/trip";

export function useTripCountries(trips: Trip[]) {
  return useMemo(() => {
    return Array.from(new Set(trips.flatMap((trip) => trip.countries))).sort();
  }, [trips]);
}
