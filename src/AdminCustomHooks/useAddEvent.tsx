import { useState } from 'react';
import axios from 'axios';
import { apiPath } from "../../Utils/Utils"; 
import { auth } from '../Firebase';      
import { toast } from 'react-toastify';      

// Define the shape of the data coming from your form
interface EventData {
  EventName: string;
  eventDate: string;
  location: string;
  eventType: string; 
  banner: string;
  description?: string;

}

const useAddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addEvent = async (data: EventData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Get the current logged-in user
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("You must be logged in to create an event.");
      }

      // 2. Add hidden system fields (User ID, Date)
      const payload = {
        ...data,
        userId: user.uid,            
        organizerName: user.displayName || "Organizer",
        createdAt: new Date().toISOString(),
      };

      // 3. Send to Firebase
      await axios.post(`${apiPath}/Events.json`, payload);
      
      toast.success("Event created successfully! 🎉");
      return true; // Return true so the form can reset

    } catch (err: any) {
      console.error("Add Event Error:", err);
      const errorMessage = err.message || "Failed to create event";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { addEvent, isLoading, error };
};

export default useAddEvent;