# EventHive asset production brief

## Replacement rule

All placeholders and dimensions are defined in `src/data/assetSlots.ts`. To replace a slot, set its `src: null` to a file like `src: "/assets/hero-ticket.avif"` and keep `alt`, `width`, `height` and `focalPoint`. The `AssetSlot` component reserves that exact ratio before the file loads.

| Slot ID | Visual to produce | Dimensions | Ratio | Preferred format |
|---|---|---:|---|---|
| `heroMotif` | Ticket, calendar and venue miniature, editorial soft 3D | 880 × 980 | 44:49 | AVIF/WebP with alpha |
| `problem` | Chats, spreadsheets and signups scattered; connected story | 1200 × 800 | 3:2 | WebP/SVG |
| `eventPage` | Real EventHive published microsite screenshot | 1440 × 900 | 8:5 | AVIF/WebP |
| `registration` | Real attendee registration on phone | 780 × 1440 | 13:24 | AVIF/WebP |
| `attendeeList` | Real organizer attendee list screenshot; redact PII | 1440 × 900 | 8:5 | AVIF/WebP |
| `preview` | Real Redux draft microsite preview | 1440 × 900 | 8:5 | AVIF/WebP |
| `college` | Pune college fest committee | 800 × 640 | 5:4 | AVIF/WebP/SVG |
| `meetup` | Bengaluru design meetup | 800 × 640 | 5:4 | AVIF/WebP/SVG |
| `conference` | Delhi conference team | 800 × 640 | 5:4 | AVIF/WebP/SVG |
| `founder` | Real founder/team portrait (get consent) | 1000 × 1100 | 10:11 | AVIF/WebP |
| `eventPoster` | Event-specific poster if no organizer banner exists | 800 × 520 | 20:13 | AVIF/WebP |
| `empty` | Quiet empty calendar illustration | 480 × 360 | 4:3 | SVG/WebP |
| `notFound` | Lost ticket/page route illustration | 480 × 360 | 4:3 | SVG/WebP |
| `finalMotif` | Ticket and wristband, quiet soft 3D | 720 × 560 | 9:7 | AVIF/WebP |
| `openGraph` | Branded EventHive WhatsApp/social sharing composition | 1200 × 630 | 40:21 | **PNG/JPEG raster** |

## Art direction

- **Choose one style** for illustrations: flat editorial shapes with deliberate cut-paper shadows *or* soft geometric 3D objects. Do not mix them between sections.
- Main navy `#14133A`, electric indigo `#5B4BFF`, off-white `#FAFAFF`. Warm yellow `#FFC233` is reserved for actionable buttons; use a muted coral `#F6B3A8` only inside illustrations.
- No gradient blobs, anonymous stock photos, neon glows, fake logos, ratings or customer faces.
- Photos of organisers or founders must come from your team or consenting participants.
- Show **real EventHive UI** for all four screenshot slots. Mask email addresses, names and phone numbers in production examples. Preserve existing screen labels, frame ratios and corner radius.
- Export raster at the specified pixel size. Aim for under 160KB per small illustration, under 250KB per large screenshot, and under 150KB for the homepage OG PNG if quality allows; use responsive srcset if needed.
- For EventHive WhatsApp previews, supply **1200 × 630 PNG/JPEG** hosted at a publicly accessible absolute HTTPS URL. The current SEO metadata uses an existing project favicon as a *temporary raster fallback*, not final production artwork.

## Client inputs needed

1. Four actual EventHive screenshots (event page, registration, attendee list, draft preview) with PII removed.
2. One hero illustration, one problem scene, three city scenarios, a final CTA decorative illustration, plus empty and 404 spot illustrations.
3. One real founder/team portrait and an approved team bio. Do not use unidentified or stock people as purported customers.
4. Organiser event banners / poster artwork where real data has none.
5. An approved 1200 × 630 OG raster and the final canonical domain (update `index.html`).
6. Genuine testimonials and logos **only with written approval**. The current page intentionally has no customer endorsements.
7. Actual published pricing, legal terms, privacy and refund policies before paid features or legal links are launched.
8. Firebase Functions deployment configuration, a strong contact-rate-limit secret, approved Firebase project billing, Firestore access, and whoever will review new `marketingInquiries`.
