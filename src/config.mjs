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
  googleSiteVerification: '',
  bingSiteVerification: '',
};
