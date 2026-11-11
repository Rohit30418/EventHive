import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";
import { auth } from "../Firebase";
import { useAuth } from "../dashboard/AuthContext";
import useGetEvents from "./useGetEvents";
import type { Registration } from "../Types/registrationType";

type RegistrationPayload = Omit<Registration, "regId" | "eventId">;
type RegistrationRows = Record<string, RegistrationPayload>;
type RegistrationsResponse = Record<string, RegistrationRows>;

// Client-side scoping limits accidental over-fetching; Firebase security rules
// MUST still enforce ownership against direct REST calls.
export const fetchRegistrations = async (
  userId: string,
  role: string,
  ownedEventIds: string[] = []
): Promise<Registration[]> => {
  const user = auth.currentUser;
  if (!user || user.uid !== userId) throw new Error("You must be logged in to view registrations.");
  const token = encodeURIComponent(await user.getIdToken());

  if (role === "SuperAdmin") {
    const res = await axios.get<RegistrationsResponse | null>(
      `${apiPath}/Registrations.json?auth=${token}`
    );
    return Object.entries(res.data ?? {}).flatMap(([eventId, registrations]) =>
      Object.entries(registrations ?? {}).map(([regId, details]) => ({
        regId, eventId, ...details,
      }))
    );
  }
  if (role !== "Organizer") throw new Error("You do not have permission to view registrations.");

  const results = await Promise.all(ownedEventIds.map(async (eventId) => {
    const res = await axios.get<RegistrationRows | null>(
      `${apiPath}/Registrations/${encodeURIComponent(eventId)}.json?auth=${token}`
    );
    return Object.entries(res.data ?? {}).map(([regId, details]) => ({
      regId, eventId, ...details,
    }));
  }));
  return results.flat();
};

const useGetRegistrations = () => {
  const { user, role, isApproved, loading: authLoading } = useAuth();
  const { data: events, isLoading: eventsLoading, error: eventsError } = useGetEvents();
  const ownedEventIds = role === "Organizer" && user
    ? events.filter(event => event.userId === user.uid).map(event => event.id).sort()
    : [];
  const allowed = role === "SuperAdmin" || (role === "Organizer" && isApproved === true);
  const enabled = Boolean(user && allowed && !authLoading &&
    (role === "SuperAdmin" || (!eventsLoading && !eventsError)));

  const { data, isLoading, error, refetch, isFetching } = useQuery<Registration[]>({
    queryKey: ["registrations", user?.uid ?? "anonymous", role, ownedEventIds],
    queryFn: () => fetchRegistrations(user!.uid, role!, ownedEventIds),
    enabled,
    staleTime: 1000 * 60 * 3,
  });

  return {
    data: data ?? [],
    isLoading: isLoading || (role === "Organizer" && eventsLoading),
    isFetching,
    error: role === "Organizer" && eventsError ? eventsError : error ? error.message : null,
    refetch,
  };
};

export default useGetRegistrations;
