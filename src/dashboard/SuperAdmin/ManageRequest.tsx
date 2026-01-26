import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiPath } from '../../../Utils/Utils';

// Define the shape of your Organizer data
export type Organizer = {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  isApproved: boolean;
  role?: string;
};

const ManageRequest = () => {
  // --- STATE ---
  const [data, setData] = useState<Organizer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // --- 1. FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${apiPath}/Organizer.json`);
      
      if (response) {
        // Convert Firebase Object to Array
        const formatted: Organizer[] = Object.entries(response).map(([key, val]: any) => ({
            id: key,
            ...val
        }));
        
        // Sort: Pending users first
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
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. APPROVE / REJECT LOGIC ---
  const updateStatus = async (id: string, status: boolean) => {
    try {
      // Optimistic UI Update (Update screen instantly)
      setData(prev => prev.map(item => item.id === id ? { ...item, isApproved: status } : item));

      // Send to Firebase
      await axios.patch(`${apiPath}/Organizer/${id}.json`, { isApproved: status });
      
      toast.success(status ? "User Approved ✅" : "User Access Revoked ❌");
    } catch (error) {
      toast.error("Update failed, reverting changes.");
      fetchData(); // Reload real data on error
    }
  };

  // --- 3. FILTER & PAGINATION LOGIC ---
  
  // A. Filter by Search
  const filteredData = useMemo(() => {
    return data.filter(org => 
      org.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // B. Calculate Pagination Indices
  const totalPages = Math.ceil(filteredData.length / itemPerPage);
  const firstIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = firstIndex + itemPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const arrPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // C. Checkbox Logic (Derived State)
  const isAllChecked = currentData.length > 0 && currentData.every(org => checkedItems[org.id]);

  // --- 4. HANDLERS ---
  const toggleAll = () => {
    const newVal = !isAllChecked;
    const newChecked = { ...checkedItems };
    currentData.forEach(org => { newChecked[org.id] = newVal; });
    setCheckedItems(newChecked);
  };

  const toggleOne = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(e.target.value));
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when changing limit
  };

  // --- 5. RENDER ---
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
         <div>
            <h1 className="text-2xl font-bold text-gray-800">Organizer Requests</h1>
            <p className="text-sm text-gray-500">Manage approval status for new signups</p>
         </div>
         <button 
            onClick={fetchData} 
            className="text-sm bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
         >
            <i className="fa fa-refresh"></i> Refresh
         </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-end">
        <div className="relative w-full md:w-72">
            <input
                type="text"
                placeholder="Search name, email, company..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
            <i className="fa fa-search absolute left-3 top-2.5 text-gray-400"></i>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No requests found matching your criteria.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-indigo-600 text-white">
                <tr>
                    <th className="p-4 w-10 text-center">
                    <input type="checkbox" checked={isAllChecked} onChange={toggleAll} className="cursor-pointer h-4 w-4" />
                    </th>
                    <th className="p-4 text-sm font-semibold uppercase tracking-wider">Full Name</th>
                    <th className="p-4 text-sm font-semibold uppercase tracking-wider">Company</th>
                    <th className="p-4 text-sm font-semibold uppercase tracking-wider">Email</th>
                    <th className="p-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                    <th className="p-4 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {currentData.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-center">
                        <input 
                            type="checkbox" 
                            checked={!!checkedItems[org.id]} 
                            onChange={() => toggleOne(org.id)} 
                            className="cursor-pointer h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                    </td>
                    <td className="p-4 font-medium text-gray-900">{org.fullName}</td>
                    <td className="p-4 text-gray-600">{org.companyName}</td>
                    <td className="p-4 text-gray-500 text-sm">{org.email}</td>
                    <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            org.isApproved 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : "bg-orange-100 text-orange-700 border border-orange-200"
                        }`}>
                            {org.isApproved ? "Approved" : "Pending"}
                        </span>
                    </td>
                    <td className="p-4">
                        <div className="flex justify-center gap-3">
                            {/* Approve Button */}
                            {!org.isApproved && (
                                <button 
                                    onClick={() => updateStatus(org.id, true)}
                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                    title="Approve User"
                                >
                                    <i className="fa fa-check"></i>
                                </button>
                            )}
                            
                            {/* Reject / Revoke Button */}
                            <button 
                                onClick={() => updateStatus(org.id, false)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                title={org.isApproved ? "Revoke Access" : "Reject User"}
                            >
                                <i className="fa fa-xmark"></i>
                            </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
                
                {/* FOOTER */}
                <tfoot className="bg-gray-50 border-t border-gray-200">
                <tr>
                    <td colSpan={6} className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                            
                            {/* Rows Per Page */}
                            <div className="flex items-center gap-2">
                                <span>Rows per page:</span>
                                <select 
                                    className="bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:border-indigo-500"
                                    onChange={handleItemsPerPageChange} 
                                    value={itemPerPage}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </div>

                            {/* Page Selector */}
                            <div className="flex items-center gap-2">
                                <span>Page</span>
                                <select 
                                    className="bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:border-indigo-500"
                                    onChange={handlePageChange} 
                                    value={currentPage}
                                >
                                    {arrPages.map(page => (
                                        <option key={page} value={page}>{page}</option>
                                    ))}
                                </select>
                                <span>of {totalPages}</span>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded border ${
                                        currentPage === 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-200'
                                    }`}
                                >
                                    <i className="fa fa-angle-left"></i> Prev
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded border ${
                                        currentPage === totalPages 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-200'
                                    }`}
                                >
                                    Next <i className="fa fa-angle-right"></i>
                                </button>
                            </div>

                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequest;