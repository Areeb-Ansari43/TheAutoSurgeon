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

type InquiryInput = {
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
};

export async function submitStaticInquiry(input: InquiryInput) {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const text = await response.text();
  let data: { reference?: string; error?: string } = {};
  try {
    data = text ? (JSON.parse(text) as typeof data) : {};
  } catch {
    throw new Error(
      `The enquiry service returned an invalid response. Please email ${business.email} directly.`
    );
  }
  if (!response.ok || !data.reference) {
    throw new Error(
      data.error ||
        `We could not send your enquiry. Please email ${business.email} directly.`
    );
  }
  return data.reference;
}
