"use client";

import { Trip } from "@/types/trip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

type TripsCardGridProps = {
  trips: Trip[];
};

const ITEMS_PER_PAGE = 3;

export default function TripsCardGrid({ trips }: TripsCardGridProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleTrips = trips.slice(0, visibleCount);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  function loadMoreTrips() {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + ITEMS_PER_PAGE, trips.length)
    );
  }

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting) {
          loadMoreTrips();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, trips.length]);

  return (
    <>
      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTrips.map((trip) => (
          <Card
            key={trip.id}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center text-white"
            style={{
              backgroundImage: `url(${trip.photoUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <CardHeader className="w-full max-w-65 p-0 text-center">
                <CardTitle className="line-clamp-2 text-2xl leading-tight font-semibold drop-shadow-sm">
                  {trip.title}
                </CardTitle>

                <CardDescription className="mt-2 text-sm font-medium text-white/90">
                  {trip.countries.length} countries, {trip.days} days
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-4 flex w-full flex-col items-center gap-3 p-0">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors">
                  Learn more
                </button>

                <div className="w-full rounded-lg bg-black/55 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm">
                  Emissions offset: {trip.co2kilograms} kg CO₂e
                </div>

                <div className="text-foreground flex w-full items-center justify-between rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-sm">
                  <span>Trip rating</span>
                  <span>{trip.rating}</span>
                </div>
              </CardContent>
            </div>
          </Card>
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
