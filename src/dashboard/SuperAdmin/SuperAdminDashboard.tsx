import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Loader2 } from "lucide-react";

// Helper Import
import GetOrgniserData from "./GetOrgniserData";
import useGetEvents from "../../AdminCustomHooks/useGetEvents";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define Interface for your Organizer Data
interface Organizer {
  id: string;
  fullName: string;
  email: string;
  isApproved: boolean;
}

const SuperAdminDashboard = () => {
  // TS Generic: Tell useState this is an array of Organizers
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [orgLoading, setOrgLoading] = useState(true);
  
  // Custom Hook for events
  const { data: allEvents, isLoading: eventsLoading } = useGetEvents();

  // Fetch Organizers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setOrgLoading(true);
        const data = await GetOrgniserData();
        
        if (data) {
          setOrganizers([...data].reverse());
        }
      } catch (error) {
        console.error("Failed to fetch organizers", error);
      } finally {
        setOrgLoading(false);
      }
    };
    fetchData();
  }, []);

  // Stats Calculations (Derived State)
  const totalEvents = allEvents?.length || 0;
  const totalOrganizers = organizers.length;
  const approvedOrganizers = organizers.filter((o) => o.isApproved).length;
  const pendingRequests = totalOrganizers - approvedOrganizers;

  const pieData = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [approvedOrganizers, pendingRequests],
        backgroundColor: ["#10B981", "#F59E0B"],
        hoverOffset: 4,
      },
    ],
  };

  // 3. Loading State: Wait for BOTH sources
  if (orgLoading || eventsLoading) {
    return (
        <div className="h-[80vh] flex items-center justify-center flex-col">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <span className="text-gray-500 font-medium">Loading Dashboard...</span>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Super Admin Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
          <h2 className="text-gray-500 font-medium">Total Events</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <h2 className="text-gray-500 font-medium">Pending Requests</h2>
          <p className="text-3xl font-bold text-orange-500 mt-2">{pendingRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <h2 className="text-gray-500 font-medium">Active Organizers</h2>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{approvedOrganizers}</p>
        </div>
      </div>

      {/* Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Organizer Status</h2>
          <div className="h-64 flex justify-center">
             {totalOrganizers === 0 ? (
                <div className="flex items-center text-gray-400">No organizers found.</div>
             ) : (
                <Pie data={pieData} />
             )}
          </div>
        </div>
        
        {/* List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Newest Organizers</h2>
          <ul className="space-y-4">
            {organizers.slice(0, 5).map((org) => (
               // TS FIX: Use org.id instead of index (i)
               <li key={org.id || Math.random()} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">{org.fullName}</p>
                    <p className="text-xs text-gray-500">{org.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${org.isApproved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {org.isApproved ? "Approved" : "Pending"}
                  </span>
               </li>
            ))}
            {organizers.length === 0 && <p className="text-gray-400 text-sm">No recent data.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;