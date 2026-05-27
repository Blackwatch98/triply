"use client";

import { Trip } from "@/types/trip";
import TripCard from "@/components/trips/trip-card";
import { useVisibleTripsCount } from "@/components/trips/hooks/use-visible-trips-count";

type TripsCardGridProps = {
  trips: Trip[];
};

export default function TripsCardGrid({ trips }: TripsCardGridProps) {
  const { visibleCount, loaderRef } = useVisibleTripsCount(trips.length);
  const visibleTrips = trips.slice(0, visibleCount);

  return (
    <>
      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </section>

      {visibleCount < trips.length && (
        <div
          ref={loaderRef}
          className="text-muted-foreground h-10 text-center text-sm"
        >
          Loading more trips...
        </div>
      )}
    </>
  );
}
