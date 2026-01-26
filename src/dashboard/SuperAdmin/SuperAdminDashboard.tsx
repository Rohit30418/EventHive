import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// API / Hooks
import GetOrgniserData from "./GetOrgniserData";
import useGetEvents from "../../AdminCustomHooks/useGetEvents";

ChartJS.register(LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SuperAdminDashboard = () => {
  // 1. STATE FOR ORGANIZERS (Since GetOrgniserData isn't a hook yet)
  const [organizers, setOrganizers] = useState<any[]>([]);
  
  // 2. HOOK FOR EVENTS
  const { data: allEvents } = useGetEvents();

  // 3. FETCH ORGANIZERS
  useEffect(() => {
    async function load() {
        const data = await GetOrgniserData();
        if (data) setOrganizers(data);
    }
    load();
  }, []);

  // 4. CALCULATE STATS
  const totalOrganizers = organizers.length;
  const approvedOrganizers = organizers.filter(o => o.isApproved).length;
  const pendingRequestCount = totalOrganizers - approvedOrganizers;
  const totalEvents = allEvents.length;

  // Chart Data
  const pieData = {
    labels: ["Approved", "Pending"],
    datasets: [{
        data: [approvedOrganizers, pendingRequestCount],
        backgroundColor: ["#10B981", "#F59E0B"],
        hoverOffset: 6,
    }],
  };

  return (
    <div className="bg-gray-100 p-6 space-y-6 min-h-screen">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Super Admin Overview</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
          <h2 className="text-gray-600">Total Events</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <h2 className="text-gray-600">Pending Requests</h2>
          <p className="text-3xl font-bold text-orange-600">{pendingRequestCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
          <h2 className="text-gray-600">Active Organizers</h2>
          <p className="text-3xl font-bold text-emerald-600">{approvedOrganizers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Organizer Status</h2>
          <div className="h-64 flex justify-center">
             <Pie data={pieData} />
          </div>
        </div>
        
        {/* Recent Organizers List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Newest Organizers</h2>
          <ul className="space-y-3">
            {organizers.slice(0, 5).map((org, i) => (
                <li key={i} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="font-medium">{org.fullName}</span>
                    <span className={`text-sm px-2 rounded-full ${org.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {org.isApproved ? "Active" : "Pending"}
                    </span>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;