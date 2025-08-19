import { ICreateRolFormPermission, IRolFormPermission } from "../types/IRolFormPermission";
import { httpClient } from "../interceptor/httpClient";
import { createGenericService } from "./generic-service/genericService";

export const rolFormPermissionService = {
    ...createGenericService<IRolFormPermission, ICreateRolFormPermission>("/RolFormPermission"),

    // Método extra:
    getAllDynamic: async (): Promise<IRolFormPermission[]> => {
        return await httpClient.get<IRolFormPermission[]>("/RolFormPermission/dynamic");
    },
};