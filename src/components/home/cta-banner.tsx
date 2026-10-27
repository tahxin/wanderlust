import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative h-[440px] overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a plane flying over a tropical coastline"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/85" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="font-heading text-[54px] leading-[1.1] font-normal text-white max-md:text-[38px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-[17px] text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="#"
          className="mt-10 inline-flex h-[55px] items-center gap-3 rounded-[3px] bg-white px-9 text-[15px] font-semibold tracking-[0.05em] text-ink uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-[18px]" />
        </a>
      </div>
    </section>
  );
}
