import { Headset, Map, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you whenever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-section-sky py-16 sm:py-24 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-heading text-[32px] sm:text-[44px] leading-tight font-normal text-ink md:text-[56px] lg:text-[64px]">
          Why Choose Wanderlust
        </h2>
        <p className="mt-2.5 sm:mt-3.5 text-center text-[15px] sm:text-[16px] text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 sm:mt-16 md:mt-20 grid gap-6 sm:gap-7 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-md border border-black/5 bg-card p-6 sm:p-8 md:px-[38px] md:pt-[42px] md:pb-[38px]"
            >
              <reason.icon
                className="size-[38px] text-brand"
                strokeWidth={1.7}
              />
              <h3 className="mt-10 font-heading text-[26px] font-medium text-ink">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-[340px] text-[16px] leading-[1.55] text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
