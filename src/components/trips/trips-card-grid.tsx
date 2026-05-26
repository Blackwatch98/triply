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
            className="flex aspect-square items-center justify-center bg-cover bg-center text-center text-white"
            style={{
              backgroundImage: `url(${trip.photoUrl})`,
            }}
          >
            <div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">
                  {trip.title}
                </CardTitle>

                <CardDescription className="text-white">
                  {trip.countries.length} countries, {trip.days} days
                </CardDescription>
              </CardHeader>

              <CardContent>
                <button>Learn more</button>
                <p>Emissions offset: {trip.co2kilograms} kg CO₂e</p>
                <p>Trip rating: {trip.rating}</p>
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
