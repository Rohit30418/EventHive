import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";

interface Registration {
  regId: string;
  eventId: string; // The ID of the event this user registered for
  fullName?: string;
  email?: string;
  mobile?: string;
  [key: string]: any;
}

const fetchRegistrations = async (): Promise<Registration[]> => {
  const res = await axios.get(`${apiPath}/Registrations.json`);
  const data = res.data || {};
  
  const flat: Registration[] = [];

  // 1. Outer Loop: Iterate through each EVENT ID (The folders)
  Object.keys(data).forEach((eventId) => {
    const eventRegistrations = data[eventId];

    if (!eventRegistrations) return;

    // 2. Inner Loop: Iterate through each REGISTRATION ID inside that event
    Object.keys(eventRegistrations).forEach((regId) => {
      const userDetails = eventRegistrations[regId];

      // Combine it all into a single flat object for the table
      flat.push({
        regId: regId,        // The unique key for this specific registration
        // We use the folder name (eventId) as the source of truth for the event ID
        eventId: eventId,    
        ...userDetails,      // Spread the actual user data (name, email, etc.)
      });
    });
  });

  return flat;
};

const useGetRegistrations = () => {
  return useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });
};

export default useGetRegistrations;