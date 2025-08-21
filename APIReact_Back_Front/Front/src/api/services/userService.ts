import { httpClient } from "../interceptor/httpClient";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../types/IUser";
import { createGenericService } from "./generic-service/genericService";


export const userService =
{

    ...createGenericService<UserDTO, CreateUserDTO, UpdateUserDTO>("/users"),

        // Método extra:
        getAllDynamic: async (): Promise<UserDTO[]> => {
            return await httpClient.get<UserDTO[]>("/users/dynamic");
        },
}