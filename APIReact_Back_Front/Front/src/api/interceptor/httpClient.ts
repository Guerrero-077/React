import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../constants/endpoints";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// interceptor
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const httpClient = {
    get: async <T = any>(url: string): Promise<T> => (await api.get<T>(url)).data,
    post: async <T = any>(url: string, data: any): Promise<T> => (await api.post<T>(url, data)).data,
    put: async <T = any>(url: string, data: any): Promise<T> => (await api.put<T>(url, data)).data,
    delete: async <T = any>(url: string): Promise<T> => (await api.delete<T>(url)).data,
};
