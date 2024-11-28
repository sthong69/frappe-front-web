import { adminUser, userUser } from "@/db/dummyData";
import { AuthContextType, User } from "@/types/AuthTypes";
import { redirect, useRouter } from "@tanstack/react-router";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken"),
  );

  const getUserInfos = (authToken: string | null): User | null => {
    switch (authToken) {
      case "adminToken": {
        return adminUser;
      }
      case "userToken": {
        return userUser;
      }
      default:
        return null;
    }
  };

  const [user, setUser] = useState<User | null>(getUserInfos(authToken));

  const router = useRouter();

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      setUserInfos(storedAuthToken);
    }
  }, []);

  const login = (input: { email: string; password: string }) => {
    // Make a request to the server to login
    // If the login is successful, set the user and the authToken
    // in the state and in the local storage

    if (input.email === "admin@frappe.fr" && input.password === "admin") {
      const token = "adminToken";
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      setUserInfos(token);
      throw redirect({
        to: "/dashboard",
        throw: true,
      });
    } else if (input.email === "user@frappe.fr" && input.password === "user") {
      const token = "userToken";
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      setUserInfos(token);
      throw redirect({
        to: "/dashboard",
        throw: true,
      });
    } else {
      throw new Error("Invalid username or password");
    }
  };

  const setUserInfos = (authToken: string) => {
    switch (authToken) {
      case "adminToken": {
        setUser(adminUser);
        break;
      }
      case "userToken": {
        setUser(userUser);
        break;
      }
      default:
        throw new Error("Invalid token");
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
    router.invalidate();
    throw redirect({
      to: "/",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoaded: !!authToken,
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
