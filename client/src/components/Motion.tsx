import { useEffect, type CSSProperties, type ReactNode } from "react";
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
 *                           the viewport. data-scroll="pin" measures progress
 *                           across a tall container whose child is position: sticky.
 *
 * Everything is visible without JavaScript (server HTML, crawlers, reduced
 * motion). Hidden start states only apply once <html> has .motion-ready.
 */

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        if (el.dataset.scroll === "pin") {
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
