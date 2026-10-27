import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SearchBar } from "@/components/home/search-bar";

export function HeroBanner() {
  return (
    <section className="relative h-[750px] overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Tropical coastline from above"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-[76px] text-center">
          <h1 className="font-heading text-[64px] leading-[1.22] font-normal text-white md:text-[88px]">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-7 max-w-[665px] text-[19px] leading-relaxed text-white/90">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-9 flex items-center gap-4">
            <a
              href="#"
              className="inline-flex h-14 items-center gap-3 rounded-[4px] bg-brand px-8 text-[14px] font-semibold tracking-[0.06em] text-white uppercase transition-colors hover:bg-brand/90"
            >
              Explore Now
              <ArrowRight className="size-[18px]" />
            </a>
            <a
              href="#"
              className="inline-flex h-14 items-center rounded-[4px] bg-white/35 px-8 text-[14px] font-semibold tracking-[0.06em] text-white uppercase backdrop-blur-[2px] transition-colors hover:bg-white/45"
            >
              View Destination
            </a>
          </div>
        </div>

        <SearchBar />
      </div>
    </section>
  );
}
