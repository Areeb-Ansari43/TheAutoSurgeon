import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { services, business } from "@shared/catalog";
import {
  CTA,
  FAQs,
  SectionHead,
  ServiceCard,
  TrustPoints,
} from "@/components/Site";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-grain" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-location">
              <span className="status-dot" />
              YOUR LOCAL SPECIALIST<span className="location-separator">/</span>
              HAYES, UB3
            </div>
            <h1 className="hero-title">
              PRECISION
              <br />
              REPAIRS.
              <br />
              EXPERT SERVICE.
              <br />
              <span>
                YOUR CAR
                <br />
                DESERVES
                <br />A SURGEON.
              </span>
            </h1>
            <p className="hero-description">
              Tyres, wheel alignment, brakes and diagnostics.
              <br className="desktop-break" />
              Expert care for your car. Honest advice for you.
            </p>
            <div className="hero-buttons">
              <Link href="/book" className="btn btn-primary">
                <CalendarDays size={17} />
                Book your inspection
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn btn-ghost">
                Explore services
                <ArrowRight size={16} />
              </Link>
            </div>
            <TrustPoints />
          </div>
          <div className="hero-visual">
            <img
              className="hero-photo"
              src="/assets/photos/hero-orange-caliper.webp"
              alt="Orange performance brake caliper and wheel — The Auto Surgeon"
              fetchPriority="high"
            />
            <div className="hero-image-shade" />
            <div className="hero-image-top">
              <span className="visual-coordinate">HAYES, WEST LONDON</span>
              <span className="visual-service">PRECISION IN EVERY DETAIL</span>
            </div>
            <div className="hero-image-bottom">
              <div className="hero-shield">
                <ShieldCheck size={23} />
              </div>
              <div>
                <span>YOUR VEHICLE. OUR PRIORITY.</span>
                <strong>Expert hands. No guesswork.</strong>
              </div>
              <span className="hero-photo-arrow">
                <ArrowRight size={23} />
              </span>
            </div>
            <span className="hero-image-label">ALIGNMENT / BRAKES / TYRES</span>
          </div>
        </div>
        <div className="hero-bottom-line">
          <div className="container">
            <span>
              <MapPin size={14} />
              Unit 3, Squirrels Trading Estate · Hayes
            </span>
            <a href={business.tel}>
              <Phone size={14} />
              {business.phone}
              <ArrowRight size={13} />
            </a>
            <span>
              <Clock3 size={14} />
              Mon–Sat · 9 AM–6 PM
            </span>
          </div>
        </div>
      </section>
      <section className="section section-alt" id="services">
        <div className="container">
          <SectionHead
            eyebrow="WHAT WE DO"
            title={
              <>
                Vehicle health.
                <br />
                <span className="muted-heading">Performed by specialists.</span>
              </>
            }
            description="Six core services. Honest prices. No upsell, no waffle."
            link="/services"
          />
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
          <p className="price-disclaimer">
            Starting prices refer to the stated service. Labour only unless
            noted; parts quoted separately.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container split-section">
          <div className="workshop-photo">
            <img
              src="/assets/photos/diagnostics-tablet.webp"
              alt="Diagnostic equipment used to investigate vehicle faults"
              loading="lazy"
            />
            <div className="photo-note">
              <Wrench size={19} />
              <span>DIAGNOSE FIRST. REPAIR RIGHT.</span>
            </div>
          </div>
          <div className="content-copy">
            <div className="eyebrow">
              <span className="orange-line" />A DIFFERENT KIND OF WORKSHOP
            </div>
            <h2 className="section-heading">
              Car care.
              <br />
              <span className="orange-text">Without the complications.</span>
            </h2>
            <p>
              When something doesn’t feel right, you need clear answers—not a
              confusing list of parts. We take the time to inspect, explain and
              agree the work before reaching for the tools.
            </p>
            <div className="value-row">
              <span className="icon-box">
                <ShieldCheck size={21} />
              </span>
              <div>
                <h3>Honest advice, upfront prices</h3>
                <p>
                  Know what needs doing and what it costs before work starts.
                </p>
              </div>
            </div>
            <div className="value-row">
              <span className="icon-box">
                <Wrench size={21} />
              </span>
              <div>
                <h3>Precision, not guesswork</h3>
                <p>
                  Vehicle-specific checks, the correct specifications and
                  careful work.
                </p>
              </div>
            </div>
            <Link href="/about" className="text-link">
              Meet The Auto Surgeon
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="STRAIGHTFORWARD BY DESIGN"
            title="From first call to final check."
            link="/workshop"
            label="Inside our process"
          />
          <div className="process-grid">
            {[
              [
                "01",
                "Tell us what’s happening",
                "Choose a service or describe the problem. Request a visit online, or give the workshop a call.",
              ],
              [
                "02",
                "We inspect. You approve.",
                "We check the vehicle, explain what we find and agree the quote before work begins.",
              ],
              [
                "03",
                "Back to your journey",
                "We complete the approved work, check the result and explain any follow-up care.",
              ],
            ].map(([num, title, text]) => (
              <div className="process-card" key={num}>
                <span className="step-number">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="CUSTOMER STORIES"
            title="Trusted in Hayes."
            link="/reviews"
            label="Read customer stories"
          />
          <div className="review-grid">
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
              <Link href="/reviews" className="review-card" key={name}>
                <div className="eyebrow">CUSTOMER TESTIMONIAL</div>
                <blockquote>“{text}”</blockquote>
                <div className="review-author">
                  {name}
                  <p>{vehicle}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="price-disclaimer">
            Testimonials supplied on our original website; not independently
            verified.
          </p>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="YOUR QUESTIONS"
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
      <section className="visit-strip container">
        <MapPin size={22} />
        <div>
          <h3>Right here in Hayes.</h3>
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
