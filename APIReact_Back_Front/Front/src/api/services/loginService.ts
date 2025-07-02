import { API_BASE_URL } from "../../constants/endpoints";
import { ILogin } from "../types/ILogin";
import { IRegister } from "../types/IRegister";
import axios from "axios";

export const authService = {
    login: async (data: ILogin) => {
        const response = await axios.post(`${API_BASE_URL}/login`, data);
        return response.data;
    },

    register: async (data: IRegister) => {
        const response = await axios.post(`${API_BASE_URL}/login/registrarse`, data);
        return response.data;
    },
};
