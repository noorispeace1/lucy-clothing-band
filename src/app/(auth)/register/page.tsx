"use client";
import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block group mb-6">
          <span className="font-serif text-3xl sm:text-4xl tracking-[0.3em] font-normal text-black block">
            {siteConfig.name}
          </span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#b38e5d] block mt-1">
            VIP Atelier Membership
          </span>
        </Link>
        <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider text-neutral-900">
          JOIN THE LUCY PRIVILEGE CIRCLE
        </h2>
        <p className="mt-2 text-xs text-neutral-500 tracking-wide">
          Unlock 10% welcome privilege, priority booking, and custom tailoring consultations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-neutral-200 sm:px-10">
          {submitted ? (
            <div className="text-center space-y-4 py-6">
              <span className="text-[#b38e5d] text-2xl font-serif">Welcome to LUCY</span>
              <p className="text-xs text-neutral-600">
                Your account has been registered. You have been granted premier tier access.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-block px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-semibold"
                >
                  DISCOVER COLLECTIONS
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Sharmin Sultana"
              />

              <Input
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="sharmin@example.com"
              />

              <Input
                label="Phone Number"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+880 1700-000000"
              />

              <Input
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Create a secure password"
              />

              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                CREATE ACCOUNT
              </button>

              <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-600">
                <span>Already registered? </span>
                <Link
                  href="/login"
                  className="font-semibold text-black underline underline-offset-4 hover:text-[#b38e5d]"
                >
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
