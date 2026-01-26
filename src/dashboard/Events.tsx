import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGetEvents from "../AdminCustomHooks/useGetEvents";
import useDeleteEvent from "../AdminCustomHooks/useDeleteEvent";

type EventType = {
  id: string;
  EventName: string;
  banner: string;
  location: string;
  category: string;
  eventDate: string;
};

const Events: React.FC = () => {
  const { data, error, isLoading } = useGetEvents();
  const { isLoading: deleting, deleteEvent } = useDeleteEvent();

  const [filteredData, setFilteredData] = useState<EventType[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) setFilteredData(data);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim().toLowerCase();

    if (!query) return setFilteredData(data);

    const results = data?.filter((item: EventType) =>
      [item.EventName, item.category, item.location].some((x) =>
        x?.toLowerCase().includes(query)
      )
    );

    setFilteredData(results || []);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white h-80 rounded-2xl shadow-md border border-gray-200"
            />
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 font-semibold text-lg">
        ❌ Failed to load events.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 via-white to-gray-200 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover and manage your scheduled events
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <i className="fa fa-search absolute left-3 top-3 text-gray-400"></i>
          <input
            type="search"
            onChange={handleSearch}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
          />
        </div>
      </div>

      {/* Event Grid */}
      {filteredData.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={item.banner}
                  alt={item.EventName}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {item.category || "Event"}
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.EventName}
                </h2>

                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-indigo-500"></i>
                    {item.eventDate}
                  </p>

                  <p className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-indigo-500"></i>
                    {item.location}
                  </p>
                </div>

                <div className="mt-5 flex justify-between items-center border-t border-gray-200 pt-4">
                  <Link
                    to={`/dashboard/EditEvent/${item.id}`}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    <i className="fa fa-edit"></i> Edit
                  </Link>

                  <button
                    onClick={() => deleteEvent(item.id)}
                    disabled={deleting}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm disabled:opacity-60"
                  >
                    <i className="fa fa-trash"></i>
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-500 font-medium text-lg">
          No events found.
        </div>
      )}
    </div>
  );
};

export default Events;
