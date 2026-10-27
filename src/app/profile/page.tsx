"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Camera,
  DollarSign,
  Edit2,
  Globe,
  MapPin,
  Plane,
  Save,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Mitchell",
    location: "San Francisco, CA",
    memberSince: "Mar 2024",
    nationality: "United States",
    email: "sarah.mitchell@example.com",
    avatar: "/images/person2.png",
  });

  return (
    <section className="min-h-screen bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <h1 className="font-heading text-[48px] leading-[1.12] font-normal tracking-tight text-ink md:text-[60px] lg:text-[64px]">
          My Profile
        </h1>
        <p className="mt-3 text-[17px] text-muted-foreground">
          Manage your account settings and travel preferences
        </p>

        {/* Profile Content */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[380px_1fr]">
          {/* User Info Card */}
          <div className="rounded-[6px] border border-[#f0f0f2] bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col items-center text-center">
              {/* Avatar with Camera badge */}
              <div className="relative size-36 overflow-hidden rounded-full border-4 border-white shadow-md">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-brand text-white shadow-sm transition-transform hover:scale-110"
                >
                  <Camera className="size-4" />
                </button>
              </div>

              {isEditing ? (
                <div className="mt-4 space-y-2 w-full">
                  <Input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-10 text-center font-medium bg-[#f8fafc]"
                    placeholder="Full Name"
                  />
                  <Input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="h-9 text-center text-sm text-muted-foreground bg-[#f8fafc]"
                    placeholder="City, Country"
                  />
                </div>
              ) : (
                <>
                  <h2 className="mt-5 font-heading text-[26px] font-medium text-ink">
                    {profile.name}
                  </h2>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[14px] text-muted-foreground">
                    <MapPin className="size-4 text-ink" />
                    <span>{profile.location}</span>
                  </div>
                </>
              )}
            </div>

            <div className="my-6 h-[1px] bg-gray-100" />

            <div className="space-y-4 text-[15px]">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-semibold text-ink">{profile.memberSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nationality</span>
                <span className="font-semibold text-ink">{profile.nationality}</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="mt-8 h-11 w-full bg-brand text-white hover:bg-brand/90"
            >
              {isEditing ? <Save className="size-4 mr-2" /> : <Edit2 className="size-4 mr-2" />}
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Button>
          </div>

          {/* Right: Travel Statistics */}
          <div>
            <h2 className="text-[20px] font-semibold text-ink">Travel Statistics</h2>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Stat 1: Total Bookings */}
              <div className="flex items-center justify-between rounded-[6px] border border-[#f0f0f2] bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <span className="text-[14px] text-muted-foreground">Total Bookings</span>
                  <div className="mt-2 text-[32px] font-bold text-ink">12</div>
                </div>
                <div className="flex size-14 items-center justify-center rounded-full bg-cyan-50 text-brand">
                  <Plane className="size-6" />
                </div>
              </div>

              {/* Stat 2: Countries Visited */}
              <div className="flex items-center justify-between rounded-[6px] border border-[#f0f0f2] bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <span className="text-[14px] text-muted-foreground">Countries Visited</span>
                  <div className="mt-2 text-[32px] font-bold text-ink">18</div>
                </div>
                <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Globe className="size-6" />
                </div>
              </div>

              {/* Stat 3: Upcoming Trips */}
              <div className="flex items-center justify-between rounded-[6px] border border-[#f0f0f2] bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <span className="text-[14px] text-muted-foreground">Upcoming Trips</span>
                  <div className="mt-2 text-[32px] font-bold text-ink">2</div>
                </div>
                <div className="flex size-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <TrendingUp className="size-6" />
                </div>
              </div>

              {/* Stat 4: Total Spent */}
              <div className="flex items-center justify-between rounded-[6px] border border-[#f0f0f2] bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <span className="text-[14px] text-muted-foreground">Total Spent</span>
                  <div className="mt-2 text-[32px] font-bold text-ink">$15,750</div>
                </div>
                <div className="flex size-14 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <DollarSign className="size-6" />
                </div>
              </div>
            </div>

            {/* Past Completed Adventures */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-semibold text-ink">Recent Adventures</h3>
                <span className="text-[14px] text-brand font-medium">View All (12)</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  {
                    name: "Swiss Alpine Retreat",
                    country: "Switzerland",
                    date: "October 2025",
                    spent: "$1,850",
                    status: "Completed",
                    image: "/images/destinations/image3.png",
                  },
                  {
                    name: "Machu Picchu Ancient Citadel",
                    country: "Peru",
                    date: "July 2025",
                    spent: "$2,100",
                    status: "Completed",
                    image: "/images/destinations/image4.png",
                  },
                  {
                    name: "Maldives Coral Reef Haven",
                    country: "Maldives",
                    date: "January 2025",
                    spent: "$2,450",
                    status: "Completed",
                    image: "/images/destinations/image5.png",
                  },
                ].map((trip, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-[6px] border border-[#f0f0f2] bg-white hover:border-stone-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-20 overflow-hidden rounded-[4px] bg-stone-100">
                        <Image
                          src={trip.image}
                          alt={trip.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink text-[15px]">{trip.name}</h4>
                        <p className="text-xs text-muted-foreground">{trip.country} • {trip.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        {trip.status}
                      </span>
                      <p className="mt-1 text-xs font-medium text-ink">{trip.spent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Wishlist */}
            <div className="mt-10">
              <h3 className="text-[20px] font-semibold text-ink">Saved to Wishlist</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Bora Bora Overwater Bungalows",
                    country: "French Polynesia",
                    price: "$2,700",
                    image: "/images/destinations/image2.png",
                  },
                  {
                    name: "Arizona Grand Canyon Trek",
                    country: "USA",
                    price: "$1,400",
                    image: "/images/destinations/image6.png",
                  },
                ].map((wish, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-[6px] border border-[#f0f0f2] bg-white"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[4px] bg-stone-100">
                      <Image
                        src={wish.image}
                        alt={wish.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-ink text-sm truncate">{wish.name}</h4>
                      <p className="text-xs text-muted-foreground">{wish.country}</p>
                      <p className="text-xs font-semibold text-brand mt-1">{wish.price} / person</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
