import { Metadata } from "next";
import { FaceShape } from "@/types/hairstyle";

export const BASE_URL = "https://www.hairstyleforme.com";

export function generateFaceShapeMetadata(
  locale: string,
  faceShape: FaceShape,
  shapeName: string,
  translations: {
    title: string;
    description: string;
  }
): Metadata {
  const slug = `hairstyle-for-${faceShape}-face`;

  return {
    title: translations.title,
    description: translations.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        en: `${BASE_URL}/en/${slug}`,
        zh: `${BASE_URL}/zh/${slug}`,
      },
    },
    openGraph: {
      title: translations.title,
      description: translations.description,
      url: `${BASE_URL}/${locale}/${slug}`,
      siteName: "FaceStyler",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "article",
      images: [
        {
          url: `${BASE_URL}/og-${faceShape}-face.png`,
          width: 1200,
          height: 630,
          alt: translations.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: translations.title,
      description: translations.description,
      images: [`${BASE_URL}/og-${faceShape}-face.png`],
    },
    keywords: [
      `${faceShape} face hairstyle`,
      `best hairstyle for ${faceShape} face`,
      `${shapeName} face shape`,
      `haircut for ${faceShape} face`,
      "face shape hairstyle",
      "hairstyle recommendations",
    ],
  };
}

export function generateStaticMetadata(
  locale: string,
  page: string,
  translations: {
    title: string;
    description: string;
  }
): Metadata {
  return {
    title: translations.title,
    description: translations.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${page}`,
      languages: {
        en: `${BASE_URL}/en/${page}`,
        zh: `${BASE_URL}/zh/${page}`,
      },
    },
    openGraph: {
      title: translations.title,
      description: translations.description,
      url: `${BASE_URL}/${locale}/${page}`,
      siteName: "FaceStyler",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: translations.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: translations.title,
      description: translations.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}
