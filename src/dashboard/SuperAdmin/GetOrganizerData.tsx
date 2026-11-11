import axios from "axios";
import { apiPath } from "../../../Utils/Utils";
import { auth } from "../../Firebase";
import type { Organizer } from "../../Types/organizerType";

type OrganizerPayload = Omit<Organizer, "id">;
type OrganizerResponse = Record<string, OrganizerPayload>;

const GetOrganizerData = async (): Promise<Organizer[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to view organizer requests.");
  const token = encodeURIComponent(await user.getIdToken());
  // Reject errors instead of pretending the organizer list is empty.
  const res = await axios.get<OrganizerResponse | null>(`${apiPath}/Organizer.json?auth=${token}`);
  return Object.entries(res.data ?? {}).map(([id, organizer]) => ({ id, ...organizer }));
};

export default GetOrganizerData;
