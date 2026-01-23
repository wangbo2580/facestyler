"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ImageUploader } from "@/components/upload/ImageUploader";
import { Button } from "@/components/ui/button";
import {
  detectFaceShape,
  initializeFaceLandmarker,
  isMediaPipeReady,
} from "@/lib/face-detection/mediapipeDetector";
import { DetectionResult } from "@/types/detection";
import { FaceShape, Gender } from "@/types/hairstyle";
import { Sparkles, User, Users, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  trackPhotoUpload,
  trackDetectionSuccess,
  trackDetectionError,
  trackViewRecommendations,
  trackModelLoadTime,
  trackDetectionTime,
  trackManualFaceShapeSelect,
} from "@/lib/analytics";

interface FaceDetectorProps {
  onDetectionComplete?: (result: DetectionResult) => void;
}

const FACE_SHAPE_KEYS: FaceShape[] = [
  "oval",
  "round",
  "square",
  "heart",
  "oblong",
  "diamond",
];

export function FaceDetector({ onDetectionComplete }: FaceDetectorProps) {
  const t = useTranslations("detector");
  const tShapes = useTranslations("faceShapes");
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [gender, setGender] = useState<Gender>("female");
  // ethnicity功能暂时禁用，等图片库扩充后再启用
  // const [ethnicity, setEthnicity] = useState<Ethnicity>("asian");
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Preload MediaPipe model on component mount
  useEffect(() => {
    if (!isMediaPipeReady()) {
      setIsModelLoading(true);
      const startTime = Date.now();

      initializeFaceLandmarker()
        .then(() => {
          const loadTime = Date.now() - startTime;
          trackModelLoadTime(loadTime); // 📊 追踪模型加载时间
          setIsModelLoading(false);
        })
        .catch((err) => {
          console.error("Failed to preload MediaPipe:", err);
          setIsModelLoading(false);
        });
    }
  }, []);

  const handleImageSelect = useCallback(
    async (file: File, imageUrl: string) => {
      trackPhotoUpload(); // 📊 追踪照片上传
      setSelectedImage(imageUrl);
      setIsLoading(true);
      setError(null);
      setDetectionResult(null);

      // Create a canvas to draw the image (avoids CORS issues with blob URLs)
      const img = new Image();

      img.onload = async () => {
        const detectionStartTime = Date.now();

        try {
          // Create a canvas to ensure the image is properly loaded
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Failed to get canvas context");
          }

          ctx.drawImage(img, 0, 0);

          // Detect face shape using the canvas
          const result = await detectFaceShape(canvas);
          const detectionTime = Date.now() - detectionStartTime;

          trackDetectionTime(detectionTime); // 📊 追踪检测耗时
          trackDetectionSuccess(result.faceShape, result.confidence); // 📊 追踪检测成功

          setDetectionResult(result);

          if (onDetectionComplete) {
            onDetectionComplete(result);
          }
        } catch (err) {
          console.error("Face detection failed:", err);
          let errorType = "unknown";

          if (err instanceof Error) {
            if (err.message.includes("No face detected")) {
              setError(t("noFaceDetected"));
              errorType = "no_face";
            } else {
              setError(t("detectionError"));
              errorType = "detection_failed";
            }
          } else {
            setError(t("detectionError"));
            errorType = "unknown_error";
          }

          trackDetectionError(errorType); // 📊 追踪检测失败
        } finally {
          setIsLoading(false);
        }
      };

      img.onerror = (e) => {
        console.error("Image load error:", e);
        setError(t("imageLoadError"));
        trackDetectionError("image_load_error"); // 📊 追踪图片加载失败
        setIsLoading(false);
      };

      // Load the image - don't set crossOrigin for blob/data URLs
      img.src = imageUrl;
    },
    [onDetectionComplete, t]
  );

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setDetectionResult(null);
    setError(null);
  }, []);

  const handleViewResults = useCallback(() => {
    if (detectionResult) {
      sessionStorage.setItem(
        "detectionResult",
        JSON.stringify({
          ...detectionResult,
          imageUrl: selectedImage,
          gender,
          // ethnicity暂时不传，等图片库扩充后再启用
        })
      );
      router.push("/result");
    }
  }, [detectionResult, selectedImage, gender, router]);

  const handleSelectFaceShape = useCallback(
    (shape: FaceShape) => {
      trackManualFaceShapeSelect(shape); // 📊 追踪手动选择脸型

      const result: DetectionResult = {
        faceShape: shape,
        confidence: 1.0,
        measurements: {
          faceLength: 0,
          faceWidth: 0,
          jawWidth: 0,
          foreheadWidth: 0,
          jawAngle: 0,
        },
      };
      setDetectionResult(result);
      setError(null);

      if (onDetectionComplete) {
        onDetectionComplete(result);
      }
    },
    [onDetectionComplete]
  );

  return (
    <div className="w-full">
      {/* Gender Selection */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={gender === "female" ? "default" : "outline"}
          size="lg"
          onClick={() => setGender("female")}
          className="flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          {t("female")}
        </Button>
        <Button
          variant={gender === "male" ? "default" : "outline"}
          size="lg"
          onClick={() => setGender("male")}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          {t("male")}
        </Button>
      </div>

      {/* Ethnicity Selection - MVP阶段暂时隐藏，图片库扩充到300+后再启用 */}
      {/* <div className="flex justify-center gap-2 mb-6">
        <Globe className="w-4 h-4 text-muted-foreground mt-2" />
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={ethnicity === "asian" ? "default" : "outline"}
            size="sm"
            onClick={() => setEthnicity("asian")}
          >
            亚洲
          </Button>
          <Button
            variant={ethnicity === "caucasian" ? "default" : "outline"}
            size="sm"
            onClick={() => setEthnicity("caucasian")}
          >
            欧美
          </Button>
          <Button
            variant={ethnicity === "african" ? "default" : "outline"}
            size="sm"
            onClick={() => setEthnicity("african")}
          >
            非洲
          </Button>
          <Button
            variant={ethnicity === "hispanic" ? "default" : "outline"}
            size="sm"
            onClick={() => setEthnicity("hispanic")}
          >
            拉美
          </Button>
          <Button
            variant={ethnicity === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setEthnicity("all")}
          >
            全部
          </Button>
        </div>
      </div> */}

      {/* Model Loading Indicator */}
      {isModelLoading && (
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{t("loadingModel")}</span>
        </div>
      )}

      {/* Image Upload */}
      <ImageUploader
        onImageSelect={handleImageSelect}
        onClear={handleClear}
        selectedImage={selectedImage}
        isLoading={isLoading}
      />

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Detection Result Preview */}
      {detectionResult && !isLoading && (
        <div className="mt-8">
          {/* Face Shape Result */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {t("yourFaceShape")}{" "}
                <span className="text-primary">
                  {tShapes(`${detectionResult.faceShape}.name`)}
                </span>
              </span>
              <span className="text-sm text-muted-foreground">
                ({Math.round(detectionResult.confidence * 100)}%)
              </span>
            </div>

            {detectionResult.secondaryShape && (
              <p className="mt-2 text-sm text-muted-foreground">
                {t("secondaryShape")}{" "}
                {tShapes(`${detectionResult.secondaryShape}.name`)}
              </p>
            )}
          </div>

          {/* Detailed Analysis */}
          {detectionResult.analysis && (
            <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 text-left max-w-xl mx-auto">
              <h3 className="font-semibold text-lg mb-4">脸型分析详情</h3>

              {/* Confidence Explanation */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">可信度说明：</span>
                  {detectionResult.analysis.confidenceExplanation}
                </p>
              </div>

              {/* Characteristics */}
              <div className="space-y-2">
                <p className="font-medium text-sm text-gray-700 mb-2">您的面部特征：</p>
                <ul className="space-y-2">
                  {detectionResult.analysis.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Measurements */}
              <details className="mt-4 text-sm text-gray-500">
                <summary className="cursor-pointer hover:text-gray-700">
                  查看技术数据
                </summary>
                <div className="mt-2 space-y-1 pl-4">
                  <p>长宽比: {detectionResult.analysis.lengthWidthRatio.toFixed(2)}</p>
                  <p>下颌比例: {detectionResult.analysis.jawRatio.toFixed(2)}</p>
                  <p>额头比例: {detectionResult.analysis.foreheadRatio.toFixed(2)}</p>
                  <p>下颌角度: {detectionResult.analysis.jawAngle.toFixed(1)}°</p>
                </div>
              </details>
            </div>
          )}

          {/* View Recommendations Button */}
          <div className="mt-6 text-center">
            <Button size="xl" onClick={handleViewResults}>
              {t("viewRecommendations")}
            </Button>
          </div>
        </div>
      )}

      {/* Manual Selection Option */}
      {!selectedImage && (
        <div className="mt-8">
          <p className="text-center text-sm text-muted-foreground mb-4">
            {t("selectManually")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {FACE_SHAPE_KEYS.map((shape) => (
              <Button
                key={shape}
                variant="outline"
                size="sm"
                onClick={() => handleSelectFaceShape(shape)}
              >
                {tShapes(`${shape}.name`)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
