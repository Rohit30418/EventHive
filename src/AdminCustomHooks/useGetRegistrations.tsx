import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";

interface Registration {
  regId: string;
  eventId: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  [key: string]: any;
}

const fetchRegistrations = async (): Promise<Registration[]> => {
  const res = await axios.get(`${apiPath}/Registrations.json`);
  const data = res.data || {};

  const flat: Registration[] = [];

  Object.keys(data).forEach((regId) => {
    const entry = data[regId];

    const eventKey = Object.keys(entry).find(
      (key) => key !== "id"
    );

    if (!eventKey) return;

    flat.push({
      regId,
      eventId: eventKey,
      ...entry[eventKey],
    });
  });

  return flat;
};

const useGetRegistrations = () => {
  return useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });
};

export default useGetRegistrations;
