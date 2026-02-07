import React, { useState, useMemo, useEffect } from "react";
import axios from "axios"; 
import { auth } from "../Firebase";
import { apiPath } from "../../Utils/Utils"; 
import useGetRegistrations from "../AdminCustomHooks/useGetRegistrations";
import useGetEvents from "../AdminCustomHooks/useGetEvents";
import { exportToExcel } from "../utils/exportToExcel";
import { exportIDCardPDF } from "../utils/exportIDCardPDF";
import { 
  Search, FileSpreadsheet, FileBadge, User, 
  Mail, Phone, Loader2, ChevronLeft, ChevronRight 
} from "lucide-react";

interface Props {
  eventId?: string; 
  eventName?: string;
}

const EventRegistrationsTable: React.FC<Props> = ({ eventId: propEventId, eventName = "All Events" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // 1. Get Auth & User Role
  const [currentUser, setCurrentUser] = useState<{ uid: string; role: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const res = await axios.get(`${apiPath}/Organizer/${user.uid}.json`);
          const role = res.data?.role || "Organizer"; 
          setCurrentUser({ uid: user.uid, role });
        } catch (err) {
          console.error("Error fetching user role:", err);
          setCurrentUser({ uid: user.uid, role: "Organizer" });
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Fetch Data
  const { data: allRegistrations = [], isLoading: regLoading } = useGetRegistrations();
  const { data: allEvents = [], isLoading: eventsLoading } = useGetEvents();
  
  // 3. Filter Logic
  const filteredData = useMemo(() => {
    if (!currentUser) return [];

    let allowedEventIds: Set<string> | null = null;

    if (currentUser.role !== "SuperAdmin") {
        allowedEventIds = new Set(
            allEvents
            .filter((event: any) => String(event.userId) === String(currentUser.uid))
            .map((event: any) => String(event.id))
        );
    }

    const results = allRegistrations.filter(reg => {
      const regEventId = String(reg.eventId);

      if (allowedEventIds && !allowedEventIds.has(regEventId)) return false; 
      if (propEventId && regEventId !== String(propEventId)) return false;

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        return (
          (reg.fullName && reg.fullName.toLowerCase().includes(q)) ||
          (reg.email && reg.email.toLowerCase().includes(q))
        );
      }

      return true;
    });

    return results;
  }, [allRegistrations, allEvents, currentUser, propEventId, searchTerm]);

  // 4. Pagination Logic (Derived)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // UI Helper: Initials
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  // --- RENDERING ---

  if (regLoading || eventsLoading || authLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-20 flex flex-col items-center justify-center shadow-sm">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-medium italic">Synchronizing participant data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[1.5rem] shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* TOOLBAR */}
      <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {propEventId ? `Attendees: ${eventName}` : "All Attendees"}
          </h2>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             {currentUser?.role === "SuperAdmin" ? "Total System Records: " : "My Event Records: "}
             <span className="font-bold text-slate-700">{filteredData.length}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search name or email..." 
                 className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none w-full sm:w-64"
                 onChange={(e) => setSearchTerm(e.target.value)}
                 value={searchTerm}
              />
           </div>

           <button
            onClick={() => exportToExcel(filteredData, eventName)}
            disabled={filteredData.length === 0}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-40 shadow-md"
          >
            <FileSpreadsheet size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Participant</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Associated Event</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.length > 0 ? (
              currentData.map((user: any, index: number) => {
                const eventInfo = allEvents.find((e: any) => String(e.id) === String(user.eventId));
                
                let displayEventName = "Unknown Event";
                let badgeStyle = "bg-red-50 text-red-600 border-red-200";

                if (eventInfo) {
                    displayEventName = eventInfo.EventName || eventInfo.eventName || "Unnamed Event";
                    badgeStyle = "bg-white border-slate-200 text-slate-600";
                } else {
                    displayEventName = "Event ID Mismatch"; 
                }

                return (
                  <tr key={user.id || index} className="group hover:bg-slate-50/80">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold border border-indigo-200">
                          {getInitials(user.fullName)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{user.fullName || "N/A"}</p>
                          <p className="text-xs text-slate-400">{user.designation || "Participant"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5"><Mail size={12}/> {user.email}</span>
                        <span className="flex items-center gap-1.5 text-slate-400"><Phone size={12}/> {user.mobile || "No Phone"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                           <span className={`inline-block px-3 py-1 border rounded-full text-[11px] font-medium shadow-sm w-fit ${badgeStyle}`}>
                             {displayEventName}
                           </span>
                           {!eventInfo && (
                             <span className="text-[10px] text-slate-400 font-mono select-all">
                               ID: {user.eventId?.substring(0, 15)}...
                             </span>
                           )}
                        </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => exportIDCardPDF(user, displayEventName)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-transparent hover:border-indigo-100"
                        title="Download Badge"
                      >
                        <FileBadge size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <User size={48} className="mb-2" />
                      <p className="font-medium">No registrations match your account.</p>
                      {currentUser?.role !== "SuperAdmin" && (
                          <p className="text-sm">Only registrations for events created by you are shown.</p>
                      )}
                    </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER & PAGINATION */}
      {filteredData.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/50 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-600">
            
            {/* Left: Rows Per Page */}
            <div className="flex items-center gap-3">
               <span>Rows per page:</span>
               <select 
                 className="bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-indigo-500 text-xs font-medium cursor-pointer"
                 value={itemsPerPage}
                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
               >
                 <option value={5}>5</option>
                 <option value={10}>10</option>
                 <option value={20}>20</option>
                 <option value={50}>50</option>
               </select>
               <span className="text-slate-400">
                 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
               </span>
            </div>

            {/* Right: Navigation */}
            <div className="flex items-center gap-2">
               <button
                 onClick={() => handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
                 className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronLeft size={16} />
               </button>
               
               {/* Page Numbers */}
               <div className="flex gap-1">
                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Simple logic to show window of pages, can be advanced later
                    let p = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                       p = currentPage - 2 + i;
                    }
                    if (p > totalPages) return null;

                    return (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                          currentPage === p 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {p}
                      </button>
                    );
                 })}
               </div>

               <button
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronRight size={16} />
               </button>
            </div>

          </div>
      )}
    </div>
  );
};

export default EventRegistrationsTable;