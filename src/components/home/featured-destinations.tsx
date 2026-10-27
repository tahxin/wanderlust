"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { type Destination, fetchDestinations } from "@/lib/api";

const fallbackDestinations: Destination[] = [
  {
    _id: "1",
    name: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image1.png",
    rating: 4.5,
    reviewsCount: 234,
  },
  {
    _id: "2",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image2.png",
    rating: 4.5,
    reviewsCount: 189,
  },
  {
    _id: "3",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image3.png",
    rating: 4.5,
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
];

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    fetchDestinations()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          console.log(
            `🌟 [FRONTEND FeaturedDestinations] Received ${data.length} live packages for homepage from backend`
          );
          setDestinations(data);
        }
      })
      .catch((err) => {
        console.error("❌ [FRONTEND FeaturedDestinations] Failed to load destinations:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSlides = Math.min(5, Math.max(1, destinations.length));
  const maxIndex = Math.max(0, destinations.length - 2);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const currentDisplayNum = Math.min(currentIndex + 1, totalSlides);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-[44px] leading-[1.12] font-normal tracking-tight text-ink md:text-[54px] lg:text-[58px]">
              Featured Destinations
            </h2>
            <p className="mt-2 text-[16px] text-muted-foreground">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-brand px-6 text-[13px] font-bold tracking-wider text-brand uppercase transition-colors hover:bg-brand hover:text-white"
          >
            All Destinations
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 52}%)`,
            }}
          >
            {destinations.map((pkg, idx) => (
              <div
                key={pkg._id || idx}
                className="group w-[88vw] shrink-0 sm:w-[500px] md:w-[calc(50%-16px)] md:min-w-[calc(50%-16px)]"
              >
                <div className="relative aspect-[411/231] w-full overflow-hidden rounded-[2px] bg-gray-100">
                  <Image
                    src={pkg.imageUrl || "/images/destinations/image1.png"}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 88vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-[3px] bg-white/95 px-2.5 py-1 text-[13px] font-semibold text-ink shadow-xs">
                    <span>{pkg.rating ? pkg.rating.toFixed(1) : "4.5"}</span>
                    <Star className="size-3.5 fill-ink text-ink" />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
                    <MapPin className="size-4 text-ink" strokeWidth={1.5} />
                    <span>{pkg.country}</span>
                  </div>

                  <div className="mt-2.5 flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-[26px] font-normal text-ink">
                      {pkg.name}
                    </h3>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-[22px] font-semibold text-ink">
                        ${typeof pkg.price === "number" ? pkg.price.toLocaleString() : pkg.price}
                      </span>
                      <span className="text-[14px] font-normal text-muted-foreground">
                        /Person
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[14px] text-muted-foreground">
                    <Calendar className="size-4 text-ink" strokeWidth={1.5} />
                    <span>{pkg.duration || "7 Days/6 Nights"}</span>
                  </div>

                  <div className="mt-4 pt-1">
                    <Link
                      href={`/destinations/${pkg._id}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-wider text-brand uppercase hover:underline"
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

        <div className="mt-14 flex items-center justify-between gap-6">
          <div className="flex flex-1 items-center gap-6">
            <span className="text-[18px] font-medium text-ink min-w-[32px]">
              {currentDisplayNum}/{totalSlides}
            </span>
            <div className="h-[1px] flex-1 bg-gray-200" />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-gray-300 text-ink transition-colors hover:border-ink hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-gray-300 text-ink transition-colors hover:border-ink hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
