import axios from "axios";
import { apiPath } from "../../../Utils/Utils";
import type { Organizer } from "../../Types/organizerType";

type OrganizerPayload = Omit<Organizer, "id">;
type OrganizerResponse = Record<string, OrganizerPayload>;

const GetOrganizerData = async (): Promise<Organizer[]> => {
  try {
    const res = await axios.get<OrganizerResponse | null>(`${apiPath}/Organizer.json`);
    const data = res.data ?? {};

    return Object.entries(data).map(([id, organizer]) => ({
      id,
      ...organizer,
    }));
  } catch (error) {
    console.error("Error fetching organizers:", error);
    return [];
  }
};

export default GetOrganizerData;
