"use client";

import TripsTable from "@/components/trips/trips-table";
import TripsHeader from "@/components/trips/trips-header";
import TripsToolbar from "@/components/trips/trips-toolbar";
import TripsCardGrid from "@/components/trips/trips-card-grid";
import { TripsViewMode } from "@/types/trips-view-mode";
import { TripsSortBy, TripsSortOrder } from "@/types/trip-sort-by";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { tripsQueryOptions } from "@/lib/queries/trips";

export default function TripsBrowser() {
  const [viewMode, setViewMode] = useState<TripsViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<TripsSortBy>("default");
  const [sortOrder, setSortOrder] = useState<TripsSortOrder>("asc");

  const { data: trips = [], isLoading, isError } = useQuery(tripsQueryOptions);

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

  const content = (() => {
    if (isLoading) {
      return (
        <section className="bg-card rounded-2xl border p-6 shadow-sm">
          <p className="text-muted-foreground text-sm">Loading trips...</p>
        </section>
      );
    }

    if (isError) {
      return (
        <section className="bg-card rounded-2xl border p-6 shadow-sm">
          <p className="text-destructive text-sm">Failed to load trips.</p>
        </section>
      );
    }

    if (visibleTrips.length === 0) {
      return (
        <section className="bg-card rounded-2xl border p-6 shadow-sm">
          <p className="text-muted-foreground text-sm">
            No trips match your filters.
          </p>
        </section>
      );
    }

    return viewMode === "table" ? (
      <TripsTable trips={visibleTrips} />
    ) : (
      <TripsCardGrid trips={visibleTrips} />
    );
  })();

  return (
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

      {content}
    </section>
  );
}
