import { fetchStudentInfo } from "@/api/StudentsAPI";
import { router } from "@/router";
import { AuthContextType, Student, User } from "@/lib/types/AuthTypes";
import { createContext, useState, useContext, useEffect } from "react";
import { fetchSupervisorInfo } from "@/api/SupervisorsAPI";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(
    localStorage.getItem("authToken") ?? undefined,
  );
  const [userRole, setUserRole] = useState<string | undefined>(
    localStorage.getItem("userRole") ?? undefined,
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUserInfo = async (): Promise<boolean> => {
    try {
      if (localStorage.getItem("userRole") === "ROLE_STUDENT") {
        const studentInfo = await fetchStudentInfo();
        setUser(studentInfo);
        return true;
      }
      if (localStorage.getItem("userRole") === "ROLE_SUPERVISOR") {
        const supervisorInfo = await fetchSupervisorInfo();
        setUser(supervisorInfo);
        return true;
      }
      return false;
    } catch (error) {
      setAuthToken(undefined);
      localStorage.removeItem("authToken");
      setUserRole(undefined);
      localStorage.removeItem("userRole");
      setUser(undefined);
      router.navigate({ to: "/" });
      return false;
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserInfo();
    } else {
      setUser(undefined);
    }
  }, [authToken]);

  const storeAuthToken = (token: string) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const storeUserRole = (role: string) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };

  const logout = () => {
    setAuthToken(undefined);
    localStorage.removeItem("authToken");
    setUserRole(undefined);
    localStorage.removeItem("userRole");
    router.navigate({ to: "/" });
  };

  const isAuthenticated = async (): Promise<boolean> => {
    if (localStorage.getItem("authToken") === null) {
      if (import.meta.env.DEV) {
        console.log("no auth token");
      }
      return false;
    }

    try {
      if (
        userRole == "ROLE_STUDENT" ||
        localStorage.getItem("userRole") == "ROLE_STUDENT"
      ) {
        if (import.meta.env.DEV) {
          console.log("trying to fetch student info");
        }
        await fetchStudentInfo();
        if (import.meta.env.DEV) {
          console.log("student info fetched");
        }
        return true;
      }
      if (
        userRole == "ROLE_SUPERVISOR" ||
        localStorage.getItem("userRole") == "ROLE_SUPERVISOR"
      ) {
        if (import.meta.env.DEV) {
          console.log("trying to fetch supervisor info");
        }
        await fetchSupervisorInfo();
        if (import.meta.env.DEV) {
          console.log("supervisor info fetched");
        }
        return true;
      }

      if (import.meta.env.DEV) {
        console.log("fallback");
      }
      return false;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log("error", error);
      }
      return false;
    }
  };

  const isProfileComplete = (): boolean => {
    if (import.meta.env.DEV) {
      console.log("Checking profile completion");
    }
    if (!user) {
      if (import.meta.env.DEV) {
        console.log("profile check no user");
      }
      return false;
    }

    if (userRole === "ROLE_SUPERVISOR") {
      if (import.meta.env.DEV) {
        console.log("supervisor bypass");
      }
      return true;
    }

    if (userRole === "ROLE_STUDENT") {
      if (import.meta.env.DEV) {
        console.log("student check");
      }
      const student = user as Student;
      if (import.meta.env.DEV) {
        console.log(student);
      }
      return (
        student.firstName !== "" &&
        student.lastName !== "" &&
        student.email !== "" &&
        student.phoneNumber !== null &&
        student.campusId !== null &&
        student.nationality !== null &&
        student.gender !== null
      );
    }

    if (import.meta.env.DEV) {
      console.log("fallback profile check");
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        userRole,
        storeAuthToken,
        storeUserRole,
        logout,
        isAuthenticated,
        isProfileComplete,
        fetchUserInfo,
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
