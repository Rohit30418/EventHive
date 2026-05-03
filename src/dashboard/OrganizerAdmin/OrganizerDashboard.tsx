import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase"; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Custom Hooks
import useGetEvents from "../../AdminCustomHooks/useGetEvents"; 
import useGetRegistrations from "../../AdminCustomHooks/useGetRegistrations";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrganizerDashboard = () => {
  const uid = auth?.currentUser?.uid;
  
  const { data: allEvents, isLoading: eventsLoading } = useGetEvents();
  const { data: allRegistrations, isLoading: regLoading } = useGetRegistrations();

  const stats = useMemo(() => {
    if (!uid) return { myEvents: [], myRegistrations: [], totalAttendees: 0, upcomingEvents: 0 };

    const myEvents = allEvents?.filter((e) => e.userId === uid) || [];
    const myEventIds = myEvents.map((e) => e.id);
    const myRegistrations = (allRegistrations || []).filter((r) => 
        myEventIds.includes(r.eventId)
    );

    return {
        myEvents,
        myRegistrations,
        totalAttendees: myRegistrations.length,
        upcomingEvents: myEvents.filter((e) => new Date(e.eventDate) > new Date()).length
    };
  }, [allEvents, allRegistrations, uid]);

  const pieData = {
    labels: ["Upcoming", "Completed"],
    datasets: [{
        data: [
            stats.upcomingEvents, 
            stats.myEvents.length - stats.upcomingEvents
        ],
        backgroundColor: ["#6366F1", "#10B981"],
        hoverBackgroundColor: ["#4F46E5", "#059669"],
        borderWidth: 0,
        hoverOffset: 10
    }],
  };

  if (eventsLoading || regLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 animate-pulse font-medium">Synchronizing data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
            Analytics <span className="text-indigo-600">Overview</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Monitoring {stats.myEvents.length} active events in your workspace.
          </p>
        </div>
        <Link
          to="/dashboard/CreateEvent"
          className="group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform"></i>
          <span className="font-bold">Initialize New Event</span>
        </Link>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Workspace", val: stats.myEvents.length, icon: "fa-layer-group", theme: "indigo" },
          { label: "Total Reach", val: stats.totalAttendees, icon: "fa-users-viewfinder", theme: "emerald" },
          { label: "Pipeline Events", val: stats.upcomingEvents, icon: "fa-calendar-check", theme: "amber" },
        ].map((card, i) => (
          <div key={i} className="group relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] dark:opacity-[0.05] bg-current group-hover:scale-150 transition-transform duration-700`} />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{card.label}</p>
                <h3 className="text-4xl font-black text-slate-800 dark:text-white">{card.val}</h3>
              </div>
              <div className={`p-4 rounded-2xl bg-${card.theme}-50 dark:bg-${card.theme}-900/20 text-${card.theme}-600 dark:text-${card.theme}-400`}>
                <i className={`fa-solid ${card.icon} text-2xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Visualizations & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Chart Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold dark:text-white">Lifecycle Distribution</h2>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black px-2 py-1 rounded-lg uppercase">Real-time</span>
          </div>
          <div className="h-[280px] w-full flex items-center justify-center">
            <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, font: { weight: 'bold' } } } } }} />
          </div>
        </div>

        {/* Activity Table */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold dark:text-white">Registration Stream</h2>
            <Link to="/dashboard/Registrations" className="text-indigo-600 text-sm font-bold hover:underline">View All Logs</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-4">Participant</th>
                  <th className="pb-4">Event Context</th>
                  <th className="pb-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {stats.myRegistrations.slice(0, 5).map((reg, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                          {reg.fullName?.charAt(0)}
                        </div>
                        <span className="font-bold text-sm dark:text-slate-200">{reg.fullName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-500 dark:text-slate-400">
                      {stats.myEvents.find((e) => e.id === reg.eventId)?.EventName || "Untitled Event"}
                    </td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase">
                        <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {stats.myRegistrations.length === 0 && (
              <div className="py-12 text-center">
                <i className="fa-solid fa-inbox text-4xl text-slate-200 dark:text-slate-700 mb-4"></i>
                <p className="text-slate-400 text-sm font-medium">No recent activity detected.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;