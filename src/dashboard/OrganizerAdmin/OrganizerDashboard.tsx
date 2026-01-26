import  { useMemo } from "react";
import {  Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase"; 
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Custom Hooks
import useGetEvents from "../../AdminCustomHooks/useGetEvents"; 
import useGetRegistrations from "../../AdminCustomHooks/useGetRegistrations";

ChartJS.register(LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const OrganizerDashboard = () => {
  const uid = auth?.currentUser?.uid;
  
  // 1. FETCH REAL DATA
  const { data: allEvents, isLoading: eventsLoading } = useGetEvents();
  const { data: allRegistrations, isLoading: regLoading } = useGetRegistrations();

  // 2. CALCULATE STATS (Memoized for performance)
  const stats = useMemo(() => {
    if (!uid) return { myEvents: [], myRegistrations: [], totalAttendees: 0 };

    // A. Filter only MY events
    // Note: Ensure your useAddEvent hook saves 'userId' when creating an event!
    const myEvents = allEvents.filter((e: any) => e.userId === uid);

    // B. Filter registrations for MY events
    const myEventIds = myEvents.map((e: any) => e.id);
    const myRegistrations = (allRegistrations || []).filter((r: any) => 
        myEventIds.includes(r.eventId)
    );

    return {
        myEvents,
        myRegistrations,
        totalAttendees: myRegistrations.length,
        upcomingEvents: myEvents.filter((e: any) => new Date(e.eventDate) > new Date()).length
    };
  }, [allEvents, allRegistrations, uid]);


  // Dynamic Pie Data
  const pieData = {
    labels: ["Upcoming", "Completed"],
    datasets: [{
        data: [
            stats.upcomingEvents, 
            stats.myEvents.length - stats?.upcomingEvents
        ],
        backgroundColor: ["#6366F1", "#10B981"],
        borderWidth: 0,
    }],
  };

  // Loading State
  if (eventsLoading || regLoading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in-up p-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Organizer Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here is what's happening.</p>
        </div>
        <Link
          to="/dashboard/CreateEvent"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Add New Event</span>
        </Link>
      </div>

      {/* Stats Cards (REAL DATA) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "My Events", value: stats.myEvents.length, color: "from-indigo-500 to-indigo-700", icon: "fa-calendar" },
          { title: "Total Attendees", value: stats.totalAttendees, color: "from-emerald-500 to-teal-600", icon: "fa-users" },
          { title: "Upcoming", value: stats.upcomingEvents, color: "from-orange-500 to-amber-600", icon: "fa-clock" },
        ].map((card, index) => (
          <div key={index} className={`relative overflow-hidden bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow-lg`}>
            <i className={`fa-solid ${card.icon} absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12`}></i>
            <div className="relative z-10">
              <h2 className="text-sm font-medium opacity-90 uppercase">{card.title}</h2>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Event Status</h2>
            <div className="h-[250px] w-full flex justify-center">
                <Pie data={pieData} />
            </div>
        </div>
        
        {/* Recent Registrations Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden">
            <h2 className="text-lg font-bold mb-4">Recent Registrations</h2>
            <div className="overflow-auto max-h-[250px]">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b text-slate-500">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Event</th>
                            <th className="pb-2 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.myRegistrations.slice(0, 5).map((reg: any, i: number) => (
                            <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                <td className="py-3 font-medium">{reg.fullName}</td>
                                <td className="py-3 text-slate-500">
                                    {stats.myEvents.find((e:any) => e.id === reg.eventId)?.EventName || "Unknown"}
                                </td>
                                <td className="py-3 text-right text-slate-400">Just now</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {stats.myRegistrations.length === 0 && <p className="text-center text-slate-400 mt-4">No registrations yet.</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;