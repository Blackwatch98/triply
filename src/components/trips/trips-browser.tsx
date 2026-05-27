"use client";

import TripsTable from "@/components/trips/trips-table";
import TripsHeader from "@/components/trips/trips-header";
import TripsToolbar from "@/components/trips/trips-toolbar";
import TripsCardGrid from "@/components/trips/trips-card-grid";
import { Trip } from "@/types/trip";
import { TripsViewMode } from "@/types/trips-view-mode";
import { TripsSortBy, TripsSortOrder } from "@/types/trip-sort-by";
import { useState, useMemo } from "react";

type TripsBrowserProps = {
  trips: Trip[];
};

export default function TripsBrowser({ trips }: TripsBrowserProps) {
  const [viewMode, setViewMode] = useState<TripsViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<TripsSortBy>("default");
  const [sortOrder, setSortOrder] = useState<TripsSortOrder>("asc");

  const countries = useMemo(() => {
    return Array.from(new Set(trips.flatMap((trip) => trip.countries))).sort();
  }, [trips]);

  const visibleTrips = useMemo(() => {
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

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-6">
        <TripsHeader viewMode={viewMode} onViewModeChange={setViewMode} />

        <TripsToolbar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          countryFilter={countryFilter}
          onCountryFilterChange={setCountryFilter}
          countries={countries}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrderDirection={sortOrder}
          onSortOrderChange={setSortOrder}
        />

        {viewMode === "table" ? (
          <TripsTable trips={visibleTrips} />
        ) : (
          <TripsCardGrid trips={visibleTrips} />
        )}
      </section>
    </main>
  );
}
