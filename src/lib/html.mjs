import { config } from '../config.mjs';
import { FORMATS, CATS, targetsFor, catOf } from './formats.mjs';
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const base = config.basePath;
export function ad(slot = 'inArticle') {
  if (!config.adsenseClient) return process.env.AD_PLACEHOLDER ? `<div class="ad" data-slot="${slot}">Ad space (${slot})</div>` : '';
  const id = config.adsenseSlots[slot]; if (!id) return '';
  return `<div class="ad live"><ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsenseClient}" data-ad-slot="${id}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
}
export const faqHtml = (faq) => faq?.length ? `<section class="faq"><h2>Frequently asked questions</h2>${faq.map((q) => `<details><summary>${esc(q.q)}</summary><p>${q.a}</p></details>`).join('')}</section>` : '';
export const faqJsonld = (faq) => faq?.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a.replace(/<[^>]+>/g, '') } })) } : null;
export const appJsonld = ({ name, description, url }) => ({ '@context': 'https://schema.org', '@type': 'WebApplication', name, description, url, applicationCategory: 'MultimediaApplication', operatingSystem: 'Any (browser)', browserRequirements: 'Requires JavaScript and WebAssembly', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } });
export const breadcrumb = (items) => `<div class="breadcrumb">${items.map((i) => i.href ? `<a href="${base}${i.href}">${esc(i.name)}</a>` : esc(i.name)).join(' › ')}</div>`;
export const fmtLink = (from, to) => `<a href="${base}/convert/${from}-to-${to}/">${FORMATS[from].name} to ${FORMATS[to].name}</a>`;
export const fmtGrid = (pairs) => `<div class="fmt-grid">${pairs.map(([f, t]) => fmtLink(f, t)).join('')}</div>`;

/** Converter widget. from = fixed source format or null (any); to = preset target or null */
export function widget({ from = null, to = null, accept = null } = {}) {
  const cat = from ? catOf(from) : null;
  const targets = from ? targetsFor(from) : Object.keys(FORMATS).filter((f) => f !== 'svg' && f !== 'avif' && f !== 'wma' && f !== 'm4v' && f !== 'flv' && f !== 'wmv' && f !== '3gp' && f !== 'mpg' && f !== 'ts');
  const acceptAttr = accept || (from ? `.${from}${from === 'jpg' ? ',.jpeg' : from === 'tiff' ? ',.tif' : ''}` : 'video/*,audio/*,image/*');
  return `<div class="card" id="converter" data-from="${from || ''}" data-to="${to || ''}">
<label class="drop" id="drop"><input type="file" id="file-input" multiple accept="${acceptAttr}">
<div class="big-icon">📂</div><div class="t">${from ? `Drop your ${FORMATS[from].name} file${from === 'jpg' ? '' : 's'} here` : 'Drop files here'}</div><div class="d">or click to browse · runs in your browser, nothing is uploaded</div></label>
<div class="opts">
<div class="field"><label for="to-fmt">Convert to</label><select id="to-fmt">${targets.map((t) => `<option value="${t}"${t === to ? ' selected' : ''}>${FORMATS[t].name}${cat ? '' : ' (' + CATS[FORMATS[t].cat] + ')'}</option>`).join('')}</select></div>
<div class="field"><label for="quality">Quality</label><select id="quality"><option value="high">High (larger file)</option><option value="medium" selected>Medium</option><option value="small">Small file</option></select></div>
</div>
<div class="file-list" id="file-list"></div>
<div class="status-line" id="status">Ready. ${cat === 'image' || !from ? 'Images convert instantly;' : ''} video and audio use a one-time 32 MB engine download.</div>
<div class="badges"><span class="badge">100% private</span><span class="badge">No upload</span><span class="badge">No file size limit*</span><span class="badge">Free, no sign-up</span></div>
</div>`;
}
