import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Mainlayout: FC = () => {
  // const location = useLocation();
  // const compactFooterPages = location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/logout" || location.pathname.toLowerCase() === "/orgniserregistration";

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950 antialiased">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
