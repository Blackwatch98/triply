import { queryOptions } from "@tanstack/react-query";
import { getTripById, getTrips } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export const tripsQueryOptions = queryOptions({
  queryKey: queryKeys.trips,
  queryFn: getTrips,
  staleTime: 1000 * 60 * 5,
});

export const tripQueryOptions = (id: number) =>
  queryOptions({
    queryKey: queryKeys.trip(id),
    queryFn: () => getTripById(id),
    staleTime: 1000 * 60 * 5,
  });
