/**
 * One place for every planned EventHive visual.
 * To replace a placeholder, change ONLY its src path below.
 * Keep width, height and alt text so the layout does not shift.
 */
export type AssetDefinition = {
  src: string | null;
  alt: string;
  label: string;
  width: number;
  height: number;
  focalPoint?: string;
  tone?: "indigo" | "coral" | "mint" | "paper";
};

export const assetSlots = {
  heroMotif: {
    src: null, alt: "Illustration of an event ticket and venue map coming together",
    label: "Soft 3D: ticket, calendar and venue motif",
    width: 880, height: 980, focalPoint: "50% 50%", tone: "coral",
  },
  problem: {
    src: null, alt: "Illustration of registrations scattered between WhatsApp chats, forms and spreadsheets",
    label: "Editorial illustration: scattered signups, chats and sheets",
    width: 1200, height: 800, focalPoint: "center", tone: "paper",
  },
  eventPage: {
    src: null, alt: "EventHive public event page showing event title, schedule and registration action",
    label: "Product screenshot: published event page",
    width: 1440, height: 900, focalPoint: "top", tone: "indigo",
  },
  registration: {
    src: null, alt: "EventHive attendee registration form on a mobile phone",
    label: "Product screenshot: attendee registration",
    width: 780, height: 1440, focalPoint: "top", tone: "mint",
  },
  attendeeList: {
    src: null, alt: "EventHive organizer attendee registration list",
    label: "Product screenshot: attendee list",
    width: 1440, height: 900, focalPoint: "top", tone: "paper",
  },
  preview: {
    src: null, alt: "EventHive draft microsite preview in a browser",
    label: "Product screenshot: draft page preview",
    width: 1440, height: 900, focalPoint: "top", tone: "indigo",
  },
  college: {
    src: null, alt: "Editorial illustration of a college event committee at a festival in Pune",
    label: "Editorial scene: Pune college fest",
    width: 800, height: 640, focalPoint: "center", tone: "coral",
  },
  meetup: {
    src: null, alt: "Editorial illustration of a design meetup in Bengaluru",
    label: "Editorial scene: Bengaluru design meetup",
    width: 800, height: 640, focalPoint: "center", tone: "mint",
  },
  conference: {
    src: null, alt: "Editorial illustration of the organizing team for a Delhi conference",
    label: "Editorial scene: Delhi conference team",
    width: 800, height: 640, focalPoint: "center", tone: "indigo",
  },
  founder: {
    src: null, alt: "Portrait of the EventHive founder or organizing team",
    label: "Team portrait: founder or organizing team",
    width: 1000, height: 1100, focalPoint: "50% 35%", tone: "paper",
  },
  eventPoster: {
    src: null, alt: "Event poster artwork will appear here once published by its organiser",
    label: "Poster artwork: event-specific image",
    width: 800, height: 520, focalPoint: "center", tone: "paper",
  },
  empty: {
    src: null, alt: "Small illustration of an empty event calendar",
    label: "Spot illustration: no events yet",
    width: 480, height: 360, focalPoint: "center", tone: "mint",
  },
  notFound: {
    src: null, alt: "Small illustration of a lost event ticket for the page-not-found screen",
    label: "Spot illustration: lost event ticket",
    width: 480, height: 360, focalPoint: "center", tone: "coral",
  },
  finalMotif: {
    src: null, alt: "Soft 3D illustration of an event wristband and ticket",
    label: "Soft 3D: wristband and ticket",
    width: 720, height: 560, focalPoint: "center", tone: "coral",
  },
  openGraph: {
    src: null, alt: "EventHive sharing banner for WhatsApp and social previews",
    label: "Social sharing artwork: EventHive wordmark and product",
    width: 1200, height: 630, focalPoint: "center", tone: "indigo",
  },
} satisfies Record<string, AssetDefinition>;

export type AssetId = keyof typeof assetSlots;
