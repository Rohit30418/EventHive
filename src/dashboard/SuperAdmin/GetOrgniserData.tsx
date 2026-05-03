import axios from "axios";
import { apiPath } from "../../../Utils/Utils"; 

export type Organizer = {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  isApproved: boolean;
  role?: string;
  [key: string]: any; // Allow other properties
};

const GetOrgniserData = async (): Promise<Organizer[]> => {
  try {
    // Ensure this matches your Firebase node name exactly (Case Sensitive)
    const res = await axios.get(`${apiPath}/Organizer.json`);
    
    if (!res.data) return [];

    const data = res.data;

    // Convert Object to Array
    const formattedData: Organizer[] = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    return formattedData;

  } catch (error) {
    console.error("Error fetching organizers:", error);
    return [];
  }
};

export default GetOrgniserData;