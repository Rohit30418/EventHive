import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../Firebase";
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
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;
    let requestId = 0;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const currentRequest = ++requestId;
      // Clear sensitive per-session query data before allowing a new identity.
      queryClient.removeQueries({ queryKey: ["registrations"] });
      setUser(currentUser);
      setRole(null);
      setIsApproved(null);
      setLoading(true);
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const token = encodeURIComponent(await currentUser.getIdToken());
        const res = await axios.get(`${apiPath}/Organizer/${currentUser.uid}.json?auth=${token}`);
        if (!active || currentRequest !== requestId) return;
        const profile = res.data;
        const nextRole = profile?.role || "User";
        setRole(nextRole);
        setIsApproved(nextRole === "Organizer" ? profile?.isApproved === true : null);
      } catch (error) {
        if (!active || currentRequest !== requestId) return;
        console.error("Unable to resolve user role", error);
        // Fail closed: an unavailable profile must never grant dashboard access.
        setRole(null);
        setIsApproved(null);
      } finally {
        if (active && currentRequest === requestId) setLoading(false);
      }
    });
    return () => {
      active = false;
      requestId++;
      unsubscribe();
    };
  }, [queryClient]);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, isApproved, loading, logout }}>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">Loading...</div>
      ) : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
