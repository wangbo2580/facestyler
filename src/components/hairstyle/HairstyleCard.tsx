"use client";

import React from "react";
import { Hairstyle } from "@/types/hairstyle";
import { cn } from "@/lib/utils/cn";

interface HairstyleCardProps {
  hairstyle: Hairstyle;
  onClick?: () => void;
}

export function HairstyleCard({ hairstyle, onClick }: HairstyleCardProps) {
  return (
    <div
      className={cn(
        "hairstyle-card cursor-pointer group",
        onClick && "hover:ring-2 hover:ring-primary"
      )}
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        {/* Placeholder image with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <span className="text-4xl">💇‍♀️</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

        {/* Style badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium bg-white/90 rounded-full capitalize">
            {hairstyle.style}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-1">{hairstyle.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground capitalize">
            {hairstyle.length}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground capitalize">
            {hairstyle.style}
          </span>
        </div>
      </div>
    </div>
  );
}
