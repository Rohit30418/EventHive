import { createHmac } from "node:crypto";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

initializeApp();
const db = getFirestore();
const contactSalt = defineSecret("EVENTHIVE_CONTACT_SALT");

const TOPICS = new Set(["founding", "paid", "teams", "general"]);
type Inquiry = {
  name: string;
  email: string;
  organisation: string;
  topic: string;
  message: string;
  companyWebsite: string;
};

function trim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: unknown): Inquiry | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const data = payload as Record<string, unknown>;
  const inquiry: Inquiry = {
    name: trim(data.name),
    email: trim(data.email).toLowerCase(),
    organisation: trim(data.organisation),
    topic: trim(data.topic),
    message: trim(data.message),
    companyWebsite: trim(data.companyWebsite),
  };

  if (inquiry.name.length < 2 || inquiry.name.length > 100 ||
      inquiry.email.length < 6 || inquiry.email.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
      inquiry.organisation.length > 160 ||
      !TOPICS.has(inquiry.topic) ||
      inquiry.message.length < 12 || inquiry.message.length > 2000 ||
      inquiry.companyWebsite.length > 0) return null;

  return inquiry;
}

/**
 * Public marketing contact endpoint.
 * POST /api/contact -> Cloud Function rewrite -> Firestore marketingInquiries
 * A successful response means a Firestore write completed, not an email was sent.
 */
export const submitEventHiveContact = onRequest(
  { region: "asia-south1", cors: true, secrets: [contactSalt], timeoutSeconds: 20, maxInstances: 10 },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).set("Allow", "POST").json({ error: "Use POST to send an enquiry." });
      return;
    }

    if (!request.is("application/json")) {
      response.status(415).json({ error: "Please send JSON." });
      return;
    }

    const raw = JSON.stringify(request.body ?? "");
    if (raw.length > 6000) {
      response.status(413).json({ error: "Your message is too long." });
      return;
    }

    const inquiry = validate(request.body);
    if (!inquiry) {
      response.status(400).json({ error: "Please check your name, email and event details." });
      return;
    }

    const period = Math.floor(Date.now() / 3_600_000);
    const ip = request.ip || "unknown";
    const key = createHmac("sha256", contactSalt.value()).update(ip + ":" + period).digest("hex");
    const limitRef = db.collection("_contactLimits").doc(key);

    try {
      // 5 enquiries per IP per hour. Add a Firestore TTL policy to expire expireAt.
      const allowed = await db.runTransaction(async (tx) => {
        const snap = await tx.get(limitRef);
        const count = Number(snap.data()?.count || 0);
        if (count >= 5) return false;
        tx.set(limitRef, {
          count: count + 1,
          expireAt: Timestamp.fromMillis(Date.now() + 2 * 60 * 60 * 1000),
        }, { merge: true });
        return true;
      });

      if (!allowed) {
        response.status(429).json({ error: "Too many enquiries from this connection. Please try later." });
        return;
      }

      await db.collection("marketingInquiries").add({
        name: inquiry.name,
        email: inquiry.email,
        organisation: inquiry.organisation,
        topic: inquiry.topic,
        message: inquiry.message,
        source: "marketing-homepage",
        status: "new",
        createdAt: FieldValue.serverTimestamp(),
      });

      response.status(201).set("Cache-Control", "no-store").json({ ok: true });
    } catch (error) {
      console.error("EventHive contact submission failed", error);
      response.status(503).json({ error: "Contact service is unavailable. Please try again." });
    }
  }
);
