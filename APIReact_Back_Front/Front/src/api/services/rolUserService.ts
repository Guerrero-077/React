import { httpClient } from "../interceptor/httpClient";
import { CreateRolUserDTO, IRolUser } from "../types/IRolUser";
import { createGenericService } from "./generic-service/genericService";
export const rolUserService = {
    ...createGenericService<IRolUser, CreateRolUserDTO>("/RolUser"),
    // Método extra:
    getAllDynamic: async (): Promise<IRolUser[]> => {
        return await httpClient.get<IRolUser[]>("/RolUser/dynamic");
    }
}