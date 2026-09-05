import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";

interface AuthContextType {
  user: User | null;
  role: string | null;
  isApproved: boolean | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);

        try {
          const res = await axios.get(`${apiPath}/Organizer/${currentUser.uid}.json`);
          const profile = res.data;
          const nextRole = profile?.role || "User";

          setRole(nextRole);
          setIsApproved(
            nextRole === "Organizer" ? profile?.isApproved === true : null
          );
        } catch (err) {
          console.error("Role fetch error", err);
          setRole("User");
          setIsApproved(null);
        }
      } else {
        setUser(null);
        setRole(null);
        setIsApproved(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, isApproved, loading, logout }}>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
