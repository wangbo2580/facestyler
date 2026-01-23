"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Shield, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function AboutPageClient() {
  const t = useTranslations("about");

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t("storyTitle")}</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>{t("storyP1")}</p>
            <p className="mt-4">{t("storyP2")}</p>
            <p className="mt-4">{t("storyP3")}</p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{t("whyTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("feature1Title")}</h3>
              <p className="text-muted-foreground">{t("feature1Desc")}</p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("feature2Title")}</h3>
              <p className="text-muted-foreground">{t("feature2Desc")}</p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("feature3Title")}</h3>
              <p className="text-muted-foreground">{t("feature3Desc")}</p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("feature4Title")}</h3>
              <p className="text-muted-foreground">{t("feature4Desc")}</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t("howTitle")}</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold">{t("how1Title")}</h3>
                <p className="text-muted-foreground">{t("how1Desc")}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">{t("how2Title")}</h3>
                <p className="text-muted-foreground">{t("how2Desc")}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold">{t("how3Title")}</h3>
                <p className="text-muted-foreground">{t("how3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4">{t("ctaTitle")}</h2>
          <p className="text-muted-foreground mb-8">{t("ctaDesc")}</p>
          <Button size="xl" asChild>
            <Link href="/">{t("ctaButton")}</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
