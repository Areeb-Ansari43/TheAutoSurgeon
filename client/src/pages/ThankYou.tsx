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
  return (
    <>
      <PageIntro
        eyebrow="MESSAGE RECEIVED"
        title={
          <>
            Thank you.
            <br />
            <span className="orange-text">We received your request.</span>
          </>
        }
        description="Thank you. We received your request. We respond back to you within 24–48 hours."
      />
      <section className="section section-alt thank-you-section">
        <div className="container thank-you-wrap">
          <div className="thank-you-card">
            <div className="thank-you-orbit">
              <CheckCircle2 size={42} />
            </div>
            <div className="eyebrow">THANK YOU</div>
            <h2>We received your request.</h2>
            <p className="thank-you-lead">
              Thank you. We received your request. We respond back to you within
              24–48 hours.
            </p>
            {reference && <div className="request-reference">{reference}</div>}
            <div className="email-notice">
              <Mail size={21} />
              <p>
                If you have not received your confirmation email, please check
                your junk and unblock any emails from @theautosurgeon.co.uk.
              </p>
            </div>
            <p className="small">
              If your vehicle is unsafe or you need urgent help, do not wait for
              an email. Call the workshop directly.
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
