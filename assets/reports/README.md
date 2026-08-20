# 첨부 자료(보고서 · 발표자료 · 인증서) 폴더

각 상세 페이지에서 연결할 실제 파일을 보관하는 곳입니다. 현재는 비어 있으며, 자료를 확보하는 대로 아래 규칙에 따라 넣으면 됩니다.

## 폴더 구성

카테고리별 하위 폴더에 넣고, 파일명은 해당 상세 페이지의 slug와 맞춥니다.

```
assets/reports/
├── experience/    # 인수인계 문서, 활동 보고서
├── projects/      # 프로젝트 보고서, 발표자료, YARA 룰, IoC 정리
├── awards/        # 수상 인증서, 대회 결과 공지
├── publications/  # 논문 PDF, 발표 슬라이드
└── education/     # 수료증, 성적 관련 증빙
```

예:
```
assets/reports/awards/kfsi-academy-2025_certificate.pdf
assets/reports/projects/dfir-competitions_report.pdf
assets/reports/publications/stellar-agent-paper_slides.pdf
```

---

## 상세 페이지에 연결하는 방법

상세 페이지의 자료는 **오른쪽 마지널리아 레일**(`.doc-aside`)에 들어갑니다. 레일은 증빙 플레이트와 `관련 자료` 목록을 담습니다.

- **증빙 이미지**는 아래 "증빙 플레이트" 틀을 쓰세요. 텍스트 링크가 아니라 썸네일로 보여줍니다.
- **그 밖의 자료**(내부 페이지 · 외부 URL · 파일 다운로드)는 `doc-related-list` 틀을 쓰며, **세 종류가 화면에서 자동으로 구분됩니다.**

| 종류 | 표시 | 마크업 |
|---|---|---|
| 내부 페이지 | 표시 없음 | 기본 `<a href="../…">` |
| 외부 URL | `↗` 자동 | `target="_blank" rel="noopener"` |
| 파일 다운로드 | `↓` 자동 + 배지 테두리 | `download` 속성 |

### 복사해서 쓰는 틀 ① 증빙 플레이트

썸네일은 `thumbs/` 의 396px WebP 를 쓰고, 링크와 `KB` 표기는 **원본** 기준입니다. `width`/`height` 는 썸네일의 실제 크기이며 빠뜨리면 CLS 가 생깁니다. `alt` 은 비워 둡니다 — 바로 아래 `plate-cap` 이 같은 내용을 담고 있어 반복하면 스크린리더가 두 번 읽습니다.

```html
<aside class="doc-aside">
  <p class="doc-aside-title">증빙 자료</p>
  <ul class="plate-list plate-grid">
    <li><a class="plate" href="../assets/reports/awards/example.jpg" target="_blank" rel="noopener">
      <img src="../assets/reports/thumbs/example.webp" alt=""
           width="396" height="560" loading="lazy" decoding="async">
      <span class="plate-cap">상장 · 2025.11.05</span>
      <span class="plate-meta">JPG · 105 KB</span>
    </a></li>
  </ul>

  <!-- 관련 자료가 함께 있을 때만 -->
  <p class="doc-aside-title doc-aside-title-2">관련 자료</p>
  <ul class="doc-related-list"> … 아래 틀 ② … </ul>
</aside>
```

썸네일 생성 명령과 배치 규칙(`plate-grid` vs `plate-row`)은 [`site/README.md`](../../README.md) 3-4-2 에 있습니다.

### 복사해서 쓰는 틀 ② 관련 자료

```html
<div class="doc-related">
  <p class="doc-related-title">관련 자료</p>
  <ul class="doc-related-list">

    <!-- ① 파일 다운로드 — download 속성을 붙이면 ↓ 와 테두리 배지가 붙습니다 -->
    <li>
      <a href="../assets/reports/awards/kfsi-academy-2025_certificate.pdf" download>
        <span class="kind">PDF</span>수상 인증서
        <span class="meta">1.2 MB</span>
      </a>
    </li>

    <!-- ② 외부 URL — target="_blank" 를 붙이면 ↗ 가 붙습니다 -->
    <li>
      <a href="https://doi.org/10.22816/polsci.2021.21.1.009" target="_blank" rel="noopener">
        <span class="kind">DOI</span>경찰학연구 21(1) 원문 보기 (KCI)
      </a>
    </li>

    <!-- ③ 내부 페이지 -->
    <li>
      <a href="../projects/bob-platform.html">
        <span class="kind">Project</span>중고거래사기방지 플랫폼 (BoB 9기)
      </a>
    </li>

  </ul>
</div>
```

### 작성 규칙

- **`<span class="kind">`** 에는 종류를 짧게: `PDF`, `Slide`, `DOI`, `Repo`, `Project`, `Experience`, `Award`, `Paper`, `Education`
- **`<span class="meta">`** 는 선택 사항. 파일 크기·페이지 수 등을 넣으면 오른쪽에 정렬됩니다. 크기는 아래로 확인하세요.
  ```bash
  # <폴더>/<파일> 을 실제 경로로 바꿔서 실행하세요
  ls -lh assets/reports/<폴더>/<파일>
  ```
- 경로는 상세 페이지 기준 **`../`** 로 시작합니다 (`experience/`, `projects/`, `awards/`, `publications/`, `education/` 모두 한 단계 아래).
- **양방향 연결**을 권장합니다. A→B 를 걸었으면 B→A 도 추가하세요.
- `doc-related` 블록이 없는 페이지에는 위 틀을 `doc-body` 가 끝나는 `</div>` 바로 다음에 붙여넣으면 됩니다.
- **연결할 자료가 없으면 블록을 넣지 않습니다.** 빈 "관련 자료" 제목만 남으면 오히려 비어 보입니다.

### 넣은 뒤 확인

```bash
cd site && docker compose up --build -d
```

링크가 실제로 존재하는지는 아래로 전수 검사할 수 있습니다.

```bash
cd site && python3 -c "
import re,os,glob
bad=[]
# href 뿐 아니라 src 도 봅니다 — 증빙 플레이트의 썸네일이 src 로 들어갑니다.
for f in glob.glob('*.html') + glob.glob('*/*.html'):
    d=os.path.dirname(f) or '.'
    for m in re.finditer(r'(?:href|src)=\"([^\"]+)\"', open(f,encoding='utf-8').read()):
        h=m.group(1).split('#')[0].split('?')[0]
        if not h or h.startswith(('http','mailto','data:','/')): continue
        if not os.path.isfile(os.path.normpath(os.path.join(d,h))): bad.append((f,h))
print('깨진 링크:', bad or '없음')
# 썸네일이 있어야 하는데 없는 원본 (certificates 는 텍스트 링크만 쓰므로 제외)
miss=[os.path.basename(j) for j in glob.glob('assets/reports/**/*.jpg',recursive=True)
      if '/thumbs/' not in j and '/certificates/' not in j
      and not os.path.isfile('assets/reports/thumbs/'+os.path.basename(j).rsplit('.',1)[0]+'.webp')]
print('썸네일 누락:', miss or '없음')
"
```

---

## 현재 연결 상태 (69장 / 2026.08 기준)

전체 37개 상세 페이지 중 **32개**에 연결 자료가 있습니다. 내부 페이지 링크, 외부 URL(경찰학연구 DOI), 증빙 이미지가 섞여 있습니다.

증빙 이미지는 **텍스트 링크가 아니라 썸네일 플레이트**로 보여줍니다. 배치는 두 가지입니다.

| 배치 | 쪽수 | 위치 |
|---|---|---|
| 오른쪽 마지널리아 레일 (`.doc-aside` + `.plate-grid`) | 28 | 본문 옆 264px |
| 본문 안 격자 (`.plate-row`) | 3 | 항목마다 증빙이 흩어진 부록 페이지 |

원본 69장(8,177 KB)은 그대로 쓰지 않고 `thumbs/` 의 396px WebP 63장(966 KB)을 표시합니다. 자격증 증빙 6장은 `index.html` 의 점선 리더 목록에서 텍스트 링크로만 쓰므로 썸네일을 만들지 않습니다. **증빙을 추가·교체하면 썸네일을 다시 생성해야 합니다** — 명령은 [`site/README.md`](../../README.md) 3-4-2 에 있습니다.

연결 자료가 없는 5개 페이지는 근거 있는 연관 항목이 없어 의도적으로 비워 두었습니다 — 없는 관계를 억지로 만들지 않는 것이 원칙입니다.

```
experience/anti-root.html          experience/hspace.html
publications/apt-incident-review.html   publications/card-hacking.html
publications/rfid-skimming.html
```

## 전수 검수 이력

원본 PDF 42개의 텍스트를 정규식으로 훑어 민감 패턴(휴대폰·유선전화·생년월일·군번·학번)을 뽑고,
텍스트 레이어가 없는 스캔 원본 38개는 게시본을 눈으로 확인하는 방식으로 **당시 71장 전부** 점검했습니다(이후 2장 삭제, 현재 69장).

**교훈 — 마스킹 누락은 전부 *스캔 이미지* 또는 *표 형식 서식*에서 나왔습니다.**
텍스트 레이어 기반 자동 마스킹이 닿지 않는 유형이므로, 새 증빙을 넣을 때는
**반드시 게시본을 눈으로 확인**하세요. 자동 검사만으로는 잡히지 않습니다.

> 어느 파일에서 무엇이 누락되었는지는 저장소 밖 작업 노트에만 남겼습니다.
> 이 문서는 사이트와 함께 공개되므로, 과거에 어떤 문서에 어떤 식별자가 있었는지는 적지 않습니다.


### 새 증빙 추가 시 확인 목록

- [ ] 생년월일 · 휴대폰 · 학번 · 군번 · 자격번호 · 검증코드 → 가림
- [ ] **제3자 실명** (팀원, 확인자, 담당자) → 가림. 본인 이름은 남김
- [ ] 마스크가 글자 잉크 전체를 덮는지 (상하좌우 여유 4px 이상)
- [ ] 유효기간 · 교육기간 · 발급기관 · 직인 → 남김 (증명 가치)
- [ ] 방향이 바로 서 있는지 (스캔본은 90도 돌아간 경우가 있음)
- [ ] 같은 문서를 두 항목에 중복 등재하지 않았는지

---

자세한 유지보수 방법은 [`site/README.md`](../../README.md)를 참고하세요.
