import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

interface EventCardTypes {
  index: number;
  event: {
    id: string;
    title: string;
    banner: string;
    EventName: string;
    eventType: string;
    location: string;
    eventDate: string;
  };
}

const EventCard: React.FC<EventCardTypes> = ({ event, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-48 sm:h-56 shrink-0">
        <img
          src={event?.banner}
          alt={event?.EventName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-primary shadow-sm uppercase tracking-wide">
            {event?.eventType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {event.EventName}
        </h4>

        <div className="space-y-2 mb-6">
          {/* Date */}
          <div className="flex items-center text-gray-500 text-sm">
            <div className="w-8 flex justify-center text-primary/80">
                <i className="fa-solid fa-calendar"></i>
            </div>
            <span className="font-medium">{event?.eventDate}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm">
            <div className="w-8 flex justify-center text-primary/80">
                <i className="fa-solid fa-location-dot"></i>
            </div>
            <span className="font-medium truncate">{event?.location}</span>
          </div>
        </div>

        {/* Action Button (Pushed to bottom) */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <Link
            to={`/Event/${event.id}`}
            className="flex items-center justify-center w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg transition-all duration-200 group-hover:translate-x-1"
          >
            View Details <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;