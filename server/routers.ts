import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  appointmentInputSchema,
  appointmentPayloadHash,
  appointmentStatusSchema,
  inquiryInputSchema,
  inquiryPayloadHash,
  profileInputSchema,
  requesterBinding,
} from "./business";
import { getSessionCookieOptions } from "./_core/cookies";
import type { TrpcContext } from "./_core/context";
import { systemRouter } from "./_core/systemRouter";
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
  router,
} from "./_core/trpc";
import * as db from "./db";
import { consumePublicMutation } from "./publicRateLimit";
import { sendSubmissionEmails } from "./email";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) =>
      ctx.user
        ? {
            id: ctx.user.id,
            name: ctx.user.name,
            email: ctx.user.email,
            role: ctx.user.role,
          }
        : null
    ),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  appointments: router({
    create: publicProcedure
      .input(appointmentInputSchema)
      .mutation(async ({ ctx, input }) => {
        const payloadHash = appointmentPayloadHash(input);
        const authBinding = requestBinding(ctx);
        const existing = await db.findAppointmentSubmission(input.requestKey);

        if (existing)
          return existingAppointmentResponse(
            existing,
            payloadHash,
            authBinding
          );

        consumeOrThrow("appointment", authBinding);
        const created = await db.createAppointmentSubmission({
          submission: input,
          // Never associate a guest request with an account based on email.
          userId: ctx.user?.id ?? null,
          payloadHash,
          authBinding,
        });
        await sendSubmissionEmails({
          kind: input.kind,
          reference: created.reference,
          input,
        });
        return existingAppointmentResponse(created, payloadHash, authBinding);
      }),
    mine: protectedProcedure.query(({ ctx }) =>
      db.listMyAppointments(ctx.user.id)
    ),
  }),

  inquiries: router({
    create: publicProcedure
      .input(inquiryInputSchema)
      .mutation(async ({ ctx, input }) => {
        const payloadHash = inquiryPayloadHash(input);
        const authBinding = requestBinding(ctx);
        const existing = await db.findInquirySubmission(input.requestKey);

        if (existing)
          return existingInquiryResponse(existing, payloadHash, authBinding);

        consumeOrThrow("inquiry", authBinding);
        const created = await db.createInquirySubmission({
          submission: input,
          // Never associate a guest enquiry with an account based on email.
          userId: ctx.user?.id ?? null,
          payloadHash,
          authBinding,
        });
        await sendSubmissionEmails({
          kind: "contact",
          reference: created.reference,
          input,
        });
        return existingInquiryResponse(created, payloadHash, authBinding);
      }),
    mine: protectedProcedure.query(({ ctx }) =>
      db.listMyInquiries(ctx.user.id)
    ),
  }),

  account: router({
    profile: protectedProcedure.query(({ ctx }) =>
      db.getCustomerProfile(ctx.user.id)
    ),
    updateProfile: protectedProcedure
      .input(profileInputSchema)
      .mutation(async ({ ctx, input }) => {
        await db.updateCustomerProfile(ctx.user.id, input);
        return { success: true } as const;
      }),
  }),

  admin: router({
    requests: adminProcedure.query(() => db.listAdminRequests()),
    updateStatus: adminProcedure
      .input(
        z
          .object({
            reference: z
              .string()
              .trim()
              .min(4)
              .max(40)
              .regex(/^AS-[A-F0-9]+$/),
            status: appointmentStatusSchema,
          })
          .strict()
      )
      .mutation(async ({ input }) => {
        const updated = await db.updateAppointmentStatus(
          input.reference,
          input.status
        );
        if (!updated) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Appointment request not found.",
          });
        }
        // Confirmation only records the manager's decision. It deliberately does
        // not claim an email, SMS, or any other notification was sent.
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;

function requestBinding(ctx: TrpcContext): string {
  const userAgent = ctx.req.headers["user-agent"];
  return requesterBinding({
    userId: ctx.user?.id ?? null,
    // Use the direct transport peer only. Do not accept X-Forwarded-For or a
    // caller-controlled header as an anonymous identity or rate-limit key.
    remoteAddress: ctx.req.socket?.remoteAddress,
    userAgent: typeof userAgent === "string" ? userAgent : undefined,
  });
}

function consumeOrThrow(operation: "appointment" | "inquiry", binding: string) {
  const rate = consumePublicMutation(operation, binding);
  if (!rate.allowed) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Too many submissions. Please wait about ${rate.retryAfterSeconds} seconds before trying again.`,
    });
  }
}

function existingAppointmentResponse(
  record: NonNullable<Awaited<ReturnType<typeof db.findAppointmentSubmission>>>,
  payloadHash: string,
  authBinding: string
) {
  if (!db.matchesIdempotencyRecord(record, payloadHash, authBinding)) {
    // Do not leak the other caller's reference when a request key is replayed.
    throw new TRPCError({
      code: "CONFLICT",
      message: "That submission key is already in use.",
    });
  }
  return {
    reference: record.reference,
    status: record.status,
    kind: record.kind,
  };
}

function existingInquiryResponse(
  record: NonNullable<Awaited<ReturnType<typeof db.findInquirySubmission>>>,
  payloadHash: string,
  authBinding: string
) {
  if (!db.matchesIdempotencyRecord(record, payloadHash, authBinding)) {
    // Do not leak the other caller's reference when a request key is replayed.
    throw new TRPCError({
      code: "CONFLICT",
      message: "That submission key is already in use.",
    });
  }
  return { reference: record.reference, status: "received" as const };
}
