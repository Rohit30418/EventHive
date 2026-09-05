import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Check, ChevronLeft, ChevronRight, RefreshCw, Search, UserRoundX, X } from "lucide-react";
import { ErrorState, PageLoader } from "../../common/StateViews";
import { apiPath } from "../../../Utils/Utils";
import GetOrganizerData from "./GetOrganizerData";
import type { Organizer } from "../../Types/organizerType";
import { auth } from "../../Firebase";
const ManageRequest = () => {
  const [data, setData] = useState<Organizer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const formatted = await GetOrganizerData();
      if (formatted.length > 0) {
        const sortedData = formatted.sort((a, b) => {
          if (a.isApproved === b.isApproved) return 0;
          return a.isApproved ? 1 : -1;
        });
        setData(sortedData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Failed to load requests";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: boolean) => {
    try {
      setData((prev) => prev.map((item) => (item.id === id ? { ...item, isApproved: status } : item)));
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in.");
      const token = await user.getIdToken();
      await axios.patch(`${apiPath}/Organizer/${id}.json?auth=${token}`, { isApproved: status });
      toast.success(status ? "User Approved ✅" : "User Access Revoked ❌");
    } catch {
      toast.error("Update failed, reverting changes.");
      fetchData();
    }
  };

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter(
      (org) =>
        org.fullName?.toLowerCase().includes(query) ||
        org.email?.toLowerCase().includes(query) ||
        org.companyName?.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemPerPage));
  const firstIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = firstIndex + itemPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const arrPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isAllChecked = currentData.length > 0 && currentData.every((org) => checkedItems[org.id]);

  const toggleAll = () => {
    const newVal = !isAllChecked;
    const newChecked = { ...checkedItems };
    currentData.forEach((org) => {
      newChecked[org.id] = newVal;
    });
    setCheckedItems(newChecked);
  };

  const toggleOne = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(e.target.value));
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) return <PageLoader label="Loading organizer requests..." />;
  if (error) return <ErrorState title="Could not load organizer requests" description={error} />;

  return (
    <div className="space-y-7">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">Approval Queue</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">Organizer Requests</h1>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Review, approve, revoke and search organizer signups.</p>
          </div>
          <button
            onClick={fetchData}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <RefreshCw size={17} /> Refresh
          </button>
        </div>
      </div>

      <div className="eh-card overflow-hidden rounded-[2rem]">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search name, email or company..."
              className="eh-input py-3 pl-11 pr-4 text-sm font-semibold"
            />
          </div>
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Showing <span className="font-black text-slate-900 dark:text-white">{filteredData.length}</span> organizers
          </div>
        </div>

        <div className="eh-table-wrap border-0">
          <table className="eh-table text-left">
            <thead>
              <tr>
                <th className="px-5 py-4">
                  <input type="checkbox" checked={isAllChecked} onChange={toggleAll} aria-label="Select all visible organizers" />
                </th>
                <th className="px-5 py-4">Organizer</th>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentData.length > 0 ? (
                currentData.map((org) => (
                  <tr key={org.id}>
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={Boolean(checkedItems[org.id])}
                        onChange={() => toggleOne(org.id)}
                        aria-label={`Select ${org.fullName || org.email || "organizer"}`}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-black text-slate-950 dark:text-white">{org.fullName || "Unnamed organizer"}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{org.email || "No email"}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {org.companyName || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ${
                          org.isApproved
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        {org.isApproved ? <Check size={14} /> : <UserRoundX size={14} />}
                        {org.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => updateStatus(org.id, !org.isApproved)}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition-colors ${
                          org.isApproved
                            ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-950/40 dark:text-red-300"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-300"
                        }`}
                      >
                        {org.isApproved ? <X size={16} /> : <Check size={16} />}
                        {org.isApproved ? "Revoke" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    No organizer requests match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Rows per page:</span>
            <select
              value={itemPerPage}
              onChange={handleItemsPerPageChange}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-200 bg-white p-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
            >
              <ChevronLeft size={16} />
            </button>

            <select
              value={currentPage}
              onChange={handlePageChange}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              {arrPages.map((page) => (
                <option key={page} value={page}>
                  Page {page} of {totalPages}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-slate-200 bg-white p-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
