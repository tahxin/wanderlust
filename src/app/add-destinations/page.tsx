import type { Metadata } from "next";
import { AddDestinationForm } from "./add-destination-form";

export const metadata: Metadata = {
  title: "Add New Travel Package — Wanderlast",
  description:
    "Add a new travel package to the Wanderlast catalog: destination, pricing, duration, departure date, and description.",
};

export default function AddDestinationPage() {
  return (
    <section className="min-h-screen bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h1 className="font-heading text-[34px] sm:text-[48px] leading-[1.12] font-normal tracking-tight text-ink md:text-[60px] lg:text-[64px]">
          Add New Travel Package
        </h1>

        <AddDestinationForm />
      </div>
    </section>
  );
}

