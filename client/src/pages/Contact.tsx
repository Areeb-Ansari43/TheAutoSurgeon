import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock3, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@shared/catalog";
import { trpc } from "@/lib/trpc";
import { formError } from "@/lib/formErrors";
import { PageIntro, SectionHead } from "@/components/Site";
import { RequestConfirmation } from "./Request";

export default function Contact() {
  const [map, setMap] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General inquiry",
    message: "",
    consent: false,
  });
  const [requestKey] = useState(() => crypto.randomUUID());
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const mutation = trpc.inquiries.create.useMutation({
    onSuccess: data => setReference(data.reference),
  });
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (mutation.isPending) return;
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
        eyebrow="VISIT THE WORKSHOP"
        title={
          <>
            Local expertise.
            <br />
            <span className="orange-text">Right here in Hayes.</span>
          </>
        }
        description="Call for advice, request an inspection or drop into the workshop. Walk-ins are welcome; calling ahead helps us check capacity and parts availability."
      />
      <section className="section section-alt">
        <div className="container contact-layout">
          <div>
            <SectionHead
              eyebrow="LET’S TALK CARS"
              title="Easy to find. Easier to talk to."
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
            <div className="intro-buttons">
              <Link href="/book" className="btn btn-primary">
                Request an inspection
                <ArrowRight size={16} />
              </Link>
              <a href={business.tel} className="btn btn-ghost">
                <Phone size={16} />
                Call now
              </a>
            </div>
          </div>
          <div>
            {map ? (
              <iframe
                className="contact-map"
                title="The Auto Surgeon workshop location"
                src="https://maps.google.com/maps?q=Unit%203%20Squirrels%20Trading%20Estate%20Viveash%20Close%20Hayes%20UB3%204RZ&t=m&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="map-consent">
                <MapPin size={37} strokeWidth={1.3} />
                <div className="eyebrow">HAYES / UB3 4RZ</div>
                <h3>Find your way to the workshop.</h3>
                <p>
                  Load the interactive Google map, or open directions in a
                  separate tab. Loading the map shares connection details with
                  Google.
                </p>
                <button onClick={() => setMap(true)} className="btn btn-ghost">
                  Load workshop map
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="contact-map-links">
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Open Google Maps
                <ArrowRight size={16} />
              </a>
              {map && (
                <button
                  className="text-link"
                  style={{ background: "none", border: 0 }}
                  onClick={() => setMap(false)}
                >
                  Hide map
                </button>
              )}
            </div>
            <div className="info-note">
              <MapPin size={20} />
              <p>
                Enter via Viveash Close and look for Unit 3 at Squirrels Trading
                Estate. Free on-site parking is listed in our original workshop
                information. Call if you need help finding us.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="SEND AN INQUIRY"
            title="A question? We’re all ears."
            description="For urgent vehicle safety concerns, please call instead of using this form."
          />
          {reference ? (
            <RequestConfirmation reference={reference} kind="contact" />
          ) : (
            <div className="form-layout">
              <form className="form-card" onSubmit={submit}>
                <h2>Message the workshop.</h2>
                <p className="form-lead">Fields marked * are required.</p>
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
                    <label htmlFor="contact-phone">Phone (optional)</label>
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
                        "General inquiry",
                        "Existing appointment",
                        "Service question",
                        "Tyre availability",
                        "MOT inquiry",
                        "Feedback",
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
                      placeholder="Tell us how we can help…"
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
                  <p>Your message is saved for the workshop.</p>
                  <button
                    className="btn btn-primary"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 size={16} className="spinner" />
                        Saving message…
                      </>
                    ) : (
                      <>
                        Send your message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <aside className="booking-summary">
                <div className="eyebrow">NEED SOMETHING SPECIFIC?</div>
                <h2>
                  The right route
                  <br />
                  for your request.
                </h2>
                <p className="small">
                  For an accurate service quote, include your vehicle details
                  using our dedicated quote form. To request a visit, choose
                  your preferred timing on the booking page.
                </p>
                <Link href="/quote" className="btn btn-ghost full-width">
                  Request a quote
                  <ArrowRight size={16} />
                </Link>
                <Link href="/book" className="btn btn-primary full-width">
                  Request a visit
                  <ArrowRight size={16} />
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
