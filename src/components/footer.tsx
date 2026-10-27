import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3L17.61 20.65Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3.2 6.06H4.8v9.9h2.4ZM6 5.9a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Zm4.6 2.16H8.3v9.9h2.4v-5.2c0-1 .5-1.8 1.7-1.8s1.4.9 1.4 1.8v5.2h2.5v-5.9c0-2.4-1.2-3.6-2.9-3.6-1 0-1.8.5-2.2 1.2Z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: "X (Twitter)", icon: XIcon, className: "size-5" },
  { label: "LinkedIn", icon: LinkedInIcon, className: "size-5" },
  { label: "Instagram", icon: InstagramIcon, className: "size-[21px]" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-[125px] pb-7">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="max-w-full h-auto w-[240px] sm:w-[360px] md:w-[480px] lg:w-[542px]"
        />
        <p className="mt-4 sm:mt-6 text-[15px] sm:text-[17px] text-white/65">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 sm:mt-20 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[18px] sm:text-[19px] font-normal text-white uppercase font-heading tracking-[0.02em]">
              Newsletter
            </p>
            <p className="mt-3 text-[13px] text-[#9a9a9a]">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-4 w-full max-w-[320px]" action="#">
              <input
                type="email"
                placeholder="Enter email"
                className="h-[45px] w-full rounded-[2px] border border-[#3a3a3a] bg-[#2f2f2f] pr-11 pl-4 text-[15px] text-white placeholder:text-[#9c9c9c] outline-none focus-visible:border-brand"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute inset-y-1 right-1.5 flex w-9 items-center justify-center text-white transition-colors hover:text-brand"
              >
                <ArrowUpRight className="size-5" strokeWidth={1.7} />
              </button>
            </form>
          </div>

          <div>
            <p className="font-heading text-[18px] sm:text-[19px] font-normal tracking-[0.02em] text-white uppercase">
              Quick Links
            </p>
            <ul className="mt-3 sm:mt-[18px] text-[15px] sm:text-[16px] leading-[36px] sm:leading-[40px] text-[#d6d6d6]">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-white">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-[18px] sm:text-[19px] font-normal tracking-[0.02em] text-white uppercase">
              Support
            </p>
            <ul className="mt-3 sm:mt-[18px] text-[15px] sm:text-[16px] leading-[36px] sm:leading-[40px] text-[#d6d6d6]">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-[18px] sm:text-[19px] font-normal tracking-[0.02em] text-white uppercase">
              Contact Us
            </p>
            <ul className="mt-3 sm:mt-[18px] text-[15px] sm:text-[16px] leading-[36px] sm:leading-[40px] text-[#d6d6d6]">
              <li>786 901 1622</li>
              <li>info@wandarland.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-[68px] flex flex-col items-start justify-between gap-4 border-t border-[#2a2a2a] pt-7 max-sm:gap-4 sm:flex-row sm:items-center">
          <p className="text-[14px] text-[#8f8f8f]">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-8 sm:gap-10">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="text-white transition-colors hover:text-white/70"
              >
                <social.icon className={social.className} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
