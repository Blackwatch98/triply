import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Trip } from "@/types/trip";

type TripsTableProps = {
  trips: Trip[];
};

export default function TripsTable({ trips }: TripsTableProps) {
  return (
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

              <TableHead className="text-muted-foreground h-11 pr-5 text-right text-xs font-semibold tracking-wide uppercase" />
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

                <TableCell className="py-4 pr-5 text-right text-sm font-medium">
                  <Link
                    href={`/trips/${trip.id}`}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2.5 text-xs font-semibold shadow-sm transition-colors"
                  >
                    Learn more
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
