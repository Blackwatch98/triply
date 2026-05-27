export const queryKeys = {
  trips: ["trips"] as const,
  trip: (id: number) => ["trips", id] as const,
};
