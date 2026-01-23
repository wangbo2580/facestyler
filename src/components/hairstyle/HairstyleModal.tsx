"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { X, Check, Scissors } from "lucide-react";
import { Hairstyle } from "@/types/hairstyle";
import { Button } from "@/components/ui/button";

interface HairstyleModalProps {
  hairstyle: Hairstyle;
  onClose: () => void;
}

export function HairstyleModal({ hairstyle, onClose }: HairstyleModalProps) {
  const t = useTranslations("modal");
  const tGallery = useTranslations("gallery");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-[3/4] relative bg-muted">
            {hairstyle.image ? (
              <img
                src={hairstyle.image}
                alt={hairstyle.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-6xl">💇‍♀️</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {tGallery(hairstyle.style)}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-muted rounded-full">
                {tGallery(hairstyle.length)}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-4">{hairstyle.name}</h2>

            <p className="text-muted-foreground mb-6">{hairstyle.description}</p>

            {/* Styling Tips */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Scissors className="w-4 h-4" />
                {t("stylingTips")}
              </h3>
              <ul className="space-y-2">
                {hairstyle.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable For */}
            {hairstyle.suitableFor && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">{t("bestFor")}</h3>
                <div className="flex flex-wrap gap-2">
                  {hairstyle.suitableFor.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-muted rounded-full capitalize"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Maintenance Level */}
            {hairstyle.maintenanceLevel && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t("maintenance")}</span>
                <span className="capitalize font-medium">
                  {hairstyle.maintenanceLevel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
