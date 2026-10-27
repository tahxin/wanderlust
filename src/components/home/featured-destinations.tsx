"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";
import { type Destination, fetchDestinations } from "@/lib/api";

const fallbackDestinations: Destination[] = [
  {
    _id: "1",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 1299,
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image1.png",
    rating: 4.5,
    reviewsCount: 234,
  },
  {
    _id: "2",
    name: "Bora Bora Lagoon",
    country: "French Polynesia",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image2.png",
    rating: 4.8,
    reviewsCount: 189,
  },
  {
    _id: "3",
    name: "Swiss Alpine Retreat",
    country: "Switzerland",
    category: "Mountain",
    price: 1850,
    duration: "5 Days/4 Nights",
    imageUrl: "/images/destinations/image3.png",
    rating: 4.9,
    reviewsCount: 312,
  },
  {
    _id: "4",
    name: "Machu Picchu Citadel",
    country: "Peru",
    category: "Cultural",
    price: 2100,
    duration: "6 Days/5 Nights",
    imageUrl: "/images/destinations/image4.png",
    rating: 4.9,
    reviewsCount: 410,
  },
  {
    _id: "5",
    name: "Maldives Coral Haven",
    country: "Maldives",
    category: "Beach",
    price: 2450,
    duration: "6 Days/5 Nights",
    imageUrl: "/images/destinations/image5.png",
    rating: 4.7,
    reviewsCount: 156,
  },
  {
    _id: "6",
    name: "Arizona Canyon Wonder",
    country: "USA",
    category: "Adventure",
    price: 1400,
    duration: "4 Days/3 Nights",
    imageUrl: "/images/destinations/image6.png",
    rating: 4.6,
    reviewsCount: 98,
  },
];

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    fetchDestinations()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setDestinations(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load destinations:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalCards = destinations.length;
  const cardsPerPage = 3;
  const maxIndex = Math.max(0, totalCards - cardsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const currentDisplayNum = Math.min(currentIndex + 1, totalCards);

  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-[48px] leading-tight font-normal text-ink md:text-[56px] lg:text-[64px]">
              Featured Destinations
            </h2>
            <p className="mt-2 text-[16px] text-muted-foreground">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex h-11 items-center gap-2 rounded-[3px] border border-brand px-6 text-[14px] font-semibold tracking-wider text-brand uppercase transition-colors hover:bg-brand hover:text-white"
          >
            All Destinations
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Carousel Grid */}
        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex gap-7 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerPage + 1.2)}%)`,
            }}
          >
            {destinations.map((pkg, idx) => (
              <div
                key={pkg._id || idx}
                className="group w-full shrink-0 flex-1 md:w-[calc(33.333%-19px)] md:max-w-[calc(33.333%-19px)]"
              >
                {/* Image Container */}
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

                {/* Content */}
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
                    <Link
                      href="/destinations"
                      className="inline-flex items-center gap-1.5 text-[14px] font-bold tracking-wider text-brand uppercase hover:underline"
                    >
                      Book Now
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination & Arrows */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex flex-1 items-center gap-4 pr-8">
            <span className="text-[17px] font-medium text-ink">
              {currentDisplayNum}/{totalCards}
            </span>
            <div className="h-[2px] flex-1 bg-gray-200">
              <div
                className="h-full bg-ink transition-all duration-300"
                style={{
                  width: `${(currentDisplayNum / totalCards) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-gray-300 text-ink transition-colors hover:border-ink disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-gray-300 text-ink transition-colors hover:border-ink disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
