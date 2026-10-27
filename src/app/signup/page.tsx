"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(`Account created successfully for ${form.name}! Welcome to Wanderlust.`);
    router.push("/destinations");
  };

  return (
    <section className="min-h-screen bg-[#fafbfc] pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-heading text-[44px] leading-tight font-normal text-ink md:text-[56px]">
            Create Account
          </h1>
          <p className="mt-2 text-[16px] text-muted-foreground">
            Start your adventure with Wanderlust
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto mt-10 w-full max-w-[480px] rounded-[6px] border border-[#f0f0f2] bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[14px] font-medium text-ink">
                Full Name
              </label>
              <div className="relative mt-2 flex items-center">
                <User className="absolute left-3.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12 w-full rounded-[4px] border border-gray-200 bg-[#f8fafc] pr-4 pl-10 text-[15px] text-ink placeholder:text-[#adb2b6] outline-none transition-colors focus:border-brand focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[14px] font-medium text-ink">
                Email Address
              </label>
              <div className="relative mt-2 flex items-center">
                <Mail className="absolute left-3.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 w-full rounded-[4px] border border-gray-200 bg-[#f8fafc] pr-4 pl-10 text-[15px] text-ink placeholder:text-[#adb2b6] outline-none transition-colors focus:border-brand focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[14px] font-medium text-ink">
                Password
              </label>
              <div className="relative mt-2 flex items-center">
                <Lock className="absolute left-3.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="h-12 w-full rounded-[4px] border border-gray-200 bg-[#f8fafc] pr-4 pl-10 text-[15px] text-ink placeholder:text-[#adb2b6] outline-none transition-colors focus:border-brand focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[14px] font-medium text-ink">
                Confirm Password
              </label>
              <div className="relative mt-2 flex items-center">
                <Lock className="absolute left-3.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="h-12 w-full rounded-[4px] border border-gray-200 bg-[#f8fafc] pr-4 pl-10 text-[15px] text-ink placeholder:text-[#adb2b6] outline-none transition-colors focus:border-brand focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-[4px] bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand/90"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-4 text-[13px] text-muted-foreground">
              Or sign up with
            </span>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={() => alert("Google sign in initialized")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-[4px] border border-gray-200 bg-white text-[14px] font-semibold text-ink transition-colors hover:bg-gray-50"
          >
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign Up With Google
          </button>

          <p className="mt-8 text-center text-[14px] text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
