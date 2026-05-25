import type { Trip } from "@/types/trip";

const API_URL = "http://localhost:3001";

export async function getTrips(): Promise<Trip[]> {
    const response = await fetch(`${API_URL}/trips`)

    if(!response.ok) {
        throw new Error("Failed to fetch trips");
    }

    return response.json();
}

export async function getTripById(id: string): Promise<Trip> {
  const response = await fetch(`${API_URL}/trips/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch trip");
  }

  return response.json();
}