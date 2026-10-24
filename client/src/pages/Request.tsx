import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Loader2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { business, bookingServices, preferredTimes } from "@shared/catalog";
import { trpc } from "@/lib/trpc";
import { formError } from "@/lib/formErrors";
import {
  isStaticCloudflareDeployment,
  openStaticInquiryEmail,
} from "@/lib/staticInquiry";
import { PageIntro } from "@/components/Site";

export function londonDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
function maxDate() {
  const date = new Date(`${londonDate()}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 90);
  return date.toISOString().slice(0, 10);
}
function queryValue(key: string) {
  return typeof window === "undefined"
    ? ""
    : new URLSearchParams(window.location.search).get(key) || "";
}
export function RequestConfirmation({
  reference,
  kind,
  status = "requested",
}: {
  reference: string;
  kind: "booking" | "quote" | "contact";
  status?: string;
}) {
  return (
    <div className="confirmation-card" role="status">
      <div className="confirmation-icon">
        <CheckCircle2 size={34} />
      </div>
      <div className="eyebrow" style={{ justifyContent: "center" }}>
        SUCCESSFULLY SAVED
      </div>
      <h2>
        {status !== "requested" && kind !== "contact"
          ? `Your request is ${status}.`
          : kind === "booking"
            ? "Request received. Next stop: confirmation."
            : "Your message is with us."}
      </h2>
      <p>
        {status !== "requested" && kind !== "contact"
          ? "This request was already saved. The current workshop status is shown above. Check your account or call the workshop for the agreed visit details."
          : kind === "booking"
            ? "Your appointment request has been saved. Your preferred date and time are not yet confirmed. Please wait for the workshop to confirm availability before travelling."
            : "Your request has been securely saved for the workshop. If you need a quick answer, please call during opening hours."}
      </p>
      <span className="request-reference">{reference}</span>
      <p className="small">
        Keep this reference when contacting the workshop. We have emailed a
        confirmation to the address you provided. Please check your inbox and
        spam folder.
      </p>
      <div className="intro-buttons">
        <a href={business.tel} className="btn btn-primary">
          <Phone size={16} />
          Call the workshop
        </a>
        <Link href="/account" className="btn btn-ghost">
          My account
          <ArrowRight size={15} />
        </Link>
        <Link href="/" className="text-link">
          Back home
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function RequestPage({
  kind = "booking",
}: {
  kind?: "booking" | "quote";
}) {
  const { user } = useAuth();
  const profile = trpc.account.profile.useQuery(undefined, {
    enabled: !!user,
    retry: false,
  });
  const selected = queryValue("service");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    registration: "",
    vehicle: "",
    postcode: "",
    service: bookingServices.includes(
      selected as (typeof bookingServices)[number]
    )
      ? selected
      : "",
    date: "",
    time: "",
    notes: queryValue("notes"),
    consent: false,
  });
  const [requestKey] = useState(() => crypto.randomUUID());
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("requested");
  const [error, setError] = useState("");
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const mutation = trpc.appointments.create.useMutation({
    onSuccess: data => {
      setReference(data.reference);
      setStatus(data.status);
      void utils.appointments.mine.invalidate();
      navigate(
        `/thank-you?type=${kind}&reference=${encodeURIComponent(data.reference)}`
      );
      window.scrollTo({ top: 100, behavior: "smooth" });
    },
  });
  useEffect(() => {
    if (user)
      setFields(old => ({
        ...old,
        name: old.name || user.name || "",
        email: old.email || user.email || "",
      }));
    if (profile.data)
      setFields(old => ({
        ...old,
        phone: old.phone || profile.data.phone || "",
        registration: old.registration || profile.data.registration || "",
        vehicle: old.vehicle || profile.data.vehicle || "",
        postcode: old.postcode || profile.data.postcode || "",
      }));
  }, [user, profile.data]);
  function update(key: keyof typeof fields, value: string | boolean) {
    setFields(old => ({ ...old, [key]: value }));
    setError("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mutation.isPending) return;
    setError("");
    if (
      kind === "booking" &&
      new Date(`${fields.date}T12:00:00Z`).getUTCDay() === 0
    ) {
      setError(
        "Sunday visits are by direct arrangement only. Please choose Monday–Saturday or call the workshop."
      );
      return;
    }
    if (isStaticCloudflareDeployment()) {
      const emailReference = openStaticInquiryEmail({
        kind,
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        registration: fields.registration,
        vehicle: fields.vehicle,
        postcode: fields.postcode,
        service: fields.service,
        date: kind === "booking" ? fields.date : undefined,
        time: kind === "booking" ? fields.time : undefined,
        notes: fields.notes,
      });
      setReference(emailReference);
      navigate(
        `/thank-you?type=${kind}&reference=${encodeURIComponent(emailReference)}&delivery=email`
      );
      return;
    }
    try {
      await mutation.mutateAsync({
        ...fields,
        service: fields.service as (typeof bookingServices)[number],
        kind,
        consent: true,
        requestKey,
        date: kind === "booking" ? fields.date : undefined,
        time: kind === "booking" ? fields.time : undefined,
      });
    } catch (err) {
      setError(formError(err));
    }
  }
  const isBooking = kind === "booking";
  const nowTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  return (
    <>
      <PageIntro
        eyebrow={isBooking ? "BOOK AN INSPECTION" : "REQUEST A WRITTEN QUOTE"}
        title={
          isBooking ? (
            <>
              Let’s look after
              <br />
              <span className="orange-text">your car.</span>
            </>
          ) : (
            <>
              Know the work.
              <br />
              <span className="orange-text">Know the price.</span>
            </>
          )
        }
        description={
          isBooking
            ? "Tell us about your vehicle and choose a preferred time. We’ll save your request so the workshop can review it and confirm the appointment."
            : "Send your registration and the work you need. We’ll save your inquiry so the workshop can discuss an accurate quote with you."
        }
      />
      <section className="section section-alt">
        <div className="container">
          {reference ? (
            <RequestConfirmation
              reference={reference}
              kind={kind}
              status={status}
            />
          ) : (
            <div className="form-layout">
              <form className="form-card" onSubmit={submit}>
                <h2>Your vehicle. Your visit.</h2>
                <p className="form-lead">
                  Fields marked * are required. No payment is taken online.
                </p>
                {!user && (
                  <div className="form-notice">
                    You can continue as a guest, or{" "}
                    <Link href="/account">sign in first</Link> to keep this
                    request in your private appointment history. Guest requests
                    are not automatically linked to an account later.
                  </div>
                )}
                <div className="form-grid">
                  <div className="field wide">
                    <label htmlFor="service">
                      What can we help with? <span>*</span>
                    </label>
                    <select
                      id="service"
                      value={fields.service}
                      required
                      onChange={e => update("service", e.target.value)}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {bookingServices.map(name => (
                        <option key={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="registration">
                      Vehicle registration <span>*</span>
                    </label>
                    <input
                      id="registration"
                      className="registration-input"
                      autoComplete="off"
                      placeholder="AB12 CDE"
                      maxLength={12}
                      minLength={2}
                      pattern="[A-Za-z0-9 ]{2,12}"
                      required
                      value={fields.registration}
                      onChange={e =>
                        update("registration", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="vehicle">Make & model</label>
                    <input
                      id="vehicle"
                      placeholder="e.g. BMW 3 Series"
                      maxLength={120}
                      value={fields.vehicle}
                      onChange={e => update("vehicle", e.target.value)}
                    />
                  </div>
                  <div className="form-section-label">
                    01 / YOUR CONTACT DETAILS
                  </div>
                  <div className="field">
                    <label htmlFor="name">
                      Full name <span>*</span>
                    </label>
                    <input
                      id="name"
                      required
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      placeholder="Your full name"
                      value={fields.name}
                      onChange={e => update("name", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">
                      Phone number <span>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      minLength={7}
                      maxLength={30}
                      placeholder="07700 900000"
                      value={fields.phone}
                      onChange={e => update("phone", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">
                      Email address <span>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={320}
                      placeholder="you@example.com"
                      value={fields.email}
                      onChange={e => update("email", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="postcode">Postcode</label>
                    <input
                      id="postcode"
                      autoComplete="postal-code"
                      maxLength={12}
                      placeholder="UB3 4RZ"
                      value={fields.postcode}
                      onChange={e =>
                        update("postcode", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  {isBooking && (
                    <>
                      <div className="form-section-label">
                        02 / YOUR PREFERRED VISIT
                      </div>
                      <div className="field">
                        <label htmlFor="date">
                          Preferred date <span>*</span>
                        </label>
                        <input
                          id="date"
                          type="date"
                          required
                          min={londonDate()}
                          max={maxDate()}
                          value={fields.date}
                          onChange={e => {
                            update("date", e.target.value);
                            update("time", "");
                          }}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="time">
                          Preferred time <span>*</span>
                        </label>
                        <select
                          id="time"
                          required
                          value={fields.time}
                          onChange={e => update("time", e.target.value)}
                        >
                          <option value="" disabled>
                            Select a time
                          </option>
                          {preferredTimes.map(time => (
                            <option
                              key={time}
                              disabled={
                                fields.date === londonDate() && time <= nowTime
                              }
                            >
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="field wide small muted">
                        Monday–Saturday only. These are preferred times, not
                        live availability. For Sunday or urgent visits, call us.
                      </p>
                    </>
                  )}
                  <div className="field wide">
                    <label htmlFor="notes">Anything else we should know?</label>
                    <textarea
                      id="notes"
                      maxLength={2000}
                      placeholder="Describe a noise, warning light, tyre size, recent impact or the work you need…"
                      value={fields.notes}
                      onChange={e => update("notes", e.target.value)}
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
                    I agree that The Auto Surgeon can use these details to
                    handle my request, as described in the{" "}
                    <Link href="/privacy">privacy notice</Link>.{" "}
                    {isBooking &&
                      "I understand this is a request, not a confirmed appointment."}
                  </span>
                </label>
                {error && (
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-actions">
                  <p>
                    <ShieldCheck
                      size={13}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        marginRight: 6,
                      }}
                    />
                    Saved securely for the workshop.
                  </p>
                  <button
                    className="btn btn-primary"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 size={16} className="spinner" />
                        Saving request…
                      </>
                    ) : (
                      <>
                        {isBooking
                          ? "Send appointment request"
                          : "Send quote request"}
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <aside>
                <div className="booking-summary">
                  <div className="eyebrow">NO SURPRISES</div>
                  <h2>
                    Here’s what
                    <br />
                    happens next.
                  </h2>
                  <ul className="check-list">
                    <li>
                      <Check size={15} />
                      Your request is saved with a unique reference.
                    </li>
                    <li>
                      <Check size={15} />
                      The workshop reviews your vehicle and service details.
                    </li>
                    <li>
                      <Check size={15} />
                      You confirm availability and the agreed work with the
                      team.
                    </li>
                  </ul>
                  <div className="timing">
                    <Clock3 size={16} />
                    <span>Mon–Sat · 9 AM–6 PM</span>
                  </div>
                  <p className="small">
                    Unit 3 Squirrels Trading Estate
                    <br />
                    Viveash Close, Hayes UB3 4RZ
                  </p>
                  <a href={business.tel} className="btn btn-ghost full-width">
                    <Phone size={15} />
                    {business.phone}
                  </a>
                </div>
                <div className="info-note">
                  <ShieldCheck size={20} />
                  <p>
                    If your vehicle may be unsafe, stop safely and seek
                    immediate advice. Do not wait for an online request to be
                    reviewed.
                  </p>
                </div>
                <div className="info-note">
                  <CalendarDays size={20} />
                  <p>
                    We’ll email a confirmation to you after this request is
                    sent. Please check your inbox and spam folder.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
