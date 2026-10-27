import { Suspense } from "react";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Wanderlast — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<header className="absolute inset-x-4 top-4 z-20 h-14 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
