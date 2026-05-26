export default function TripsToolbar() {
  return (
    <section className="bg-card rounded-2xl border p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <div>
          <label
            htmlFor="search"
            className="text-muted-foreground mb-1.5 block text-xs font-medium"
          >
            Search
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search by trip title..."
            disabled
            className="bg-background text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="text-muted-foreground mb-1.5 block text-xs font-medium"
          >
            Filter
          </label>
          <select
            id="country"
            disabled
            className="bg-background text-foreground h-10 w-full rounded-xl border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option>All countries</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="text-muted-foreground mb-1.5 block text-xs font-medium"
          >
            Sort by
          </label>
          <select
            id="sort"
            disabled
            className="bg-background text-foreground h-10 w-full rounded-xl border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option>Default</option>
            <option>Rating</option>
            <option>Days</option>
            <option>CO₂</option>
          </select>
        </div>
      </div>
    </section>
  );
}
