import { MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { business } from "@shared/catalog";
import { PageIntro } from "@/components/Site";
import { WhatsAppQuick } from "@/components/WhatsAppQuick";

export default function WhatsApp() {
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
      <section className="section wa-section">
        <div className="container">
          <WhatsAppQuick title="Tell us what happened." />
          <p className="wa-note">
            Prefer email? Use the{" "}
            <Link href="/contact" className="text-link">
              contact form
            </Link>{" "}
            instead. Do not drive a vehicle you believe is unsafe; call{" "}
            <a href={business.tel}>{business.phone}</a> for urgent advice.
          </p>
        </div>
      </section>
    </>
  );
}
