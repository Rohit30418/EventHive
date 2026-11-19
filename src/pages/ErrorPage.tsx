import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AssetSlot from "../components/media/AssetSlot";
import "./error-agency.css";

export default function ErrorPage() {
  return <main className="ea-error-page">
    <div className="ea-error-layout">
      <div>
        <p>404 · Page not found</p>
        <h1>The event link doesn't lead here.</h1>
        <span>It may have moved, been unpublished or copied incorrectly. Try browsing events or returning to the homepage.</span>
        <div className="ea-error-actions">
          <Link to="/Events">Browse events <ArrowUpRight size={18}/></Link>
          <Link to="/"><ArrowLeft size={18}/> Return home</Link>
        </div>
      </div>
      <div className="ea-error-art"><AssetSlot id="notFound"/></div>
    </div>
  </main>;
}
