import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// Face shape page routes - need to be defined for each locale
export const localizedFaceShapeRoutes = {
  en: {
    oval: '/hairstyle-for-oval-face',
    round: '/hairstyle-for-round-face',
    square: '/hairstyle-for-square-face',
    heart: '/hairstyle-for-heart-face',
    oblong: '/hairstyle-for-oblong-face',
    diamond: '/hairstyle-for-diamond-face'
  },
  zh: {
    oval: '/hairstyle-for-oval-face',
    round: '/hairstyle-for-round-face',
    square: '/hairstyle-for-square-face',
    heart: '/hairstyle-for-heart-face',
    oblong: '/hairstyle-for-oblong-face',
    diamond: '/hairstyle-for-diamond-face'
  }
};
