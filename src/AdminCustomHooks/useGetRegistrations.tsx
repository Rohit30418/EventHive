import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";
import { auth } from "../Firebase";
import type { Registration } from "../Types/registrationType";

type RegistrationPayload = Omit<Registration, "regId" | "eventId">;
type RegistrationsResponse = Record<string, Record<string, RegistrationPayload>>;

export const fetchRegistrations = async (): Promise<Registration[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to view registrations.");

  const token = await user.getIdToken();
  const res = await axios.get<RegistrationsResponse | null>(
    `${apiPath}/Registrations.json?auth=${token}`
  );
  const data = res.data ?? {};

  return Object.entries(data).flatMap(([eventId, eventRegistrations]) =>
    Object.entries(eventRegistrations ?? {}).map(([regId, details]) => ({
      regId,
      eventId,
      ...details,
    }))
  );
};

const useGetRegistrations = () => {
  const { data, isLoading, error, refetch, isFetching } = useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
    staleTime: 1000 * 60 * 3,
  });

  return {
    data: data ?? [],
    isLoading,
    isFetching,
    error: error ? error.message : null,
    refetch,
  };
};

export default useGetRegistrations;
