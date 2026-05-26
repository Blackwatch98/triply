import { getTrips } from "@/lib/api";
import TripsTable from "@/components/trips/trips-table";
import TripsHeader from "@/components/trips/trips-header";
import TripsToolbar from "@/components/trips/trips-toolbar";

export default async function Home() {
  const trips = await getTrips();

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-6">
        <TripsHeader />

        <TripsToolbar />

        <TripsTable trips={trips} />
      </section>
    </main>
  );
}
