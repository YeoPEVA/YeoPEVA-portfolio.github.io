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

모든 상세 페이지는 `doc-body` 아래에 `doc-related` 블록을 넣어 자료를 연결합니다. **세 가지 종류를 지원하며, 화면에서 자동으로 구분되어 표시됩니다.**

| 종류 | 표시 | 마크업 |
|---|---|---|
| 내부 페이지 | 표시 없음 | 기본 `<a href="../…">` |
| 외부 URL | `↗` 자동 | `target="_blank" rel="noopener"` |
| 파일 다운로드 | `↓` 자동 + 배지 테두리 | `download` 속성 |

### 복사해서 쓰는 틀

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
  ls -lh assets/reports/awards/kfsi-academy-2025_certificate.pdf
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
for f in glob.glob('*/*.html'):
    d=os.path.dirname(f)
    for m in re.finditer(r'href=\"([^\"]+)\"', open(f,encoding='utf-8').read()):
        h=m.group(1).split('#')[0]
        if not h or h.startswith(('http','mailto','data:')): continue
        if not os.path.isfile(os.path.normpath(os.path.join(d,h))): bad.append((f,h))
print('깨진 링크:', bad or '없음')
"
```

---

## 현재 연결 상태 (71장 / 2026.08 기준)

전체 36개 상세 페이지 중 **31개**에 `doc-related` 블록이 있습니다. 내부 페이지 링크, 외부 URL(경찰학연구 DOI), 증빙 이미지 첨부가 섞여 있습니다.

블록이 없는 6개 페이지는 근거 있는 연관 항목이 없어 의도적으로 비워 두었습니다 — 없는 관계를 억지로 만들지 않는 것이 원칙입니다.

```
experience/anti-root.html        experience/busan-mentor.html
experience/hspace.html           awards/kdfs-challenge-2020.html
awards/yeongnam-cyber-defense.html   publications/apt-incident-review.html
```

## 전수 검수 이력

원본 PDF 42개의 텍스트를 정규식으로 훑어 민감 패턴(휴대폰·유선전화·생년월일·군번·학번)을 뽑고,
텍스트 레이어가 없는 스캔 원본 38개는 게시본을 눈으로 확인하는 방식으로 **71장 전부** 점검했습니다.

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
