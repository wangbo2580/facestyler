import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.hairstyleforme.com";

  const faceShapePages = [
    "hairstyle-for-oval-face",
    "hairstyle-for-round-face",
    "hairstyle-for-square-face",
    "hairstyle-for-heart-face",
    "hairstyle-for-oblong-face",
    "hairstyle-for-diamond-face",
  ];

  const staticPages = ["about", "privacy"];

  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale
  for (const locale of locales) {
    // Home page
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    });

    // Face shape pages
    for (const page of faceShapePages) {
      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/${page}`])
          ),
        },
      });
    }

    // Static pages
    for (const page of staticPages) {
      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: page === "about" ? 0.5 : 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/${page}`])
          ),
        },
      });
    }
  }

  return urls;
}
