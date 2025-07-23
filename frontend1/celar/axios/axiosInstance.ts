import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://78b9cf742099.ngrok-free.app/api/v1/user",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);

    config.headers.Authorization = `Bearer ${token}`;
    console.log(`request: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.log("Request Error:", error);
    return Promise.reject(error.response);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Response Error:", error.response);
    return Promise.reject(error.response);
  }
);
