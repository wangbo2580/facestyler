"use client";

import Link from "next/link";
import { Upload, Sparkles, Search, ArrowRight } from "lucide-react";
import { FaceDetector } from "@/components/detection/FaceDetector";
import { Button } from "@/components/ui/button";
import { FACE_SHAPES, FACE_SHAPE_ROUTES } from "@/lib/constants/faceShapes";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Face Shape Detection
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Hairstyle
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Upload a photo and let AI detect your face shape. Get personalized
            hairstyle recommendations that suit you perfectly.
          </p>

          {/* Face Detector */}
          <div className="max-w-lg mx-auto">
            <FaceDetector />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Upload Photo</h3>
              <p className="text-muted-foreground">
                Upload a clear photo of your face or take a selfie with your
                camera
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your facial features to determine your face
                shape
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Get Recommendations</h3>
              <p className="text-muted-foreground">
                Browse curated hairstyles that are perfect for your face shape
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Face Shape */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Browse by Face Shape
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Already know your face shape? Explore hairstyles curated for each
            face shape.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(FACE_SHAPES).map(([key, shape]) => (
              <Link
                key={key}
                href={FACE_SHAPE_ROUTES[key as keyof typeof FACE_SHAPE_ROUTES]}
                className="group p-6 rounded-xl bg-white border hover:border-primary hover:shadow-lg transition-all text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">
                    {key === "oval" && "⬭"}
                    {key === "round" && "⬤"}
                    {key === "square" && "⬛"}
                    {key === "heart" && "♥"}
                    {key === "oblong" && "⬯"}
                    {key === "diamond" && "◆"}
                  </span>
                </div>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {shape.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="py-12 px-4 bg-green-50 border-y border-green-100">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-green-700 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-medium">Privacy First</span>
          </div>
          <p className="text-green-600">
            Your photos are processed entirely in your browser. They are never
            uploaded to our servers, ensuring complete privacy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Perfect Style?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Thousands of users have already discovered their ideal hairstyles.
            It's free, quick, and completely private.
          </p>
          <Button size="xl" className="gap-2" asChild>
            <a href="#top">
              Get Started <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
