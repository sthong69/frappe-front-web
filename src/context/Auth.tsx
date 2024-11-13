import { adminUser, userUser } from "@/db/dummyData";
import { AuthContextType, User } from "@/types/AuthTypes";
import { redirect } from "@tanstack/react-router";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setAuthToken(authToken);
      setUserInfos(authToken);
    }
  }, [authToken]);

  const login = (input: { email: string; password: string }) => {
    // Make a request to the server to login
    // If the login is successful, set the user and the authToken
    // in the state and in the local storage

    if (input.email === "admin@frappe.fr" && input.password === "admin") {
      const token = "adminToken";

      setAuthToken(token);
      localStorage.setItem("authToken", token);
      setUserInfos(token);
    } else if (input.email === "user@frappe.fr" && input.password === "user") {
      const token = "userToken";
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      setUserInfos(token);
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
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
