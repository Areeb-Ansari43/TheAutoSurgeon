import type { CSSProperties } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { services, business } from "@shared/catalog";
import { guides } from "@shared/guides";
import {
  CTA,
  FAQs,
  SectionHead,
  ServiceCard,
  SocialsSection,
  TrustPoints,
  WorkshopGallery,
  GuideCard,
} from "@/components/Site";

const steps = [
  {
    num: "01",
    title: "Tell us what’s happening",
    text: "Choose a service or describe the problem. Request a visit online, send a WhatsApp or give the workshop a call.",
    image: "/assets/photos/diagnostics-tablet.webp",
    alt: "Diagnostic tablet connected to a car to read fault codes",
  },
  {
    num: "02",
    title: "We inspect. You approve.",
    text: "We check the vehicle, show you what we find and agree the quote before any work begins. No surprises on the bill.",
    image: "/assets/photos/workshop-lift.webp",
    alt: "Car raised on a workshop lift for inspection at The Auto Surgeon in Hayes",
  },
  {
    num: "03",
    title: "Back to your journey",
    text: "We complete the approved work, check the result and explain any follow-up care, so you drive away confident.",
    image: "/assets/photos/wheel-alignment.webp",
    alt: "Technician fitting wheel alignment equipment to a car wheel",
  },
];

const stats = [
  ["£10", "Puncture repairs from"],
  ["£50", "Wheel alignment labour"],
  ["6", "Days a week, Mon–Sat"],
  ["£60", "Tesla wheel alignment"],
];

export default function Home() {
  return (
    <>
      {/* ── Hero: full-screen photo, entrance on load, gentle parallax on scroll ── */}
      <section className="hero2" data-scroll="exit" aria-labelledby="home-title">
        <div className="hero2-media" aria-hidden="true">
          <img
            src="/assets/photos/hero-orange-caliper.webp"
            alt=""
            fetchPriority="high"
            width={1600}
            height={1067}
          />
        </div>
        <div className="container hero2-inner">
          <div className="hero2-copy">
            <p className="hx-kicker hero2-in" style={{ "--in": 0 } as CSSProperties}>
              <span className="status-dot" /> Independent workshop · Hayes, UB3
            </p>
            <h1 id="home-title" className="hero2-title">
              <span className="hero2-line hero2-in" style={{ "--in": 1 } as CSSProperties}>
                Precision car repairs
              </span>
              <span className="hero2-line hero2-in is-accent" style={{ "--in": 2 } as CSSProperties}>
                in Hayes.
              </span>
            </h1>
            <p className="hero2-lead hero2-in" style={{ "--in": 3 } as CSSProperties}>
              Tyres, wheel alignment, brakes, oil and diagnostics. Your car
              deserves a surgeon: expert hands, honest prices, no guesswork.
            </p>
            <div className="hx-actions hero2-actions hero2-in" style={{ "--in": 4 } as CSSProperties}>
              <Link href="/book" className="btn btn-primary btn-lg">
                <CalendarDays size={18} />
                Book an inspection
              </Link>
              <a href={business.tel} className="btn btn-glass btn-lg">
                <Phone size={17} />
                {business.phone}
              </a>
            </div>
          </div>
          <ul className="hero2-tiles hero2-in" style={{ "--in": 5 } as CSSProperties}>
            <li>
              <Clock3 size={18} />
              <span>
                <strong>Open Mon–Sat</strong>9 AM–6 PM · walk-ins welcome
              </span>
            </li>
            <li>
              <Wrench size={18} />
              <span>
                <strong>Punctures from £10</strong>Alignment from £50
              </span>
            </li>
            <li>
              <ShieldCheck size={18} />
              <span>
                <strong>Tesla alignment £60</strong>EV-aware workshop care
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="hx-strip" aria-label="Workshop details">
        <div className="container hx-strip-inner">
          <span>
            <MapPin size={16} />
            Unit 3, Squirrels Trading Estate, Hayes UB3 4RZ
          </span>
          <a href={business.tel}>
            <Phone size={16} />
            {business.phone}
          </a>
          <span>
            <Clock3 size={16} />
            Mon–Sat · 9 AM–6 PM
          </span>
        </div>
      </section>

      {/* ── Promises: each lights up as it scrolls into view ── */}
      <section className="promise" aria-labelledby="promise-heading">
        <div className="container promise-grid">
          <div className="promise-intro" data-reveal="up">
            <p className="eyebrow">
              <span className="orange-line" />A different kind of workshop
            </p>
            <h2 id="promise-heading" className="section-heading">
              How every job works.
            </h2>
            <p>
              Three promises on every car that comes through our doors, from a
              £10 puncture to a Mercedes engine.
            </p>
          </div>
          <ol className="promise-list">
            {[
              ["We inspect first.", "Every job starts with a proper look at the car, not a guess over the phone."],
              ["We explain what we find.", "We show you the problem in plain English, and photos when it helps."],
              ["We agree the price.", "You approve the quote before a single bolt turns. Nothing is added without asking."],
            ].map(([title, text], index) => (
              <li className="promise-item" data-scroll key={title}>
                <span className="promise-num">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="container">
          <p className="promise-close" data-reveal="up">
            No upsell. <span>No guesswork.</span> Just the right repair, done
            properly.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section section-alt" id="services">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Six core services.{" "}
                <span className="muted-heading">Honest labour prices.</span>
              </>
            }
            description="Labour only unless noted; parts are quoted separately and agreed before work starts."
            link="/services"
          />
          <div className="service-grid" data-stagger>
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="stat-band" aria-label="Prices at a glance">
        <div className="container stat-grid" data-stagger>
          {stats.map(([value, label]) => (
            <div className="stat" key={label} data-reveal="up">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pinned chapters: the photo changes as each step scrolls past ── */}
      <section className="chapters" data-spy=".chapter" aria-labelledby="process-heading">
        <div className="container chapters-grid">
          <div className="chapters-media" aria-hidden="true">
            {steps.map(step => (
              <img key={step.num} src={step.image} alt="" loading="lazy" />
            ))}
          </div>
          <div className="chapters-copy">
            <p className="eyebrow">
              <span className="orange-line" />
              Straightforward by design
            </p>
            <h2 id="process-heading" className="section-heading">
              From first call to final check.
            </h2>
            <ol className="chapter-list">
              {steps.map(step => (
                <li className="chapter" key={step.num} data-reveal="up">
                  <img className="chapter-photo" src={step.image} alt={step.alt} loading="lazy" />
                  <span className="step-number">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <Link href="/workshop" className="text-link">
              Inside our process
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Specialist: full-bleed parallax photo ── */}
      <section
        className="specialist"
        data-scroll
        aria-labelledby="mercedes-specialist-heading"
      >
        <img
          className="specialist-bg"
          src="/assets/photos/workshop-mercedes.webp"
          alt="Mercedes with its bonnet open during engine work at The Auto Surgeon in Hayes"
          loading="lazy"
        />
        <div className="container">
          <div className="specialist-card" data-reveal="up">
            <p className="eyebrow">Mercedes specialist work</p>
            <h2 id="mercedes-specialist-heading">
              Tappets, rockers and engines.
            </h2>
            <p>
              Ticking on start-up, uneven running or an engine warning? We
              diagnose Mercedes engines carefully, explain what we find and
              agree the repair before work begins.
            </p>
            <Link
              href="/quote?service=Vehicle%20Diagnostics"
              className="btn btn-primary"
            >
              Ask about Mercedes work
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Workshop gallery ── */}
      <section className="section workshop-gallery-section">
        <div className="container">
          <SectionHead
            eyebrow="Our workshop"
            title="Real cars. Real work."
            description="A look inside The Auto Surgeon in Hayes: vehicle lifts, engine-bay repairs and careful hands-on servicing. Tap a photo to enlarge it."
            link="/about"
            label="Meet the workshop"
          />
          <WorkshopGallery />
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="section section-alt">
        <div className="container split-section">
          <div className="workshop-photo" data-reveal="scale">
            <img
              src="/assets/photos/diagnostics-tablet.webp"
              alt="Diagnostic equipment used to investigate a vehicle fault"
              loading="lazy"
            />
          </div>
          <div className="content-copy" data-stagger>
            <p className="eyebrow" data-reveal="up">
              <span className="orange-line" />
              Why drivers choose us
            </p>
            <h2 className="section-heading" data-reveal="up">
              Car care,{" "}
              <span className="orange-text">without the complications.</span>
            </h2>
            <p data-reveal="up">
              When something doesn’t feel right you need clear answers, not a
              confusing list of parts. We take the time to inspect, explain and
              agree the work before reaching for the tools.
            </p>
            <div className="value-row" data-reveal="up">
              <span className="icon-box">
                <ShieldCheck size={21} />
              </span>
              <div>
                <h3>Honest advice, upfront prices</h3>
                <p>Know what needs doing and what it costs before work starts.</p>
              </div>
            </div>
            <div className="value-row" data-reveal="up">
              <span className="icon-box">
                <Wrench size={21} />
              </span>
              <div>
                <h3>Precision, not guesswork</h3>
                <p>
                  Vehicle-specific checks, the correct specifications and
                  careful work, including Tesla alignment.
                </p>
              </div>
            </div>
            <div data-reveal="up">
              <TrustPoints />
            </div>
          </div>
        </div>
      </section>

      {/* ── Guides teaser (internal links help guides rank) ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Car care guides"
            title="Free advice from the workshop."
            description="Plain-English guides to tyre checks, warning lights, alignment and what to do after a pothole."
            link="/guides"
            label="Browse all guides"
          />
          <div className="guide-grid" data-stagger>
            {guides.slice(0, 3).map(guide => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <SocialsSection />

      {/* ── Reviews ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="Customer stories"
            title="Trusted in Hayes."
            link="/reviews"
            label="Read customer stories"
          />
          <div className="review-grid" data-stagger>
            {[
              [
                "Sandeep K.",
                "BMW 3 Series",
                "Booked alignment after a kerb hit. Diagnosed, aligned and out the door in under an hour. Steering is back to dead-centre.",
              ],
              [
                "Aisha M.",
                "Volkswagen Polo",
                "Honest pricing — quoted £50 for front discs and pads and that’s what I paid. No surprises.",
              ],
              [
                "Daniel R.",
                "Tesla Model 3",
                "One of the few places near Hayes that knows Tesla alignment specs. Properly done.",
              ],
            ].map(([name, vehicle, text]) => (
              <figure className="review-card" key={name} data-reveal="up">
                <blockquote>“{text}”</blockquote>
                <figcaption className="review-author">
                  <strong>{name}</strong>
                  <span>{vehicle}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="price-disclaimer">
            Testimonials supplied on our original website; not independently
            verified.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Your questions"
            title="Good to know before you go."
            link="/faq"
            label="All frequently asked questions"
          />
          <FAQs
            items={[
              {
                question: "Can I visit without an appointment?",
                answer:
                  "Walk-ins are welcome Monday to Saturday, 9 AM to 6 PM. Calling ahead helps us check capacity and any parts or tyre specifications you need.",
              },
              {
                question: "Are the prices for parts and labour?",
                answer:
                  "Published prices are labour only unless noted. The £60 TPMS sensor change includes the part. We confirm parts and the full quote before work starts.",
              },
              {
                question: "Does an online request confirm my appointment?",
                answer:
                  "No. Your date and time are preferences. We save your request and the workshop must confirm availability before you travel.",
              },
            ]}
          />
        </div>
      </section>

      <CTA />

      <section className="visit-strip container" data-reveal="up">
        <MapPin size={22} />
        <div>
          <h2>Right here in Hayes.</h2>
          <p>Unit 3 Squirrels Trading Estate, Viveash Close, UB3 4RZ</p>
        </div>
        <Link href="/contact" className="text-link">
          Find the workshop
          <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
