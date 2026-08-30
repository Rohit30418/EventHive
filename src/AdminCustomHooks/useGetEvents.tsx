import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";
import type { EventType } from "../Types/eventType";

type EventPayload = Omit<EventType, "id">;
type EventsResponse = Record<string, EventPayload>;

export const fetchEvents = async (): Promise<EventType[]> => {
  const res = await axios.get<EventsResponse | null>(`${apiPath}/Events.json`);
  const data = res.data ?? {};

  return Object.entries(data).map(([id, event]) => ({
    id,
    ...event,
  }));
};

const useGetEvents = () => {
  const { data, isLoading, error, refetch, isFetching } = useQuery<EventType[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: data ?? [],
    isLoading,
    isFetching,
    error: error ? error.message : null,
    refetch,
  };
};

export default useGetEvents;
