import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";

const fetchEvents = async () => {
  const res = await axios.get(`${apiPath}/Events.json`);
  const data = res.data || {};

  // Convert Firebase Object to Array
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
};

const useGetEvents = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    // Keep data fresh for 5 minutes
    staleTime: 1000 * 60 * 5, 
  });

  return {
    data: data ?? [], // Always return an array
    isLoading,
    error: error ? (error as Error).message : null,
  };
};

export default useGetEvents;