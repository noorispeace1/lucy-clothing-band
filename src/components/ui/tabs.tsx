"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-6 border-b border-neutral-200 pb-px",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-3 py-2 text-xs uppercase font-medium tracking-[0.2em] transition-all relative",
              isActive
                ? "text-black font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black"
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
