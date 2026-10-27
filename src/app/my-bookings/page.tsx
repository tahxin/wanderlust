"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Trash2,
} from "lucide-react";
import { type Booking, cancelBooking, fetchBookings } from "@/lib/api";

const fallbackBookings: Booking[] = [
  {
    _id: "b1-fallback",
    destinationName: "Bali Paradise",
    departureDate: "May 15, 2026",
    bookingId: "b1",
    price: 1299,
    status: "Confirmed",
    imageUrl: "/images/destinations/image1.png",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "b2-fallback",
    destinationName: "Bali Paradise",
    departureDate: "May 15, 2026",
    bookingId: "b1",
    price: 1299,
    status: "Confirmed",
    imageUrl: "/images/destinations/image2.png",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "b3-fallback",
    destinationName: "Venice & Italian Riviera",
    departureDate: "May 15, 2026",
    bookingId: "b1",
    price: 1299,
    status: "Pending",
    imageUrl: "/images/destinations/image3.png",
    createdAt: new Date().toISOString(),
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(fallbackBookings);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchBookings()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) {
            setBookings(data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load bookings:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCancel = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to cancel your booking for "${name}"?`)) {
      return;
    }

    try {
      await cancelBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setActionMessage(`Booking for "${name}" was successfully cancelled.`);
      setTimeout(() => setActionMessage(null), 4000);
    } catch {
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <h1 className="font-heading text-[48px] leading-[1.12] font-normal tracking-tight text-ink md:text-[60px] lg:text-[64px]">
          My Bookings
        </h1>
        <p className="mt-3 text-[17px] text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>

        {actionMessage && (
          <div className="mt-6 rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-800 animate-in fade-in">
            {actionMessage}
          </div>
        )}

        {/* Bookings List */}
        <div className="mt-12 space-y-6">
          {loading ? (
            <div className="py-20 text-center text-muted-foreground">
              Loading your bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-[6px] border border-dashed border-gray-200 py-16 text-center">
              <p className="text-[18px] font-medium text-ink">No bookings found</p>
              <p className="mt-2 text-[15px] text-muted-foreground">
                You haven&apos;t booked any travel packages yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/destinations"
                  className="inline-flex h-11 items-center rounded-[4px] bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand/90"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col gap-6 rounded-[6px] border border-[#f0f0f2] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left side: Image and details */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="relative aspect-[411/231] w-full shrink-0 overflow-hidden rounded-[4px] bg-gray-100 sm:w-[260px] md:w-[320px]">
                    <Image
                      src={booking.imageUrl || "/images/destinations/image1.png"}
                      alt={booking.destinationName}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    {/* Status badge */}
                    <div>
                      {booking.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[13px] font-medium text-amber-700">
                          <Clock className="size-3.5" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[13px] font-medium text-emerald-700">
                          <CheckCircle2 className="size-3.5" />
                          Confirmed
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 font-heading text-[24px] font-medium text-ink md:text-[28px]">
                      {booking.destinationName}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-[14px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-ink" />
                        <span>Departure: {booking.departureDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-ink" />
                        <span>Booking ID: {booking.bookingId}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-[24px] font-semibold text-brand">
                      ${booking.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleCancel(booking._id, booking.destinationName)}
                    className="inline-flex h-10 items-center gap-2 rounded-[4px] border border-[#ef4444] bg-white px-5 text-[14px] font-medium text-[#ef4444] transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                    Cancel
                  </button>
                  <Link
                    href={`/destinations/${booking.destinationId || ""}`}
                    className="inline-flex h-10 items-center gap-2 rounded-[4px] bg-brand px-6 text-[14px] font-medium text-white transition-colors hover:bg-brand/90"
                  >
                    <Eye className="size-4" />
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
