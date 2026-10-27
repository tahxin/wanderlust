"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please enter both email and password.");
      return;
    }

    alert("Signed in successfully!");
    router.push("/destinations");
  };

  return (
    <section className="min-h-screen bg-[#fafbfc] pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h1 className="font-heading text-[44px] leading-tight font-normal text-ink md:text-[56px]">
            Welcome Back
          </h1>
          <p className="mt-2 text-[16px] text-muted-foreground">
            Resume your adventure with Wanderlust
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[480px] rounded-[6px] border border-[#f0f0f2] bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-[14px] font-medium text-ink">
                Email Address
              </Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 size-4 text-muted-foreground z-10" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 bg-[#f8fafc] pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="login-password" className="text-[14px] font-medium text-ink">
                Password
              </Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 size-4 text-muted-foreground z-10" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="h-12 bg-[#f8fafc] pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[14px]">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground select-none">
                <input
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
                  className="size-4 rounded border-gray-300 text-brand focus:ring-brand"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset link sent to your email!")}
                className="font-medium text-brand hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="mt-2 h-12 w-full bg-brand text-[15px] font-semibold text-white hover:bg-brand/90"
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-7 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-4 text-[13px] text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => alert("Google sign in initialized")}
            className="h-12 w-full gap-3 border-gray-200 font-semibold text-ink hover:bg-gray-50"
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
            Sign In With Google
          </Button>

          <p className="mt-8 text-center text-[14px] text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-brand hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
