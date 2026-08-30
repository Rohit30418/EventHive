import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiPath } from "../../Utils/Utils";
import { auth } from "../Firebase";
import { getErrorMessage } from "../utils/error";

const useDeleteRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteRegistration(eventId: string, regId: string) {
    if (!eventId || !regId) {
      const msg = "Missing event id or registration id.";
      setError(msg);
      toast.error(msg);
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in.");

      // Same pattern as useAddEvent: attach the ID token so
      // Firebase rules can verify who's making this request.
      const token = await user.getIdToken();

      await axios.delete(
        `${apiPath}/Registrations/${eventId}/${regId}.json?auth=${token}`
      );

      toast.success("Registration deleted.");
      return true;
    } catch (err: unknown) {
      console.error("Delete Registration Error:", err);
      const msg = getErrorMessage(err, "Failed to delete registration.");
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { deleteRegistration, isLoading, error };
};

export default useDeleteRegistration;