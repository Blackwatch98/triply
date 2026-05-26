export default function TripsHeader() {
  return (
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
  );
}
