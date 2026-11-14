# EventHive contact backend

## What this adds

The marketing enquiry form sends JSON to `POST /api/contact`, routed by Firebase Hosting to the `submitEventHiveContact` HTTP Cloud Function in `asia-south1`. The endpoint uses server-side validation, a honeypot, a five-per-IP-per-hour Firestore rate limit, and writes only genuine validated enquiries to `marketingInquiries`.

**No email notification is sent**. An authorised team member must monitor the collection or configure a verified notification integration. A successful form message is shown only after Firestore confirms storage. Existing application authentication, event registration, event CRUD and Redux state are unchanged.

## One-time setup (requires Firebase owner/deployer permissions)

1. Install Node.js 22 and Firebase CLI (`npm install -g firebase-tools`).
2. Run `npm --prefix functions install` (creates a functions lockfile locally).
3. Sign in with `firebase login` and check `firebase use eventhive-cd088`.
4. Configure a randomly generated secret, not a committed string:
   ```bash
   firebase functions:secrets:set EVENTHIVE_CONTACT_SALT
   ```
5. Ensure Firestore is enabled with appropriate access controls for staff reading `marketingInquiries`. Do not allow unauthenticated client reads/writes to this collection. Configure Firestore TTL on `_contactLimits.expireAt` if desired.
6. Deploy the function and Hosting rewrite together:
   ```bash
   npm --prefix functions run build
   firebase deploy --only functions:submitEventHiveContact,hosting
   ```
7. Send a test enquiry from the hosted homepage. Verify one `marketingInquiries` document appears in Firestore, and test invalid data, long input, and repeated requests.

## Security and production limitations

- Anonymous public forms need abuse monitoring. Rate limits and honeypot reduce basic spam, but add Firebase App Check/reCAPTCHA and alerts before larger campaigns.
- The HTTP function currently allows CORS from any origin; restrict accepted origins once your final custom domain is known, and consider App Check.
- There are no backend credentials or Firebase service-account keys in frontend code. Admin SDK credentials are supplied by Firebase when deployed.
- Cloud Functions and Firestore usage may incur charges. The function has not been deployed from this GitHub update.
- A Firebase Functions runtime can fail if the Google Cloud project lacks required APIs or billing. Review function deployment logs.
- In local Vite, the form will show a clear error unless `/api/contact` is proxied to a local Firebase Functions emulator or the deployed endpoint. Do not claim local submissions are stored until you configure that proxy.
- Privacy policy and data-retention terms should be reviewed before collecting public enquiries.
