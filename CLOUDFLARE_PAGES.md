## Resend inquiry delivery

The Cloudflare Pages deployment now uses `functions/api/inquiry.ts` for Contact, inspection and quote forms. The function sends two emails through Resend after a successful submission:

- Owner notification: `forms@theautosurgeon.co.uk` → `admin@theautosurgeon.co.uk`, with the customer details and reply-to address.
- Customer confirmation: `forms@theautosurgeon.co.uk` → the customer’s submitted email, confirming receipt and the 24–48 hour response window.

In Cloudflare Pages, add `RESEND_API_KEY` as an encrypted production environment variable. The Resend domain `theautosurgeon.co.uk` must be verified, and `forms@theautosurgeon.co.uk` must be an allowed sender. Do not put the key in GitHub or browser code.

The frontend waits for `/api/inquiry` to return a successful reference before redirecting to `/thank-you`. If Resend rejects the message, the customer stays on the form and receives a clear retry/contact message instead of a false success page.
