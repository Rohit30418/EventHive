import axios from "axios";
import { apiPath } from "../../Utils/Utils";

// Interface for each organiser's data
interface OrgniserData {
  fullName: string;
  email: string;
  password: string;
  consent: boolean;
  phone?: string;         // optional
  companyName?: string;   // optional
  confirmPassword: string;
  role: string;
  isApproved: boolean;
}

// Add `id` to represent the formatted version
interface OrgniserWithId extends OrgniserData {
  id: string;
}

const FetchRole = async (): Promise<OrgniserWithId[]> => {
  try {
    const response = await axios.get<Record<string, OrgniserData>>(
      `${apiPath}/orgnisers.json`
    );

    const data = response.data;

    const formattedData: OrgniserWithId[] = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error("Error fetching organisers:", error);
    return [];
  }
};

export default FetchRole;
