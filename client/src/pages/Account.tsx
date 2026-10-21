import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Loader2,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { formError } from "@/lib/formErrors";
import { PageIntro } from "@/components/Site";

function beginLogin() {
  try {
    sessionStorage.setItem("autosurgeon-return", "/account");
    startLogin();
  } catch (error) {
    window.alert(
      error instanceof Error
        ? error.message
        : "Sign-in is unavailable. Please contact the workshop."
    );
  }
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`status-badge ${status}`}>
      {status === "requested" ? "Awaiting confirmation" : status}
    </span>
  );
}
function Loading() {
  return (
    <div className="loading-state" role="status">
      <Loader2 size={19} className="spinner" />
      Loading your account…
    </div>
  );
}
export default function Account() {
  const auth = useAuth();
  const [tab, setTab] = useState("requests");
  const [logoutError, setLogoutError] = useState("");
  return (
    <>
      <PageIntro
        eyebrow="YOUR ACCOUNT"
        title={
          <>
            Your car care.
            <br />
            <span className="orange-text">All in one place.</span>
          </>
        }
        description="Keep your contact and vehicle details up to date, and follow requests submitted while signed in."
      />
      <section className="section section-alt">
        <div className="container">
          {auth.loading ? (
            <Loading />
          ) : !auth.user ? (
            <div className="signin-card">
              <div className="signin-copy">
                <img
                  src="/assets/brand/auto-surgeon-logo.png"
                  alt="The Auto Surgeon"
                />
                <div className="eyebrow">YOUR PERSONAL WORKSHOP CONNECTION</div>
                <h2>
                  Less paperwork.
                  <br />
                  More peace of mind.
                </h2>
                <p>
                  Sign in or create an account securely with Manus. Your first
                  sign-in creates your customer profile—no separate workshop
                  password to remember.
                </p>
                <button onClick={beginLogin} className="btn btn-primary">
                  <UserRound size={16} />
                  Sign in / create account
                  <ArrowRight size={16} />
                </button>
                <p className="small" style={{ marginTop: 20 }}>
                  You can also{" "}
                  <Link href="/book" className="orange-text">
                    request a visit as a guest
                  </Link>
                  . Guest submissions won’t automatically appear in a later
                  account.
                </p>
                {auth.error && (
                  <div className="form-error" role="alert">
                    Couldn’t check your session. You can try signing in again.
                  </div>
                )}
              </div>
              <img
                className="signin-photo"
                src="/assets/photos/wheel-alignment.webp"
                alt="Wheel alignment equipment"
              />
            </div>
          ) : (
            <>
              <div className="account-top">
                <div>
                  <div className="eyebrow">WELCOME BACK</div>
                  <h2 className="section-heading">
                    {auth.user.name || "Your account"}
                  </h2>
                </div>
                <button
                  className="btn btn-ghost"
                  onClick={async () => {
                    try {
                      await auth.logout();
                    } catch {
                      setLogoutError(
                        "We couldn’t sign you out. Please try again."
                      );
                    }
                  }}
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
              {logoutError && (
                <div className="form-error" role="alert">
                  {logoutError}
                </div>
              )}
              <div
                className="account-tabs"
                style={{ marginTop: 30 }}
                role="tablist"
                aria-label="Account sections"
              >
                <button
                  className={`account-tab ${tab === "requests" ? "active" : ""}`}
                  role="tab"
                  aria-selected={tab === "requests"}
                  onClick={() => setTab("requests")}
                >
                  My requests
                </button>
                <button
                  className={`account-tab ${tab === "profile" ? "active" : ""}`}
                  role="tab"
                  aria-selected={tab === "profile"}
                  onClick={() => setTab("profile")}
                >
                  Profile & vehicle
                </button>
                {auth.user.role === "admin" && (
                  <Link href="/manage" className="account-tab">
                    Workshop manager
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
              {tab === "requests" ? <RequestHistory /> : <Profile />}
            </>
          )}
        </div>
      </section>
    </>
  );
}
function RequestHistory() {
  const query = trpc.appointments.mine.useQuery(undefined, { retry: false });
  const contact = trpc.inquiries.mine.useQuery(undefined, { retry: false });
  if (query.isLoading || contact.isLoading) return <Loading />;
  if (query.error || contact.error)
    return (
      <div className="form-error" role="alert">
        We couldn’t load your requests.{" "}
        <button
          className="text-link"
          style={{ border: 0, background: "none" }}
          onClick={() => {
            void query.refetch();
            void contact.refetch();
          }}
        >
          Try again
        </button>
      </div>
    );
  return (
    <>
      <div className="form-notice">
        Only requests submitted while signed into this account appear here.
        “Awaiting confirmation” means the workshop has not confirmed your
        preferred visit. Status changes do not send automatic notifications.
      </div>
      {!query.data?.length && !contact.data?.length ? (
        <div className="empty-state">
          <CalendarDays size={32} />
          <h2>Your next visit starts here.</h2>
          <p>
            You haven’t submitted any appointment, quote or contact requests
            while signed in.
          </p>
          <Link href="/book" className="btn btn-primary">
            Request your first visit
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          {query.data?.map(request => (
            <article className="request-card" key={request.reference}>
              <div className="request-card-top">
                <div>
                  <div className="eyebrow">
                    {request.kind === "quote"
                      ? "WRITTEN QUOTE"
                      : "APPOINTMENT REQUEST"}
                  </div>
                  <h3>{request.service}</h3>
                </div>
                <StatusBadge status={request.status} />
              </div>
              <div className="request-meta">
                <span>{request.registration}</span>
                {request.date && (
                  <span>
                    {request.date} · {request.time}
                  </span>
                )}
                <span>
                  {new Date(request.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
              {request.notes && <p>{request.notes}</p>}
              <p
                className="small"
                style={{
                  fontFamily: "var(--font-mono)",
                  overflowWrap: "anywhere",
                }}
              >
                {request.reference}
              </p>
            </article>
          ))}
          {contact.data?.map(request => (
            <article className="request-card" key={request.reference}>
              <div className="request-card-top">
                <div>
                  <div className="eyebrow">CONTACT MESSAGE</div>
                  <h3>{request.subject}</h3>
                </div>
                <StatusBadge status={request.status} />
              </div>
              <div className="request-meta">
                <span>
                  {new Date(request.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{request.message}</p>
              <p
                className="small"
                style={{
                  fontFamily: "var(--font-mono)",
                  overflowWrap: "anywhere",
                }}
              >
                {request.reference}
              </p>
            </article>
          ))}
          <Link href="/book" className="btn btn-primary">
            Request another visit
            <ArrowRight size={16} />
          </Link>
        </>
      )}
    </>
  );
}
function Profile() {
  const query = trpc.account.profile.useQuery(undefined, { retry: false });
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    vehicle: "",
    registration: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const utils = trpc.useUtils();
  const mutation = trpc.account.updateProfile.useMutation({
    onSuccess: async () => {
      setMessage("Your profile and vehicle details have been saved.");
      await Promise.all([
        utils.account.profile.invalidate(),
        utils.auth.me.invalidate(),
      ]);
    },
  });
  useEffect(() => {
    if (query.data) setFields(query.data);
  }, [query.data]);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await mutation.mutateAsync(fields);
    } catch (err) {
      setError(formError(err));
    }
  }
  if (query.isLoading) return <Loading />;
  if (query.error)
    return (
      <div className="form-error" role="alert">
        Your profile could not be loaded.{" "}
        <button onClick={() => query.refetch()}>Try again</button>
      </div>
    );
  return (
    <form className="form-card" onSubmit={submit} style={{ maxWidth: 800 }}>
      <h2>Details that save you time.</h2>
      <p className="form-lead">
        These details help prefill new requests. They do not change your
        existing appointment requests or your sign-in identity.
      </p>
      <div className="form-grid">
        {[
          ["name", "Full name", "text", "name"],
          ["email", "Contact email", "email", "email"],
          ["phone", "Phone number", "tel", "tel"],
          ["postcode", "Postcode", "text", "postal-code"],
          ["vehicle", "Make & model", "text", "off"],
          ["registration", "Vehicle registration", "text", "off"],
        ].map(([key, label, type, autocomplete]) => (
          <div className="field" key={key}>
            <label htmlFor={`profile-${key}`}>
              {label}
              {["name", "email"].includes(key) && <span> *</span>}
            </label>
            <input
              id={`profile-${key}`}
              type={type}
              autoComplete={autocomplete}
              required={["name", "email"].includes(key)}
              maxLength={
                key === "email"
                  ? 320
                  : key === "name"
                    ? 100
                    : key === "phone"
                      ? 32
                      : key === "vehicle"
                        ? 120
                        : 16
              }
              value={fields[key as keyof typeof fields]}
              onChange={e => {
                setFields(old => ({
                  ...old,
                  [key]:
                    key === "registration" || key === "postcode"
                      ? e.target.value.toUpperCase()
                      : e.target.value,
                }));
                setMessage("");
                setError("");
              }}
            />
          </div>
        ))}
      </div>
      {message && (
        <div className="form-success" role="status">
          <Check size={15} style={{ display: "inline", marginRight: 8 }} />
          {message}
        </div>
      )}
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="form-actions">
        <p>Private to your account and authorized workshop staff.</p>
        <button className="btn btn-primary" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="spinner" size={16} />
          ) : (
            <Check size={16} />
          )}
          Save details
        </button>
      </div>
    </form>
  );
}
export function WorkshopManager() {
  const { user, loading } = useAuth();
  return (
    <>
      <PageIntro
        eyebrow="WORKSHOP MANAGER"
        title="Requests, in one place."
        description="Review customer appointment and quote requests and record their status. This area is restricted to authorized workshop staff."
      />
      <section className="section section-alt">
        <div className="container">
          {loading ? (
            <Loading />
          ) : user?.role === "admin" ? (
            <ManagerRequests />
          ) : (
            <div className="empty-state">
              <ShieldCheck size={34} />
              <h2>Workshop access only.</h2>
              <p>
                {user
                  ? "Your account is not authorized to access customer records. The site owner must configure their owner identity before using this area."
                  : "Sign in with an authorized workshop account to continue."}
              </p>
              {!user && (
                <button onClick={beginLogin} className="btn btn-primary">
                  Sign in securely
                  <ArrowRight size={16} />
                </button>
              )}
              <Link href="/account" className="btn btn-ghost">
                Back to my account
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
function ManagerRequests() {
  const [filter, setFilter] = useState("all");
  const query = trpc.admin.requests.useQuery(undefined, { retry: false });
  const [error, setError] = useState("");
  const utils = trpc.useUtils();
  const mutation = trpc.admin.updateStatus.useMutation({
    onSuccess: () => {
      void utils.admin.requests.invalidate();
      void utils.appointments.mine.invalidate();
    },
  });
  if (query.isLoading) return <Loading />;
  if (query.error)
    return (
      <div className="form-error" role="alert">
        Unable to load workshop records.{" "}
        <button onClick={() => query.refetch()}>Try again</button>
      </div>
    );
  return (
    <>
      <div className="form-notice">
        Changing a status updates the record only. Contact the customer
        separately to agree a confirmed date/time; no automatic email or text is
        sent.
      </div>
      <div className="account-tabs">
        {["all", "booking", "quote", "contact"].map(value => (
          <button
            key={value}
            className={`account-tab ${filter === value ? "active" : ""}`}
            onClick={() => setFilter(value)}
          >
            {value === "all" ? "All requests" : value}
          </button>
        ))}
      </div>
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      {filter !== "contact" &&
        query.data?.appointments
          .filter(item => filter === "all" || item.kind === filter)
          .map(item => (
            <article className="request-card" key={item.reference}>
              <div className="request-card-top">
                <div>
                  <div className="eyebrow">
                    {item.kind} / {item.reference}
                  </div>
                  <h3>
                    {item.service} · {item.name}
                  </h3>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="request-meta">
                <span>
                  {item.registration} / {item.vehicle}
                </span>
                <span>
                  {item.date || "Quote inquiry"} {item.time}
                </span>
              </div>
              <p>
                <a href={`mailto:${item.email}`}>{item.email}</a> ·{" "}
                <a href={`tel:${item.phone}`}>{item.phone}</a>
              </p>
              {item.notes && <p>{item.notes}</p>}
              <label className="field" style={{ maxWidth: 260, marginTop: 20 }}>
                <span className="small muted">Record request status</span>
                <select
                  className="admin-status"
                  disabled={mutation.isPending}
                  value={item.status}
                  onChange={async e => {
                    setError("");
                    try {
                      await mutation.mutateAsync({
                        reference: item.reference,
                        status: e.target.value as
                          | "requested"
                          | "confirmed"
                          | "completed"
                          | "cancelled",
                      });
                    } catch (err) {
                      setError(
                        err instanceof Error
                          ? err.message
                          : "Status update failed."
                      );
                    }
                  }}
                >
                  {["requested", "confirmed", "completed", "cancelled"].map(
                    value => (
                      <option key={value}>{value}</option>
                    )
                  )}
                </select>
              </label>
            </article>
          ))}
      {["all", "contact"].includes(filter) &&
        query.data?.inquiries.map(item => (
          <article className="request-card" key={item.reference}>
            <div className="request-card-top">
              <div>
                <div className="eyebrow">CONTACT / {item.reference}</div>
                <h3>
                  {item.subject} · {item.name}
                </h3>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p>
              <a href={`mailto:${item.email}`}>{item.email}</a>
              {item.phone && (
                <>
                  {" "}
                  · <a href={`tel:${item.phone}`}>{item.phone}</a>
                </>
              )}
            </p>
            <p style={{ whiteSpace: "pre-wrap", marginTop: 15 }}>
              {item.message}
            </p>
          </article>
        ))}
      {!query.data?.appointments.length && !query.data?.inquiries.length && (
        <div className="empty-state">
          <CalendarDays size={28} />
          <h2>No requests yet.</h2>
          <p>New customer submissions will appear here.</p>
        </div>
      )}
    </>
  );
}
