# EventHive 2026 — Organizer-first website redesign

## Stack and integration

This redesign is implemented in the existing Vite, React 19, TypeScript, Tailwind CSS 4, React Router, Firebase Realtime Database, React Query and Redux repository. **No backend or event CRUD/registration/approval handler was modified.** The Redux microsite preview from the earlier PR remains available.

## Core files

| File | Purpose |
| --- | --- |
| `src/pages/home/Home2026.tsx` | Homepage sections, bento UI previews, role tabs, mobile-friendly comparison table, roadmap-aware pricing, live event cards, FAQ and sales enquiry |
| `src/pages/home/home-2026.css` | Homepage layout, indigo/amber/green theme, dark mode, container and responsive rules |
| `src/pages/Home.tsx` | Retains the existing useGetEvent React Query hook and anchor scrolling, passes actual Firebase data into Home2026 |
| `src/common/Header.tsx` | Sticky public navigation, accessible mobile menu and existing sign-in/dashboard routes, no Framer Motion |
| `src/common/Footer.tsx` | Footer columns using genuine pages, existing contact and no placeholder legal/social links |
| `src/styles/site-2026.css` | Navbar/footer responsive styling |
| `src/theme.css` | Central indigo #4338CA, navy #14143A, amber #FFB400 and green #0F8A5F tokens |
| `index.html` | Bricolage Grotesque and Inter loading/preload, correct TSX module entrypoint |

## What works now versus illustrative content

**Existing**: organiser account registration and approval, branded microsites, event CRUD, editable drafts and microsite preview, attendee registration, listing/discovery, downloadable QR passes and attendee records.

**Not implemented**: card/UPI/netbanking payments, settlement/payouts, refunds, GST invoicing, QR scanning for check-in, granular multi-member team permissions. The trust strip and related FAQs explicitly label these as planned.

**Pricing**: ₹0 and ₹19 are clearly marked example amounts. They are *not* live charges, fee promises or checkout integrations. Paid and institutional enquiries link to the contact form.

**Hero counter**: 24 of 40 is a clearly marked illustrative UI metric. It animates once when visible and respects reduced-motion; it **never represents real registrations**.

**Events**: cards use actual Firebase event data where available (id, banner, date, location and name). Price is displayed as Free or ₹ only if a valid value exists on the event record. Otherwise the card says “See event details.”

**Proof**: the old fabricated sample stories and photos are not used on the new homepage. Instead, visitors can contact EventHive with genuine early-organiser feedback.

## Quality and responsiveness

- Homepage width max: 1120px. Desktop section spacing about 96px; mobile 56px.
- Keyboard-accessible tabs (Arrow Left/Right/Home/End); native `details/summary` FAQ; visible focus; readable contrast goals.
- Four-step timeline line fills with scroll; all other visual changes are on user action. Hero registration example counter animates once.
- Images below the fold are lazy-loaded with width and height dimensions.
- Layout includes CSS fallbacks at 1050px, 820px, 620px and 360px plus a mobile nav.
- Dark mode CSS variables and reduced-motion preferences supported.

## Local setup

```bash
git fetch origin
git switch design/eventhive-violet-ui-2026
git pull origin design/eventhive-violet-ui-2026
npm ci
npm run lint
npm test
npm run build
npm run dev
```

Open `http://localhost:5173`. Check the homepage at 360px, 390px, 768px and desktop widths. This work has passed GitHub Actions lint, tests, typecheck and production build; **manual signed-in/browser visual testing is still recommended** before merge.

## Content maintenance

Replace illustrative pricing with actual approved rates only when checkout is implemented and tested. Publish legal policies as real routes or documents before adding links. Add authenticated real customer reviews only after consent and approval.
