import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/*
 * Scroll motion layer.
 *
 * Content is always complete without it: the prerendered HTML shows every
 * element at rest, and nothing is hidden unless <html> carries `motion-ok`
 * (set by an inline script only when the visitor has not asked for reduced
 * motion). Everything here moves transform, opacity or clip-path only.
 */

const REVEAL_SELECTOR = [
  ".section-head",
  ".service-card",
  ".process-card",
  ".review-card",
  ".faq-item",
  ".guide-card",
  ".info-card",
  ".feature-card",
  ".tyre-option",
  ".pricing-table",
  ".value-row",
  ".content-copy > .eyebrow",
  ".content-copy > .section-heading",
  ".content-copy > p",
  ".workshop-gallery-card",
  ".social-panel",
  ".cta-banner",
  ".visit-strip",
  ".glance-item",
  ".contact-panel",
  ".symptom-card",
  ".article-content > *",
  ".detail-layout > *",
].join(",");

function motionAllowed() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("motion-ok")
  );
}

function inViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function MotionLayer() {
  const [location] = useLocation();

  // Reveals and wipes: re-tag on every route change.
  useEffect(() => {
    if (!motionAllowed() || !("IntersectionObserver" in window)) return;
    const main = document.getElementById("main-content");
    if (!main) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const frame = requestAnimationFrame(() => {
      const targets = Array.from(
        main.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR},[data-wipe]`)
      ).filter(el => !el.closest("[data-hero]"));
      const siblingIndex = new Map<Element, number>();
      for (const el of targets) {
        if (el.dataset.motion) continue;
        el.dataset.motion = el.hasAttribute("data-wipe") ? "wipe" : "reveal";
        // Stagger siblings in the same row, capped so long lists never lag.
        const parent = el.parentElement!;
        const index = siblingIndex.get(parent) ?? 0;
        siblingIndex.set(parent, index + 1);
        el.style.setProperty("--reveal-i", String(Math.min(index, 4)));
        if (inViewport(el)) el.classList.add("is-revealed", "no-transition");
        else observer.observe(el);
      }
      // Drop the no-transition guard after first paint so hover effects keep working.
      requestAnimationFrame(() =>
        main
          .querySelectorAll(".no-transition")
          .forEach(el => el.classList.remove("no-transition"))
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location]);

  // Scroll-linked: progress bar and hero photo drift, one rAF per frame.
  useEffect(() => {
    if (!motionAllowed()) return;
    const bar = document.querySelector<HTMLElement>(".scroll-progress span");
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar) bar.style.transform = `scaleX(${progress})`;
      const hero = document.querySelector<HTMLElement>("[data-parallax-frame]");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const shift = Math.max(-1, Math.min(1, -rect.top / rect.height));
          hero.style.setProperty("--parallax", `${(shift * 7).toFixed(2)}%`);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span />
    </div>
  );
}

/**
 * A single statement whose words light up as it scrolls through the viewport.
 * Scrubbed to the scrollbar (it runs back on the way up). Without script or
 * with reduced motion every word is shown lit.
 */
export function ScrollStatement({
  eyebrow,
  text,
  highlight = [],
}: {
  eyebrow: string;
  text: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const section = ref.current;
    if (!section || !motionAllowed()) return;
    const spans = Array.from(section.querySelectorAll<HTMLElement>(".sw-word"));
    section.classList.add("is-live");
    let frame = 0;
    let lastLit = -1;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block enters the lower third, 1 when it reaches the upper third.
      const start = vh * 0.85;
      const end = vh * 0.3;
      const raw = (start - rect.top) / (start - end + rect.height * 0.5);
      const progress = Math.max(0, Math.min(1, raw));
      const lit = Math.round(progress * spans.length);
      if (lit === lastLit) return;
      lastLit = lit;
      spans.forEach((span, index) => span.classList.toggle("is-lit", index < lit));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      section.classList.remove("is-live");
    };
  }, []);

  return (
    <section ref={ref} className="statement-section" aria-label={eyebrow}>
      <div className="container">
        <p className="eyebrow statement-eyebrow">
          <span className="orange-line" />
          {eyebrow}
        </p>
        <p className="statement-text">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={
                highlight.includes(word) ? "sw-word sw-accent" : "sw-word"
              }
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
