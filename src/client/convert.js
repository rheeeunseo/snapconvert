// Browser-side converter: Canvas fast path for images, ffmpeg.wasm for everything else
import { FORMATS, ffmpegArgs, isCanvasPath, normalizeExt, catOf } from '../lib/formats.mjs';

const $ = (id) => document.getElementById(id);
const root = $('converter'); if (!root) throw new Error('no converter');
const fixedFrom = root.dataset.from || null;
const list = $('file-list'), status = $('status'), input = $('file-input'), drop = $('drop');
const fmtSize = (b) => b > 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b > 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.round(b / 1e3) + ' KB';

let ffmpeg = null, loading = null;
async function getFFmpeg() {
  if (ffmpeg) return ffmpeg;
  if (loading) return loading;
  loading = (async () => {
    status.textContent = 'Loading conversion engine (32 MB, one time)…';
    const { FFmpeg } = await import('../vendor/ffmpeg/index.js');
    const f = new FFmpeg();
    f.on('log', ({ message }) => { if (/error|invalid|unsupported/i.test(message)) console.warn('[ffmpeg]', message); });
    const v = new URL('../vendor/ffmpeg/', import.meta.url).href;
    await f.load({ coreURL: v + 'ffmpeg-core.js', wasmURL: v + 'ffmpeg-core.wasm' });
    status.textContent = 'Engine ready.';
    ffmpeg = f; return f;
  })();
  return loading;
}

async function convertCanvas(file, to, quality) {
  const bmp = await createImageBitmap(file).catch(async () => {
    // SVG / formats createImageBitmap rejects: draw via <img>
    const url = URL.createObjectURL(file); const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    URL.revokeObjectURL(url); return img;
  });
  const w = bmp.naturalWidth || bmp.width, h = bmp.naturalHeight || bmp.height;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  if (to === 'jpg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); } // JPG has no alpha
  ctx.drawImage(bmp, 0, 0);
  const q = { high: 0.95, medium: 0.85, small: 0.7 }[quality];
  const mime = to === 'jpg' ? 'image/jpeg' : to === 'webp' ? 'image/webp' : 'image/png';
  const blob = await new Promise((res) => c.toBlob(res, mime, q));
  if (!blob) throw new Error('Browser could not encode ' + to.toUpperCase());
  return blob;
}

async function convertFFmpeg(file, from, to, quality, onProgress) {
  const f = await getFFmpeg();
  const inName = 'in.' + (from || 'bin'), outName = 'out.' + to;
  f.on('progress', onProgress);
  try {
    await f.writeFile(inName, new Uint8Array(await file.arrayBuffer()));
    const rc = await f.exec(['-i', inName, '-y', ...ffmpegArgs(to, quality), outName]);
    if (rc !== 0) throw new Error('Conversion failed (ffmpeg exit ' + rc + '). The file may be corrupted or use an unsupported codec.');
    const data = await f.readFile(outName);
    return new Blob([data.buffer], { type: FORMATS[to]?.mime || 'application/octet-stream' });
  } finally {
    f.off('progress', onProgress);
    await f.deleteFile(inName).catch(() => {}); await f.deleteFile(outName).catch(() => {});
  }
}

let queue = Promise.resolve();
function addFiles(files) {
  for (const file of files) {
    const from = normalizeExt(file.name), to = $('to-fmt').value, quality = $('quality').value;
    const row = document.createElement('div'); row.className = 'file';
    row.innerHTML = `<div class="name" title="${file.name}">${file.name}</div><div class="size">${fmtSize(file.size)}</div><div class="status">Queued</div><div class="bar"><i></i></div>`;
    list.prepend(row);
    const st = row.querySelector('.status'), bar = row.querySelector('.bar i');
    queue = queue.then(async () => {
      const t0 = Date.now();
      try {
        if (!FORMATS[from]) throw new Error('Unknown input format .' + from);
        if (from === to) throw new Error('Source and target are the same format');
        if (file.size > 2e9) throw new Error('Files over 2 GB are not supported in the browser');
        st.textContent = 'Converting…';
        let blob;
        if (isCanvasPath(from, to)) { bar.style.width = '50%'; blob = await convertCanvas(file, to, quality); }
        else {
          if (catOf(from) === 'video' && file.size > 300e6) status.textContent = 'Large video: this can take several minutes. Keep this tab open.';
          blob = await convertFFmpeg(file, from, to, quality, ({ progress }) => { const p = Math.max(0, Math.min(1, progress)); bar.style.width = (p * 100).toFixed(0) + '%'; st.textContent = 'Converting ' + (p * 100).toFixed(0) + '%'; });
        }
        bar.style.width = '100%';
        const outName = file.name.replace(/\.[^.]+$/, '') + '.' + to;
        const url = URL.createObjectURL(blob);
        st.innerHTML = '';
        const a = document.createElement('a'); a.href = url; a.download = outName; a.className = 'btn'; a.style.padding = '8px 14px'; a.style.fontSize = '14px'; a.textContent = `Download ${to.toUpperCase()} (${fmtSize(blob.size)})`;
        st.appendChild(a);
        a.click(); // auto-download; the button stays for re-download
        status.textContent = `Done in ${((Date.now() - t0) / 1000).toFixed(1)} s — ${fmtSize(file.size)} → ${fmtSize(blob.size)}`;
        row.dataset.done = '1';
      } catch (e) {
        st.textContent = '✖ ' + e.message; st.style.color = 'var(--warn)'; bar.style.width = '0'; console.error(e);
        status.textContent = 'Error: ' + e.message;
      }
    });
  }
}
input.addEventListener('change', () => { addFiles(input.files); input.value = ''; });
['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
drop.addEventListener('drop', (e) => addFiles(e.dataTransfer.files));
document.addEventListener('paste', (e) => { const fs = [...(e.clipboardData?.files || [])]; if (fs.length) addFiles(fs); });
// Pre-warm the engine for video/audio pages so the first conversion is faster
if (fixedFrom && catOf(fixedFrom) !== 'image' && 'requestIdleCallback' in window) requestIdleCallback(() => getFFmpeg().catch(() => {}));
window.__snapconvert = { addFiles, getFFmpeg }; // for tests
