import { httpClient } from "../../interceptor/httpClient";



export const createGenericService = <TList, TCreate>(resource: string) => ({
    getAll: async (): Promise<TList[]> => {
        return await httpClient.get<TList[]>(`${resource}?GetAllType=0`);
    },

    getById: async (id: number): Promise<TList> => {
        return await httpClient.get<TList>(`${resource}/${id}`);
    },

    create: async (data: TCreate): Promise<TList> => {
        return await httpClient.post<TList>(resource, data);
    },

    update: async (id: number, data: TCreate): Promise<TList> => {
        return await httpClient.put<TList>(`${resource}/${id}`, data);
    },

    delete: async (id: number): Promise<void> => {
        await httpClient.delete(`${resource}/${id}?deleteType=0`);
    },
});
