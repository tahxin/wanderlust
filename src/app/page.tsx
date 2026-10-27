import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedDestinations } from "@/components/home/featured-destinations";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
