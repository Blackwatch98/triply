import type { Trip } from "@/types/trip";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export function getTrips(): Promise<Trip[]> {
  return apiFetch<Trip[]>("/trips");
}

export function getTripById(id: string): Promise<Trip> {
  return apiFetch<Trip>(`/trips/${id}`);
}
