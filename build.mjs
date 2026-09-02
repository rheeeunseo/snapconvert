import { mkdir, rm, readFile, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './src/config.mjs';
import { pages } from './src/pages/index.mjs';
import { convertPage, hubPage, allPage } from './src/pages/convert.mjs';
import { allPairs } from './src/lib/formats.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const layout = await readFile(path.join(ROOT, 'src/layout.html'), 'utf8');
const urls = [];
function render(page) {
  const canonical = config.siteUrl + config.basePath + page.path;
  const jsonld = [].concat(page.jsonld || []).filter(Boolean).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n');
  const verification = [config.googleSiteVerification && `<meta name="google-site-verification" content="${config.googleSiteVerification}">`, config.bingSiteVerification && `<meta name="msvalidate.01" content="${config.bingSiteVerification}">`].filter(Boolean).join('\n');
  const adsenseHead = config.adsenseClient ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsenseClient}" crossorigin="anonymous"></script>` : '';
  const scripts = (page.scripts || []).map((s) => `<script type="module" src="${config.basePath}/js/${s}"></script>`).join('\n');
  const vars = { title: page.title.includes(config.siteName) ? page.title : `${page.title} | ${config.siteName}`, description: page.description, canonical, siteName: config.siteName, tagline: config.tagline, base: config.basePath, year: new Date().getFullYear(), content: page.content, jsonld, verification, adsenseHead, scripts };
  return layout.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? String(vars[k]) : ''));
}
async function emit(page) {
  const outDir = path.join(DIST, page.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), render(page));
  urls.push({ loc: config.siteUrl + config.basePath + page.path, priority: page.priority ?? 0.6 });
}
const t0 = Date.now();
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(path.join(ROOT, 'src/public'), DIST, { recursive: true });
await cp(path.join(ROOT, 'src/client'), path.join(DIST, 'js'), { recursive: true });
await mkdir(path.join(DIST, 'lib'), { recursive: true });
await cp(path.join(ROOT, 'src/lib/formats.mjs'), path.join(DIST, 'lib/formats.mjs'));
const ctx = { config };
let n = 0;
for (const p of pages) { await emit(p(ctx)); n++; }
for (const cat of ['video', 'audio', 'image']) { await emit(hubPage(ctx, cat)); n++; }
await emit(allPage(ctx)); n++;
for (const [from, to] of allPairs()) { await emit(convertPage(ctx, from, to)); n++; }
await writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}${config.basePath}/sitemap.xml\n`);
await writeFile(path.join(DIST, '404.html'), render({ path: '/404/', title: 'Page not found', description: 'This page does not exist.', content: `<h1>Page not found</h1><p><a href="${config.basePath}/">Back to home</a></p>` }));
if (existsSync(path.join(ROOT, 'CNAME'))) await cp(path.join(ROOT, 'CNAME'), path.join(DIST, 'CNAME'));
await writeFile(path.join(DIST, '.nojekyll'), '');
console.log(`✔ ${n} pages → dist/ (${Date.now() - t0}ms) base="${config.basePath}" url=${config.siteUrl}`);
