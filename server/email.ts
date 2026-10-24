import type {
  AppointmentSubmissionInput,
  InquirySubmissionInput,
} from "./business";
import { ENV } from "./_core/env";

const OWNER_EMAIL = "admin@theautosurgeon.co.uk";
const FROM_EMAIL = "The Auto Surgeon <forms@theautosurgeon.co.uk>";
const SITE_URL = "https://theautosurgeon.co.uk";
const LOGO_URL = `${SITE_URL}/assets/brand/auto-surgeon-logo.png`;

type EmailArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

type Submission =
  | { kind: "contact"; reference: string; input: InquirySubmissionInput }
  | {
      kind: "booking" | "quote";
      reference: string;
      input: AppointmentSubmissionInput;
    };

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f6f8;font-family:Arial,sans-serif;color:#111827"><div style="max-width:640px;margin:28px auto;padding:0 16px"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:24px;overflow:hidden;box-shadow:0 16px 40px rgba(17,24,39,.08)"><div style="padding:28px 30px;border-bottom:1px solid #f1f1f1;background:linear-gradient(135deg,#fff,#fff7ef)"><img src="${LOGO_URL}" alt="The Auto Surgeon" width="190" style="display:block;max-width:190px;height:auto" /></div><div style="padding:30px"><p style="margin:0 0 10px;color:#ee6900;font-size:12px;letter-spacing:2px;font-weight:700;text-transform:uppercase">The Auto Surgeon · Hayes</p><h1 style="margin:0 0 20px;font-size:28px;line-height:1.15">${escapeHtml(title)}</h1>${body}</div><div style="padding:20px 30px;background:#fafafa;color:#667085;font-size:12px;line-height:1.6">The Auto Surgeon · Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ<br /><a href="mailto:admin@theautosurgeon.co.uk" style="color:#c65300">admin@theautosurgeon.co.uk</a> · <a href="tel:07767909397" style="color:#c65300">07767 909397</a></div></div></div></body></html>`;
}

function row(label: string, value: unknown) {
  return `<tr><td style="padding:10px 12px;border-bottom:1px solid #f0f1f3;color:#667085;width:34%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #f0f1f3;font-weight:600;vertical-align:top">${escapeHtml(value || "—")}</td></tr>`;
}

function details(submission: Submission) {
  if (submission.kind === "contact") {
    const { input } = submission;
    return `${row("Reference", submission.reference)}${row("Name", input.name)}${row("Email", input.email)}${row("Phone", input.phone)}${row("Subject", input.subject)}${row("Message", input.message)}`;
  }
  const { input } = submission;
  return `${row("Reference", submission.reference)}${row("Type", submission.kind === "booking" ? "Inspection request" : "Written quote request")}${row("Name", input.name)}${row("Email", input.email)}${row("Phone", input.phone)}${row("Vehicle", input.vehicle)}${row("Registration", input.registration)}${row("Postcode", input.postcode)}${row("Service", input.service)}${row("Preferred date", input.date)}${row("Preferred time", input.time)}${row("Notes", input.notes)}`;
}

function ownerEmail(submission: Submission) {
  const customer = submission.input.email;
  const title =
    submission.kind === "contact"
      ? "New customer enquiry"
      : submission.kind === "booking"
        ? "New inspection request"
        : "New quote request";
  const body = `<p style="font-size:16px;line-height:1.6">A customer has submitted a new enquiry through the website. Reply directly to <a href="mailto:${escapeHtml(customer)}" style="color:#c65300">${escapeHtml(customer)}</a>.</p><table style="width:100%;border-collapse:collapse;font-size:14px">${details(submission)}</table><p style="margin:22px 0 0;font-size:14px;color:#667085">Please review the request and contact the customer within 24–48 hours.</p>`;
  return {
    to: OWNER_EMAIL,
    subject: `${title} · ${submission.reference}`,
    html: shell(title, body),
    replyTo: customer,
  } satisfies EmailArgs;
}

function customerEmail(submission: Submission) {
  const title =
    submission.kind === "contact"
      ? "We received your enquiry"
      : submission.kind === "booking"
        ? "We received your inspection request"
        : "We received your quote request";
  const body = `<p style="font-size:16px;line-height:1.6">Hi ${escapeHtml(submission.input.name)},</p><p style="font-size:16px;line-height:1.6">Thank you for contacting The Auto Surgeon. We have received your details and will get back to you shortly, within <strong>24–48 hours</strong>.</p><div style="margin:22px 0;padding:18px 20px;border-radius:16px;background:#fff4e8;border:1px solid #ffd8b0"><strong>Your reference: ${escapeHtml(submission.reference)}</strong><br /><span style="font-size:14px;color:#667085">Please keep this for your records.</span></div><p style="font-size:14px;line-height:1.7;color:#475467">Any emails from theautosurgeon.co.uk? Please unblock this email and check your spam folder. If you have an urgent or unsafe vehicle problem, call us on <a href="tel:07767909397" style="color:#c65300">07767 909397</a> rather than waiting for an email.</p>`;
  return {
    to: submission.input.email,
    subject: `${title} · ${submission.reference}`,
    html: shell(title, body),
  } satisfies EmailArgs;
}

async function sendEmail(email: EmailArgs) {
  if (ENV.isTest) return false;
  if (!ENV.resendApiKey) {
    console.warn(
      "[Email] RESEND_API_KEY is not configured; submission remains saved without email delivery."
    );
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.warn(
        `[Email] Resend rejected email (${response.status}): ${await response.text().catch(() => "")}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Email] Resend request failed:", error);
    return false;
  }
}

export async function sendSubmissionEmails(submission: Submission) {
  const [owner, customer] = await Promise.all([
    sendEmail(ownerEmail(submission)),
    sendEmail(customerEmail(submission)),
  ]);
  return { owner, customer, sent: owner && customer };
}
