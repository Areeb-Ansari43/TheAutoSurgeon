const OWNER_EMAIL = "admin@theautosurgeon.co.uk";
const FROM_EMAIL = "The Auto Surgeon <forms@theautosurgeon.co.uk>";
const LOGO_URL =
  "https://theautosurgeon.co.uk/assets/brand/auto-surgeon-logo.png";

type Inquiry = {
  kind?: "contact" | "booking" | "quote";
  name?: string;
  email?: string;
  phone?: string;
  registration?: string;
  vehicle?: string;
  postcode?: string;
  subject?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
  notes?: string;
};

function clean(value: unknown, max = 3000) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: unknown) {
  return clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f6f8;font-family:Arial,sans-serif;color:#111827"><div style="max-width:640px;margin:28px auto;padding:0 16px"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:24px;overflow:hidden"><div style="padding:28px 30px;border-bottom:1px solid #f1f1f1;background:#fff7ef"><img src="${LOGO_URL}" alt="The Auto Surgeon" width="190" style="display:block;max-width:190px;height:auto" /></div><div style="padding:30px"><p style="margin:0 0 10px;color:#ee6900;font-size:12px;letter-spacing:2px;font-weight:700;text-transform:uppercase">The Auto Surgeon · Hayes</p><h1 style="margin:0 0 20px;font-size:28px;line-height:1.15">${escapeHtml(title)}</h1>${body}</div><div style="padding:20px 30px;background:#fafafa;color:#667085;font-size:12px;line-height:1.6">The Auto Surgeon · Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ<br />admin@theautosurgeon.co.uk · 07767 909397</div></div></div></body></html>`;
}

function row(label: string, value: unknown) {
  return `<tr><td style="padding:10px 12px;border-bottom:1px solid #f0f1f3;color:#667085;width:34%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #f0f1f3;font-weight:600;vertical-align:top">${escapeHtml(value || "—")}</td></tr>`;
}

function details(input: Inquiry, reference: string) {
  return [
    row("Reference", reference),
    row("Name", input.name),
    row("Email", input.email),
    row("Phone", input.phone),
    row("Vehicle", input.vehicle),
    row("Registration", input.registration),
    row("Postcode", input.postcode),
    row("Service", input.service),
    row("Preferred date", input.date),
    row("Preferred time", input.time),
    row("Subject", input.subject),
    row("Message", input.message || input.notes),
  ].join("");
}

function titleFor(input: Inquiry) {
  return input.kind === "booking"
    ? "New inspection request"
    : input.kind === "quote"
      ? "New quote request"
      : "New customer enquiry";
}

async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!response.ok) throw new Error(`Resend returned ${response.status}`);
}

export async function onRequestPost(context: {
  request: Request;
  env: { RESEND_API_KEY?: string };
}) {
  if (!context.env.RESEND_API_KEY) {
    return json({ error: "Email delivery is not configured yet." }, 503);
  }
  let input: Inquiry;
  try {
    input = (await context.request.json()) as Inquiry;
  } catch {
    return json({ error: "Please check the form details and try again." }, 400);
  }
  const name = clean(input.name, 100);
  const email = clean(input.email, 320).toLowerCase();
  const message = clean(input.message || input.notes, 3000);
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return json(
      { error: "Please enter your name, a valid email and your message." },
      400
    );
  }
  const normalized: Inquiry = {
    ...input,
    name,
    email,
    phone: clean(input.phone, 30),
    registration: clean(input.registration, 20),
    vehicle: clean(input.vehicle, 120),
    postcode: clean(input.postcode, 20),
    subject: clean(input.subject, 160),
    service: clean(input.service, 120),
    date: clean(input.date, 20),
    time: clean(input.time, 20),
    message,
    notes: clean(input.notes, 3000),
  };
  const reference = `AS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const title = titleFor(normalized);
  const ownerHtml = shell(
    title,
    `<p style="font-size:16px;line-height:1.6">A customer has submitted a new enquiry through the website. Reply directly to ${escapeHtml(email)}.</p><table style="width:100%;border-collapse:collapse;font-size:14px">${details(normalized, reference)}</table><p style="margin:22px 0 0;font-size:14px;color:#667085">Please review the request and contact the customer within 24–48 hours.</p>`
  );
  const customerHtml = shell(
    "We received your request",
    `<p style="font-size:16px;line-height:1.6">Hi ${escapeHtml(name)},</p><p style="font-size:16px;line-height:1.6">Thank you. We received your request. We respond back to you within <strong>24–48 hours</strong>.</p><div style="margin:22px 0;padding:18px 20px;border-radius:16px;background:#fff4e8;border:1px solid #ffd8b0"><strong>Your reference: ${escapeHtml(reference)}</strong></div><p style="font-size:14px;line-height:1.7;color:#475467">If you have not received your confirmation email, please check your junk and unblock any emails from @theautosurgeon.co.uk.</p>`
  );
  try {
    await Promise.all([
      sendEmail(
        context.env.RESEND_API_KEY,
        OWNER_EMAIL,
        `${title} · ${reference}`,
        ownerHtml,
        email
      ),
      sendEmail(
        context.env.RESEND_API_KEY,
        email,
        `We received your request · ${reference}`,
        customerHtml
      ),
    ]);
    return json({ reference });
  } catch {
    return json(
      {
        error:
          "We could not send your request right now. Please try again or call 07767 909397.",
      },
      502
    );
  }
}
