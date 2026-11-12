import type { CSSProperties, FormEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, PencilLine } from "lucide-react";
import Header from "../pages/Microsite/Header";
import MicrositeHome from "../pages/Microsite/MicrositeHome";
import Footer from "../pages/Microsite/Footer";
import "../pages/Microsite/microsite-layout.css";
import type { MicrositeEvent } from "../Types/eventType";
import { useAuth } from "./AuthContext";
import { useAppSelector } from "../store/hooks";

/**
 * Renders the actual public microsite from the unsaved Redux event draft.
 * It does not fetch or modify the published event, and it blocks registration
 * and outgoing links. Section navigation, carousel and animations still work.
 */
const EventDraftPreview = () => {
  const { user } = useAuth();
  const { ownerId, editorKey, fields, speakers } = useAppSelector((state) => state.eventBuilder);
  const hasDraft = Boolean(user && editorKey && ownerId === user.uid);
  const editorPath = editorKey?.startsWith("edit:")
    ? `/Dashboard/EditEvent/${encodeURIComponent(editorKey.slice(5))}`
    : "/Dashboard/CreateEvent";

  if (!hasDraft) {
    return (
      <div className="eh-page flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="eh-dashboard-card mx-auto max-w-xl p-8 text-center">
          <h1 className="text-2xl font-bold">No event draft to preview</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Open the event builder first. This is an unsaved in-memory preview,
            so refreshing the page clears the current draft.
          </p>
          <Link to="/Dashboard/CreateEvent" className="eh-btn-primary mt-5 inline-flex px-6 py-3">
            Open event builder
          </Link>
        </div>
      </div>
    );
  }

  // The public microsite components consume the exact same event shape.
  // Only the source changes: Redux draft instead of published Firebase data.
  const draftEvent: MicrositeEvent = {
    EventName: fields.EventName || "",
    eventDate: fields.eventDate || "",
    location: fields.location || "",
    eventType: fields.eventType || "",
    banner: fields.banner || "",
    BannerTagLine: fields.BannerTagLine || "",
    AboutArea: fields.AboutArea || "",
    PrimaryColor: fields.PrimaryColor || "#4F46E5",
    SecondaryColor: fields.SecondaryColor || "#06B6D4",
    speakers,
  };

  const preventLeavingPreview = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      // Keep public footer/legal/social links from navigating away while previewing.
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const preventPreviewSubmission = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* The only preview-specific chrome; everything below is the real microsite. */}
      <div className="border-b border-indigo-200 bg-slate-950 px-4 py-3 text-white sm:px-6">
        <div className="mx-auto flex max-w-[1296px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Eye size={18} aria-hidden="true" />
            <span>EventHive · Live draft preview</span>
            <span className="rounded-full bg-amber-300 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
              Not published
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/Dashboard/AddWebsiteContent"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/25 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
            >
              <PencilLine size={15} />
              Edit content
            </Link>
            <Link
              to={editorPath}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-slate-100"
            >
              <ArrowLeft size={15} />
              Back to editor
            </Link>
          </div>
        </div>
      </div>

      <div
        className="public-theme eh-event-microsite eh-microsite min-h-screen overflow-x-clip bg-[#FFF8F3] text-[#1F1C1A]"
        style={{ "--ms-primary": draftEvent.PrimaryColor } as CSSProperties}
        onClickCapture={preventLeavingPreview}
        onSubmitCapture={preventPreviewSubmission}
      >
        <Header previewEvent={draftEvent} previewMode />
        <MicrositeHome previewEvent={draftEvent} previewMode />
        <Footer previewEvent={draftEvent} />
      </div>
    </div>
  );
};

export default EventDraftPreview;
