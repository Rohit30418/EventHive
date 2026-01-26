import useGetEvent from '../AdminCustomHooks/useGetEvents';
import EventCard from '../components/EventCard';
import { Loader2 } from "lucide-react"; // Optional: Use a nice icon or your Preloader component

const AllEvents = () => {
  const { data, isLoading } = useGetEvent();

  // 1. Better Loading State
  if (isLoading) {
    return (
      <div className="h-[50vh] flex flex-col justify-center items-center gap-3">
         <Loader2 className="animate-spin text-indigo-600" size={40} />
         <p className="text-slate-500 font-medium">Loading amazing events...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Added a subtle gradient to the header for premium feel */}
        <h1 className='h-[25vh] bg-gradient-to-r from-indigo-50 to-purple-50 font-bold text-4xl flex justify-center items-center text-slate-800'>
          Explore Events
        </h1>
      </div>

      <div className='px-6 py-12 container mx-auto'>
        {/* 2. Empty State Handling (Senior Habit) */}
        {!isLoading && data?.length === 0 ? (
           <div className="text-center py-20 text-slate-400">
              <p>No upcoming events found.</p>
           </div>
        ) : (
           <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
             {data?.map((item, index) => (
               <EventCard 
                  key={item.id} 
                  event={item} 
                  index={index} // 👈 PASSED THE INDEX HERE
               />
             ))}
           </div>
        )}
      </div>
    </>
  );
};

export default AllEvents;