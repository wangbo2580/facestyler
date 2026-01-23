"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Hairstyle, HairstyleStyle, HairstyleLength } from "@/types/hairstyle";
import { HairstyleCard } from "./HairstyleCard";
import { HairstyleModal } from "./HairstyleModal";
import { Button } from "@/components/ui/button";

interface HairstyleGalleryProps {
  hairstyles: Hairstyle[];
  title?: string;
  showFilters?: boolean;
}

export function HairstyleGallery({
  hairstyles,
  title,
  showFilters = true,
}: HairstyleGalleryProps) {
  const t = useTranslations("gallery");
  const [selectedStyle, setSelectedStyle] = useState<HairstyleStyle | "all">("all");
  const [selectedLength, setSelectedLength] = useState<HairstyleLength | "all">("all");
  const [selectedHairstyle, setSelectedHairstyle] = useState<Hairstyle | null>(null);

  const styleOptions: { value: HairstyleStyle | "all"; labelKey: string }[] = [
    { value: "all", labelKey: "allStyles" },
    { value: "casual", labelKey: "casual" },
    { value: "formal", labelKey: "formal" },
    { value: "trendy", labelKey: "trendy" },
    { value: "classic", labelKey: "classic" },
  ];

  const lengthOptions: { value: HairstyleLength | "all"; labelKey: string }[] = [
    { value: "all", labelKey: "allLengths" },
    { value: "short", labelKey: "short" },
    { value: "medium", labelKey: "medium" },
    { value: "long", labelKey: "long" },
  ];

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
            {styleOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedStyle === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(option.value)}
              >
                {t(option.labelKey)}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {lengthOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedLength === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLength(option.value)}
              >
                {t(option.labelKey)}
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
            {t("noMatches")}
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
