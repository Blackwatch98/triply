"use client"

import TripsTable from "@/components/trips/trips-table";
import TripsHeader from "@/components/trips/trips-header";
import TripsToolbar from "@/components/trips/trips-toolbar";
import TripsCardGrid from "@/components/trips/trips-card-grid";
import { Trip } from "@/types/trip";
import { TripsViewMode } from "@/types/trips-view-mode";
import { useState } from "react";

type TripsBrowserProps = {
  trips: Trip[];
};

export default function TripsBrowser({ trips }: TripsBrowserProps) {
  const [viewMode, setViewMode] = useState<TripsViewMode>("table");

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-6">
        <TripsHeader viewMode={viewMode} onViewModeChange={setViewMode}/>

        <TripsToolbar />

        {viewMode === "table" ? (
          <TripsTable trips={trips} />
        ) : (
          <TripsCardGrid trips={trips} />
        )}
      </section>
    </main>
  );
}
