// 정정 노트 + 대회 당시 제출본을 합친 PDF 생성: node tools/whitehat-errata.js (site/ 에서)
// 정정 노트는 HTML 로 렌더하고, 뒤에 붙는 원본 7쪽은 바이트 단위로 손대지 않고 복사합니다(PyMuPDF insert_pdf).
const {chromium}=require('playwright');const path=require('path');const {execFileSync}=require('child_process');
(async()=>{
  const out=path.join(__dirname,'whitehat-errata.tmp.pdf');
  const b=await chromium.launch();const p=await b.newPage();
  await p.goto('file://'+path.join(__dirname,'whitehat-errata.html'),{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.pdf({path:out,format:'A4',printBackground:true,preferCSSPageSize:true});
  await b.close();
  execFileSync('python3',['-c',`
import pymupdf,sys
e=pymupdf.open(sys.argv[1]); o=pymupdf.open(sys.argv[2]); r=pymupdf.open()
r.insert_pdf(e); r.insert_pdf(o)
r.set_metadata({'title':'화이트햇 콘테스트 2025 예선 풀이 발췌 — 정정 노트 포함','author':'이창엽'})
r.save(sys.argv[3],garbage=4,deflate=True)
print(f'정정 노트 {e.page_count}쪽 + 당시 제출본 {o.page_count}쪽 = {r.page_count}쪽')`,
    out, path.join(__dirname,'..','assets','reports','projects','whitehat-2025-writeup.pdf'),
    path.join(__dirname,'..','assets','reports','projects','whitehat-2025-writeup-corrected.pdf')],{stdio:'inherit'});
  require('fs').unlinkSync(out);
})();
