import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trip } from '@/types/trip'

const trips: Trip[] = [
  {
    id: 1,
    photoUrl: "https://picsum.photos/780/380?random=1",
    title: "European Quest",
    subtitle: "Lorem ipsum dolor sit amet",
    countries: [
      "Norway",
      "Poland",
      "Germany",
    ],
    days: 21,
    co2kilograms: 4010.56,
    rating: 4.7,
    description: "Some descr.",
    advantages: [
      {
        title: "1st advantage",
        description: "Some advantage."
      },
      {
        title: "2nd advantage",
        description: "Some advantage."
      },
    ]
  },
];

export default function Home() {
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
