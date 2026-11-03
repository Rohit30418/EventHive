import { useMemo } from "react";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import HomeHero from "./home/HomeHero";
import HomeNavbar from "./home/HomeNavbar";
import { HomeSmoothScroll } from "./home/HomeMotion";
import "./home/home-layout.css";
import HomeSections from "./home/HomeSections";
import { HomeAccessibilityProvider, HomeAccessibilityEffects, HomeFloatingTools, useHomeAccessibility } from "./home/HomeAccessibility";
import { MotionConfig } from "framer-motion";

function HomeAccessibilityLayout({ children }: { children: React.ReactNode }) {
  const { settings } = useHomeAccessibility();
  return (
    <MotionConfig reducedMotion={settings.pauseMotion ? "always" : "user"}>
      <HomeAccessibilityEffects />
      {children}
      <HomeFloatingTools />
    </MotionConfig>
  );
}

const Home = () => {
  const { isLoading, data, error } = useGetEvent();

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
    <HomeAccessibilityProvider>
      <div className="eh-home min-h-screen overflow-x-hidden bg-[#FFF8F3] text-[#1F1C1A] selection:bg-[#F26B2A] selection:text-white">
        <HomeAccessibilityLayout>
      <HomeNavbar />
      <HomeSmoothScroll />
      <HomeHero heroEvent={featuredEvents[0]} />
      <HomeSections
        featuredEvents={featuredEvents}
        isLoading={isLoading}
        error={error}
      />
        </HomeAccessibilityLayout>
      </div>
    </HomeAccessibilityProvider>
  );
};

export default Home;
