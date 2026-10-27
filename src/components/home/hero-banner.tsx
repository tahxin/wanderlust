import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/home/search-bar";

export function HeroBanner() {
  return (
    <section className="relative min-h-[720px] md:h-[750px] overflow-hidden flex flex-col justify-between">
      <Image
        src="/images/Banner.png"
        alt="Tropical coastline from above"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-28 md:pt-[76px] text-center">
          <h1 className="font-heading text-[38px] leading-[1.18] sm:text-[54px] md:text-[76px] lg:text-[88px] font-normal text-white">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-5 sm:mt-7 max-w-[665px] text-[16px] sm:text-[19px] leading-relaxed text-white/90">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/destinations"
              className="inline-flex h-12 sm:h-14 w-full sm:w-auto justify-center items-center gap-3 rounded-[4px] bg-brand px-8 text-[13px] sm:text-[14px] font-semibold tracking-[0.06em] text-white uppercase transition-colors hover:bg-brand/90"
            >
              Explore Now
              <ArrowRight className="size-[18px]" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex h-12 sm:h-14 w-full sm:w-auto justify-center items-center rounded-[4px] bg-white/35 px-8 text-[13px] sm:text-[14px] font-semibold tracking-[0.06em] text-white uppercase backdrop-blur-[2px] transition-colors hover:bg-white/45"
            >
              View Destination
            </Link>
          </div>
        </div>

        <SearchBar />
      </div>
    </section>
  );
}
