"use client";

import React, { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelect: (file: File, imageUrl: string) => void;
  onClear: () => void;
  selectedImage: string | null;
  isLoading?: boolean;
}

export function ImageUploader({
  onImageSelect,
  onClear,
  selectedImage,
  isLoading = false,
}: ImageUploaderProps) {
  const t = useTranslations("detector");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert(t("errorImageType"));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(t("errorFileSize"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageSelect(file, imageUrl);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  if (selectedImage) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex flex-col items-center text-white">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <span className="mt-4 text-sm">{t("analyzing")}</span>
              </div>
            </div>
          )}
        </div>
        {!isLoading && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        className={cn(
          "upload-zone flex flex-col items-center justify-center min-h-[300px]",
          isDragging && "active"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-lg font-semibold mb-2">{t("uploadTitle")}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t("uploadDesc")}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon className="w-4 h-4" />
            <span>{t("fileTypes")}</span>
          </div>
        </div>
      </label>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
          {t("localProcessing")}
        </p>
      </div>
    </div>
  );
}
