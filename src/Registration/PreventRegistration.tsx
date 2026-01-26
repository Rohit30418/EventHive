import axios from 'axios';
import { apiPath } from '../../Utils/Utils';

const PreventRegistration = async (email: string): Promise<boolean> => {
  try {
    const res = await axios.get(`${apiPath}/orgnisers.json`);
    const data = res.data;

    if (!data) return false;

    const formatted = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    const existing = formatted.find((item) => item?.email === email);

    return !!existing; // Return true if email exists, false otherwise
  } catch (error) {
    console.error('Error in PreventRegistration:', error);
    return false; // Fail-safe: allow registration if error occurs
  }
};

export default PreventRegistration;
