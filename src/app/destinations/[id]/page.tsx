"use client";

import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Edit2,
  Loader2,
  MapPin,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import {
  createBooking,
  deleteDestination,
  type Destination,
  fetchDestinationById,
  updateDestination,
} from "@/lib/api";
import { DestinationDetailSkeleton } from "@/components/skeletons/destination-detail-skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const itineraryDays = [
  {
    day: "01",
    title: "Arrival & Beach Welcome",
    description:
      "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury beachfront accommodation, tropical landscapes, and unforgettable sunsets.",
  },
  {
    day: "02",
    title: "Cultural Temple Tour",
    description:
      "Visit iconic temples including Tanah Lot and Uluwatu. Watch traditional Kecak dance at sunset.",
  },
  {
    day: "03",
    title: "Beach & Water Activities",
    description:
      "Snorkeling, surfing lessons, or simply relax on pristine beaches. Evening beach barbecue.",
  },
  {
    day: "04",
    title: "Rice Terraces & Spa",
    description:
      "Explore Tegalalang Rice Terraces and enjoy a traditional Balinese massage.",
  },
  {
    day: "05",
    title: "Mount Batur Sunrise Trek",
    description:
      "Early morning volcano trek to watch the sunrise. Return for breakfast and rest.",
  },
  {
    day: "06",
    title: "Free Day & Shopping",
    description:
      "Explore Ubud markets, art galleries, or enjoy resort amenities.",
  },
  {
    day: "07",
    title: "Departure",
    description:
      "Final breakfast and transfer to airport with unforgettable memories.",
  },
];

const reviews = [
  {
    author: "Michael Chen",
    date: "March 2026",
    photo: "/images/person1.png",
    text: "Absolutely Incredible Experience! The Itinerary Was Perfect And Our Guide Was Amazing.",
  },
  {
    author: "David Brown",
    date: "February 2026",
    photo: "/images/person2.png",
    text: "This Trip Exceeded All My Expectations. Every Detail Was Thoughtfully Planned.",
  },
];

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

const categories = [
  "Beach",
  "Mountain",
  "City Tour",
  "Cruise",
  "Adventure",
  "Cultural",
];

function DetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [destination, setDestination] = useState<Destination | null>(null);
  const [selectedImage, setSelectedImage] = useState("/images/destinations/image1.png");
  const [travelers, setTravelers] = useState(2);
  const [departureDate, setDepartureDate] = useState("05/15/2026");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    fetchDestinationById(id)
      .then((data) => {
        if (isMounted && data) {
          setDestination(data);
          setSelectedImage(data.imageUrl || "/images/destinations/image1.png");
          setDepartureDate(data.departureDate || "05/15/2026");
          setEditForm({
            name: data.name,
            country: data.country,
            category: data.category,
            price: String(data.price),
            duration: data.duration,
            departureDate: data.departureDate || "05/15/2026",
            imageUrl: data.imageUrl,
            description: data.description || "",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching destination details:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const currentPkg: Destination = destination || {
    _id: id,
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 1299,
    duration: "7 Days / 6 Nights",
    departureDate: "05/15/2026",
    imageUrl: "/images/destinations/image1.png",
    rating: 4.9,
    reviewsCount: 234,
    description:
      "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateDestination(currentPkg._id, editForm);
      if (res.success && res.data) {
        setDestination(res.data);
        setIsEditOpen(false);
      } else {
        alert(res.error || "Failed to update package.");
      }
    } catch {
      alert("Error updating package.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await deleteDestination(currentPkg._id);
      if (res.success) {
        setIsDeleteOpen(false);
        router.push("/destinations");
      } else {
        alert(res.error || "Failed to delete package.");
      }
    } catch {
      alert("Error deleting package.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = async () => {
    setIsSubmitting(true);
    try {
      const res = await createBooking({
        destinationId: currentPkg._id,
        destinationName: currentPkg.name,
        departureDate,
        price: Number(currentPkg.price) * travelers,
        imageUrl: currentPkg.imageUrl,
      });

      if (res.success) {
        setBookingSuccess(`Your booking for ${currentPkg.name} is confirmed!`);
        setTimeout(() => setBookingSuccess(null), 5000);
      }
    } catch {
      alert("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const unitPrice = typeof currentPkg.price === "number" ? currentPkg.price : parseFloat(currentPkg.price) || 1299;
  const totalPrice = unitPrice * travelers;

  return (
    <section className="min-h-screen bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-[4px] border border-gray-300 bg-white px-5 text-[14px] font-medium text-ink transition-colors hover:bg-gray-50"
            >
              <Edit2 className="size-4" strokeWidth={1.8} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-[4px] border border-[#ef4444] bg-white px-5 text-[14px] font-medium text-[#ef4444] transition-colors hover:bg-red-50"
            >
              <Trash2 className="size-4" strokeWidth={1.8} />
              Cancel
            </button>
          </div>
        </div>

        {bookingSuccess && (
          <div className="mt-6 flex items-center justify-between rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[15px] font-medium text-emerald-800">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-5 text-emerald-600" />
              <span>{bookingSuccess}</span>
            </div>
            <Link href="/my-bookings" className="text-emerald-700 underline">
              View in My Bookings
            </Link>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[6px] bg-gray-100">
            <Image
              src={selectedImage}
              alt={currentPkg.name}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["/images/destinations/image1.png", "/images/destinations/image2.png", "/images/destinations/image3.png"].map(
              (img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[16/9] w-full overflow-hidden rounded-[4px] border-2 transition-all ${
                    selectedImage === img ? "border-brand" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-1.5 text-[15px] text-muted-foreground">
                <MapPin className="size-4 text-ink" />
                <span>{currentPkg.country}</span>
              </div>
              <h1 className="mt-2 font-heading text-[44px] leading-tight font-normal text-ink md:text-[56px]">
                {currentPkg.name}
              </h1>
              <div className="mt-3 flex items-center gap-6 text-[15px]">
                <div className="flex items-center gap-1.5 font-medium text-ink">
                  <Star className="size-4 fill-emerald-600 text-emerald-600" />
                  <span>{currentPkg.rating || 4.9}</span>
                  <span className="text-muted-foreground">({currentPkg.reviewsCount || 234} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-4 text-ink" />
                  <span>{currentPkg.duration}</span>
                </div>
                {currentPkg.category && (
                  <Badge variant="outline" className="border-stone-300 text-ink text-xs font-medium">
                    {currentPkg.category}
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-[26px] font-medium text-ink">Overview</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
                {currentPkg.description ||
                  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[26px] font-medium text-ink">Highlights</h2>
              <p className="mt-3 text-[16px] text-muted-foreground">
                Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[15px] text-ink">
                    <Check className="size-4 text-emerald-600" strokeWidth={2.5} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-[26px] font-medium text-ink">Itinerary</h2>
              <div className="mt-6 space-y-6">
                {itineraryDays.map((item) => (
                  <div key={item.day} className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand text-[15px] font-medium text-brand">
                      {item.day}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-[26px] font-medium text-ink">Traveler Reviews</h2>
              <div className="mt-6 space-y-4">
                {reviews.map((r, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 rounded-[6px] border border-gray-100 bg-white p-6 shadow-xs sm:flex-row sm:items-center"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                      <Image src={r.photo} alt={r.author} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-4 fill-emerald-600 text-emerald-600" />
                        ))}
                      </div>
                      <p className="mt-2 text-[15px] font-medium text-ink">{r.text}</p>
                      <p className="mt-2 text-[13px] text-muted-foreground">
                        — {r.author} <span className="ml-2">{r.date}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-[6px] border border-gray-200 bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-muted-foreground">Starting from</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[32px] font-bold text-brand">${unitPrice.toLocaleString()}</span>
                <span className="text-[14px] text-muted-foreground">per person</span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-muted-foreground">
                    Departure Date
                  </label>
                  <input
                    type="text"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-[4px] border border-gray-200 bg-[#f8fafc] px-4 text-[14px] text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-muted-foreground">
                    Number of Travelers
                  </label>
                  <div className="mt-1.5 flex h-11 items-center justify-between rounded-[4px] border border-gray-200 bg-[#f8fafc] px-4">
                    <button
                      type="button"
                      onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                      className="text-[18px] font-bold text-ink hover:text-brand"
                    >
                      —
                    </button>
                    <span className="text-[15px] font-semibold text-ink">{travelers}</span>
                    <button
                      type="button"
                      onClick={() => setTravelers((prev) => prev + 1)}
                      className="text-[18px] font-bold text-ink hover:text-brand"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[14px] text-muted-foreground">Total Price</span>
                  <div className="mt-0.5 text-[26px] font-bold text-brand">
                    ${totalPrice.toLocaleString()}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleBookNow}
                  disabled={isSubmitting}
                  className="h-12 w-full bg-brand text-[15px] font-semibold text-white hover:bg-brand/90"
                >
                  {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                  Book Now
                  <ArrowRight className="size-4 ml-2" />
                </Button>

                <div className="space-y-2 pt-2 text-[13px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    <span>Free cancellation up to 7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    <span>Travel insurance included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-[620px] rounded-[6px] border border-gray-200 bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-[24px] font-medium text-ink">
                  Update Travel Package
                </h2>
                <p className="mt-1 text-[14px] text-muted-foreground">
                  Make changes to the travel package details below
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="text-gray-400 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-name" className="text-[14px] font-medium text-ink">Destination Name</Label>
                <Input
                  id="edit-name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="h-11 bg-[#f8fafc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-country" className="text-[14px] font-medium text-ink">Country</Label>
                  <Input
                    id="edit-country"
                    type="text"
                    value={editForm.country}
                    onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                    className="h-11 bg-[#f8fafc]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-category" className="text-[14px] font-medium text-ink">Category</Label>
                  <select
                    id="edit-category"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="h-11 w-full rounded-lg border border-input bg-[#f8fafc] px-3 text-[14px] text-ink outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-price" className="text-[14px] font-medium text-ink">Price (USD)</Label>
                  <Input
                    id="edit-price"
                    type="text"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="h-11 bg-[#f8fafc]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-duration" className="text-[14px] font-medium text-ink">Duration</Label>
                  <Input
                    id="edit-duration"
                    type="text"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                    className="h-11 bg-[#f8fafc]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-departure" className="text-[14px] font-medium text-ink">Departure Date</Label>
                <Input
                  id="edit-departure"
                  type="text"
                  value={editForm.departureDate}
                  onChange={(e) => setEditForm({ ...editForm, departureDate: e.target.value })}
                  className="h-11 bg-[#f8fafc]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-image" className="text-[14px] font-medium text-ink">Image URL</Label>
                <Input
                  id="edit-image"
                  type="text"
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  className="h-11 bg-[#f8fafc]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-desc" className="text-[14px] font-medium text-ink">Description</Label>
                <Textarea
                  id="edit-desc"
                  rows={4}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="bg-[#f8fafc]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                  className="h-10 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4 mr-1.5" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 bg-brand text-white hover:bg-brand/90"
                >
                  <Save className="size-4 mr-1.5" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-[480px] rounded-[6px] border border-gray-200 bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertCircle className="size-6" />
                </div>
                <h2 className="text-[19px] font-semibold text-ink">Delete Travel Package</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="text-gray-400 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong className="text-ink">&quot;{currentPkg.name}&quot;</strong>? This action
              cannot be undone and will permanently remove this travel package from the system.
            </p>

            <div className="mt-8 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                className="h-10"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="h-10 gap-2"
              >
                <Trash2 className="size-4" />
                Delete Package
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<DestinationDetailSkeleton />}>
      <DetailContent params={params} />
    </Suspense>
  );
}
