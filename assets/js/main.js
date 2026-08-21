(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("mainNav");
  const navToggle = document.getElementById("navToggle");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const yearEl = document.getElementById("year");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyToast = document.getElementById("copyToast");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  const THEME_KEY = "site-theme";
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------- Mobile nav ----------
     닫힌 메뉴를 opacity/pointer-events 로만 가리면 마우스에만 닫히고
     키보드에는 열려 있습니다. pointer-events 는 키 입력과 무관하므로
     Tab 이 보이지 않는 링크 8개를 순회했습니다. inert 로 접근성 트리에서
     빼고, CSS 의 visibility:hidden 이 inert 미지원 브라우저를 받칩니다.
     inert 는 HTML 에 넣지 않습니다 — 데스크톱에서도 같은 <nav> 를 쓰므로
     스크립트가 실패하면 메뉴 전체가 죽습니다. 반드시 JS 가 폭을 보고 붙입니다. */
  const NAV_MQ = window.matchMedia("(max-width: 720px)");

  const setNav = (open) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    nav.inert = NAV_MQ.matches && !open;
  };

  /* 폭이 바뀌면 상태를 초기화합니다. 데스크톱에서 inert 가 남으면
     가로 메뉴 전체가 키보드·스크린리더에서 사라집니다. */
  const syncNav = () => {
    if (!nav || !navToggle) return;
    if (NAV_MQ.matches) setNav(nav.classList.contains("is-open"));
    else setNav(false);
  };
  syncNav();
  NAV_MQ.addEventListener("change", syncNav);

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    setNav(open);
    /* DOM 순서가 nav → themeToggle → navToggle 이라, 열고 Tab 을 눌러도
       메뉴를 지나쳐 본문으로 갑니다(메뉴에 닿으려면 Shift+Tab 2~9회).
       그래서 열 때 첫 링크로 포커스를 옮깁니다. */
    if (open) requestAnimationFrame(() => nav?.querySelector(".nav-link")?.focus());
  });

  nav?.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link")) setNav(false);
  });

  /* Esc 로 닫고 버튼으로 포커스를 되돌립니다.
     되돌리지 않으면 닫힌(inert) 메뉴 안에 포커스가 남아 위치를 잃습니다. */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
      setNav(false);
      navToggle.focus();
    }
  });

  /* 열린 채 포커스가 메뉴 밖으로 나가면 닫습니다. */
  nav?.addEventListener("focusout", (e) => {
    if (!NAV_MQ.matches) return;
    if (navToggle?.getAttribute("aria-expanded") !== "true") return;
    if (nav.contains(e.relatedTarget) || e.relatedTarget === navToggle) return;
    setNav(false);
  });

  /* ---------- Reading progress + back to top ---------- */
  let progressEl = null;
  if (header && !document.querySelector(".detail-header")) {
    progressEl = document.createElement("div");
    progressEl.className = "progress";
    header.appendChild(progressEl);
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (progressEl) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressEl.style.setProperty("--p", max > 0 ? Math.min(y / max, 1) : 0);
      }
      backToTop?.classList.toggle("is-visible", y > 600);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });

  /* ---------- Stagger indices ---------- */
  // Detail pages cascade their document body, so mark its children first.
  const doc = document.querySelector(".doc");
  if (doc) {
    doc.classList.remove("reveal");
    Array.from(doc.children).forEach((child) => child.classList.add("reveal"));
  }

  // Any container marked [data-stagger] hands its children an --i so their
  // transitions cascade instead of firing all at once.
  document.querySelectorAll("[data-stagger], .doc").forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty("--i", Math.min(i, 12));
    });
  });

  // Heading masks inside one block cascade line by line.
  document.querySelectorAll("[data-lines]").forEach((block) => {
    block.querySelectorAll(".mask").forEach((line, i) => {
      line.style.setProperty("--i", i);
    });
  });

  /* ---------- Entrance / scroll-in ---------- */
  const animated = document.querySelectorAll(".reveal, .mask, .rule, [data-in]");

  if (reduced || !("IntersectionObserver" in window)) {
    animated.forEach((el) => el.classList.add("is-in"));
  } else {
    // Above-the-fold content plays on load; the rest waits for the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    const reveal = (el) => el.classList.add("is-in");

    animated.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) {
        // setTimeout 을 씁니다. requestAnimationFrame 은 탭이 백그라운드이거나
        // 창이 가려져 있으면 실행되지 않아, 콘텐츠가 opacity:0 으로 멈춥니다.
        setTimeout(() => reveal(el), 60);
      } else {
        io.observe(el);
      }
    });

    // 안전망: 관찰자나 타이머가 어떤 이유로든 동작하지 않아도
    // 화면에 들어온 요소는 반드시 보이게 합니다.
    setTimeout(() => {
      animated.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
      });
    }, 2500);
  }

  /* ---------- Active section in nav ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const linkFor = new Map(navLinks.map((a) => [a.getAttribute("href")?.slice(1), a]));

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor.get(entry.target.id);
          if (!link || !entry.isIntersecting) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Copy email ---------- */
  let toastTimer;
  copyEmailBtn?.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.email || "";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const tmp = document.createElement("textarea");
      tmp.value = email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      tmp.remove();
    }
    copyToast?.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => copyToast?.classList.remove("is-visible"), 2200);
  });
})();
