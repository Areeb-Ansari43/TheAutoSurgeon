import { describe, expect, it } from "vitest";
import {
  appointmentInputSchema,
  appointmentPayloadHash,
  getPreferredAppointmentError,
  inquiryPayloadHash,
  requesterBinding,
} from "./business";

const requestKey = "550e8400-e29b-41d4-a716-446655440000";

function appointment(overrides: Record<string, unknown> = {}) {
  return {
    kind: "booking",
    name: "  Jamie Driver  ",
    email: " JAMIE@EXAMPLE.COM ",
    phone: "07700 900123",
    registration: " ab12 cde ",
    service: "Tyre Fitting",
    date: "2026-06-10",
    time: "10:30",
    consent: true,
    requestKey,
    ...overrides,
  };
}

describe("automotive request validation", () => {
  it("normalizes contact values and only accepts the service allowlist", () => {
    const parsed = appointmentInputSchema.parse(appointment({ kind: "quote", date: undefined, time: undefined }));
    expect(parsed.name).toBe("Jamie Driver");
    expect(parsed.email).toBe("jamie@example.com");
    expect(parsed.registration).toBe("AB12 CDE");

    const rejected = appointmentInputSchema.safeParse(
      appointment({ kind: "quote", date: undefined, time: undefined, service: "Mystery repair" })
    );
    expect(rejected.success).toBe(false);
  });

  it("requires booking requests to select an advertised preferred time", () => {
    const now = new Date("2026-06-10T08:45:00.000Z"); // 09:45 in London BST
    expect(
      getPreferredAppointmentError({ kind: "booking", date: "2026-06-10", time: "09:30" }, now)
    ).toContain("already passed");
    expect(
      getPreferredAppointmentError({ kind: "booking", date: "2026-06-10", time: "10:30" }, now)
    ).toBeNull();
    expect(
      getPreferredAppointmentError({ kind: "booking", date: "2026-06-10", time: undefined }, now)
    ).toContain("date and time");
  });

  it("rejects Sundays and dates beyond the 90-day Europe/London calendar window", () => {
    const now = new Date("2026-06-10T08:00:00.000Z");
    expect(
      getPreferredAppointmentError({ kind: "booking", date: "2026-06-14", time: "10:30" }, now)
    ).toContain("Sunday");
    expect(
      getPreferredAppointmentError({ kind: "booking", date: "2026-09-09", time: "10:30" }, now)
    ).toContain("90 days");
  });

  it("permits quotes without a preferred slot but requires date and time together", () => {
    const now = new Date("2026-06-10T08:00:00.000Z");
    expect(getPreferredAppointmentError({ kind: "quote", date: undefined, time: undefined }, now)).toBeNull();
    expect(getPreferredAppointmentError({ kind: "quote", date: "2026-06-11", time: undefined }, now)).toContain(
      "both"
    );
  });
});

describe("idempotency primitives", () => {
  it("changes the payload hash when submission content changes", () => {
    const first = appointmentInputSchema.parse(appointment({ kind: "quote", date: undefined, time: undefined }));
    const changed = appointmentInputSchema.parse(
      appointment({ kind: "quote", date: undefined, time: undefined, notes: "Please call after 5pm" })
    );
    expect(appointmentPayloadHash(first)).not.toBe(appointmentPayloadHash(changed));
    expect(inquiryPayloadHash({
      name: "Jamie",
      email: "jamie@example.com",
      subject: "Question",
      message: "Please send a little more information.",
      consent: true,
      requestKey,
    })).toHaveLength(64);
  });

  it("binds anonymous submissions without trusting a forwarded-IP header", () => {
    const first = requesterBinding({ userId: null, remoteAddress: "203.0.113.5", userAgent: "Browser A" });
    const differentPeer = requesterBinding({ userId: null, remoteAddress: "203.0.113.6", userAgent: "Browser A" });
    const signedIn = requesterBinding({ userId: 42, remoteAddress: "ignored", userAgent: "ignored" });
    expect(first).not.toBe(differentPeer);
    expect(signedIn).toHaveLength(64);
  });
});
