import TripPageClient from "./trip-page-client";

type TripPageProps = {
  params: Promise<{
    tripId: string;
  }>;
};

export default async function TripPage({ params }: TripPageProps) {
  const { tripId } = await params;

  return <TripPageClient tripId={tripId} />;
}
