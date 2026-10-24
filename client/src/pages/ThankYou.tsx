import { CheckCircle2, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { business } from "@shared/catalog";
import { PageIntro } from "@/components/Site";

function queryValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

export default function ThankYou() {
  const reference = queryValue("reference");
  const type = queryValue("type");
  const delivery = queryValue("delivery");
  const staticEmail = delivery === "email";
  const label =
    type === "booking"
      ? "inspection request"
      : type === "quote"
        ? "quote request"
        : "enquiry";
  return (
    <>
      <PageIntro
        eyebrow="MESSAGE RECEIVED"
        title={
          <>
            Thank you.
            <br />
            <span className="orange-text">We’re on it.</span>
          </>
        }
        description={
          staticEmail
            ? `Your ${label} is ready in your email app. Send it to The Auto Surgeon in Hayes and we’ll get back to you within 24–48 hours.`
            : `Your ${label} has been received by The Auto Surgeon in Hayes. We’ll review your details and get back to you within 24–48 hours.`
        }
      />
      <section className="section section-alt thank-you-section">
        <div className="container thank-you-wrap">
          <div className="thank-you-card">
            <div className="thank-you-orbit">
              <CheckCircle2 size={42} />
            </div>
            <div className="eyebrow">
              {staticEmail ? "EMAIL DRAFT READY" : "CONFIRMATION SENT"}
            </div>
            <h2>
              {staticEmail ? "Send your email draft." : "Check your inbox."}
            </h2>
            <p className="thank-you-lead">
              {staticEmail
                ? "Your email app should now be open with your vehicle details already filled in. Press Send to deliver your enquiry to the workshop."
                : "We have sent you a confirmation email of your inquiry. Your request is safely saved for the workshop team."}
            </p>
            {reference && <div className="request-reference">{reference}</div>}
            <div className="email-notice">
              <Mail size={21} />
              <p>
                {staticEmail
                  ? `Send the draft to ${business.email}. If your email app did not open, email the workshop directly and include your reference.`
                  : "Any emails from theautosurgeon.co.uk? Please unblock this email and check your spam folder."}
              </p>
            </div>
            <p className="small">
              We aim to reply within 24–48 hours. If your vehicle is unsafe or
              you need urgent help, do not wait for an email.
            </p>
            <div className="intro-buttons">
              <a href={business.tel} className="btn btn-primary">
                <Phone size={16} /> Call {business.phone}
              </a>
              <Link href="/" className="btn btn-ghost">
                Back to home <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
