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
<p>JPG and WEBP use the browser's own encoder at quality 95, 85 and 70 (out of 100). PNG, BMP and TIFF are lossless, so the switch does nothing for them. The image keeps its original pixel dimensions; the one exception is ICO, which is resized to fit within 256 × 256.</p>
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
  {
    slug: 'extract-audio-from-video', date: '2026-10-06',
    title: 'Getting the audio out of a video: MP3, M4A or WAV',
    description: 'How to save only the soundtrack of an MP4, MOV, MKV or WEBM file, which audio format to choose, and how large the result will be.',
    html: `<p>A recorded lecture, an interview, a concert clip: often the picture does not matter and you only want the sound. Converting a video to an audio format drops the picture and keeps the soundtrack. It is also the fastest kind of conversion on this site, because no video has to be encoded.</p>
<h2>What the converter does</h2>
<ul><li><strong>The picture is discarded.</strong> Only the audio track is read.</li><li><strong>The audio is re-encoded</strong> to the format you pick. It is not copied out unchanged, so the quality setting applies.</li><li><strong>Sample rate and channels stay as they are.</strong> A 48 kHz stereo soundtrack comes out as 48 kHz stereo; a mono recording stays mono.</li><li><strong>One track is used.</strong> If the video has several audio tracks, for example two languages in an MKV, you get one of them, normally the track the file marks as its default.</li></ul>
<h2>Which format to choose</h2>
${T(['Target', 'Choose it when', 'Size per minute (stereo)'], [
      ['MP3', 'It has to play on anything: phones, car stereos, old players', '1.4 MB at Medium (192 kbps)'],
      ['M4A', 'You use Apple devices, or want slightly better sound at the same size', '1.4 MB at Medium (192 kbps)'],
      ['WAV', 'You will edit the audio or feed it to transcription software', 'About 11.5 MB at 48 kHz, 16-bit'],
      ['FLAC', 'You want a lossless copy that is smaller than WAV', 'Roughly half of WAV'],
      ['OGG', 'A game engine or open-source tool asks for it', 'Similar to MP3'],
    ])}
<p>WAV and FLAC are lossless containers, but remember what goes into them: the soundtrack of an MP4 is already compressed, usually as AAC. Saving it as WAV preserves exactly what is there. It does not improve it. Choose WAV because a program requires it, not as an upgrade.</p>
<h2>Speech or music?</h2>
<p>For spoken recordings such as lectures, meetings and voice notes, the Small setting (128 kbps MP3) is more than enough, and an hour comes to about 58 MB. For music, use Medium or High. The exact bitrates behind each setting are in <a href="${base}/guides/quality-settings-explained/">the quality guide</a>.</p>
<h2>Steps</h2>
<ol class="steps"><li><strong>Open the converter for your file type:</strong> ${L('mp4', 'mp3', 'MP4 to MP3')}, ${L('mov', 'mp3', 'MOV to MP3')}, ${L('mkv', 'mp3', 'MKV to MP3')}, ${L('webm', 'mp3', 'WEBM to MP3')} or ${L('avi', 'mp3', 'AVI to MP3')}. For an uncompressed file use ${L('mp4', 'wav', 'MP4 to WAV')}.</li><li><strong>Pick the quality</strong> before adding the file.</li><li><strong>Drop the video in.</strong> The whole file is read into the tab, so a long recording needs a moment before the progress bar starts moving.</li></ol>
<h2>Things to know</h2>
<ul><li><strong>The whole soundtrack is converted.</strong> There is no trim tool. To keep one section, trim the video first with your phone or computer's built-in editor.</li><li><strong>A video with no audio track fails.</strong> Screen recordings made without a microphone are the usual case. The converter reports an error because there is nothing to extract.</li><li><strong>Large files still have to fit in memory.</strong> Extracting audio is quick, but the full video is loaded first. Files over 2 GB are refused.</li></ul>`,
  },
  {
    slug: 'make-video-smaller', date: '2026-10-06',
    title: 'Making a video small enough to send',
    description: 'What decides the size of a video file, what the Small setting changes and what it leaves alone, and the options when the result is still too big.',
    html: `<p>A one-minute phone video can be over 100 MB, and many email services stop at around 25 MB per message. Before converting, it helps to know what actually controls the size, because the converter changes only one of the three factors.</p>
<h2>What decides the size of a video</h2>
<ul><li><strong>Length.</strong> Twice as long is about twice as big.</li><li><strong>Resolution.</strong> A 4K frame has four times the pixels of a 1080p frame.</li><li><strong>How hard it is compressed.</strong> This is the part a converter controls.</li></ul>
<p>Content matters too. A talking head against a still background compresses far better than handheld footage of a football match, at the same settings.</p>
<h2>What this site changes, and what it does not</h2>
${T(['', 'Changed by converting here?'], [
      ['Compression strength', 'Yes. High, Medium and Small set it (CRF 20, 24, 28 for MP4)'],
      ['Audio bitrate', 'Yes. 256, 192 or 128 kbps'],
      ['Resolution', 'No. A 4K video stays 4K'],
      ['Frame rate', 'No'],
      ['Length', 'No. There is no trim tool'],
    ])}
<p>So ${L('mov', 'mp4', 'MOV to MP4')} on Small will shrink most phone recordings noticeably, but it cannot perform miracles on a long 4K clip, because the two biggest factors are untouched.</p>
<h2>Do these first</h2>
<ol class="steps"><li><strong>Trim.</strong> Cutting a 60-second clip to the 15 seconds that matter removes three quarters of the file before any conversion. Every phone's gallery app can do it.</li><li><strong>Convert on Small.</strong> Check the size shown on the download button.</li><li><strong>Still too big?</strong> Try the WEBM route below, or use one of the alternatives at the end.</li></ol>
<h2>When you need a predictable size: WEBM</h2>
<p>MP4 output is quality-based: the encoder uses as many bits as the picture needs, so the size cannot be known in advance. WEBM output on this site is bitrate-based, which makes the size roughly predictable from the length alone.</p>
${T(['WEBM setting', 'Video bitrate', 'Approx. size per minute (picture only)'], [
      ['High', '2 Mbps', '15 MB'],
      ['Medium', '1 Mbps', '7.5 MB'],
      ['Small', '500 kbps', '3.8 MB'],
    ])}
<p>Audio adds a little on top. At 500 kbps a high-resolution video will look soft, so this suits clips where being able to send it matters more than how sharp it is. WEBM plays in Chrome, Firefox, Edge and on Android; older iPhones and some messaging apps do not play it, so check with the recipient. Use ${L('mp4', 'webm', 'MP4 to WEBM')} for this.</p>
<h2>Why the result is sometimes bigger</h2>
<p>If the original was already compressed hard, for example a video that came through a messaging app, re-encoding it can produce a larger file. The encoder here runs in its fastest mode so that it is usable in a browser, and fast encoding is less efficient. When that happens, the original was already about as small as it will get at that resolution.</p>
<h2>If it is still too large</h2>
<ul><li><strong>Share a link instead.</strong> Cloud drives and most phones' share sheets can send a link to the full-quality file. Nothing is lost and there is no size limit to fight.</li><li><strong>Record at a lower resolution next time.</strong> 1080p instead of 4K cuts the file to a fraction, and few people watching on a phone can tell.</li><li><strong>Use a desktop encoder for resizing.</strong> Lowering the resolution is the most effective way to shrink a video, and it is not something this site does.</li></ul>`,
  },
  {
    slug: 'old-video-formats-to-mp4', date: '2026-10-06',
    title: 'MKV, AVI, WMV, FLV and other video formats: what they are and what converting to MP4 keeps',
    description: 'Where MKV, AVI, WMV, FLV, 3GP, MPG and TS files come from, why they fail to play, and what is kept and dropped when you convert them to MP4.',
    html: `<p>MP4 won. Phones, browsers, TVs and editing apps all expect it, and files in other containers are increasingly likely to be refused. Here is where the other formats come from and what happens when you convert them.</p>
${T(['Format', 'Where it comes from', 'Typical problem'], [
      ['MKV', 'Downloads, screen recorders such as OBS, disc backups', 'iPhones, many TVs and most upload forms will not open it'],
      ['AVI', 'Windows software and cameras from the 1990s and 2000s', 'Large files; unsupported on phones and the web'],
      ['WMV', 'Windows Media Player, old screen-capture tools', 'Does not play on Apple devices or in browsers'],
      ['FLV', 'Flash-era websites and old downloaders', 'Flash is gone; almost nothing plays it'],
      ['3GP', 'Feature phones before smartphones', 'Low resolution; modern apps often reject it'],
      ['MPG', 'DVDs, camcorders, TV capture cards', 'Plays, but files are large for their quality'],
      ['TS', 'Digital TV recordings, streaming captures', 'Meant for broadcast, not for sharing'],
      ['M4V', 'iTunes purchases and exports', 'Nearly identical to MP4; protected files cannot be converted'],
    ])}
<h2>What converting to MP4 does here</h2>
<p>The video is re-encoded as H.264 and the audio as AAC, the combination that plays almost everywhere. Converters: ${L('mkv', 'mp4', 'MKV')}, ${L('avi', 'mp4', 'AVI')}, ${L('wmv', 'mp4', 'WMV')}, ${L('flv', 'mp4', 'FLV')}, ${L('3gp', 'mp4', '3GP')}, ${L('mpg', 'mp4', 'MPG')}, ${L('ts', 'mp4', 'TS')} and ${L('m4v', 'mp4', 'M4V')} to MP4.</p>
<h2>What is kept and what is dropped</h2>
${T(['', 'In the MP4'], [
      ['Picture', 'Kept, re-encoded at the quality you choose'],
      ['Resolution and frame rate', 'Kept. An odd width or height is trimmed by one pixel, which H.264 requires'],
      ['First or default audio track', 'Kept, re-encoded as AAC'],
      ['Additional audio tracks', 'Dropped. Only one track is carried over'],
      ['Subtitle tracks', 'Dropped'],
      ['Chapters and attachments such as fonts', 'Do not rely on them surviving'],
    ])}
<p>This matters most for MKV, which is often used precisely because it can hold several languages and subtitle tracks. If you need a specific audio language or the subtitles, a desktop tool that lets you pick tracks is the right choice.</p>
<h2>A faster route for some MKV files</h2>
<p>Many MKV files already contain H.264 video. A desktop program can move those streams into an MP4 container without re-encoding, which takes seconds and loses no quality. This site always re-encodes, which is simpler and works for every input, but takes about as long as the video itself and costs a little quality. For one or two short files that is fine. For a folder of full-length films, use a desktop tool.</p>
<h2>How long it takes</h2>
<p>Expect roughly one to two minutes of processing per minute of 1080p video on a laptop. Older formats such as 3GP and low-resolution AVI convert much faster because there are far fewer pixels. Keep the tab open and in front while it works.</p>
<h2>Do not expect it to look better</h2>
<p>Converting a 320 × 240 clip from an old phone to MP4 makes it playable, not sharper. The resolution and the compression damage in the original are carried over as they are. Choose High for old footage so that no further detail is lost; the settings are listed in <a href="${base}/guides/quality-settings-explained/">the quality guide</a>.</p>
<h2>Files that will not convert</h2>
<ul><li><strong>Protected files.</strong> Purchased or rented films in M4V and WMV with DRM are encrypted and cannot be read.</li><li><strong>Damaged or partial downloads.</strong> If the file stops playing halfway in a media player, it will fail here too.</li><li><strong>Files over 2 GB.</strong> The whole file has to fit in the browser tab's memory.</li></ul>`,
  },
  {
    slug: 'webm-vs-mp4', date: '2026-10-06',
    title: 'WEBM vs MP4: which to use and when to convert',
    description: 'Why screen recorders and browsers produce WEBM, where WEBM does not play, and what converting in either direction does on this site.',
    html: `<p>WEBM and MP4 do the same job with different technology. MP4 normally carries H.264 video and AAC audio, both of which are patented formats that device makers license. WEBM was created by Google as an open, royalty-free alternative, using VP8 or VP9 video with Vorbis or Opus audio.</p>
${T(['', 'WEBM', 'MP4'], [
      ['Video codec', 'VP8, VP9 (sometimes AV1)', 'H.264, sometimes HEVC'],
      ['Audio codec', 'Vorbis or Opus', 'AAC'],
      ['Chrome, Firefox, Edge, Android', 'Plays', 'Plays'],
      ['iPhone, iPad, Safari', 'Recent versions only', 'Plays'],
      ['TVs, consoles, car screens', 'Rarely', 'Almost always'],
      ['Video editors', 'Often not importable', 'Standard'],
      ['Upload forms and messaging apps', 'Often rejected', 'Accepted'],
    ])}
<h2>Why you have a WEBM file</h2>
<ul><li><strong>A browser recorded it.</strong> Browser-based screen recorders and meeting tools save WEBM because that is what the browser's built-in recorder produces.</li><li><strong>It was downloaded from a website.</strong> Sites that serve video to browsers often use WEBM to save bandwidth.</li><li><strong>A screen-capture app defaulted to it.</strong></li></ul>
<h2>WEBM to MP4</h2>
<p>This is the common direction: the file needs to go somewhere that only takes MP4. ${L('webm', 'mp4', 'WEBM to MP4')} re-encodes the video to H.264 and the audio to AAC. If you only need the sound, ${L('webm', 'mp3', 'WEBM to MP3')} is much quicker, and ${L('webm', 'gif', 'WEBM to GIF')} turns a short recording into an animation.</p>
<p>One quirk of browser-recorded WEBM files: they are often written without a proper duration or seek index, so players cannot skip around in them. Converting to MP4 rebuilds the file and usually fixes this.</p>
<h2>MP4 to WEBM</h2>
<p>Converting the other way is mostly for web developers who want a smaller file for a background or autoplay video, with an MP4 as the fallback. On this site ${L('mp4', 'webm', 'MP4 to WEBM')} produces VP8 video and Vorbis audio at a fixed video bitrate.</p>
${T(['Setting', 'Video bitrate'], [['High', '2 Mbps'], ['Medium', '1 Mbps'], ['Small', '500 kbps']])}
<p>Two honest caveats. First, VP8 is the older WEBM codec; VP9 and AV1 compress better but are too slow to encode in a browser tab. Second, the encoder runs in its fastest real-time mode. The result is a valid, widely playable WEBM, but a desktop VP9 encode will be smaller at the same quality. If you are optimising a production website, treat the output here as a quick draft.</p>
<h2>Which one should you keep?</h2>
<ul><li><strong>Sending to people, uploading, editing:</strong> MP4.</li><li><strong>Embedding on your own website:</strong> offer both, WEBM first and MP4 as the fallback.</li><li><strong>Archiving a screen recording:</strong> keep the original WEBM and make an MP4 copy when you need one. Every conversion loses a little quality, so the original is the best master.</li></ul>
<p>Transparency is one thing WEBM can do that MP4 cannot. A WEBM with a transparent background loses it when converted to MP4, and the transparent areas turn solid.</p>`,
  },
  {
    slug: 'favicon-ico-from-png', date: '2026-10-06',
    title: 'Making a favicon: PNG or JPG to ICO',
    description: 'How to prepare an image for a favicon, exactly what the ICO file from this site contains, and the HTML needed to use it.',
    html: `<p>A favicon is the small icon shown in a browser tab, in bookmarks and in history. The traditional format is ICO, and browsers still look for a file called <code>favicon.ico</code> at the top level of a site when a page does not say otherwise.</p>
<h2>Prepare the image first</h2>
<ul><li><strong>Make it square.</strong> Favicon slots are square. A non-square image is not cropped by the converter: it keeps its shape, so a wide logo becomes a wide, short icon that browsers then squeeze or pad. Crop to a square before converting.</li><li><strong>Start large.</strong> 256 × 256 pixels or more is ideal. A small source is enlarged to fit, which makes it blurry.</li><li><strong>Keep it simple.</strong> The icon is usually displayed at 16 or 32 pixels. A single letter or a simple shape survives; a full logo with text does not.</li><li><strong>Use transparency if you want it.</strong> A PNG with a transparent background keeps it in the ICO.</li></ul>
<h2>What the ICO from this site contains</h2>
${T(['Property', 'Value'], [
      ['Images inside', 'One'],
      ['Size', 'The source resized to fit within 256 × 256, keeping its shape'],
      ['Encoding', 'PNG-compressed, 32-bit colour with transparency'],
      ['Quality setting', 'No effect: the image is stored losslessly'],
    ])}
<p>ICO files can hold several sizes at once, classically 16, 32 and 48 pixels, so that each is drawn by hand for its size. The file produced here holds a single 256-pixel image and lets the browser scale it down. That is fine for a website favicon in any current browser. If you need a multi-size icon for a Windows application, use a dedicated icon editor.</p>
<h2>Steps</h2>
<ol class="steps"><li><strong>Convert</strong> with ${L('png', 'ico', 'PNG to ICO')} or ${L('jpg', 'ico', 'JPG to ICO')}.</li><li><strong>Rename</strong> the download to <code>favicon.ico</code>.</li><li><strong>Upload</strong> it to the top-level folder of your site, next to the home page.</li><li><strong>Add the link tag</strong> inside <code>&lt;head&gt;</code> on your pages:</li></ol>
<pre><code>&lt;link rel="icon" href="/favicon.ico" sizes="any"&gt;</code></pre>
<p>Browsers find <code>/favicon.ico</code> on their own, but the tag removes any doubt and is required if the file lives in a different folder.</p>
<h2>Starting from an SVG</h2>
<p>SVG to ICO is not offered directly. Convert ${L('svg', 'png', 'SVG to PNG')} first, then the PNG to ICO. The PNG is drawn at the size written in the SVG file, so if it comes out small, increase the <code>width</code> and <code>height</code> in the SVG and convert again.</p>
<h2>The new icon does not show up</h2>
<p>Browsers cache favicons aggressively, often for days. Before assuming the file is wrong:</p>
<ul><li>Open <code>yoursite.com/favicon.ico</code> directly in the address bar. If the new image appears there, the file is correct.</li><li>Reload the page with the cache bypassed (Ctrl+Shift+R, or Cmd+Shift+R on a Mac), or open it in a private window.</li></ul>
<h2>Going the other way</h2>
<p>To pull the image out of an existing icon, use ${L('ico', 'png', 'ICO to PNG')}. If the icon holds several sizes you get one image from it, not all of them.</p>`,
  },
  {
    slug: 'batch-conversion-and-errors', date: '2026-10-06',
    title: 'Converting several files at once, and what the error messages mean',
    description: 'How the file queue works, the ways to add files, and what each error message on SnapConvert means and how to get past it.',
    html: `<p>Every converter page accepts more than one file. This guide covers how the queue behaves and what to do when a file fails.</p>
<h2>Three ways to add files</h2>
<ul><li><strong>Drag and drop</strong> one or many files onto the box.</li><li><strong>Click the box</strong> and select files; hold Ctrl or Shift (Cmd on a Mac) to select several.</li><li><strong>Paste.</strong> Copy a file, or a screenshot, and press Ctrl+V anywhere on the page. This is the quickest way to turn a screenshot on the clipboard into a JPG or WEBP file.</li></ul>
<h2>How the queue works</h2>
<ul><li><strong>Files are converted one at a time,</strong> in the order they were added. A failed file does not stop the ones after it.</li><li><strong>Set the target format and quality first.</strong> Each file takes the settings that are selected at the moment you add it. Changing the quality afterwards affects only files added later.</li><li><strong>Each result downloads automatically</strong> under the original name with the new extension. The download button stays in the list so you can save a file again without converting it twice.</li><li><strong>Your browser may ask for permission.</strong> When a page saves several files in a row, Chrome and other browsers show a prompt asking whether to allow multiple downloads. Choose Allow, or the later files will be blocked.</li><li><strong>Results live in the tab.</strong> Closing or reloading the page discards them, so save what you need first.</li></ul>
<p>Dragged or pasted files do not all have to be the type named on the page, because each file is identified by its own extension. Dropping PNG, WEBP and BMP images together onto a JPG converter converts all of them. The file picker is stricter: it lists only the source type of the page you are on.</p>
<h2>How many files is sensible?</h2>
<p>For images, dozens at a time is no problem; each takes a fraction of a second. For audio, a full album is fine. For video, add a few at a time. Each video is loaded into memory whole while it is converted, and a long queue of large videos keeps the tab busy for a long while.</p>
<h2>Error messages</h2>
${T(['Message', 'What it means', 'What to do'], [
      ['Unknown input format', 'The file extension is not one the site recognises. The format is read from the extension, not the contents', 'Check the extension. Files with no extension, and formats such as HEIC, PDF or DOCX, are not supported'],
      ['Source and target are the same format', 'You added an MP3 to an MP3 converter, for example', 'Pick a different target format'],
      ['Files over 2 GB are not supported in the browser', 'The file cannot fit in the memory a tab is allowed', 'Use a desktop program'],
      ['Conversion failed (ffmpeg exit …)', 'The engine could not read or write the file', 'See the list below'],
    ])}
<h2>Why a conversion fails</h2>
<ul><li><strong>The file is damaged or incomplete.</strong> Try playing it in a media player. If it stops early there, it will fail here.</li><li><strong>The file is copy-protected.</strong> Purchased films and some music downloads are encrypted.</li><li><strong>There is nothing to convert.</strong> Extracting audio from a video that has no soundtrack fails, because the output would be empty.</li><li><strong>The extension is wrong.</strong> A file renamed from one format to another may still convert, since the engine inspects the contents, but a mislabelled file can end up on the wrong path. Rename it to its true extension and try again.</li></ul>
<h2>The tab freezes or crashes</h2>
<p>A page that goes blank, or a browser message such as "Aw, Snap" or "This page was reloaded because it was using significant memory", means the tab ran out of memory. It happens with large videos, most often on phones.</p>
<ul><li>Close other tabs and apps, then try again.</li><li>Convert the file on a laptop or desktop.</li><li>For video, trim the clip first so there is less to hold in memory.</li></ul>
<h2>It seems stuck at the start</h2>
<p>The first video or audio conversion downloads the 32 MB conversion engine, and the status line says so. On a slow connection that takes a while; it is cached afterwards. Images going to PNG, JPG or WEBP do not need the engine at all. Why the site works this way is explained in <a href="${base}/guides/how-browser-conversion-works/">how in-browser conversion works</a>.</p>`,
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
