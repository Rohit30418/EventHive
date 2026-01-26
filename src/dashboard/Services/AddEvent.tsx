import { useState } from "react"
import { apiPath } from "../../../Utils/Utils"
import axios from "axios";
const AddEvent = () => {
const [success,error]=useState();

try {
    const res=axios.get(`${apiPath}/`)
} catch (error) {
    
}
}

export default AddEvent