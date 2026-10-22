import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const db = vi.hoisted(() => ({
  findAppointmentSubmission: vi.fn(),
  createAppointmentSubmission: vi.fn(),
  findInquirySubmission: vi.fn(),
  createInquirySubmission: vi.fn(),
  listMyAppointments: vi.fn(),
  listMyInquiries: vi.fn(),
  getCustomerProfile: vi.fn(),
  updateCustomerProfile: vi.fn(),
  listAdminRequests: vi.fn(),
  updateAppointmentStatus: vi.fn(),
  matchesIdempotencyRecord: vi.fn(),
}));

vi.mock("./db", () => db);
vi.mock("./publicRateLimit", () => ({
  consumePublicMutation: vi.fn(() => ({ allowed: true, retryAfterSeconds: 0 })),
}));

import { appRouter } from "./routers";

const user = {
  id: 73,
  openId: "user-73",
  name: "Jamie Driver",
  email: "jamie@example.com",
  loginMethod: "oauth",
  role: "user" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  lastSignedIn: new Date("2026-01-01T00:00:00.000Z"),
};

function caller(authenticated = true) {
  return appRouter.createCaller({
    user: authenticated ? user : null,
    req: {
      headers: { "user-agent": "vitest" },
      socket: { remoteAddress: "127.0.0.1" },
    },
    res: { clearCookie: vi.fn() },
  } as unknown as TrpcContext);
}

const inquiry = {
  name: "Jamie Driver",
  email: "other-address@example.com",
  phone: undefined,
  subject: "Question",
  message: "Please send a little more information.",
  consent: true as const,
  requestKey: "550e8400-e29b-41d4-a716-446655440000",
};

describe("inquiry account ownership", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    db.findInquirySubmission.mockResolvedValue(undefined);
    db.matchesIdempotencyRecord.mockReturnValue(true);
    db.createInquirySubmission.mockImplementation(async (input: { payloadHash: string; authBinding: string }) => ({
      reference: "IN-OWNED",
      status: "received",
      payloadHash: input.payloadHash,
      authBinding: input.authBinding,
      replayed: false,
    }));
  });

  it("uses only the authenticated user ID, never the submitted email, for an inquiry owner", async () => {
    await caller().inquiries.create(inquiry);

    expect(db.createInquirySubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        submission: expect.objectContaining({ email: "other-address@example.com" }),
        userId: user.id,
      })
    );
  });

  it("keeps guest inquiry ownership null", async () => {
    await caller(false).inquiries.create(inquiry);

    expect(db.createInquirySubmission).toHaveBeenCalledWith(expect.objectContaining({ userId: null }));
  });

  it("returns only records selected for the authenticated account and protects the history endpoint", async () => {
    const records = [
      {
        reference: "IN-OWNED",
        subject: "Question",
        message: "Please send a little more information.",
        status: "received" as const,
        createdAt: new Date("2026-01-02T00:00:00.000Z"),
      },
    ];
    db.listMyInquiries.mockResolvedValue(records);

    await expect(caller().inquiries.mine()).resolves.toEqual(records);
    expect(db.listMyInquiries).toHaveBeenCalledWith(user.id);
    await expect(caller(false).inquiries.mine()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});

describe("auth.me", () => {
  it("returns the minimal client-safe user DTO or null", async () => {
    await expect(caller().auth.me()).resolves.toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    await expect(caller(false).auth.me()).resolves.toBeNull();
  });
});
