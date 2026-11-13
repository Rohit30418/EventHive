# EventHive marketing homepage — agency design implementation

This document describes the **current** marketing page mounted by `src/pages/Home.tsx`. The earlier `Home2026.tsx` and its stylesheet remain in the repository as unmounted design history; **AgencyHome.tsx** is the active homepage.

## Architecture and code

| File | Purpose |
|---|---|
| `src/pages/home/AgencyHome.tsx` | 12 custom-designed marketing sections with specific product UI compositions |
| `src/pages/home/agency-home.css` | Scoped 12-column layout, mobile responsive spacing, dark mode and custom card styling |
| `src/data/assetSlots.ts` | Central source for every image slot, size, alt, tone and focal point |
| `src/components/media/AssetSlot.tsx` + `AssetSlot.css` | Stable aspect-ratio responsive frames; one-line src replacement |
| `src/pages/home/agency/ContactForm.tsx` | Actual contact endpoint integration with validation and accurate success/error messages |
| `functions/src/index.ts` | Firebase Functions v2 HTTP endpoint and rate-limited Firestore writes |
| `firebase.json` | Hosting rewrite for `/api/contact` before the SPA catchall |
| `src/common/Header.tsx` / `Footer.tsx` | Sticky accessible mobile-first header and minimal editorial footer |
| `src/styles/agency-site.css` | Public navigation and footer brand styling, loaded after older CSS |
| `src/pages/ErrorPage.tsx`, `src/common/StateViews.tsx` | Image-slot treatments for not-found and default empty states |
| `index.html` | Inter Tight font, metadata, Open Graph fallback and structured data |

## Creative direction

- Navy `#14133A`, indigo `#5B4BFF`, off-white `#FAFAFF`, yellow CTA `#FFC233`, success `#0F8A5F`. Editorial coral only in illustration backgrounds.
- **One font family:** Inter Tight. Headline desktop scale 54–72px; body 17px; 1200px max width and ~120px desktop section spacing / 56px mobile.
- Hero entrance only. Everything else responds to clicks, keyboard or hover. Reduced motion supported.
- Homepage includes layered product hero, problem illustration, alternating product screens, six distinct bento cards, four-step path, Google Forms comparison, city scenarios and real event listings, honest founding invitation, free/coming-soon/team pricing, accessible FAQ, real inquiry form and final CTA.
- No customer quotes, invented published-event counts, fake logos, photo stock substitutes, pretend check-in scanners, fictional fees or payment success.

## Actual user journeys and content guardrails

- **Organiser:** `/OrganizerRegistration` → enter details → complete an explicitly simulated checkout (no charge) → wait for Super Admin approval → `/Login` → dashboard `CreateEvent` → microsite editor/Redux preview → published event link → registration records. Marketing links for signed-out visitors say **Register as organiser**, not instant event creation.
- **Attendee:** `/Events` (time and category filters) → `/events/:slug/:id` → attendee registration form (including photo and other details) → downloadable event pass. The short form shown in the hero is explicitly marked as a sample.
- **Super Admin:** review and approve organiser account requests before they can access the organiser dashboard.
- The homepage **does not pretend** to have city filtering (the actual Events page filters by time and category), a live registration-progress dashboard counter, a launched paid-events waiting list, or deployed payment/refund infrastructure. Pricing and the FAQ state which features are not built.
- The contact form's validated Firestore backend has been written but still requires a Firebase deploy. Without that deployment it shows an error and offers an email alternative, never a fake confirmation.

## Live data and feature boundaries

Real published events come from the existing Firebase useGetEvent hook. Their banners display only when provided by organisers; otherwise they use a correctly sized poster illustration slot. Existing organiser login and registration, event creation/editing, role guards, attendee registrations, QR pass creation and Redux microsite draft preview are **not modified**.

Paid ticketing, UPI/card collections, refunds, settlements, GST invoices, check-in scanning and granular team collaboration remain **coming soon**. The comparison table and FAQ explain this clearly.

The contact form **requires deploying** `functions/submitEventHiveContact`. A successful submission means Firestore storage, not that an email was sent. Without deployment the user sees an error rather than false confirmation. See `functions/README.md`.

## Asset production

See **`src/pages/home/ASSET_BRIEF.md`** for all 15 asset slots, exact sizes, art direction, recommended AVIF/WebP/PNG, team inputs and copy/approval requirements.

The temporary OG image points to the existing Firebase project favicon. Before sharing widely on WhatsApp, replace it with an approved **1200 × 630 PNG/JPEG**, adjust the public HTTPS domain and the `og:image` URL in `index.html`, and verify with an actual link preview. The Firebase project ID is `eventhive-cd088`; it does not prove a custom hostname.

## Install, run and verify

```bat
git fetch origin
git switch design/eventhive-violet-ui-2026
git pull origin design/eventhive-violet-ui-2026
npm ci
npm run dev
```

If Windows refuses `npm ci` with an `EPERM` error involving LightningCSS, stop running Node/Vite processes, close editors holding files, delete only `node_modules` and then retry. Do not delete app source or Firestore data.

Check 390px, 360px, 768px and 1200px widths, public event links, anchor scroll, keyboard menu, native FAQ, dark mode, draft preview, and actual Firebase authentication. GitHub Actions now also runs the separate Firebase Functions TypeScript compilation; passing CI does not imply that cloud functions are deployed or browser workflows have been visually tested.
