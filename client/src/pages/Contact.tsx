import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Bus,
  Car,
  Clock3,
  Footprints,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  ParkingCircle,
  Phone,
  Train,
} from "lucide-react";
import { business } from "@shared/catalog";
import { trpc } from "@/lib/trpc";
import { formError } from "@/lib/formErrors";
import {
  isStaticCloudflareDeployment,
  submitStaticInquiry,
} from "@/lib/staticInquiry";
import { PageIntro, SectionHead } from "@/components/Site";
import { RequestConfirmation } from "./Request";

export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Quote request",
    message: "",
    consent: false,
  });
  const [requestKey] = useState(() => crypto.randomUUID());
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [, navigate] = useLocation();
  const mutation = trpc.inquiries.create.useMutation({
    onSuccess: data => {
      setReference(data.reference);
      navigate(
        `/thank-you?type=contact&reference=${encodeURIComponent(data.reference)}`
      );
    },
  });
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (mutation.isPending) return;
    if (isStaticCloudflareDeployment()) {
      try {
        const emailReference = await submitStaticInquiry({
          kind: "contact",
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          subject: fields.subject,
          message: fields.message,
        });
        setReference(emailReference);
        navigate(
          `/thank-you?type=contact&reference=${encodeURIComponent(emailReference)}`
        );
      } catch (err) {
        setError(formError(err));
      }
      return;
    }
    try {
      await mutation.mutateAsync({ ...fields, consent: true, requestKey });
    } catch (err) {
      setError(formError(err));
    }
  }
  function update(key: keyof typeof fields, value: string | boolean) {
    setFields(old => ({ ...old, [key]: value }));
    setError("");
  }
  return (
    <>
      <PageIntro
        eyebrow="QUOTE & REPAIR ENQUIRIES"
        title={
          <>
            Car help.
            <br />
            <span className="orange-text">Right here in Hayes.</span>
          </>
        }
        description="Use this form for a quote or to ask whether we can fix your car. For emergencies, sudden faults or urgent repair questions, contact The Auto Surgeon through WhatsApp."
      >
        <div className="intro-buttons">
          <a href="/whatspp" className="btn btn-primary">
            <MessageCircle size={16} /> Contact us on WhatsApp
          </a>
          <Link href="/services#emergency" className="btn btn-ghost">
            See emergency repair information <ArrowRight size={16} />
          </Link>
        </div>
      </PageIntro>
      <section className="section section-alt">
        <div className="container contact-layout">
          <div className="contact-panel">
            <SectionHead
              eyebrow="VISIT THE WORKSHOP"
              title="Easy to find. Easy to contact."
              description="Use the map for directions, call for urgent vehicle problems or send the workshop a message beside it."
            />
            <div className="contact-row">
              <span className="icon-box">
                <MapPin size={21} />
              </span>
              <div>
                <h3>The address</h3>
                <p>
                  Unit 3 Squirrels Trading Estate
                  <br />
                  Viveash Close, Hayes UB3 4RZ
                </p>
              </div>
            </div>
            <div className="contact-row">
              <span className="icon-box">
                <Phone size={21} />
              </span>
              <div>
                <h3>Call the workshop</h3>
                <a href={business.tel}>{business.phone}</a>
                <p className="small">
                  For emergencies and sudden faults, use WhatsApp rather than
                  waiting for a form reply.
                </p>
              </div>
            </div>
            <div className="contact-row">
              <span className="icon-box">
                <Mail size={21} />
              </span>
              <div>
                <h3>Email us</h3>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
            </div>
            <div className="contact-row">
              <span className="icon-box">
                <Clock3 size={21} />
              </span>
              <div>
                <h3>Opening hours</h3>
                <p>
                  Monday–Saturday · 9:00 AM–6:00 PM
                  <br />
                  Sunday by appointment—please call.
                </p>
              </div>
            </div>
            <div className="map-frame-wrap">
              <iframe
                className="contact-map"
                title="The Auto Surgeon car repair workshop in Hayes UB3 4RZ"
                src="https://maps.google.com/maps?q=The%20Auto%20Surgeon%20Unit%203%20Squirrels%20Trading%20Estate%20Viveash%20Close%20Hayes%20UB3%204RZ&t=m&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ marginTop: "16px", marginBottom: "32px" }}>
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary full-width"
              >
                <Navigation size={17} /> Open Directions in Google Maps
              </a>
            </div>

            <div className="article-section" style={{ marginTop: "36px" }}>
              <div className="eyebrow">HOW TO REACH US</div>
              <h2>Getting to the Workshop</h2>
              <div className="symptom-grid" style={{ gridTemplateColumns: "1fr", gap: "14px", marginTop: "18px" }}>
                <div>
                  <Train size={20} />
                  <div>
                    <strong style={{ color: "#111", display: "block", marginBottom: "3px" }}>By Train (Elizabeth Line / National Rail)</strong>
                    <span>Hayes & Harlington Station is approximately 0.6 miles (12–15 minute walk or short bus ride) from our workshop. Exit onto Station Road and head north toward Clayton Road.</span>
                  </div>
                </div>

                <div>
                  <Bus size={20} />
                  <div>
                    <strong style={{ color: "#111", display: "block", marginBottom: "3px" }}>By Bus</strong>
                    <span>Local routes 195, 278, 350, U4 and H98 stop along Station Road, Clayton Road and Dawley Road, all within short walking distance of Viveash Close.</span>
                  </div>
                </div>

                <div>
                  <Car size={20} />
                  <div>
                    <strong style={{ color: "#111", display: "block", marginBottom: "3px" }}>By Car</strong>
                    <span>Easily accessible from the A4020 (Uxbridge Road) or A312 (The Parkway). Turn onto Nestles Avenue or Clayton Road, then onto Viveash Close. Drive into Squirrels Trading Estate to Unit 3.</span>
                  </div>
                </div>

                <div>
                  <Footprints size={20} />
                  <div>
                    <strong style={{ color: "#111", display: "block", marginBottom: "3px" }}>Walking Directions</strong>
                    <span>From Hayes Town Centre or Hayes & Harlington Station, head north along Station Road, turn right onto Clayton Road, then left onto Viveash Close. Squirrels Trading Estate is at the end of the road.</span>
                  </div>
                </div>

                <div>
                  <ParkingCircle size={20} />
                  <div>
                    <strong style={{ color: "#111", display: "block", marginBottom: "3px" }}>Customer Parking</strong>
                    <span>Dedicated customer parking spaces are available directly outside Unit 3 in front of our workshop bays within Squirrels Trading Estate.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form-panel">
            {reference ? (
              <RequestConfirmation reference={reference} kind="contact" />
            ) : (
              <form className="form-card" onSubmit={submit}>
                <div className="eyebrow">SEND A MESSAGE</div>
                <h2>Tell us what your car needs.</h2>
                <p className="form-lead">
                  This form is for quote requests and questions about whether we
                  can fix your car. For emergencies, use WhatsApp. Fields marked
                  * are required.
                </p>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="contact-name">
                      Your name <span>*</span>
                    </label>
                    <input
                      id="contact-name"
                      value={fields.name}
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      onChange={e => update("name", e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email">
                      Email <span>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={fields.email}
                      required
                      maxLength={320}
                      autoComplete="email"
                      onChange={e => update("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-phone">Phone</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      maxLength={30}
                      value={fields.phone}
                      autoComplete="tel"
                      onChange={e => update("phone", e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-subject">
                      Subject <span>*</span>
                    </label>
                    <select
                      id="contact-subject"
                      value={fields.subject}
                      onChange={e => update("subject", e.target.value)}
                    >
                      {[
                        "Quote request",
                        "Can you fix my car?",
                        "Service question",
                        "Tyre availability",
                        "Existing appointment",
                      ].map(item => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field wide">
                    <label htmlFor="contact-message">
                      Your message <span>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={fields.message}
                      required
                      minLength={10}
                      maxLength={3000}
                      onChange={e => update("message", e.target.value)}
                      placeholder="Tell us what happened, what warning light appeared or what work you need…"
                    />
                  </div>
                </div>
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    required
                    checked={fields.consent}
                    onChange={e => update("consent", e.target.checked)}
                  />
                  <span>
                    I agree to the use of these details to handle my message, as
                    described in the <Link href="/privacy">privacy notice</Link>
                    .
                  </span>
                </label>
                {error && (
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-actions">
                  <p>We’ll email you a confirmation after sending.</p>
                  <button
                    className="btn btn-primary"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 size={16} className="spinner" /> Saving
                        message…
                      </>
                    ) : (
                      <>
                        Send your message <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
