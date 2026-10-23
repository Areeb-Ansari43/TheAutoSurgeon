import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { business, type Service } from "@shared/catalog";

const links = [
  ["/services", "Services"],
  ["/about", "About"],
  ["/guides", "Car care"],
  ["/contact", "Contact"],
  ["/whatspp", "WhatsApp"],
];

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    const hash = window.location.hash.replace(/^#/, "");
    requestAnimationFrame(() => {
      if (hash)
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [location]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  const active = (path: string) =>
    location === path || location.startsWith(path + "/");
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="island-shell">
        <div className="nav-island">
          <Link
            href="/"
            className="brand-link"
            aria-label="The Auto Surgeon home"
          >
            <img
              src="/assets/brand/auto-surgeon-logo.png"
              alt="The Auto Surgeon"
            />
          </Link>
          <div className="nav-divider" />
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-menu-wrap">
              <button
                className={
                  active("/services")
                    ? "island-link active nav-menu-trigger"
                    : "island-link nav-menu-trigger"
                }
                onClick={() => setServicesOpen(value => !value)}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
              >
                Services <ChevronDown size={12} />
              </button>
              {servicesOpen && (
                <div className="nav-dropdown" role="menu">
                  <Link href="/services" role="menuitem">
                    All services <ArrowRight size={14} />
                  </Link>
                  <a href="/services#tyres" role="menuitem">
                    Tyres & punctures <ArrowRight size={14} />
                  </a>
                  <a href="/services#pricing" role="menuitem">
                    Pricing <ArrowRight size={14} />
                  </a>
                  <a href="/services#emergency" role="menuitem">
                    Emergency repairs <ArrowRight size={14} />
                  </a>
                </div>
              )}
            </div>
            {links.slice(1).map(([path, label]) => (
              <Link
                key={path}
                href={path}
                className={active(path) ? "island-link active" : "island-link"}
                aria-current={active(path) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="island-actions">
            <a
              href={business.tel}
              className="header-phone"
              aria-label={`Call The Auto Surgeon on ${business.phone}`}
            >
              <Phone size={16} />
              <span>{business.phone}</span>
            </a>
            <Link href="/book" className="btn btn-primary nav-book">
              <CalendarDays size={15} />
              <span>Book inspection</span>
            </Link>
            <button
              className="mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-island"
            aria-label="Mobile navigation"
          >
            <Link href="/" className="island-link">
              Home
            </Link>
            <div className="mobile-service-links">
              <span className="mobile-nav-label">Services</span>
              <Link href="/services" className="island-link">
                All services <ArrowRight size={15} />
              </Link>
              <a href="/services#tyres" className="island-link">
                Tyres & punctures <ArrowRight size={15} />
              </a>
              <a href="/services#pricing" className="island-link">
                Pricing <ArrowRight size={15} />
              </a>
              <a href="/services#emergency" className="island-link">
                Emergency repairs <ArrowRight size={15} />
              </a>
            </div>
            {links.slice(1).map(([path, label]) => (
              <Link
                key={path}
                href={path}
                className={active(path) ? "island-link active" : "island-link"}
                aria-current={active(path) ? "page" : undefined}
              >
                {label}
                <ArrowRight size={15} />
              </Link>
            ))}
            <a href={business.tel} className="mobile-phone">
              <Phone size={15} />
              {business.phone}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <div className="eyebrow">
          <span className="orange-line" />
          {eyebrow}
        </div>
        <h1 className="page-title">{title}</h1>
        <p className="page-lead">{description}</p>
        {children}
      </div>
    </section>
  );
}
export function SectionHead({
  eyebrow,
  title,
  description,
  link,
  label = "Explore all services",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  link?: string;
  label?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow">
          <span className="orange-line" />
          {eyebrow}
        </div>
        <h2 className="section-heading">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {link && (
        <Link className="text-link" href={link}>
          {label}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Link className="service-card" href={`/services/${service.slug}`}>
      <div className="service-photo">
        <img
          src={`/assets/photos/${service.image}.webp`}
          alt={service.name}
          loading="lazy"
        />
        <div className="service-photo-veil" />
        <span className="service-number">0{index + 1}</span>
        <span className="service-photo-tag">{service.tag}</span>
      </div>
      <div className="service-body">
        <div className="service-name-row">
          <h3>{service.name}</h3>
          <ArrowRight className="service-arrow" size={21} />
        </div>
        <p>{service.short}</p>
        <div className="service-bottom">
          <div>
            <span className="price-caption">{service.priceLabel}</span>
            <strong>£{service.price}</strong>
          </div>
          <span className="service-detail-link">Discover service</span>
        </div>
      </div>
    </Link>
  );
}
export function CTA({
  title = "Your car deserves a surgeon.",
  description = "Tell us what your vehicle needs. We’ll inspect it, explain it and quote before we work.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="container">
      <div className="cta-banner">
        <div className="cta-symbol">
          <CircleDot size={52} strokeWidth={1} />
        </div>
        <div>
          <div className="eyebrow">LET’S GET YOU BACK ON THE ROAD</div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Link href="/book" className="btn btn-primary">
          Book an inspection
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export function FAQs({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question}>
          <summary>
            <span className="faq-number">0{index + 1}</span>
            {item.question}
            <span className="faq-plus">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function TrustPoints() {
  return (
    <div className="trust-points">
      <span>
        <Check size={14} />
        Walk-ins welcome
      </span>
      <span>
        <Check size={14} />
        Upfront labour prices
      </span>
      <span>
        <Check size={14} />
        Tesla alignment
      </span>
    </div>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/">
              <img
                src="/assets/brand/auto-surgeon-logo.png"
                alt="The Auto Surgeon"
                loading="lazy"
              />
            </Link>
            <p>
              Precision repairs. Expert service.
              <br />
              Your car deserves a surgeon.
            </p>
            <a href={business.tel} className="footer-phone">
              <Phone size={16} />
              {business.phone}
            </a>
          </div>
          <div>
            <h3>THE WORKSHOP</h3>
            <Link href="/services">Our services</Link>
            <Link href="/tyres">Tyres for every budget</Link>
            <Link href="/pricing">Labour price list</Link>
            <Link href="/workshop">How we work</Link>
            <Link href="/about">About us</Link>
          </div>
          <div>
            <h3>GOOD TO KNOW</h3>
            <Link href="/guides">Vehicle-care guides</Link>
            <Link href="/faq">Your questions, answered</Link>
            <Link href="/reviews">Customer stories</Link>
            <Link href="/quote">Request a written quote</Link>
            <Link href="/account">Your account</Link>
          </div>
          <div>
            <h3>FIND US IN HAYES</h3>
            <Link href="/contact">
              Unit 3 Squirrels Trading Estate
              <br />
              Viveash Close, Hayes UB3 4RZ
            </Link>
            <p>
              Mon–Sat · 9:00 AM–6:00 PM
              <br />
              Sunday by appointment
            </p>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <Link href="/contact" className="footer-directions">
              Get directions
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} THE AUTO SURGEON</span>
          <div>
            <span>
              <ShieldCheck size={13} />
              Care. Precision. Transparency.
            </span>
            <Link href="/privacy">Privacy & cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
