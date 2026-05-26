import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTrips } from "@/lib/api";

export default async function Home() {
  const trips = await getTrips();

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight">
              Trips
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
              Browse available trips and compare destination, duration, CO₂
              footprint and rating.
            </p>
          </div>

          <div className="bg-card grid w-full grid-cols-2 rounded-3xl border p-1 shadow-sm sm:w-fit">
            <button className="bg-primary text-primary-foreground flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors sm:min-w-24">
              Table
            </button>

            <button
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-24"
              disabled
            >
              Cards
            </button>
          </div>
        </header> 

        <section className="bg-card overflow-hidden rounded-2xl border shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60">
                  <TableHead className="text-muted-foreground h-11 px-5 text-xs font-semibold tracking-wide uppercase">
                    Title
                  </TableHead>
                  <TableHead className="text-muted-foreground h-11 text-xs font-semibold tracking-wide uppercase">
                    Countries
                  </TableHead>
                  <TableHead className="text-muted-foreground h-11 text-xs font-semibold tracking-wide uppercase">
                    Days
                  </TableHead>
                  <TableHead className="text-muted-foreground h-11 text-xs font-semibold tracking-wide uppercase">
                    CO₂
                  </TableHead>
                  <TableHead className="text-muted-foreground h-11 pr-5 text-right text-xs font-semibold tracking-wide uppercase">
                    Rating
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {trips.map((trip) => (
                  <TableRow
                    key={trip.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-card-foreground font-medium">
                          {trip.title}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {trip.days} day trip
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground py-4 text-sm">
                      {trip.countries.length}
                    </TableCell>

                    <TableCell className="text-muted-foreground py-4 text-sm">
                      {trip.days}
                    </TableCell>

                    <TableCell className="text-muted-foreground py-4 text-sm">
                      {trip.co2kilograms} kg
                    </TableCell>

                    <TableCell className="py-4 pr-5 text-right text-sm font-medium">
                      {trip.rating}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </section>
    </main>
  );
}
