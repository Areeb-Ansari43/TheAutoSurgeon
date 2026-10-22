# The Auto Surgeon

A full-stack extension of Areeb-Ansari43/TheAutoSurgeon. The original black/orange brand, logo, photos, fonts and labour prices are retained. Navigation is a responsive floating capsule, and every service has a dedicated information-rich page.

React 19, TypeScript and Vite serve the interactive frontend. Express/tRPC handle requests, while Drizzle/MySQL persist profiles, appointments, quote requests and contact inquiries. Public pages render complete initial HTML from the same React components used in the browser. Missing pages return HTTP 404.

## Structure

`client/src/pages/` contains Home, Services, Information, Request, Contact and Account. `client/src/components/Site.tsx` contains the floating island and footer. `shared/catalog.ts`, `shared/guides.ts` and `shared/routes.ts` contain business content and route metadata. `server/routers.ts`, `server/business.ts`, `server/db.ts` and `drizzle/` connect validation, permissions, database queries and additive migrations. `server/_core/` retains platform OAuth and adds public React server rendering. `CONTENT_SOURCES.md` records the original business details and maintenance sources.

## Run and deploy

Use Node 22 with pinned pnpm 10.18.0. Install with `pnpm install --frozen-lockfile`, then run `pnpm dev` on `PORT` (default 3000). Run `pnpm check`, `pnpm test` and `pnpm build` for the existing checks. `pnpm start` serves the production build. The Dockerfile installs pinned dependencies, builds frontend/backend and starts the listener. `/api/health` is the health endpoint. `node scripts/check-routes.mjs` performs read-only page and asset checks against the local service.

A static-only GitHub Pages deployment cannot run this backend. Use the supplied Dockerfile or Manus hosting. Private credentials belong in environment configuration, never a committed `.env` file.

On a fresh database provide private `DATABASE_URL`, then run `pnpm db:migrate` before sending traffic. The task's managed database already has the additive migrations applied, with no dummy customer records. Development and production share that managed database; do not use it as a disposable testing database.

## Customer accounts

Manus OAuth is the default account provider. First sign-in creates an ordinary customer account. The environment supplies `MANUS_PROJECT_ID`, `MANUS_OAUTH_PORTAL_URL`, `MANUS_OAUTH_API_URL` and `MANUS_JWT_SECRET`; a standalone deployment must configure these through a compatible OAuth deployment. JWT validation checks project identity and expiry. Application session cookies use `SameSite=None; Secure` for HTTPS embedded Preview.

Signed-in appointment/quote requests associate with the authenticated account. Guests can submit requests, but matching an email never silently links guest data to a new account. Customers view their linked history and edit contact/vehicle profile details. Profile edits do not change existing request records or the OAuth identity.

## Workshop owner access

`/manage` requires the authenticated user's `admin` role. Configure private server environment variable `OWNER_OPEN_ID` to the actual Manus `openId` of the business owner, then sign in as that identity. No first-user promotion, client-side role editing or development bypass is implemented. `OWNER_OPEN_ID` was absent from the task environment, so owner access remains intentionally unconfigured instead of granting customer-record access to an arbitrary visitor.

Authorized staff can review appointment/quote/contact requests and record appointment status. Status changes persist a manager decision only; agree the visit with the customer separately.

## Request behaviour

Booking requests require contact/vehicle details, an allowlisted service, a Monday–Saturday preferred date within 90 days, and an advertised future time. Quote requests need no date. All submissions persist opaque references. Appointments begin awaiting confirmation; there is no claimed live availability, confirmed slot or live tyre stock. Public forms have client/server validation, bounded rate limiting and payload-bound idempotency.

Customer email/SMS/automatic notifications were not selected and are not implemented. Submission screens state this; they do not pretend an email was sent. Keep the reference and contact the workshop for follow-up.

## Public metadata and original design

Configure `PUBLIC_SITE_URL` to the actual HTTPS production origin to enable absolute canonical/social URL tags and the application sitemap. No internal or guessed domain is used. `/manus-routes.json` lists the 19 source routes, including service/guide patterns. Account, manager and request pages are not indexed.

Optimized PNG/WebP copies preserve the supplied artwork; original SVG/JPG assets remain intact. Customer quotes were supplied on the original website, not independently verified or presented as an aggregate Google rating. Opening hours follow the original contact section: Monday–Saturday 9 AM–6 PM, Sunday by direct appointment. The old footer's conflicting Sunday text was corrected. Published prices are labour only except the £60 TPMS sensor change, which includes the part.
