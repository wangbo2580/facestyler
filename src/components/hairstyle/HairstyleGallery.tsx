"use client";

import React, { useState, useMemo } from "react";
import { Hairstyle, HairstyleStyle, HairstyleLength } from "@/types/hairstyle";
import { HairstyleCard } from "./HairstyleCard";
import { HairstyleModal } from "./HairstyleModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface HairstyleGalleryProps {
  hairstyles: Hairstyle[];
  title?: string;
  showFilters?: boolean;
}

const STYLE_OPTIONS: { value: HairstyleStyle | "all"; label: string }[] = [
  { value: "all", label: "All Styles" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "trendy", label: "Trendy" },
  { value: "classic", label: "Classic" },
];

const LENGTH_OPTIONS: { value: HairstyleLength | "all"; label: string }[] = [
  { value: "all", label: "All Lengths" },
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export function HairstyleGallery({
  hairstyles,
  title,
  showFilters = true,
}: HairstyleGalleryProps) {
  const [selectedStyle, setSelectedStyle] = useState<HairstyleStyle | "all">("all");
  const [selectedLength, setSelectedLength] = useState<HairstyleLength | "all">("all");
  const [selectedHairstyle, setSelectedHairstyle] = useState<Hairstyle | null>(null);

  const filteredHairstyles = useMemo(() => {
    return hairstyles.filter((h) => {
      if (selectedStyle !== "all" && h.style !== selectedStyle) return false;
      if (selectedLength !== "all" && h.length !== selectedLength) return false;
      return true;
    });
  }, [hairstyles, selectedStyle, selectedLength]);

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={selectedStyle === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {LENGTH_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={selectedLength === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLength(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredHairstyles.map((hairstyle) => (
          <HairstyleCard
            key={hairstyle.id}
            hairstyle={hairstyle}
            onClick={() => setSelectedHairstyle(hairstyle)}
          />
        ))}
      </div>

      {filteredHairstyles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hairstyles match your filters. Try adjusting your selection.
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedHairstyle && (
        <HairstyleModal
          hairstyle={selectedHairstyle}
          onClose={() => setSelectedHairstyle(null)}
        />
      )}
    </div>
  );
}
