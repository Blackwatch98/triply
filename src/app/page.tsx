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
    <main>
      <h1>Trips</h1>

      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Countries</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>CO₂</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.title}</TableCell>
                <TableCell>{trip.countries.length}</TableCell>
                <TableCell>{trip.days}</TableCell>
                <TableCell>{trip.co2kilograms}</TableCell>
                <TableCell>{trip.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
