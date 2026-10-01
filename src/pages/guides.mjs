// Guides: hand-written articles. Numbers quoted for this site's own settings come from src/lib/formats.mjs
// (ffmpegArgs) and src/client/convert.js — update the text when those change.
import { esc, base, ad, breadcrumb } from '../lib/html.mjs';

const T = (head, rows) => `<div class="tbl-wrap"><table class="grid"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const L = (from, to, text) => `<a href="${base}/convert/${from}-to-${to}/">${text}</a>`;

export const guides = [
  {
    slug: 'quality-settings-explained', date: '2026-10-01',
    title: 'What the High, Medium and Small quality settings actually do',
    description: 'The exact encoder settings behind each quality option on SnapConvert, for video, audio, images and GIFs, and how to pick one.',
    html: `<p>Every converter on this site has a three-way quality switch. It is not a vague slider: each option maps to fixed encoder settings, listed below. Knowing them makes it easier to choose, and to predict how large the result will be.</p>
<h2>Video (MP4, MOV, MKV)</h2>
<p>Video is encoded with x264 (H.264) using a constant rate factor (CRF). CRF tells the encoder how much detail it may discard: lower numbers keep more detail and produce larger files. Audio inside the video is encoded as AAC.</p>
${T(['Setting', 'Video (x264 CRF)', 'Audio (AAC)', 'Use it for'], [
      ['High', 'CRF 20', '256 kbps', 'A copy you will edit again or keep as your master'],
      ['Medium', 'CRF 24', '192 kbps', 'Sharing, uploading, everyday playback'],
      ['Small', 'CRF 28', '128 kbps', 'Messaging apps and email attachments'],
    ])}
<p>One thing to know: the encoder runs with the <strong>ultrafast</strong> preset, because a browser has far less processing power available than a desktop encoder. Ultrafast is quick but compresses less efficiently, so at the same CRF the file is larger than what a slow desktop encode would produce. If the result is bigger than you expected, drop one step rather than assuming something went wrong.</p>
<p>WEBM uses the VP8 encoder with a target bitrate instead of CRF: 2 Mbps, 1 Mbps and 500 kbps for High, Medium and Small.</p>
<h2>Audio</h2>
${T(['Target', 'High', 'Medium', 'Small'], [
      ['MP3, M4A, AAC', '256 kbps', '192 kbps', '128 kbps'],
      ['OPUS', '160 kbps', '128 kbps', '64 kbps'],
      ['OGG (Vorbis)', 'quality 7', 'quality 5', 'quality 3'],
      ['WAV, AIFF, FLAC', 'Lossless: the setting has no effect', '', ''],
    ])}
<p>For music, Medium (192 kbps MP3) is where most listeners stop hearing a difference. For speech, such as lectures and voice memos, Small is fine and OPUS at 64 kbps is the most efficient choice.</p>
<h2>Images</h2>
<p>JPG and WEBP use the browser's own encoder at quality 95, 85 and 70 (out of 100). PNG, BMP and TIFF are lossless, so the switch does nothing for them. The image keeps its original pixel dimensions; the one exception is ICO, which is scaled down to fit 256 × 256.</p>
<h2>GIF from video</h2>
${T(['Setting', 'Frame rate', 'Width'], [['High', '15 fps', '640 px'], ['Medium', '12 fps', '480 px'], ['Small', '8 fps', '320 px']])}
<p>GIF is the one target where the setting changes size and smoothness, not just compression. See <a href="${base}/guides/video-to-gif/">making a GIF from a video</a> for how to keep the file manageable.</p>
<h2>Which one should you pick?</h2>
<ul><li><strong>Not sure:</strong> leave it on Medium.</li><li><strong>You will edit the file again:</strong> High, or a lossless target such as WAV or PNG.</li><li><strong>There is an upload limit:</strong> Small first; go up only if the result looks or sounds wrong.</li><li><strong>The source is already heavily compressed:</strong> High will not bring detail back. It only makes the file larger.</li></ul>`,
  },
  {
    slug: 'how-browser-conversion-works', date: '2026-10-01',
    title: 'How in-browser conversion works, and how to check that nothing is uploaded',
    description: 'What happens to a file when you convert it on SnapConvert, the limits of converting in a browser tab, and a one-minute check you can run yourself.',
    html: `<p>Most online converters work the same way: your file is uploaded to a server, converted there, and offered back as a download. This site does not have a conversion server. The work is done by the browser tab you have open. Here is what that means in practice.</p>
<h2>What happens when you drop a file</h2>
<ol class="steps"><li><strong>The page reads the file into memory.</strong> It is a local read, the same as opening a file in any app. No network request is made.</li><li><strong>An engine converts it.</strong> Images going to PNG, JPG or WEBP are decoded and re-encoded with the browser's built-in image codecs, which takes well under a second. Everything else is handled by ffmpeg, the open-source media tool, compiled to WebAssembly so it can run inside a web page.</li><li><strong>The result is handed back as a download.</strong> The browser creates the output file in memory and saves it to your downloads folder.</li></ol>
<p>The ffmpeg engine is a 32 MB download. It is fetched the first time you convert a video or audio file and cached by the browser afterwards.</p>
<h2>Check it yourself</h2>
<p>You do not have to take this on trust.</p>
<ul><li><strong>Offline test.</strong> Load a converter page, convert one small file so the engine is cached, then switch off Wi-Fi and convert another. It still works.</li><li><strong>Network tab.</strong> Open your browser's developer tools (F12), choose the Network tab, and convert a file. You will see the engine being downloaded, but no request that sends your file anywhere.</li></ul>
<h2>The trade-offs</h2>
<p>Running in a tab has real limits, and it is better to know them before you start a long job.</p>
${T(['Limit', 'Why', 'What to do'], [
      ['Files over 2 GB are refused', 'The whole file has to fit in the tab\'s memory', 'Use a desktop app for very large videos'],
      ['Video is slow, roughly 0.5–2× real time', 'The engine runs on a single thread', 'Use a laptop or desktop; keep the tab open and in front'],
      ['Phones struggle with long videos', 'Less memory and slower processors', 'Convert audio and images on the phone, video on a computer'],
      ['DRM-protected files fail', 'They are encrypted', 'Nothing can be done; this is by design'],
    ])}
<p>Audio is much lighter than video. A five-minute song converts in a few seconds on most devices.</p>
<h2>When a server-based converter is the better choice</h2>
<p>If you need to convert a multi-gigabyte recording, a document format, or a file on a device with very little memory, a desktop program or a server-based service will do the job faster. For everything else, and especially for anything private such as screen recordings, voice memos or ID photos, keeping the file on your own device is the safer default.</p>`,
  },
  {
    slug: 'mov-vs-mp4', date: '2026-10-01',
    title: 'MOV vs MP4: what is different and when to convert',
    description: 'Why iPhone videos are MOV files, why they sometimes fail to upload or play, and what converting to MP4 changes.',
    html: `<p>MOV and MP4 are closely related. MP4 was standardised from Apple's QuickTime format, so the two containers are structured almost the same way. The practical difference is where each one is accepted.</p>
${T(['', 'MOV', 'MP4'], [
      ['Made by', 'Apple (QuickTime)', 'ISO/MPEG standard'],
      ['Typical source', 'iPhone, iPad and Mac recordings', 'Almost everything else'],
      ['Plays on', 'Apple devices; other platforms vary', 'Phones, TVs, browsers, editors, consoles'],
      ['Accepted by upload forms', 'Sometimes rejected', 'Almost always accepted'],
    ])}
<h2>Why an iPhone video will not play elsewhere</h2>
<p>The container is only half the story. What matters more is the codec inside it. iPhones set to <strong>High Efficiency</strong> record video as HEVC (H.265), which older Windows PCs, some TVs and many web upload forms cannot decode. Phones set to <strong>Most Compatible</strong> record H.264, which plays almost everywhere. You can find the setting under Settings › Camera › Formats.</p>
<p>That is why simply renaming <code>.mov</code> to <code>.mp4</code> sometimes works and sometimes does not: renaming changes the label, not the codec.</p>
<h2>What converting does</h2>
<p>${L('mov', 'mp4', 'Converting MOV to MP4')} on this site re-encodes the video to H.264 and the audio to AAC, the most widely supported combination. Two consequences follow.</p>
<ul><li><strong>It takes time.</strong> The video is re-compressed frame by frame, so expect about one to two minutes per minute of 1080p footage on a laptop.</li><li><strong>There is a small quality cost.</strong> Re-encoding always discards a little detail. At Medium it is rarely visible; choose High if you will edit the file afterwards. The settings are listed in <a href="${base}/guides/quality-settings-explained/">the quality guide</a>.</li></ul>
<h2>When you do not need to convert</h2>
<ul><li>You are editing in iMovie, Final Cut or another Apple app. MOV is the native format there.</li><li>You are sending the video to another iPhone or Mac.</li><li>The destination already accepts MOV. Converting would only cost time and a little quality.</li></ul>
<h2>When you should</h2>
<ul><li>An upload form rejects the file or only lists MP4.</li><li>The video plays with sound but a black picture on Windows or Android, which is the usual sign of HEVC without a decoder.</li><li>You need to embed the video in a web page or presentation that will be opened on other people's computers.</li></ul>
<p>If you only need the soundtrack, ${L('mov', 'mp3', 'MOV to MP3')} is much faster because no video has to be encoded.</p>`,
  },
  {
    slug: 'audio-formats-compared', date: '2026-10-01',
    title: 'MP3, M4A, FLAC, WAV or OPUS: choosing an audio format',
    description: 'How the common audio formats differ in size, quality and compatibility, with file sizes per minute and advice on what converting can and cannot fix.',
    html: `<p>Audio formats fall into three groups. Which group a format belongs to tells you most of what you need to know.</p>
${T(['Group', 'Formats', 'What it means'], [
      ['Uncompressed', 'WAV, AIFF', 'Every sample is stored as-is. Largest files, no quality loss.'],
      ['Lossless compressed', 'FLAC', 'Compressed like a zip file. Identical sound, roughly half the size of WAV.'],
      ['Lossy', 'MP3, M4A/AAC, OGG, OPUS', 'Sound the ear is unlikely to notice is discarded. Much smaller files.'],
    ])}
<h2>Size per minute</h2>
<p>Figures for stereo audio. CD-quality WAV is 16-bit at 44.1 kHz, which works out to 1,411 kbps.</p>
${T(['Format', 'Bitrate', 'Approx. size per minute'], [
      ['WAV / AIFF', '1,411 kbps', '10.6 MB'],
      ['FLAC', 'varies with the music', '5–7 MB'],
      ['MP3 or M4A', '256 kbps', '1.9 MB'],
      ['MP3 or M4A', '192 kbps', '1.4 MB'],
      ['MP3 or M4A', '128 kbps', '1.0 MB'],
      ['OPUS', '64 kbps', '0.5 MB'],
    ])}
<h2>Which format for which job</h2>
<ul><li><strong>It has to play everywhere</strong> (car stereos, old players, any app): MP3.</li><li><strong>Apple devices, or the best quality for the size:</strong> M4A. At the same bitrate AAC generally sounds better than MP3.</li><li><strong>Voice messages, podcasts, streaming:</strong> OPUS. It stays intelligible at bitrates where MP3 falls apart.</li><li><strong>Archiving a music collection:</strong> FLAC. You can always make an MP3 from it later; the reverse is not true.</li><li><strong>Editing in an audio workstation:</strong> WAV, or AIFF on a Mac.</li></ul>
<h2>What converting cannot do</h2>
<p>Two mistakes come up again and again.</p>
<ul><li><strong>Lossy to lossless does not restore quality.</strong> ${L('mp3', 'wav', 'Converting MP3 to WAV')} gives you a bigger file containing exactly the sound the MP3 already had. It is useful when a program only accepts WAV, not as a quality upgrade.</li><li><strong>Lossy to lossy loses a little more each time.</strong> Going from M4A to MP3 compresses already-compressed audio. Doing it once is fine. Avoid chains such as M4A → MP3 → OGG, and go back to the original file whenever you can.</li></ul>
<h2>Common conversions</h2>
<ul><li>iPhone voice memo that will not open on Windows: ${L('m4a', 'mp3', 'M4A to MP3')}.</li><li>Studio export that is too big to email: ${L('wav', 'mp3', 'WAV to MP3')}.</li><li>Lossless album for a player without FLAC support: ${L('flac', 'mp3', 'FLAC to MP3')}.</li><li>Shrinking a WAV archive without losing anything: ${L('wav', 'flac', 'WAV to FLAC')}.</li></ul>
<p>The bitrates this site uses for each quality option are listed in <a href="${base}/guides/quality-settings-explained/">the quality guide</a>.</p>`,
  },
  {
    slug: 'image-formats-compared', date: '2026-10-01',
    title: 'PNG, JPG, WEBP or AVIF: which image format to use',
    description: 'When each image format is the right choice, what happens to transparency when you convert, and why some upload forms still reject WEBP.',
    html: `<p>Choosing an image format comes down to three questions: is it a photo or a graphic, does it need transparency, and where does it have to work?</p>
${T(['Format', 'Compression', 'Transparency', 'Best for'], [
      ['JPG', 'Lossy', 'No', 'Photos, anything that must be accepted everywhere'],
      ['PNG', 'Lossless', 'Yes', 'Screenshots, logos, text, graphics with flat colour'],
      ['WEBP', 'Lossy or lossless', 'Yes', 'Images on websites: smaller than JPG or PNG'],
      ['AVIF', 'Lossy or lossless', 'Yes', 'The smallest files for the web, where it is supported'],
      ['GIF', 'Lossless, 256 colours', 'On/off only', 'Short animations'],
      ['SVG', 'Vector', 'Yes', 'Logos and icons that must scale to any size'],
    ])}
<h2>Photo or graphic?</h2>
<p>JPG is built for photographs. It handles gradual changes in colour well and struggles with sharp edges, which is why text in a JPG screenshot looks smudged. PNG is the opposite: perfect for sharp edges and flat colour, but a photo saved as PNG is usually several times larger than the same photo as a JPG.</p>
<h2>What happens to transparency</h2>
<p>JPG has no transparency. When you convert a transparent PNG or WEBP to JPG on this site, the transparent areas are filled with <strong>white</strong>. If you need to keep the transparent background, convert to PNG or WEBP instead.</p>
<h2>Why WEBP and AVIF get rejected</h2>
<p>Both formats are designed for websites and every current browser displays them. The problem is everything else: job application portals, government forms, print shops and older editing software often accept only JPG or PNG. That is the usual reason people convert ${L('webp', 'jpg', 'WEBP to JPG')}, ${L('webp', 'png', 'WEBP to PNG')} or ${L('avif', 'jpg', 'AVIF to JPG')}: not for quality, but because the destination will not take the file.</p>
<h2>Things converting will not change</h2>
<ul><li><strong>Dimensions.</strong> Converting here keeps the original width and height. A 4000-pixel photo stays 4000 pixels wide.</li><li><strong>Lost detail.</strong> Saving a JPG as PNG does not undo the JPG compression. The file gets larger and looks the same.</li><li><strong>SVG is rasterised.</strong> ${L('svg', 'png', 'SVG to PNG')} draws the vector at the size written in the file. If you need a larger bitmap, change the width and height in the SVG first.</li></ul>
<h2>Quick picks</h2>
<ul><li>An upload form wants "JPG or PNG": use JPG for a photo, PNG for a screenshot or scan of text.</li><li>Images for your own website: ${L('png', 'webp', 'PNG to WEBP')} or ${L('jpg', 'webp', 'JPG to WEBP')}.</li><li>A favicon: ${L('png', 'ico', 'PNG to ICO')}, starting from a square image.</li></ul>`,
  },
  {
    slug: 'video-to-gif', date: '2026-10-01',
    title: 'Making a GIF from a video without ending up with a huge file',
    description: 'Why GIFs are so large, what the three quality settings produce, and when a short MP4 is the better choice.',
    html: `<p>GIF is a format from 1987. It has no modern video compression: every frame is stored as a separate 256-colour image. That is why a clip that is 2 MB as an MP4 can easily become 20 MB as a GIF. Three things control the size, and all three multiply together.</p>
<ul><li><strong>Length.</strong> Twice as long is roughly twice as big.</li><li><strong>Dimensions.</strong> Twice as wide is four times the pixels.</li><li><strong>Frame rate.</strong> More frames per second means more images.</li></ul>
<h2>What the quality settings produce</h2>
${T(['Setting', 'Frame rate', 'Width', 'Good for'], [
      ['High', '15 fps', '640 px', 'Tutorials and screen recordings where text must stay readable'],
      ['Medium', '12 fps', '480 px', 'Most reactions and clips'],
      ['Small', '8 fps', '320 px', 'Chat apps with strict size limits'],
    ])}
<p>Height is scaled automatically to keep the shape of the original video.</p>
<h2>Trim the video first</h2>
<p>The converter turns the <strong>whole</strong> video into a GIF; it does not have a trim tool. Cut the clip down to the few seconds you need before converting. The Photos app on iPhone, Google Photos on Android, and the built-in video apps on Windows and macOS can all trim a clip in a few taps. Aim for under ten seconds.</p>
<h2>Steps</h2>
<ol class="steps"><li><strong>Trim</strong> the clip to the part you want.</li><li><strong>Convert</strong> with ${L('mp4', 'gif', 'MP4 to GIF')}, ${L('mov', 'gif', 'MOV to GIF')} or ${L('webm', 'gif', 'WEBM to GIF')}. Start with Medium.</li><li><strong>Check the size</strong> shown next to the download button. If it is too large, convert again on Small.</li></ol>
<h2>When a GIF is the wrong tool</h2>
<p>If the destination accepts video, a short MP4 looks better and is far smaller. Most social platforms convert uploaded GIFs to video behind the scenes anyway. Use a GIF when you need something that plays automatically with no player: documentation, README files, email, and forums that only allow images.</p>
<p>Two more limits to keep in mind: GIFs have no sound, and the 256-colour palette makes smooth gradients such as skies and skin tones look banded. Screen recordings and animation survive the conversion much better than camera footage.</p>`,
  },
];

export const guidePage = ({ config }, g) => ({
  path: `/guides/${g.slug}/`, priority: 0.7, title: g.title, description: g.description,
  jsonld: { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description, datePublished: g.date, dateModified: g.updated || g.date, author: { '@type': 'Organization', name: config.siteName }, publisher: { '@type': 'Organization', name: config.siteName }, mainEntityOfPage: config.siteUrl + base + `/guides/${g.slug}/`, inLanguage: 'en' },
  content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: 'Guides', href: '/guides/' }, { name: g.title }])}<article class="article"><h1>${esc(g.title)}</h1><p class="muted">${g.updated && g.updated !== g.date ? `Updated ${g.updated}` : g.date}</p>${g.html}${ad('bottom')}
<h2>More guides</h2><div class="post-list">${guides.filter((x) => x.slug !== g.slug).map((x) => `<a href="${base}/guides/${x.slug}/"><div class="t">${esc(x.title)}</div><div class="d">${esc(x.description)}</div></a>`).join('')}</div></article>`,
});

export const guideIndex = () => ({
  path: '/guides/', priority: 0.6, title: 'Guides: formats, quality settings and how conversion works',
  description: 'Plain-language guides to video, audio and image formats, what the quality settings do, and how in-browser conversion works.',
  content: `${breadcrumb([{ name: 'Home', href: '/' }, { name: 'Guides' }])}<h1>Guides</h1><p class="lead">How the formats differ, what the settings do, and what converting can and cannot fix.</p>
<div class="post-list">${guides.map((g) => `<a href="${base}/guides/${g.slug}/"><div class="t">${esc(g.title)}</div><div class="d">${esc(g.description)}</div></a>`).join('')}</div>`,
});
