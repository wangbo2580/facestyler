"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairstyleGallery } from "@/components/hairstyle/HairstyleGallery";
import { ShareCard } from "@/components/share/ShareCard";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";
import { FaceShape, Gender, Hairstyle } from "@/types/hairstyle";
import { DetectionResult } from "@/types/detection";
import { Link, useRouter } from "@/i18n/navigation";
import { trackViewRecommendations } from "@/lib/analytics";

interface StoredResult extends DetectionResult {
  imageUrl?: string | null;
  gender?: Gender;
  // ethnicity暂时不用，等图片库扩充后再启用
}

const FACE_SHAPE_KEYS: FaceShape[] = ["oval", "round", "square", "heart", "oblong", "diamond"];

export default function ResultPage() {
  const t = useTranslations("result");
  const tCommon = useTranslations("common");
  const tShapes = useTranslations("faceShapes");
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([]);
  const [showManualSelect, setShowManualSelect] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("detectionResult");
    if (storedResult) {
      const parsed: StoredResult = JSON.parse(storedResult);
      setResult(parsed);

      // MVP阶段不使用ethnicity过滤，返回该脸型下的所有发型
      const styles = getHairstylesForFaceShape(
        parsed.faceShape,
        parsed.gender || "female"
      );
      setHairstyles(styles);

      // 📊 追踪查看推荐（核心转化事件）
      trackViewRecommendations(
        parsed.faceShape,
        parsed.gender || "female",
        styles.length
      );
    }
  }, []);

  const handleFaceShapeSelect = (shape: FaceShape) => {
    if (!result) return;

    const newResult: StoredResult = {
      ...result,
      faceShape: shape,
      confidence: 1.0,
    };
    setResult(newResult);

    // MVP阶段不使用ethnicity过滤
    const styles = getHairstylesForFaceShape(
      shape,
      result.gender || "female"
    );
    setHairstyles(styles);

    sessionStorage.setItem("detectionResult", JSON.stringify(newResult));
    setShowManualSelect(false);
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{t("noResultFound")}</p>
          <Button asChild>
            <Link href="/">{tCommon("backToHome")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const faceShapeName = tShapes(`${result.faceShape}.name`);
  const faceShapeDesc = tShapes(`${result.faceShape}.description`);
  const celebrities = tShapes.raw(`${result.faceShape}.celebrities`) as string[];
  const tips = tShapes.raw(`${result.faceShape}.tips`) as string[];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tCommon("backToHome")}
        </Link>

        {/* Result Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Detection Result */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
                <p className="text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {tCommon("tryAgain")}
              </Button>
            </div>

            {/* Face Shape Display */}
            <div className="flex items-center gap-6 mb-6">
              {result.imageUrl ? (
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={result.imageUrl}
                    alt="Your photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center ring-4 ring-primary/20">
                  <span className="text-4xl">👤</span>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">
                  {t("faceShapeIs")}
                </p>
                <h2 className="text-3xl font-bold text-primary">
                  {faceShapeName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tCommon("confidence", { percent: Math.round(result.confidence * 100) })}
                </p>
              </div>
            </div>

            {/* Face Shape Info */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm">{faceShapeDesc}</p>
            </div>

            {/* Detailed Analysis */}
            {result.analysis && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-sm mb-2">详细分析</h3>
                <p className="text-xs text-blue-800 mb-3">
                  {result.analysis.confidenceExplanation}
                </p>
                <ul className="space-y-1.5">
                  {result.analysis.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Celebrities */}
            <div className="text-sm">
              <span className="text-muted-foreground">{t("celebrities")} </span>
              <span>{celebrities.join(", ")}</span>
            </div>

            {/* Manual Selection */}
            <div className="mt-6 pt-6 border-t">
              <button
                className="text-sm text-primary hover:underline flex items-center gap-1"
                onClick={() => setShowManualSelect(!showManualSelect)}
              >
                <Info className="w-4 h-4" />
                {t("notAccurate")}
              </button>

              {showManualSelect && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {FACE_SHAPE_KEYS.map((shape) => (
                    <Button
                      key={shape}
                      variant={
                        result.faceShape === shape ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleFaceShapeSelect(shape)}
                    >
                      {tShapes(`${shape}.name`)}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Share Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("shareTitle")}</h3>
            <ShareCard
              faceShape={result.faceShape}
              confidence={result.confidence}
              imageUrl={result.imageUrl}
            />
          </div>
        </div>

        {/* Hairstyle Recommendations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{t("recommendedTitle")}</h2>
            <span className="text-muted-foreground">
              {tCommon("stylesFound", { count: hairstyles.length })}
            </span>
          </div>

          {/* Library Notice */}
          {hairstyles.length === 0 && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <span className="font-medium">正在扩充发型库：</span>
                当前该脸型下暂无发型数据。我们正在持续收集更多高质量发型图片。
              </p>
            </div>
          )}

          <HairstyleGallery hairstyles={hairstyles} showFilters={true} />
        </section>

        {/* Tips Section */}
        <section className="mt-16 bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            {t("tipsTitle", { shape: faceShapeName })}
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-3 bg-white rounded-lg p-4"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
