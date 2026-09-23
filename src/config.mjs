export const config = {
  siteName: 'SnapConvert',
  tagline: 'Free online file converter — private, fast, no upload',
  // Custom domain (GitHub Pages, CNAME file at repo root). No trailing slash.
  siteUrl: process.env.SITE_URL || 'https://snapconvertapp.com',
  basePath: process.env.BASE_PATH ?? '',
  lang: 'en',
  contactEmail: '1122yukh@gmail.com',
  adsenseClient: process.env.ADSENSE_CLIENT || '',
  adsenseSlots: { top: '', inArticle: '', bottom: '' },
  googleSiteVerification: process.env.GOOGLE_VERIFICATION || '',
  bingSiteVerification: process.env.BING_VERIFICATION || '',
  // IndexNow (Bing/Yandex 즉시 색인 요청). 키 파일: src/public/<key>.txt
  indexNowKey: '5d45847d4aeab0ddfe80762b19c8352a',
};
