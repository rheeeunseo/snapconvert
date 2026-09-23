import { POPULAR, allPairs, FORMATS } from '../lib/formats.mjs';
import { esc, base, ad, widget, fmtGrid, breadcrumb, faqHtml, faqJsonld } from '../lib/html.mjs';

const home = ({ config }) => {
  const faq = [
    { q: 'Is this converter really free?', a: 'Yes. There is no premium tier, no watermark and no daily limit. The site is supported by ads.' },
    { q: 'Where are my files processed?', a: 'On your own device. The page downloads a WebAssembly build of ffmpeg once and then converts locally. Nothing is uploaded, which is also why there is no size limit and no waiting queue.' },
    { q: 'Which browsers work?', a: 'Any recent Chrome, Edge, Firefox or Safari on desktop or mobile. Video conversion is much faster on a desktop computer.' },
    { q: 'Why does the first video conversion take a moment to start?', a: 'The 32 MB conversion engine has to download once. It is cached afterwards, so later conversions start immediately.' },
  ];
  return {
    path: '/', priority: 1.0,
    title: `${config.siteName} — Free Online File Converter (Video, Audio, Image), No Upload`,
    description: `Convert video, audio and image files for free directly in your browser. MOV to MP4, MKV to MP4, M4A to MP3, WEBP to PNG and ${allPairs().length - 4}+ more. No upload, no limits, no sign-up.`,
    scripts: ['convert.js'],
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: config.siteName, url: config.siteUrl + base + '/' }, faqJsonld(faq)],
    content: `<h1>Convert any file, right in your browser</h1><p class="lead">Video, audio and images. Nothing is uploaded, so it is private, fast and free of limits.</p>
${widget()}
${ad('top')}
<h2>Popular conversions</h2>${fmtGrid(POPULAR)}
<h2>Why people switch to ${config.siteName}</h2>
<ul><li><strong>Private by design.</strong> Typical online converters upload your file to their servers and keep it for hours. Here the conversion happens on your device using ffmpeg compiled to WebAssembly. A screen recording of your bank account or a voice memo from your doctor never leaves your computer.</li><li><strong>No queue, no limits.</strong> Because there is no server, there is no free-tier queue, no 100 MB cap and no "upgrade to convert faster" prompt.</li><li><strong>Works offline.</strong> After the page loads once, you can convert with the internet switched off.</li></ul>
<h2>Browse by type</h2><div class="pill-list"><a href="${base}/video-converter/">Video converter</a><a href="${base}/audio-converter/">Audio converter</a><a href="${base}/image-converter/">Image converter</a><a href="${base}/all/">All ${allPairs().length} conversions</a></div>
${faqHtml(faq)}`,
  };
};
const about = ({ config }) => ({ path: '/about/', priority: 0.3, title: 'About', description: `${config.siteName} is a free, private file converter that runs entirely in your browser.`, content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: 'About' }])}<h1>About ${config.siteName}</h1><p>${config.siteName} converts video, audio and image files without uploading them anywhere. It uses <a href="https://ffmpegwasm.netlify.app/" rel="noopener" target="_blank">ffmpeg.wasm</a>, a WebAssembly port of the open-source ffmpeg project, plus the browser's own image codecs.</p><h2>How it is funded</h2><p>The site shows ads from Google AdSense. There are no paid tiers and no data is sold; there is no data to sell because files never reach us.</p><h2>Limitations</h2><ul><li>Processing speed depends on your device. Phones are slower than laptops.</li><li>Files are limited by browser memory (about 2 GB).</li><li>DRM-protected media cannot be converted.</li></ul><p>Contact: <a href="mailto:${config.contactEmail}">${config.contactEmail}</a></p>` });
const privacy = ({ config }) => ({ path: '/privacy/', priority: 0.2, title: 'Privacy Policy', description: `${config.siteName} privacy policy: files are processed locally and never uploaded.`, content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: 'Privacy' }])}<h1>Privacy Policy</h1><p>Last updated: September 2, 2026</p><h2>Your files</h2><p>All conversions are performed inside your web browser. Files you select are never transmitted to ${config.siteName} or any third party. We have no access to their contents, names or metadata.</p><h2>Cookies and advertising</h2><p>${config.siteName} uses Google AdSense to display ads. Google and its partners may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" rel="noopener" target="_blank">Google Ads Settings</a>. Visitors in the EEA and UK will be asked for consent as required by law.</p><h2>Analytics</h2><p>${config.gaId ? `We use Google Analytics to count page views and see which converters are used. It records your truncated IP address, browser and the pages you visit; the files you convert are never part of that data. You can opt out with the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener" target="_blank">Google Analytics opt-out add-on</a>.` : `We may use privacy-respecting analytics to count page views. No personal data is stored.`}</p><h2>Contact</h2><p><a href="mailto:${config.contactEmail}">${config.contactEmail}</a></p>` });
const contact = ({ config }) => ({ path: '/contact/', priority: 0.2, title: 'Contact', description: `Contact ${config.siteName} for bug reports and format requests.`, content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: 'Contact' }])}<h1>Contact</h1><p>Found a file that will not convert, or need a format we do not support yet? Email us.</p><p><a class="btn" href="mailto:${config.contactEmail}">${config.contactEmail}</a></p><p class="muted">Please do not attach private files; describe the format and the error message instead.</p>` });
export const pages = [home, about, privacy, contact];
