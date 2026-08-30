import { useState } from 'react';
import axios from 'axios';
import { apiPath } from "../../Utils/Utils"; 
import { auth } from '../Firebase';      
import { toast } from 'react-toastify';  
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/error';    

export interface EventData {
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
  const queryClient = useQueryClient();
  const addEvent = async (data: EventData) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in.");

      // SECURITY FIX: Get the token
      const token = await user.getIdToken();

      const payload = {
        ...data,
        userId: user.uid,            
        organizerName: user.displayName || "Organizer",
        createdAt: new Date().toISOString(),
      };

      // SECURITY FIX: Pass token in query string
      await axios.post(`${apiPath}/Events.json?auth=${token}`, payload);
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully! 🎉");
      return true;

    } catch (err: unknown) {
      console.error("Add Event Error:", err);
      const msg = getErrorMessage(err, "Failed to create event");
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { addEvent, isLoading, error };
};

export default useAddEvent;