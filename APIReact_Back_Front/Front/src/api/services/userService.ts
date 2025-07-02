import { httpClient } from "../httpClient";
import { IUser } from "../types/IUser";
const RESOURCE = "/User";

export const userService = {
    getAll: async (): Promise<IUser[]> => {
        return await httpClient.get<IUser[]>(RESOURCE);
    },

    getById: async (id: number): Promise<IUser> => {
        return await httpClient.get<IUser>(`${RESOURCE}/${id}`);
    },

    create: async (rol: IUser): Promise<IUser> => {
        return await httpClient.post<IUser>(RESOURCE, rol);
    },

    update: async (rol: IUser): Promise<IUser> => {
        return await httpClient.put<IUser>(RESOURCE, rol);
    },

    delete: async (id: number): Promise<void> => {
        await httpClient.delete(`${RESOURCE}/${id}`);
    },
};
