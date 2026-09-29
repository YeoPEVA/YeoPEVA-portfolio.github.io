// 공유 미리보기 카드 생성: node tools/og-card.js   (site/ 에서, playwright 필요)
// index.html 의 .tally 숫자를 읽어 tools/og-card.html 에 채운 뒤 1200×630 JPG 로 렌더합니다.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{
  const idx=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  const get=k=>{const m=idx.match(new RegExp(k+' <b>(\\d+)</b>'));if(!m)throw new Error('tally 없음: '+k);return m[1]};
  const t={award:get('수상'),pub:get('발표·논문'),cert:get('자격')};
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await p.goto('file://'+path.join(__dirname,'og-card.html'),{waitUntil:'networkidle'});
  await p.evaluate(t=>{for(const k in t)document.getElementById('t-'+k).textContent=t[k]},t);
  await p.evaluate(()=>document.fonts.ready);
  const ok=await p.evaluate(()=>document.fonts.check('110px "Gowun Batang"','이창엽'));
  if(!ok) throw new Error('Gowun Batang 폰트 로드 실패 — 네트워크 확인');
  const out=path.join(__dirname,'..','assets','images','og-card.jpg');
  await p.screenshot({path:out,type:'jpeg',quality:88});
  await b.close();
  console.log(`og-card.jpg 생성 — 수상 ${t.award} · 발표·논문 ${t.pub} · 자격 ${t.cert}`);
})();
