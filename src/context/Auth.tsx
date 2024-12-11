import { router } from "@/router";
import { AuthContextType, User } from "@/types/AuthTypes";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken"),
  );

  //const [user, setUser] = useState<User | null>(getStudentInfo(token));
  const getStudentInfo = (token: string | null) => {
    if (token) {
      return {
        id: 1,
        user_name: "sylvain.thong@imt-atlantique.net",
        first_name: "Sylvain",
        last_name: "Thong",
        email: "sylvain.thong@imt-atlantique.net",
        phone_number: undefined,
        campus_id: undefined,
        supervisor: false,
        student: true,
      };
    } else {
      return null;
    }
  };
  const [user, setUser] = useState<User | null>(getStudentInfo(token));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      setUser(getStudentInfo(token));
    }
  }, [token]);

  const setAuthToken = (token: string) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  const removeAuthToken = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.navigate({ to: "/" });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!user,
        setAuthToken,
        removeAuthToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext) as AuthContextType;
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
