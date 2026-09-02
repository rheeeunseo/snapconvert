// Format registry shared by the build (SEO pages) and the browser (conversion args)
export const FORMATS = {
  // video
  mp4:  { cat: 'video', name: 'MP4',  mime: 'video/mp4', full: 'MPEG-4 Part 14', desc: 'the most widely supported video container. Plays on every phone, browser, TV and editing app, using H.264 video and AAC audio.' },
  mov:  { cat: 'video', name: 'MOV',  mime: 'video/quicktime', full: 'QuickTime Movie', desc: 'Apple\'s QuickTime container used by iPhone, iPad and Mac cameras. Excellent quality but large files and limited support on Windows and Android.' },
  webm: { cat: 'video', name: 'WEBM', mime: 'video/webm', full: 'WebM', desc: 'an open, royalty-free format from Google built for the web. Small files with VP8/VP9 video; native in Chrome, Firefox and Edge.' },
  mkv:  { cat: 'video', name: 'MKV',  mime: 'video/x-matroska', full: 'Matroska Video', desc: 'a flexible open container that can hold multiple audio tracks, subtitles and chapters. Popular for downloads and archiving, but not supported by iPhones or many TVs.' },
  avi:  { cat: 'video', name: 'AVI',  mime: 'video/x-msvideo', full: 'Audio Video Interleave', desc: 'a classic Windows container from 1992. Very compatible with old players and editors, but files are large and it lacks modern features.' },
  m4v:  { cat: 'video', name: 'M4V',  mime: 'video/x-m4v', full: 'iTunes Video', desc: 'Apple\'s variant of MP4 used by iTunes, sometimes with DRM. Structurally almost identical to MP4.' },
  flv:  { cat: 'video', name: 'FLV',  mime: 'video/x-flv', full: 'Flash Video', desc: 'the legacy Adobe Flash video format once used by YouTube. Flash is dead, so FLV files usually need converting to play anywhere.' },
  wmv:  { cat: 'video', name: 'WMV',  mime: 'video/x-ms-wmv', full: 'Windows Media Video', desc: 'Microsoft\'s video format for Windows Media Player. Compact, but poorly supported on Apple devices and the web.' },
  '3gp': { cat: 'video', name: '3GP', mime: 'video/3gpp', full: '3GPP', desc: 'a low-bandwidth video format from old feature phones. Small, low quality, and rarely playable on modern devices.' },
  mpg:  { cat: 'video', name: 'MPG',  mime: 'video/mpeg', full: 'MPEG-1/2 Video', desc: 'the DVD-era MPEG format. Universally decodable but inefficient compared with H.264.' },
  ts:   { cat: 'video', name: 'TS',   mime: 'video/mp2t', full: 'MPEG Transport Stream', desc: 'a broadcast and streaming container used by HLS and digital TV recordings. Robust, but not a normal playback format.' },
  gif:  { cat: 'image', name: 'GIF',  mime: 'image/gif', full: 'Graphics Interchange Format', desc: 'the animated image format supported everywhere. Limited to 256 colors, so it is best for short clips, memes and reactions.' },
  // audio
  mp3:  { cat: 'audio', name: 'MP3',  mime: 'audio/mpeg', full: 'MPEG Audio Layer III', desc: 'the universal audio format. Every device and app plays it; 192–320 kbps sounds transparent for most listeners.' },
  wav:  { cat: 'audio', name: 'WAV',  mime: 'audio/wav', full: 'Waveform Audio', desc: 'uncompressed PCM audio. Perfect quality and zero decoding cost, but about 10 MB per minute of stereo.' },
  m4a:  { cat: 'audio', name: 'M4A',  mime: 'audio/mp4', full: 'MPEG-4 Audio', desc: 'AAC audio in an MP4 container, the default for iTunes, Apple Music and iPhone voice memos. Better quality than MP3 at the same bitrate.' },
  aac:  { cat: 'audio', name: 'AAC',  mime: 'audio/aac', full: 'Advanced Audio Coding', desc: 'the successor to MP3, used by YouTube, Apple and most streaming services. Raw .aac streams are less portable than M4A.' },
  flac: { cat: 'audio', name: 'FLAC', mime: 'audio/flac', full: 'Free Lossless Audio Codec', desc: 'lossless compression that shrinks WAV by about half with identical quality. The standard for hi-res music collections.' },
  ogg:  { cat: 'audio', name: 'OGG',  mime: 'audio/ogg', full: 'Ogg Vorbis', desc: 'an open, patent-free lossy format popular in games and on Linux. Good quality, but no native support on iPhone.' },
  opus: { cat: 'audio', name: 'OPUS', mime: 'audio/opus', full: 'Opus', desc: 'the most efficient lossy codec available, used by WhatsApp, Discord and WebRTC. Excellent for speech and music at low bitrates.' },
  wma:  { cat: 'audio', name: 'WMA',  mime: 'audio/x-ms-wma', full: 'Windows Media Audio', desc: 'Microsoft\'s legacy audio format. Rarely supported outside Windows, so it is usually converted to MP3.' },
  aiff: { cat: 'audio', name: 'AIFF', mime: 'audio/aiff', full: 'Audio Interchange File Format', desc: 'Apple\'s uncompressed audio format, equivalent to WAV. Used in Logic Pro and professional mastering.' },
  // image
  png:  { cat: 'image', name: 'PNG',  mime: 'image/png', full: 'Portable Network Graphics', desc: 'lossless with transparency support. Ideal for screenshots, logos and graphics; larger than JPG for photos.' },
  jpg:  { cat: 'image', name: 'JPG',  mime: 'image/jpeg', full: 'JPEG', desc: 'the standard photo format. Small files with adjustable quality, but no transparency and slight loss on every save.' },
  webp: { cat: 'image', name: 'WEBP', mime: 'image/webp', full: 'WebP', desc: 'Google\'s modern web image format, 25–35% smaller than JPG and PNG with transparency and animation. Not accepted by many older apps and upload forms.' },
  bmp:  { cat: 'image', name: 'BMP',  mime: 'image/bmp', full: 'Bitmap', desc: 'an uncompressed Windows image format. Huge files, but trivially simple and supported by legacy software.' },
  tiff: { cat: 'image', name: 'TIFF', mime: 'image/tiff', full: 'Tagged Image File Format', desc: 'a high-quality format for print, scanning and archiving. Supports layers and lossless compression; not viewable in browsers.' },
  svg:  { cat: 'image', name: 'SVG',  mime: 'image/svg+xml', full: 'Scalable Vector Graphics', desc: 'vector graphics that scale to any size without blurring. Converting to PNG or JPG rasterizes it at a fixed resolution.' },
  avif: { cat: 'image', name: 'AVIF', mime: 'image/avif', full: 'AV1 Image File Format', desc: 'the newest web image format with the best compression, but still unsupported by many editors and older browsers.' },
  ico:  { cat: 'image', name: 'ICO',  mime: 'image/x-icon', full: 'Windows Icon', desc: 'the icon format for Windows and website favicons, typically 16 to 256 pixels.' },
};

export const CATS = { video: 'Video', audio: 'Audio', image: 'Image' };
export const catOf = (f) => FORMATS[f]?.cat;

// Encoding arguments per target (single-thread ffmpeg.wasm; presets chosen for speed)
export function ffmpegArgs(to, quality = 'medium') {
  const q = { high: 0, medium: 1, small: 2 }[quality] ?? 1;
  const crf = [20, 24, 28][q], abr = ['256k', '192k', '128k'][q], vbr = ['2M', '1M', '500k'][q];
  const x264 = ['-c:v', 'libx264', '-preset', 'ultrafast', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2'];
  const aac = ['-c:a', 'aac', '-b:a', abr];
  switch (to) {
    case 'mp4': return [...x264, ...aac, '-movflags', '+faststart'];
    case 'mov': return [...x264, ...aac, '-f', 'mov'];
    case 'm4v': return [...x264, ...aac, '-f', 'mp4'];
    case 'mkv': return [...x264, ...aac, '-f', 'matroska'];
    case 'ts':  return [...x264, ...aac, '-f', 'mpegts'];
    case 'flv': return [...x264, ...aac, '-f', 'flv'];
    case 'webm': return ['-c:v', 'libvpx', '-b:v', vbr, '-deadline', 'realtime', '-cpu-used', '8', '-c:a', 'libvorbis', '-f', 'webm'];
    case 'avi': return ['-c:v', 'mpeg4', '-q:v', String([3, 5, 8][q]), '-c:a', 'libmp3lame', '-b:a', abr, '-f', 'avi'];
    case 'wmv': return ['-c:v', 'wmv2', '-q:v', String([3, 5, 8][q]), '-c:a', 'wmav2', '-b:a', abr, '-f', 'asf'];
    case '3gp': return ['-c:v', 'mpeg4', '-q:v', '6', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', ...aac, '-f', '3gp'];
    case 'mpg': return ['-c:v', 'mpeg2video', '-q:v', String([3, 5, 8][q]), '-c:a', 'mp2', '-b:a', abr, '-f', 'mpeg'];
    case 'gif': return ['-vf', `fps=${[15, 12, 8][q]},scale=${[640, 480, 320][q]}:-1:flags=lanczos`, '-loop', '0', '-f', 'gif'];
    case 'mp3': return ['-vn', '-c:a', 'libmp3lame', '-b:a', abr, '-f', 'mp3'];
    case 'wav': return ['-vn', '-c:a', 'pcm_s16le', '-f', 'wav'];
    case 'm4a': return ['-vn', ...aac, '-f', 'ipod'];
    case 'aac': return ['-vn', ...aac, '-f', 'adts'];
    case 'flac': return ['-vn', '-c:a', 'flac', '-f', 'flac'];
    case 'ogg': return ['-vn', '-c:a', 'libvorbis', '-q:a', String([7, 5, 3][q]), '-f', 'ogg'];
    case 'opus': return ['-vn', '-c:a', 'libopus', '-b:a', ['160k', '128k', '64k'][q], '-f', 'opus'];
    case 'aiff': return ['-vn', '-c:a', 'pcm_s16be', '-f', 'aiff'];
    case 'png': return ['-frames:v', '1', '-f', 'image2', '-c:v', 'png'];
    case 'jpg': return ['-frames:v', '1', '-f', 'image2', '-c:v', 'mjpeg', '-q:v', String([2, 4, 8][q]), '-pix_fmt', 'yuvj420p'];
    case 'bmp': return ['-frames:v', '1', '-f', 'image2', '-c:v', 'bmp'];
    case 'tiff': return ['-frames:v', '1', '-f', 'image2', '-c:v', 'tiff'];
    case 'ico': return ['-frames:v', '1', '-vf', 'scale=256:256:force_original_aspect_ratio=decrease', '-c:v', 'png', '-f', 'ico'];
    default: throw new Error('Unsupported target ' + to);
  }
}

// Formats the browser can decode/encode with Canvas (fast path, no ffmpeg download)
export const CANVAS_IN = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'svg', 'avif', 'ico'];
export const CANVAS_OUT = ['png', 'jpg', 'webp'];
export const isCanvasPath = (from, to) => CANVAS_IN.includes(from) && CANVAS_OUT.includes(to);

// Which targets make sense for each source category
const VIDEO_TARGETS = ['mp4', 'mov', 'webm', 'mkv', 'avi', 'gif', 'mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg'];
const AUDIO_TARGETS = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg', 'opus', 'aiff'];
const IMAGE_TARGETS = ['png', 'jpg', 'webp', 'bmp', 'tiff', 'ico', 'gif'];
export function targetsFor(from) {
  const cat = catOf(from);
  const list = cat === 'video' ? VIDEO_TARGETS : cat === 'audio' ? AUDIO_TARGETS : IMAGE_TARGETS;
  return list.filter((t) => t !== from && !(from === 'gif' && ['gif'].includes(t)) && !(from === 'svg' && t === 'ico'));
}
export const VIDEO_SOURCES = ['mp4', 'mov', 'webm', 'mkv', 'avi', 'm4v', 'flv', 'wmv', '3gp', 'mpg', 'ts'];
export const AUDIO_SOURCES = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg', 'opus', 'wma', 'aiff'];
export const IMAGE_SOURCES = ['png', 'jpg', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'avif', 'ico'];

// All conversion pairs that get their own SEO page
export function allPairs() {
  const pairs = [];
  for (const from of [...VIDEO_SOURCES, ...AUDIO_SOURCES, ...IMAGE_SOURCES]) for (const to of targetsFor(from)) {
    if (catOf(from) === 'image' && to === 'gif' && from !== 'png' && from !== 'jpg' && from !== 'webp') continue;
    pairs.push([from, to]);
  }
  return pairs;
}
// Popular pairs shown on the home page (rough global search demand order)
export const POPULAR = [['mov', 'mp4'], ['mkv', 'mp4'], ['webm', 'mp4'], ['avi', 'mp4'], ['mp4', 'mp3'], ['mp4', 'gif'], ['m4a', 'mp3'], ['wav', 'mp3'], ['flac', 'mp3'], ['ogg', 'mp3'], ['mp3', 'wav'], ['webp', 'png'], ['webp', 'jpg'], ['png', 'jpg'], ['jpg', 'png'], ['png', 'webp'], ['avif', 'jpg'], ['svg', 'png'], ['png', 'ico'], ['mp4', 'webm']];
export const normalizeExt = (name) => { const e = (name.split('.').pop() || '').toLowerCase(); return e === 'jpeg' ? 'jpg' : e === 'tif' ? 'tiff' : e === 'mpeg' ? 'mpg' : e === 'oga' ? 'ogg' : e; };
