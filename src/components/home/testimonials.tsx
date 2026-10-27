"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person2.png",
  },
];

const arrowButtonClassName =
  "static size-14! rounded-full border-[#dde0e2] bg-[#f2f4f5] text-muted-foreground hover:bg-muted";

export function Testimonials() {
  return (
    <section className="py-[120px] max-lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Carousel opts={{ align: "start" }} className="w-full">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-[56px] leading-none font-normal text-ink max-md:text-[40px]">
                What Travelers Say
              </h2>
              <p className="mt-4 text-[16px] text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-[18px] max-md:hidden">
              <CarouselPrevious className={arrowButtonClassName}>
                <ArrowLeft className="size-5" strokeWidth={1.7} />
                <span className="sr-only">Previous testimonials</span>
              </CarouselPrevious>
              <CarouselNext className={arrowButtonClassName}>
                <ArrowRight className="size-5" strokeWidth={1.7} />
                <span className="sr-only">Next testimonials</span>
              </CarouselNext>
            </div>
          </div>

          <CarouselContent className="-ml-[25px] mt-16">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="min-w-0 pl-[25px] md:basis-[calc(50%-12.5px)]"
              >
                <div className="flex h-full min-h-[310px] items-stretch justify-between gap-5 rounded-md border border-[#ececec] bg-card p-[22px]">
                  <div className="flex flex-col justify-between gap-6">
                    <p className="max-w-[310px] font-heading text-[20px] leading-[1.35] font-semibold text-ink">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="text-[17px] font-medium text-brand">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-[13px] text-[#8a8a8a]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="relative h-[266px] w-[220px] shrink-0 overflow-hidden rounded-[4px] max-sm:hidden">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
