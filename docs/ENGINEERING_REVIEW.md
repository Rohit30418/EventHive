# EventHive — engineering review

Based on the existing orange UI branch. UI layout and navigation have been preserved.

## Verification

Run `npm ci`, `npm run lint`, `npm test`, and `npm run build`. The GitHub Actions workflow runs these checks on the improvement branch and on PRs.

## Important limits

- Organizer checkout is **simulated**; no payment gateway, payment confirmation, refund or subscription processing is implemented.
- Route guards and UI ownership checks **do not authorize database operations**. No deployed Firebase security rules were inspected or modified in this pull request.
- Before production, use Firebase Emulator Suite to verify the actual database and storage rules. Ensure:
  - Only the matching authenticated user can create their own initial organizer profile. A regular user must not set themselves as SuperAdmin or mark themselves approved.
  - Only a trusted admin can approve or revoke an organizer.
  - Only the event owner or trusted admin can update/delete an event, including prevention of `userId` reassignment.
  - Attendee registration submission must be validated and abuse-limited using trusted enforcement; registrations (including photos and personal details) must be readable/deletable only by the event owner or trusted admin.
  - Per-user data and registration caches do not leak across login sessions.
- Public REST endpoints can be called without the React UI. Client-side filtering alone is not security.
- Existing QR/PDF generation is not a complete QR scanning or attendance check-in system.

## Manual checks before deployment

1. Keep the orange homepage and microsite design at 375, 768, and 1440 pixels.
2. Test pending/approved/revoked/admin accounts, refreshes, and protected deep links.
3. Simulate a failed event creation: show the error and preserve form values without navigation.
4. Attempt to edit another organizer's event, including a direct REST request.
5. Test one organizer's registration access versus another, including when logging out and in.
6. Confirm demo checkout creates no real payment and stores no verified payment status.
7. Verify deployed Firebase rules separately from lint/test/build CI.
