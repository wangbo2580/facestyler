"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPageClient() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
        <p className="text-muted-foreground mb-8">{t("lastUpdated")}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("overviewTitle")}</h2>
            <p className="text-muted-foreground">{t("overviewDesc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("photoTitle")}</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <p className="text-green-800 font-medium">{t("photoHighlight")}</p>
            </div>
            <p className="text-muted-foreground">{t("photoDesc")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              <li>{t("photoPoint1")}</li>
              <li>{t("photoPoint2")}</li>
              <li>{t("photoPoint3")}</li>
              <li>{t("photoPoint4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("collectTitle")}</h2>
            <h3 className="text-xl font-semibold mb-3">{t("analyticsTitle")}</h3>
            <p className="text-muted-foreground mb-4">{t("analyticsDesc")}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>{t("analyticsPoint1")}</li>
              <li>{t("analyticsPoint2")}</li>
              <li>{t("analyticsPoint3")}</li>
              <li>{t("analyticsPoint4")}</li>
            </ul>
            <p className="text-muted-foreground mt-4">{t("analyticsNote")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("notCollectTitle")}</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>{t("notCollectPoint1")}</li>
              <li>{t("notCollectPoint2")}</li>
              <li>{t("notCollectPoint3")}</li>
              <li>{t("notCollectPoint4")}</li>
              <li>{t("notCollectPoint5")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("cookiesTitle")}</h2>
            <p className="text-muted-foreground">{t("cookiesDesc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("thirdPartyTitle")}</h2>
            <p className="text-muted-foreground mb-4">{t("thirdPartyDesc")}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Google Analytics:</strong> {t("thirdPartyGA")}
              </li>
              <li>
                <strong>Google AdSense:</strong> {t("thirdPartyAds")}
              </li>
              <li>
                <strong>Vercel:</strong> {t("thirdPartyVercel")}
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">{t("thirdPartyNote")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("adsTitle")}</h2>
            <p className="text-muted-foreground">{t("adsDesc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("childrenTitle")}</h2>
            <p className="text-muted-foreground">{t("childrenDesc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("changesTitle")}</h2>
            <p className="text-muted-foreground">{t("changesDesc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("contactTitle")}</h2>
            <p className="text-muted-foreground">{t("contactDesc")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
