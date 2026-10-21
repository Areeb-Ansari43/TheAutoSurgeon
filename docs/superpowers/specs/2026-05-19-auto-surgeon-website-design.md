# The Auto Surgeon — Marketing Website Design Spec

**Date:** 2026-05-19
**Status:** Approved
**Deployment target:** Cloudflare Pages

---

## Overview

A single-page marketing website for The Auto Surgeon, an automotive specialist in Hayes, UB3. The site is a production implementation of the prototype at `the-auto-surgeon-design-system/project/ui_kits/website/`. It must be deployable to Cloudflare Pages with no build step and must include a fully working WhatsApp booking wizard.

---

## File Structure

```
website/
├── index.html          # Complete page — CSS inlined in <style>, JS in <script>
└── assets/
    ├── brand/
    │   └── auto-surgeon-logo.svg
    └── photos/
        ├── hero-orange-caliper.jpg   (hero + brakes card)
        ├── wheel-alignment.jpg
        ├── tyre-dunlop-dark.jpg
        ├── engine-oil-pour.jpg
        ├── diagnostics-tablet.jpg
        └── tesla-wheel.jpg
```

Assets are copied from `the-auto-surgeon-design-system/project/assets/` into `website/assets/`. No external asset hosting; everything is committed to the repo.

---

## Page Sections

Rendered top-to-bottom in this order:

| Section | ID | Notes |
|---|---|---|
| Fixed nav | `#top` | Frosted glass on scroll, mobile hamburger |
| Hero | `#top` | Orange-caliper photo, two CTAs |
| Services | `#services` | 6-card grid, click-to-activate |
| Price list | `#pricing` | Labour prices table, quote CTA |
| Tyre tiers | `#tyres` | 5 cards with bar ratings |
| Testimonials | `#about` | 3 review cards |
| Contact + map | `#contact` | Map embed, directions grid |
| Footer | — | 3-column links, copyright bar |
| Booking modal | — | Overlay, JS-controlled |

---

## Styling

All design tokens from `colors_and_type.css` and all site styles from `site.css` are **inlined** into `<style>` in `index.html`. No external stylesheets. Google Fonts loaded via `<link>` (Orbitron, Rajdhani, Montserrat, JetBrains Mono).

---

## JavaScript

A single `<script>` at the bottom of `<body>`. Vanilla JS, no framework, no build step. Responsibilities:

1. **Nav scroll effect** — toggle `.is-scrolled` class on `window.scroll`.
2. **Service grid** — event delegation on the grid container; click a card to move `.svc--active`.
3. **Booking modal** — state object + render function (see below).

All user-supplied values are set via safe DOM methods (`.value`, `.textContent`) — never concatenated into `innerHTML`. Static structural HTML in the modal is built from trusted string templates; only user data goes through DOM properties.

---

## Booking Modal

### Modes
- `booking` — 4 steps: VEHICLE → SERVICE → SLOT → CONFIRM
- `quote` — 3 steps: VEHICLE → SERVICE → CONFIRM

### State object
```js
{
  mode: 'booking' | 'quote',
  step: 0–3,
  reg: '',        // uppercased on input
  postcode: '',   // uppercased on input
  email: '',      // quote mode only
  notes: '',
  service: 'Wheel Alignment',   // always pre-selected
  slot: '10:30'                 // always pre-selected
}
```

### Validation
- **VEHICLE step only:** "Continue" is disabled until `reg.trim()` is non-empty.
- **SERVICE and SLOT steps:** always have a pre-selection, so Continue is always enabled.
- Disabled Continue: `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none`.

### Slot availability
Static time slots: `09:30, 10:30, 11:30, 13:00, 14:00, 15:30, 16:30`. No real-time availability check. The confirm step includes the note: *"We'll confirm your slot by WhatsApp — if unavailable we'll offer the next one."*

### On confirm
Builds a `wa.me/447767909397?text=...` URL with the booking details pre-filled, opens it in a new tab (`noopener, noreferrer`), then closes the modal.

### UX details
- Clicking the backdrop closes the modal.
- Escape key closes the modal.
- `document.body.style.overflow = 'hidden'` while open.
- Input state is synced to the JS state object on every `input` event (not just on Continue), so going Back preserves what the user typed.

---

## CTAs that open the modal

| Element | Mode |
|---|---|
| Nav "Book Inspection" button | `booking` |
| Hero "Book Your Vehicle Inspection" button | `booking` |
| Contact "Book Inspection" button | `booking` |
| Price list "Request Written Quote" button | `quote` |

---

## Cloudflare Pages Deployment

- **Publish directory:** `website/`
- **Build command:** *(none)*
- **Build output directory:** `website/`
- Local preview: open `website/index.html` directly in a browser (works from `file://`).
- Custom domain wired in the Cloudflare Pages dashboard — no code changes required.
- No `_redirects`, `_headers`, or `_worker.js` files needed for the MVP.

---

## Out of scope

- Real-time slot availability (no backend, no Cloudflare KV).
- Multiple pages or routing.
- CMS or editable content.
- Analytics (can be added later via a Cloudflare snippet).
- Email notifications.
- Any feature from the admin portal (CLAUDE.md).
