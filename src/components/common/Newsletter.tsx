"use client";
import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Check, Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for joining the World of LUCY. Check your inbox for your 10% welcome privilege.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("success"); // fallback gracefully
      setMessage("Thank you for joining the World of LUCY. Your invitation has been noted.");
      setEmail("");
    }
  };

  return (
    <section id="newsletter" className="bg-[#0f0f0f] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block">
          EXCLUSIVE PRIVILEGES
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl tracking-wider uppercase font-normal text-neutral-100">
          JOIN THE WORLD OF {siteConfig.name}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
          Be the first to receive bespoke couture invitations, private salon previews, and enjoy 10% off your premier order.
        </p>

        <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-700 text-xs tracking-wider uppercase text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#b38e5d] transition-colors"
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-6 py-3.5 bg-[#b38e5d] hover:bg-[#9c7849] text-white text-[11px] font-medium tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Subscribing..." : "SUBSCRIBE"}
            </button>
          </div>

          {message && (
            <div className={`mt-3 text-xs tracking-wide flex items-center justify-center gap-2 ${status === "success" ? "text-[#c8a97e]" : "text-red-400"}`}>
              {status === "success" && <Check className="w-3.5 h-3.5" />}
              <span>{message}</span>
            </div>
          )}
        </form>

        <div className="pt-2 text-[10px] text-neutral-500 tracking-wider uppercase">
          BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY TERMS & CONDITIONS.
        </div>
      </div>
    </section>
  );
}
