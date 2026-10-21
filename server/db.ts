import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { randomBytes } from "node:crypto";
import {
  appointments,
  customerProfiles,
  inquiries,
  type InsertUser,
  users,
} from "../drizzle/schema";
import type {
  AppointmentSubmissionInput,
  InquirySubmissionInput,
  ProfileInput,
} from "./business";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    // Only the configured owner identity can be promoted by provisioning.
    // In particular, a caller-supplied role must never turn an arbitrary first
    // sign-in into the business administrator.
    if (ENV.ownerOpenId && user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

type AppointmentReplayRecord = {
  reference: string;
  kind: "booking" | "quote";
  status: "requested" | "confirmed" | "completed" | "cancelled";
  payloadHash: string;
  authBinding: string;
};

type InquiryReplayRecord = {
  reference: string;
  status: "received";
  payloadHash: string;
  authBinding: string;
};

export type AppointmentSubmissionResult = AppointmentReplayRecord & {
  replayed: boolean;
};

export type InquirySubmissionResult = InquiryReplayRecord & {
  replayed: boolean;
};

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db;
}

export async function findAppointmentSubmission(requestKey: string): Promise<AppointmentReplayRecord | undefined> {
  const db = await requireDb();
  const rows = await db
    .select({
      reference: appointments.reference,
      kind: appointments.kind,
      status: appointments.status,
      payloadHash: appointments.payloadHash,
      authBinding: appointments.authBinding,
    })
    .from(appointments)
    .where(eq(appointments.requestKey, requestKey))
    .limit(1);
  return rows[0];
}

export async function createAppointmentSubmission(input: {
  submission: AppointmentSubmissionInput;
  userId: number | null;
  payloadHash: string;
  authBinding: string;
}): Promise<AppointmentSubmissionResult> {
  const db = await requireDb();

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const reference = newReference("AS");
      await db.insert(appointments).values({
        reference,
        kind: input.submission.kind,
        userId: input.userId,
        name: input.submission.name,
        email: input.submission.email,
        phone: input.submission.phone,
        registration: input.submission.registration,
        vehicle: input.submission.vehicle ?? null,
        postcode: input.submission.postcode ?? null,
        service: input.submission.service,
        preferredDate: input.submission.date ?? null,
        preferredTime: input.submission.time ?? null,
        notes: input.submission.notes ?? null,
        status: "requested",
        consentAt: new Date(),
        requestKey: input.submission.requestKey,
        payloadHash: input.payloadHash,
        authBinding: input.authBinding,
      });
      return {
        reference,
        kind: input.submission.kind,
        status: "requested",
        payloadHash: input.payloadHash,
        authBinding: input.authBinding,
        replayed: false,
      };
    } catch (error) {
      if (!isDuplicateKeyError(error)) throw error;
      const existing = await findAppointmentSubmission(input.submission.requestKey);
      if (existing) return { ...existing, replayed: true };
      // A vanishingly unlikely reference collision has no request-key row; retry
      // with a fresh opaque reference rather than surfacing an implementation detail.
    }
  }
  throw new Error("Unable to create appointment request");
}

export async function findInquirySubmission(requestKey: string): Promise<InquiryReplayRecord | undefined> {
  const db = await requireDb();
  const rows = await db
    .select({
      reference: inquiries.reference,
      status: inquiries.status,
      payloadHash: inquiries.payloadHash,
      authBinding: inquiries.authBinding,
    })
    .from(inquiries)
    .where(eq(inquiries.requestKey, requestKey))
    .limit(1);
  return rows[0];
}

export async function createInquirySubmission(input: {
  submission: InquirySubmissionInput;
  userId: number | null;
  payloadHash: string;
  authBinding: string;
}): Promise<InquirySubmissionResult> {
  const db = await requireDb();

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const reference = newReference("IN");
      await db.insert(inquiries).values({
        reference,
        userId: input.userId,
        name: input.submission.name,
        email: input.submission.email,
        phone: input.submission.phone ?? null,
        subject: input.submission.subject,
        message: input.submission.message,
        status: "received",
        consentAt: new Date(),
        requestKey: input.submission.requestKey,
        payloadHash: input.payloadHash,
        authBinding: input.authBinding,
      });
      return {
        reference,
        status: "received",
        payloadHash: input.payloadHash,
        authBinding: input.authBinding,
        replayed: false,
      };
    } catch (error) {
      if (!isDuplicateKeyError(error)) throw error;
      const existing = await findInquirySubmission(input.submission.requestKey);
      if (existing) return { ...existing, replayed: true };
    }
  }
  throw new Error("Unable to create enquiry");
}

export function matchesIdempotencyRecord(
  record: Pick<AppointmentReplayRecord | InquiryReplayRecord, "payloadHash" | "authBinding">,
  payloadHash: string,
  authBinding: string
): boolean {
  return record.payloadHash === payloadHash && record.authBinding === authBinding;
}

export async function listMyAppointments(userId: number) {
  const db = await requireDb();
  return db
    .select({
      reference: appointments.reference,
      kind: appointments.kind,
      service: appointments.service,
      registration: appointments.registration,
      date: appointments.preferredDate,
      time: appointments.preferredTime,
      status: appointments.status,
      createdAt: appointments.createdAt,
      notes: appointments.notes,
    })
    .from(appointments)
    .where(eq(appointments.userId, userId))
    .orderBy(desc(appointments.createdAt));
}

export async function listMyInquiries(userId: number) {
  const db = await requireDb();
  return db
    .select({
      reference: inquiries.reference,
      subject: inquiries.subject,
      message: inquiries.message,
      status: inquiries.status,
      createdAt: inquiries.createdAt,
    })
    .from(inquiries)
    .where(eq(inquiries.userId, userId))
    .orderBy(desc(inquiries.createdAt));
}

export async function getCustomerProfile(userId: number) {
  const db = await requireDb();
  const rows = await db
    .select({
      name: users.name,
      email: users.email,
      phone: customerProfiles.phone,
      postcode: customerProfiles.postcode,
      vehicle: customerProfiles.vehicle,
      registration: customerProfiles.registration,
    })
    .from(users)
    .leftJoin(customerProfiles, eq(customerProfiles.userId, users.id))
    .where(eq(users.id, userId))
    .limit(1);
  const profile = rows[0];
  return {
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    postcode: profile?.postcode ?? "",
    vehicle: profile?.vehicle ?? "",
    registration: profile?.registration ?? "",
  };
}

export async function updateCustomerProfile(userId: number, input: ProfileInput): Promise<void> {
  const db = await requireDb();
  await db.transaction(async tx => {
    await tx.update(users).set({ name: input.name, email: input.email }).where(eq(users.id, userId));
    await tx
      .insert(customerProfiles)
      .values({
        userId,
        phone: input.phone ?? null,
        postcode: input.postcode ?? null,
        vehicle: input.vehicle ?? null,
        registration: input.registration ?? null,
      })
      .onDuplicateKeyUpdate({
        set: {
          phone: input.phone ?? null,
          postcode: input.postcode ?? null,
          vehicle: input.vehicle ?? null,
          registration: input.registration ?? null,
        },
      });
  });
}

export async function listAdminRequests() {
  const db = await requireDb();
  const [appointmentRows, inquiryRows] = await Promise.all([
    db
      .select({
        reference: appointments.reference,
        kind: appointments.kind,
        name: appointments.name,
        email: appointments.email,
        phone: appointments.phone,
        registration: appointments.registration,
        vehicle: appointments.vehicle,
        postcode: appointments.postcode,
        service: appointments.service,
        date: appointments.preferredDate,
        time: appointments.preferredTime,
        notes: appointments.notes,
        status: appointments.status,
        createdAt: appointments.createdAt,
        updatedAt: appointments.updatedAt,
      })
      .from(appointments)
      .orderBy(desc(appointments.createdAt)),
    db
      .select({
        reference: inquiries.reference,
        name: inquiries.name,
        email: inquiries.email,
        phone: inquiries.phone,
        subject: inquiries.subject,
        message: inquiries.message,
        status: inquiries.status,
        createdAt: inquiries.createdAt,
        updatedAt: inquiries.updatedAt,
      })
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt)),
  ]);
  return { appointments: appointmentRows, inquiries: inquiryRows };
}

export async function updateAppointmentStatus(
  reference: string,
  status: "requested" | "confirmed" | "completed" | "cancelled"
): Promise<boolean> {
  const db = await requireDb();
  const existing = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(eq(appointments.reference, reference))
    .limit(1);
  if (!existing[0]) return false;
  await db.update(appointments).set({ status }).where(eq(appointments.reference, reference));
  return true;
}

function newReference(prefix: "AS" | "IN"): string {
  return `${prefix}-${randomBytes(12).toString("hex").toUpperCase()}`;
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "ER_DUP_ENTRY"
  );
}
