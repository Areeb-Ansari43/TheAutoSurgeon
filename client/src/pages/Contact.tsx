import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { WhatsAppQuick } from "@/components/WhatsAppQuick";
import { business } from "@shared/catalog";
import { trpc } from "@/lib/trpc";
import { formError } from "@/lib/formErrors";
import {
  isStaticCloudflareDeployment,
  submitStaticInquiry,
} from "@/lib/staticInquiry";
import { PageIntro, SectionHead } from "@/components/Site";
import { RequestConfirmation } from "./Request";

const subjects = [
  "Quote request",
  "Can you fix my car?",
  "Service question",
  "Tyre availability",
  "Existing appointment",
];

const steps = [
  "What can we help with?",
  "Tell us what’s happening.",
  "What’s your name?",
  "How can we reach you?",
  "Check and send.",
];

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

  // One question at a time.
  const [step, setStep] = useState(0);
  const stepRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepRef.current
      ?.querySelector<HTMLElement>("input, textarea, select, button.choice")
      ?.focus({ preventScroll: true });
  }, [step]);

  function stepError(index: number) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim());
    switch (index) {
      case 1:
        return fields.message.trim().length >= 10
          ? ""
          : "Please tell us a little more (at least 10 characters).";
      case 2:
        return fields.name.trim().length >= 2 ? "" : "Please enter your name.";
      case 3:
        return emailOk ? "" : "Please enter a valid email address.";
      case 4:
        return fields.consent
          ? ""
          : "Please tick the box so we can use your details to reply.";
      default:
        return "";
    }
  }
  function next() {
    const problem = stepError(step);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setStep(value => Math.min(value + 1, steps.length - 1));
  }
  function back() {
    setError("");
    setStep(value => Math.max(value - 1, 0));
  }
  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    if (step < steps.length - 1) {
      event.preventDefault();
      next();
      return;
    }
    const problem = stepError(step);
    if (problem) {
      event.preventDefault();
      setError(problem);
      return;
    }
    void submit(event);
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
        description="The quickest way to reach us is a WhatsApp message. Prefer email? Answer a few quick questions below and we’ll reply within 24–48 hours."
      >
        <div className="intro-buttons">
          <a href="#whatsapp" className="btn btn-primary">
            <MessageCircle size={16} /> Message us on WhatsApp
          </a>
          <a href="#message" className="btn btn-ghost">
            Send a message instead <ArrowRight size={16} />
          </a>
        </div>
      </PageIntro>
      <section className="section wa-section" id="whatsapp">
        <div className="container">
          <WhatsAppQuick />
        </div>
      </section>
      <section className="section section-alt" id="message">
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
              <form className="form-card step-form" onSubmit={onFormSubmit} noValidate>
                <div className="step-head">
                  <div className="eyebrow">SEND A MESSAGE</div>
                  <span className="step-count">
                    Question {step + 1} of {steps.length}
                  </span>
                </div>
                <div
                  className="step-progress"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={steps.length}
                  aria-valuenow={step + 1}
                  aria-label="Form progress"
                >
                  <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>

                <div className="step" key={step} ref={stepRef} aria-live="polite">
                  <h2>{steps[step]}</h2>

                  {step === 0 && (
                    <div className="choice-grid" role="radiogroup" aria-label="Enquiry type">
                      {subjects.map(item => (
                        <button
                          type="button"
                          key={item}
                          role="radio"
                          aria-checked={fields.subject === item}
                          className={fields.subject === item ? "choice is-selected" : "choice"}
                          onClick={() => {
                            update("subject", item);
                            setStep(1);
                          }}
                        >
                          {item}
                          {fields.subject === item && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="field">
                      <label htmlFor="contact-message">
                        The more detail, the better: symptoms, warning lights,
                        make and model.
                      </label>
                      <textarea
                        id="contact-message"
                        value={fields.message}
                        maxLength={3000}
                        rows={5}
                        onChange={e => update("message", e.target.value)}
                        placeholder="e.g. 2017 Golf, grinding noise when braking since last week…"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="field">
                      <label htmlFor="contact-name">Your full name</label>
                      <input
                        id="contact-name"
                        value={fields.name}
                        maxLength={100}
                        autoComplete="name"
                        onChange={e => update("name", e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="form-grid">
                      <div className="field">
                        <label htmlFor="contact-email">
                          Email <span>*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={fields.email}
                          maxLength={320}
                          autoComplete="email"
                          inputMode="email"
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
                          inputMode="tel"
                          onChange={e => update("phone", e.target.value)}
                          placeholder="07…"
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <>
                      <dl className="step-summary">
                        {[
                          ["Enquiry", fields.subject, 0],
                          ["Message", fields.message, 1],
                          ["Name", fields.name, 2],
                          ["Contact", [fields.email, fields.phone].filter(Boolean).join(" · "), 3],
                        ].map(([label, value, target]) => (
                          <div key={label as string}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                            <button
                              type="button"
                              className="step-edit"
                              onClick={() => setStep(target as number)}
                            >
                              Edit
                            </button>
                          </div>
                        ))}
                      </dl>
                      <label className="checkbox-field">
                        <input
                          type="checkbox"
                          checked={fields.consent}
                          onChange={e => update("consent", e.target.checked)}
                        />
                        <span>
                          I agree to the use of these details to handle my
                          message, as described in the{" "}
                          <Link href="/privacy">privacy notice</Link>.
                        </span>
                      </label>
                    </>
                  )}
                </div>

                {error && (
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}

                <div className="step-actions">
                  {step > 0 ? (
                    <button type="button" className="btn btn-ghost" onClick={back}>
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <span className="step-hint">Tap an option to continue</span>
                  )}
                  {step > 0 && step < steps.length - 1 && (
                    <button type="submit" className="btn btn-primary">
                      Continue <ArrowRight size={16} />
                    </button>
                  )}
                  {step === steps.length - 1 && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 size={16} className="spinner" /> Sending…
                        </>
                      ) : (
                        <>
                          Send your message <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
                <p className="step-footnote">
                  We’ll email you a confirmation and reply within 24–48 hours.
                  Need an answer sooner? Use WhatsApp above.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
