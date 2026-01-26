import React, { useState, useMemo } from "react";
import { auth } from "../Firebase";
import useGetRegistrations from "../AdminCustomHooks/useGetRegistrations";
import useGetEvents from "../AdminCustomHooks/useGetEvents"; // Needed to verify ownership
import { exportToExcel } from "../utils/exportToExcel";
import { exportIDCardPDF } from "../utils/exportIDCardPDF";
import { 
  Search, 
  FileSpreadsheet, 
  FileBadge, 
  User, 
  Mail, 
  Phone, 
  MoreHorizontal,
  Loader2
} from "lucide-react";

interface Props {
  eventId?: string; // Optional: If passed, show only this event. If null, show all my events.
  eventName?: string;
}

const EventRegistrationsTable: React.FC<Props> = ({ eventId, eventName = "All Events" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. GET AUTH INFO
  const uid = auth.currentUser?.uid;

  // 2. FETCH DATA
  const { data: allRegistrations = [], isLoading: regLoading, error } = useGetRegistrations();
  const { data: allEvents = [], isLoading: eventsLoading } = useGetEvents();

  // 3. FILTER LOGIC (The Core Fix)
  const filteredData = useMemo(() => {
    if (!uid) return [];

    // Step A: Find IDs of events owned by this user
    const myEventIds = allEvents
        .filter((e: any) => e.userId === uid)
        .map((e: any) => e.id);

    // Step B: Filter Registrations
    return allRegistrations.filter((reg: any) => {
        // Rule 1: Must belong to one of MY events
        if (!myEventIds.includes(reg.eventId)) return false;

        // Rule 2: If a specific eventId was passed via props, match it
        if (eventId && reg.eventId !== eventId) return false;

        // Rule 3: Search Term (Name or Email)
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            return (
                reg.fullName?.toLowerCase().includes(lowerSearch) ||
                reg.email?.toLowerCase().includes(lowerSearch)
            );
        }

        return true;
    });
  }, [allRegistrations, allEvents, uid, eventId, searchTerm]);

  // Helper: Get Initials
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // --- LOADING STATE ---
  if (regLoading || eventsLoading)
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 flex flex-col items-center justify-center shadow-sm h-64">
        <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
        <p className="text-slate-500 font-medium">Loading participant data...</p>
      </div>
    );

  // --- ERROR STATE ---
  if (error)
    return (
      <div className="p-8 border border-red-100 bg-red-50 rounded-2xl flex flex-col items-center justify-center text-red-600">
        <div className="bg-red-100 p-3 rounded-full mb-3">
             <MoreHorizontal />
        </div>
        <h3 className="font-bold">Error Loading Data</h3>
        <p className="text-sm opacity-80">Please check your connection and try again.</p>
      </div>
    );

  return (
    <div className="bg-white border border-slate-200 rounded-[1.5rem] shadow-sm overflow-hidden animate-fade-in-up">
      
      {/* ================= HEADER TOOLBAR ================= */}
      <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Title & Stats */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {eventId ? `Attendees: ${eventName}` : "All Attendees"}
          </h2>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
             <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
             Total Found: <span className="font-semibold text-slate-700">{filteredData.length}</span>
          </p>
        </div>

        {/* Actions & Search */}
        <div className="flex flex-col sm:flex-row gap-3">
           
           {/* Search Input */}
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search name or email..." 
                 className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full sm:w-64"
                 onChange={(e) => setSearchTerm(e.target.value)}
                 value={searchTerm}
              />
           </div>

           {/* Export Button */}
           <button
            onClick={() => exportToExcel(filteredData, eventName)}
            disabled={filteredData.length === 0}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet size={18} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {filteredData.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <User className="text-slate-300" size={32} />
           </div>
           <h3 className="text-lg font-semibold text-slate-900">No participants found</h3>
           <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">
             {searchTerm ? "No matches for your search." : "Share your event link to get registrations!"}
           </p>
        </div>
      )}

      {/* ================= DATA TABLE ================= */}
      {filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Participant</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Event</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((user: any, index: number) => {
                // Find event name for this specific user (useful if showing "All Attendees")
                const userEventName = allEvents.find((e: any) => e.id === user.eventId)?.EventName || "Unknown Event";
                
                return (
                <tr 
                  key={index} 
                  className="group hover:bg-slate-50 transition-colors duration-200"
                >
                  
                  {/* Name & Avatar Column */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {user.photo ? (
                          <img src={user.photo} alt={user.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
                      ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-100">
                            {getInitials(user.fullName)}
                          </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {user.fullName || "Unknown"}
                        </p>
                        <p className="text-xs text-slate-400">{user.designation || "Attendee"}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info Column */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail size={14} className="text-slate-400" />
                            {user.email || "-"}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone size={14} className="text-slate-400" />
                            {user.mobile || "-"}
                        </div>
                    </div>
                  </td>

                  {/* Event Name Column (New) */}
                  <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 max-w-[150px] truncate">
                         {userEventName}
                      </span>
                  </td>

                  {/* Actions Column (PDF) */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => exportIDCardPDF(user, userEventName)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md"
                      title="Download Badge"
                    >
                      <FileBadge size={16} />
                      <span className="hidden lg:inline">Badge</span>
                    </button>
                  </td>

                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center md:justify-end text-xs text-slate-500">
          Showing {filteredData.length} of {allRegistrations.length} total platform registrations
      </div>
    </div>
  );
};

export default EventRegistrationsTable;