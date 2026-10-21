import {
  char,
  date,
  foreignKey,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Customer-owned details that are separate from the identity data supplied by OAuth. */
export const customerProfiles = mysqlTable(
  "customer_profiles",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    phone: varchar("phone", { length: 32 }),
    postcode: varchar("postcode", { length: 16 }),
    vehicle: varchar("vehicle", { length: 120 }),
    registration: varchar("registration", { length: 16 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("customer_profiles_userId_unique").on(table.userId),
    index("customer_profiles_registration_idx").on(table.registration),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "customer_profiles_userId_users_id_fk",
    }).onDelete("cascade"),
  ]
);

/**
 * A service booking or quote request. A preferred date/time is a request only;
 * no schema constraint models it as an available or reserved live slot.
 */
export const appointments = mysqlTable(
  "appointments",
  {
    id: int("id").autoincrement().primaryKey(),
    reference: varchar("reference", { length: 40 }).notNull(),
    kind: mysqlEnum("kind", ["booking", "quote"]).notNull(),
    userId: int("userId"),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 32 }).notNull(),
    registration: varchar("registration", { length: 16 }).notNull(),
    vehicle: varchar("vehicle", { length: 120 }),
    postcode: varchar("postcode", { length: 16 }),
    service: varchar("service", { length: 80 }).notNull(),
    preferredDate: date("preferredDate", { mode: "string" }),
    preferredTime: varchar("preferredTime", { length: 5 }),
    notes: text("notes"),
    status: mysqlEnum("status", ["requested", "confirmed", "completed", "cancelled"])
      .default("requested")
      .notNull(),
    consentAt: timestamp("consentAt").notNull(),
    requestKey: varchar("requestKey", { length: 36 }).notNull(),
    payloadHash: char("payloadHash", { length: 64 }).notNull(),
    authBinding: char("authBinding", { length: 64 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("appointments_reference_unique").on(table.reference),
    uniqueIndex("appointments_requestKey_unique").on(table.requestKey),
    index("appointments_user_created_idx").on(table.userId, table.createdAt),
    index("appointments_status_created_idx").on(table.status, table.createdAt),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "appointments_userId_users_id_fk",
    }).onDelete("set null"),
  ]
);

/** Persistent contact enquiries; they are distinct from vehicle service requests. */
export const inquiries = mysqlTable(
  "inquiries",
  {
    id: int("id").autoincrement().primaryKey(),
    reference: varchar("reference", { length: 40 }).notNull(),
    userId: int("userId"),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 32 }),
    subject: varchar("subject", { length: 160 }).notNull(),
    message: text("message").notNull(),
    status: mysqlEnum("status", ["received"]).default("received").notNull(),
    consentAt: timestamp("consentAt").notNull(),
    requestKey: varchar("requestKey", { length: 36 }).notNull(),
    payloadHash: char("payloadHash", { length: 64 }).notNull(),
    authBinding: char("authBinding", { length: 64 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("inquiries_reference_unique").on(table.reference),
    uniqueIndex("inquiries_requestKey_unique").on(table.requestKey),
    index("inquiries_user_created_idx").on(table.userId, table.createdAt),
    index("inquiries_status_created_idx").on(table.status, table.createdAt),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "inquiries_userId_users_id_fk",
    }).onDelete("set null"),
  ]
);

export type Appointment = typeof appointments.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
