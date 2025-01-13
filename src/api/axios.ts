import axios from "axios";

export const publicAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const secureAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("authToken"),
    "Content-Type": "application/json",
  },
});
