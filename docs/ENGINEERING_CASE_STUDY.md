# EventHive — engineering case study

> **Project type:** Independent React + TypeScript application. This is not a claim of professional/commercial React employment.

EventHive models a multi-role event platform with public event discovery and registrations, organizer onboarding and dashboards, and Super Admin approval flows. The purpose of this case study is to make **implementation evidence and limitations** easy for a reviewer to inspect.

## Where to look in the code

| Engineering topic | Repository evidence | Decision and trade-off |
| --- | --- | --- |
| App composition and lazy loading | `src/App.tsx` | Layouts and pages are loaded with `React.lazy` and `Suspense`, helping to avoid loading every route upfront. |
| Frontend authentication and roles | `src/dashboard/AuthContext.tsx`, `src/PrivateRoute.tsx` | Firebase Auth supplies the session; UI-level route guards gate Organizer/Super Admin pages. A route guard is not a database permission system. |
| Client vs remote state | `src/store/store.ts`, `src/slice/micrositeSlice.ts`, `src/AdminCustomHooks/useGetEvents.tsx` | Redux Toolkit holds shared client UI state; TanStack Query manages asynchronous event data, five-minute query freshness, and request lifecycle. |
| Mutation lifecycle | `src/AdminCustomHooks/useAddEvent.tsx`, `src/AdminCustomHooks/useDeleteEvent.tsx` | Firebase REST writes use the current user's ID token; successful mutations invalidate the `["events"]` cache. |
| Typed forms | `src/Registration/OrganizerRegistration.tsx`, `src/Registration/ValidationSchema.ts` | React Hook Form and Zod centralize form state and validation. |
| Reusable event UI | `src/components/EventCard.tsx` | One component generates distinct public microsite and dashboard links based on its variant. |
| Automated tests | `src/PrivateRoute.test.tsx`, `src/components/EventCard.test.tsx`, `src/AdminCustomHooks/useGetEvents.test.ts`, `src/Registration/OrganizerRegistration.test.tsx` | Tests check route permission outcomes, links, event data mapping, and form validation. This is targeted coverage, not comprehensive coverage. |

## The main engineering decisions

**Why Redux Toolkit and React Query?** Redux handles local state shared between UI regions, while React Query handles remote-event fetching, loading/errors and cache freshness. After an event mutation, the relevant query is invalidated so its consumers can refresh.

**Why an AuthContext as well?** It centralizes Firebase session and the resolved frontend role, separate from microsite state and server-data caching. Components can consume an auth view instead of duplicating listener setup.

**What happens when the current user lacks permission?** `PrivateRoute` redirects unauthenticated visitors, pending organizers, and users whose role is not allowed. Tests cover those visible routing outcomes.

**Why validate on the client?** Zod gives users early feedback and React Hook Form manages form errors. Client validation does not replace backend validation or Firebase database rules.

## Boundaries and limitations to communicate honestly

- The organizer registration payment step is a **demonstration UI**. The current repository does **not** implement real payment capture, a gateway integration, server-side payment verification, webhooks, refunds, or payment reconciliation. Any payment-confirmed messaging in the prototype is not evidence of a real transaction.
- QR-code and PDF generation should **not** be described as a production ticket-scanning or check-in system.
- The repository's frontend route guards are **not** sufficient authorization for production data. Firebase Realtime Database/Storage security rules and role ownership must be verified separately in the deployed Firebase project. The hosting configuration alone does not prove those rules.
- Current tests focus on selected components and hooks; full end-to-end organizer approval, failure recovery, permissions, accessibility and cross-browser regression coverage is not demonstrated by the present repository.
- No production load testing, server-side observability or real-payment processing is claimed.

## How to verify locally

```bash
npm ci
npm run lint
npm test
npm run build
```

The GitHub Actions workflow at `.github/workflows/frontend-quality.yml` is intended to run the same checks on pull requests. A green check would validate the commands against a fresh environment; it would not mean every production risk above is resolved.

## Next engineering milestones

1. **Authorization:** Review Firebase security rules for role, ownership and write paths; add emulator tests for unauthorized reads, writes and cross-organizer access.
2. **Reliability:** Add error, retry and unmount/race-condition tests for authenticated data-loading and event mutations.
3. **Honest demo UX:** Clearly label simulated payments before a recruiter runs the flow, and do not mark them verified or subscription-active without actual verification.
4. **User experience:** Test keyboard navigation, forms, loading/empty/error states and responsive layouts with browser automation.
5. **Performance:** Record a before/after Lighthouse or bundle-analysis result for one meaningful improvement, including device/profile and measurement setup.
6. **Delivery discipline:** Keep the lint/test/build workflow green; explain the failure and fix in a pull request when checks expose regression.

## Interview topics you can demonstrate from this project

- When to use React Context vs Redux vs server-state caching
- Why client-side role checks do not provide security
- Cache invalidation versus optimistic updates
- Testing role-based navigation and API transformation
- How you would introduce end-to-end tests and CI quality gates

Do not claim unimplemented features, unmeasured performance gains, or years of professional React experience based on this independent project.
