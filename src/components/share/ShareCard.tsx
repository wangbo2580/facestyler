"use client";

import React, { useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Download, Share2, Link, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaceShape } from "@/types/hairstyle";

interface ShareCardProps {
  faceShape: FaceShape;
  confidence: number;
  imageUrl?: string | null;
}

export function ShareCard({ faceShape, confidence, imageUrl }: ShareCardProps) {
  const t = useTranslations("result");
  const tCommon = useTranslations("common");
  const tShapes = useTranslations("faceShapes");
  const locale = useLocale();
  const cardRef = useRef<HTMLDivElement>(null);

  const shapeName = tShapes(`${faceShape}.name`);
  const characteristics = tShapes.raw(`${faceShape}.characteristics`) as string[];
  const celebrities = tShapes.raw(`${faceShape}.celebrities`) as string[];

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `facestyler-${faceShape}-result.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  }, [faceShape]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  }, []);

  const handleShareTwitter = useCallback(() => {
    const text = locale === "zh"
      ? `我刚刚发现我的脸型是${shapeName}！在这里找到你的完美发型：`
      : `I just discovered my face shape is ${shapeName}! Find your perfect hairstyle at`;
    const url = encodeURIComponent(window.location.origin);
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
      "_blank"
    );
  }, [shapeName, locale]);

  const handleShareFacebook = useCallback(() => {
    const url = encodeURIComponent(window.location.origin);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Share Card Preview */}
      <div
        ref={cardRef}
        className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4 text-center">
          <h3 className="text-xl font-bold">FaceStyler</h3>
          <p className="text-sm opacity-90">{t("title")}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Image Placeholder */}
          {imageUrl ? (
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
              <img
                src={imageUrl}
                alt="Your photo"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 mb-4 flex items-center justify-center ring-4 ring-primary/20">
              <span className="text-4xl">👤</span>
            </div>
          )}

          {/* Face Shape Result */}
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">{t("faceShapeIs")}</p>
            <h2 className="text-3xl font-bold text-primary mt-1">
              {shapeName}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {tCommon("confidence", { percent: Math.round(confidence * 100) })}
            </p>
          </div>

          {/* Key Characteristics */}
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-sm mb-2">
              {locale === "zh" ? "主要特征：" : "Key Characteristics:"}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {characteristics.slice(0, 3).map((char, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Celebrities */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {locale === "zh" ? "拥有相同脸型的明星：" : "Celebrities with your face shape: "}
            </span>
            <span className="font-medium">
              {celebrities.slice(0, 2).join(", ")}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted/50 p-3 text-center">
          <p className="text-xs text-muted-foreground">
            facestyler.com • {locale === "zh" ? "找到你的完美发型" : "Find your perfect hairstyle"}
          </p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          {tCommon("download")}
        </Button>
        <Button
          variant="outline"
          onClick={handleCopyLink}
          className="flex items-center gap-2"
        >
          <Link className="w-4 h-4" />
          {locale === "zh" ? "复制链接" : "Copy Link"}
        </Button>
        <Button
          variant="outline"
          onClick={handleShareTwitter}
          className="flex items-center gap-2"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          onClick={handleShareFacebook}
          className="flex items-center gap-2"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>
      </div>
    </div>
  );
}
