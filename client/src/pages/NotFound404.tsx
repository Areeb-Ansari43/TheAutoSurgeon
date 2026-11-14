import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Home,
  PoundSterling,
  Wrench,
} from "lucide-react";
import { business } from "@shared/catalog";
import { getPageMeta, publicPaths } from "@shared/routes";
import { SocialIcon } from "@/components/Social";

/*
 * 404: a rev counter that sweeps to the redline, stalls and settles on 4.04,
 * a blinking check-engine light, a fault-code readout and "did you mean"
 * suggestions worked out from the broken URL.
 */

const STOP_WORDS = new Set(["the", "a", "and", "in", "of", "to", "for", "your", "hayes", "www", "html", "index"]);
const tokens = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));

function suggestionsFor(path: string) {
  const wanted = tokens(decodeURIComponent(path));
  if (wanted.length === 0) return [];
  return publicPaths
    .filter(candidate => candidate !== "/")
    .map(candidate => {
      const meta = getPageMeta(candidate);
      const haystack = tokens(`${candidate} ${meta?.title ?? ""}`);
      const score = wanted.reduce(
        (total, word) =>
          total +
          (haystack.includes(word)
            ? 3
            : haystack.some(other => other.startsWith(word.slice(0, 4)))
              ? 1
              : 0),
        0
      );
      return { path: candidate, title: meta?.title.split(/\s[—|]\s/)[0] ?? candidate, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

const quickLinks = [
  { href: "/", label: "Homepage", text: "Start again from the top", icon: Home },
  { href: "/services", label: "Services", text: "Tyres, brakes, alignment & more", icon: Wrench },
  { href: "/guides", label: "Car care guides", text: "Free advice from the workshop", icon: BookOpen },
  { href: "/pricing", label: "Prices", text: "Honest labour price list", icon: PoundSterling },
];

const TICKS = Array.from({ length: 9 }, (_, index) => index); // 0–8 ×1000 rpm

function Tachometer({ revving }: { revving: boolean }) {
  // 270° sweep from -135° (0 rpm) to +135° (8000 rpm).
  const angle = (value: number) => -135 + (value / 8) * 270;
  const polar = (deg: number, r: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [100 + r * Math.cos(rad), 100 + r * Math.sin(rad)];
  };
  const arc = (from: number, to: number, r: number) => {
    const [x1, y1] = polar(angle(from), r);
    const [x2, y2] = polar(angle(to), r);
    const large = angle(to) - angle(from) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <svg className="tach" viewBox="0 0 200 200" role="img" aria-label="Rev counter stalled at 4.04">
      <defs>
        <radialGradient id="tach-face" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1c1c20" />
          <stop offset="100%" stopColor="#09090b" />
        </radialGradient>
        <linearGradient id="tach-needle" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffb066" />
          <stop offset="100%" stopColor="#f26a00" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#tach-face)" stroke="rgba(255,255,255,.08)" strokeWidth="1.5" />
      <path d={arc(0, 6.5, 82)} className="tach-track" />
      <path d={arc(6.5, 8, 82)} className="tach-red" />
      {Array.from({ length: 33 }, (_, index) => {
        const value = index / 4;
        const major = index % 4 === 0;
        const [x1, y1] = polar(angle(value), major ? 70 : 74);
        const [x2, y2] = polar(angle(value), 79);
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={value >= 6.5 ? "tach-tick is-red" : major ? "tach-tick is-major" : "tach-tick"}
          />
        );
      })}
      {TICKS.map(value => {
        const [x, y] = polar(angle(value), 58);
        return (
          <text key={value} x={x} y={y + 3.5} className={value >= 7 ? "tach-num is-red" : "tach-num"}>
            {value}
          </text>
        );
      })}
      <text x="100" y="128" className="tach-unit">×1000 r/min</text>
      <text x="100" y="152" className="tach-readout">4.04</text>
      <g className={revving ? "tach-needle is-revving" : "tach-needle"}>
        <path d="M 98.2 100 L 99.4 30 L 100.6 30 L 101.8 100 Z" fill="url(#tach-needle)" />
        <circle cx="100" cy="100" r="9" fill="#18181b" stroke="#f26a00" strokeWidth="2" />
        <circle cx="100" cy="100" r="3" fill="#f26a00" />
      </g>
    </svg>
  );
}

export default function NotFound404() {
  const [location] = useLocation();
  const [revving, setRevving] = useState(false);
  const suggestions = useMemo(() => suggestionsFor(location), [location]);
  const shownPath = location === "/missing-page" ? "" : location;

  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="nf-glow" aria-hidden="true" />
      <div className="container nf-grid">
        <div className="nf-dash">
          <button
            type="button"
            className="nf-gauge"
            onPointerEnter={() => setRevving(true)}
            onPointerLeave={() => setRevving(false)}
            onClick={() => setRevving(value => !value)}
            aria-label="Rev the engine"
          >
            <Tachometer revving={revving} />
          </button>
          <div className="nf-lights" aria-hidden="true">
            <span className="nf-light is-engine" title="Check engine">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="currentColor"
                  d="M7 5h6v2h-2v2h3l2 2h2V9h2v8h-2v-2h-2l-2 3H8l-2-3H4v3H2V9h2v3h2V9h3V7H7V5Z"
                />
              </svg>
            </span>
            <span className="nf-light is-tyre" title="Tyre pressure">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6c-2 3-2 9 0 12M18 6c2 3 2 9 0 12M6 18h12M12 7v6m0 3v.5"
                />
              </svg>
            </span>
            <span className="nf-light is-battery" title="Battery">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M3 8h18v11H3zM7 8V6m10 2V6M6 13h4m6-2v4m-2-2h4"
                />
              </svg>
            </span>
          </div>
          <p className="nf-hint">Hover or tap the dial to rev it</p>
        </div>

        <div className="nf-copy">
          <p className="nf-code">
            <span className="nf-dot" /> Fault code P0404 · Page not found
          </p>
          <h1 id="nf-title" className="nf-title">
            Wrong turn.
            <span>This road doesn’t go anywhere.</span>
          </h1>
          <p className="nf-lead">
            {shownPath ? (
              <>
                We ran a full diagnostic on <code>{shownPath}</code> and found
                nothing there.
              </>
            ) : (
              <>We ran a full diagnostic and found nothing at this address.</>
            )}{" "}
            It may have moved, or the link might have a typo. No charge for
            this inspection.
          </p>
          <div className="nf-actions">
            <Link href="/" className="btn btn-primary btn-lg">
              Back to the homepage <ArrowRight size={17} />
            </Link>
            <Link href="/book" className="btn btn-glass btn-lg">
              <CalendarDays size={17} /> Book an inspection
            </Link>
          </div>

          {suggestions.length > 0 && (
            <div className="nf-suggest">
              <p className="nf-label">Did you mean…</p>
              <ul>
                {suggestions.map(item => (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.path}</small>
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="nf-label">Popular routes</p>
          <ul className="nf-links">
            {quickLinks.map(({ href, label, text, icon: Icon }) => (
              <li key={href}>
                <Link href={href}>
                  <Icon size={20} />
                  <span>
                    <strong>{label}</strong>
                    <small>{text}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="nf-help">
            Stuck? Call <a href={business.tel}>{business.phone}</a> or{" "}
            <Link href="/whatsapp" className="nf-wa">
              <SocialIcon id="whatsapp" size={15} /> message us on WhatsApp
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
