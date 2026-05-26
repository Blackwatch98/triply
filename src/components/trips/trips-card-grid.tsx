import { Trip } from "@/types/trip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TripsCardGridProps = {
  trips: Trip[];
};

export default function TripsCardGrid({ trips }: TripsCardGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trips.map((trip) => (
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
  );
}
