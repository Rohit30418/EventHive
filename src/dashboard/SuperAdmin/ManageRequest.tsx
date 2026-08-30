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
    } catch (error) {
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
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      <div className="eh-card rounded-[2rem] p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/40">
              <p className="text-xs font-bold text-slate-400">Total</p>
              <p className="text-2xl font-black text-slate-950 dark:text-white">{data.length}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
              <p className="text-xs font-bold text-amber-600">Pending</p>
              <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{data.filter((x) => !x.isApproved).length}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/30">
              <p className="text-xs font-bold text-emerald-600">Approved</p>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{data.filter((x) => x.isApproved).length}</p>
            </div>
            <div className="rounded-2xl bg-indigo-50 px-4 py-3 dark:bg-indigo-950/30">
              <p className="text-xs font-bold text-indigo-600">Showing</p>
              <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300">{filteredData.length}</p>
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search name, email, company..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="eh-input py-3 pl-11 pr-4 text-sm font-semibold"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <PageLoader label="Loading approval requests..." />
      ) : error ? (
        <ErrorState title="Could not load approval requests" description={error} onAction={fetchData} />
      ) : filteredData.length === 0 ? (
        <div className="eh-card flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] p-8 text-center">
          <UserRoundX className="mb-4 text-slate-300" size={58} />
          <p className="text-xl font-black text-slate-900 dark:text-white">No requests found</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try a different search term or refresh the queue.</p>
        </div>
      ) : (
        <div className="eh-card overflow-hidden rounded-[2rem]">
          <div className="overflow-x-auto">
            <table className="eh-table text-left">
              <thead>
                <tr>
                  <th className="w-12 px-5 py-4 text-center">
                    <input type="checkbox" checked={isAllChecked} onChange={toggleAll} className="h-4 w-4 cursor-pointer accent-indigo-600" />
                  </th>
                  <th className="px-5 py-4">Full Name</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentData.map((org) => (
                  <tr key={org.id}>
                    <td className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={!!checkedItems[org.id]}
                        onChange={() => toggleOne(org.id)}
                        className="h-4 w-4 cursor-pointer rounded accent-indigo-600"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-xs font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          {org.fullName?.charAt(0) || "O"}
                        </div>
                        <span className="font-black text-slate-950 dark:text-white">{org.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-600 dark:text-slate-300">{org.companyName}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">{org.email}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${org.isApproved ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300" : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"}`}>
                        {org.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        {!org.isApproved && (
                          <button
                            onClick={() => updateStatus(org.id, true)}
                            className="rounded-xl bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-300"
                            title="Approve User"
                          >
                            <Check size={17} />
                          </button>
                        )}
                        <button
                          onClick={() => updateStatus(org.id, false)}
                          className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-950/40 dark:text-red-300"
                          title={org.isApproved ? "Revoke Access" : "Reject User"}
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Rows per page:</span>
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none dark:border-slate-700 dark:bg-slate-900" onChange={handleItemsPerPageChange} value={itemPerPage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Page</span>
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none dark:border-slate-700 dark:bg-slate-900" onChange={handlePageChange} value={currentPage}>
                {arrPages.map((page) => (
                  <option key={page} value={page}>{page}</option>
                ))}
              </select>
              <span>of {totalPages}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-indigo-600 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-300"
              >
                <ChevronLeft size={15} /> Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-indigo-600 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-300"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequest;
