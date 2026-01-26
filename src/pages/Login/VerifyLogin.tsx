import axios from 'axios';
import { apiPath } from '../../../Utils/Utils';

// 1. Define the Input Type (What the form sends)
interface LoginCredentials {
  Email: string;
  Password: string;
}

// 2. Define the User Type (What the DB has)
interface DBUser {
  email: string;
  password: string;
  role: string;
  fullName?: string;
  companyName?: string;
  // Add other fields if necessary
}

// 3. Define the Raw Firebase Response Structure
interface FirebaseResponse {
  [key: string]: DBUser;
}

// 4. Define the Return Type (What the UI gets back)
interface AuthUser extends DBUser {
  id: string;
}

const VerifyLogin = async (credentials: LoginCredentials): Promise<AuthUser | null> => {
  try {
   
    
    // 1. Fetch all organizers
    const { data } = await axios.get<FirebaseResponse>(`${apiPath}/Organizer.json`);

    if (!data) return null;

    // 2. Convert Firebase Object { "id1": {..}, "id2": {..} } -> Array [ {id: "id1", ...}, ... ]
    const formattedUsers: AuthUser[] = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    // 3. Find the user matching Email AND Password
    const foundUser = formattedUsers.find(
      (user) => 
        user.email === credentials.Email && 
        user.password === credentials.Password
    );

    return foundUser || null;

  } catch (error) {
    console.error("Login Service Error:", error);
    return null; // Return null so the UI can show "Invalid Credentials"
  }
};

export default VerifyLogin;