import { fetchStudentInfo } from "@/api/StudentsAPI";
import { router } from "@/router";
import { AuthContextType, Student } from "@/lib/types/AuthTypes";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken"),
  );
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setAuthToken(token);
        const studentInfo = await getStudentInfo();
        setStudent(studentInfo ?? null);
      }
    };
    fetchData();
  }, [token]);

  const setAuthToken = (token: string) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  const removeAuthToken = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const getStudentInfo = async () => {
    try {
      const student = await fetchStudentInfo();
      return student;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    removeAuthToken();
    setStudent(null);
    router.navigate({ to: "/" });
  };

  const isAuthenticated = async () => {
    if (!token) {
      return false;
    }

    const fetchStudent = await fetchStudentInfo();
    if (fetchStudent) {
      return true;
    } else {
      return false;
    }
  };

  const isProfileComplete = () => {
    if (student) {
      return (
        student.firstName !== "" &&
        student.lastName !== "" &&
        student.email !== "" &&
        student.phoneNumber !== undefined &&
        student.campusId !== undefined &&
        student.nationality !== "" &&
        student.gender !== ""
      );
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        student,
        isAuthenticated,
        setAuthToken,
        removeAuthToken,
        logout,
        isProfileComplete,
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
