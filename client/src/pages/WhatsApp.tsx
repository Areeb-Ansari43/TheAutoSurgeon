import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { business } from "@shared/catalog";
import { PageIntro } from "@/components/Site";

export default function WhatsApp() {
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [message, setMessage] = useState("");
  const [generated, setGenerated] = useState(false);
  const whatsappUrl = useMemo(() => {
    const text = [
      `Hello ${business.name},`,
      name.trim() ? `My name is ${name.trim()}.` : "",
      registration.trim()
        ? `Vehicle registration: ${registration.trim()}.`
        : "",
      message.trim() || "I need help with my car.",
    ]
      .filter(Boolean)
      .join("\n");
    return `${business.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [name, registration, message]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGenerated(true);
  }
  return (
    <>
      <PageIntro
        eyebrow="WHATSAPP THE WORKSHOP"
        title={
          <>
            Car trouble?
            <br />
            <span className="orange-text">Message us directly.</span>
          </>
        }
        description="For emergency repair questions, sudden vehicle faults or a quick quote conversation, send The Auto Surgeon a WhatsApp enquiry. Do not drive an unsafe vehicle; call for urgent safety advice."
      >
        <div className="intro-buttons">
          <a href={business.whatsapp} className="btn btn-primary">
            <MessageCircle size={17} /> Open WhatsApp
          </a>
          <a href={business.tel} className="btn btn-ghost">
            <Phone size={16} /> Call {business.phone}
          </a>
        </div>
      </PageIntro>
      <section className="section section-alt">
        <div className="container whatsapp-layout">
          <div className="whatsapp-copy">
            <div className="eyebrow">
              <span className="orange-line" /> DIRECT ENQUIRIES
            </div>
            <h2>Tell us what happened.</h2>
            <p>
              Fill in the short form and we’ll prepare a WhatsApp message for
              you. You can review it before WhatsApp opens.
            </p>
            <ul className="check-list">
              <li>
                <MessageCircle size={17} /> Repairs, quotes and vehicle symptoms
              </li>
              <li>
                <MessageCircle size={17} /> Hayes workshop contact on 07767
                909397
              </li>
              <li>
                <MessageCircle size={17} /> No automatic booking or recovery
                promise
              </li>
            </ul>
          </div>
          <form className="form-card whatsapp-card" onSubmit={submit}>
            <div className="eyebrow">YOUR ENQUIRY</div>
            <h2>Start a WhatsApp message.</h2>
            <div className="field">
              <label htmlFor="whatsapp-name">Your name</label>
              <input
                id="whatsapp-name"
                value={name}
                onChange={event => setName(event.target.value)}
                maxLength={100}
                placeholder="Your name"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp-registration">
                Vehicle registration
              </label>
              <input
                id="whatsapp-registration"
                value={registration}
                onChange={event => setRegistration(event.target.value)}
                maxLength={20}
                placeholder="e.g. AB12 CDE"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp-message">
                What do you need help with? <span>*</span>
              </label>
              <textarea
                id="whatsapp-message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                required
                minLength={5}
                maxLength={1500}
                placeholder="Tell us about the repair, warning light, tyre issue or quote you need…"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              <MessageCircle size={17} /> Prepare WhatsApp message{" "}
              <ArrowRight size={16} />
            </button>
            {generated && (
              <div className="whatsapp-generated" role="status">
                <strong>Your message is ready.</strong>
                <p>Review it in WhatsApp before sending to The Auto Surgeon.</p>
                <a
                  className="btn btn-ghost"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Continue to WhatsApp <ArrowRight size={16} />
                </a>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
