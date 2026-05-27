"use client";

import { Trip } from "@/types/trip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type TripsCardGridProps = {
  trips: Trip[];
};

const ITEMS_PER_PAGE = 3;
const MAX_RATING = 5;

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
            className="overflow-hidden rounded-2xl bg-white p-3 shadow-md"
          >
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-cover bg-center px-6 pt-6 pb-16 text-center text-white"
              style={{
                backgroundImage: `url(${trip.photoUrl})`,
              }}
            >
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 flex w-full max-w-65 flex-col items-center">
                <CardHeader className="w-full p-0 text-center">
                  <CardTitle className="line-clamp-2 text-xl leading-tight font-semibold drop-shadow-sm">
                    {trip.title}
                  </CardTitle>

                  <CardDescription className="mt-2 text-xs font-semibold text-white/90">
                    {trip.countries.length} countries, {trip.days} days
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-5 flex w-full flex-col items-center gap-4 p-0">
                  <Link
                    href={`/trips/${trip.id}`}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2.5 text-xs font-semibold shadow-sm transition-colors"
                  >
                    Learn more
                  </Link>

                  <div className="flex w-full items-center justify-between rounded-lg bg-slate-950/85 px-4 py-4 text-xs font-semibold shadow-sm backdrop-blur-sm">
                    <span>Emissions offset:</span>
                    <span>{trip.co2kilograms} kg CO₂e</span>
                  </div>
                </CardContent>
              </div>
            </div>

            <div className="text-foreground relative z-20 mx-6 -mt-15 flex items-center justify-between rounded-t-xl bg-white px-4 py-3 text-sm font-semibold">
              <span>Trip rating</span>

              <span className="flex items-center gap-1">
                {Array.from({ length: MAX_RATING }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 stroke-0 ${
                      index < Math.round(trip.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}

                <span className="ml-1">{trip.rating}</span>
              </span>
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
