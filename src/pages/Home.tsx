import { useMemo } from "react";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import HomeHero from "./home/HomeHero";
import HomeSections from "./home/HomeSections";
import AppDownloadSection from "./home/AppDownloadSection";

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
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf6] text-[#1e1c1b] selection:bg-[#ef6f30] selection:text-white">
      <HomeHero />
      <HomeSections
        featuredEvents={featuredEvents}
        isLoading={isLoading}
        error={error}
      />
      <AppDownloadSection featuredEvent={featuredEvents[0]} />
    </div>
  );
};

export default Home;
