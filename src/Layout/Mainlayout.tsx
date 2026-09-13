import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../public-theme.css";

const Mainlayout: FC = () => {
  return (
    <div className="public-theme min-h-screen overflow-x-hidden bg-[#fffaf6] text-[#1e1c1b] antialiased">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
