"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/add-destinations" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-4 top-4 z-20 h-14 bg-white">
      <div className="grid h-full grid-cols-3 items-center px-6">
        <nav className="flex items-center gap-8 text-[15px] font-semibold">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  isActive
                    ? "text-brand underline underline-offset-4"
                    : "text-ink hover:text-brand"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
          />
        </Link>

        <div className="flex items-center justify-self-end gap-8 text-[15px] font-semibold text-ink">
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-2 hover:text-brand",
              pathname === "/profile" ? "text-brand underline underline-offset-4" : "text-ink"
            )}
          >
            <User className="size-4" strokeWidth={2} />
            Profile
          </Link>
          {accountLinks.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
