import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiPath } from "../../Utils/Utils";
import { auth } from "../Firebase";
import { useQueryClient } from "@tanstack/react-query";
const useDeleteEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  async function deleteEvent(id: string) {
    if (!id) {
      const msg = "Missing event id.";
      setError(msg);
      toast.error(msg);
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in.");
      const token = await user.getIdToken();
      await axios.delete(`${apiPath}/Events/${id}.json?auth=${token}`);
       await queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully.");
      return true;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setError(msg);
      toast.error(msg || "Failed to delete event.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, deleteEvent };
};

export default useDeleteEvent;
