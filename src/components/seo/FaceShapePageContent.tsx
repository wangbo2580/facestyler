"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairstyleGallery } from "@/components/hairstyle/HairstyleGallery";
import { FaceShape, Hairstyle } from "@/types/hairstyle";
import { FACE_SHAPE_ROUTES } from "@/lib/constants/faceShapes";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/metadata";

interface FaceShapePageContentProps {
  faceShape: FaceShape;
  hairstyles: Hairstyle[];
}

const ALL_FACE_SHAPES: FaceShape[] = ["oval", "round", "square", "heart", "oblong", "diamond"];

export function FaceShapePageContent({
  faceShape,
  hairstyles,
}: FaceShapePageContentProps) {
  const t = useTranslations("faceShapePage");
  const tShapes = useTranslations("faceShapes");
  const tFaqs = useTranslations("faqs");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const otherShapes = ALL_FACE_SHAPES.filter((s) => s !== faceShape);
  const shapeName = tShapes(`${faceShape}.name`);
  const description = tShapes(`${faceShape}.description`);
  const characteristics = tShapes.raw(`${faceShape}.characteristics`) as string[];
  const celebrities = tShapes.raw(`${faceShape}.celebrities`) as string[];
  const tips = tShapes.raw(`${faceShape}.tips`) as string[];
  const faqs = tFaqs.raw(faceShape) as { question: string; answer: string }[];

  const breadcrumbItems = [
    { name: tCommon("home"), url: `${BASE_URL}/${locale}` },
    { name: tCommon("faceShapes"), url: `${BASE_URL}/${locale}` },
    { name: shapeName, url: `${BASE_URL}/${locale}/hairstyle-for-${faceShape}-face` },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("heroTitle", { shape: shapeName })}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("heroDesc", { shape: shapeName.toLowerCase(), count: hairstyles.length })}
            </p>
          </div>

          <div className="flex justify-center">
            <Button size="xl" asChild>
              <Link href="/" className="flex items-center gap-2">
                {t("tryCta")}
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
            {t("whatIsTitle", { shape: shapeName })}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4">{t("characteristics")}</h3>
              <ul className="space-y-3">
                {characteristics.map((char, index) => (
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
              <h3 className="font-semibold mb-4">{t("celebrities")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("celebritiesDesc", { shape: shapeName.toLowerCase() })}
              </p>
              <div className="flex flex-wrap gap-2">
                {celebrities.map((celeb, index) => (
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
            {t("galleryTitle", { shape: shapeName, count: hairstyles.length })}
          </h2>
          <HairstyleGallery hairstyles={hairstyles} showFilters={true} />
        </div>
      </section>

      {/* Styling Tips */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {t("tipsTitle", { shape: shapeName })}
          </h2>
          <div className="grid gap-4">
            {tips.map((tip, index) => (
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
          <h2 className="text-3xl font-bold mb-8">{t("faqTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-8">{t("exploreOthers")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {otherShapes.map((key) => (
              <Link
                key={key}
                href={FACE_SHAPE_ROUTES[key]}
                className="p-6 rounded-xl bg-white border hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {tShapes(`${key}.name`)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {tShapes(`${key}.name`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("notSureTitle")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("notSureDesc")}
          </p>
          <Button size="xl" asChild>
            <Link href="/" className="flex items-center gap-2">
              {t("analyzeCta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}
