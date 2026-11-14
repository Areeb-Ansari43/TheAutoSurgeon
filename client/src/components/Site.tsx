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
import { business, socials, type Service } from "@shared/catalog";
import { SocialIcon, SocialLinks } from "./Social";
import type { Guide } from "@shared/guides";


const workshopPhotos = [
  {
    src: "/assets/photos/workshop-lift.webp",
    alt: "Vehicle raised on a lift while a mechanic carries out repairs at The Auto Surgeon in Hayes",
    caption: "Vehicle repairs on the lift",
    className: "workshop-gallery-card-wide",
  },
  {
    src: "/assets/photos/workshop-mercedes.webp",
    alt: "Mercedes with its bonnet open during engine, tappet and rocker inspection at The Auto Surgeon Hayes",
    caption: "Mercedes engine-bay work",
    className: "",
  },
  {
    src: "/assets/photos/workshop-engine.webp",
    alt: "Mechanic working inside a vehicle engine bay at The Auto Surgeon in Hayes",
    caption: "Hands-on engine repair",
    className: "workshop-gallery-card-portrait",
  },
];

const navLinks = [
  ["/guides", "Car care guides"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

const links = [
  ["/services", "Services"],
  ["/about", "About"],
  ["/guides", "Car care"],
  ["/contact", "Contact"],
  ["/whatsapp", "WhatsApp"],
];

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
      <header className={scrolled ? "island-shell is-scrolled" : "island-shell"}>
        <div className="nav-island">
          <Link
            href="/"
            className="brand-link"
            aria-label="The Auto Surgeon home"
          >
            <img
              src="/assets/brand/auto-surgeon-logo.png"
              alt="The Auto Surgeon"
              width={160}
              height={60}
            />
          </Link>
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
                Services <ChevronDown size={14} />
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
            {navLinks.map(([path, label]) => (
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
            <SocialLinks className="social-icons nav-socials" />
            <Link
              href="/whatsapp"
              className="social-icon social-icon-whatsapp nav-whatsapp"
              aria-label="Message us on WhatsApp"
              title="WhatsApp"
            >
              <SocialIcon id="whatsapp" />
            </Link>
            <a
              href={business.tel}
              className="header-phone"
              aria-label={`Call The Auto Surgeon on ${business.phone}`}
            >
              <Phone size={15} />
              <span>{business.phone}</span>
            </a>
            <Link href="/book" className="btn btn-primary nav-book">
              Book inspection
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
            <div className="mobile-socials">
              <span className="mobile-nav-label">Follow the workshop</span>
              <SocialLinks />
            </div>
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
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  /** Extra breadcrumb levels between Home and the current page. */
  crumbs?: { href: string; label: string }[];
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className={image ? "page-intro has-image" : "page-intro"}>
      {image && <img className="page-intro-bg" src={image} alt="" />}
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs?.map(crumb => (
            <span key={crumb.href}>
              <span aria-hidden="true">/</span>
              <Link href={crumb.href}>{crumb.label}</Link>
            </span>
          ))}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <p className="eyebrow" data-reveal="fade">
          <span className="orange-line" />
          {eyebrow}
        </p>
        <h1 className="page-title" data-reveal="rise">
          {title}
        </h1>
        <p className="page-lead" data-reveal="up">
          {description}
        </p>
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
    <div className="section-head" data-stagger>
      <div>
        <div className="eyebrow" data-reveal="fade">
          <span className="orange-line" />
          {eyebrow}
        </div>
        <h2 className="section-heading" data-reveal="rise">
          {title}
        </h2>
        {description && (
          <p className="section-description" data-reveal="up">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link className="text-link" href={link} data-reveal="fade">
          {label}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}

export function WorkshopGallery() {
  const [selected, setSelected] = useState<(typeof workshopPhotos)[number] | null>(null);

  return (
    <>
      <div className="workshop-gallery" data-stagger>
        {workshopPhotos.map(photo => (
          <button
            data-reveal="up"
            type="button"
            className={`workshop-gallery-card ${photo.className}`}
            key={photo.src}
            onClick={() => setSelected(photo)}
            aria-label={`Zoom in: ${photo.caption}`}
          >
            <span className="workshop-gallery-frame">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <span className="workshop-gallery-zoom" aria-hidden="true">
                +
              </span>
            </span>
            <span className="workshop-gallery-caption">{photo.caption}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.caption}
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            className="image-lightbox-close"
            onClick={() => setSelected(null)}
            aria-label="Close enlarged workshop photo"
          >
            ×
          </button>
          <img
            src={selected.src}
            alt={selected.alt}
            onClick={event => event.stopPropagation()}
          />
          <p>{selected.caption}</p>
        </div>
      )}
    </>
  );
}

export function SocialsSection() {
  return (
    <section className="section social-section" aria-labelledby="social-heading">
      <div className="container">
        <div className="section-head" data-stagger>
          <div>
            <p className="eyebrow" data-reveal="fade">
              <span className="orange-line" />
              Follow the workshop
            </p>
            <h2 id="social-heading" className="section-heading" data-reveal="rise">
              Watch us work.
            </h2>
            <p className="section-description" data-reveal="up">
              Repair videos, quick car-care tips and the cars in our Hayes
              workshop this week. Follow us on TikTok, Instagram and Facebook.
            </p>
          </div>
        </div>
        <div className="social-cards" data-stagger>
          {socials.map(social => (
            <a
              key={social.id}
              className={`social-card social-card-${social.id}`}
              href={social.url}
              target="_blank"
              rel="me noopener noreferrer"
              data-reveal="up"
            >
              <span className="social-card-icon">
                <SocialIcon id={social.id} size={26} />
              </span>
              <span className="social-card-body">
                <strong>{social.name}</strong>
                <span className="social-card-handle">{social.handle}</span>
                <span className="social-card-blurb">{social.blurb}</span>
              </span>
              <span className="social-card-cta">
                Follow <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
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
    <Link
      className="service-card"
      href={`/services/${service.slug}`}
      data-reveal="up"
    >
      <div className="service-photo">
        <img
          src={`/assets/photos/${service.image}.webp`}
          alt={`${service.name} at The Auto Surgeon in Hayes`}
          loading="lazy"
        />
      </div>
      <div className="service-body">
        <span className="service-kicker">
          {String(index + 1).padStart(2, "0")} · {service.tag.toLowerCase()}
        </span>
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
          <span className="service-detail-link">View service</span>
        </div>
      </div>
    </Link>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="guide-card"
      data-reveal="up"
    >
      <div className="guide-card-photo">
        <img
          className="guide-image"
          src={guide.image}
          alt={guide.title}
          loading="lazy"
        />
      </div>
      <div className="guide-body">
        <div className="guide-meta">
          <span className="badge">{guide.category}</span>
          <span>{guide.readTime}</span>
        </div>
        <h3>{guide.title}</h3>
        <p>{guide.summary}</p>
        <span className="text-link">
          Read the guide <ArrowRight size={16} />
        </span>
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
      <div className="cta-banner" data-reveal="scale">
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
    <div className="faq-list" data-stagger>
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} data-reveal="up">
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
            <h2 className="footer-heading">The workshop</h2>
            <Link href="/services">Our services</Link>
            <Link href="/tyres">Tyres for every budget</Link>
            <Link href="/pricing">Labour price list</Link>
            <Link href="/workshop">How we work</Link>
            <Link href="/about">About us</Link>
          </div>
          <div>
            <h2 className="footer-heading">Good to know</h2>
            <Link href="/guides">Vehicle-care guides</Link>
            <Link href="/faq">Your questions, answered</Link>
            <Link href="/reviews">Customer stories</Link>
            <Link href="/quote">Request a written quote</Link>
            <Link href="/account">Your account</Link>
          </div>
          <div>
            <h2 className="footer-heading">Find us in Hayes</h2>
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
            <SocialLinks className="social-icons footer-socials" />
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
