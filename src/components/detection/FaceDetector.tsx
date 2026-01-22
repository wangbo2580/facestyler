"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/upload/ImageUploader";
import { Button } from "@/components/ui/button";
import { detectFaceShapeSimple } from "@/lib/face-detection/faceShapeClassifier";
import { DetectionResult } from "@/types/detection";
import { FaceShape, Gender } from "@/types/hairstyle";
import { Sparkles, User, Users } from "lucide-react";

interface FaceDetectorProps {
  onDetectionComplete?: (result: DetectionResult) => void;
}

export function FaceDetector({ onDetectionComplete }: FaceDetectorProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState<Gender>("female");
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);

  const handleImageSelect = useCallback(async (file: File, imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsLoading(true);

    // Create an image element to get dimensions
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Use simplified detection for now
      const result = detectFaceShapeSimple(img.width, img.height);
      setDetectionResult(result);
      setIsLoading(false);

      if (onDetectionComplete) {
        onDetectionComplete(result);
      }
    };
  }, [onDetectionComplete]);

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setDetectionResult(null);
  }, []);

  const handleViewResults = useCallback(() => {
    if (detectionResult) {
      // Store result in sessionStorage for the result page
      sessionStorage.setItem("detectionResult", JSON.stringify({
        ...detectionResult,
        imageUrl: selectedImage,
        gender,
      }));
      router.push("/result");
    }
  }, [detectionResult, selectedImage, gender, router]);

  const handleSelectFaceShape = useCallback((shape: FaceShape) => {
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

    if (onDetectionComplete) {
      onDetectionComplete(result);
    }
  }, [onDetectionComplete]);

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
          Female
        </Button>
        <Button
          variant={gender === "male" ? "default" : "outline"}
          size="lg"
          onClick={() => setGender("male")}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Male
        </Button>
      </div>

      {/* Image Upload */}
      <ImageUploader
        onImageSelect={handleImageSelect}
        onClear={handleClear}
        selectedImage={selectedImage}
        isLoading={isLoading}
      />

      {/* Detection Result Preview */}
      {detectionResult && !isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-medium">
              Your face shape: <span className="text-primary capitalize">{detectionResult.faceShape}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              ({Math.round(detectionResult.confidence * 100)}% confidence)
            </span>
          </div>

          <div className="mt-6">
            <Button size="xl" onClick={handleViewResults}>
              View Hairstyle Recommendations
            </Button>
          </div>
        </div>
      )}

      {/* Manual Selection Option */}
      {!selectedImage && (
        <div className="mt-8">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Or select your face shape manually:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(["oval", "round", "square", "heart", "oblong", "diamond"] as FaceShape[]).map(
              (shape) => (
                <Button
                  key={shape}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectFaceShape(shape)}
                  className="capitalize"
                >
                  {shape}
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
