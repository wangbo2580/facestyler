"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairstyleGallery } from "@/components/hairstyle/HairstyleGallery";
import { ShareCard } from "@/components/share/ShareCard";
import { FACE_SHAPES } from "@/lib/constants/faceShapes";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";
import { FaceShape, Gender, Hairstyle } from "@/types/hairstyle";
import { DetectionResult } from "@/types/detection";

interface StoredResult extends DetectionResult {
  imageUrl?: string | null;
  gender?: Gender;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([]);
  const [showManualSelect, setShowManualSelect] = useState(false);

  useEffect(() => {
    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem("detectionResult");
    if (storedResult) {
      const parsed: StoredResult = JSON.parse(storedResult);
      setResult(parsed);

      // Load hairstyles for detected face shape
      const styles = getHairstylesForFaceShape(
        parsed.faceShape,
        parsed.gender || "female"
      );
      setHairstyles(styles);
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

    const styles = getHairstylesForFaceShape(shape, result.gender || "female");
    setHairstyles(styles);

    sessionStorage.setItem("detectionResult", JSON.stringify(newResult));
    setShowManualSelect(false);
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No detection result found</p>
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const faceShapeInfo = FACE_SHAPES[result.faceShape];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Result Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Detection Result */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Your Result</h1>
                <p className="text-muted-foreground">
                  Based on AI analysis of your photo
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
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
                  Your face shape is
                </p>
                <h2 className="text-3xl font-bold text-primary capitalize">
                  {faceShapeInfo.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {Math.round(result.confidence * 100)}% confidence
                </p>
              </div>
            </div>

            {/* Face Shape Info */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm">{faceShapeInfo.description}</p>
            </div>

            {/* Celebrities */}
            <div className="text-sm">
              <span className="text-muted-foreground">Celebrities: </span>
              <span>{faceShapeInfo.celebrities.join(", ")}</span>
            </div>

            {/* Manual Selection */}
            <div className="mt-6 pt-6 border-t">
              <button
                className="text-sm text-primary hover:underline flex items-center gap-1"
                onClick={() => setShowManualSelect(!showManualSelect)}
              >
                <Info className="w-4 h-4" />
                Not accurate? Select manually
              </button>

              {showManualSelect && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(Object.keys(FACE_SHAPES) as FaceShape[]).map((shape) => (
                    <Button
                      key={shape}
                      variant={
                        result.faceShape === shape ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleFaceShapeSelect(shape)}
                      className="capitalize"
                    >
                      {shape}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Share Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Share Your Results</h3>
            <ShareCard
              faceShape={result.faceShape}
              confidence={result.confidence}
              imageUrl={result.imageUrl}
            />
          </div>
        </div>

        {/* Hairstyle Recommendations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended Hairstyles</h2>
            <span className="text-muted-foreground">
              {hairstyles.length} styles found
            </span>
          </div>

          <HairstyleGallery hairstyles={hairstyles} showFilters={true} />
        </section>

        {/* Tips Section */}
        <section className="mt-16 bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Styling Tips for {faceShapeInfo.name} Faces
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {faceShapeInfo.tips.map((tip, index) => (
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
