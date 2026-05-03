import axios from "axios"
import { useState } from "react"
import { apiPath } from "../../Utils/Utils";
const useDeleteEvent = () => {
  const [isLoading]=useState(false);
  const [error,setError]=useState<string | null>(null);
 async function deleteEvent(id:string){
  try {
 await axios.delete(`${apiPath}/Events/${id}.json`);
  } catch (error) {
    if (error instanceof Error) {
    setError(error.message);
  } else {
    setError(String(error)); 
  }
  } 
  }
  return {isLoading,error,deleteEvent}

}

export default useDeleteEvent