// IndexNow: sitemap.xml 의 모든 URL 을 Bing/Yandex 에 색인 요청한다.
// 계정·로그인 불필요. 키 파일(https://<도메인>/<key>.txt)이 먼저 배포돼 있어야 한다.
//   node scripts/indexnow.mjs            실제 전송
//   node scripts/indexnow.mjs --dry-run  URL 목록만 출력
import { config } from '../src/config.mjs';

const dry = process.argv.includes('--dry-run');
const key = config.indexNowKey;
if (!key) { console.error('config.indexNowKey 가 비어 있습니다.'); process.exit(1); }

const host = new URL(config.siteUrl).host;
const keyLocation = `${config.siteUrl}/${key}.txt`;

const sitemap = await (await fetch(`${config.siteUrl}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) { console.error('sitemap 에서 URL 을 찾지 못했습니다.'); process.exit(1); }

const res = await fetch(keyLocation);
const body = res.ok ? (await res.text()).trim() : '';
if (body !== key) {
  console.error(`키 파일 확인 실패: ${keyLocation} (status ${res.status}). 배포가 끝난 뒤 다시 실행하세요.`);
  process.exit(1);
}

console.log(`${urlList.length}개 URL · host=${host} · key=${key}`);
if (dry) { console.log(urlList.slice(0, 5).join('\n'), '\n...'); process.exit(0); }

const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
console.log(`IndexNow 응답: ${r.status} ${r.statusText}`);
process.exit(r.ok ? 0 : 1);
