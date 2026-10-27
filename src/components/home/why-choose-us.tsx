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
    <section className="bg-section-sky pt-[120px] pb-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-heading text-[48px] leading-tight font-normal text-ink md:text-[56px] lg:text-[64px]">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3.5 text-center text-[16px] text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-20 grid gap-7 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-md border border-black/5 bg-card px-[38px] pt-[42px] pb-[38px]"
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
