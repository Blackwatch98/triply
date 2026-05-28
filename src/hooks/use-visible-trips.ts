import { useMemo } from "react";
import { Trip } from "@/types/trip";
import { TripsSortBy, TripsSortOrder } from "@/types/trip-sort-by";

type UseVisibleTripsArgs = {
  trips: Trip[];
  searchQuery: string;
  countryFilter: string;
  sortBy: TripsSortBy;
  sortOrder: TripsSortOrder;
};

export function useVisibleTrips({
  trips,
  searchQuery,
  countryFilter,
  sortBy,
  sortOrder,
}: UseVisibleTripsArgs) {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filteredTrips = trips.filter((trip) => {
      const matchesSearch = trip.title.toLowerCase().includes(query);

      const matchesCountry =
        countryFilter === "all" || trip.countries.includes(countryFilter);

      return matchesSearch && matchesCountry;
    });

    if (sortBy === "default") {
      return filteredTrips;
    }

    return [...filteredTrips].sort((a, b) => {
      const direction = sortOrder === "asc" ? 1 : -1;

      if (sortBy === "rating") {
        return (a.rating - b.rating) * direction;
      }

      if (sortBy === "days") {
        return (a.days - b.days) * direction;
      }

      if (sortBy === "co2") {
        return (a.co2kilograms - b.co2kilograms) * direction;
      }

      return 0;
    });
  }, [trips, searchQuery, countryFilter, sortBy, sortOrder]);
}
