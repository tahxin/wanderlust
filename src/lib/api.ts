export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  createdAt?: string;
}

export interface CreateDestinationInput {
  name: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

export interface Booking {
  _id: string;
  destinationId?: string;
  destinationName: string;
  departureDate: string;
  price: number;
  imageUrl: string;
  bookingId: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

// Fetch all destinations with optional filter parameters
export async function fetchDestinations(options?: {
  category?: string;
  search?: string;
  sort?: string;
}): Promise<Destination[]> {
  try {
    const params = new URLSearchParams();
    if (options?.category && options.category !== "All") {
      params.set("category", options.category);
    }
    if (options?.search) {
      params.set("search", options.search);
    }
    if (options?.sort) {
      params.set("sort", options.sort);
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/destinations${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("fetchDestinations error:", error);
    return [];
  }
}

// Fetch single destination by id
export async function fetchDestinationById(id: string): Promise<Destination | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`fetchDestinationById(${id}) error:`, error);
    return null;
  }
}

// Create a new travel package
export async function createDestination(
  input: CreateDestinationInput
): Promise<{ success: boolean; data?: Destination; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/destinations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to create travel package." };
    }

    return { success: true, data: data.data };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Network error connecting to backend.";
    return { success: false, error: message };
  }
}

// Delete a travel package
export async function deleteDestination(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to delete destination." };
    }
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Network error";
    return { success: false, error: message };
  }
}
