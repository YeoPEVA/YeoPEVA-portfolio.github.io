# 이창엽 (Changyeob Lee) — Portfolio Site

디지털 포렌식·침해사고대응(DFIR) 중심의 정적 포트폴리오 사이트입니다. 빌드 도구 없이 순수 HTML/CSS/JS로 작성되어 있어 어떤 정적 호스팅에도 바로 배포할 수 있습니다.

디자인은 **"Case File(사건 파일)"** 컨셉의 에디토리얼 스타일입니다 — 세리프(Gowun Batang) + 산세리프(Pretendard) 타이포그래피, 차가운 회백색 아카이브 용지톤 배경, 각진 헤어라인 구분선, 절제된 러스트 색 포인트를 씁니다. 경험·프로젝트·수상·논문·교육은 여백에 문서 번호가 붙는 사건 기록(case log) 형식으로 통일되어 있습니다.

### 의도적으로 피한 것 (AI 슬롭 패턴)

[Impeccable](https://impeccable.style/)의 AI 슬롭 규칙집을 기준으로 감사해 아래를 배제했습니다. **새 컴포넌트를 추가할 때도 유지해야 합니다.**

| 피한 것 | 이유 |
|---|---|
| 보라/청록 그래디언트, 크림·베이지 배경 | AI 기본 팔레트. 차가운 회백색 용지톤 + 러스트로 대체 |
| 글래스모피즘(`backdrop-filter`) | 장식용 블러는 가독성만 해침 |
| 큰 숫자 통계 타일, 동일 카드 그리드 | AI 홈페이지 기본 레이아웃 |
| 이탤릭 세리프 디스플레이, 히어로 키커 레이블 중복 | 전형적 AI 제목 패턴 |
| 24px+ 라운드, 발광 그림자, 그래디언트 텍스트 | 각진 모서리(2px)·헤어라인으로 통일 |
| 레이아웃 속성(`padding`/`width`) 애니메이션 | 리플로우 유발 → `transform` 만 사용 |
| 12px 미만 글씨, 80자 초과 줄 길이 | 가독성 기준 미달 |
| 펄스 점, 마키, 바운스 이징 | 정보 없는 장식 모션 |

**`opacity: 0` 주의**: 등장 애니메이션은 `.js` 클래스 안에서만 적용합니다. `<head>` 인라인 스크립트가 `html`에 `.js`를 붙이며, 스크립트가 차단·실패해도 콘텐츠가 그대로 보입니다. 새 애니메이션도 반드시 `.js` 로 감싸세요.

**🔗 배포: https://info.yeopeva.me** — GitHub Pages 정적 호스팅 (빌드 과정 없음, `main` 푸시 시 즉시 반영)

---

## 0. GitHub Pages 배포

배포 저장소: `YeoPEVA/YeoPEVA-portfolio.github.io` (비공개) → **https://info.yeopeva.me**

| 파일 | 역할 |
|---|---|
| `CNAME` | 커스텀 도메인 `info.yeopeva.me` |
| `.nojekyll` | Jekyll 전처리 비활성화 (정적 파일 그대로 서빙) |
| `404.html` | GitHub Pages가 자동으로 사용 |
| `robots.txt` / `sitemap.xml` | 검색엔진용 |

### ⚠️ Pages 는 저장소의 **모든 파일**을 URL 로 서빙합니다

`.html` 만 올라가는 것이 아닙니다. 추적되는 파일은 전부 열립니다.

```
info.yeopeva.me/README.md                 ← 이 문서
info.yeopeva.me/assets/reports/README.md
info.yeopeva.me/nginx.conf
info.yeopeva.me/Dockerfile
info.yeopeva.me/docker-compose.yml
info.yeopeva.me/.gitignore
```

로컬 Docker 는 `.dockerignore` 로 일부를 제외하고 nginx 가 dotfile 을 막기 때문에
**로컬에서 404 여도 Pages 에서는 200 입니다.** 로컬 확인만으로 판단하지 마세요.

따라서 **저장소에 두면 곧 공개된다고 전제**하고 작업하세요.

- 내부 메모·미공개 계획·과거 유출 내역은 **저장소 밖**에 둡니다
- `robots.txt` 로 색인만 막을 수 있고 직접 접근은 못 막습니다
- 확인 방법:

```bash
cd site && git ls-files | grep -vE '\.(html|jpg|jpeg|png|svg|css|js|pdf|txt|xml)$'
# 위 목록이 전부 공개된다고 보고, 공개해도 되는 내용인지 검토
```

### 비공개 저장소 + Pages (확인 결과)

| 항목 | 결과 |
|---|---|
| 비공개 저장소에서 Pages 빌드 | **가능** — 개인 계정은 GitHub Pro 이상에서 지원 (Free는 공개 저장소만) |
| 게시된 사이트의 공개 여부 | **공개됨** — 저장소가 비공개여도 사이트는 누구나 볼 수 있음 |
| 사이트에 접근 제어 걸기 | **불가** — 비공개 게시(private publishing)는 Enterprise Cloud 조직 전용 |

> **저장소를 비공개로 두는 것은 커밋 이력·원본 파일을 감추는 효과뿐입니다.**
> `assets/reports/`의 증빙 이미지 69장은 URL만 알면 누구나 열 수 있습니다.
> 따라서 위 "증빙 자료 취급 원칙"은 저장소 공개 여부와 무관하게 항상 적용됩니다.

### 저장소 이름과 경로 제약 (중요)

`YeoPEVA-portfolio.github.io`는 **사용자 사이트가 아니라 프로젝트 사이트**입니다.
사용자 사이트가 되려면 이름이 정확히 `YeoPEVA.github.io` 여야 합니다.

| 배포 방식 | URL | 동작 |
|---|---|---|
| 커스텀 도메인 (`CNAME` 사용) | `https://info.yeopeva.me/` | ✅ 루트 서빙 — 정상 |
| 기본 URL (커스텀 도메인 미설정) | `https://yeopeva.github.io/YeoPEVA-portfolio.github.io/` | ❌ 하위 경로 — `404.html` 링크 깨짐 |

`404.html`은 임의 경로에서 호출되므로 `/assets/...` **절대경로**를 씁니다.
즉 **커스텀 도메인이 선택이 아니라 필수**입니다. `CNAME` 파일을 지우거나 Pages 설정에서
커스텀 도메인을 비우면 404 페이지의 CSS·링크가 전부 깨집니다.

### 배포 상태 (2026.08.20 라이브)

| 항목 | 값 |
|---|---|
| URL | **https://info.yeopeva.me** |
| Pages Source | `main` / `/ (root)` |
| 커스텀 도메인 | `info.yeopeva.me` (`CNAME` 파일로 자동 인식) |
| HTTPS | 강제 활성화 · `http` → 301 → `https` |
| 인증서 | Let's Encrypt (Pages 자동 갱신) |

CV 사이트는 `YeoPEVA/YeoPEVA.github.io` → **https://cv.yeopeva.me** 로 분리되어 있습니다.
두 사이트가 같은 도메인을 다투지 않도록 각자 `CNAME` 을 갖고 있으니 **어느 쪽도 `info`/`cv` 를 바꾸지 마세요.**
Pages 커스텀 도메인은 전역에서 저장소 하나만 소유할 수 있어, 겹치면 `domain is already taken` 으로 거부됩니다.

### 변경 반영 절차

`main` 에 푸시하면 Pages 가 자동으로 다시 빌드합니다(대개 30초 이내).

```bash
cd site
# 5장 점검 체크리스트를 먼저 돌린 뒤
git add -A && git commit -m "..." && git push

# 빌드 완료까지 대기 후 실제 배포본 확인
until [ "$(gh api repos/YeoPEVA/YeoPEVA-portfolio.github.io/pages/builds/latest --jq .status)" = "built" ]; do sleep 8; done
gh api repos/YeoPEVA/YeoPEVA-portfolio.github.io/pages/builds/latest --jq '{status,commit:.commit[0:7],duration}'
curl -s -o /dev/null -w '%{http_code}\n' https://info.yeopeva.me/
```

> **로컬에서 통과했다고 배포본이 같지 않습니다.** 모바일 LCP 12.2초는 로컬 nginx 에서는
> 보이지 않았고, 배포 후 Lighthouse 를 실제 URL 로 돌려서야 드러났습니다(원인: 외부 폰트 CDN).
> 큰 변경 뒤에는 **배포된 URL 로** 5장의 자동 감사를 한 번 더 돌리세요.

### 증빙 자료 취급 원칙

`assets/reports/`에는 **원본을 그대로 올리지 않습니다.** 아래 처리를 거친 결과물만 커밋합니다.

**마스킹** — 조회·사칭에 쓰일 수 있는 식별자
- 생년월일, 군번, 자격번호·등록번호(검증 시스템 조회 키), 학번, AWS 검증코드
- **제3자(팀원) 실명** — 본인 동의 없이 게시하지 않음

**보존** — 증명 가치가 있는 정보
- 성명(본인), 소속, 과정·대회명, 교육기간, 유효기간, 발급기관, 직인

**형식 규칙**
- PDF는 텍스트 레이어를 실제로 제거(redaction)한 뒤 **JPEG로 변환** — 마스킹 우회 텍스트 추출 차단
- EXIF·PDF 메타데이터(제작 도구, 브라우저 UA, 작성자) 제거
- 파일명은 **ASCII 슬러그만** (한글·공백은 URL 인코딩이 깨지기 쉬움)
- `assets/reports/`에 **PDF 원본을 두지 않음**
- 진위가 확인되지 않은 문서("진본 아님" 표기 등)는 올리지 않음

이력서 PDF(`assets/resume/`)는 **휴대폰 번호를 마스킹한 공개용**입니다. 실제 지원 시에는 연락처가 포함된 원본을 별도 제출하세요.

**원본(연락처 포함) 보관 위치** — 저장소에 절대 커밋하지 않습니다.

```
~/Documents/resume_original/resume_dfir_ko_original.pdf
~/Documents/resume_original/resume_dfir_en_original.pdf
```

`.gitignore` 가 `*.orig.pdf` 를 제외하고 있으나, 위 경로는 **저장소 밖**이므로 애초에 추적되지 않습니다.
공개용 PDF를 갱신할 때는 원본에서 다시 만들고 번호 제거 여부를 아래로 확인하세요.

```bash
cd site && python3 -c "
import pymupdf, glob
for f in sorted(glob.glob('assets/resume/*.pdf')):
    t=' '.join(p.get_text() for p in pymupdf.open(f))
    print(f, '번호 잔존:', '010' in t.replace(' ',''))
"
```

### 외부 링크 (한 곳만 고치면 되도록 정리)

| 링크 | 위치 | 비고 |
|---|---|---|
| 이력서 PDF (국문·영문) | 상단 `.masthead-actions` | `download` 속성 — 새 창이 아니라 바로 내려받습니다 |
| CV 사이트 `https://cv.yeopeva.me` | 상단 `.masthead-actions` (이력서 PDF 옆) | 별도 저장소의 Jekyll CV 사이트 |
| 기술 블로그 (Tistory) | 소개 `.about-links` + 하단 `.contact-actions` | |
| 회고 블로그 (Postype) | 하단 `.contact-actions` | 회고록 중심 |
| GitHub / LinkedIn | 소개 + 하단 | |

모든 외부 링크는 `class="btn btn-ext"` (또는 `.about-links a`)로 `↗` 표시가 자동으로 붙습니다.
JSON-LD `sameAs` 배열에도 같은 URL이 들어가므로, URL을 바꿀 때는 **`index.html` 상단 JSON-LD도 함께** 수정하세요.

> `cv.yeopeva.me` 는 별도 저장소(`YeoPEVA/YeoPEVA.github.io`)로 운영되는 Jekyll CV 사이트입니다.
> 이 포트폴리오와 **내용이 겹치므로**(경력 기간·수상·논문·자격) 한쪽만 고치면 어긋납니다.
> 이력이 바뀌면 이 사이트 · CV 사이트 · 이력서 PDF **세 곳을 함께** 보세요.

---

## 1. 폴더 구조

```
site/
├── index.html                # 메인 페이지 (소개/기술/경험/프로젝트/수상/논문/교육/연락처)
├── 404.html                   # 브랜드에 맞춘 404 페이지
├── experience/                # 경험 상세 6개 + other-activities.html (부록)
├── projects/                  # 프로젝트 상세 6개
├── awards/                    # 수상 상세 11개 + other-awards.html (부록)
├── publications/              # 발표·논문 상세 6개
├── education/                 # 교육 상세 4개 + other-training.html (부록)
├── assets/
│   ├── css/style.css         # 디자인 토큰 + 전체 스타일 (다크/라이트, 반응형)
│   ├── js/main.js            # 테마 토글, 모바일 메뉴, 모션, 읽기 진행률, 이메일 복사
│   ├── images/                # 프로필 사진, 파비콘
│   ├── resume/                 # 다운로드용 이력서 PDF (국문/영문)
│   └── reports/                # 수상·자격·교육·활동 증빙 이미지 (71개)
├── robots.txt / sitemap.xml   # 검색엔진용 — 도메인 변경 시 함께 수정
├── CNAME / .nojekyll          # GitHub Pages 설정
├── nginx.conf                 # 404 처리, gzip, 캐시 정책 (웹 루트에는 노출 안 됨)
├── Dockerfile / docker-compose.yml / .dockerignore
└── README.md
```

> **도메인을 바꾸면 반드시 함께 고쳐야 하는 곳** (현재는 `https://info.yeopeva.me` 기준):
> `robots.txt`의 `Sitemap:` / `sitemap.xml`의 모든 `<loc>` / 전 페이지의 `canonical`·`og:url`·`og:image` / `index.html`의 JSON-LD(`url`, `image`).
> 아래 한 줄로 전부 치환할 수 있습니다.
>
> ```bash
> cd site && grep -rl 'info.yeopeva.me' . --include='*.html' --include='*.txt' --include='*.xml' \
>   | xargs sed -i '' 's|info\.yeopeva\.me|새도메인.com|g'
> ```

### 공유·검색 최적화

- **전 페이지에 절대 URL `canonical`·`og:` 태그**가 들어 있습니다. 상대경로면 카카오톡·링크드인 미리보기가 뜨지 않습니다.
- `index.html`에 **JSON-LD `Person` 스키마**가 있습니다(이름·소속·GitHub/LinkedIn·전문 분야). 이름으로 검색될 때 유리합니다. 이력이 바뀌면 이 블록도 같이 고쳐야 합니다.
- `404.html`은 `noindex`이므로 `canonical`·`og:` 태그를 넣지 않습니다.

### 캐시 정책 (`nginx.conf`)

| 대상 | 정책 | 이유 |
|---|---|---|
| `.html` `.css` `.js` | `no-cache` (ETag 재검증) | 파일명에 해시를 붙이지 않는 구조라, 길게 캐시하면 수정이 며칠간 반영되지 않습니다 |
| 이미지·PDF·폰트 | `max-age=30d` | 자주 바뀌지 않습니다 |

`no-cache`는 "캐시 안 함"이 아니라 "쓰기 전에 서버에 물어봄"입니다. 내용이 그대로면 304로 응답해 트래픽은 거의 들지 않으면서 수정은 즉시 반영됩니다. gzip도 켜져 있어 CSS가 26KB → 7KB로 전송됩니다.

**부록 페이지 3개** (`other-*.html`)는 메인 목록에 넣으면 밀도가 떨어지는 항목을 모아 둔 곳입니다.
메인에서는 `그 외 … N건 더 보기` 링크로 들어갑니다. **항목을 추가하면 그 링크의 숫자도 함께 고쳐야 합니다.**

| 부록 | 현재 | 메인의 링크 문구 |
|---|---|---|
| `awards/other-awards.html` | 9건 | `그 외 수상 내역 9건 더 보기` |
| `experience/other-activities.html` | 2건 | `그 외 활동 내역 2건 더 보기` |
| `education/other-training.html` | 30건 | `그 외 교육·훈련 이수 내역 30건 더 보기` |

`other-training.html` 만 소분류 헤딩(KISA / OSSCA / AI·SW / 고등·학부)이 있는 구조이고,
정렬은 **그룹 안에서만** 합니다. 순번(`case-index`)은 그룹을 넘어 페이지 전체에서 연속입니다.

메인 페이지의 경험·프로젝트·수상 목록은 **요약만** 보여주고, 각 행의 "자세히 보기"(또는 행 전체 클릭)를 누르면 `experience/`, `projects/`, `awards/` 아래의 **독립된 URL을 가진 상세 페이지**로 이동합니다. 상세 페이지는 이전/다음 항목 페이저와, 관련된 다른 페이지·자료로 연결되는 "관련 자료" 블록을 가질 수 있습니다.

---

## 2. 로컬에서 확인하기

### Python으로 바로 보기

```bash
python3 -m http.server 4173 --directory site
```

브라우저에서 `http://localhost:4173` 접속.

### Docker로 보기

```bash
cd site
docker compose up --build
```

브라우저에서 `http://localhost:8080` 접속. 종료는 `docker compose down`.

`docker compose` 없이 직접 빌드/실행하려면:

```bash
docker build -t changyeob-lee-portfolio .
docker run --rm -p 8080:80 changyeob-lee-portfolio
```

> **`docker compose restart` 로는 파일 변경이 반영되지 않습니다.** CSS·HTML은 이미지 빌드 시점에
> 복사되므로 반드시 `up --build` 를 쓰세요. `restart` 만 하면 이전 빌드를 계속 서빙해
> "고쳤는데 그대로"인 상황이 생깁니다. 컨테이너가 실제로 새 파일을 갖고 있는지 확인:
>
> ```bash
> docker exec site-portfolio-1 md5sum /usr/share/nginx/html/assets/css/style.css; md5 -q site/assets/css/style.css
> ```

---

## 3. 콘텐츠 유지보수 가이드

### 3-1. 기존 항목 내용 수정 (제목, 날짜, 설명 등)

- **메인 페이지 요약**: `index.html`에서 `id`로 섹션을 찾습니다 (`#about`, `#skills`, `#experience`, `#projects`, `#awards`, `#publications`, `#education`, `#contact`).
- **상세 내용**: 해당 항목의 `experience/*.html`, `projects/*.html`, `awards/*.html` 파일을 직접 수정합니다.
- 메인 페이지 요약과 상세 페이지 본문은 서로 다른 파일에 **중복 작성**되어 있으므로, 한쪽만 고치면 내용이 어긋납니다. 항목을 수정할 때는 항상 **①메인 페이지의 요약 행 ②해당 상세 페이지** 두 곳을 함께 확인하세요.

> **한 항목이 여러 곳에 적혀 있습니다.** 하나만 고치면 어긋납니다.
>
> | 고칠 내용 | 함께 봐야 하는 곳 |
> |---|---|
> | 경험 기간 | `index.html` 경험 행 · 해당 상세 페이지 `doc-date` · **masthead `.mini-ledger`**(진행 중 항목만) · 경험 섹션 `.sec-meta` 연도 범위 |
> | 수상 추가·수정 | `index.html` 수상 행 · 상세 페이지 · **masthead `.mini-ledger`**(최근 3건일 때) · `.tally` 개수 · 수상 `.sec-meta` |
> | 논문 추가 | `index.html` 논문 행 · 상세 페이지 · `doc-label` 전체 재부여 · 페이저 체인 · `.tally` · `.sec-meta` · `sitemap.xml` |
> | 자격 추가 | `cert-list` · `.tally` 자격 개수 · 교육 `.sec-meta` — **집계는 만료를 뺀 유효 자격만** |
> | 부록 항목 추가 | 부록 페이지 · 메인의 `N건 더 보기` 문구 · 부록 페이지 `<title>`/`description` 의 개수 |
> | 기술 행 변경 | `#skills` · `.sec-meta` `N개 영역` · **이력서 PDF 의 `기술 및 관심 분야`** |

### 3-2. 정렬 규칙 (항목을 추가·수정할 때 반드시 확인)

모든 목록은 **역시간 순서(최신 → 과거)** 를 따릅니다. 정렬 기준은 다음 순서로 적용합니다.

1. **진행 중(`현재`) 항목이 종료된 항목보다 먼저** — 종료일을 "무한대"로 취급합니다.
2. 종료된 항목끼리는 **종료일 내림차순**.
3. 종료일이 같으면 **시작일 내림차순**.

시작일 기준으로 정렬하면 안 됩니다. 예를 들어 부산소프트웨어마이스터고(2023.04 –, **진행 중**)는
시작일이 가장 이르지만 진행 중이므로 이미 끝난 i-Keeper(– 2024.07)보다 **위**에 옵니다.
진행 중인 항목끼리는 시작일 내림차순이라 HSPACE(2025.10 –)·SCH(2025.09 –) **아래**입니다.

**날짜는 증빙 문서에 적힌 값을 그대로 씁니다.** 기억이나 파일명이 아니라 상장·수료증에 인쇄된 날짜가 기준입니다.
증빙과 사이트 표기가 어긋나면 서류 검토자가 두 개를 나란히 보고 바로 알아챕니다.
연도만 적지 말고 확인 가능한 만큼 정밀하게 적으세요 (`2024` ❌ → `2024.06.18` ✅).

정렬·날짜 정합성은 아래로 한 번에 검사할 수 있습니다.

```bash
cd site && python3 -c "
import re
s=open('index.html',encoding='utf-8').read()
def key(d):
    d=d.replace('–','~').replace('-','~'); p=[x.strip() for x in d.split('~')]
    def n(x,b=None):
        m=re.findall(r'\\d+',x)
        if not m: return None
        if len(m)>=3 and len(m[0])==4: return int(m[0])*10000+int(m[1])*100+int(m[2])
        if len(m)==2 and len(m[0])==4: return int(m[0])*10000+int(m[1])*100+31
        if len(m)==1 and len(m[0])==4: return int(m[0])*10000+1231
        if b and len(m)>=2: return (b//10000)*10000+int(m[0])*100+int(m[1])
    if len(p)>1 and '현재' in p[1]: return 10**9
    a=n(p[0]); return n(p[1],a) if len(p)>1 else a
for sec,sel in [('experience','case-date'),('projects','case-date'),('education','edu-time')]:
    blk=re.search(r'id=\"%s\".*?</section>'%sec,s,re.S).group(0)
    ds=re.findall(sel+r'[^>]*>([^<]+)<',blk); ks=[key(d) for d in ds]
    bad=[i for i in range(1,len(ks)) if (ks[i-1] or 0)<(ks[i] or 0)]
    print(sec, 'OK' if not bad else f'정렬 위반 {bad} → {ds}')
"
```

항목 순서를 바꾸면 **네 곳을 함께** 고쳐야 합니다. 하나만 고치면 목록과 상세 페이지가 어긋납니다.

| 고칠 곳 | 내용 |
|---|---|
| `index.html` 목록 순서 | `<a class="case-row">` 블록 위치 |
| `index.html` `case-index` | 01, 02, 03 … 표시 번호 |
| 상세 페이지 `doc-label` | `03.01`, `04.02` 처럼 `섹션.순번` (경험 03 · 프로젝트 04 · 수상 05 · 논문 06 · 교육 07) |
| 상세 페이지 `detail-pager` | 이전/다음 `href`와 제목 (양방향) |

수정 후 아래로 정합성을 확인할 수 있습니다.

```bash
cd site && python3 -c "
import re,os,glob
s=open('index.html',encoding='utf-8').read()
for folder,sec in [('experience','03'),('projects','04')]:
    blk=re.search(r'id=\"%s\".*?</section>'%folder,s,re.S).group(0)
    rows=re.findall(r'href=\"%s/([^\"]+)\">.*?case-index\">(\d+)<'%folder,blk,re.S)
    for href,num in rows:
        lab=re.search(r'doc-label\">([\d.]+)',open(f'{folder}/{href}',encoding='utf-8').read()).group(1)
        print(('OK ' if lab==f'{sec}.{int(num):02d}' else 'BAD'),folder,num,href,lab)
"
```

### 3-3. 새 항목(경험/프로젝트/수상) 추가하기

예시로 "경험(Experience)"에 새 항목을 추가하는 절차입니다. 프로젝트·수상도 동일한 방식입니다.

1. **상세 페이지 생성**: `experience/` 안의 기존 파일(예: `hspace.html`) 하나를 복사해 새 파일로 만듭니다. 파일명은 영문 소문자 slug로 짓습니다 (예: `new-role.html`).
2. **내용 채우기**: `<title>`, `<meta name="description">`, `doc-label`(문서 번호), `doc-date`, `doc-tag`, `<h1>`, `doc-role`, `doc-body` 안의 설명·목록을 새 내용으로 바꿉니다.
   - `doc-label`은 `섹션번호.항목번호` 형식입니다. 경험 `03.xx`, 프로젝트 `04.xx`, 수상 `05.xx`. **3-2의 정렬 규칙에 따라 들어갈 위치를 먼저 정하고**, 그 뒤 항목들의 번호를 한 자리씩 밀어야 합니다.
3. **페이저(이전/다음) 연결**: 새 항목의 앞뒤에 오는 항목의 `detail-pager`에서 `pager-prev`/`pager-next` `href`를 새 파일로 잇고, 새 파일의 페이저도 앞뒤 항목을 가리키도록 채웁니다. **한쪽만 연결하면 그 항목으로는 갈 수 있지만 되돌아오는 링크가 끊깁니다.**
4. **메인 페이지에 요약 행 추가**: `index.html`의 `#experience` 섹션(`<ol class="case-log">`)에 같은 형식의 `<a class="case-row reveal">` 블록을 추가하고, `case-index`(01, 02…), `case-date`, `case-tag`, 제목, 한 줄 요약, `<a class="case-link" href="experience/new-role.html">자세히 보기</a>`를 채웁니다.
5. **(선택) 관련 자료 연결**: 이 항목이 다른 프로젝트·수상·교육 이력과 실제로 연관이 있다면 아래 3-4를 참고해 `doc-related` 블록을 추가합니다.

수상(Award) 항목을 추가할 때는 3단계에서 `case-log`가 아니라 `award-list` 안의 `<a class="award-row reveal">` 블록 형식을 따릅니다 (`index.html` 안 `#awards` 섹션 참고).

### 3-4. 상세 페이지에 "관련 자료" 연결하기

각 상세 페이지의 `doc-body` 아래에는 아래와 같은 `doc-related` 블록을 넣어 다른 페이지나 실제 파일로 연결할 수 있습니다.

```html
<div class="doc-related">
  <p class="doc-related-title">관련 자료</p>
  <ul class="doc-related-list">
    <li><a href="../projects/mft-parser.html"><span class="kind">Project</span>MFT Parser 분석 &amp; 개선</a></li>
    <li><a href="../awards/kfsi-academy-2025.html"><span class="kind">Award</span>금융보안아카데미 2025 최우수상</a></li>
    <li><a href="../index.html#education"><span class="kind">Education</span>관련 교육 이력</a></li>
  </ul>
</div>
```

- `<span class="kind">`에는 자료 종류를 짧게 표기합니다: `Project`, `Experience`, `Award`, `Education`, `Paper`, `PDF`, `Slide` 등.
- 내부 페이지는 상대경로로(`../projects/...`, `../index.html#education`), 외부 링크(논문 DOI 등)는 `target="_blank" rel="noopener"`를 붙입니다.
- **양방향으로 연결**하는 것을 권장합니다 — A 페이지에서 B로 링크했다면, B 페이지에도 A로 돌아가는 링크를 추가하세요. 현재 사이트에는 다음 관계가 이미 연결되어 있습니다.

| 페이지 | 관련 자료로 연결된 페이지 |
|---|---|
| `experience/ikeeper.html` | `projects/mft-parser.html` |
| `experience/sch-security.html` | `projects/malware-yara.html` |
| `experience/rokaf.html` | `awards/rokaf-hacking-competition.html` |
| `projects/kfsi-academy.html` | `awards/kfsi-academy-2025.html`, `#education` |
| `projects/dfir-competitions.html` | `awards/honam-cybersecurity-2025.html`, `awards/honam-cybersecurity-2024.html`, `awards/digital-criminal-finder.html` |
| `projects/stellar-agent.html` | `awards/schu-ai-sw-festival-2025.html`, `publications/stellar-agent-paper.html` |
| `publications/stellar-agent-paper.html` | `projects/stellar-agent.html`, `awards/schu-ai-sw-festival-2025.html` |
| `awards/schu-ai-sw-festival-2025.html` | `projects/stellar-agent.html`, `publications/stellar-agent-paper.html`, `education/sch-university.html` |
| `projects/bob-platform.html` | 경찰학연구 논문 DOI(외부), `#education` |

**관련 자료는 세 종류를 지원하며 화면에서 자동으로 구분됩니다.**

| 종류 | 표시 | 마크업 |
|---|---|---|
| 내부 페이지 | 표시 없음 | 기본 `<a href="../…">` |
| 외부 URL (DOI·GitHub 등) | `↗` 자동 | `target="_blank" rel="noopener"` |
| 파일 다운로드 (PDF 등) | `↓` 자동 + 테두리 배지 | `download` 속성 |

파일 크기 등 부가 정보는 `<span class="meta">1.2 MB</span>` 로 넣으면 오른쪽에 정렬됩니다.

- **실제 보고서·인증서 파일을 첨부하려면** `assets/reports/` 규칙을 따르세요. 폴더 구성, 복사해서 쓰는 마크업 틀, 링크 전수 검사 명령까지 [`assets/reports/README.md`](assets/reports/README.md)에 정리되어 있습니다.
- **하나의 성과가 여러 종류에 걸치는 경우를 놓치기 쉽습니다.** Stellar-Agent 는 프로젝트이면서 논문 발표 건이고 동시에 SCHU AI &amp; SW Festival 대상 수상 건입니다(상장 작품주제가 프로젝트 부제와 동일). 처음에는 프로젝트↔논문만 연결되어 있어 수상이 무관한 항목처럼 보였습니다. 새 수상을 넣을 때는 **상장에 적힌 작품명·작품주제를 프로젝트 목록과 맞춰 보세요.**
- 실제로 연결할 자료가 없는 항목은 블록을 넣지 않습니다 — 근거 없는 링크를 억지로 만들지 않는 것이 원칙입니다.
  현재 상세 37쪽 중 **28쪽이 오른쪽 레일**(`.doc-layout`), **3쪽이 본문 플레이트**(부록 갤러리),
  **6쪽은 연결할 자료가 없어 1열 그대로**입니다(`404.html`, `anti-root`, `hspace`, `apt-incident-review`, `card-hacking`, `rfid-skimming`).
  레이아웃과 플레이트 규격은 아래 3-4-1 ~ 3-4-3 을 보세요.

### 3-4-1. 상세 페이지 레이아웃 — 본문 + 오른쪽 마지널리아

상세 페이지는 `.doc-layout` 2열 격자입니다.

```
<div class="doc-layout">
  <article class="doc"> … 본문 … </article>
  <aside class="doc-aside"> … 증빙 플레이트 · 관련 자료 … </aside>
</div>
```

| | 폭 | 근거 |
|---|---|---|
| `.doc` (본문) | 최대 **720px** | 한글 약 44자/줄. 가독 행장 상한이며 모바일과 무관합니다 |
| `.doc-aside` (레일) | **264px** | container 내부 1064px − 본문 720px − 간격 56px |

- **1100px 이상**에서만 2열이 됩니다. 그 아래에서는 레일이 본문 뒤로 내려가고, 플레이트는 자동으로 격자 배치됩니다(masthead 마지널리아와 같은 방식).
- 레일에서는 `관련 자료`의 `kind` 배지가 위로 올라가 텍스트 폭을 확보합니다. 본문(720px)에 둘 때는 종전처럼 한 줄입니다.
- 인쇄 시 `.doc-aside` 는 숨겨집니다.

### 3-4-2. 증빙 썸네일 플레이트 (`.plate`)

증빙 이미지는 텍스트 링크가 아니라 **썸네일 플레이트**로 보여줍니다. 원본은 새 창으로 열립니다.

**원본을 그대로 쓰면 안 됩니다.** 증빙 원본 69장은 8,177 KB(평균 118 KB)입니다. `assets/reports/thumbs/` 의 396px WebP 는 63장 966 KB(평균 15 KB)로, 30장이 걸린 `other-training.html` 이 초기 108 KB만 받고 나머지는 `loading="lazy"` 로 뒤따릅니다.

**썸네일 생성** — 증빙을 추가·교체하면 반드시 다시 돌리세요.

```bash
cd site
python3 <<'EOF'
from PIL import Image
import glob, os
W = 396
for f in sorted(glob.glob('assets/reports/**/*.jpg', recursive=True)):
    if '/thumbs/' in f: continue
    # 자격증 증빙은 index 의 점선 리더 목록에서 텍스트 링크로만 쓰므로 썸네일을 만들지 않습니다.
    # 만들어 두면 5장 '미참조 자산' 검사에 계속 걸립니다.
    if '/certificates/' in f: continue
    out = 'assets/reports/thumbs/' + os.path.basename(f).rsplit('.', 1)[0] + '.webp'
    im = Image.open(f).convert('RGB')
    im.resize((W, round(im.height * W / im.width)), Image.LANCZOS).save(out, 'WEBP', quality=75, method=6)
    print(out, os.path.getsize(out) // 1024, 'KB', '/ 원본', os.path.getsize(f) // 1024, 'KB')
EOF
```

**마크업** — `width`/`height` 는 썸네일의 실제 크기이며, **빠뜨리면 CLS 가 생깁니다.** `KB` 표기는 원본 크기(2진 KB 반올림)입니다.

> **`alt` 은 비워 둡니다.** 바로 아래 `plate-cap` 이 같은 내용을 담고 있어, `alt` 에 캡션을 반복하면
> 스크린리더가 두 번 읽습니다. 링크의 접근 이름은 `plate-cap` + `plate-meta` 텍스트가 담당합니다.
> 실제로 캡션을 `alt` 에 그대로 넣었다가, 3-6-1 집계 검증 스크립트가 디범찾 회차를 이중 계산하면서
> 드러났습니다(`수상: 표기 23 / 계산 27`). 본문 삽입 이미지(`.doc-figure`)는 반대로 `alt` 을 채웁니다 —
> 그림 내용과 `figcaption` 의 설명이 서로 다른 역할을 하기 때문입니다.

```html
<ul class="plate-list plate-grid">
  <li><a class="plate" href="../assets/reports/awards/example.jpg" target="_blank" rel="noopener">
    <img src="../assets/reports/thumbs/example.webp" alt=""
         width="396" height="560" loading="lazy" decoding="async">
    <span class="plate-cap">상장 · 2025.11.05</span>
    <span class="plate-meta">JPG · 105 KB</span>
  </a></li>
</ul>
```

| 클래스 | 쓰는 곳 | 배치 |
|---|---|---|
| `.plate-list.plate-grid` | 오른쪽 레일 (`.doc-aside`) | 1장이면 168px, 2장 이상이면 2단 125px |
| `.plate-list.plate-row` | 본문 안, 항목마다 증빙이 흩어진 부록 페이지 | 가로 격자, 장당 최대 168px |

> `.plate-grid` 는 `repeat(auto-fit, minmax(115px, 1fr))` 를 씁니다. 최대값을 `168px` 같은 확정값으로 두면 `auto-fit` 이 **최대값 기준으로 트랙 수를 계산해 1단**이 됩니다. 1장인 경우만 `li:only-child { max-width: 168px }` 로 묶습니다.

**레일에 넣지 않는 경우** — 증빙이 5장 이상이고 항목마다 흩어져 있으면(`other-training.html` 30장, `other-awards.html` 9장) 레일이 본문보다 훨씬 길어집니다. 이때는 `.plate-row` 로 본문 안에 둡니다. 세로 1단으로 레일에 쌓으면 본문 대비 높이차가 1,300px까지 벌어져 왼쪽이 비어 보입니다.

**index 자격 목록은 텍스트 링크를 유지합니다** — 점선 리더(dot leader) 디자인이 썸네일과 맞지 않습니다. 그래서 자격증 증빙 6장은 썸네일을 만들지 않습니다.

### 3-4-3. 본문 삽입 이미지 (`.doc-figure`)

> **실사용 예 — 논문 요약 캡처.** `publications/` 6쪽에 논문의 **제목 + 요약**만 잘라 넣었습니다.
> 1페이지를 통째로 올리면 저자 블록의 개인정보가 함께 공개됩니다 — 실제로 Stellar-Agent 논문에는
> 공저자 4명의 이메일이, CISC-W 2018·2019 논문에는 공저자들의 **고등학교·중학교명과 학년**(당시 미성년)이
> 있었습니다. PyMuPDF 블록 좌표로 제목·요약 영역만 렌더링하고 저자·소속·이메일 밴드는 배제했으며,
> 위험 문자열(`@`·`고등학교`·`중학교`·`학년`·`대학교`·`gmail`·`ac.kr`) 검사로 0건을 확인했습니다.
> **논문·상장처럼 사람이 찍힌 문서를 캡처할 때는 필요한 영역만 잘라내는 편이 마스킹보다 안전합니다.**


프로젝트 설명 중간에 스크린샷·다이어그램을 넣을 때 씁니다. 본문 측정폭(720px)을 씁니다.

```html
<figure class="doc-figure">
  <a href="../assets/figures/example.webp" target="_blank" rel="noopener">
    <img src="../assets/figures/example.webp" alt="무엇을 보여주는 그림인지"
         width="1080" height="608" loading="lazy" decoding="async">
  </a>
  <figcaption><b>짧은 제목.</b> 그림이 무엇을 보여주는지 한 문장.
    <span class="doc-figure-note">WEBP · 1080×608</span></figcaption>
</figure>
```

2장을 나란히 두려면 `.doc-figure-pair` 로 감쌉니다. 620px 이하에서 자동으로 1열이 됩니다.

```html
<div class="doc-figure-pair">
  <figure class="doc-figure"> … </figure>
  <figure class="doc-figure"> … </figure>
</div>
```

- 파일은 **`assets/figures/`** 에 둡니다. 증빙(`assets/reports/`)과 달리 본문에 직접 실리는 그림입니다.
- **원본 폭은 1080px 로 맞추세요.** 본문 720px × 레티나 1.5배입니다. 더 크면 낭비이고, 작으면 흐려집니다.
- 원본을 새 창으로 열 필요가 없으면 `<a>` 없이 `<img>` 만 둡니다.
- `alt` 는 "무엇을 보여주는 그림인지"를 씁니다. 파일명이나 "스크린샷"만 쓰지 마세요.
- 스크린샷에 실명·이메일·사번·내부 호스트명·토큰이 찍히지 않았는지 **게시본을 눈으로** 확인하세요. 증빙 이미지와 같은 기준입니다([`assets/reports/README.md`](assets/reports/README.md)).

#### 어느 상세 페이지에 넣을 수 있는가 — 전수 검증 결과

**전체 38쪽 중 37쪽에 넣을 수 있습니다.** 넣을 수 없는 것은 `404.html` 하나뿐이며, 본문 컨테이너(`.doc-body`/`.case-body`)가 없기 때문입니다. `index.html` 도 `.case-body` 가 있어 가능합니다.

각 페이지에 `.doc-figure` 단독 1장과 `.doc-figure-pair` 2장을 실제로 주입해 4개 폭에서 렌더한 결과입니다. **페이지 가로 넘침 0건, 컨테이너 밖으로 삐져나온 그림 0건, 오른쪽 레일 깨짐 0건.**

| 페이지 유형 | 쪽수 | 1440px | 1100px | 900px | 430px | 원본 권장 |
|---|---|---|---|---|---|---|
| 상세 — 오른쪽 레일(`.doc-layout`) · 1열 | 33 | 720px | 720px | 720px | 390px | **1080px** |
| 상세 — 부록 갤러리 | 3 | 716–736px | 716–736px | **802px** | 348px | **1200px** |
| `index.html` 본문 목록 | 1 | 684px | 664px | 720px | 390px | 1080px |

- 갤러리 3쪽이 720px 을 넘는 이유는 `<article class="doc" style="max-width:920px">` 인라인 지정 때문입니다. 목록 페이지라 본문 측정폭 규칙을 적용하지 않습니다. 900px 폭에서 `.case-row` 가 1열로 접히며 **802px 까지 커지므로** 원본은 1200px 로 준비하세요.
- `.doc-figure-pair` 는 정확히 **620px 이하에서 1열**로 바뀝니다. 2열 유지 구간의 최소 그림폭은 282px 입니다.
- 인쇄에서 그림은 그대로 나오고(720px), `.doc-aside` 만 숨습니다.
- 그림을 주입한 상태로 axe 를 다시 돌려도 **다크·라이트 두 테마 모두 위반 0건**입니다.

**직접 재검증하려면** — 파일을 고치지 않고 DOM 주입으로 확인합니다. 아래 axe 블록과 같은 도구를 씁니다.

```bash
cd site && docker compose up --build -d && sleep 6
npm --silent install --no-save puppeteer-core
node -e "
const puppeteer = require('puppeteer-core');
const fs = require('fs'), path = require('path');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const IMG = '/assets/reports/thumbs/busan-2025-activity.webp';
const walk = (d, o = []) => { for (const f of fs.readdirSync(d)) { const q = path.join(d, f);
  if (fs.statSync(q).isDirectory()) { if (!['assets', '.git', '.claude', 'node_modules'].includes(f)) walk(q, o); }
  else if (f.endsWith('.html')) o.push(q); } return o; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  for (const w of [1440, 1100, 900, 430]) {
    let n = 0, bad = 0, widths = new Set();
    for (const f of walk('.').sort()) {
      const p = await b.newPage();
      await p.setViewport({ width: w, height: 900 });
      await p.goto('http://localhost:8080/' + f.replace(/^[.]\//, ''), { waitUntil: 'load' });
      const ok = await p.evaluate((img) => {
        const t = document.querySelector('.doc-body') || document.querySelector('.case-body');
        if (!t) return false;
        const mk = (cw, ch) => { const g = document.createElement('figure'); g.className = 'doc-figure';
          g.innerHTML = '<img src=\"' + img + '\" alt=\"검증용\" width=\"' + cw + '\" height=\"' + ch + '\">' +
                        '<figcaption>검증용 설명</figcaption>'; return g; };
        t.appendChild(mk(1080, 608));
        const pr = document.createElement('div'); pr.className = 'doc-figure-pair';
        pr.appendChild(mk(1080, 608)); pr.appendChild(mk(1080, 1400)); t.appendChild(pr);
        return true; }, IMG);
      if (!ok) { await p.close(); continue; }
      const m = await p.evaluate(() => {
        const c = (document.querySelector('.doc-body') || document.querySelector('.case-body')).getBoundingClientRect();
        const im = [...document.querySelectorAll('.doc-figure img')].map(i => i.getBoundingClientRect());
        const a = document.querySelector('.doc-aside');
        return { over: document.documentElement.scrollWidth > innerWidth + 1,
                 spill: im.filter(r => r.right > c.right + 1 || r.left < c.left - 1).length,
                 aside: !a || (a.getBoundingClientRect().right <= innerWidth + 1 && a.getBoundingClientRect().width > 0),
                 w: Math.round(im[0].width) }; });
      n++; widths.add(m.w);
      if (m.over || m.spill || !m.aside) { bad++; console.log('  BAD', w, f, JSON.stringify(m)); }
      await p.close();
    }
    console.log(w + 'px: ' + n + '쪽 검사 / 문제 ' + bad + '쪽 / 그림폭 ' + [...widths].sort((x, y) => x - y).join(','));
  }
  await b.close();
})();
"
```

### 3-5. 프로필 사진 교체

사진은 `assets/images/profile.jpeg` 한 파일만 씁니다. 같은 경로에 덮어쓰면 바로 반영됩니다.

```bash
cp <새-사진-경로> site/assets/images/profile.jpeg
```

- **원본 비율 그대로 표시되며 잘리지 않습니다.** CSS가 `height: auto`라 3:4 증명사진이든 다른 비율이든 그대로 나옵니다.
- 강제 비율(`aspect-ratio`) + `object-fit: cover` 는 쓰지 마세요. 증명사진의 머리 위·어깨가 잘립니다.
- 색 보정 필터도 걸지 않습니다. 취업용 사진은 실제 색이 그대로 보여야 합니다.
- 파일명을 바꾸려면 `index.html`의 `.about-photo img` `src`와 `width`/`height`(원본 픽셀 크기)도 함께 고치세요. `width`/`height`는 로딩 중 레이아웃이 밀리지 않게 하는 값입니다.

### 3-6. 이력서 PDF 갱신

`assets/resume/resume_dfir_ko.pdf`, `resume_dfir_en.pdf`는 `latex_resume_template_kor` 레포에서 컴파일된 최신 이력서입니다. 이력서를 갱신하면 이 파일도 함께 교체하고, 내용이 크게 바뀌었다면 `index.html`과 각 상세 페이지도 함께 업데이트하세요.

---

### 3-6-1. 소개 영역 집계(`.tally`) 산출 기준

숫자를 손으로 세지 마세요. 아래 기준으로 계산하고, 항목을 고칠 때 함께 갱신합니다.

| 표기 | 산출식 | 현재 |
|---|---|---|
| 수상 | 본문 목록 행 − 디범찾 1행 + 디범찾 개별 건수 + 부록 건수 | 11 + 4 + 9 = **24** |

> 같은 숫자가 **두 곳**에 적힙니다 — `#about` 의 `.tally`(`수상 <b>24</b>`)와 `#awards` 의 `.sec-meta`(`24건 · 2017–2026`).
> 아래 스크립트는 `.tally` 만 검사하므로, `.sec-meta` 의 연도 범위도 함께 눈으로 확인하세요.
| 발표·논문 | 논문 목록 행 수 | **6** |
| 연구·커뮤니티 | 경험 목록 행 수 | **6** |
| 자격 | 자격 목록 중 **`만료` 배지가 없는 것만** | 7건 중 만료 2건 제외 = **5** |

`수상 24` 는 `assets/reports/awards/` 의 증빙 이미지 장수와 일치해야 합니다 — 어긋나면
증빙을 빠뜨렸거나 목록에 근거 없는 항목이 있다는 뜻입니다.

```bash
cd site && python3 -c "
import re, glob
h=open('index.html',encoding='utf-8').read()
main=len(re.findall(r'<a class=\"award-row', re.search(r'<div class=\"award-list\".*?\n        </div>',h,re.S).group(0)))
dcf=len(re.findall(r'제\d+회 \(20\d\d\)', open('awards/digital-criminal-finder.html',encoding='utf-8').read()))
apx=len(re.findall(r'<div class=\"case-row', open('awards/other-awards.html',encoding='utf-8').read()))
certs=re.findall(r'<li class=\"reveal\">(.*?)</li>', re.search(r'cert-list.*?</ul>',h,re.S).group(0), re.S)
calc={'수상': main-1+dcf+apx, '발표·논문': len(re.findall(r'<a class=.pub-item', h)),
      '연구·커뮤니티': len(re.findall(r'case-row[^\"]*\"[^>]*href=\"experience/', h)),
      '자격': len([c for c in certs if 'expired' not in c])}
for k,v in calc.items():
    m=re.search(re.escape(k)+r' <b>(\d+)</b>', h)
    print(f'{k}: 표기 {m.group(1) if m else \"?\"} / 계산 {v}', 'OK' if m and int(m.group(1))==v else '⚠️ 불일치')
print('증빙 이미지', len(glob.glob('assets/reports/awards/*.jpg')), '장 = 수상', calc['수상'], 'OK' if len(glob.glob('assets/reports/awards/*.jpg'))==calc['수상'] else '⚠️')
"
```

### 3-7. 기술 & 관심 분야 편집 (`#skills`)

**태그를 늘리는 방향으로 손대지 마세요.** 처음에는 6개 행 30개 태그였는데,
`Windows Artifact`·`MFT`·`Registry`·`Prefetch`·`Event Log` 처럼 한 역량의 하위 항목이
따로 태그가 되고, `IoC 정리`·`분석 보고서 작성`·`CloudGoat 학습` 처럼 역량이 아닌 것이 섞여
"무엇을 실제로 할 수 있는지"가 읽히지 않았습니다. 지금은 **4행 19태그**입니다.

| 규칙 | 내용 |
|---|---|
| 행은 **역량 묶음** | `디지털 포렌식 · 침해대응` / `악성코드 분석 · 탐지 룰` / `보안 운영` / `엔지니어링` |
| 행마다 **한 줄 설명 필수** | `.skill-note` — 태그만 있으면 층위가 뭉개집니다. 무엇을 했는지 문장으로 씁니다 |
| 태그는 **훑어보기용** | 행당 4~6개. 세부는 설명 문장에 넣습니다 |
| 설명은 **범위를 못박습니다** | `Windows/Linux 주요 아티팩트` 같은 무한 표현 대신 `$MFT·Prefetch·이벤트 로그·웹 로그·PCAP` 처럼 나열합니다. 나열 밖은 묻지 않거나, 물어도 안 해봤다고 답하기 쉽습니다 |
| 근거 0인 태그는 **뺍니다** | `AWS` 를 뺀 이유입니다 — 상세 페이지 언급 0곳에 자격증도 만료였습니다. 자격 목록에는 남겨 둡니다 |
| **역량이 아닌 것은 아래로** | 관심 분야·언어는 `.skill-foot` 정의목록으로 분리 |
| 학습 중인 것은 **태그로 넣지 않음** | 근거로 이어지지 않는 태그는 오히려 신뢰를 깎습니다 |
| **강조** 배지는 한 행에만 | `.skill-level` 은 네 행 모두에 붙이되, 주력 외에는 `.is-sub` 로 강조를 뺍니다. 배지를 한 행에만 두면 나머지 셋이 무표시=동급으로 읽혀, 복무 중 경험(03)이 주력과 같은 무게로 보입니다. 강조는 하나, 층위는 전부 — 두 가지를 같이 만족시키려고 두 단계로 나눴습니다 |
| 행마다 **근거 줄 필수** | `.skill-src` — 태그는 주장이고 이 줄은 그 주장이 어디에서 나왔는지입니다. 근거 경로가 없으면 읽는 사람은 어느 칸이 깊은지 몰라 가장 약해 보이는 태그부터 확인하려 듭니다. 링크는 **기존 상세 페이지**만 씁니다 |

```html
<div class="skill-row reveal">
  <div class="skill-row-head">
    <span class="skill-index">01</span>
    <h3>디지털 포렌식 · 침해대응</h3>
    <span class="skill-level">주력</span>            <!-- 강조는 한 행에만 -->
    <!-- 나머지 행: <span class="skill-level is-sub">복무 경험</span> -->
  </div>
  <div class="skill-body">
    <p class="skill-note">무엇을 어떻게 하는지 한 문장.</p>
    <div class="tag-list"><span class="tag">…</span></div>
    <p class="skill-src"><span class="lbl">근거</span>
      <a href="awards/…">대표 사례</a></p>
  </div>
</div>
```

**제목 길이 제약** — 왼쪽 라벨 칸이 `210px` 이고 순번(15px)과 간격(10px)을 빼면 **185px** 남습니다.
넘으면 그 행만 제목이 줄바꿈되어 다른 행과 어긋나 보입니다. 그래서 1행은
`디지털 포렌식 · 침해사고 대응`(197px)이 아니라 `디지털 포렌식 · 침해대응`(163px)을 씁니다.
제목을 바꿀 때 아래로 폭을 먼저 재보세요.

폭은 브라우저 콘솔에서 실제 서체로 재는 것이 정확합니다. `localhost:8080` 을 열고:

```js
(() => {
  const ref = document.querySelector('.skill-row h3');
  const p = document.createElement('h3');
  const cs = getComputedStyle(ref);
  p.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap';
  Object.assign(p.style, {font: cs.font, fontFamily: cs.fontFamily,
    fontSize: cs.fontSize, fontWeight: cs.fontWeight, letterSpacing: cs.letterSpacing});
  document.body.appendChild(p);
  const w = t => { p.textContent = t; return Math.round(p.getBoundingClientRect().width); };
  const r = ['디지털 포렌식 · 침해대응', '바꿀 제목'].map(t => `${t} → ${w(t)}px ${w(t) > 185 ? '⚠️ 넘침' : 'OK'}`);
  p.remove();
  return r;
})()
```

**섹션 부제도 함께** — `.sec-meta` 의 `4개 영역` 은 행 개수입니다.

- `#skills` 는 상세 페이지가 없는 유일한 섹션이라 `doc-label`·페이저 정합 검사 대상이 아닙니다.
- 이력서(`assets/resume/`)의 `기술 및 관심 분야` 와 **내용이 겹칩니다.** 한쪽만 고치면 어긋납니다.

## 4. 디자인 시스템 참고 (스타일 수정 시)

`assets/css/style.css` 최상단 `:root`에 디자인 토큰이 정의되어 있습니다. 색을 바꾸거나 톤을 조정할 때는 개별 요소가 아니라 이 토큰 값을 바꾸세요.

| 토큰 | 역할 |
|---|---|
| `--bg`, `--bg-elevated`, `--bg-alt` | 배경 — 라이트는 회백색 용지 `#e9e9e5`, 다크는 차가운 차콜 `#14161a` |
| `--text`, `--text-muted`, `--text-faint` | 글자색 (진하게/보통/연하게) |
| `--border`, `--border-strong` | 구분선 (얇은/강조) |
| `--accent`, `--accent-strong`, `--accent-soft` | 포인트 색(러스트) — 라이트 `#9c3c22` / 다크 `#e2794c` |
| `--font-serif` | 제목용 세리프 (Gowun Batang) |
| `--font-sans` | 본문용 산세리프 (Pretendard) |
| `--font-mono` | 날짜·라벨·섹션 번호용 모노스페이스 |
| `--ease`, `--ease-mask` | 모션 이징 (일반 / 마스크·라인용) |

라이트/다크 테마는 `:root[data-theme="light"]`, `:root[data-theme="dark"]`, 그리고 시스템 설정을 따르는 `@media (prefers-color-scheme: dark)` 세 곳에서 정의됩니다. 색을 바꿀 때는 **라이트·다크 두 세트를 함께** 수정해야 테마 전환이 깨지지 않습니다.

### 레이아웃 문법

본문은 인쇄물의 **여백주석(marginalia)** 구조를 씁니다. 각 섹션은 `.section-grid`로 왼쪽 여백 칼럼과 본문 칼럼을 나눕니다.

```html
<section class="section" id="…">
  <div class="container section-grid">
    <div class="section-aside reveal">
      <span class="sec-num">03</span>       <!-- 섹션 번호 (스크롤 시 고정) -->
      <span class="sec-meta">6건 · 2017–2026</span>  <!-- 실제 메타데이터 -->
    </div>
    <div class="section-main">
      <h2 class="section-title reveal">주요 경험</h2>
      <span class="rule"></span>            <!-- 그려지는 헤어라인 -->
      …
    </div>
  </div>
</section>
```

`.sec-meta`에는 장식이 아니라 **실제 정보**(건수, 기간, 분류)를 넣습니다. 모바일에서는 여백 칼럼이 제목 위 한 줄로 접힙니다.

#### 상세 페이지 마지널리아 (`.doc-layout`)

index 섹션은 여백주석이 **왼쪽**이지만, 상세 페이지는 **오른쪽**입니다. 본문 왼쪽에 번호·날짜를 세우면 제목 위 메타 줄과 중복되기 때문입니다.

```html
<div class="doc-layout">
  <article class="doc">
    <p class="doc-label">03.03 · Experience</p>
    <div class="doc-meta-row"> … 날짜 · 태그 … </div>
    <h1>…</h1>
    <div class="doc-body"> … 본문 · .doc-figure … </div>
  </article>
  <aside class="doc-aside"> … 증빙 플레이트 · 관련 자료 … </aside>
</div>
```

- 본문 **720px**(한글 약 44자/줄) + 레일 **264px**, 간격 56px. **1100px 이상**에서만 2열이 됩니다.
- 레일이 본문보다 크게 길어지면 왼쪽이 비어 보입니다. 증빙 플레이트는 2단 격자로 묶고, 5장 이상이 흩어진 부록 페이지는 `.plate-row` 로 본문에 둡니다(3-4-2).
- 인쇄에서는 `.masthead-aside` 와 함께 숨습니다.

#### masthead 오른쪽 마지널리아 (`.masthead-aside`)

본문은 `.masthead-main` 이 `62ch` 로 끊기므로 데스크톱에서 오른쪽이 비어 보였습니다.
그 자리에 **지금 무엇을 하고 있는지와 최근 성과**를 넣었습니다. 900px 이하에서는 본문 아래로 내려갑니다.

```html
<aside class="masthead-aside" aria-label="활동 현황">
  <p class="aside-label reveal">현재 진행 중</p>
  <ul class="mini-ledger" data-stagger>
    <li class="reveal"><a href="experience/hspace.html">HSPACE FORENSIC LAB</a><span class="dots" aria-hidden="true"></span><time>2025.10 –</time></li>
  </ul>
</aside>
```

- `<em>` 은 수상 등급처럼 **두 번째 줄에 놓을 보조 정보**에 씁니다 (블록 표시 + 러스트색).
- **내용이 중복이므로 함께 고쳐야 합니다.** 경험 항목의 기간을 바꾸면 `현재 진행 중` 도,
  수상을 추가하면 `최근 수상` 도 손대야 합니다. 아래로 대조하세요.

```bash
cd site && python3 -c "
import re
h=open('index.html',encoding='utf-8').read()
a=re.search(r'<aside class=\"masthead-aside\".*?</aside>',h,re.S).group(0)
e=re.search(r'id=\"experience\".*?</section>',h,re.S).group(0)
for href,_ in re.findall(r'href=\"(experience/[^\"]+)\"[^>]*>([^<]+)<',a):
    m=re.search(r'href=\"'+re.escape(href)+r'\".*?case-date\">([^<]+)<',e,re.S)
    t=re.search(r'href=\"'+re.escape(href)+r'\"[^>]*>[^<]*</a><span class=\"dots\"[^>]*></span><time>([^<]+)<',a)
    print(href, '| 마지널리아', t.group(1).strip(), '| 경험섹션', m.group(1))
"
```

#### 모바일 메뉴 닫힘 처리 (`inert` + `visibility`)

**`opacity: 0` 과 `pointer-events: none` 만으로 닫으면 마우스에만 닫히고 키보드에는 열려 있습니다.** `pointer-events` 는 키 입력과 무관하므로, 메뉴를 열지 않아도 `Tab` 이 보이지 않는 링크 8개를 순회합니다. 실제로 그런 상태로 배포되어 있었고 Chromium 모바일 폭에서 재현됐습니다.

| 속성 | 막는 것 | 못 막는 것 |
|---|---|---|
| `opacity: 0` | 보이는 것 | 클릭 · 포커스 · 접근성 트리 |
| `pointer-events: none` | 마우스 · 터치 | **키보드 포커스** |
| `visibility: hidden` | 마우스 · 키보드 포커스 | (페이드 전환과 함께 쓰려면 지연 필요) |
| `inert` | 클릭 · 포커스 · 접근성 트리 | — |

현재는 **셋을 함께** 씁니다. `inert` 가 의도를 명확히 하고, `visibility` 가 `inert` 미지원 브라우저의 안전망입니다.

```css
.main-nav{                                  /* @media (max-width: 720px) 안 */
  opacity: 0; transform: translateY(-8px); pointer-events: none;
  visibility: hidden;
  transition: opacity .25s var(--ease), transform .25s var(--ease),
              visibility 0s linear .25s;    /* 페이드가 끝난 뒤 숨김 */
}
.main-nav.is-open{
  opacity: 1; transform: none; pointer-events: auto;
  visibility: visible;
  transition-delay: 0s;                     /* 열 때는 즉시 */
}
```

**`inert` 를 HTML 에 하드코딩하면 안 됩니다.** 데스크톱에서도 같은 `<nav>` 를 가로 메뉴로 쓰기 때문에, `<nav inert>` 로 박아 두면 스크립트가 차단·실패했을 때 메뉴 전체가 죽습니다. `inert` 는 CSS 속성이 아니라 되돌릴 수도 없습니다. 반드시 **JS 가 브레이크포인트를 보고** 붙입니다(`assets/js/main.js`).

```js
const NAV_MQ = window.matchMedia("(max-width: 720px)");
const setNav = (open) => {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  nav.inert = NAV_MQ.matches && !open;      // 데스크톱에서는 절대 걸지 않습니다
};
NAV_MQ.addEventListener("change", () => NAV_MQ.matches ? setNav(nav.classList.contains("is-open")) : setNav(false));
```

**열 때 첫 링크로 포커스를 옮깁니다.** DOM 순서가 `nav → themeToggle → navToggle` 이라, 토글에서 `Tab` 을 눌러도 메뉴를 지나쳐 본문으로 갑니다. 메뉴에 닿으려면 `Shift+Tab` 을 2~9회 눌러야 해서 키보드로는 사실상 쓸 수 없었습니다.

그 밖에 지켜야 하는 동작:

| 동작 | 처리 |
|---|---|
| `Esc` | 닫고 **토글 버튼으로 포커스 복귀**. 복귀하지 않으면 `inert` 영역 안에 포커스가 남습니다 |
| 링크 선택 | 섹션 이동 + 닫기. 이때는 포커스를 되돌리지 않습니다 |
| 포커스가 메뉴 밖으로 | `focusout` 으로 닫기 |
| 폭 변경 | `matchMedia` 로 상태 초기화. **데스크톱에 `inert` 가 남으면 가로 메뉴 전체가 키보드·스크린리더에서 사라집니다** |
| 버튼 이름 | `aria-label="메뉴"` **고정**. `aria-expanded` 가 이미 상태를 전달하므로 `열기`/`닫기` 로 바꾸면 "메뉴 닫기, 확장됨" 처럼 두 번 읽힙니다 |
| `prefers-reduced-motion` | `.main-nav{ transition: none !important }` — `visibility` 지연이 남으면 사라지는 데 0.25s 가 걸립니다 |
| JS 차단 | `html:not(.js) .main-nav` 에 `visibility: visible` 과 `transition: none` 이 함께 있어야 펼침 폴백이 성립합니다 |

**`aria-hidden="true"` 만 붙이는 것으로는 안 됩니다.** 내부 링크의 키보드 포커스가 남아, 포커스 가능한 요소가 `aria-hidden` 안에 있는 모순이 생깁니다. 링크마다 `tabindex="-1"` 을 넣는 방법도 동작하지만 열 때 복원해야 하고 링크가 추가되면 누락됩니다.

**검증 방법** — 모바일 폭에서 메뉴를 **열지 않고** `Tab` 을 누르세요. 토글 다음 포커스가 보이지 않는 링크가 아니라 화면에 보이는 다음 컨트롤로 가면 정상입니다. axe 는 이 결함을 잡지 못합니다(위반 0건인 상태로 배포되어 있었습니다).

```bash
cd site && docker compose up --build -d && sleep 6
npm --silent install --no-save puppeteer-core
node -e "
const puppeteer = require('puppeteer-core');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 430, height: 900 });
  await p.goto('http://localhost:8080/index.html', { waitUntil: 'load' });
  let hidden = 0;
  for (let i = 0; i < 8; i++) {
    await p.keyboard.press('Tab');
    const d = await p.evaluate(() => {
      const e = document.activeElement;
      return { inNav: !!e.closest('#mainNav'), text: (e.textContent || '').trim().slice(0, 12) };
    });
    if (d.inNav) hidden++;
    console.log('  Tab', i + 1, d.text, d.inNav ? '[메뉴 안]' : '');
  }
  console.log(hidden === 0 ? 'OK 닫힌 메뉴에 포커스 없음' : 'BAD 닫힌 메뉴 링크 ' + hidden + '개');
  await b.close();
})();
"
```

### 모션 시스템

애니메이션은 세 가지 클래스로만 구성됩니다. 새 요소에도 이 클래스를 붙이면 자동으로 동작합니다.

| 클래스 | 동작 | 쓰는 곳 |
|---|---|---|
| `.mask` | 안쪽 `<span>`이 아래에서 **마스크 위로 올라옴** | 큰 제목 (마스트헤드) |
| `.rule` | 하이라인이 **왼쪽에서 그려짐** (`scaleX`) | 섹션 구분선 |
| `.reveal` | 10px 상승 + 페이드 (절제된 폭) | 일반 요소 |

- 부모에 `data-stagger`를 붙이면 JS가 자식들에게 `--i`를 넣어 **순차 지연**됩니다.
- 여러 줄 제목은 부모에 `data-lines`를 붙이면 `.mask` 줄마다 지연이 걸립니다.
- 화면 상단에 이미 보이는 요소는 로드 시 재생되고, 나머지는 `IntersectionObserver`로 뷰포트 진입 시 한 번만 재생됩니다.
- `.doc`(상세 페이지 본문)은 JS가 자식에 `.reveal`을 자동으로 붙여 순차 등장시킵니다. HTML에 따로 쓸 필요 없습니다.
- 헤더 아래 **읽기 진행률 바**(`.progress`)는 JS가 메인 페이지에만 동적으로 추가합니다.
- `prefers-reduced-motion: reduce`면 모든 모션이 꺼지고 즉시 최종 상태로 표시됩니다. **새 애니메이션을 추가할 때 이 미디어쿼리에도 반드시 예외를 넣으세요.**

### 디자인 원칙 (새 컴포넌트를 추가할 때 유지할 것)

- 모서리는 거의 직각(`--radius: 2px`)을 유지하고, 둥근 카드·그라데이션·그림자를 쓰지 않습니다.
- 날짜·라벨·번호는 모노스페이스, 제목은 세리프, 본문은 산세리프로 **역할별 서체를 구분**합니다.
- 목록형 콘텐츠는 카드 그리드가 아니라 헤어라인으로 구분된 **장부(ledger)** 형태로 만듭니다.
- 목록 항목의 제목과 값 사이는 `<span class="dots">`로 **점선 리더**를 넣습니다 (수상·자격 목록 참고). 인쇄 색인의 관습이며 이 사이트의 시각적 서명입니다.
- 호버는 색만 바꾸지 말고 **미세한 위치 이동**(3~5px)을 함께 줍니다. 종이를 집어 드는 촉감을 의도한 것입니다.
- 큰 숫자 타일, 아이콘 뱃지 그리드, 지어낸 인용구는 쓰지 않습니다.

---

**작업 중 실제로 걸렸던 것들** — 새 컴포넌트를 넣을 때마다 다시 걸립니다.

| 규칙 | 어겼을 때 생긴 일 |
|---|---|
| **글씨 12px 이상** | masthead 마지널리아와 `주력` 배지를 `.68~.74rem`(10.9~11.8px)로 넣었다가 되돌림. 배지는 기존 `.doc-tag` 규격(`.76rem`)에 맞추면 됩니다 |
| **배지·라벨은 기존 패턴 재사용** | `.doc-tag` / `.expired` / `.tag` 가 이미 있습니다. 새로 만들면 규격이 어긋납니다 |
| **`flex-wrap` 확인** | 210px 라벨 칸에서 `nowrap` 이면 제목이 안쪽에서 2줄로 쪼개지고 배지가 붕 뜹니다 |
| **명암비는 토큰으로 계산** | 브라우저 패널이 숨김 상태면 CSS 트랜지션이 멈춰 색을 잘못 읽습니다. `:root` / `[data-theme="dark"]` 토큰 값으로 직접 계산하세요 (아래 스크립트) |

```bash
cd site && python3 -c "
import re
s=open('assets/css/style.css',encoding='utf-8').read()
def blk(p):
    m=re.search(p,s,re.S); return dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);',m.group(1))) if m else {}
light=blk(r':root\s*\{(.*?)\}'); dark={**light,**blk(r':root\[data-theme="dark"\]\s*\{(.*?)\}')}
def lum(h):
    h=h.strip().lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda v: v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    return .2126*f(r)+.7152*f(g)+.0722*f(b)
def ratio(a,b):
    L1,L2=lum(a),lum(b); return (max(L1,L2)+.05)/(min(L1,L2)+.05)
for nm,t in [('LIGHT',light),('DARK',dark)]:
    print(nm, 'bg', t['--bg'])
    for tok in ['--text','--text-muted','--text-faint','--accent']:
        r=ratio(t[tok],t['--bg']); print(f'  {tok:<14} {t[tok]:<9} {r:5.2f}:1 {\"PASS\" if r>=4.5 else \"FAIL\"}')
"
```

**12px 미만 글씨 전수 검사**

```bash
cd site && python3 -c "
import re
s=open('assets/css/style.css',encoding='utf-8').read()
bad=[m.group(1) for m in re.finditer(r'font-size:\s*([\d.]+)rem',s) if float(m.group(1))*16<12]
print('12px 미만:', bad or '없음')
"
```

## 5. 배포 전 점검 체크리스트

아래 한 덩어리로 **정합성 검사 대부분을 자동으로** 돌릴 수 있습니다.

```bash
cd site && python3 - <<'EOF'
import re, os, glob
pages = sorted(glob.glob('*.html') + glob.glob('*/*.html'))

# ① 내부 링크가 실제 파일을 가리키는지
bad = []
for f in pages:
    d = os.path.dirname(f) or '.'
    for m in re.finditer(r'href="([^"]+)"', open(f, encoding='utf-8').read()):
        h = m.group(1).split('#')[0]
        if not h or h.startswith(('http', 'mailto', 'data:', '/')): continue
        if not os.path.isfile(os.path.normpath(os.path.join(d, h))): bad.append((f, h))
print(f'페이지 {len(pages)} / 깨진 링크 {len(bad)}', bad[:5])

# ② index 순서 ↔ 상세 doc-label ↔ 페이저 체인
s = open('index.html', encoding='utf-8').read()
ok = True
for sec, cls, num in [('experience','case-row','03'), ('projects','case-row','04'),
                      ('awards','award-row','05'), ('publications','pub-item','06'),
                      ('education','edu-item','07')]:
    blk = re.search(r'id="' + sec + r'".*?</section>', s, re.S).group(0)
    order = re.findall(r'<a class="' + cls + r'[^"]*"[^>]*href="' + sec + r'/([^"]+)"', blk)
    for i, f in enumerate(order):
        t = open(f'{sec}/{f}', encoding='utf-8').read()
        lab = re.search(r'doc-label">([\d.]+)', t).group(1)
        pv = re.search(r'pager-prev" href="([^"]+)', t)
        nx = re.search(r'pager-next" href="([^"]+)', t)
        if not (lab == f'{num}.{i+1:02d}'
                and (pv.group(1) if pv else None) == (order[i-1] if i > 0 else None)
                and (nx.group(1) if nx else None) == (order[i+1] if i < len(order)-1 else None)):
            print('  BAD', sec, f, lab); ok = False
print('index↔상세 정합:', 'OK' if ok else '불일치')

# ③ 부록 개수 ↔ 메인 링크 문구
for f in ['awards/other-awards.html', 'experience/other-activities.html', 'education/other-training.html']:
    n = len(re.findall(r'<div class="case-row', open(f, encoding='utf-8').read()))
    m = re.search(r'href="' + re.escape(f) + r'">([^<]*?)(\d+)건', s)
    print(f'{f}: 실제 {n}건 / 링크 {m.group(2) if m else "?"}건',
          '' if m and int(m.group(2)) == n else '  ⚠️ 불일치')

# ④ 자산이 모두 참조되는지 (미참조 파일도 URL 로는 공개됩니다)
refs = {os.path.basename(m.group(1).split('?')[0]) for f in pages
        for m in re.finditer(r'(?:href|src|content)="([^"]*assets/[^"]+)"', open(f, encoding='utf-8').read())}
files = {os.path.basename(f) for f in glob.glob('assets/**/*.*', recursive=True) if not f.endswith('.md')}
print('미참조 자산:', sorted(files - refs) or '없음')

# ⑤ sitemap 이 실제 페이지와 일치하는지
urls = re.findall(r'<loc>([^<]+)</loc>', open('sitemap.xml', encoding='utf-8').read())
mapped = {u.replace('https://info.yeopeva.me/', '') or 'index.html' for u in urls}
want = set(pages) - {'404.html'}
print('sitemap 누락:', sorted(want - mapped) or '없음', '/ 없는 URL:', sorted(mapped - want) or '없음')
EOF
```

- [ ] 위 스크립트가 전부 `0` / `OK` / `없음` 인가
- [ ] `index.html`의 요약과 상세 페이지 본문 내용이 일치하는가 (자동 검사 대상 아님)
- [ ] masthead `.mini-ledger` 의 진행 중·최근 수상이 최신인가 (3-1 표 참고)
- [ ] 수상·논문·경험을 늘렸다면 **3-6 검산 스크립트를 그대로** 돌렸는가 — `#about` 의 `.tally` 와 `#awards` 의 `.sec-meta` 는 **서로 다른 두 곳**이다. 한쪽만 고치고 넘어간 적이 있다
- [ ] `#skills` 4개 행이 이력서의 `기술 및 관심 분야` 와 어긋나지 않는가 (3-7 대조 스크립트)
- [ ] 기술 행마다 `.skill-src` 근거 줄이 있고, 링크가 실제 상세 페이지를 가리키는가
- [ ] 12px 미만 글씨가 없고, 두 테마 명암비가 AA 인가 (4장 스크립트)
- [ ] 증빙을 추가·교체했다면 **썸네일을 다시 만들고**(3-4-2) KB 표기가 실제와 맞는가 (푸시 전 6번)
- [ ] 본문에 그림(`.doc-figure`)을 넣었다면 원본 폭이 권장값인가 — 상세 1080px / 부록 갤러리 1200px (3-4-3)
- [ ] 그림의 `alt` 이 채워져 있고(플레이트는 반대로 `alt=""`), `width`·`height` 가 실제 크기인가
- [ ] 스크린샷에 실명·이메일·사번·내부 호스트명·토큰이 찍히지 않았는가 — **게시본을 눈으로**
- [ ] 감사 부산물(`node_modules/`, `lh.json`)이 `git status` 에 뜨지 않는가
- [ ] **모바일 폭에서 메뉴를 열지 않고 `Tab`** — 보이지 않는 메뉴 링크로 포커스가 가지 않는가 (4장, axe 로는 안 잡힘)
- [ ] 메뉴를 열면 첫 링크로 포커스가 가고, `Esc` 로 닫으면 토글 버튼으로 돌아오는가
- [ ] 모바일에서 열어 둔 채 데스크톱 폭으로 넓혔을 때 가로 메뉴가 키보드로 닿는가 (`inert` 잔존 확인)
- [ ] 로컬에서 **`docker compose up --build`** 로 실행해 다크/라이트, 1440·1024·768·375px 폭을 확인했는가
- [ ] `.DS_Store` 같은 숨김 파일이 남아 있지 않은가 — 아래로 확인

```bash
# .DS_Store 는 폴더 안 파일명을 담고 있어 서빙되면 디렉터리 구조가 노출됩니다.
# .dockerignore 의 `.DS_Store` 는 루트만 잡으므로 `**/.DS_Store` 가 함께 있어야 합니다.
cd site && find . -name '.DS_Store' -not -path './.git/*' -delete
docker compose up --build -d && sleep 5
for p in /.DS_Store /assets/.DS_Store /.git/config; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080$p) $p"   # 403 이어야 함
done
```

- [ ] **`sitemap.xml` 의 `lastmod` 를 갱신했는가** — 페이지를 고치면 날짜가 낡습니다. 아래로 한 번에 다시 씁니다

```bash
cd site && python3 - <<'EOF'
import glob, subprocess
d = subprocess.run(['git','log','-1','--format=%cs'], capture_output=True, text=True).stdout.strip()
pages = sorted(set(glob.glob('*.html') + glob.glob('*/*.html')) - {'404.html'})
locs = ['https://info.yeopeva.me/' + ('' if p == 'index.html' else p) for p in pages]   # canonical 과 동일하게 index 는 루트
body = '\n'.join(f'  <url>\n    <loc>{l}</loc>\n    <lastmod>{d}</lastmod>\n  </url>' for l in locs)
open('sitemap.xml','w',encoding='utf-8').write(
  '<?xml version="1.0" encoding="UTF-8"?>\n'
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + '\n</urlset>\n')
print(f'{len(locs)}개 URL / lastmod {d}')
EOF
```

> `changefreq`·`priority` 는 넣지 않습니다 — 구글이 명시적으로 무시합니다. 실제로 쓰는 값은 `lastmod` 뿐입니다.
> `lastmod` 는 **최신 커밋 날짜**를 씁니다. 임의로 미래 날짜를 넣으면 신뢰도만 떨어집니다.

- [ ] `canonical` 과 `og:url` 이 서로 같고 실제 파일 경로와 일치하는가

```bash
cd site && python3 - <<'EOF'
import re, glob
bad=[]
for f in sorted(glob.glob('*.html')+glob.glob('*/*.html')):
    if f == '404.html': continue
    s = open(f, encoding='utf-8').read()
    exp = '' if f == 'index.html' else f
    for tag, pat in [('canonical', r'rel="canonical" href="https://info\.yeopeva\.me/([^"]*)"'),
                     ('og:url',    r'property="og:url" content="https://info\.yeopeva\.me/([^"]*)"')]:
        m = re.search(pat, s)
        if not m or m.group(1) != exp:
            bad.append((f, tag, m.group(1) if m else None))
print('불일치:', bad or '없음')
EOF
```

- [ ] 터치 타깃이 24px(WCAG 2.5.8 AA) 이상인가 — 브라우저 콘솔에서

```js
[...document.querySelectorAll('a.btn, button, .nav-link')]
  .filter(e => { const r = e.getBoundingClientRect(); return r.height > 0 && r.height < 24 })
  .map(e => (e.id || e.className) + ':' + Math.round(e.getBoundingClientRect().height))
```

### 푸시하기 전 (필수)

> 저장소는 비공개지만 **사이트는 공개**이고, 커밋 이력은 지워도 남습니다. 마스킹 전 이미지를 한 번
> 커밋하면 나중에 덮어써도 옛 blob 이 남아 꺼낼 수 있습니다.
> **증빙은 마스킹을 끝낸 뒤에만 커밋하세요.** 이미 커밋했다면 파일을 고치는 것만으로는
> 부족하고 이력을 다시 써야 합니다(`git checkout --orphan` → 단일 커밋 → `gc --prune=now`).

증빙을 추가·수정한 뒤 아래를 순서대로 확인합니다.

```bash
cd site

# 1) 텍스트 자산에 민감 문자열이 없는지
# 생년월일은 이 문서에 적어두지 않습니다 — README 도 함께 공개되기 때문입니다.
# 실행 전에 직접 넣으세요 (YYYY·MM·DD 를 본인 생년월일로):
#   BIRTH='YYYY[.\-/ ]?0?M[.\-/ ]?0?D'
grep -rIn --include='*.html' --include='*.css' --include='*.js' \
  -E "01[016789][-. ]?[0-9]{3,4}[-. ]?[0-9]{4}|$BIRTH|\b20[0-9]{6}\b|/Users/" . || echo "깨끗"

# 2) reports 에 PDF 원본이 섞이지 않았는지 (텍스트 추출로 마스킹 우회 가능)
find assets/reports -name '*.pdf' | grep . && echo "⚠️ PDF 제거 필요" || echo "PDF 없음"

# 3) 이미지 메타데이터 잔존 여부
python3 -c "
from PIL import Image; import glob
bad=[f for f in glob.glob('assets/**/*.jp*g',recursive=True) if Image.open(f).getexif()]
print('EXIF 잔존:', bad or '없음')
"

# 4) 이력서 PDF 에 휴대폰·생년월일이 없는지
python3 -c "
import pymupdf, glob
for f in sorted(glob.glob('assets/resume/*.pdf')):
    t=' '.join(p.get_text() for p in pymupdf.open(f)).replace(' ','')
    import os, re
    b=os.environ.get('BIRTH_PLAIN','')   # 예: export BIRTH_PLAIN=YYYYMMDD
    print(f, '휴대폰', '8652' in t, '/ 생년월일', bool(b) and b in t)
"

# 5) 마스킹 이전 버전이 커밋 이력에 남아 있지 않은지
git rev-list --all --count   # 1 이 아니면 옛 blob 이 남아 있을 수 있음

# 6) 증빙 파일 크기 표기(<span class="meta">NN KB</span>)가 실제 파일과 맞는지
#    표기 규약은 2진 KB 반올림 = round(bytes / 1024). 표기는 항상 **원본** 크기입니다
#    (플레이트는 썸네일을 보여주지만 링크와 KB 표기는 원본 기준)
python3 <<'EOF'
import re, os
bad = 0; tot = 0
for root, _, fs in os.walk('.'):
    if '/.git' in root: continue
    for fn in fs:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        s = open(p, encoding='utf-8').read()
        # 플레이트(.plate-meta)와 텍스트 링크(.meta) 두 마크업을 모두 검사합니다.
        pats = [r'href="([^"]+\.(?:jpg|jpeg|png|pdf))"[\s\S]{0,400}?<span class="plate-meta">\w+ · (\d+) KB</span>',
                r'href="([^"]+\.(?:jpg|jpeg|png|pdf))"[^>]*>[^<]*<span class="kind">[^<]*</span>[^<]*<span class="meta">(\d+) KB</span>']
        for pat in pats:
          for m in re.finditer(pat, s):
            t = os.path.normpath(os.path.join(root, m.group(1)))
            if not os.path.exists(t): continue
            tot += 1
            real = round(os.path.getsize(t) / 1024)
            if int(m.group(2)) != real:
                bad += 1
                print(f'{p}  {os.path.basename(m.group(1))}  표기 {m.group(2)} → 실제 {real} KB')
print(f'검사 {tot}건 / 불일치 {bad}건')
EOF
```

> **6번은 증빙을 다시 저장했을 때 반드시 돌리세요.** 마스킹으로 파일 크기가 바뀌어도 KB 표기는
> 따라오지 않습니다. 실제로 12건이 어긋난 채 배포되어 있었고, 최대 오차는
> `act_privacy-monitoring-2024.jpg` 의 `385 → 485 KB` 였습니다.

**새 증빙을 넣을 때는 자동 검사만 믿지 마세요.** 지금까지 발견된 마스킹 누락은 전부
스캔 이미지나 표 형식 서식에서 나왔고, 텍스트 기반 검사로는 하나도 잡히지 않았습니다.
반드시 게시본을 눈으로 확인하세요 — 체크리스트는 [`assets/reports/README.md`](assets/reports/README.md).

### 자동 감사 실행 방법 (Lighthouse · axe)

> **⚠️ 감사 명령은 `site/` 안에 부산물을 만듭니다.** `npm install` 은 `node_modules/`(약 29 MB)를,
> Lighthouse 는 `lh.json` 을 남깁니다. Pages 는 **추적된 모든 파일을 URL 로 서빙**하므로
> 이것들이 커밋되면 그대로 공개됩니다. `.gitignore` 에 이미 넣어 두었으니
> **`git status` 에 뜨지 않는 것을 확인**하고, `.gitignore` 를 건드렸다면 `git check-ignore -v node_modules/x` 로 다시 확인하세요.

배포 전 또는 큰 변경 후에는 수동 확인 대신 아래를 돌리세요. 둘 다 Chrome 이 필요합니다.

```bash
cd site && docker compose up --build -d && sleep 6
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Lighthouse — 모바일/데스크톱. 성능은 회차 변동이 크므로 2~3회 돌려 중앙값을 봅니다.
npx --yes lighthouse@12 http://localhost:8080/ --quiet \
  --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=./lh.json
python3 -c "
import json; d=json.load(open('lh.json')); a=d['audits']
print(' / '.join(f\"{c['title']} {round((c['score'] or 0)*100)}\" for c in d['categories'].values()))
for m in ['first-contentful-paint','largest-contentful-paint','cumulative-layout-shift']:
    print(' ', a[m]['title'], a[m]['displayValue'])
"
```

**axe 는 애니메이션 때문에 그냥 돌리면 절반을 놓칩니다.** `.reveal` 요소가 `opacity:0` 이면
axe 가 "보이지 않음"으로 판단해 건너뜁니다. 반드시 **전환을 끄고 전부 보이게 강제**한 뒤,
**두 테마 모두** 검사하세요.

```bash
cd site && npm --silent install --no-save puppeteer-core @axe-core/puppeteer
node -e "
const puppeteer=require('puppeteer-core'); const {AxePuppeteer}=require('@axe-core/puppeteer');
const fs=require('fs'), path=require('path'); const pages=[];
for(const f of fs.readdirSync('.')) if(f.endsWith('.html')) pages.push('/'+f);
for(const d of ['experience','projects','awards','publications','education'])
  for(const f of fs.readdirSync(d)) if(f.endsWith('.html')) pages.push('/'+d+'/'+f);
(async()=>{
  const b=await puppeteer.launch({executablePath:process.env.CHROME_PATH,headless:'new',args:['--no-sandbox']});
  let total=0;
  for(const p of pages){
    const pg=await b.newPage(); await pg.setViewport({width:1440,height:900});
    await pg.goto('http://localhost:8080'+p,{waitUntil:'networkidle2'});
    await pg.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important}'});
    await pg.evaluate(()=>{document.querySelectorAll('.reveal,.mask,.rule').forEach(e=>e.classList.add('is-in'));
      const x=document.getElementById('backToTop'); if(x) x.classList.add('is-visible');
      const n=document.getElementById('mainNav'); if(n) n.classList.add('is-open');});
    await new Promise(r=>setTimeout(r,600));
    for(const t of ['dark','light']){
      await pg.evaluate(x=>document.documentElement.setAttribute('data-theme',x),t);
      await new Promise(r=>setTimeout(r,200));
      const r=await new AxePuppeteer(pg).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
      if(r.violations.length){total+=r.violations.length;
        console.log(p+' ['+t+'] '+r.violations.map(v=>v.id+'('+v.nodes.length+')').join(', '));}
    }
    await pg.close();
  }
  console.log(pages.length+'페이지 × 2테마 / 위반 '+total);
  await b.close();
})();
"
```

### 다른 브라우저 확인 (WebKit · Firefox)

Playwright 로 Safari 엔진(WebKit)과 Firefox 를 실제로 띄울 수 있습니다.

```bash
cd site && npm --silent install --no-save playwright && npx playwright install webkit firefox
node -e "
const {webkit,firefox}=require('playwright');
(async()=>{
  for(const [n,e] of [['WebKit',webkit],['Firefox',firefox]]){
    const b=await e.launch(); const pg=await (await b.newContext({viewport:{width:375,height:812}})).newPage();
    const errs=[]; pg.on('pageerror',x=>errs.push(x.message));
    await pg.goto('http://localhost:8080/'); await pg.waitForTimeout(1500);
    await pg.evaluate(async()=>{const H=document.documentElement.scrollHeight;
      for(let y=0;y<H;y+=innerHeight*0.7){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,140));}
      await new Promise(r=>setTimeout(r,900));});
    const r=await pg.evaluate(()=>{const q=document.querySelectorAll('.reveal,.mask');
      return {보임:[...q].filter(x=>getComputedStyle(x).opacity!=='0').length+'/'+q.length,
              넘침:document.documentElement.scrollWidth>document.documentElement.clientWidth};});
    console.log(n, JSON.stringify(r), 'JS오류', errs.length);
    await b.close();
  }
})();
"
```

> **Pretendard 는 반드시 `-dynamic-subset` 빌드를 씁니다.**
> 통짜 `pretendardvariable.min.css` 는 가변 폰트 **2MB 를 한 번에** 내려받아
> 모바일(느린 4G 기준)에서 LCP 가 12초까지 갔습니다. 사이트 자체 자산은 80KB 인데
> 서드파티만 2.4MB 였습니다. 동적 서브셋은 `unicode-range` 로 쪼개진 92개 조각 중
> **실제 쓰인 글자에 해당하는 것만** 받습니다. URL 에서 `-dynamic-subset` 을 빼지 마세요.

**최소 지원 버전** — 하드 요구사항은 CSS 변수·grid(2017년 브라우저)뿐입니다.
`text-wrap: balance/pretty`(Safari 17.5 / Firefox 121)와 `size-adjust`(Safari 17)는
미지원 시 **줄바꿈이 덜 예뻐지고 폰트 스왑에서 살짝 밀리는 정도**로 끝납니다.

### 검색엔진 노출 범위

`robots.txt` 가 `/assets/reports/` 와 `/assets/resume/` 의 **크롤링을 막습니다.**
직접 링크로는 그대로 열리지만 구글 이미지 검색에 증빙 문서가 수집되지는 않습니다.
색인을 원하면 해당 `Disallow` 두 줄을 지우면 됩니다.

`robots.txt` 는 접근 제어가 아니라 **크롤러에게 하는 요청**입니다. URL 을 아는 사람은 언제나
열 수 있고, 저장소를 비공개로 둬도 게시된 사이트는 공개입니다(0장 참고).
그러니 "안 보이겠지"에 기대지 말고 **올려도 괜찮은 것만 올리는 것**이 유일한 방어선입니다.

## 라이선스

사이트 코드(HTML/CSS/JS)는 자유롭게 참고하셔도 됩니다.
**증빙 이미지·이력서·프로필 사진 등 개인 자료는 재사용을 허용하지 않습니다.**

#### 사이트 ↔ 이력서 기술 행 대조

```bash
cd site && python3 -c "
import re,html
s=open('index.html',encoding='utf-8').read()
i=s.find('id=\"skills\"'); b=s[i:s.find('<section',i+10)]
rows=[]
for m in re.finditer(r'<h3>(.*?)</h3>([\s\S]*?)(?=<span class=\"skill-index\">|<dl class=\"skill-foot)',b):
    rows.append((html.unescape(m.group(1)),
                 [html.unescape(x) for x in re.findall(r'class=\"tag\">(.*?)</span>',m.group(2))]))
tex=open('../cv/latex_resume_template_kor/resume/tex/resume_dfir_ko.tex',encoding='utf-8').read()
sk=dict(re.findall(r'\\\\resumeSkill\{([^}]*)\}\{([^}]*)\}',tex))
NAME={'디지털 포렌식 · 침해대응':'디지털 포렌식 · 침해대응 (DFIR)'}
norm=lambda L:[x.strip().replace(' · ','·') for x in L]
for t,tags in rows:
    r=norm(sk.get(NAME.get(t,t),'').split(',')); st=norm(tags)
    print(('OK  ' if st==r else '차이'), t, '' if st==r else f'\n  사이트 {st}\n  이력서 {r}')
"
```

이력서 6종은 기술 행이 모두 같으므로 `resume_dfir_ko.tex` 하나만 대조하면 됩니다.
경력기술서는 같은 4행이지만 표현이 더 길어(예: `분석 보고서 작성` 포함) 이 검사 대상이 아닙니다.
