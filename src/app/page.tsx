import TripsBrowser from "@/components/trips/trips-browser";
import { getTrips } from "@/lib/api";

export default async function Home() {
  const trips = await getTrips();

  return <TripsBrowser trips={trips} />
}
