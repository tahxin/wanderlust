"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-4 top-4 z-30 bg-white shadow-xs">
      <div className="hidden h-14 grid-cols-3 items-center px-6 lg:grid">
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

      <div className="flex h-14 items-center justify-between px-4 lg:hidden">
        <Link href="/">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={130}
            height={20}
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            aria-label="Profile"
            className={cn(
              "flex items-center text-ink hover:text-brand",
              pathname === "/profile" && "text-brand"
            )}
          >
            <User className="size-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex size-9 items-center justify-center rounded text-ink hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-100 px-6 pt-4 pb-6 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "py-1.5 text-[16px] font-semibold",
                    isActive ? "text-brand font-bold" : "text-ink hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1 text-[15px] font-medium text-ink hover:text-brand"
            >
              <User className="size-4" />
              My Profile
            </Link>
            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded border border-gray-200 text-sm font-semibold text-ink hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded bg-brand text-sm font-semibold text-white hover:bg-brand/90"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
