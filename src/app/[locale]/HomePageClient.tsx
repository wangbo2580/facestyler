"use client";

import { useTranslations, useLocale } from "next-intl";
import { Upload, Sparkles, Search, ArrowRight } from "lucide-react";
import { FaceDetector } from "@/components/detection/FaceDetector";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FACE_SHAPE_ROUTES } from "@/lib/constants/faceShapes";
import { HowToSchema, SoftwareApplicationSchema } from "@/components/seo/JsonLd";

export default function HomePage() {
  const t = useTranslations("home");
  const tShapes = useTranslations("faceShapes");
  const locale = useLocale();

  const faceShapeKeys = ["oval", "round", "square", "heart", "oblong", "diamond"] as const;

  const howToSteps = [
    {
      name: locale === "zh" ? "上传照片" : "Upload Photo",
      text: t("step1Desc"),
    },
    {
      name: locale === "zh" ? "AI分析" : "AI Analysis",
      text: t("step2Desc"),
    },
    {
      name: locale === "zh" ? "获取推荐" : "Get Recommendations",
      text: t("step3Desc"),
    },
  ];

  return (
    <>
      <HowToSchema
        name={locale === "zh" ? "如何找到适合你脸型的发型" : "How to Find the Best Hairstyle for Your Face Shape"}
        description={locale === "zh"
          ? "使用AI脸型检测工具，上传照片即可获得个性化发型推荐"
          : "Use AI face shape detection to upload your photo and get personalized hairstyle recommendations"
        }
        steps={howToSteps}
        totalTime="PT2M"
      />
      <SoftwareApplicationSchema />
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
            {t("badge")}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("subtitle")}
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
          <h2 className="text-3xl font-bold text-center mb-12">{t("howItWorks")}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("step1Title")}</h3>
              <p className="text-muted-foreground">
                {t("step1Desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("step2Title")}</h3>
              <p className="text-muted-foreground">
                {t("step2Desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("step3Title")}</h3>
              <p className="text-muted-foreground">
                {t("step3Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Face Shape */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t("browseByShape")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("browseByShapeDesc")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {faceShapeKeys.map((key) => (
              <Link
                key={key}
                href={FACE_SHAPE_ROUTES[key]}
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
                  {tShapes(`${key}.name`)}
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
            <span className="font-medium">{t("privacyFirst")}</span>
          </div>
          <p className="text-green-600">
            {t("privacyDesc")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("ctaDesc")}
          </p>
          <Button size="xl" className="gap-2" asChild>
            <a href="#top">
              {t("ctaTitle").split("?")[0]}? <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}
