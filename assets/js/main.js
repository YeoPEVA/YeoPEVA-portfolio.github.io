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

  /* ---------- Mobile nav ---------- */
  navToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
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
