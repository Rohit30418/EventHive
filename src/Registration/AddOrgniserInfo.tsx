import axios from "axios";
import { useState } from "react";
import {apiPath} from "../../Utils/Utils";
import { auth } from "../Firebase";


type OrgniserData = {
  fullName: string;
  email: string;
  password: string;
  consent: boolean;
  phone?: string;         // optional
  companyName?: string;   // optional
  confirmPassword:string;
  role:string;
  isApproved:boolean;
};


const AddOrgniserInfo = () => {
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<any>(null);
const [success, setSuccess] = useState<boolean>(false);

  const handleAddOrganiser = async (Formdata:OrgniserData) => {
     const { confirmPassword, ...payload } = Formdata;
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
           const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in.");
      const token = await user.getIdToken();
      const response = await axios.post(`${apiPath}/Organizer.json?auth="${token}`, {
        ...payload,
        role: "Organizer",
        isApproved: false,
      });
      console.log("Response:", response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error("Error creating organiser:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

   return{isLoading,error,success,handleAddOrganiser}

}

  export default AddOrgniserInfo