import { FORMATS, CATS, catOf, targetsFor, allPairs, POPULAR, VIDEO_SOURCES, AUDIO_SOURCES, IMAGE_SOURCES, isCanvasPath } from '../lib/formats.mjs';
import { esc, base, ad, faqHtml, faqJsonld, appJsonld, breadcrumb, widget, fmtGrid, fmtLink } from '../lib/html.mjs';

const N = (f) => FORMATS[f].name;
const catNoun = { video: 'video', audio: 'audio', image: 'image' };

function whyConvert(from, to) {
  const fc = catOf(from), tc = catOf(to);
  if (fc === 'video' && tc === 'audio') return `Extracting the audio from a ${N(from)} video gives you a ${N(to)} file you can play in a music app, use as a ringtone, or edit in a podcast tool without the video overhead. A 500 MB video typically becomes a 5–10 MB ${N(to)}.`;
  if (fc === 'video' && to === 'gif') return `Turning a short ${N(from)} clip into a GIF lets you share it anywhere GIFs are accepted: chat apps, forums, documentation and email, with no play button and instant looping. Keep clips under 10 seconds for a reasonable file size.`;
  if (fc === 'video') return `${N(from)} files ${from === 'mov' ? 'from iPhones and Macs' : from === 'mkv' ? 'downloaded from the web' : from === 'webm' ? 'recorded by browsers and screen recorders' : 'from older cameras and software'} often will not play or upload where you need them. ${N(to)} is ${to === 'mp4' ? 'accepted by every phone, TV, editing app and website' : to === 'webm' ? 'the format browsers play natively and the smallest for web embedding' : to === 'mov' ? 'what Final Cut, iMovie and QuickTime expect' : to === 'mkv' ? 'ideal for archiving with subtitles and multiple audio tracks' : 'what legacy Windows tools and players expect'}.`;
  if (fc === 'audio') return `${N(from)} ${from === 'wav' || from === 'aiff' || from === 'flac' ? 'files are large' : 'files are not supported everywhere'}. Converting to ${N(to)} ${to === 'mp3' ? 'makes the file play on every device and shrinks it by up to 90%' : to === 'wav' || to === 'aiff' ? 'gives you an uncompressed file that editors, DAWs and mastering tools handle natively' : to === 'flac' ? 'keeps the audio lossless while roughly halving the size' : to === 'm4a' || to === 'aac' ? 'gives better quality per megabyte than MP3 and native support on Apple devices' : to === 'opus' ? 'produces the smallest files at a given quality, ideal for voice and messaging' : 'gives an open, patent-free file for games and Linux'}.`;
  if (fc === 'image' && to === 'gif') return `Converting a still ${N(from)} image to GIF gives you a file that legacy tools, forums and some chat apps accept where ${N(from)} is rejected. Note that GIF is limited to 256 colors.`;
  return `${N(from)} ${from === 'webp' || from === 'avif' ? 'is a modern web format that many upload forms, editors and older apps still reject' : from === 'svg' ? 'is a vector format that needs rasterizing before it can be used as a photo, thumbnail or upload' : from === 'tiff' || from === 'bmp' ? 'files are very large and not viewable in browsers' : from === 'png' ? 'files can be large for photos and are not accepted by some print or ID upload forms' : 'is the standard photo format, but it cannot hold transparency'}. ${N(to)} ${to === 'png' ? 'is lossless, keeps transparency and works everywhere' : to === 'jpg' ? 'is accepted by every website, app and printer and keeps file sizes small' : to === 'webp' ? 'cuts file size by 25–35% for faster websites' : to === 'ico' ? 'is what browsers and Windows need for favicons and app icons' : to === 'bmp' ? 'is uncompressed and readable by even the oldest software' : 'is the standard for print and archiving'}.`;
}

function faqFor(from, to) {
  const fast = isCanvasPath(from, to);
  const cat = catOf(from);
  return [
    { q: `Is it safe to convert ${N(from)} to ${N(to)} here?`, a: `Yes. The conversion runs entirely inside your browser using WebAssembly. Your file is never uploaded to a server, so nothing can leak, be stored or be seen by anyone. You can even disconnect from the internet after the page loads.` },
    { q: `How long does ${N(from)} to ${N(to)} conversion take?`, a: fast ? 'Images convert instantly, usually under a second even for large photos.' : cat === 'audio' ? 'Audio converts at roughly 20–50× real time, so a 5-minute song takes about 10 seconds after the one-time engine download.' : 'Video encoding in the browser runs at roughly 0.5–2× real time depending on your CPU and resolution. A 1-minute 1080p clip takes about 1–2 minutes. Long or 4K videos can take a while; a desktop computer is much faster than a phone.' },
    { q: `Is there a file size limit?`, a: 'There is no server-side limit because there is no server. The practical limit is your device memory: browsers can handle files up to about 2 GB. Very large videos work better on a desktop than a phone.' },
    { q: `Will the quality drop?`, a: to === 'wav' || to === 'aiff' || to === 'flac' || to === 'png' || to === 'bmp' || to === 'tiff' ? `${N(to)} is lossless, so no quality is lost relative to the source. It cannot recover detail that a lossy source already discarded.` : `${N(to)} is a lossy format, so a small amount of detail is discarded. At the default Medium setting the difference is invisible or inaudible for almost all content. Choose High for master copies or Small for messaging and web use.` },
    { q: `Can I convert several ${N(from)} files at once?`, a: 'Yes. Drop or select as many files as you like; they are converted one after another and each gets its own download button.' },
  ];
}

export function convertPage({ config }, from, to) {
  const f = FORMATS[from], t = FORMATS[to];
  const title = `${f.name} to ${t.name} Converter — Free, Online, No Upload`;
  const description = `Convert ${f.name} to ${t.name} for free in your browser. No upload, no sign-up, no file size limit. Private ${catNoun[catOf(from)]} conversion with ffmpeg in seconds.`;
  const faq = faqFor(from, to);
  const related = [...targetsFor(from).filter((x) => x !== to).slice(0, 6).map((x) => [from, x]), ...Object.keys(FORMATS).filter((x) => x !== from && catOf(x) === catOf(from) && targetsFor(x).includes(to)).slice(0, 6).map((x) => [x, to])];
  const path = `/convert/${from}-to-${to}/`;
  return {
    path, title, description, scripts: ['convert.js'], priority: POPULAR.some(([a, b]) => a === from && b === to) ? 0.9 : 0.7,
    jsonld: [appJsonld({ name: `${f.name} to ${t.name} Converter`, description, url: config.siteUrl + base + path }), faqJsonld(faq), { '@context': 'https://schema.org', '@type': 'HowTo', name: `How to convert ${f.name} to ${t.name}`, step: [{ '@type': 'HowToStep', text: `Drop your ${f.name} file onto the converter or click to select it.` }, { '@type': 'HowToStep', text: `Make sure ${t.name} is selected as the target format and choose a quality.` }, { '@type': 'HowToStep', text: `Wait for the conversion to finish and download your ${t.name} file.` }] }],
    content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: `${CATS[catOf(from)]} converter`, href: `/${catOf(from)}-converter/` }, { name: `${f.name} to ${t.name}` }])}
<h1>Convert ${f.name} to ${t.name}</h1>
<p class="lead">Free online ${f.name} to ${t.name} converter that runs in your browser. Your files stay on your device.</p>
${widget({ from, to })}
<h2>How to convert ${f.name} to ${t.name}</h2>
<ol class="steps"><li><strong>Add your ${f.name} file.</strong> Drag it onto the box above, click to browse, or paste it from the clipboard. Multiple files are fine.</li><li><strong>Check the target.</strong> ${t.name} is preselected. Pick High, Medium or Small quality depending on whether you need a master copy or a small file.</li><li><strong>Download.</strong> ${isCanvasPath(from, to) ? 'The conversion is instant.' : 'The conversion engine loads once (32 MB) and then your file is processed locally.'} The ${t.name} file downloads automatically when it is done.</li></ol>
${ad('inArticle')}
<h2>Why convert ${f.name} to ${t.name}?</h2>
<p>${whyConvert(from, to)}</p>
<h2>${f.name} vs ${t.name}</h2>
<div class="tbl-wrap"><table class="grid"><thead><tr><th></th><th>${f.name}</th><th>${t.name}</th></tr></thead><tbody><tr><td>Full name</td><td>${f.full}</td><td>${t.full}</td></tr><tr><td>Type</td><td>${CATS[f.cat]}</td><td>${CATS[t.cat]}</td></tr><tr><td>MIME type</td><td>${f.mime}</td><td>${t.mime}</td></tr><tr><td>About</td><td>${f.name} is ${f.desc}</td><td>${t.name} is ${t.desc}</td></tr></tbody></table></div>
<h2>What makes this converter different</h2>
<ul><li><strong>Nothing is uploaded.</strong> Other converters send your file to a server, queue it, and keep a copy for hours. Here the work happens in your browser with WebAssembly, so private videos, voice memos and documents never leave your computer.</li><li><strong>No limits, no sign-up, no watermark.</strong> There is no server to pay for, so there is no reason to cap file size or count.</li><li><strong>Real ffmpeg quality.</strong> Video and audio use the same ffmpeg encoders professionals use (x264, LAME, libvpx, FLAC), not a stripped-down web codec.</li></ul>
<h2>Related conversions</h2>${fmtGrid(related)}
${faqHtml(faq)}`,
  };
}

export function hubPage({ config }, cat) {
  const sources = cat === 'video' ? VIDEO_SOURCES : cat === 'audio' ? AUDIO_SOURCES : IMAGE_SOURCES;
  const pairs = allPairs().filter(([a]) => catOf(a) === cat);
  const title = `Free Online ${CATS[cat]} Converter — Convert ${sources.slice(0, 4).map(N).join(', ')} and more`;
  const description = `Convert ${cat} files between ${sources.length} formats for free, directly in your browser. No upload, no limits. ${pairs.length} conversions supported.`;
  const path = `/${cat}-converter/`;
  return {
    path, title, description, scripts: ['convert.js'], priority: 0.8,
    jsonld: [appJsonld({ name: `${CATS[cat]} Converter`, description, url: config.siteUrl + base + path })],
    content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: `${CATS[cat]} converter` }])}<h1>Free online ${cat} converter</h1><p class="lead">Drop any ${cat} file and choose the format you need. Everything runs on your device.</p>
${widget({ accept: cat + '/*' + (cat === 'video' ? ',.mkv,.ts,.flv,.wmv,.3gp,.mpg' : cat === 'audio' ? ',.m4a,.aac,.flac,.ogg,.opus,.wma,.aiff' : ',.webp,.avif,.tiff,.tif,.svg,.ico') })}
${ad('inArticle')}
<h2>Supported ${cat} formats</h2>
<div class="tbl-wrap"><table class="grid"><thead><tr><th>Format</th><th>Full name</th><th>Best for</th></tr></thead><tbody>${sources.map((s) => `<tr><td><strong>${N(s)}</strong></td><td>${FORMATS[s].full}</td><td>${FORMATS[s].desc}</td></tr>`).join('')}</tbody></table></div>
<h2>All ${cat} conversions</h2>${fmtGrid(pairs)}`,
  };
}

export function allPage({ config }) {
  const pairs = allPairs();
  return {
    path: '/all/', title: `All ${pairs.length} supported conversions`, description: `Every video, audio and image conversion supported by ${config.siteName}: ${pairs.length} format pairs, all free and private.`, priority: 0.5,
    content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: 'All conversions' }])}<h1>All supported conversions</h1><p class="lead">${pairs.length} conversions across video, audio and image formats.</p>${['video', 'audio', 'image'].map((c) => `<h2>${CATS[c]}</h2>${fmtGrid(pairs.filter(([a]) => catOf(a) === c))}`).join('')}`,
  };
}
