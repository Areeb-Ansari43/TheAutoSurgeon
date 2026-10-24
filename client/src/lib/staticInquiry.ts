import { business } from "@shared/catalog";

export function isStaticCloudflareDeployment() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase();
  return (
    host.endsWith(".pages.dev") ||
    host === "theautosurgeon.co.uk" ||
    host === "www.theautosurgeon.co.uk"
  );
}

export function openStaticInquiryEmail(input: {
  kind: "contact" | "booking" | "quote";
  name: string;
  email: string;
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
}) {
  const label =
    input.kind === "booking"
      ? "inspection request"
      : input.kind === "quote"
        ? "written quote request"
        : "contact enquiry";
  const subject = input.subject || `New ${label} — ${input.name}`;
  const lines = [
    `New ${label} from The Auto Surgeon website`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    input.registration ? `Vehicle registration: ${input.registration}` : "",
    input.vehicle ? `Vehicle: ${input.vehicle}` : "",
    input.postcode ? `Postcode: ${input.postcode}` : "",
    input.service ? `Service: ${input.service}` : "",
    input.date ? `Preferred date: ${input.date}` : "",
    input.time ? `Preferred time: ${input.time}` : "",
    "",
    input.message ? `Message:\n${input.message}` : "",
    input.notes ? `Notes:\n${input.notes}` : "",
    "",
    `Reply to: ${input.email}`,
  ].filter(Boolean);
  const mailto = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = mailto;
  return `EMAIL-${Date.now().toString(36).toUpperCase()}`;
}
