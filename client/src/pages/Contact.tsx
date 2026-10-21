import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock3, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@shared/catalog";
import { trpc } from "@/lib/trpc";
import { formError } from "@/lib/formErrors";
import { PageIntro, SectionHead } from "@/components/Site";
import { RequestConfirmation } from "./Request";

export default function Contact() {
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
        eyebrow="CONTACT & EMERGENCY REPAIRS"
        title={
          <>
            Car help.
            <br />
            <span className="orange-text">Right here in Hayes.</span>
          </>
        }
        description="Call The Auto Surgeon for emergency car repair advice in Hayes, UB3. We’ll aim to get urgent repair enquiries moving as quickly as possible, subject to safety, parts and workshop capacity."
      >
        <div className="intro-buttons">
          <a href={business.tel} className="btn btn-primary">
            <Phone size={16} /> Call {business.phone}
          </a>
          <Link href="/services#emergency" className="btn btn-ghost">
            Emergency repair information <ArrowRight size={16} />
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
                  For emergencies, call rather than waiting for a form reply.
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
                title="The Auto Surgeon car repair workshop in Hayes"
                src="https://maps.google.com/maps?q=Unit%203%20Squirrels%20Trading%20Estate%20Viveash%20Close%20Hayes%20UB3%204RZ&t=m&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={business.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Open directions in Google Maps <ArrowRight size={16} />
            </a>
          </div>
          <div className="contact-form-panel">
            {reference ? (
              <RequestConfirmation reference={reference} kind="contact" />
            ) : (
              <form className="form-card" onSubmit={submit}>
                <div className="eyebrow">SEND A MESSAGE</div>
                <h2>Tell us what your car needs.</h2>
                <p className="form-lead">
                  For urgent or unsafe vehicle problems, call first. Fields
                  marked * are required.
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
                        "General inquiry",
                        "Emergency repair help",
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
                  <p>Your message is saved for the workshop.</p>
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
