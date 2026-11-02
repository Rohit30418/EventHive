import { useMemo } from "react";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import HomeHero from "./home/HomeHero";
import HomeNavbar from "./home/HomeNavbar";
import { CustomCursor } from "./home/HomeMotion";
import HomeSections from "./home/HomeSections";

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
    <div className="eh-home min-h-screen overflow-x-hidden bg-[#FFF8F3] text-[#1F1C1A] selection:bg-[#F26B2A] selection:text-white">
      <HomeNavbar />
      <CustomCursor />
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
