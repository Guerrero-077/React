// src/api/services/rolService.ts
import { httpClient } from "../httpClient";
import { IRol } from "../types/IRol";
const RESOURCE = "/Rol";

export const rolService = {
    getAll: async (): Promise<IRol[]> => {
        return await httpClient.get<IRol[]>(RESOURCE);
    },

    getById: async (id: number): Promise<IRol> => {
        return await httpClient.get<IRol>(`${RESOURCE}/${id}`);
    },

    create: async (rol: IRol): Promise<IRol> => {
        return await httpClient.post<IRol>(RESOURCE, rol);
    },

    update: async (rol: IRol): Promise<IRol> => {
        return await httpClient.put<IRol>(RESOURCE, rol);
    },

    delete: async (id: number): Promise<void> => {
        await httpClient.delete(`${RESOURCE}/${id}`);
    },
};
