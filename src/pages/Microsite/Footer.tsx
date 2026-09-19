import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useAppSelector } from "../../store/hooks";

const Footer = () => {
  const event = useAppSelector((state) => state.microsite.eventData);
  const primaryColor =
    event?.PrimaryColor || event?.primaryColor || event?.color || "#EF6F30";
  const secondaryColor =
    event?.SecondaryColor || event?.secondaryColor || "#F18651";
  const eventName = event?.EventName || "EventHive";
  const eventLogo = event?.logo || event?.logoUrl;

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl text-sm font-extrabold text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                {eventLogo ? (
                  <img src={eventLogo} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  eventName.charAt(0).toUpperCase()
                )}
              </span>
              <div>
                <p className="max-w-[280px] truncate font-['Manrope',sans-serif] text-lg font-extrabold">
                  {eventName}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/40">
                  Powered by EventHive
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-white/50">
              {event?.ShortDesc ||
                event?.description ||
                "Event information and registration in one focused experience."}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/40">
                Explore
              </p>
              <div className="mt-4 flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={() => scrollTo("experience")}
                  className="text-sm font-bold text-white/65 hover:text-white"
                >
                  About event
                </button>
                {event?.speakers?.length ? (
                  <button
                    type="button"
                    onClick={() => scrollTo("speakers")}
                    className="text-sm font-bold text-white/65 hover:text-white"
                  >
                    Speakers
                  </button>
                ) : null}
                {event?.location && (
                  <button
                    type="button"
                    onClick={() => scrollTo("location")}
                    className="text-sm font-bold text-white/65 hover:text-white"
                  >
                    Location
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => scrollTo("registration")}
                  className="text-sm font-bold text-white/65 hover:text-white"
                >
                  Registration
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/40">
                Event contact
              </p>
              <div className="mt-4 space-y-3">
                {event?.organizerEmail && (
                  <a
                    href={`mailto:${event.organizerEmail}`}
                    className="flex items-center gap-2 text-sm font-bold text-white/65 hover:text-white"
                  >
                    <Mail size={15} style={{ color: primaryColor }} />
                    <span className="break-all">{event.organizerEmail}</span>
                  </a>
                )}
                {event?.organizerPhone && (
                  <a
                    href={`tel:${event.organizerPhone}`}
                    className="flex items-center gap-2 text-sm font-bold text-white/65 hover:text-white"
                  >
                    <Phone size={15} style={{ color: primaryColor }} />
                    {event.organizerPhone}
                  </a>
                )}
                {event?.location && (
                  <p className="flex items-center gap-2 text-sm font-bold text-white/65">
                    <MapPin size={15} style={{ color: primaryColor }} />
                    {event.location}
                  </p>
                )}
                {!event?.organizerEmail &&
                  !event?.organizerPhone &&
                  !event?.location && (
                    <p className="text-sm font-medium text-white/45">
                      Contact details will appear when provided by the organizer.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-7 text-xs font-semibold text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {eventName}. All rights reserved.</p>
          <Link to="/" className="hover:text-white">
            EventHive platform
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
