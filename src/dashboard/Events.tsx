import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import { auth } from "../Firebase"; // Import Auth
import useGetEvents from "../AdminCustomHooks/useGetEvents";
import useDeleteEvent from "../AdminCustomHooks/useDeleteEvent";
import { apiPath } from "../../Utils/Utils";

type EventType = {
  id: string;
  EventName: string;
  banner: string;
  location: string;
  category: string;
  eventDate: string;
  userId: string; // Added userId to type
};

const Events: React.FC = () => {
  const { data, error, isLoading } = useGetEvents();
  const { isLoading: deleting, deleteEvent } = useDeleteEvent();
  
  // State for search and user
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<{ uid: string; role: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 1. Get Current User & Role
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Fetch the user's role from the Organizer node
          const res = await axios.get(`${apiPath}/Organizer/${user.uid}.json`);
          const role = res.data?.role || "Organizer";
          setCurrentUser({ uid: user.uid, role });
        } catch (err) {
          console.error("Error fetching user role:", err);
          // Default to simple user if fetch fails to be safe
          setCurrentUser({ uid: user.uid, role: "Organizer" }); 
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // =========================================================
  // LOGIC: Permission -> Search -> Split -> Sort
  // =========================================================
  const { upcomingEvents, pastEvents, hasResults } = useMemo(() => {
    // Wait for data and auth
    if (!data || !Array.isArray(data) || authLoading || !currentUser) {
      return { upcomingEvents: [], pastEvents: [], hasResults: false };
    }

    // A. PERMISSION FILTER
    // If SuperAdmin, keep all. If Organizer, keep only their own.
    const userSpecificData = data.filter((item: EventType) => {
      if (currentUser.role === "SuperAdmin") return true; 
      return item.userId === currentUser.uid;
    });

    // B. SEARCH FILTER
    const query = searchTerm.trim().toLowerCase();
    const filtered = query
      ? userSpecificData.filter((item: EventType) =>
          [item.EventName, item.category, item.location].some((x) =>
            x?.toLowerCase().includes(query)
          )
        )
      : userSpecificData;

    // C. SPLIT & SORT
    const now = new Date();
    now.setHours(0, 0, 0, 0); 

    const upcoming: EventType[] = [];
    const past: EventType[] = [];

    filtered.forEach((item: EventType) => {
      if (!item.eventDate) return;
      const eDate = new Date(item.eventDate);
      if (isNaN(eDate.getTime())) return;

      if (eDate >= now) {
        upcoming.push(item);
      } else {
        past.push(item);
      }
    });

    upcoming.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    past.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

    return { 
      upcomingEvents: upcoming, 
      pastEvents: past,
      hasResults: upcoming.length > 0 || past.length > 0
    };
  }, [data, searchTerm, currentUser, authLoading]);

  // Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // =========================================================
  // RENDER HELPER
  // =========================================================
  const renderEventCard = (item: EventType, isPast: boolean = false) => (
    <div
      key={item.id}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-200 transition-all duration-300 
        ${isPast ? 'hover:grayscale-0 grayscale-[30%] opacity-80 hover:opacity-100' : 'hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:-translate-y-[2px]'}`}
    >
      <div className="relative">
        <img
          src={item.banner}
          alt={item.EventName}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className={`absolute top-3 right-3 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md ${isPast ? 'bg-gray-500' : 'bg-indigo-600'}`}>
          {isPast ? "Ended" : item.category || "Event"}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {item.EventName}
        </h2>

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <i className={`fa-regular fa-calendar ${isPast ? 'text-gray-400' : 'text-indigo-500'}`}></i>
            {item.eventDate}
          </p>

          <p className="flex items-center gap-2">
            <i className={`fa-solid fa-location-dot ${isPast ? 'text-gray-400' : 'text-indigo-500'}`}></i>
            {item.location}
          </p>
        </div>

        <div className="mt-5 flex justify-between items-center border-t border-gray-200 pt-4">
          <Link
            to={`/dashboard/EditEvent/${item.id}`}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            <i className="fa fa-edit"></i> Edit
          </Link>

          <button
            onClick={() => deleteEvent(item.id)}
            disabled={deleting}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm disabled:opacity-60"
          >
            <i className="fa fa-trash"></i>
            {deleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );

  // =========================================================
  // MAIN RENDER
  // =========================================================
  
  // Combine loaders
  if (isLoading || authLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {Array(6).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-white h-80 rounded-2xl shadow-md border border-gray-200"/>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 font-semibold text-lg">
        ❌ Failed to load events.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 via-white to-gray-200 min-h-screen space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Events Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {/* Dynamic Welcome Message */}
            {currentUser?.role === "SuperAdmin" 
                ? "Managing all platform events (Super Admin View)" 
                : "Manage your personal events"}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <i className="fa fa-search absolute left-3 top-3 text-gray-400"></i>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
          />
        </div>
      </div>

      {/* Content Area */}
      {!hasResults ? (
        <div className="flex justify-center items-center h-64 text-gray-500 font-medium text-lg bg-white rounded-2xl border border-dashed border-gray-300">
          No events found {currentUser?.role !== "SuperAdmin" ? "created by you" : ""} matching your criteria.
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* === UPCOMING SECTION === */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                Upcoming Events 
                <span className="text-sm font-normal text-gray-500 ml-2">({upcomingEvents.length})</span>
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((item) => renderEventCard(item, false))}
              </div>
            </div>
          )}

          {/* === PAST SECTION === */}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6 mt-8">
                 <h2 className="text-xl font-bold text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gray-400 rounded-full"></span>
                   Past Events
                   <span className="text-sm font-normal text-gray-400 ml-2">({pastEvents.length})</span>
                 </h2>
                 <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((item) => renderEventCard(item, true))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Events;