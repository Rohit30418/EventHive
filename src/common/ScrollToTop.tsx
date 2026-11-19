import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset the viewport on route navigation, including the independently
 * scrollable dashboard main area. Re-renders and Firebase query updates do
 * not trigger this component because they don't change the router location.
 *
 * Hash navigation is intentionally delegated to the target page (Home waits
 * for the async event cards before scrolling to the selected section).
 */
const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) return;

    // "instant" prevents a long scrolling animation when opening a new page.
    const scrollOptions: ScrollToOptions = {
      top: 0,
      left: 0,
      behavior: "instant",
    };

    window.scrollTo(scrollOptions);
    document.getElementById("eh-dashboard-scroll-area")?.scrollTo(scrollOptions);
  }, [location.key, location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop;
