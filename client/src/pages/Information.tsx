import { Link } from "wouter";
import { guides, type Guide } from "@shared/guides";
import { services as catalogServices } from "@shared/catalog";

type InformationProps = {
  page: string;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

const address = "Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ";

function PageIntro({ eyebrow, title, lead }: PageIntroProps) {
  return (
    <header className="page-intro">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-lead">{lead}</p>
      </div>
    </header>
  );
}

function BookingBanner({
  title = "Need to discuss your vehicle?",
}: {
  title?: string;
}) {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="cta-banner">
          <div>
            <p className="eyebrow">Talk to the workshop</p>
            <h2 className="section-heading">{title}</h2>
            <p>
              Send a booking request with your vehicle details and the work you
              need. A request is not a confirmed appointment; the workshop will
              confirm availability with you.
            </p>
          </div>
          <div>
            <Link href="/book" className="btn btn-primary">
              Request a booking
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About The Auto Surgeon"
        title="Quality car care, based in Hayes."
        lead="The Auto Surgeon is a Hayes workshop delivering careful, high-quality car care, repairs and vehicle advice for drivers who want a clear answer and a proper fix."
      />

      <section className="section">
        <div className="container split-section">
          <div className="content-copy">
            <p className="eyebrow">How we approach a job</p>
            <h2 className="section-heading">
              A year of doing car care properly
            </h2>
            <p>
              Based in Hayes, we have spent the last year building The Auto
              Surgeon around one simple promise: do the best quality work we
              can, explain what the vehicle needs and never make a driver feel
              rushed into work they do not understand.
            </p>
            <p>
              Whether it is tyre wear, braking, a warning light, steering that
              no longer feels right or an emergency repair, we start with the
              vehicle in front of us. We inspect the relevant system, explain
              the finding and work towards getting you safely back on the road
              as quickly as possible.
            </p>
            <p>
              We work across everyday cars and specialist models, including
              Tesla, Mercedes-Benz and Toyota. Our team is comfortable with
              Tesla wheel alignment and tyre-related checks, Mercedes and Toyota
              diagnostic symptoms, and the careful inspection needed before
              deciding whether a vehicle needs parts, adjustment or further
              specialist support.
            </p>
            <Link href="/workshop" className="text-link">
              Explore workshop services
            </Link>
          </div>
          <img
            className="wide-photo"
            src="/assets/photos/hero-orange-caliper.webp"
            alt="Close-up of an orange brake caliper and wheel"
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we can help with</p>
              <h2 className="section-heading">
                Focused, useful workshop services
              </h2>
            </div>
            <p className="muted">
              Advice and inspection are part of choosing the right next step.
            </p>
          </div>
          <div className="feature-grid">
            <article className="info-card">
              <div className="icon-box">01</div>
              <h3>Tyres & punctures</h3>
              <p>
                Checks, tyre fitting and puncture-related enquiries when a tyre
                has lost pressure or sustained damage.
              </p>
            </article>
            <article className="info-card">
              <div className="icon-box">02</div>
              <h3>Wheel alignment</h3>
              <p>
                Measured alignment work when tyre wear, a kerb impact or
                steering behaviour suggests the geometry needs checking.
              </p>
            </article>
            <article className="info-card">
              <div className="icon-box">03</div>
              <h3>Brakes, oil & diagnostics</h3>
              <p>
                Routine brake and engine-oil work alongside diagnostic checks
                for warning lights and driveability concerns.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <img
            className="wide-photo"
            src="/assets/photos/diagnostics-tablet.webp"
            alt="Vehicle diagnostic equipment in use"
          />
          <div className="content-copy">
            <p className="eyebrow">A local workshop</p>
            <h2 className="section-heading">Visit us in Hayes</h2>
            <p>{address}</p>
            <p>
              Monday–Saturday, 9:00–18:00. Sunday visits are by appointment;
              please contact the workshop to discuss Sunday availability rather
              than making an online booking request.
            </p>
            <p>
              Call <a href="tel:07767909397">07767 909397</a> or email{" "}
              <a href="mailto:hello@theautosurgeon.co.uk">
                hello@theautosurgeon.co.uk
              </a>{" "}
              with the vehicle registration, the issue you have noticed and a
              convenient time to talk.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">WHY LOCAL DRIVERS TRUST US</p>
              <h2 className="section-heading">Clear work. Useful answers.</h2>
            </div>
            <p className="muted">
              A proper repair conversation starts before the tools come out.
            </p>
          </div>
          <div className="feature-grid expertise-grid">
            <article className="info-card">
              <div className="icon-box">01</div>
              <h3>We diagnose before replacing</h3>
              <p>
                Warning lights and symptoms are clues, not automatic parts
                lists. We record what the car is doing, inspect the relevant
                system and explain what the next check is for.
              </p>
            </article>
            <article className="info-card">
              <div className="icon-box">02</div>
              <h3>EV and premium-car aware</h3>
              <p>
                We understand that Tesla, Mercedes and Toyota vehicles can have
                different tyre, sensor, service and warning-light requirements.
                Vehicle-specific information is checked before work is agreed.
              </p>
            </article>
            <article className="info-card">
              <div className="icon-box">03</div>
              <h3>Work you can understand</h3>
              <p>
                We explain what was found, what is urgent and what can wait. If
                a job is outside the safe scope of a routine inspection, we say
                so rather than guessing.
              </p>
            </article>
          </div>
        </div>
      </section>

      <BookingBanner title="Tell us what your vehicle is doing" />
    </>
  );
}

const services = [
  {
    number: "01",
    title: "Tyre fitting & puncture repairs",
    text: "For worn, damaged or deflating tyres. A repair can only be confirmed after the tyre has been inspected; some damage requires replacement.",
    price: "Puncture repair: £10",
  },
  {
    number: "02",
    title: "Wheel alignment",
    text: "A measured check and adjustment for steering concerns, tyre-wear patterns or after an impact. Tesla alignment is offered as a separate service.",
    price: "Wheel alignment: £50",
  },
  {
    number: "03",
    title: "Brakes",
    text: "Brake pad and disc-and-pad labour for the relevant axle, after the vehicle's braking components have been assessed.",
    price: "Pads: £30 · Discs & pads per axle: £50",
  },
  {
    number: "04",
    title: "Engine oil",
    text: "Engine-oil work for routine maintenance enquiries. Confirm the vehicle, oil requirement and scope with the workshop before work is booked.",
    price: "Oil change: £30 · Full oil service: £50",
  },
  {
    number: "05",
    title: "Vehicle diagnostics",
    text: "A practical starting point for warning lights, running concerns and stored fault information. Findings guide the next check rather than automatically identifying a part to replace.",
    price: "Ask for an assessment",
  },
  {
    number: "06",
    title: "Tesla wheel alignment",
    text: "Wheel-alignment work for Tesla vehicles. This is alignment work only, not Tesla battery servicing or repair.",
    price: "Tesla alignment: £60",
  },
];

function WorkshopPage() {
  return (
    <>
      <PageIntro
        eyebrow="Workshop services"
        title="The checks behind the fix"
        lead="From tyres and brakes to diagnostics and Tesla wheel alignment, each service starts with the vehicle symptoms and the work that is actually needed."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we offer</p>
              <h2 className="section-heading">Six workshop services</h2>
            </div>
            <p className="muted">
              Listed prices are labour only unless the price specifically says
              otherwise.
            </p>
          </div>
          <div className="feature-grid">
            {services.map(service => (
              <article className="info-card" key={service.title}>
                <div className="icon-box">{service.number}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <p className="badge">{service.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-section">
          <div className="content-copy">
            <p className="eyebrow">Pricing notes</p>
            <h2 className="section-heading">Make the scope clear first</h2>
            <p>
              Labour prices shown above do not include parts, fluids, tyres or
              any additional work unless stated. The TPMS service is £60
              including the part. If inspection identifies further work, ask the
              workshop to explain the finding and cost before deciding how to
              proceed.
            </p>
            <p>
              Tyre requirements and oil specifications vary by vehicle. Share
              the registration and the concern you have noticed so the workshop
              can discuss the right service and any parts required.
            </p>
          </div>
          <img
            className="wide-photo"
            src="/assets/photos/engine-oil-pour-wide.webp"
            alt="Engine oil being poured during routine maintenance"
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Before you visit</p>
              <h2 className="section-heading">A simple, useful handover</h2>
            </div>
          </div>
          <div className="process-grid">
            <article className="process-card">
              <span className="step-number">1</span>
              <h3>Describe the change</h3>
              <p>
                Include warning lights, noises, pulling, vibration, pressure
                loss or when the problem occurs.
              </p>
            </article>
            <article className="process-card">
              <span className="step-number">2</span>
              <h3>Share the vehicle details</h3>
              <p>
                The registration and make/model help start the conversation
                about the correct service.
              </p>
            </article>
            <article className="process-card">
              <span className="step-number">3</span>
              <h3>Agree the next step</h3>
              <p>
                A booking request becomes an appointment only once availability
                has been confirmed with you.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-section">
          <img
            className="wide-photo"
            src="/assets/photos/tesla-wheel.webp"
            alt="Tesla wheel prepared for alignment work"
          />
          <div className="content-copy">
            <p className="eyebrow">Tesla vehicles</p>
            <h2 className="section-heading">
              Alignment, not battery servicing
            </h2>
            <p>
              Tesla wheel alignment is available at £60 labour. This service
              concerns the wheels, steering geometry and tyre-wear-related
              alignment checks; it does not cover Tesla battery servicing,
              high-voltage repair or battery diagnosis.
            </p>
            <p>
              If you are unsure whether alignment is relevant, describe the tyre
              wear or steering concern in your request and ask what should be
              checked first.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container content-copy">
          <p className="eyebrow">MOT enquiries</p>
          <h2 className="section-heading">Ask us about your MOT needs</h2>
          <p>
            MOT-related enquiries are welcome. Please contact the business to
            discuss what you need; this page does not represent an online MOT
            booking or state that the workshop is an authorised MOT test centre.
          </p>
        </div>
      </section>

      <BookingBanner title="Request the service your vehicle needs" />
    </>
  );
}

const reviews = [
  {
    name: "Sandeep K",
    vehicle: "BMW 3 Series",
    subject: "Wheel alignment after a kerb hit",
    text: "Booked alignment after a kerb hit. Diagnosed, aligned and out the door in under an hour. Steering is back to dead-centre.",
  },
  {
    name: "Aisha M",
    vehicle: "Volkswagen Polo",
    subject: "Honest pricing",
    text: "Honest pricing — quoted £50 for front discs and pads and that’s what I paid. No surprises.",
  },
  {
    name: "Daniel R",
    vehicle: "Tesla Model 3",
    subject: "Tesla specifications",
    text: "One of the few places near Hayes that knows Tesla alignment specs. Properly done.",
  },
];

function ReviewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Customer feedback"
        title="Trusted in Hayes."
        lead="Real vehicle concerns. Straightforward workshop conversations. Customer stories shared on our original website."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Testimonials</p>
              <h2 className="section-heading">What customers highlighted</h2>
            </div>
            <p className="muted">
              These are existing website testimonials and have not been
              independently verified.
            </p>
          </div>
          <div className="review-grid">
            {reviews.map(review => (
              <article className="review-card" key={review.name}>
                <p className="stars" aria-label="Customer testimonial">
                  Customer testimonial
                </p>
                <blockquote>“{review.text}”</blockquote>
                <div className="review-author">
                  <strong>{review.name}</strong>
                  <p>{review.vehicle}</p>
                  <p className="muted">{review.subject}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-section">
          <img
            className="wide-photo"
            src="/assets/photos/wheel-alignment.webp"
            alt="Wheel alignment equipment at work"
          />
          <div className="content-copy">
            <p className="eyebrow">Every vehicle is different</p>
            <h2 className="section-heading">
              Useful feedback starts with a clear problem
            </h2>
            <p>
              A kerb impact, a warning light or a pricing question each call for
              a different conversation. When you contact the workshop, share the
              vehicle model and the specific change you have noticed so the next
              step can be discussed clearly.
            </p>
            <Link href="/faq" className="text-link">
              Read common workshop questions
            </Link>
          </div>
        </div>
      </section>

      <BookingBanner title="Have a vehicle concern to discuss?" />
    </>
  );
}

const faqs = [
  {
    question: "Does sending a booking request confirm my appointment?",
    answer:
      "No. A booking request gives the workshop the details needed to check availability. Your appointment is only confirmed when the workshop confirms it with you.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "The workshop is open Monday to Saturday, 9:00–18:00. Sunday is by appointment only. Do not make an online booking request for Sunday; contact the workshop first to discuss availability.",
  },
  {
    question: "Are the displayed prices inclusive of parts?",
    answer:
      "No, listed prices are labour only unless specifically stated otherwise. The TPMS service is £60 including the part. Tyres, fluids, vehicle-specific parts and additional work are not included in the labour prices shown.",
  },
  {
    question: "Can you help with a puncture or a tyre losing pressure?",
    answer:
      "Yes, contact the workshop for a tyre or puncture inspection. Whether a tyre can be repaired depends on the location and nature of the damage and the condition of the tyre. A bulge, exposed cords or serious damage needs professional assessment.",
  },
  {
    question: "Do you work on Tesla vehicles?",
    answer:
      "Tesla wheel alignment is offered at £60 labour. This is wheel-alignment work, not Tesla battery servicing, battery diagnosis or high-voltage repair.",
  },
  {
    question: "My dashboard light has come on. Should I keep driving?",
    answer:
      "Check the vehicle handbook for the specific symbol. If the warning is red, flashing, linked with overheating, low oil pressure, abnormal braking, smoke or a burning smell, stop safely and follow the handbook advice. For other warnings, contact the workshop to discuss diagnostics as soon as practical.",
  },
  {
    question: "Do you carry out MOTs?",
    answer:
      "MOT enquiries are welcome. Contact the business to discuss what you need. This website does not make an online MOT booking or state that the workshop is an authorised MOT test centre.",
  },
  {
    question: "What should I include when I contact the workshop?",
    answer:
      "Include your vehicle registration, make and model, the service you are interested in, when the problem began and any symptoms or dashboard messages you have noticed. Photos of obvious tyre damage can also be useful, but do not drive a vehicle you believe is unsafe simply to take a photo.",
  },
];

function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="Frequently asked questions"
        title="Answers before you request a booking"
        lead="Practical guidance on availability, prices, tyres, diagnostics, Tesla alignment and MOT-related enquiries."
      />
      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map(faq => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container content-copy">
          <p className="eyebrow">Still unsure?</p>
          <h2 className="section-heading">Ask about your specific vehicle</h2>
          <p>
            General guidance is not a substitute for inspecting your vehicle.
            Call <a href="tel:07767909397">07767 909397</a> or email{" "}
            <a href="mailto:hello@theautosurgeon.co.uk">
              hello@theautosurgeon.co.uk
            </a>{" "}
            with the vehicle details and symptoms.
          </p>
        </div>
      </section>
    </>
  );
}

function GuidesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vehicle care guides"
        title="Know what to look for"
        lead="Short, safety-minded guides to help you recognise common tyre, warning-light and alignment concerns before you contact the workshop."
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Workshop knowledge</p>
              <h2 className="section-heading">
                Practical checks, plainly explained
              </h2>
            </div>
            <p className="muted">
              Use these guides to prepare a useful question, not to diagnose a
              safety-critical problem yourself.
            </p>
          </div>
          <div className="guide-grid">
            {guides.map(guide => (
              <Link
                href={`/guides/${guide.slug}`}
                className="guide-card"
                key={guide.slug}
              >
                <img className="guide-image" src={guide.image} alt="" />
                <div className="guide-body">
                  <div className="guide-meta">
                    <span className="badge">{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3>{guide.title}</h3>
                  <p>{guide.summary}</p>
                  <span className="text-link">Read the guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BookingBanner title="Want a workshop check rather than general advice?" />
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy"
        title="How website request information is used"
        lead="A plain-language explanation of the contact, vehicle and account information provided through this website."
      />
      <section className="section">
        <div className="container article-content">
          <section className="article-section">
            <h2>Information you provide</h2>
            <p>
              When you contact The Auto Surgeon or submit a booking request, the
              information you provide may include your name, phone number, email
              address, vehicle registration, make and model, the service
              requested and a description of the issue. Signing in through Manus
              creates a customer account. Your profile stores your contact and
              vehicle details, and requests submitted while signed in are linked
              to that account.
            </p>
          </section>
          <section className="article-section">
            <h2>Why it is used</h2>
            <p>
              This information is used to respond to your enquiry, discuss the
              vehicle concern, consider a booking request, manage any account
              features available to you and communicate about a request you have
              made. Sending a request does not create a confirmed appointment.
            </p>
          </section>
          <section className="article-section">
            <h2>Keeping your request clear</h2>
            <p>
              Please provide only the information needed to discuss the vehicle
              and request. Do not include payment-card information in a
              free-text enquiry. The website does not send automatic email
              notifications simply because a request is submitted.
            </p>
          </section>
          <section className="article-section">
            <h2>Cookies, local storage and maps</h2>
            <p>
              Secure session cookies keep you signed in, and a short-lived
              security cookie protects the sign-in process. Browser storage
              supports account and sign-in state. The site uses hosting-provided
              usage analytics. The contact page loads a Google map only when you
              choose to load it; opening Google Maps or using Manus sign-in is
              subject to those services’ own privacy notices.
            </p>
          </section>
          <section className="article-section">
            <h2>Your information requests</h2>
            <p>
              To ask about access to, correction of or deletion of information
              you have provided, contact the business at{" "}
              <a href="mailto:hello@theautosurgeon.co.uk">
                hello@theautosurgeon.co.uk
              </a>{" "}
              or call <a href="tel:07767909397">07767 909397</a>. Include enough
              detail for the business to locate the relevant enquiry or account.
            </p>
          </section>
          <section className="article-section">
            <h2>Questions about this page</h2>
            <p>
              For privacy questions or to discuss how your information relates
              to a specific workshop request, contact the business directly. You
              can ask the workshop about its current information-handling
              practices.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}

function InformationNotFound() {
  return (
    <>
      <PageIntro
        eyebrow="Information"
        title="Page not found"
        lead="The information page you requested is not available."
      />
      <section className="section">
        <div className="container content-copy">
          <p>
            Use the links below to return to the workshop information, practical
            guides or frequently asked questions.
          </p>
          <p>
            <Link href="/workshop" className="btn btn-primary">
              Workshop services
            </Link>
            <Link href="/guides" className="btn btn-ghost">
              Vehicle care guides
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export function GuideDetail({ slug }: { slug: string }) {
  const guide = guides.find(item => item.slug === slug);

  if (!guide) {
    return <InformationNotFound />;
  }

  const relatedGuides = guides.filter(item => item.slug !== guide.slug);

  return <GuideArticle guide={guide} relatedGuides={relatedGuides} />;
}

function GuideArticle({
  guide,
  relatedGuides,
}: {
  guide: Guide;
  relatedGuides: Guide[];
}) {
  const relatedService = catalogServices.find(
    service =>
      service.name.toLowerCase() === guide.relatedService.toLowerCase() ||
      service.bookingName.toLowerCase() === guide.relatedService.toLowerCase()
  );
  const relatedServiceHref = relatedService
    ? `/services/${relatedService.slug}`
    : "/services";
  const quoteHref = relatedService
    ? `/quote?service=${encodeURIComponent(relatedService.bookingName)}`
    : "/quote";
  return (
    <>
      <PageIntro
        eyebrow={guide.category}
        title={guide.title}
        lead={guide.summary}
      />
      <section className="section">
        <div className="container article-layout">
          <article className="article-content">
            <div className="guide-meta">
              <span className="badge">{guide.category}</span>
              <span>{guide.readTime}</span>
            </div>
            <img className="wide-photo" src={guide.image} alt="" />
            {guide.sections.map(section => (
              <section className="article-section" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
            <section className="article-section">
              <h2>Further reading</h2>
              <p>
                <a
                  href="https://www.nidirect.gov.uk/articles/maintaining-your-vehicle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official vehicle maintenance guidance
                </a>
                {guide.slug === "tyre-safety-checks" && (
                  <>
                    {" "}
                    ·{" "}
                    <a
                      href="https://www.tyresafe.org/the-checks/tread-depth/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TyreSafe tread-depth advice
                    </a>
                  </>
                )}
                {guide.slug.includes("tesla") && (
                  <>
                    {" "}
                    ·{" "}
                    <a
                      href="https://www.tesla.com/ownersmanual/model3/en_us/GUID-94F63B13-EA2C-45D9-83AB-5DCA6295D587.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tesla tyre-care manual
                    </a>
                  </>
                )}
                {guide.slug.includes("toyota") && (
                  <>
                    {" "}
                    ·{" "}
                    <a
                      href="https://www.toyota.co.uk/owners/vehicle-information/warning-signs-and-sensors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Toyota warning-sign guide
                    </a>
                  </>
                )}
                {guide.slug.includes("mercedes") && (
                  <>
                    {" "}
                    ·{" "}
                    <a
                      href="https://www.mercedes-benz.co.uk/passengercars/services/manuals.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mercedes owner manuals
                    </a>
                  </>
                )}
              </p>
            </section>
            <section className="article-section">
              <h2>When in doubt, arrange an inspection</h2>
              <p>
                These notes are general vehicle-care guidance. If a fault
                affects safe driving, a tyre is visibly damaged, braking feels
                abnormal or the vehicle is behaving unexpectedly, do not rely on
                this guide alone—contact a workshop or seek appropriate
                assistance.
              </p>
            </section>
          </article>

          <aside className="article-sidebar">
            <p className="eyebrow">Related service</p>
            <h2>{guide.relatedService}</h2>
            <p>
              Discuss the symptoms, vehicle details and the most useful next
              check with the workshop.
            </p>
            <Link href={relatedServiceHref} className="btn btn-primary">
              {relatedService
                ? `See ${relatedService.name}`
                : "View workshop services"}
            </Link>
            <Link href={quoteHref} className="btn btn-ghost">
              Request a quote
            </Link>
            <p className="eyebrow">More guides</p>
            {relatedGuides.map(relatedGuide => (
              <p key={relatedGuide.slug}>
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  className="text-link"
                >
                  {relatedGuide.title}
                </Link>
              </p>
            ))}
          </aside>
        </div>
      </section>
      <BookingBanner title="Need a vehicle-specific check?" />
    </>
  );
}

export default function Information({ page }: InformationProps) {
  switch (page) {
    case "about":
      return <AboutPage />;
    case "workshop":
      return <WorkshopPage />;
    case "reviews":
      return <ReviewsPage />;
    case "faq":
      return <FaqPage />;
    case "guides":
      return <GuidesPage />;
    case "privacy":
      return <PrivacyPage />;
    default:
      return <InformationNotFound />;
  }
}
