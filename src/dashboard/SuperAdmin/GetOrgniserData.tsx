import { apiPath } from "../../../Utils/Utils"
import axios from "axios"
const GetOrgniserData = async () => {
try {
const res= await axios.get(`${apiPath}/orgnisers.json`);
const data=await res.data;

const formatteData=Object.keys(data).map((key)=>(
    {
        id:key,
        ...data[key]
    }
))

return formatteData;

} catch (error) {
    
}

}

export default GetOrgniserData