"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairstyleGallery } from "@/components/hairstyle/HairstyleGallery";
import { FaceShape, Hairstyle } from "@/types/hairstyle";
import { FACE_SHAPES, FACE_SHAPE_ROUTES } from "@/lib/constants/faceShapes";
import { useState } from "react";

interface FaceShapePageProps {
  faceShape: FaceShape;
  hairstyles: Hairstyle[];
  faqs: { question: string; answer: string }[];
}

export function FaceShapePage({
  faceShape,
  hairstyles,
  faqs,
}: FaceShapePageProps) {
  const info = FACE_SHAPES[faceShape];
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const otherShapes = Object.entries(FACE_SHAPES).filter(
    ([key]) => key !== faceShape
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Hairstyles for {info.name} Face Shape
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most flattering hairstyles for your {info.name.toLowerCase()} face.
              Our expert-curated collection features {hairstyles.length}+ styles
              that will complement your features perfectly.
            </p>
          </div>

          <div className="flex justify-center">
            <Button size="xl" asChild>
              <Link href="/" className="flex items-center gap-2">
                Try Our Free Face Shape Analyzer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is this face shape */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            What is a {info.name} Face Shape?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {info.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Key Characteristics</h3>
              <ul className="space-y-3">
                {info.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm flex-shrink-0">
                      ✓
                    </span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Celebrity Examples</h3>
              <p className="text-muted-foreground mb-4">
                These celebrities have {info.name.toLowerCase()} face shapes:
              </p>
              <div className="flex flex-wrap gap-2">
                {info.celebrities.map((celeb, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm border"
                  >
                    {celeb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hairstyle Gallery */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Top {hairstyles.length} Hairstyles for {info.name} Faces
          </h2>
          <HairstyleGallery hairstyles={hairstyles} showFilters={true} />
        </div>
      </section>

      {/* Styling Tips */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Styling Tips for {info.name} Faces
          </h2>
          <div className="grid gap-4">
            {info.tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 border"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-lg">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-medium hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Face Shapes */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Explore Other Face Shapes</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {otherShapes.map(([key, shape]) => (
              <Link
                key={key}
                href={FACE_SHAPE_ROUTES[key as keyof typeof FACE_SHAPE_ROUTES]}
                className="p-6 rounded-xl bg-white border hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {shape.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Face Shape</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Not Sure About Your Face Shape?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Use our free AI-powered face shape analyzer to discover your face
            shape in seconds. It's completely free and your photo never leaves
            your device.
          </p>
          <Button size="xl" asChild>
            <Link href="/" className="flex items-center gap-2">
              Analyze Your Face Shape
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
