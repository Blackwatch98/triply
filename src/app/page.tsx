import TripsBrowser from "@/components/trips-browser";

export default async function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <TripsBrowser />
    </main>
  );
}
