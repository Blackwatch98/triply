"use client";

import Link from "next/link";
import { Flag, Earth, Folder, Users, type LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tripQueryOptions } from "@/lib/queries/trips";
import Image from "next/image";

type TripPageClientProps = {
  tripId: string;
};

const advantageIcons: LucideIcon[] = [Flag, Earth, Folder, Users];

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
          <p className="text-muted-foreground mt-2 text-sm">{trip.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <Image
              src={trip.photoUrl}
              alt={trip.title}
              className="aspect-video w-full rounded-2xl object-cover shadow-sm"
            />

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Overview</h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {trip.advantages.map((advantage, index) => {
                  const Icon = advantageIcons[index % advantageIcons.length];

                  return (
                    <div key={advantage.title} className="flex gap-3">
                      <Icon className="text-foreground mt-1 size-5 shrink-0" />
                      <div>
                        <h3 className="font-medium">{advantage.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm leading-6">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="text-muted-foreground text-sm leading-7">
                  {trip.description}
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

              <ul className="text-muted-foreground mt-3 grid list-disc grid-cols-2 gap-x-6 gap-y-2 pl-5 text-sm">
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
