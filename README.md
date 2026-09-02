# SnapConvert — free in-browser file converter

Static site. Video/audio conversion uses a vendored build of ffmpeg.wasm (`src/public/vendor/ffmpeg`, single-thread core, 32 MB), images use the Canvas API. No server, no uploads.

```bash
node build.mjs            # → dist/ (~200 pages)
node scripts/serve.mjs    # http://localhost:8080/snapconvert/  (BASE_PATH=/snapconvert)
```

- `src/lib/formats.mjs` — format registry, ffmpeg arguments, conversion pairs (shared by build and browser)
- `src/client/convert.js` — converter widget logic
- `src/pages/convert.mjs` — programmatic `/convert/{from}-to-{to}/` pages, hubs, all-list
- `src/config.mjs` — site URL, base path, AdSense, contact

Monetization: AdSense (apply after indexing) — global traffic. Launch checklist: custom domain → set `SITE_URL`, clear `BASE_PATH`, add `CNAME`; Google Search Console + Bing Webmaster; submit sitemap.

Note: ffmpeg.wasm single-thread is ~0.5–2× realtime for video; multithread needs COOP/COEP headers (not available on GitHub Pages; Cloudflare Pages `_headers` could enable it later).
