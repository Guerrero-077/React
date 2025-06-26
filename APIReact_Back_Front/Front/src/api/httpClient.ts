// src/api/httpClient.ts
import axios from "axios";
import { API_BASE_URL } from "../constants/endpoints";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const httpClient = {
    get: async <T = any>(url: string): Promise<T> => {
        const response = await api.get<T>(url);
        return response.data; // ✅ retorna solo los datos
    },
    post: async <T = any>(url: string, data: any): Promise<T> => {
        const response = await api.post<T>(url, data);
        return response.data;
    },
    put: async <T = any>(url: string, data: any): Promise<T> => {
        const response = await api.put<T>(url, data);
        return response.data;
    },
    delete: async <T = any>(url: string): Promise<T> => {
        const response = await api.delete<T>(url);
        return response.data;
    },
};