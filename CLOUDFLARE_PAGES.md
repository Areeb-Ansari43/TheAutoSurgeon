## Inquiry email delivery

The full-stack server now sends two branded emails through Resend after a new Contact, quote or inspection submission is saved:

- An owner notification to `admin@theautosurgeon.co.uk`, with the customer details and a reply-to address.
- A confirmation to the customer’s submitted email address, including the reference, 24–48 hour response window, inbox guidance and spam-folder guidance.

The server reads `RESEND_API_KEY` at runtime. Keep this value in protected production environment configuration; never commit it to GitHub. The sending domain/address must be verified in Resend before production delivery. The static Cloudflare Pages build can display the forms and thank-you pages, but it cannot execute the database or email mutation by itself. To keep submissions and email delivery live, deploy the server/database build or proxy `/api/*` to the full-stack runtime.
