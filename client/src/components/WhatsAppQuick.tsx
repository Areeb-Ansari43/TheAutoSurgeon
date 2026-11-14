import { useState, type FormEvent } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { business } from "@shared/catalog";
import { SocialIcon } from "./Social";

/** Build a wa.me link with a pre-filled message. */
export function whatsappLink(parts: {
  name?: string;
  registration?: string;
  topic?: string;
  message?: string;
}) {
  const text = [
    `Hello ${business.name},`,
    parts.name?.trim() ? `My name is ${parts.name.trim()}.` : "",
    parts.topic ? `Enquiry: ${parts.topic}.` : "",
    parts.registration?.trim()
      ? `Vehicle registration: ${parts.registration.trim().toUpperCase()}.`
      : "",
    parts.message?.trim() || "I need help with my car.",
  ]
    .filter(Boolean)
    .join("\n");
  return `${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * The quicker route: a short form that opens WhatsApp with the message
 * already written, instead of waiting for an emailed form reply.
 */
export function WhatsAppQuick({
  headingLevel = "h2",
  title = "Quicker on WhatsApp.",
}: {
  headingLevel?: "h2" | "h3";
  title?: string;
}) {
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [message, setMessage] = useState("");
  const Heading = headingLevel;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(
      whatsappLink({ name, registration, message }),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="wa-quick" data-reveal="up">
      <div className="wa-quick-copy">
        <span className="wa-quick-badge">
          <Zap size={14} /> Fastest reply
        </span>
        <Heading>{title}</Heading>
        <p>
          A quicker message can be sent through WhatsApp instead of filling in
          the form. Type it here and we’ll open WhatsApp with your message ready
          to send. Photos of a warning light or tyre damage help us reply
          faster.
        </p>
        <ul>
          <li>Usually the quickest way to get an answer</li>
          <li>Send photos or a short video of the problem</li>
          <li>Same number: {business.phone}</li>
        </ul>
      </div>
      <form className="wa-quick-form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="wa-name">Your name</label>
          <input
            id="wa-name"
            value={name}
            onChange={event => setName(event.target.value)}
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="wa-reg">Registration (optional)</label>
          <input
            id="wa-reg"
            value={registration}
            onChange={event => setRegistration(event.target.value)}
            maxLength={12}
            placeholder="e.g. AB12 CDE"
            autoCapitalize="characters"
          />
        </div>
        <div className="field wide">
          <label htmlFor="wa-message">
            What’s happening? <span>*</span>
          </label>
          <textarea
            id="wa-message"
            value={message}
            onChange={event => setMessage(event.target.value)}
            required
            minLength={5}
            maxLength={1500}
            rows={3}
            placeholder="e.g. Tyre pressure light on and the front left looks low…"
          />
        </div>
        <button type="submit" className="btn btn-whatsapp">
          <SocialIcon id="whatsapp" size={19} /> Send on WhatsApp
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
