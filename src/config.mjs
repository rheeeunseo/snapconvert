export const config = {
  siteName: 'SnapConvert',
  tagline: 'Free online file converter — private, fast, no upload',
  // TODO: custom domain later (e.g. https://snapconvert.app). No trailing slash.
  siteUrl: process.env.SITE_URL || 'https://rheeeunseo.github.io',
  basePath: process.env.BASE_PATH ?? '/snapconvert',
  lang: 'en',
  contactEmail: '1122yukh@gmail.com',
  adsenseClient: process.env.ADSENSE_CLIENT || '',
  adsenseSlots: { top: '', inArticle: '', bottom: '' },
  googleSiteVerification: '',
  bingSiteVerification: '',
};
