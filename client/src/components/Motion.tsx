import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLocation } from "wouter";

/*
 * Apple-style scroll motion, with no dependencies.
 *
 *  [data-reveal]            fades / lifts into view once (IntersectionObserver).
 *                           Optional value: "up" (default) | "fade" | "scale" | "left" | "right".
 *  [data-stagger]           children with [data-reveal] get an increasing delay.
 *  [data-spy="<selector>"]  marks the item (matched by selector) nearest the
 *                           upper third of the viewport: sets data-active="<index>"
 *                           on the container and aria-current on its #id link.
 *  [data-scroll]            receives --p (0 → 1) as the element travels through
 *                           the viewport. data-scroll="exit" goes 0 → 1 as an
 *                           element at the top of the page scrolls away.
 *                           data-scroll="pin" measures progress
 *                           across a tall container whose child is position: sticky.
 *
 * Everything is visible without JavaScript (server HTML, crawlers, reduced
 * motion). Hidden start states only apply once <html> has .motion-ready.
 */

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * Site-wide motion: tag the shared building blocks of every page so all
 * pages animate without hand-written attributes. Elements that already
 * animate (or sit inside something that does) are left alone.
 */
const AUTO_REVEAL: [string, string][] = [
  ["main h2:not(.visually-hidden), main .page-title, main .guide-title", "rise"],
  [
    [
      ".info-card",
      ".process-card",
      ".pricing-row",
      ".pricing-header",
      ".tyre-option",
      ".contact-row",
      ".detail-step",
      ".symptom-grid > *",
      ".includes-list > *",
      ".review-card",
      ".article-section > p",
      ".guide-sub",
      ".trouble-card",
      ".service-help",
      ".info-note",
      ".booking-summary",
      ".form-card:not(.step-form)",
      ".step-form",
      ".faq-item",
      ".value-row",
      ".law-callout",
      ".guide-intro-box",
      ".guide-safety-note",
      ".guide-video",
      ".guide-links li",
      ".toc-card",
      ".check-list li",
      ".map-frame-wrap",
      ".section-description",
      ".content-copy > p",
      ".content-copy > .text-link",
      ".page-intro .intro-buttons",
      ".footer-main > div",
    ].join(", "),
    "up",
  ],
  ["img.wide-photo, .workshop-photo, .guide-cover, .detail-photo, .service-hero-photo", "clip"],
];
const AUTO_STAGGER = [
  ".feature-grid",
  ".process-grid",
  ".tyre-options",
  ".pricing-table",
  ".symptom-grid",
  ".includes-list",
  ".review-grid",
  ".faq-list",
  ".trouble-list",
  ".guide-steps",
  ".guide-links",
  ".contact-panel",
  ".check-list",
  ".footer-main",
  ".content-copy",
].join(", ");
/** Photo frames whose image drifts slightly as the page scrolls. */
const AUTO_PARALLAX =
  ".service-photo, .guide-card-photo, .guide-featured-photo, .workshop-gallery-frame, .workshop-photo, .chapters-media";

function autoTag() {
  for (const [selector, kind] of AUTO_REVEAL) {
    document.querySelectorAll<HTMLElement>(selector).forEach(el => {
      if (el.closest(".hero2, .promise, .hx-strip, .wa-quick")) return;
      if (el.hasAttribute("data-reveal")) return;
      if (el.parentElement?.closest("[data-reveal]")) return;
      if (el.querySelector("[data-reveal]")) return;
      el.setAttribute("data-reveal", kind);
    });
  }
  document.querySelectorAll<HTMLElement>(AUTO_STAGGER).forEach(el => {
    if (!el.hasAttribute("data-stagger")) el.setAttribute("data-stagger", "");
  });
  document.querySelectorAll<HTMLElement>(AUTO_PARALLAX).forEach(el => {
    if (!el.hasAttribute("data-scroll")) {
      el.setAttribute("data-scroll", "");
      el.classList.add("has-parallax");
    }
  });
  document.querySelectorAll<HTMLElement>(".page-intro").forEach(el => {
    if (!el.hasAttribute("data-scroll")) {
      el.setAttribute("data-scroll", "exit");
      el.classList.add("intro-exit");
    }
  });
}

export function ScrollMotion() {
  const [location] = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotion()) {
      root.classList.remove("motion-ready");
      document
        .querySelectorAll<HTMLElement>("[data-scroll]")
        .forEach(el => el.style.setProperty("--p", "1"));
      return;
    }
    autoTag();

    // Stagger indices
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach(group => {
      group
        .querySelectorAll<HTMLElement>(":scope > [data-reveal], :scope > * > [data-reveal]")
        .forEach((child, index) =>
          child.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 80}ms`)
        );
    });

    const revealObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const register = (el: HTMLElement) => {
      // Anything already on screen is shown immediately (no flash).
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) el.classList.add("is-in");
      else revealObserver.observe(el);
    };
    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
      .forEach(register);
    // Content rendered later (filters, accordions, data loads) is registered too.
    const mutations = new MutationObserver(records => {
      for (const record of records)
        record.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) register(node);
          node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(register);
        });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    root.classList.add("motion-ready");

    // Scroll spy
    const spies = Array.from(document.querySelectorAll<HTMLElement>("[data-spy]")).map(
      container => ({
        container,
        items: Array.from(document.querySelectorAll<HTMLElement>(container.dataset.spy || "")),
      })
    );
    const updateSpies = () => {
      const line = window.innerHeight * 0.4;
      for (const { container, items } of spies) {
        let active = 0;
        items.forEach((item, index) => {
          if (item.getBoundingClientRect().top <= line) active = index;
        });
        if (container.dataset.active !== String(active)) {
          container.dataset.active = String(active);
          container.querySelectorAll("a[href^='#']").forEach(link => {
            const current = link.getAttribute("href") === `#${items[active]?.id}`;
            if (current) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        }
      }
    };

    // Scroll-linked progress
    const tracked = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    const pageBars = Array.from(document.querySelectorAll<HTMLElement>("[data-page-progress]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      updateSpies();
      // At the very bottom, reveal anything that could never scroll further into view.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
          .forEach(el => el.classList.add("is-in"));
      }
      if (pageBars.length) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pageP = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        pageBars.forEach(bar => bar.style.setProperty("--p", pageP.toFixed(4)));
      }
      const vh = window.innerHeight;
      for (const el of tracked) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) continue;
        let p: number;
        if (el.dataset.scroll === "exit") {
          // 0 while the element's top is at the viewport top, 1 once it has scrolled away.
          p = -rect.top / Math.max(1, rect.height);
        } else if (el.dataset.scroll === "pin") {
          const distance = rect.height - vh;
          p = distance > 0 ? -rect.top / distance : 1;
        } else {
          p = (vh - rect.top) / (vh + rect.height);
        }
        p = Math.min(1, Math.max(0, p));
        el.style.setProperty("--p", p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      revealObserver.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location]);

  return null;
}

/** A paragraph whose words light up one by one as it scrolls past (Apple keynote style). */
export function ScrollWords({
  text,
  accent = [],
  as: Tag = "p",
  className = "",
}: {
  text: string;
  accent?: string[];
  as?: "p" | "h2";
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={`scroll-words ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={accent.includes(word.replace(/[.,]/g, "")) ? "is-accent" : undefined}
          style={{ "--w": (index / words.length).toFixed(3) } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  as: Tag = "div",
  kind = "up",
  className,
}: {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "figure";
  kind?: "up" | "fade" | "scale" | "left" | "right";
  className?: string;
}) {
  return (
    <Tag data-reveal={kind} className={className}>
      {children}
    </Tag>
  );
}

/** Counts a number up from zero the first time it scrolls into view. */
export function CountUp({
  value,
  prefix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);
  return (
    <span ref={ref} aria-label={`${prefix}${value}`}>
      <span aria-hidden="true">
        {prefix}
        {shown}
      </span>
    </span>
  );
}

/** Two rows of big type that slide in opposite directions as the page scrolls. */
export function ScrollMarquee() {
  const words = [
    "Tyres",
    "Wheel alignment",
    "Brakes",
    "Diagnostics",
    "Engine oil",
    "Tesla alignment",
    "Mercedes specialist",
  ];
  const row = [...words, ...words];
  return (
    <section className="marquee" data-scroll aria-hidden="true">
      <div className="marquee-row">
        {row.map((word, index) => (
          <span key={index}>
            {word}
            <i />
          </span>
        ))}
      </div>
      <div className="marquee-row is-outline">
        {[...row].reverse().map((word, index) => (
          <span key={index}>
            {word}
            <i />
          </span>
        ))}
      </div>
    </section>
  );
}

/** Thin orange bar at the top of the window showing how far down the page you are. */
export function PageProgress() {
  return (
    <div className="read-progress" data-page-progress aria-hidden="true">
      <span />
    </div>
  );
}
