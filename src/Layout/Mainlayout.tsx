import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../public-theme.css";
import "../styles/eventhive-public-ui.css";

const Mainlayout: FC = () => {

  return (
    <div className="public-theme min-h-screen overflow-x-clip bg-white text-[#111330] antialiased">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
