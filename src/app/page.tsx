import { Suspense } from "react";
import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedDestinations } from "@/components/home/featured-destinations";
import { FeaturedDestinationsSkeleton } from "@/components/skeletons/featured-skeleton";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Suspense fallback={<FeaturedDestinationsSkeleton />}>
        <FeaturedDestinations />
      </Suspense>
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
