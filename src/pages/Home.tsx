import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import HomeHero from "./home/HomeHero";
import { HomeSmoothScroll } from "./home/HomeMotion";
import "./home/home-layout.css";
import HomeSections from "./home/HomeSections";

const Home = () => {
  const { isLoading, data, error } = useGetEvent();
  const location = useLocation();

  // The homepage is lazy-loaded. Scroll only after its anchored sections
  // have rendered, including when navigating here from another route.
  useEffect(() => {
    const sectionId = decodeURIComponent(location.hash.slice(1));
    if (!sectionId) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.classList.contains("a11y-pause-animations");
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.key]);

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
    <div className="eh-home min-h-screen overflow-x-hidden bg-[#FFF8F3] text-[#1F1C1A] selection:bg-[#F26B2A] selection:text-white">
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
