// src/api/services/loginService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILogin } from "../types/ILogin";
import { api } from "../interceptor/httpClient";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_BASE_URL } from "../../constants/endpoints";
import { IRegister } from "../types/IRegister";

const TOKEN_KEY = "auth_token";

interface JwtPayload {
    exp: number;
}

export const authService = {
    login: async (credentials: ILogin): Promise<void> => {
        const response = await api.post<{ token: string }>("/Login", credentials);
        const token = response.data.token;

        if (!token) throw new Error("Token no recibido");

        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    logout: async (): Promise<void> => {
        await AsyncStorage.removeItem(TOKEN_KEY);
    },

    getToken: async (): Promise<string | null> => {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    isTokenExpired: async (): Promise<boolean> => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (!token) return true;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const now = Math.floor(Date.now() / 1000);
            return decoded.exp < now;
        } catch (error) {
            console.error("Error al decodificar token:", error);
            return true;
        }
    },


    register: async (data: IRegister) => {
        const response = await axios.post(`${API_BASE_URL}/login/registrarse`, data);
        return response.data;
    },
};
