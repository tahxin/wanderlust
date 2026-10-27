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

export async function fetchDestinations(options?: {
  category?: string;
  search?: string;
  sort?: string;
}): Promise<Destination[]> {
  const queryDesc = options ? JSON.stringify(options) : "none";
  console.log(`🚀 [FRONTEND -> BACKEND] GET /destinations | Filters: ${queryDesc}`);

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

    const startTime = performance.now();
    const res = await fetch(url, {
      cache: "no-store",
    });

    const elapsed = Math.round(performance.now() - startTime);

    if (!res.ok) {
      console.error(
        `❌ [BACKEND -> FRONTEND] Error ${res.status} (${res.statusText}) from ${url} in ${elapsed}ms`
      );
      throw new Error(`Failed to fetch destinations: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(
      `📥 [BACKEND -> FRONTEND] Received ${data.count ?? data.data?.length ?? 0} destinations in ${elapsed}ms:`,
      data.data
    );

    return data.data || [];
  } catch (error) {
    console.error("❌ [FRONTEND ERROR] fetchDestinations failed:", error);
    return [];
  }
}

export async function fetchDestinationById(id: string): Promise<Destination | null> {
  console.log(`🚀 [FRONTEND -> BACKEND] GET /destinations/${id}`);
  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      cache: "no-store",
    });
    const elapsed = Math.round(performance.now() - startTime);

    if (!res.ok) {
      console.warn(`⚠️ [BACKEND -> FRONTEND] Destination ${id} not found (${res.status}) in ${elapsed}ms`);
      return null;
    }
    const data = await res.json();
    console.log(`📥 [BACKEND -> FRONTEND] Received destination ${id} in ${elapsed}ms:`, data.data);
    return data.data || null;
  } catch (error) {
    console.error(`❌ [FRONTEND ERROR] fetchDestinationById(${id}):`, error);
    return null;
  }
}

export async function createDestination(
  input: CreateDestinationInput
): Promise<{ success: boolean; data?: Destination; error?: string }> {
  console.log("🚀 [FRONTEND -> BACKEND] POST /destinations | Sending payload:", input);

  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/destinations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const elapsed = Math.round(performance.now() - startTime);
    const data = await res.json();

    if (!res.ok) {
      console.error(
        `❌ [BACKEND -> FRONTEND] Failed to create destination (${res.status}) in ${elapsed}ms:`,
        data
      );
      return { success: false, error: data.error || "Failed to create travel package." };
    }

    console.log(
      `✅ [BACKEND -> FRONTEND] Destination created successfully in ${elapsed}ms:`,
      data.data
    );

    return { success: true, data: data.data };
  } catch (error: unknown) {
    console.error("❌ [FRONTEND ERROR] createDestination network exception:", error);
    const message =
      error instanceof Error ? error.message : "Network error connecting to backend.";
    return { success: false, error: message };
  }
}

export async function deleteDestination(
  id: string
): Promise<{ success: boolean; error?: string }> {
  console.log(`🚀 [FRONTEND -> BACKEND] DELETE /destinations/${id}`);

  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: "DELETE",
    });
    const elapsed = Math.round(performance.now() - startTime);
    const data = await res.json();

    if (!res.ok) {
      console.error(`❌ [BACKEND -> FRONTEND] Delete failed (${res.status}) in ${elapsed}ms:`, data);
      return { success: false, error: data.error || "Failed to delete destination." };
    }

    console.log(`✅ [BACKEND -> FRONTEND] Destination deleted in ${elapsed}ms:`, data);
    return { success: true };
  } catch (error: unknown) {
    console.error("❌ [FRONTEND ERROR] deleteDestination exception:", error);
    const message = error instanceof Error ? error.message : "Network error";
    return { success: false, error: message };
  }
}

export async function updateDestination(
  id: string,
  input: Partial<CreateDestinationInput>
): Promise<{ success: boolean; data?: Destination; error?: string }> {
  console.log(`🚀 [FRONTEND -> BACKEND] PUT /destinations/${id} | Payload:`, input);

  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const elapsed = Math.round(performance.now() - startTime);
    const data = await res.json();

    if (!res.ok) {
      console.error(`❌ [BACKEND -> FRONTEND] Update failed (${res.status}) in ${elapsed}ms:`, data);
      return { success: false, error: data.error || "Failed to update travel package." };
    }

    console.log(`✅ [BACKEND -> FRONTEND] Destination updated in ${elapsed}ms:`, data.data);
    return { success: true, data: data.data };
  } catch (error: unknown) {
    console.error("❌ [FRONTEND ERROR] updateDestination exception:", error);
    const message = error instanceof Error ? error.message : "Network error";
    return { success: false, error: message };
  }
}

export async function fetchBookings(): Promise<Booking[]> {
  console.log("🚀 [FRONTEND -> BACKEND] GET /bookings");
  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/bookings`, { cache: "no-store" });
    const elapsed = Math.round(performance.now() - startTime);

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`📥 [BACKEND -> FRONTEND] Received ${data.data?.length ?? 0} bookings in ${elapsed}ms:`, data.data);
    return data.data || [];
  } catch (error) {
    console.error("❌ [FRONTEND ERROR] fetchBookings failed:", error);
    return [];
  }
}

export async function createBooking(
  payload: Partial<Booking>
): Promise<{ success: boolean; data?: Booking; error?: string }> {
  console.log("🚀 [FRONTEND -> BACKEND] POST /bookings | Payload:", payload);
  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const elapsed = Math.round(performance.now() - startTime);
    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || "Failed to create booking." };
    }
    console.log(`✅ [BACKEND -> FRONTEND] Booking confirmed in ${elapsed}ms:`, data.data);
    return { success: true, data: data.data };
  } catch (error: unknown) {
    console.error("❌ [FRONTEND ERROR] createBooking exception:", error);
    const message = error instanceof Error ? error.message : "Network error";
    return { success: false, error: message };
  }
}

export async function cancelBooking(
  id: string
): Promise<{ success: boolean; error?: string }> {
  console.log(`🚀 [FRONTEND -> BACKEND] DELETE /bookings/${id}`);
  try {
    const startTime = performance.now();
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "DELETE",
    });
    const elapsed = Math.round(performance.now() - startTime);
    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || "Failed to cancel booking." };
    }
    console.log(`✅ [BACKEND -> FRONTEND] Booking cancelled in ${elapsed}ms`);
    return { success: true };
  } catch (error: unknown) {
    console.error("❌ [FRONTEND ERROR] cancelBooking exception:", error);
    const message = error instanceof Error ? error.message : "Network error";
    return { success: false, error: message };
  }
}
