import axios from "axios";
import { useState } from "react";
import { apiPath } from "../../Utils/Utils";
import { auth } from "../Firebase";
import { getErrorMessage } from "../utils/error";

type OrganizerFormData = {
  fullName: string;
  email: string;
  password: string;
  consent: boolean;
  phone?: string;
  companyName?: string;
  confirmPassword: string;
  role: string;
  isApproved: boolean;
};

const AddOrganizerInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAddOrganizer = async (formData: OrganizerFormData) => {
    const payload: Omit<OrganizerFormData, "confirmPassword"> = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      consent: formData.consent,
      phone: formData.phone,
      companyName: formData.companyName,
      role: formData.role,
      isApproved: formData.isApproved,
    };

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in.");

      const token = await user.getIdToken();
      await axios.post(`${apiPath}/Organizer.json?auth=${token}`, {
        ...payload,
        role: "Organizer",
        isApproved: false,
      });
      setSuccess(true);
    } catch (err: unknown) {
      console.error("Error creating organizer:", err);
      setError(getErrorMessage(err, "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, handleAddOrganizer };
};

export default AddOrganizerInfo;
