import { TripsSortBy, TripsSortOrder } from "@/types/trip-sort-by";

type TripsToolbarProps = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  countryFilter: string;
  onCountryFilterChange: (value: string) => void;
  countries: string[];
  sortBy: TripsSortBy;
  onSortByChange: (value: TripsSortBy) => void;
  sortOrderDirection: TripsSortOrder;
  onSortOrderChange: (value: TripsSortOrder) => void;
};

export default function TripsToolbar({
  searchQuery,
  onSearchQueryChange,
  countryFilter,
  onCountryFilterChange,
  countries,
  sortBy,
  onSortByChange,
  sortOrderDirection,
  onSortOrderChange,
}: TripsToolbarProps) {
  return (
    <section className="bg-card rounded-2xl border p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_180px]">
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
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Search by trip title..."
            className="bg-background text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border px-3 text-sm"
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
            value={countryFilter}
            onChange={(event) => onCountryFilterChange(event.target.value)}
            className="bg-background text-foreground h-10 w-full rounded-xl border px-3 text-sm"
          >
            <option value="all">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
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
            value={sortBy}
            onChange={(event) =>
              onSortByChange(event.target.value as TripsSortBy)
            }
            className="bg-background text-foreground h-10 w-full rounded-xl border px-3 text-sm"
          >
            <option value="default">Default</option>
            <option value="rating">Rating</option>
            <option value="days">Days</option>
            <option value="co2">CO₂</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sortOrder"
            className="text-muted-foreground mb-1.5 block text-xs font-medium"
          >
            Direction
          </label>
          <select
            id="sortOrder"
            value={sortOrderDirection}
            onChange={(event) =>
              onSortOrderChange(event.target.value as TripsSortOrder)
            }
            disabled={sortBy === "default"}
            className="bg-background text-foreground h-10 w-full rounded-xl border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </section>
  );
}
