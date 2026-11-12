import { Link } from "react-router-dom";
import { CalendarDays, Eye, ImagePlus, MapPin, UsersRound } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useAppSelector } from "../store/hooks";

const EventDraftPreview = () => {
  const { user } = useAuth();
  const { ownerId, editorKey, fields, speakers } = useAppSelector((state) => state.eventBuilder);
  const hasDraft = Boolean(user && editorKey && ownerId === user.uid);
  const editorPath = editorKey?.startsWith("edit:")
    ? `/Dashboard/EditEvent/${encodeURIComponent(editorKey.slice(5))}`
    : "/Dashboard/CreateEvent";

  if (!hasDraft) {
    return (
      <div className="eh-dashboard-card mx-auto max-w-2xl p-8 text-center">
        <h1 className="text-2xl font-bold">No event draft to preview</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Open an event editor first. This preview uses unsaved in-memory data,
          not the published microsite.
        </p>
        <Link to="/Dashboard/CreateEvent" className="eh-btn-primary mt-5 inline-flex px-6 py-3">
          Open event builder
        </Link>
      </div>
    );
  }

  const primaryColor = fields.PrimaryColor || "#4F46E5";
  const secondaryColor = fields.SecondaryColor || "#06B6D4";
  const eventDate = fields.eventDate
    ? new Date(fields.eventDate + "T12:00:00")
    : null;
  const formattedDate = eventDate && !Number.isNaN(eventDate.getTime())
    ? eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "Date to be announced";

  return (
    <div className="space-y-6">
      <div className="eh-dashboard-card flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
            <Eye size={16} /> Draft preview · Not published
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
            Preview your event microsite
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Changes here come from Redux. Registration and publishing are disabled in preview.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/Dashboard/AddWebsiteContent" className="eh-btn-secondary px-4 py-3 text-sm">
            Edit microsite content
          </Link>
          <Link to={editorPath} className="eh-btn-primary px-5 py-3 text-sm">
            Back to editor
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
              {(fields.EventName || "E").charAt(0).toUpperCase()}
            </div>
            <span className="min-w-0 truncate text-lg font-bold text-slate-950">
              {fields.EventName || "Your event name"}
            </span>
          </div>
          <span className="rounded-full px-4 py-2 text-xs font-bold text-white"
            style={{ backgroundColor: primaryColor }}>
            PREVIEW ONLY
          </span>
        </header>

        <section className="relative flex min-h-[340px] flex-col justify-end overflow-hidden bg-slate-950 px-6 py-12 text-white sm:min-h-[440px] sm:px-12">
          {fields.banner ? (
            <img src={fields.banner} alt="Event banner preview" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <ImagePlus size={96} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase text-white"
              style={{ backgroundColor: primaryColor }}>
              {fields.eventType || "Event category"}
            </span>
            <h2 className="mt-5 break-words text-4xl font-bold tracking-tight sm:text-5xl">
              {fields.EventName || "Your event title appears here"}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
              {fields.BannerTagLine || "Your event tagline will appear here."}
            </p>
            <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold">
              <span className="flex items-center gap-2"><CalendarDays size={17} /> {formattedDate}</span>
              <span className="flex items-center gap-2"><MapPin size={17} /> {fields.location || "Location to be announced"}</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:px-12">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>About the event</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-950">What to expect</h3>
          <p className="mt-5 max-w-3xl whitespace-pre-line break-words text-base leading-8 text-slate-600">
            {fields.AboutArea || "Add your event description in the microsite content editor to see it here."}
          </p>
        </section>

        <section className="bg-slate-50 px-6 py-12 sm:px-12">
          <div className="flex items-center gap-3">
            <UsersRound size={22} style={{ color: primaryColor }} />
            <h3 className="text-3xl font-bold text-slate-950">Featured speakers</h3>
          </div>
          {speakers.length ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker, index) => (
                <article key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {speaker.speakerImage ? (
                    <img src={speaker.speakerImage} alt={speaker.speakerName} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="grid h-48 place-items-center bg-slate-100">
                      <UsersRound size={42} className="text-slate-400" />
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="font-bold text-slate-950">{speaker.speakerName}</h4>
                    <p className="mt-1 text-sm text-slate-500">{speaker.speakerDesignation}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-slate-500">Speakers will appear here when you add them.</p>
          )}
        </section>

        <footer className="px-6 py-7 text-center text-sm font-semibold text-white"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
          EventHive · Unsaved preview · No registrations accepted here
        </footer>
      </div>
    </div>
  );
};

export default EventDraftPreview;
