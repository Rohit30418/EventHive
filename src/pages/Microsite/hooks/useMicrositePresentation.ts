import { useEffect, useMemo, useState } from "react";
import type { MicrositeEvent, Speaker } from "../../../Types/eventType";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-59a31e16e581?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
];

const FALLBACK_PORTRAITS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=512&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=512&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=512&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=512&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=512&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=512&q=80",
];

const buildFallbackSpeakers = (): Speaker[] => [
  {
    speakerName: "Alex Johnson",
    speakerDesignation: "Founder & CEO",
    speakerImage: FALLBACK_PORTRAITS[0],
  },
  {
    speakerName: "Sarah Chen",
    speakerDesignation: "Chief Product Officer",
    speakerImage: FALLBACK_PORTRAITS[1],
  },
  {
    speakerName: "Michael Brown",
    speakerDesignation: "Head of Growth",
    speakerImage: FALLBACK_PORTRAITS[2],
  },
  {
    speakerName: "Elena Rodriguez",
    speakerDesignation: "VP of Engineering",
    speakerImage: FALLBACK_PORTRAITS[3],
  },
];

const useMicrositePresentation = (event: MicrositeEvent) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = useMemo(() => HERO_IMAGES, []);
  const fallbackPortraits = useMemo(() => FALLBACK_PORTRAITS, []);
  const speakers = useMemo(
    () => (event.speakers?.length ? event.speakers : buildFallbackSpeakers()),
    [event.speakers]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentImageIndex((previous) => (previous + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return {
    currentImageIndex,
    setCurrentImageIndex,
    heroImages,
    fallbackPortraits,
    speakers,
  };
};

export default useMicrositePresentation;
