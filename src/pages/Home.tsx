import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import HomeHero from "./home/HomeHero";
import { HomeSmoothScroll } from "./home/HomeMotion";
import "./home/home-layout.css";
import "./home/home-extras.css";
import "./home/home-reference-ui.css";
import HomeSections from "./home/HomeSections";

const Home = () => {
  const { isLoading, data, error } = useGetEvent();
  const location = useLocation();

  // The homepage loads event data asynchronously. Wait for the event cards to
  // settle before aligning an anchor; otherwise their height change moves the
  // requested section out of view (especially on mobile).
  useEffect(() => {
    const sectionId = decodeURIComponent(location.hash.slice(1));
    if (!sectionId || isLoading) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        const reducedMotion =
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          document.documentElement.classList.contains("a11y-pause-animations");
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.hash, location.key, isLoading]);

  const featuredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return data
      .filter((event) => event.eventDate && new Date(event.eventDate) >= today)
      .sort(
        (a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      )
      .slice(0, 4);
  }, [data]);

  return (
    <div className="eh-home min-h-screen overflow-x-hidden bg-white text-[#111330] selection:bg-[#4430B9] selection:text-white">
      <HomeSmoothScroll />
      <HomeHero heroEvent={featuredEvents[0]} />
      <HomeSections
        featuredEvents={featuredEvents}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Home;
