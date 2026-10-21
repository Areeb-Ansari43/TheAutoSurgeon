import { createHash } from "node:crypto";
import { z } from "zod";

export const AUTOMOTIVE_SERVICES = [
  "Tyre Fitting",
  "Tyre Puncture Repair",
  "Wheel Alignment",
  "Tesla Wheel Alignment",
  "Brake Pads",
  "Front Brake Discs & Pads",
  "Rear Brake Discs & Pads",
  "Engine Oil Service",
  "Full Oil Service",
  "Auto Diagnostics",
  "TPMS Sensor Change",
  "Gearbox Service",
  "Suspension Repair",
  "MOT Inquiry",
  "Other",
] as const;

export const APPOINTMENT_STATUSES = [
  "requested",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export const APPOINTMENT_TIMES = [
  "09:30",
  "10:30",
  "11:30",
  "13:00",
  "14:00",
  "15:30",
  "16:30",
] as const;

const emailSchema = z.string().trim().toLowerCase().min(3).max(320).email();
const phoneSchema = z
  .string()
  .trim()
  .min(7)
  .max(32)
  .regex(/^[0-9+().\-\s]+$/, "Enter a valid phone number.");
const registrationSchema = z
  .string()
  .trim()
  .toUpperCase()
  .min(2)
  .max(16)
  .regex(/^[A-Z0-9 ]+$/, "Enter a valid vehicle registration.");

function optionalTrimmedText(maximum: number, minimum = 1) {
  return z.preprocess(
    value => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().min(minimum).max(maximum).optional()
  );
}

const optionalPostcodeSchema = z.preprocess(
  value => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim().toUpperCase();
    return trimmed.length === 0 ? undefined : trimmed;
  },
  z
    .string()
    .min(3)
    .max(16)
    .regex(/^[A-Z0-9 -]+$/, "Enter a valid postcode.")
    .optional()
);

const optionalRegistrationSchema = z.preprocess(
  value => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim().toUpperCase();
    return trimmed.length === 0 ? undefined : trimmed;
  },
  z
    .string()
    .min(2)
    .max(16)
    .regex(/^[A-Z0-9 ]+$/, "Enter a valid vehicle registration.")
    .optional()
);

const optionalDateSchema = optionalTrimmedText(10, 10);
const optionalTimeSchema = optionalTrimmedText(5, 5);

const appointmentBaseInputSchema = z
  .object({
    kind: z.enum(["booking", "quote"]),
    name: z.string().trim().min(2).max(100),
    email: emailSchema,
    phone: phoneSchema,
    registration: registrationSchema,
    vehicle: optionalTrimmedText(120, 2),
    postcode: optionalPostcodeSchema,
    service: z.enum(AUTOMOTIVE_SERVICES),
    date: optionalDateSchema,
    time: optionalTimeSchema,
    notes: optionalTrimmedText(2000),
    consent: z.literal(true),
    requestKey: z.string().uuid(),
  })
  .strict();

export type AppointmentSubmissionInput = z.output<typeof appointmentBaseInputSchema>;

/**
 * Returns a user-facing validation message for a preferred appointment request.
 * Dates are interpreted as Europe/London calendar dates rather than UTC instants.
 */
export function getPreferredAppointmentError(
  input: Pick<AppointmentSubmissionInput, "kind" | "date" | "time">,
  now = new Date()
): string | null {
  const hasDate = Boolean(input.date);
  const hasTime = Boolean(input.time);

  if (input.kind === "booking" && (!hasDate || !hasTime)) {
    return "Choose a preferred date and time for a booking request.";
  }
  if (input.kind === "quote" && hasDate !== hasTime) {
    return "Choose both a preferred date and time, or leave both blank for a quote request.";
  }
  if (!hasDate || !hasTime) return null;

  if (!isIsoCalendarDate(input.date!)) {
    return "Preferred date must be a valid date in YYYY-MM-DD format.";
  }
  if (!APPOINTMENT_TIMES.includes(input.time! as (typeof APPOINTMENT_TIMES)[number])) {
    return "Choose one of the advertised preferred times.";
  }

  const london = londonCalendarParts(now);
  const today = `${london.year}-${london.month}-${london.day}`;
  const latest = addCalendarDays(today, 90);

  if (input.date! < today) {
    return "Preferred date cannot be in the past.";
  }
  if (input.date! > latest) {
    return "Preferred date must be within the next 90 days.";
  }
  if (new Date(`${input.date}T12:00:00.000Z`).getUTCDay() === 0) {
    return "Sunday appointments are unavailable.";
  }
  if (input.date === today && input.time! <= `${london.hour}:${london.minute}`) {
    return "Preferred time has already passed today.";
  }

  return null;
}

export const appointmentInputSchema = appointmentBaseInputSchema.superRefine((input, ctx) => {
  const error = getPreferredAppointmentError(input);
  if (error) {
    ctx.addIssue({
      code: "custom",
      message: error,
      path: error.includes("time") ? ["time"] : ["date"],
    });
  }
});

export const inquiryInputSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: emailSchema,
    phone: z.preprocess(
      value => {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        return trimmed.length === 0 ? undefined : trimmed;
      },
      phoneSchema.optional()
    ),
    subject: z.string().trim().min(3).max(160),
    message: z.string().trim().min(10).max(4000),
    consent: z.literal(true),
    requestKey: z.string().uuid(),
  })
  .strict();

export type InquirySubmissionInput = z.output<typeof inquiryInputSchema>;

export const profileInputSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: emailSchema,
    phone: z.preprocess(
      value => {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        return trimmed.length === 0 ? undefined : trimmed;
      },
      phoneSchema.optional()
    ),
    postcode: optionalPostcodeSchema,
    vehicle: optionalTrimmedText(120, 2),
    registration: optionalRegistrationSchema,
  })
  .strict();

export type ProfileInput = z.output<typeof profileInputSchema>;

export const appointmentStatusSchema = z.enum(APPOINTMENT_STATUSES);

export function appointmentPayloadHash(input: AppointmentSubmissionInput): string {
  return stableHash({
    kind: input.kind,
    name: input.name,
    email: input.email,
    phone: input.phone,
    registration: input.registration,
    vehicle: input.vehicle ?? null,
    postcode: input.postcode ?? null,
    service: input.service,
    date: input.date ?? null,
    time: input.time ?? null,
    notes: input.notes ?? null,
    consent: input.consent,
    requestKey: input.requestKey,
  });
}

export function inquiryPayloadHash(input: InquirySubmissionInput): string {
  return stableHash({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    subject: input.subject,
    message: input.message,
    consent: input.consent,
    requestKey: input.requestKey,
  });
}

/**
 * The binding is a SHA-256 digest, so personal networking data is not retained.
 * Anonymous callers are deliberately identified from the direct socket peer, never
 * from a spoofable forwarded-IP request header.
 */
export function requesterBinding(input: {
  userId: number | null;
  remoteAddress: string | undefined;
  userAgent: string | undefined;
}): string {
  if (input.userId !== null) return stableHash({ version: 1, userId: input.userId });
  return stableHash({
    version: 1,
    guest: true,
    remoteAddress: input.remoteAddress ?? "unavailable",
    userAgent: input.userAgent ?? "unavailable",
  });
}

export function stableHash(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function londonCalendarParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(
    parts
      .filter(part => part.type !== "literal")
      .map(part => [part.type, part.value])
  ) as Record<string, string>;
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
  };
}

function addCalendarDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const value = new Date(Date.UTC(year!, month! - 1, day! + days));
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}`;
}

function isIsoCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
