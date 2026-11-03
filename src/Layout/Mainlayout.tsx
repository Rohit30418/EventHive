import type { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../public-theme.css";

const Mainlayout: FC = () => {
  const location = useLocation();
  // const compactFooterPages = location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/logout" || location.pathname.toLowerCase() === "/orgniserregistration";

  return (
    <div className="public-theme min-h-screen overflow-x-hidden bg-[#FFF8F3] text-[#1F1C1A] antialiased">
      {location.pathname !== "/" && <Header />}
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
