"use client"

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { tripQueryOptions } from "@/lib/queries/trips";

type TripPageClientProps = {
  tripId: string;
};

export default function TripPageClient({ tripId }: TripPageClientProps) {
  const { data: trip, isLoading, isError } = useQuery(tripQueryOptions(tripId));

  if (isLoading) {
    return (
      <main className="bg-background text-foreground min-h-screen px-4 py-8">
        <section className="mx-auto max-w-6xl">
          <Link href="/" className="text-muted-foreground text-sm underline">
            Go back
          </Link>

          <p className="text-muted-foreground mt-8 text-sm">Loading trip...</p>
        </section>
      </main>
    );
  }

  if (isError || !trip) {
    return (
      <main className="bg-background text-foreground min-h-screen px-4 py-8">
        <section className="mx-auto max-w-6xl">
          <Link href="/" className="text-muted-foreground text-sm underline">
            Go back
          </Link>

          <p className="text-muted-foreground mt-8 text-sm">Trip not found.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-muted-foreground text-sm underline">
          Go back
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            {trip.title}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Trip details and useful travel information.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <img
              src={trip.photoUrl}
              alt={trip.title}
              className="aspect-video w-full rounded-2xl object-cover shadow-sm"
            />

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Overview</h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="font-medium">1st advantage</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec feugiat risus vitae dapibus venenatis.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">2nd advantage</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec feugiat risus vitae dapibus venenatis.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">3rd advantage</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec feugiat risus vitae dapibus venenatis.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">4th advantage</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec feugiat risus vitae dapibus venenatis.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="text-muted-foreground text-sm leading-7">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  feugiat risus vitae dapibus venenatis. Sed ac nisl ac nulla
                  aliquet commodo eget at dui.
                </p>
              </div>
            </section>
          </div>

          <aside className="bg-card rounded-2xl border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">{trip.days} days</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Emissions: {trip.co2kilograms} kg CO₂e
            </p>

            <div className="mt-6 border-t pt-5">
              <h3 className="text-sm font-semibold">Countries included:</h3>

              <ul className="text-muted-foreground mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {trip.countries.map((country) => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
