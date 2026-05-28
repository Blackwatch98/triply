"use client";

import TripsTable from "@/components/trips-table";
import TripsHeader from "@/components/trips-header";
import TripsToolbar from "@/components/trips-toolbar";
import TripsCardGrid from "@/components/trips-card-grid";
import { TripsViewMode } from "@/types/trips-view-mode";
import { TripsSortBy, TripsSortOrder } from "@/types/trip-sort-by";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { tripsQueryOptions } from "@/lib/queries/trips";
import { useTripCountries } from "@/hooks/use-trip-countries";
import { useVisibleTrips } from "@/hooks/use-visible-trips";

export default function TripsBrowser() {
  const [viewMode, setViewMode] = useState<TripsViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<TripsSortBy>("default");
  const [sortOrder, setSortOrder] = useState<TripsSortOrder>("asc");

  const { data: trips = [], isLoading, isError } = useQuery(tripsQueryOptions);

  const countries = useTripCountries(trips);

  const visibleTrips = useVisibleTrips({
    trips,
    searchQuery,
    countryFilter,
    sortBy,
    sortOrder,
  });

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
