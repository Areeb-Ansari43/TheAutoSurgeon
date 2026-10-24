import { TRPCClientError } from "@trpc/client";

const labels: Record<string, string> = {
  name: "full name",
  email: "email address",
  phone: "phone number",
  registration: "vehicle registration",
  vehicle: "vehicle make and model",
  postcode: "postcode",
  service: "service",
  date: "preferred date",
  time: "preferred time",
  notes: "notes",
  subject: "subject",
  message: "message",
  consent: "privacy agreement",
};
export function formError(error: unknown): string {
  const fallback =
    "We couldn’t save this request. Please try again or call the workshop.";
  if (!(error instanceof Error)) return fallback;
  if (error instanceof TRPCClientError) {
    const data = error.data as
      | { code?: string; zodError?: { fieldErrors?: Record<string, string[]> } }
      | undefined;
    if (data?.code === "INTERNAL_SERVER_ERROR") return fallback;
    const fields = data?.zodError?.fieldErrors;
    if (fields) {
      const issue = Object.entries(fields).find(([, values]) => values?.length);
      if (issue) {
        const [field, messages] = issue;
        const message = messages[0];
        return /^(Too (small|big)|Invalid (input|option)|Invalid string)/i.test(
          message
        )
          ? `Please check your ${labels[field] || "details"} and try again.`
          : message;
      }
    }
  }
  if (
    /failed to fetch|network|fetch failed|unexpected token|unexpected end of json|not valid json|http error/i.test(
      error.message
    )
  )
    return "The online form is temporarily unavailable. Check your connection and try again, or email admin@theautosurgeon.co.uk or call 07767 909397 for direct help.";
  if (error.message.trim().startsWith("[")) {
    try {
      const issues = JSON.parse(error.message) as { message?: string }[];
      return issues[0]?.message || fallback;
    } catch {
      return fallback;
    }
  }
  return error.message || fallback;
}
