import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  CircleDot,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { services, labourPrices, business } from "@shared/catalog";
import {
  CTA,
  FAQs,
  PageIntro,
  SectionHead,
  ServiceCard,
} from "@/components/Site";

export function ServicesHub() {
  return (
    <>
      <PageIntro
        eyebrow="OUR SERVICES"
        title={
          <>
            Expert care.
            <br />
            <span className="orange-text">Every part of your journey.</span>
          </>
        }
        description="From a slow puncture to a dashboard warning light, find the right service for your vehicle. We inspect first, explain the options and agree a quote before work begins."
      />
      <section className="section section-alt">
        <div className="container">
          <div id="services" className="service-grid">
            {services.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.slug} />
            ))}
          </div>
          <div className="service-help">
            <ShieldCheck size={25} />
            <div>
              <h3>Not sure which service you need?</h3>
              <p>Describe the symptom. We’ll help you choose the next step.</p>
            </div>
            <Link href="/quote?service=Other" className="text-link">
              Ask the workshop
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section id="tyres" className="section">
        <div className="container">
          <SectionHead
            eyebrow="TYRES & PUNCTURES"
            title="The right tyre, fitted properly."
            description="From emergency pressure loss to planned replacements, we check the specification, condition and fit before you leave."
            link="/tyres"
            label="See tyre options"
          />
          <div className="tyre-options compact-tyres">
            {tiers.map(tier => (
              <Link
                href={`/quote?service=Tyre%20Fitting&notes=${encodeURIComponent(tier.name + " tyre options")}`}
                className="tyre-option"
                key={tier.name}
              >
                <span className="eyebrow">{tier.tag}</span>
                <h3>{tier.name}</h3>
                <p>{tier.text}</p>
                <span className="text-link">
                  Request options <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="section section-alt">
        <div className="container pricing-layout">
          <div>
            <SectionHead
              eyebrow="CLEAR PRICING"
              title="Honest labour prices."
              description="One services page, one place to compare the work we offer and the starting labour price. Parts are confirmed separately unless noted."
              link="/pricing"
              label="Open full price list"
            />
            <div className="pricing-table compact-pricing">
              {labourPrices.map(item => (
                <Link
                  href={`/quote?service=${encodeURIComponent(item.service)}`}
                  className="pricing-row"
                  key={item.name}
                  aria-label={`Request a quote for ${item.name}`}
                >
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.note}</p>
                  </div>
                  <span
                    className={
                      item.price === null ? "inspection-price" : "listed-price"
                    }
                  >
                    {item.price === null
                      ? "Price on inspection"
                      : `£${item.price}`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <aside id="emergency" className="booking-summary emergency-summary">
            <div className="eyebrow">URGENT CAR REPAIRS IN HAYES</div>
            <h2>Need your car fixed quickly?</h2>
            <p>
              If your car has a puncture, warning light, braking concern or
              sudden fault, call us first. We’ll aim to assess urgent repair
              enquiries as quickly as possible, subject to safety, parts and
              workshop capacity.
            </p>
            <a href={business.tel} className="btn btn-primary full-width">
              Call {business.phone} <ArrowRight size={16} />
            </a>
            <Link href="/contact" className="btn btn-ghost full-width">
              Send an urgent message
            </Link>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function ServiceDetail({ slug }: { slug: string }) {
  const service = services.find(item => item.slug === slug);
  if (!service) return <NotFound />;
  const book = `/book?service=${encodeURIComponent(service.bookingName)}`;
  return (
    <>
      <PageIntro
        eyebrow="SPECIALIST SERVICES"
        title={service.name}
        description={service.short}
      >
        <div className="intro-buttons">
          <Link href={book} className="btn btn-primary">
            Request an appointment
            <ArrowRight size={17} />
          </Link>
          <Link
            href={`/quote?service=${encodeURIComponent(service.bookingName)}`}
            className="btn btn-ghost"
          >
            Get a written quote
          </Link>
        </div>
      </PageIntro>
      <section className="section section-alt">
        <div className="container detail-layout">
          <div>
            <img
              className="detail-photo"
              src={`/assets/photos/${service.image}.webp`}
              alt={service.name}
            />
            <div className="article-section">
              <div className="eyebrow">WHAT TO EXPECT</div>
              <h2>Get the right work. Not more work.</h2>
              <p>{service.intro}</p>
            </div>
            <div className="article-section">
              <h2>Signs it’s time to get checked.</h2>
              <div className="symptom-grid">
                {service.symptoms.map(item => (
                  <div key={item}>
                    <CircleDot size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="article-section">
              <h2>Our approach.</h2>
              {service.process.map((item, index) => (
                <div className="detail-step" key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="detail-sidebar">
            <div className="booking-summary">
              <div className="eyebrow">THE DETAILS</div>
              <h2>{service.name}</h2>
              <span className="price-caption">{service.priceLabel}</span>
              <div className="detail-price">£{service.price}</div>
              <p className="small muted">
                Labour only unless noted. Parts and any additional work are
                quoted separately.
              </p>
              <div className="timing">
                <Clock3 size={17} />
                <span>{service.timing}</span>
              </div>
              <h3>Included in the agreed work</h3>
              <ul className="check-list">
                {service.includes.map(item => (
                  <li key={item}>
                    <Check size={15} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={book} className="btn btn-primary full-width">
                Request a visit
                <ArrowRight size={16} />
              </Link>
              <p className="small muted">
                Preferred dates and times are subject to workshop confirmation.
              </p>
            </div>
            <div className="info-note">
              <ShieldCheck size={20} />
              <p>
                If your vehicle feels unsafe, stop safely and call for advice.
                An online request is not an emergency service.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="CLEAR ANSWERS" title="A little more detail." />
          <FAQs items={service.faqs} />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="ALSO AT THE WORKSHOP"
            title="Other ways we can help."
            link="/services"
          />
          <div className="service-grid">
            {services
              .filter(item => item.slug !== slug)
              .slice(0, 3)
              .map((item, index) => (
                <ServiceCard
                  key={item.slug}
                  service={item}
                  index={services.indexOf(item)}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

const tiers = [
  {
    name: "Budget",
    tag: "EVERYDAY ESSENTIALS",
    text: "A practical option for everyday driving. We’ll check the right fit, load rating and speed rating for your car.",
    bars: 1,
  },
  {
    name: "Mid-range",
    tag: "A BALANCED CHOICE",
    text: "A balance of price and performance for commuting, family journeys and regular motorway miles.",
    bars: 2,
  },
  {
    name: "Premium",
    tag: "REFINED PERFORMANCE",
    text: "Premium branded options when wet grip, comfort, noise and tyre longevity matter to your choice.",
    bars: 3,
  },
  {
    name: "Performance",
    tag: "FOR THE DRIVING ENTHUSIAST",
    text: "Vehicle-appropriate performance tyres. Choose the correct specification for your wheels and driving conditions.",
    bars: 4,
  },
  {
    name: "Run-flat",
    tag: "VEHICLE-SPECIFIC SUPPORT",
    text: "Suitable for vehicles designed to use run-flat tyres. Driving limits after a puncture vary—follow your handbook.",
    bars: 3,
  },
];
export function Tyres() {
  return (
    <>
      <PageIntro
        eyebrow="TYRES, FITTED RIGHT"
        title={
          <>
            Every tyre.
            <br />
            <span className="orange-text">Every budget.</span>
          </>
        }
        description="The right tyre is about more than a brand name. We help match your tyre specification to your vehicle, your journeys and your budget."
      />
      <section className="section section-alt">
        <div className="container">
          <div className="tyre-feature">
            <div>
              <div className="eyebrow">FITTED & BALANCED IN-HOUSE</div>
              <h2 className="section-heading">
                Road-ready starts
                <br />
                from the ground up.
              </h2>
              <p>
                Tell us the size on your tyre sidewall, your vehicle
                registration and what you need. We’ll confirm suitable options,
                stock and your fitted quote before you travel.
              </p>
              <Link
                href="/quote?service=Tyre%20Fitting"
                className="btn btn-primary"
              >
                Ask for tyre options
                <ArrowRight size={17} />
              </Link>
            </div>
            <img
              src="/assets/photos/tyre-tread-side.webp"
              alt="Close-up of tyre tread and sidewall"
            />
          </div>
          <div className="tyre-options">
            {tiers.map(tier => (
              <Link
                href={`/quote?service=Tyre%20Fitting&notes=${encodeURIComponent(tier.name + " tyre options")}`}
                className="tyre-option"
                key={tier.name}
              >
                <div className="tyre-tier-top">
                  <CircleDot size={36} strokeWidth={1.3} />
                  <div className="tier-bars">
                    {[1, 2, 3, 4].map(bar => (
                      <i key={bar} className={bar <= tier.bars ? "on" : ""} />
                    ))}
                  </div>
                </div>
                <span className="eyebrow">{tier.tag}</span>
                <h3>{tier.name}</h3>
                <p>{tier.text}</p>
                <span className="text-link">
                  Request options
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
          <div className="service-help">
            <ShieldCheck size={25} />
            <div>
              <h3>Slow puncture? Uneven wear?</h3>
              <p>
                We inspect for damage and repair suitability. Puncture repairs
                start at £10.
              </p>
            </div>
            <Link href="/services/tyre-fitting" className="text-link">
              Tyre fitting & repairs
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="A LITTLE KNOW-HOW"
            title="Look after the contact patch."
            link="/guides/tyre-safety-checks"
            label="Read our tyre-care guide"
          />
          <FAQs
            items={[
              {
                question: "Where can I find my tyre size?",
                answer:
                  "Look on the sidewall for a format such as 205/55 R16. Include the load and speed rating if you can, or send your registration and ask us to check before ordering.",
              },
              {
                question: "Can you check availability online?",
                answer:
                  "Use the quote form to tell us your tyre size and preferred budget. This website does not display live stock, so we confirm availability directly.",
              },
              {
                question: "Do I need alignment with new tyres?",
                answer:
                  "Uneven wear, pulling or an off-centre steering wheel can indicate an alignment issue. We can inspect and advise whether a geometry check is appropriate.",
              },
            ]}
          />
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Pricing() {
  return (
    <>
      <PageIntro
        eyebrow="NO GUESSWORK"
        title={
          <>
            Honest labour.
            <br />
            <span className="orange-text">Honest prices.</span>
          </>
        }
        description="Clear starting prices from our workshop price list. Parts are quoted separately unless stated. For anything vehicle-specific, we inspect before we quote."
      />
      <section className="section section-alt">
        <div className="container pricing-layout">
          <div className="pricing-table">
            <div className="pricing-header">
              <span>SERVICE / WORK</span>
              <span>LABOUR PRICE</span>
            </div>
            {labourPrices.map(item => (
              <div className="pricing-row" key={item.name}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <div className="price-actions">
                  <span
                    className={
                      item.price === null ? "inspection-price" : "listed-price"
                    }
                  >
                    {item.price === null
                      ? "Price on inspection"
                      : `£${item.price}`}
                  </span>
                  <Link
                    href={`/quote?service=${encodeURIComponent(item.service)}`}
                    aria-label={`Request quote for ${item.name}`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
            <div className="pricing-foot">
              <ShieldCheck size={17} />
              <p>
                Labour only, except TPMS sensor change which includes the part.
                Final scope and full price confirmed before work.
              </p>
            </div>
          </div>
          <aside>
            <div className="booking-summary">
              <div className="eyebrow">KNOW BEFORE YOU GO</div>
              <h2>
                A quote.
                <br />
                Not a surprise.
              </h2>
              <p>
                Send your registration and the work you need. We’ll confirm
                parts, labour and any inspection needed for a meaningful quote.
              </p>
              <Link href="/quote" className="btn btn-primary full-width">
                Request written quote
                <ArrowRight size={16} />
              </Link>
              <Link href="/book" className="btn btn-ghost full-width">
                Book an inspection
              </Link>
              <p className="small muted">
                No online payment. Work proceeds only after you approve the
                quote.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function NotFound() {
  return (
    <section className="not-found container">
      <span className="error-code">404</span>
      <div className="eyebrow">THIS ROAD DOESN’T GO ANYWHERE</div>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>The page you’re looking for doesn’t exist or may have moved.</p>
      <div className="intro-buttons">
        <Link href="/" className="btn btn-primary">
          Back to the homepage
          <ArrowRight size={16} />
        </Link>
        <Link href="/services" className="btn btn-ghost">
          Find a service
        </Link>
      </div>
    </section>
  );
}
