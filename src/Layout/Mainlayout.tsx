import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../public-theme.css";

const Mainlayout: FC = () => {

  return (
    <div className="public-theme min-h-screen overflow-x-hidden bg-[#FFF8F3] text-[#1F1C1A] antialiased">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
