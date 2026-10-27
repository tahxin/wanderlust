"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import { type Destination, fetchDestinations } from "@/lib/api";

const categories = [
  "All",
  "Beach",
  "Mountain",
  "City Tour",
  "Cruise",
  "Adventure",
  "Cultural",
];

const priceRanges = ["All Prices", "Under $1500", "$1500 - $2500", "$2500+"];

const sortOptions = [
  { label: "Newest Added", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedSort, setSelectedSort] = useState("newest");

  useEffect(() => {
    let isMounted = true;

    fetchDestinations({
      category: selectedCategory === "All" ? undefined : selectedCategory,
      sort: selectedSort,
    })
      .then((data) => {
        if (isMounted) {
          setDestinations(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading destinations:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, selectedSort]);

  // Filter by price range client-side
  const filteredDestinations = destinations.filter((pkg) => {
    const price = typeof pkg.price === "number" ? pkg.price : parseFloat(pkg.price) || 0;
    if (selectedPriceRange === "Under $1500") return price < 1500;
    if (selectedPriceRange === "$1500 - $2500") return price >= 1500 && price <= 2500;
    if (selectedPriceRange === "$2500+") return price > 2500;
    return true;
  });

  return (
    <section className="min-h-screen bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Title */}
        <h1 className="font-heading text-[48px] leading-[1.12] font-normal tracking-tight text-ink md:text-[60px] lg:text-[64px]">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-[17px] text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        {/* Filter Bar */}
        <div className="mt-12 grid grid-cols-1 border border-gray-200 bg-white sm:grid-cols-3">
          {/* Category Filter */}
          <div className="border-b border-gray-200 p-4 sm:border-r sm:border-b-0">
            <label className="block text-[12px] font-bold tracking-wider text-muted-foreground uppercase">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 w-full bg-transparent text-[15px] font-medium text-ink outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="border-b border-gray-200 p-4 sm:border-r sm:border-b-0">
            <label className="block text-[12px] font-bold tracking-wider text-muted-foreground uppercase">
              Price Range
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="mt-1 w-full bg-transparent text-[15px] font-medium text-ink outline-none"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="p-4">
            <label className="block text-[12px] font-bold tracking-wider text-muted-foreground uppercase">
              Sort By
            </label>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="mt-1 w-full bg-transparent text-[15px] font-medium text-ink outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count Label */}
        <div className="mt-8">
          <p className="text-[16px] text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-ink">
              {filteredDestinations.length}
            </span>{" "}
            destinations
          </p>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="mt-16 flex items-center justify-center py-20 text-muted-foreground">
            <p className="text-[17px]">Loading destinations from catalog...</p>
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="mt-16 rounded-[6px] border border-dashed border-gray-300 py-16 text-center">
            <p className="text-[18px] font-medium text-ink">No destinations found</p>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Try adjusting your category or price filters, or add a new travel package in the admin portal.
            </p>
            <div className="mt-6">
              <Link
                href="/add-destinations"
                className="inline-flex h-11 items-center rounded-[4px] bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand/90"
              >
                Add New Destination
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((pkg) => (
              <div key={pkg._id} className="group">
                {/* Image */}
                <div className="relative aspect-[411/231] w-full overflow-hidden rounded-[2px] bg-gray-100">
                  <Image
                    src={pkg.imageUrl || "/images/destinations/image1.png"}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 411px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-[3px] bg-white/90 px-2.5 py-1 text-[13px] font-semibold text-ink backdrop-blur-xs">
                    <span>{pkg.rating ? pkg.rating.toFixed(1) : "4.8"}</span>
                    <Star className="size-3.5 fill-ink text-ink" />
                  </div>
                </div>

                {/* Info */}
                <div className="mt-5">
                  <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
                    <MapPin className="size-4 text-ink" />
                    <span>{pkg.country}</span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <h3 className="font-heading text-[22px] font-medium text-ink">
                      {pkg.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-[20px] font-semibold text-ink">
                        ${typeof pkg.price === "number" ? pkg.price.toLocaleString() : pkg.price}
                      </span>
                      <span className="text-[14px] text-muted-foreground">/Person</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[14px] text-muted-foreground">
                    <Calendar className="size-4 text-ink" />
                    <span>{pkg.duration || "7 Days/6 Nights"}</span>
                  </div>

                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      onClick={() => alert(`Package "${pkg.name}" booking selected!`)}
                      className="inline-flex items-center gap-1.5 text-[14px] font-bold tracking-wider text-brand uppercase hover:underline"
                    >
                      Book Now
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
