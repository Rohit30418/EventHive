import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { auth } from "../Firebase";
import { apiPath } from "../../Utils/Utils";
import useGetRegistrations from "../AdminCustomHooks/useGetRegistrations";
import useGetEvents from "../AdminCustomHooks/useGetEvents";
import { Search, FileSpreadsheet, FileBadge, User, Mail, Phone, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { ErrorState, PageLoader } from "../common/StateViews";
import useDeleteRegistration from "../AdminCustomHooks/useDeleteRegistration";
import type { EventType } from "../Types/eventType";
import type { Registration } from "../Types/registrationType";

type ExportIDCardPDFFn =
  typeof import("../utils/exportIDCardPDF").exportIDCardPDF;

type ExportUserData = Parameters<ExportIDCardPDFFn>[0];

interface Props {
  eventId?: string;
  eventName?: string;
}

const EventRegistrationsTable: React.FC<Props> = ({ eventId: propEventId, eventName = "All Events" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
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

  const { data: allRegistrations = [], isLoading: regLoading, error: regError, refetch: refetchRegistrations } = useGetRegistrations();
  const { data: allEvents = [], isLoading: eventsLoading, error: eventsError } = useGetEvents();
  const { deleteRegistration, isLoading: isDeleting } = useDeleteRegistration();

  const handleDelete = async (eventId: string, regId: string, fullName?: string) => {
    const confirmed = window.confirm(
      `Delete registration for "${fullName || "this participant"}"? This can't be undone.`
    );
    if (!confirmed) return;

    const success = await deleteRegistration(eventId, regId);
    if (success) refetchRegistrations();
  };

  const filteredData = useMemo(() => {
    if (!currentUser) return [];

    let allowedEventIds: Set<string> | null = null;

    if (currentUser.role !== "SuperAdmin") {
      allowedEventIds = new Set(
        allEvents
          .filter((event: EventType) => String(event.userId) === String(currentUser.uid))
          .map((event: EventType) => String(event.id))
      );
    }

    return allRegistrations.filter((reg) => {
      const regEventId = String(reg.eventId);

      if (allowedEventIds && !allowedEventIds.has(regEventId)) return false;
      if (propEventId && regEventId !== String(propEventId)) return false;

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        return (
          (reg.fullName && reg.fullName.toLowerCase().includes(q)) ||
          (reg.email && reg.email.toLowerCase().includes(q)) ||
          (reg.mobile && reg.mobile.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [allRegistrations, allEvents, currentUser, propEventId, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getInitials = (name?: string) => {
    if (!name) return "NA";

    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleExportIDCard = async (
    user: Registration,
    displayEventName: string
  ) => {
    const { exportIDCardPDF } = await import("../utils/exportIDCardPDF");

    const pdfUser = {
      ...user,
      fullName: user.fullName ?? "Attendee",
      email: user.email ?? "N/A",
      mobile: user.mobile ?? "N/A",
      designation: user.designation ?? "Participant",
      dob: user.dob ?? "",
      gender: user.gender ?? "N/A",
      photo: user.photo ?? "",
      interests: user.interests ?? [],
      consent: user.consent ?? false,
      timestamp: user.timestamp ?? "",
    } as ExportUserData;

    exportIDCardPDF(pdfUser, displayEventName);
  };

  const handleExportExcel = async () => {
    const { exportToExcel } = await import("../utils/exportToExcel");

    const excelData = filteredData.map((reg) => ({
      ...reg,
      userId: reg.regId,
      fullName: reg.fullName || "Guest",
      email: reg.email || "No Email",
      mobile: reg.mobile || "-",
      designation: reg.designation || "Participant",
      gender: reg.gender || "-",
    }));

    exportToExcel(excelData, eventName);
  };

  if (regLoading || eventsLoading || authLoading) {
    return <PageLoader label="Synchronizing participant data..." />;
  }

  if (regError || eventsError) {
    return (
      <ErrorState
        title="Could not load registrations"
        description={String(regError || eventsError)}
      />
    );
  }

  return (
    <div className="eh-card overflow-hidden rounded-[2rem]">
      <div className="border-b border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-indigo-50/50 p-6 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 md:p-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">
              Registration Center
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              {propEventId ? `Attendees: ${eventName}` : "All Attendees"}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.14)]" />
              {currentUser?.role === "SuperAdmin" ? "Total system records:" : "My event records:"}
              <span className="font-black text-slate-800 dark:text-slate-100">{filteredData.length}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search name, email or phone..."
                className="eh-input py-3 pl-11 pr-4 text-sm font-semibold"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>

            <button
              onClick={handleExportExcel}
              disabled={filteredData.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileSpreadsheet size={18} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="eh-table-wrap border-0">
        <table className="eh-table text-left">
          <thead>
            <tr>
              <th className="px-6 py-4">Participant</th>
              <th className="px-6 py-4">Contact Details</th>
              <th className="px-6 py-4">Associated Event</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentData.length > 0 ? (
              currentData.map((user: Registration, index: number) => {
                const eventInfo = allEvents.find((event: EventType) => String(event.id) === String(user.eventId));
                const displayEventName = eventInfo ? eventInfo.EventName || eventInfo.eventName || "Unnamed Event" : "Event ID Mismatch";
                const badgeStyle = eventInfo
                  ? "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  : "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";

                return (
                  <tr key={user.id || user.regId || index} className="group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-xs font-black text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900">
                          {getInitials(user.fullName)}
                        </div>
                        <div>
                          <p className="font-black text-slate-950 dark:text-white">{user.fullName || "N/A"}</p>
                          <p className="text-xs font-semibold text-slate-400">{user.designation || "Participant"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
                        <span className="flex items-center gap-2"><Mail size={13} /> {user.email || "No Email"}</span>
                        <span className="flex items-center gap-2 text-slate-400"><Phone size={13} /> {user.mobile || "No Phone"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-black ${badgeStyle}`}>
                          {displayEventName}
                        </span>
                        {!eventInfo && (
                          <span className="select-all font-mono text-[10px] text-slate-400">
                            ID: {user.eventId?.substring(0, 15)}...
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleExportIDCard(user, displayEventName)}
                          className="rounded-xl border border-transparent p-2 text-slate-400 hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/50"
                          title="Download Badge"
                        >
                          <FileBadge size={20} />
                        </button>
                        {currentUser?.role === "SuperAdmin" && (
                          <button
                            onClick={() => handleDelete(user.eventId, user.regId, user.fullName)}
                            disabled={isDeleting}
                            className="rounded-xl border border-transparent p-2 text-slate-400 hover:border-red-100 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:border-red-900 dark:hover:bg-red-950/40"
                            title="Delete Registration"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center text-slate-400">
                    <User size={52} className="mb-3" />
                    <p className="font-black text-slate-600 dark:text-slate-300">No registrations match your filters.</p>
                    {currentUser?.role !== "SuperAdmin" && <p className="mt-1 text-sm">Only registrations for events created by you are shown.</p>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-semibold">Rows per page:</span>
            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-200 bg-white p-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p = i + 1;
                if (totalPages > 5 && currentPage > 3) p = currentPage - 2 + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black ${currentPage === p ? "bg-indigo-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-slate-200 bg-white p-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
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